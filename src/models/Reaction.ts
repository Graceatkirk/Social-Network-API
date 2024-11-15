import { Schema, Types } from 'mongoose';

// Define the Reaction interface
interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Define the reactionSchema
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Default to a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, // Maximum length for reaction body
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to the current timestamp
    },
  },
  {
    toJSON: {
      virtuals: true, // Include virtual properties when data is requested
    },
    id: false, // Don't include `id` field by default
  }
);

// Add a getter to format createdAt as an ISO string
reactionSchema.path('createdAt').get(function(this: IReaction) {
  return this.createdAt.toISOString(); // Return the ISO string representation of the date
});

// Export the Reaction schema (no need to export as a model, since it’s used in Thought)
export { reactionSchema, IReaction };
