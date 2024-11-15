import { Schema, model, Document } from 'mongoose';

// Define the interface for the User model
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];  // Reference to Thought model
  friends: Schema.Types.ObjectId[];   // Reference to other User documents
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
        ref: 'Thought', // References the Thought model
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // References the User model (for friends)
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
  return this.friends.length; // Calculates the length of the friends array
});

// Export the User model as a named and default export
export const User = model<IUser>('User', userSchema);
export default User;
