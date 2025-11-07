import { Router } from 'express';
import {
	listGenres,
	getGenre,
	createGenre,
	updateGenre,
	deleteGenre,
} from '../controllers/genres.controller.js';

const router = Router();
router.get('/', listGenres);
router.get('/:id', getGenre);
router.post('/', createGenre);
router.put('/:id', updateGenre);
router.delete('/:id', deleteGenre);
export default router;
