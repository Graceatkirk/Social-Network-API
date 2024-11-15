import { Router } from 'express';
import { getUsers, createUser, deleteUser } from '../../controllers/userController';

const router = Router();

// POST route to create a user
router.post('/', createUser);

// GET route to get all users
router.get('/', getUsers);

router.delete('/:username', deleteUser);

export default router;
