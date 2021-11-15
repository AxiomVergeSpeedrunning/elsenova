import { findCommand } from 'db';
import { PermissionsLevel } from 'enums';

const delCommand = async ({ say, args, argsString }) => {
  if (args.length > 1) {
    await say('delcommand only takes 1 argument');
    await say('Syntax: !delcommand <commandName>');
    return;
  }

  let name = argsString;

  if (name.startsWith('!')) {
    name = name.slice(1);
  }

  const existing = await findCommand(name);

  if (!existing) {
    await say(`No command found for ${name}`);
    return;
  }

  await existing.destroy();
  await say(`Successfully deleted command ${name}`);
};

delCommand.command = 'delcommand';
delCommand.aliases = ['deletecommand', 'delcom', 'rmcommand', 'rmcom'];
delCommand.permissionsLevel = PermissionsLevel.MOD;

export default delCommand;
