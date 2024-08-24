const { EmbedBuilder, ActionRowBuilder, version } = require('discord.js');
const config = require('../../../config.json');
const { mem, cpu, os } = require('node-os-utils');

module.exports = {
  name: 'bot-infos',
  description: 'Obtenir diverses informations concernant le bot',

  run: async (client, interaction) => {
    const { totalMemMb, usedMemMb, os } = await mem.info();

    const e = new EmbedBuilder()
      .setTitle(`Information concernant ${client.user.username}`)
      .addFields([
        {
          name: `Identité`,
          value: `>>> **Tag :** \`${client.user.tag}\`\n**Identifiant :** \`${client.user.id}\``,
        },
        {
          name: `Statistiques`,
          value: `>>> **Serveurs :** \`${client.guilds.cache.size}\`\n**Utilisateurs :** \`${client.users.cache.size}\`\n**Commandes :** \`${client.slash.size}\``,
        },
        {
          name: `Technique`,
          value: `>>> **Processeur :** \`${cpu.model()}\`\n**Nombre de coeurs :** \`${cpu.count()}\`\n**Utilisation du processeur :** \`${await cpu.usage()}%\`\n**RAM Utilisée :** \`${usedMemMb} MB/${totalMemMb} MB\`\n**Système d'exploitation :** \`${process.platform}\`\n**Langage :** \`JavaScript\`\n**Discord.js :** \`v${version}\`\n**Node.js :** \`${process.version}\`\n**Démarré :** <t:${(client.readyTimestamp / 1000).toFixed()}:R>`,
        }
      ])
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
      .setColor(config.color)
      .setTimestamp()

    await interaction.reply({ embeds: [e] })
  }
}