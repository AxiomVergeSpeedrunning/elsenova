import { DataTypes, Model } from 'sequelize';
import sequelize from 'db/connection';

class Sandwich extends Model {}
Sandwich.init(
  { name: DataTypes.STRING, isSandwich: DataTypes.BOOLEAN },
  { sequelize, modelName: 'Sandwich' },
);

export default Sandwich;
