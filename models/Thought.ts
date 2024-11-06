import { Schema, model, Document } from 'mongoose';
import { reactionSchema, IReaction } from './Reaction'; // Import Reaction schema

// Define the interface for the Thought model
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

// Create the Thought schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280, // Maximum length of 280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to current timestamp
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Embed the Reaction schema as an array
  },
  {
    toJSON: {
      getters: true, // Enable getters to format the createdAt timestamp
      virtuals: true, // Include virtuals in the returned JSON
    },
    id: false, // Don't include `id` field by default
  }
);

// Add a getter for the createdAt field to format it on query
thoughtSchema.path('createdAt').get(function(this: IThought) {
  return this.createdAt.toISOString(); // Return the ISO string representation of the date
});

// Virtual property for reaction count
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

// Export the Thought model
export const Thought = model<IThought>('Thought', thoughtSchema);
