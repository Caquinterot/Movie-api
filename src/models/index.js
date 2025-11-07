import sequelize from '../db/connecdb.js';
import Genre from './genre.model.js';
import Actor from './actor.model.js';
import Director from './director.model.js';
import Movie from './movie.model.js';
import MovieGenre from './movieGenre.model.js';
import MovieActor from './movieActor.model.js';
import MovieDirector from './movieDirector.model.js';

// M:N Movie <-> Genre
Movie.belongsToMany(Genre, {
	through: MovieGenre,
	foreignKey: 'movie_id',
	otherKey: 'genre_id',
	as: 'genres',
});
Genre.belongsToMany(Movie, {
	through: MovieGenre,
	foreignKey: 'genre_id',
	otherKey: 'movie_id',
	as: 'movies',
});

// M:N Movie <-> Actor
Movie.belongsToMany(Actor, {
	through: MovieActor,
	foreignKey: 'movie_id',
	otherKey: 'actor_id',
	as: 'actors',
});
Actor.belongsToMany(Movie, {
	through: MovieActor,
	foreignKey: 'actor_id',
	otherKey: 'movie_id',
	as: 'movies',
});

// M:N Movie <-> Director
Movie.belongsToMany(Director, {
	through: MovieDirector,
	foreignKey: 'movie_id',
	otherKey: 'director_id',
	as: 'directors',
});
Director.belongsToMany(Movie, {
	through: MovieDirector,
	foreignKey: 'director_id',
	otherKey: 'movie_id',
	as: 'movies',
});

export {
	sequelize,
	Genre,
	Actor,
	Director,
	Movie,
	MovieGenre,
	MovieActor,
	MovieDirector,
};
