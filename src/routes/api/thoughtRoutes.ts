import { Router } from 'express';
import { createThought, getThoughts, addReaction, deleteReaction, deleteThought } from '../../controllers/thoughtController';

const router = Router();


router.post('/', createThought); 
router.get('/', getThoughts);
router.delete('/:thoughtId', deleteThought);

router.post('/:thoughtId/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

export default router;
