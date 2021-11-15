import { DataTypes, Model } from 'sequelize';
import sequelize from 'db/connection';

class Vore extends Model {}
Vore.init(
  {
    user: DataTypes.STRING,
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: 'Vore' },
);

export default Vore;
