import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connecdb.js';

class MovieDirector extends Model {}

MovieDirector.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		movie_id: { type: DataTypes.INTEGER, allowNull: false },
		director_id: { type: DataTypes.INTEGER, allowNull: false },
	},
	{
		sequelize,
		tableName: 'movie_directors',
		modelName: 'MovieDirector',
		underscored: true,
		timestamps: true,
		indexes: [{ unique: true, fields: ['movie_id', 'director_id'] }],
	},
);

export default MovieDirector;
