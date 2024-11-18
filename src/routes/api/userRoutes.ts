import { Router } from 'express';
import { getUsers, createUser, getUserById, deleteUserById, addFriend, removeFriend } from '../../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.delete('/:userId', deleteUserById);

router.put('/:userId/friends/:friendId', addFriend);
router.delete('/:userId/friends/:friendId', removeFriend);


export default router;
