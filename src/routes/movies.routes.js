import { Router } from 'express';
import {
	listMovies,
	getMovie,
	createMovie,
	updateMovie,
	deleteMovie,
	setMovieGenres,
	setMovieActors,
	setMovieDirectors,
} from '../controllers/movies.controller.js';

const router = Router();

router.get('/', listMovies);
router.get('/:id', getMovie);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

// endpoints especiales:
router.post('/:id/genres', setMovieGenres);
router.post('/:id/actors', setMovieActors);
router.post('/:id/directors', setMovieDirectors);

export default router;
