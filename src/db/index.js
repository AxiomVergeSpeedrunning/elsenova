import sequelize from './connection';
import { Command, Alias } from './models';

// Connect the models to the database
export * from './models';

export const findCommand = async name => {
  const directResult = await Command.findOne({ where: { name }, include: { all: true } });
  if (directResult) {
    return directResult;
  }

  const aliasResult = await Alias.findOne({ where: { name } });
  if (aliasResult) {
    return Command.findOne({ where: { id: aliasResult.CommandId }, include: { all: true } });
  }
};

sequelize
  .sync()
  .then(async () => {
    console.log('Database synced');
  })
  .catch(console.error);
