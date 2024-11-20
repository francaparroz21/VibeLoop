import express from 'express';
import { createOrder } from '../controllers/checkout.controller.js';

const router = express.Router();

router.post('/', createOrder);

export default router;
