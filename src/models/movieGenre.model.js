import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connecdb.js';

class MovieGenre extends Model {}

MovieGenre.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		movie_id: { type: DataTypes.INTEGER, allowNull: false },
		genre_id: { type: DataTypes.INTEGER, allowNull: false },
	},
	{
		sequelize,
		tableName: 'movie_genre',
		modelName: 'MovieGenre',
		underscored: true,
		timestamps: true,
		indexes: [{ unique: true, fields: ['movie_id', 'genre_id'] }],
	},
);

export default MovieGenre;
