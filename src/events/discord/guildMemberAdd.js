module.exports = (client, member) => {
  client.logger.info(`${member.user.tag} vient de rejoindre le serveur ${member.guild.name}`);
}