module.exports = async(client, guild) => {
  client.logger.info(`${client.user.tag} vient de quitter le serveur ${guild.name}.`);

  client.db.settings.deleteGuild.run(guild.id);
}