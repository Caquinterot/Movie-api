import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connecdb.js';

class Actor extends Model {}

Actor.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		first_name: { type: DataTypes.STRING(100), allowNull: false },
		last_name: { type: DataTypes.STRING(100), allowNull: false },
		nationality: { type: DataTypes.STRING(100), allowNull: true },
		image: { type: DataTypes.TEXT, allowNull: true },
		birthday: { type: DataTypes.DATEONLY, allowNull: true },
	},
	{
		sequelize,
		tableName: 'actors',
		modelName: 'Actor',
		underscored: true,
		timestamps: true,
	},
);

export default Actor;
