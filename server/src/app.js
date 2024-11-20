import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import productRoute from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';
import checkoutRoute from './routes/checkout.route.js';
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
  }));

app.use('/api/products', productRoute);
app.use('/api/checkout', checkoutRoute);
app.use('/api/auth', authRoutes);

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
