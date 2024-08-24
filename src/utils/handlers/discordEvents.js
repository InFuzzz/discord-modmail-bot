const fs = require('fs');

module.exports = async (client) => {
    fs.readdir(`${__dirname}/../../events/discord/`, (err, files) => {
        if (err) client.logger.error(err);
        files.forEach(file => {
            const event = require(`${__dirname}/../../events/discord/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
            client.logger.ok(`Événements discord: ${eventName} chargé`)
        });
        client.logger.ok(`${files.length} évènement(s) discord chargé(s)`)
    });
}