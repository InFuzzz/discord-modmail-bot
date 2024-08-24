global.__basedir = __dirname;
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const config = require('./config.json');
const { readdir } = require('fs').promises;
const path = require('path');

if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Node 16.0.0 or higher is required. Please update Node on your system.");

const client = new Client({
  allowedMentions: {
    parse: ['users', 'roles']
  },
  fetchAllMembers: true,
  intents: [GatewayIntentBits.AutoModerationConfiguration,
  GatewayIntentBits.AutoModerationExecution,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.GuildModeration,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildInvites,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildScheduledEvents,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.MessageContent
  ],

  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember, Partials.User
  ]
});

console.clear();

client.slash = new Collection();
client.db = require('./src/utils/db.js');
client.logger = require('./src/utils/logger');
client.utils = require('./src/utils/utils.js');

console.clear()
client.logger.loading(`Initialisation...`);

async function loadHandlers(client, directory) {
  const handlerFiles = await readdir(path.join(__dirname, directory));
  const handlerModules = handlerFiles.filter(file => file.endsWith('.js'));
  for (const file of handlerModules) {
    const handler = require(path.join(__dirname, directory, file));
    handler(client);
  }
}

loadHandlers(client, './src/utils/handlers');

require('./slashCommands.js');

client.login(config.token);

process.on("unhandledRejection", (err, reason, p) => {
  client.logger.error(err, reason, p);
});

process.on("uncaughtException", (err, origin) => {
  client.logger.error(err, origin);
});