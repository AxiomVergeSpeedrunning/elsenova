import { findCommand } from 'db';
import { PermissionsLevel } from 'enums';

const editCommand = async ({ say, args, argsString }) => {
  let [name] = args;
  const output = argsString.replace(`${name} `, '');

  if (name.startsWith('!')) {
    name = name.slice(1);
  }

  const existing = await findCommand(name);

  if (!existing) {
    await say(`${name} was not found in the command list!`);
    return;
  }

  existing.output = output;
  await existing.save();

  await say(`Successfully edited command ${name}`);
};

editCommand.command = 'editcommand';
editCommand.aliases = [
  'updatecommand',
  'changecommand',
  'edit',
  'editcmd',
  'cmdedit',
  'commandedit',
];
editCommand.permissionsLevel = PermissionsLevel.MOD;

export default editCommand;
