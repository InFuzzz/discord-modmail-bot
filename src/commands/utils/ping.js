module.exports = {
  name: 'ping',
  description: 'Obtenir la latence du bot',

  run: async (client, interaction) => {
      const startTime = Date.now()
      interaction.reply({ content: `Calcul en cours...` }).then(async () => {
      const endTime = Date.now()
        interaction.editReply({ content: `>>> **Bot :** \`${endTime - startTime}ms\`\n**API :** \`${Math.round(client.ws.ping)}ms\`` });
    })
  }
}