import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const channels = {
  GENERAL: proces.env.GENERAL_CHANNEL_ID || '145655554726035456',
  NEWS: proces.env.NEWS_CHANNEL_ID || '145655876735336448',
};

export const TWITCH_GAME_ID = '34072';

export const FILE_NAME = 'data.json';

export const EMBED_COLOR = '#0099ff';

export const snark = [
  'Your strats are weak',
  "Falcon could do this faster, but don't tell him I said that",
  '100% IMB is the only real 100% category',
  'Stay hydrated. This is a threat.',
  'Is this all there is to life? Posting twitch streams?',
  'If you really believe in yourself you could get a 2:32 Xedur',
  'Somebody call DwangoAC, keeper of BlueyLewis',
  "Really I'm just here for the dog pictures",
  'Call me an ambulance, because my strats are SICK!',
  'Just tuck on in underneath my lil ol flipper! You can save time that way!',
  'Memes aside, you guys are great. Keep doing you.',
  "It's not *not* frame perfect",
  'Inside the wall saves 30 years',
  'Why is this bot so mean?',
  'Write in Thomas Happ for president',
  'Shoutouts to Angi, my biggest fan!',
  'Rocket jumps are free',
  'any% YMG is a meme category, and you cannot change my mind',
  'This is a dumb category and should not be played by anyone.',
];
