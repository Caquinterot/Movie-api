import { Actor } from '../models/index.js';

export const listActors = async (_req, res) => {
	const items = await Actor.findAll({
		order: [
			['last_name', 'ASC'],
			['first_name', 'ASC'],
		],
	});
	res.json(items);
};

export const getActor = async (req, res) => {
	const item = await Actor.findByPk(req.params.id);
	if (!item) {
		const e = new Error('Actor no encontrado');
		e.status = 404;
		throw e;
	}
	res.json(item);
};

export const createActor = async (req, res) => {
	const item = await Actor.create(req.body);
	res.status(201).json(item);
};

export const updateActor = async (req, res) => {
	const item = await Actor.findByPk(req.params.id);
	if (!item) {
		const e = new Error('Actor no encontrado');
		e.status = 404;
		throw e;
	}
	const { first_name, last_name, nationality, image, birthday } = req.body;
	if (!first_name || !last_name) {
		const e = new Error('first_name y last_name son requeridos');
		e.status = 400;
		throw e;
	}
	Object.assign(item, { first_name, last_name, nationality, image, birthday });
	await item.save();
	res.json(item);
};

export const deleteActor = async (req, res) => {
	const item = await Actor.findByPk(req.params.id);
	if (!item) {
		const e = new Error('Actor no encontrado');
		e.status = 404;
		throw e;
	}
	const { id, first_name, last_name } = item;
	await item.destroy();
	res.json({
		message: 'Actor eliminado',
		id,
		name: `${first_name} ${last_name}`,
	});
};
