import { DataTypes, Model } from 'sequelize';
import sequelize from 'db/connection';

class Seed extends Model {}
Seed.init(
  {
    value: DataTypes.STRING,
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: 'Seed' },
);
export default Seed;
