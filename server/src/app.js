import express from 'express';
import { connectDB } from './config.js';
import dotenv from 'dotenv';
import phoneStrapRoutes from './routes/accesoriesRoute.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/phone-straps', phoneStrapRoutes);
app.use('/api/auth', authRoutes);

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
