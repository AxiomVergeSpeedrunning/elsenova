import Command from './command';
import Alias from './alias';

Command.hasMany(Alias, { onDelete: 'CASCADE' });
Alias.belongsTo(Command);

export { default as Command } from './command';
export { default as Alias } from './alias';
export { default as Vore } from './vore';
export { default as Seed } from './seed';
export { default as Sandwich } from './sandwich';
