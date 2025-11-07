import { Director } from '../models/index.js';

export const listDirectors = async (_req, res) => {
	const items = await Director.findAll({
		order: [
			['last_name', 'ASC'],
			['first_name', 'ASC'],
		],
	});
	res.json(items);
};

export const getDirector = async (req, res) => {
	const item = await Director.findByPk(req.params.id);
	if (!item) {
		const e = new Error('Director no encontrado');
		e.status = 404;
		throw e;
	}
	res.json(item);
};

export const createDirector = async (req, res) => {
	const item = await Director.create(req.body);
	res.status(201).json(item);
};

export const updateDirector = async (req, res) => {
	const item = await Director.findByPk(req.params.id);
	if (!item) {
		const e = new Error('Director no encontrado');
		e.status = 404;
		throw e;
	}
	const { first_name, last_name, nationality, image, birthday } = req.body;
	Object.assign(item, { first_name, last_name, nationality, image, birthday });
	await item.save();
	res.json(item);
};

export const deleteDirector = async (req, res) => {
	const item = await Director.findByPk(req.params.id);
	if (!item) {
		const e = new Error('Director no encontrado');
		e.status = 404;
		throw e;
	}
	const { id, first_name, last_name } = item;
	await item.destroy();
	res.json({
		message: 'Director eliminado',
		id,
		name: `${first_name} ${last_name}`,
	});
};
