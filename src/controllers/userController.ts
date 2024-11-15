import { Request, Response } from 'express';
import User from '../models/User';
import Thought from '../models/Thought';

// Create a new user
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

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    console.log('Users fetched:', users); // Optional logging
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params; // Get the username from the request parameters

  try {
    // Delete all thoughts associated with this user
    await Thought.deleteMany({ username });

    // Delete the user
    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User and associated thoughts deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
};