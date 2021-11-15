import { Sandwich } from 'db';

const sandwich = async ({ say, argsString: item }) => {
  const existing = await Sandwich.findOne({ where: { name: item.toLowerCase() } });
  let isSandwich = Math.random() < 0.8;

  if (existing) {
    isSandwich = existing.isSandwich;
  } else {
    await Sandwich.create({ name: item.toLowerCase(), isSandwich });
  }

  const a = ['a', 'e', 'i', 'o', 'u'].includes(item.toLowerCase()[0]) ? 'An' : 'A';

  if (isSandwich) {
    say(`${a} ${item} is a sandwich`);
  } else {
    say(`${a} ${item} is a dumpling`);
  }
};

sandwich.command = 'sandwich';
sandwich.aliases = ['issandwich', 'isdumpling', 'dumpling', 'classify'];

export default sandwich;
