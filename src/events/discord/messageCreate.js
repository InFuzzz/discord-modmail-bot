const { EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../../config.json');

module.exports = (client, message) => {
  const mentionMatch = new RegExp(`^<@!?${client.user.id}>( |)$`);
  const guild = client.guilds.cache.find(g => g.id === config.guildId);

  if (message.author.bot || !message.author) return;

  if (mentionMatch.test(message.content)) {
    message.channel.send({ content: `Un problème ? Envoie moi un message privé !` });
  }

  if (!message.author.bot && message.channel.type === ChannelType.DM) {
    const guild = client.guilds.cache.find(g => g.id === config.guildId);
    const ticket = guild.channels.cache.find(c => c.topic === message.author.id);

    if (ticket) {
      const attachments = [];

      message.attachments.forEach(attachment => {
        attachments.push({
          attachment: attachment.url,
          name: attachment.name
        });
      });

      ticket.send({ content: `**${message.author.username} :** ${message.content}`, files: attachments });
    } else if (!ticket) {
      const e = new EmbedBuilder()
        .setTitle(`🛠️ Contacter le support`)
        .setDescription(`Pour contacter le support, merci de cliquer sur le bouton ci-dessous.`)
        .setTimestamp()
        .setColor(config.color)

      const choiceRaw = new ActionRowBuilder()
        .addComponents([
          new ButtonBuilder()
            .setCustomId(`contact-support`)
            .setLabel(`Contacter le support`)
            .setStyle(ButtonStyle.Secondary),
        ])

      message.author.send({ embeds: [e], components: [choiceRaw] });
    }
  } else if (!message.author.bot && message.channel.topic === client.db.tickets.selectAuthorId.pluck().get(message.channel.id)) {
    const author = guild.members.cache.find(u => u.id === message.channel.topic);
    if (!author) return;

    let msgAuthor = guild.members.cache.find(m => m.id === message.author.id) || message.author.username;

    const attachments = [];

    message.attachments.forEach(attachment => {
      attachments.push({
        attachment: attachment.url,
        name: attachment.name
      });
    });

    author.send({ content: `**${msgAuthor.nickname || message.author.username}** : ${message.content}`, files: attachments }).catch(() => {
      message.reply({ content: `**❌・Le message n'a pas pu être envoyé à l'utilisateur car il a bloqué ses mp/le bot.**` })
    })
  }
}