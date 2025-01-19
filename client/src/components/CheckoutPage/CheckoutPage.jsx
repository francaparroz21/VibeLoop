import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { IoMdArrowBack } from "react-icons/io";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com'; 

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY_TEST);

function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    zipCode: '',
  });
  const [email, setEmail] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cart, clearCart, paymentIntentContext } = useContext(ProductContext);

  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleNextStep = () => setStep(step + 1);
  const handleBackStep = () => setStep(step - 1);

  return (
    <div className="container mx-auto p-16 mt-16">
      <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        {step === 1 && (
          <Step1
            cart={cart}
            total={total}
            shippingDetails={shippingDetails}
            setShippingDetails={setShippingDetails}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 2 && (
          <Step2
            email={email}
            setEmail={setEmail}
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
          />
        )}
        {step === 3 && (
          <Elements stripe={stripePromise}>
            <Step3
              cart={cart}
              total={total}
              email={email}
              shippingDetails={shippingDetails}
              clearCart={clearCart}
              navigate={navigate}
              setPaymentLoading={setPaymentLoading}
              paymentLoading={paymentLoading}
              handleBackStep={handleBackStep}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}

function Step1({ cart, total, shippingDetails, setShippingDetails, handleNextStep }) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>
      <div className="mb-4">
        {cart.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="flex justify-between border-b pb-2 mb-4">
              <span>{item.title} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">Shipping Details</h3>
      <input
        type="text"
        placeholder="Address"
        value={shippingDetails.address}
        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="City"
        value={shippingDetails.city}
        onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={shippingDetails.zipCode}
        onChange={(e) => setShippingDetails({ ...shippingDetails, zipCode: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        className="w-full py-2 px-4 bg-[#8ae083] text-white rounded-lg hover:bg-green-600 transition duration-300"
        onClick={handleNextStep}
      >
        Continue
      </button>
    </>
  );
}

function Step2({ email, setEmail, handleNextStep, handleBackStep }) {
  return (
    <>
      <button className="py-2 px-3 flex items-center bg-pink-400 text-white rounded-lg mb-4" onClick={handleBackStep}>
        <IoMdArrowBack />
        Back
      </button>
      <h2>Enter your email:</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        className="py-2 px-4 bg-[#8ae083] text-white rounded-lg"
        onClick={handleNextStep}
      >
        Continue
      </button>
    </>
  );
}

function Step3({
  email,
  shippingDetails,
  navigate,
  setPaymentLoading,
  paymentLoading,
  handleBackStep,
  clearCart,
  cart
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { paymentIntentContext } = useContext(ProductContext);

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      const { payload } = await paymentIntentContext({ total: Math.round(total * 100) });

      if (!payload) {
        throw new Error('No payment intent data received');
      }

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(payload.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: { email },
        },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message, { position: 'top-center' });
      } else {
        clearCart();
        toast.success('Payment Successful!', { position: 'top-center' });

        emailjs.send(
          'service_vibeloop',  
          'template_82f82gv',  
          {
            email: email,  
            shippingAddress: shippingDetails.address,
            shippingCity: shippingDetails.city,
            shippingZipCode: shippingDetails.zipCode,
            cartItems: cart.map(item => `${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join(', '),  // Formatear el carrito como un string
            total: total.toFixed(2),
            logoUrl: 'https://firebasestorage.googleapis.com/v0/b/asdd-e8832.appspot.com/o/banner%2Flogowbg.jpg?alt=media&token=3f988d0b-5dfc-4cc3-a395-53dcfb098e92',  // URL de tu logo
          },
          'ALHxx5bQWYSrLZfrE'  
        )
          .then((response) => {
            console.log('Email sent successfully', response);
          })
          .catch((error) => {
            console.error('Email sending failed', error);
          });



        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('Payment failed!', { position: 'top-center' });
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <>
      <button className="py-2 px-3 flex items-center bg-pink-400 text-white rounded-lg mb-4" onClick={handleBackStep}>
        <IoMdArrowBack />
        Back
      </button>
      <CardElement
        className="p-2 border rounded mb-4"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#32325d',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#fa755a',
            },
          },
          hidePostalCode: true,
        }}
      />
      <button
        disabled={!stripe || paymentLoading}
        className="w-full py-2 px-4 bg-[#8ae083] text-white rounded-lg"
        onClick={handlePayment}
      >
        {paymentLoading ? 'Processing...' : 'Pay Now'}
      </button>
    </>
  );
}

export default CheckoutPage;
