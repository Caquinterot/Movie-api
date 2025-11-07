import { Movie, Genre, Actor, Director } from '../models/index.js';

export const listMovies = async (_req, res) => {
	const item = await Movie.findAll({
		order: [
			['release_year', 'DESC'],
			['name', 'ASC'],
		],
		include: [
			{
				model: Genre,
				as: 'genres',
				attributes: ['id', 'name'],
				through: { attributes: [] },
			},
			{
				model: Actor,
				as: 'actors',
				attributes: ['id', 'first_name', 'last_name'],
				through: { attributes: [] },
			},
			{
				model: Director,
				as: 'directors',
				attributes: ['id', 'first_name', 'last_name'],
				through: { attributes: [] },
			},
		],
	});
	if (!item) {
		const e = new Error('Película no encontrada');
		e.status = 404;
		throw e;
	}
	res.json(item);
};

export const getMovie = async (req, res) => {
	const item = await Movie.findByPk(req.params.id, {
		include: [
			{
				model: Genre,
				as: 'genres',
				attributes: ['id', 'name'],
				through: { attributes: [] },
			},
			{
				model: Actor,
				as: 'actors',
				attributes: ['id', 'first_name', 'last_name'],
				through: { attributes: [] },
			},
			{
				model: Director,
				as: 'directors',
				attributes: ['id', 'first_name', 'last_name'],
				through: { attributes: [] },
			},
		],
	});
	if (!item) {
		const e = new Error('Película no encontrada');
		e.status = 404;
		throw e;
	}
	res.json(item);
};

export const createMovie = async (req, res) => {
	const { name } = req.body;
	if (!name || !name.trim()) {
		const e = new Error("El campo 'name' es requerido");
		e.status = 400;
		throw e;
	}
	const item = await Movie.create(req.body);
	res.status(201).json(item);
};

export const updateMovie = async (req, res) => {
	const item = await Movie.findByPk(req.params.id);
	if (!item) {
		const e = new Error('Película no encontrada');
		e.status = 404;
		throw e;
	}
	const { name, image, synopsis, release_year } = req.body;
	if (!name || !name.trim()) {
		const e = new Error("El campo 'name' es requerido para PUT");
		e.status = 400;
		throw e;
	}
	Object.assign(item, { name: name.trim(), image, synopsis, release_year });
	await item.save();
	res.json(item);
};

export const deleteMovie = async (req, res) => {
	const item = await Movie.findByPk(req.params.id);
	if (!item) {
		const e = new Error('Película no encontrada');
		e.status = 404;
		throw e;
	}
	const { id, name } = item;
	await item.destroy();
	res.json({ message: 'Película eliminada', id, name });
};

// ---- Relaciones M:N: setGenres, setActors, setDirectors ----

export const setMovieGenres = async (req, res) => {
	const movie = await Movie.findByPk(req.params.id);
	if (!movie) {
		const e = new Error('Película no encontrada');
		e.status = 404;
		throw e;
	}
	const { genreIds } = req.body;
	if (!Array.isArray(genreIds)) {
		const e = new Error("Se requiere 'genreIds' como arreglo");
		e.status = 400;
		throw e;
	}

	if (genreIds.length) {
		const found = await Genre.findAll({ where: { id: genreIds } });
		if (found.length !== genreIds.length) {
			const ok = found.map((g) => g.id);
			const missing = genreIds.filter((id) => !ok.includes(id));
			const e = new Error(
				`IDs de géneros inexistentes: [${missing.join(', ')}]`,
			);
			e.status = 400;
			throw e;
		}
	}
	await movie.setGenres(genreIds);
	const genres = await movie.getGenres({ joinTableAttributes: [] });
	res.json(genres);
};

export const setMovieActors = async (req, res) => {
	const movie = await Movie.findByPk(req.params.id);
	if (!movie) {
		const e = new Error('Película no encontrada');
		e.status = 404;
		throw e;
	}
	const { actorIds } = req.body;
	if (!Array.isArray(actorIds)) {
		const e = new Error("Se requiere 'actorIds' como arreglo");
		e.status = 400;
		throw e;
	}

	if (actorIds.length) {
		const found = await Actor.findAll({ where: { id: actorIds } });
		if (found.length !== actorIds.length) {
			const ok = found.map((a) => a.id);
			const missing = actorIds.filter((id) => !ok.includes(id));
			const e = new Error(
				`IDs de actores inexistentes: [${missing.join(', ')}]`,
			);
			e.status = 400;
			throw e;
		}
	}
	await movie.setActors(actorIds);
	const actors = await movie.getActors({ joinTableAttributes: [] });
	res.json(actors);
};

export const setMovieDirectors = async (req, res) => {
	const movie = await Movie.findByPk(req.params.id);
	if (!movie) {
		const e = new Error('Película no encontrada');
		e.status = 404;
		throw e;
	}
	const { directorIds } = req.body;
	if (!Array.isArray(directorIds)) {
		const e = new Error("Se requiere 'directorIds' como arreglo");
		e.status = 400;
		throw e;
	}

	if (directorIds.length) {
		const found = await Director.findAll({ where: { id: directorIds } });
		if (found.length !== directorIds.length) {
			const ok = found.map((d) => d.id);
			const missing = directorIds.filter((id) => !ok.includes(id));
			const e = new Error(
				`IDs de directores inexistentes: [${missing.join(', ')}]`,
			);
			e.status = 400;
			throw e;
		}
	}
	await movie.setDirectors(directorIds);
	const directors = await movie.getDirectors({ joinTableAttributes: [] });
	res.json(directors);
};
