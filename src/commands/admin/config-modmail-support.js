const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'config-modmail-support',
  description: 'Permet de définir le rôle qui pourra accéder aux tickets',
  usage: '/config-modmail-support [role]',
  examples: ['/config-modmail-support role:@Support'],
  dir: "admin",
  options: [
    {
      name: `role`,
      description: `Quel est le rôle qui pourra accéder aux tickets ?`,
      required: true,
      type: 8
    }
  ],

  run: async (client, interaction) => {
    const role = interaction.options.getRole(`role`);

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
      if (!role) return interaction.reply({ content: `❌ **Merci de fournir un rôle valable.**` });

      client.db.settings.updateModMailSupportRoleId.run(role.id, interaction.guild.id);

      const success = new EmbedBuilder()
        .setTitle(`✅ Rôle support modifié !`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`Le rôle support a bien été définit sur ${role}. Désormais, les membres possédant ce rôle auront un accès aux tickets ouverts.`)
        .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("Green")
        .setTimestamp()

      interaction.reply({ embeds: [success], ephemeral: true })
    }
  }
}