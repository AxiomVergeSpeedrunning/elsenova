import { DataTypes, Model } from 'sequelize';
import sequelize from 'db/connection';

class Alias extends Model {}
Alias.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Alias',
    indexes: [
      {
        unique: true,
        fields: ['name'],
      },
    ],
  },
);

export default Alias;
