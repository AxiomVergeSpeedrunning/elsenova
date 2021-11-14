import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection';

class Command extends Model {}
Command.init(
  {
    name: DataTypes.STRING,
    output: DataTypes.STRING,
    permissionsLevel: DataTypes.STRING,
    lastUsed: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Command',
    indexes: [
      {
        unique: true,
        fields: ['name'],
      },
    ],
  },
);

export default Command;
