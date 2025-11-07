import { Genre } from '../models/index.js';

export const listGenres = async (_req, res) => {
	const items = await Genre.findAll({ order: [['name', 'ASC']] });
	res.json(items);
};

export const getGenre = async (req, res) => {
	const item = await Genre.findByPk(req.params.id);
	if (!item) {
		const e = new Error('Genero no encontrado');
		e.status = 404;
		throw e;
	}
	res.json(item);
};

export const createGenre = async (req, res) => {
	const { name } = req.body;
	if (!name || !name.trim()) {
		const e = new Error("El campo 'name' es requerido");
		e.status = 400;
		throw e;
	}
	const item = await Genre.create({ name: name.trim() });
	res.status(201).json(item);
};

export const updateGenre = async (req, res) => {
	const item = await Genre.findByPk(req.params.id);
	if (!item) {
		const e = new Error('Género no encontrado');
		e.status = 404;
		throw e;
	}
	const { name } = req.body;
	if (!name || !name.trim()) {
		const e = new Error("El campo 'name' es requerido para PUT");
		e.status = 400;
		throw e;
	}
	item.name = name.trim();
	await item.save();
	res.json(item);
};

export const deleteGenre = async (req, res) => {
	const item = await Genre.findByPk(req.params.id);
	if (!item) {
		const e = new Error('Género no encontrado');
		e.status = 404;
		throw e;
	}
	const { id, name } = item;
	await item.destroy();
	res.json({ message: 'Genero eliminado', id, name });
};
