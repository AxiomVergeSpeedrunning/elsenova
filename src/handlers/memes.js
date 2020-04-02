import db from '../db';

const dab = async ({ msg, command }) => {
  // https://clips.twitch.tv/BeautifulLittleMetalRlyTho
  if (command !== '!dab') {
    return;
  }

  msg.reply('https://clips.twitch.tv/BeautifulLittleMetalRlyTho');
};

const yeet = async ({ msg }) => {
  if (!msg.contains('yeet')) {
    return;
  }

  msg.channel.send('YOTE!');
};

const sandwich = async ({ msg, command, args }) => {
  if (command !== '!sandwich') {
    return;
  }

  const count = await db.sandwiches.count({});
  const sandwichCount = await db.sandwiches.count({ isSandwich: true });
  const notSandwichCount = count - sandwichCount;

  if (args[0] === 'count') {
    msg.channel.send(
      `I've classified ${count} different objects. Of those, ${sandwichCount} are sandwiches and ${notSandwichCount} are not.`,
    );
    return;
  }

  const item = args.join(' ');

  const existing = await db.sandwiches.findOne({ name: item.toLowerCase() });
  let isSandwich = Math.random() < 0.8;

  if (existing !== null) {
    isSandwich = existing.isSandwich;
  } else {
    db.sandwiches.insert({ name: item.toLowerCase(), isSandwich });
  }

  const a = ['a', 'e', 'i', 'o', 'u'].includes(item.toLowerCase()[0]) ? 'An' : 'A';

  if (isSandwich) {
    msg.channel.send(`${a} ${item} is a sandwich`);
  } else {
    msg.channel.send(`${a} ${item} is not a sandwich, I guess`);
  }
};

const vore = async ({ msg, command }) => {
  if (command !== '!vore') {
    return;
  }

  const now = Math.floor(Date.now() / 1000);

  let data = await db.counters.findOne({ name: command });

  if (data === null) {
    db.counters.insert({ name: command, count: 0, timestamp: 0 });

    data = await db.counters.findOne({ name: command });
  }

  if (now - data.timestamp < 600) {
    msg.channel.send("It hasn't even been 10 minutes, you're basically still talking about vore.");
    return;
  }

  const newData = Object.assign({}, data);
  newData.timestamp = now;
  newData.count += 1;
  await db.counters.update(data, newData, {});

  data = Object.assign(data, newData);

  const timeLabel = data.count === 1 ? 'time' : 'times';

  msg.channel.send(`We've talked about vore ${data.count} ${timeLabel} now. Stop it.`);
};

const daddy = async ({ msg, command }) => {
  if (command !== '!daddy') {
    return;
  }

  msg.reply('Stop it.');
};

const handlers = [dab, yeet, sandwich, vore, daddy];

export default handlers;