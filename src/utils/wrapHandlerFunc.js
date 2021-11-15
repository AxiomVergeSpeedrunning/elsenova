import { PermissionsLevel } from 'enums';

const wrapHandlerFunc = handlerFunc => async args => {
  const {
    command,
    aliases = [],
    permissionsLevel = PermissionsLevel.USER,
    cooldown = 2 * 1000, // 2 seconds
    overridesCooldown = PermissionsLevel.MOD,
  } = handlerFunc;

  const commandMatches =
    Boolean(command) && (args.command === command || aliases.includes(args.command));
  const permissionsMatch = args.message.permissionsLevel >= permissionsLevel;

  // Don't hit the DB unless we need to
  if (commandMatches && permissionsMatch) {
    const { lastUsed } = command;

    if (
      !lastUsed ||
      Date.now() - cooldown >= lastUsed ||
      args.message.permissionsLevel >= overridesCooldown
    ) {
      //setLastTimestamp(command);
      handlerFunc(args);
      if (handlerFunc.instance) {
        handlerFunc.instance.lastUsed = Date.now();
        await handlerFunc.instance.save();
      }
    }
  }
};

export default wrapHandlerFunc;
