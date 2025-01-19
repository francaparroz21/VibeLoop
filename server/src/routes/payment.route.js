import express from 'express';
import { paymentIntent } from '../controllers/payment.controller.js';

const router = express.Router();

router.post("/payment-intent", paymentIntent)

export default router;
