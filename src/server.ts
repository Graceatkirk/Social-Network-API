import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/api/userRoutes';
import thoughtRoutes from './routes/api/thoughtRoutes'; // Import the thought routes
import dotenv from 'dotenv';

// Initialize dotenv to read from the .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Use express's built-in JSON parser

// Routes
app.use('/api/users', userRoutes); // Existing user routes
app.use('/api/thoughts', thoughtRoutes); // Add thought routes here

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social_network')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
