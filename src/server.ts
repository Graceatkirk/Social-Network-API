import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/api/userRoutes';
import thoughtRoutes from './routes/api/thoughtRoutes'; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use('/api/users', userRoutes); 
app.use('/api/thoughts', thoughtRoutes); 

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
