import dailySeedHandler from '../handlers/dailySeed';
import { RANDO_NEWS_CHANNEL_ID, EMBED_COLOR } from 'constants';

const dailyRandoSeed = client => async () => {
  const channel = await client.channels.fetch(RANDO_NEWS_CHANNEL_ID);
  dailySeedHandler({ message: { channel, delete: () => null } });
};

export default dailyRandoSeed;
