import Command from './command';
import Alias from './alias';

Command.hasMany(Alias);
Alias.belongsTo(Command);

export { Command, Alias };
