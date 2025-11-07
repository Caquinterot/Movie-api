import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connecdb.js';

class Genre extends Model {}

Genre.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
	},
	{
		sequelize,
		tableName: 'genres',
		modelName: 'Genre',
		underscored: true,
		timestamps: true,
	},
);

export default Genre;
