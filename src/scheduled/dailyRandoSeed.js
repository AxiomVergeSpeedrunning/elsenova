import { MessageEmbed } from 'discord.js';
import { Seed } from 'db';

import { RANDO_NEWS_CHANNEL_ID, EMBED_COLOR } from 'constants';
import { getRandomizerSeed } from '../utils';

const dailyRandoSeed = client => async () => {
  const now = new Date();
  let existing = true;
  let seed = '';

  while (existing) {
    seed = getRandomizerSeed();
    existing = await Seed.findOne({ where: { value: seed } });
  }

  const month = now.toLocaleString('default', { month: 'long' });

  const dateString = `${now.getDate()} ${month} ${now.getFullYear()}`;

  const newsChannel = await client.channels.fetch(RANDO_NEWS_CHANNEL_ID);
  const embed = new MessageEmbed()
    .setColor(EMBED_COLOR)
    .setTitle(`Daily Randomizer Seed!`)
    .setDescription('<@&823674572855181332>')
    .addFields(
      { name: 'Seed', value: seed, inline: true },
      { name: 'Date', value: dateString, inline: true },
    )
    .setTimestamp();
  await newsChannel.send({ embeds: [embed] });
  await Seed.create({ value: seed });
};

export default dailyRandoSeed;
