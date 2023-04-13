import { getRandomizerSeed } from '../utils';
import { EMBED_COLOR } from 'constants';
import { Seed } from 'db';
import { EmbedBuilder, ThreadAutoArchiveDuration } from 'discord.js';
import { PermissionsLevel } from 'enums';

const dailySeed = async ({ message }) => {
  const now = new Date();
  let existing = true;
  let seed = '';

  while (existing) {
    seed = getRandomizerSeed();
    existing = await Seed.findOne({ where: { value: seed } });
  }

  const month = now.toLocaleString('default', { month: 'long' });
  const dateString = `${now.getDate()} ${month} ${now.getFullYear()}`;

  const { channel } = message;

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLOR)
    .setTitle(`Daily Randomizer Seed!`)
    .setDescription('<@&823674572855181332>')
    .addFields(
      { name: 'Seed', value: seed, inline: true },
      { name: 'Date', value: dateString, inline: true },
    )
    .setTimestamp();

  await channel.threads.create({
    name: `Daily seed - ${seed} - ${dateString}`,
    autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
    reason: 'Daily seed',
    message: { embeds: [embed] },
  });
  await message.delete();

  await Seed.create({ value: seed });
};

dailySeed.command = 'postseed';
dailySeed.permissionsLevel = PermissionsLevel.MOD;

export default dailySeed;
