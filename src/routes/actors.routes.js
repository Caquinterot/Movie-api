import { Router } from 'express';
import {
	listActors,
	getActor,
	createActor,
	updateActor,
	deleteActor,
} from '../controllers/actors.controller.js';

const router = Router();
router.get('/', listActors);
router.get('/:id', getActor);
router.post('/', createActor);
router.put('/:id', updateActor);
router.delete('/:id', deleteActor);

export default router;
