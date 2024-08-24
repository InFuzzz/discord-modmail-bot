const { version } = require('discord.js');
const pkgver = require("../../../package.json");

module.exports = (client) => {
  client.user.setPresence({ activities: [{ name: 'Contactez moi en MP' }], status: 'dnd' });

  for (const guild of client.guilds.cache.values()) {
    client.db.settings.insertRow.run(guild.id, guild.name);
  }

  const data = `
    - Name: ${client.user.tag}
    - ID: ${client.user.id}
    - Commands : ${client.slash.size}
    - Servers: ${client.guilds.cache.size}
    - Users: ${client.users.cache.size}
    - Version: ${pkgver.version}
    - Discord API Version: v${version}
    - Node Version: ${process.version}
    - Plateform: ${process.platform}`
  client.logger.ok(data);
  client.logger.ok(`${client.user.username} est maintenant en ligne.`);
}