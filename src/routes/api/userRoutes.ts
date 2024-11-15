import { Router } from 'express';
import { getUsers, createUser } from '../../controllers/userController';

const router = Router();

// POST route to create a user
router.post('/users', createUser);

// GET route to get all users
router.get('/users', getUsers);

export default router;
