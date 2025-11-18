import request from 'supertest';
import app from '../app.js';
import { sequelize, Director } from '../models/index.js';

describe('Directors API', () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true });
	});

	test('GET /api/directors debe responder 200 y un arreglo', async () => {
		const res = await request(app).get('/api/directors').expect(200);

		console.log('🟦 GET /api/directors →', res.body);

		expect(Array.isArray(res.body)).toBe(true);
	});

	test('POST /api/directors debe crear un director', async () => {
		const payload = {
			first_name: 'Christopher',
			last_name: 'Nolan',
			nationality: 'UK',
			image: 'https://example.com/nolan.jpg',
			birthday: '1970-07-30',
		};

		const res = await request(app)
			.post('/api/directors')
			.send(payload)
			.expect(201);

		console.log('🟩 POST /api/directors →', res.body);

		expect(res.body.id).toBeDefined();
		expect(res.body.first_name).toBe(payload.first_name);
		expect(res.body.last_name).toBe(payload.last_name);
	});

	test('PUT /api/directors/:id debe actualizar un director', async () => {
		const director = await Director.create({
			first_name: 'Steven',
			last_name: 'Spielberg',
			nationality: 'USA',
			image: null,
			birthday: '1946-12-18',
		});

		const update = {
			first_name: 'Steven Allan',
			last_name: 'Spielberg',
			nationality: 'USA',
			image: 'https://example.com/steven.jpg',
			birthday: '1946-12-18',
		};

		const res = await request(app)
			.put(`/api/directors/${director.id}`)
			.send(update)
			.expect(200);

		console.log(`🟨 PUT /api/directors/${director.id} →`, res.body);

		expect(res.body.first_name).toBe(update.first_name);
	});

	test('DELETE /api/directors/:id debe eliminar un director', async () => {
		const director = await Director.create({
			first_name: 'James',
			last_name: 'Cameron',
			nationality: 'Canada',
			image: null,
			birthday: '1954-08-16',
		});

		const res = await request(app)
			.delete(`/api/directors/${director.id}`)
			.expect(200);

		console.log(`🟥 DELETE /api/directors/${director.id} →`, res.body);

		expect(res.body.message).toBe('Director eliminado');

		const check = await Director.findByPk(director.id);
		expect(check).toBeNull();
	});
});
