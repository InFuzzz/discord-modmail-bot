module.exports = async (client, guild) => {
  client.logger.info(`${client.user.username} vient de rejoindre le serveur ${guild.name}.`);

  client.db.settings.insertRow.run(guild.id, guild.name);
}