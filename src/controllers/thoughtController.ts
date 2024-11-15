import { Request, Response } from 'express'; // Import the necessary types
import Thought from '../models/Thought'; // Import the Thought model

// 1. Create a new thought
export const createThought = async (req: Request, res: Response) => {  // Type the parameters
  try {
    const { thoughtText, username } = req.body;
    const newThought = new Thought({
      thoughtText,
      username,
      createdAt: new Date(),
      reactions: [],
    });

    await newThought.save();
    res.status(201).json(newThought); // Respond with the new thought
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating thought' });
  }
};

// 2. Get all thoughts
export const getThoughts = async (req: Request, res: Response) => {  // Type the parameters
  try {
    const thoughts = await Thought.find(); // Retrieve all thoughts
    res.status(200).json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving thoughts' });
  }
};

// 3. Add a reaction to a specific thought
export const addReaction = async (req: Request, res: Response) => {  // Type the parameters
  try {
    const { thoughtId } = req.params; // Get the thought ID from the request params
    const { reactionBody, username } = req.body; // Get the reaction details from the request body

    // Find the thought by ID and push the new reaction to the reactions array
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    thought.reactions.push({
      reactionBody,
      username,
      createdAt: new Date(),
    });

    await thought.save();
    res.status(200).json(thought); // Return the updated thought with the new reaction
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding reaction' });
  }
};

