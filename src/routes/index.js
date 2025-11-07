import { Router } from 'express';
import genres from './genres.routes.js';
import actors from './actors.routes.js';
import directors from './directors.routes.js';
import movies from './movies.routes.js';

const router = Router();
router.use('/genres', genres);
router.use('/actors', actors);
router.use('/directors', directors);
router.use('/movies', movies);

export default router;
