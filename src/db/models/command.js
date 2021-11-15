import { DataTypes, Model } from 'sequelize';
import sequelize from 'db/connection';

class Command extends Model {}
Command.init(
  {
    name: DataTypes.STRING,
    output: DataTypes.STRING,
    permissionsLevel: {
      type: DataTypes.INTEGER,
      default: 0,
    },
    lastUsed: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
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
