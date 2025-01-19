import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY_TEST);

export class PaymentService {
    async createPaymentIntent(paymentInfo) {
        try {
            return await stripe.paymentIntents.create(paymentInfo);
        } catch (error) {
            console.error('Stripe API Error:', error);
            throw new Error('Failed to create Payment Intent');
        }
    }
}
