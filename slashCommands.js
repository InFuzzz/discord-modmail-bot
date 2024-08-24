const Logger = require('./src/utils/logger.js')
const config = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdir } = require('fs').promises;
const { readdirSync } = require('fs');
const path = require('path');

const commands = [];

const readCommandFiles = (dir) => {
  readdirSync(path.join('./src/commands/', dir)).forEach(cmd => {
    commands.push(require(path.join(__dirname, './src/commands/', dir, cmd)));
  });
};

readdirSync('./src/commands/').forEach(readCommandFiles);

const rest = new REST({ version: '10' }).setToken(config.token);

const reloadCommands = async () => {
  try {
    Logger.loading('Rechargement des commandes intégrées...');
    await rest.put(
      Routes.applicationCommands(config.clientId),
      { body: commands }
    );
    Logger.ok('Commandes intégrées rechargées.');
  } catch (error) {
    Logger.error(error);
  }
};

reloadCommands();