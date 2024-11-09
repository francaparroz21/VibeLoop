import express from 'express';
import { connectDB } from './config.js';
import dotenv from 'dotenv';
import productRoute from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/products', productRoute);
app.use('/api/auth', authRoutes);

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
