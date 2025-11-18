import request from 'supertest';
import app from '../app.js';
import { sequelize, Movie, Genre, Actor, Director } from '../models/index.js';

describe('Movies API', () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true });
	});

	test('GET /api/movies debe responder 200 y un arreglo', async () => {
		const res = await request(app).get('/api/movies').expect(200);

		console.log('🟦 GET /api/movies →', res.body);

		expect(Array.isArray(res.body)).toBe(true);
	});

	test('POST /api/movies debe crear una película', async () => {
		const payload = {
			name: 'Inception',
			synopsis: 'Dream hacking',
			release_year: 2010,
			image: 'https://example.com/inception.jpg',
		};

		const res = await request(app)
			.post('/api/movies')
			.send(payload)
			.expect(201);

		console.log('🟩 POST /api/movies →', res.body);

		expect(res.body.name).toBe(payload.name);
	});

	test('PUT /api/movies/:id debe actualizar una película', async () => {
		const movie = await Movie.create({
			name: 'Batman Begins',
			release_year: 2005,
		});

		const update = { name: 'Batman Begins Updated', release_year: 2005 };

		const res = await request(app)
			.put(`/api/movies/${movie.id}`)
			.send(update)
			.expect(200);

		console.log(`🟨 PUT /api/movies/${movie.id} →`, res.body);

		expect(res.body.name).toBe(update.name);
	});

	test('DELETE /api/movies/:id debe eliminar una película', async () => {
		const movie = await Movie.create({ name: 'Avatar' });

		const res = await request(app)
			.delete(`/api/movies/${movie.id}`)
			.expect(200);

		console.log(`🟥 DELETE /api/movies/${movie.id} →`, res.body);

		expect(res.body.message).toBe('Película eliminada');
	});

	// ---- Relaciones M:N ----

	test('POST /api/movies/:id/genres debe asignar géneros', async () => {
		const movie = await Movie.create({ name: 'Interstellar' });
		const g1 = await Genre.create({ name: 'Sci-Fi' });
		const g2 = await Genre.create({ name: 'Adventure' });

		const res = await request(app)
			.post(`/api/movies/${movie.id}/genres`)
			.send({ genreIds: [g1.id, g2.id] })
			.expect(200);

		console.log(`🟪 POST /api/movies/${movie.id}/genres →`, res.body);

		expect(res.body.length).toBe(2);
	});

	test('POST /api/movies/:id/actors debe asignar actores', async () => {
		const movie = await Movie.create({ name: 'Tenet' });

		const a1 = await Actor.create({
			first_name: 'John',
			last_name: 'David Washington',
		});

		const a2 = await Actor.create({
			first_name: 'Robert',
			last_name: 'Pattinson',
		});

		const res = await request(app)
			.post(`/api/movies/${movie.id}/actors`)
			.send({ actorIds: [a1.id, a2.id] })
			.expect(200);

		console.log(`🟫 POST /api/movies/${movie.id}/actors →`, res.body);

		expect(res.body.length).toBe(2);
	});

	test('POST /api/movies/:id/directors debe asignar directores', async () => {
		const movie = await Movie.create({ name: 'Dunkirk' });

		const d1 = await Director.create({
			first_name: 'Christopher',
			last_name: 'Nolan',
		});

		const res = await request(app)
			.post(`/api/movies/${movie.id}/directors`)
			.send({ directorIds: [d1.id] })
			.expect(200);

		console.log(`⬛ POST /api/movies/${movie.id}/directors →`, res.body);

		expect(res.body.length).toBe(1);
	});
});
