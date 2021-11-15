import 'environment';

import { scheduleJob } from 'node-schedule';
import { Client as DiscordClient, Intents } from 'discord.js';
import whisparse from 'whisparse';

import { dailyRandoSeed } from 'scheduled';
import { findCommand } from 'db';
import { wrapHandlerFunc, getPermissionsLevel } from 'utils';

import handlers from 'handlers';

const client = new DiscordClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log('Ret-2-go!');
});

client.on('messageCreate', async message => {
  if (message.author.bot) {
    return;
  }

  const parsed = whisparse(message.content, { prefix: '~' });
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

scheduleJob('0 0 * * *', () => {
  dailyRandoSeed(client)().catch(console.log);
});

client.login(process.env.DISCORD_BOT_TOKEN);
