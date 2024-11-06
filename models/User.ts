import { Schema, model, Document } from 'mongoose';

// Define the interface for the User model
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
  friendCount: number;
}

// Create the User schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Trims extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email validation regex
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // Include virtuals in the returned JSON
    },
    id: false, // Don't include `id` field by default
  }
);

// Virtual property for friend count
userSchema.virtual('friendCount').get(function (this: IUser) {
  return this.friends.length;
});

// Export the User model
export const User = model<IUser>('User', userSchema);
