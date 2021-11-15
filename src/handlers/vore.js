import { Vore } from 'db';

const vore = async ({ say, message }) => {
  const lastVore = await Vore.findOne({ order: [['timestamp', 'DESC']] });

  if (!lastVore || (Date.now() - lastVore.timestamp) / 1000 > 300) {
    await Vore.create({ user: message.author.id });

    const count = (await Vore.count()) + Number(process.env.VORE_BASE);
    const timeLabel = count === 1 ? 'time' : 'times';
    const admonishment = count === 420 ? '*Nice*.' : 'Stop it.';

    say(`We've talked about vore ${count} ${timeLabel} now. ${admonishment}`);
    return;
  }

  say("It hasn't even been 5 minutes, you're basically still talking about vore.");
};

vore.command = 'vore';
vore.aliases = ['v0r3'];

export default vore;
