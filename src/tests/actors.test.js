import request from 'supertest';
import app from '../app.js';
import { sequelize, Actor } from '../models/index.js';

describe('Actors API', () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true });
	});

	test('GET /api/actors debe responder 200 y un arreglo', async () => {
		const res = await request(app).get('/api/actors').expect(200);

		console.log('🟦 GET /api/actors →', res.body);

		expect(Array.isArray(res.body)).toBe(true);
	});

	test('POST /api/actors debe crear un actor con todos los campos válidos', async () => {
		const payload = {
			first_name: 'Robert',
			last_name: 'Downey Jr',
			nationality: 'USA',
			image: 'https://example.com/rdj.jpg',
			birthday: '1965-04-04',
		};

		const res = await request(app)
			.post('/api/actors')
			.send(payload)
			.expect(201);

		console.log('🟩 POST /api/actors →', res.body);

		expect(res.body.id).toBeDefined();
		expect(res.body.first_name).toBe(payload.first_name);
		expect(res.body.last_name).toBe(payload.last_name);
		expect(res.body.nationality).toBe(payload.nationality);
		expect(res.body.image).toBe(payload.image);
		expect(res.body.birthday).toBe(payload.birthday);
	});

	test('PUT /api/actors/:id debe actualizar un actor existente', async () => {
		const actor = await Actor.create({
			first_name: 'Bruce',
			last_name: 'Wayne',
			nationality: 'Gotham',
			image: null,
			birthday: '1972-02-19',
		});

		const updatedPayload = {
			first_name: 'Christian',
			last_name: 'Bale',
			nationality: 'UK',
			image: 'https://example.com/cbale.jpg',
			birthday: '1974-01-30',
		};

		const res = await request(app)
			.put(`/api/actors/${actor.id}`)
			.send(updatedPayload)
			.expect(200);

		console.log(`🟨 PUT /api/actors/${actor.id} →`, res.body);

		expect(res.body.id).toBe(actor.id);
		expect(res.body.first_name).toBe(updatedPayload.first_name);
		expect(res.body.last_name).toBe(updatedPayload.last_name);
		expect(res.body.nationality).toBe(updatedPayload.nationality);
		expect(res.body.image).toBe(updatedPayload.image);
		expect(res.body.birthday).toBe(updatedPayload.birthday);
	});

	test('DELETE /api/actors/:id debe eliminar un actor', async () => {
		const actor = await Actor.create({
			first_name: 'Tom',
			last_name: 'Hanks',
			nationality: 'USA',
			image: null,
			birthday: '1956-07-09',
		});

		const res = await request(app)
			.delete(`/api/actors/${actor.id}`)
			.expect(200);

		console.log(`🟥 DELETE /api/actors/${actor.id} →`, res.body);

		expect(res.body.message).toBe('Actor eliminado');
		expect(res.body.id).toBe(actor.id);
		expect(res.body.name).toBe(`${actor.first_name} ${actor.last_name}`);

		const inDb = await Actor.findByPk(actor.id);
		expect(inDb).toBeNull();
	});
});
