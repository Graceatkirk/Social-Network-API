// routes/api/thoughtRoutes.ts
import { Router } from 'express';
import { createThought, getThoughts, addReaction } from '../../controllers/thoughtController';

const router = Router();

// POST route to create a new thought
router.post('/', createThought); // Ensure this matches '/api/thoughts'

// GET route to retrieve all thoughts
router.get('/', getThoughts);

// POST route to add a reaction to a specific thought
router.post('/:thoughtId/reactions', addReaction);

export default router;
