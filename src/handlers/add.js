import { Command, findCommand } from 'db';
import { PermissionsLevel } from 'enums';

const addCommand = async ({ say, args, argsString }) => {
  let [name] = args;
  const output = argsString.replace(`${name} `, '');

  if (name.startsWith('!')) {
    name = name.slice(1);
  }

  const existing = await findCommand(name);

  if (existing) {
    await say(`${existing.name} already exists`);
    return;
  }

  const r = await Command.create({
    name: name.toLowerCase(),
    output,
    aliases: [],
    permissionsLevel: PermissionsLevel.USER,
  });
  await say(`Successfully added command ${name}`);
};

addCommand.command = 'addcommand';
addCommand.aliases = ['newcommand'];
addCommand.permissionsLevel = PermissionsLevel.MOD;

export default addCommand;
