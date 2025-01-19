import { PaymentService } from '../services/payment.service.js';

// Backend (Node.js con Express)
export const paymentIntent = async (req, res) => {
    try {
        
        const { total } = req.body;
        if (!total || isNaN(total) || parseInt(total) <= 0) {
            return res.status(400).json({ error: 'Invalid total amount' });
        }

        const paymentInfo = {
            amount: parseInt(total), 
            currency: "eur",
            payment_method_types: ['card'],
        };

        
        const service = new PaymentService();
        const paymentIntent = await service.createPaymentIntent(paymentInfo);

        
        return res.status(200).json({ 
            status: "success", 
            client_secret: paymentIntent.client_secret,
            payload: paymentIntent 
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return res.status(500).json({ error: 'Failed to create payment intent' });
    }
};
