import { Request, Response } from 'express'; 
import Thought from '../models/Thought'; 


export const createThought = async (req: Request, res: Response) => {  
  try {
    const { thoughtText, username } = req.body;
    const newThought = new Thought({
      thoughtText,
      username,
      createdAt: new Date(),
      reactions: [],
    });

    await newThought.save();
    res.status(201).json(newThought); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating thought' });
  }
};

export const getThoughts = async (req: Request, res: Response) => {  
  try {
    const thoughts = await Thought.find(); 
    res.status(200).json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving thoughts' });
  }
};

export const deleteThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params; 
  
    try {
      const thought = await Thought.findByIdAndDelete(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting thought' });
    }
  };

export const addReaction = async (req: Request, res: Response) => {  
  try {
    const { thoughtId } = req.params; 
    const { reactionBody, username } = req.body; 

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
    res.status(200).json(thought); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding reaction' });
  }
};


export const deleteReaction = async (req: Request, res: Response) => {
    const { thoughtId, reactionId } = req.params; 
  
    try {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } }, 
        { new: true } 
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.status(200).json({ message: 'Reaction deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting reaction' });
    }
  };
  