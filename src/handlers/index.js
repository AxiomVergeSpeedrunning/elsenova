import add from './add';
import alias from './alias';
import dailySeed from './dailySeed';
import edit from './edit';
import permissions from './permissions';
import remove from './remove';
import sandwich from './sandwich';
import seed from './seed';
import vore from './vore';
import { wrapHandlerFunc } from 'utils';

export default [add, alias, remove, permissions, edit, vore, sandwich, seed, dailySeed].map(
  wrapHandlerFunc,
);
