import { Router } from 'express';
import {
	listDirectors,
	getDirector,
	createDirector,
	updateDirector,
	deleteDirector,
} from '../controllers/directors.controller.js';

const router = Router();

router.get('/', listDirectors);
router.get('/:id', getDirector);
router.post('/', createDirector);
router.put('/:id', updateDirector);
router.delete('/:id', deleteDirector);

export default router;
