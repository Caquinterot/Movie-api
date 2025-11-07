import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connecdb.js';

class MovieActor extends Model {}

MovieActor.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		movie_id: { type: DataTypes.INTEGER, allowNull: false },
		actor_id: { type: DataTypes.INTEGER, allowNull: false },
	},
	{
		sequelize,
		tableName: 'movie_actors',
		modelName: 'movieActor',
		underscored: true,
		timestamps: true,
		indexes: [{ unique: true, fields: ['movie_id', 'actor_id'] }],
	},
);

export default MovieActor;
