import { Schema, model } from 'mongoose';
import { reactionSchema } from './Reaction'; // Import the reaction schema

// Define the Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true, // Tracks who created the thought
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: number) => new Date(timestamp).toLocaleString(), // Format the date
    },
    reactions: [reactionSchema], // Use the reactionSchema for reactions
  },
  {
    toJSON: {
      virtuals: true, // Enable virtuals (e.g., reaction count)
      getters: true, // Enable date formatting
    },
    id: false, // Don't include the `id` field by default
  }
);

// Virtual field for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Export the Thought model
const Thought = model('Thought', thoughtSchema);
export default Thought;
