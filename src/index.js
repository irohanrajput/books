import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.route.js';

dotenv.config();
  
const app = express();
const PORT = 3000 || 5000;
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
