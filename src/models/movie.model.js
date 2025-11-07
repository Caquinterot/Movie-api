import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connecdb.js';

class Movie extends Model {}

Movie.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING(200), allowNull: false },
		image: { type: DataTypes.TEXT, allowNull: true },
		synopsis: { type: DataTypes.TEXT, allowNull: true },
		release_year: { type: DataTypes.INTEGER, allowNull: true },
	},
	{
		sequelize,
		tableName: 'movies',
		modelName: 'Movie',
		underscored: true,
		timestamps: true,
	},
);

export default Movie;
