import { dailyRandoSeed } from './scheduled';
import { findCommand } from 'db';
import { Client as DiscordClient, GatewayIntentBits } from 'discord.js';
import 'environment';
import handlers from 'handlers';
import { scheduleJob } from 'node-schedule';
import { wrapHandlerFunc, getPermissionsLevel } from 'utils';
import whisparse from 'whisparse';

const client = new DiscordClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on('ready', () => {
  console.log('Ret-2-go!');
});

client.on('messageCreate', async message => {
  if (message.author.bot) {
    return;
  }

  const parsed = whisparse(message.content);
  if (!parsed) {
    return;
  }

  const dbCommand = await findCommand(parsed.command);
  const dbHandler = ({ say }) => say(dbCommand.output);
  if (dbCommand) {
    dbHandler.command = dbCommand.name;
    dbHandler.aliases = dbCommand.Aliases.map(a => a.name);
    dbHandler.instance = dbCommand;
    Object.assign(dbHandler, dbCommand);
  }

  // eslint-disable-next-line no-param-reassign
  message.permissionsLevel = getPermissionsLevel(message);

  for (const handler of handlers.concat([wrapHandlerFunc(dbHandler)])) {
    handler({
      ...parsed,
      message,
      client,
      // This should be unnecessary, but discord.js is a truly terrible library
      say: msg => message.channel.send(msg),
      reply: msg => message.reply(msg),
    });
  }
});

scheduleJob('0 7 * * *', () => {
  dailyRandoSeed(client)().catch(console.log);
});

client.login(process.env.DISCORD_BOT_TOKEN);
