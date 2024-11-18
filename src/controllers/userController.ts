import { Request, Response } from 'express';
import User from '../models/User';
import Thought from '../models/Thought';
import mongoose, { Schema } from 'mongoose';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    console.log('Users fetched:', users); 
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const user = await User.findById(userId).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await Thought.deleteMany({ username: (await User.findById(userId))?.username });

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User and their thoughts deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
};


export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  try {
    const friendObjectId = friendId as unknown as Schema.Types.ObjectId;

    const user = await User.findById(userId);
    const friend = await User.findById(friendObjectId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    if (user.friends.includes(friendObjectId)) {
      return res.status(400).json({ message: 'Friend already added' });
    }

    user.friends.push(friendObjectId);
    await user.save();

    res.status(200).json({ message: 'Friend added successfully', user });
  } catch (err) {
    console.error('Error adding friend:', err);
    res.status(500).json({ message: 'Server error while adding friend' });
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    await user.save();

    res.status(200).json({ message: 'Friend removed successfully', user });
  } catch (err) {
    console.error('Error removing friend:', err);
    res.status(500).json({ message: 'Server error' });
  }
};