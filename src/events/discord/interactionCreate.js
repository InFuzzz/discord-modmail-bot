const { InteractionType, EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, AttachmentBuilder } = require('discord.js');
const config = require('../../../config.json');

module.exports = async (client, interaction, message) => {
	if (interaction.type === InteractionType.ApplicationCommand) {
		if (!interaction.guild) return;
		if (!client.slash.has(interaction.commandName)) return;

		try {
			const command = client.slash.get(interaction.commandName)
			command.run(client, interaction, message);
			client.logger.command(`Commande ${interaction.commandName} utilisée par ${interaction.member.user.tag}`)
		}
		catch (e) {
			client.logger.error(e);
			await interaction.reply({ content: '**Une erreur est survenue lors de l\'exécution de la commande. Merci de réessayer plus tard.**', ephemeral: true });
		}
	} else if (interaction.isButton()) {
		const button = interaction.customId;

		if (button === 'contact-support') {
			const guild = client.guilds.cache.get(config.guildId);
			const ticketOpenCategory = client.db.settings.selectModMailCategoryId.pluck().get(config.guildId);
			const supportRoleId = client.db.settings.selectModMailSupportRoleId.pluck().get(config.guildId);

			const alreadyHaveTicket = guild.channels.cache.find(c => c.topic == interaction.user.id);
			if (alreadyHaveTicket) return interaction.reply({ content: `**❌ Vous possédez déjà un ticket ouvert.**`, ephemeral: true });

			const ticket = await guild.channels.create({
				name: `ticket-${interaction.user.username}`,
				type: ChannelType.GuildText,
				reason: `Ouverture d'un ticket`,
				permissionOverwrites: [
					{
						id: supportRoleId,
						allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles],
					},
					{
						id: guild.id,
						deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles]
					}
				],

				parent: ticketOpenCategory,
				topic: `${interaction.user.id}`
			})

			client.db.tickets.newTicket.run(interaction.user.id, interaction.user.tag, ticket.id);

			const ticketOpened = new EmbedBuilder()
				.setTitle(`✅ Support contacté !`)
				.setDescription(`Tu as bien effectué une demande de contact avec le support de **${guild.name}**. Merci de décrire votre problème en message privé en attendant la réponse d'un membre du staff.`)
				.setColor(config.color)
				.setTimestamp()

			interaction.reply({ embeds: [ticketOpened] })

			const ticketOpenedInformations = new EmbedBuilder()
				.setTitle(`Nouveau ticket`)
				.setDescription(`Un nouveau ticket a été créé. Pour le fermer, merci de cliquer sur le bouton présent ci-dessous.`)
				.addFields([
					{
						name: `Informations complémentaires :`,
						value: `>>> **Membre :** ${interaction.user}\n**Pseudonyme** : \`${interaction.user.tag}\n\`**Identifiant :** \`${interaction.user.id}\`)`
					}
				])
				.setColor(config.color)
				.setTimestamp()

			const closeButton = new ActionRowBuilder()
				.addComponents([
					new ButtonBuilder()
						.setCustomId(`close-ticket`)
						.setStyle(ButtonStyle.Danger)
						.setLabel('Fermer le ticket')
				])

			ticket.send({ embeds: [ticketOpenedInformations], components: [closeButton] })
		} else if (button === 'close-ticket') {
			await interaction.deferUpdate();

			const guild = client.guilds.cache.get(config.guildId);
			const authorID = client.db.tickets.selectAuthorId.pluck().get(interaction.channel.id);
			const ticketID = client.db.tickets.selectTicketId.pluck().get(authorID);
			const ticket = await guild.channels.cache.find(c => c.id === ticketID);

			const deleteInfo = new EmbedBuilder()
				.setDescription(`Le ticket sera supprimé dans 5 secondes`)
				.setColor("Red")

			ticket.send({ embeds: [deleteInfo] });

			const author = guild.members.cache.find(m => m.id === authorID);

			const endConversation = new EmbedBuilder()
				.setTitle(`Conversation terminée !`)
				.setDescription(`Votre conversation avec l'équipe a été close. À bientôt !`)
				.setTimestamp()
				.setColor(config.color)

			author.send({ embeds: [endConversation] }).catch(() => { })

			client.db.tickets.deleteTicket.run(ticket.id);

			setTimeout(() => {
				ticket.delete();
			}, 5000)
		}
	}
};
