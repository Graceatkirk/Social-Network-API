import { Schema, model } from 'mongoose';
import { reactionSchema } from './Reaction'; 

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
      required: true, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema], 
  },
  {
    toJSON: {
      virtuals: true, 
    },
    id: false, 
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
export default Thought;
