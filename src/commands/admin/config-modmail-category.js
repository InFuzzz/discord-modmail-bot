const { PermissionFlagsBits, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  name: 'config-modmail-category',
  description: 'Permet de définir la catégorie où sera stocké tous les tickets',
  options: [
    {
      name: `catégorie`,
      description: `Dans quelle catégorie les nouveaux tickets devront être stockés ?`,
      required: true,
      type: 7
    }
  ],

  run: async (client, interaction) => {
    const category = interaction.options.getChannel(`catégorie`);

    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      const noperm = new EmbedBuilder()
        .setTitle('Permissions manquantes')
        .setDescription('Vous ne possédez pas la permission `Administrateur` sur ce serveur.')
        .setColor("Red")

      interaction.reply({ embeds: [noperm], ephemeral: true })
    } else if (!interaction.guild.members.me.permissions.has([PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.Administrator])) {
      const noperm = new EmbedBuilder()
        .setTitle('Permissions manquantes')
        .setDescription('Le bot ne possède pas la permission `Administrateur`, `Envoyer des messages` et `Envoyer des liens en embed` sur ce serveur.')
        .setColor("Red")

      interaction.reply({ embeds: [noperm], ephemeral: true })
    } else {
      if (category.type !== ChannelType.GuildCategory) return interaction.reply({ content: `❌ **Merci de fournir une catégorie de stockage valable.**`, ephemeral: true });

      client.db.settings.updateModMailCategory.run(category.id, interaction.guild.id);

      const success = new EmbedBuilder()
        .setTitle(`✅ Catégorie de stockage modifiée !`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`>>> La catégorie de stockage des tickets a bien été définie sur ${category}. Désormais, les tickets seront stockés dans cette catégorie.`)
        .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("Green")
        .setTimestamp()

      interaction.reply({ embeds: [success], ephemeral: true })
    }
  }
}