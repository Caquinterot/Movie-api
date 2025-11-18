import request from 'supertest';
import app from '../app.js';
import { sequelize, Genre } from '../models/index.js';

describe('Genres API', () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true });
	});

	test('GET /api/genres debe responder 200 y un arreglo', async () => {
		const res = await request(app).get('/api/genres').expect(200);

		console.log('🟦 GET /api/genres →', res.body);

		expect(Array.isArray(res.body)).toBe(true);
	});

	test('POST /api/genres debe crear un género', async () => {
		const payload = { name: 'Action' };

		const res = await request(app)
			.post('/api/genres')
			.send(payload)
			.expect(201);

		console.log('🟩 POST /api/genres →', res.body);

		expect(res.body.id).toBeDefined();
		expect(res.body.name).toBe(payload.name);
	});

	test('PUT /api/genres/:id debe actualizar un género', async () => {
		const genre = await Genre.create({ name: 'Drama' });

		const res = await request(app)
			.put(`/api/genres/${genre.id}`)
			.send({ name: 'Drama Updated' })
			.expect(200);

		console.log(`🟨 PUT /api/genres/${genre.id} →`, res.body);

		expect(res.body.name).toBe('Drama Updated');
	});

	test('DELETE /api/genres/:id debe eliminar un género', async () => {
		const genre = await Genre.create({ name: 'Comedy' });

		const res = await request(app)
			.delete(`/api/genres/${genre.id}`)
			.expect(200);

		console.log(`🟥 DELETE /api/genres/${genre.id} →`, res.body);

		expect(res.body.message).toBe('Genero eliminado');

		const check = await Genre.findByPk(genre.id);
		expect(check).toBeNull();
	});
});
