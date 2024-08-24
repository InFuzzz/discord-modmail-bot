module.exports = (client, member) => {
  if (member.user === client.user) return;
  client.logger.info(`${member.user.tag} vient de quitter le serveur ${member.guild.name}`);
}