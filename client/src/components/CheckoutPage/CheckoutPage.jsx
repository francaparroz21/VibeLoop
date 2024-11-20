import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';

function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ emailOrUsername: '', password: '' });
  const [errors, setErrors] = useState({});
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    zipCode: '',
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvc: '',
  });

  const { user, login } = useContext(AuthContext);
  const { cart } = useContext(ProductContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleNextStep = () => setStep(step + 1);

  const handleConfirmOrder = () => {
    console.log('Order confirmed', {
      shippingDetails,
      cardDetails,
    });
    navigate('/payment');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await login(formData.emailOrUsername, formData.password);
      setStep(step + 1);
    } catch (err) {
      if (err.response && err.response.data) {
        const backendErrors = err.response.data.errors || { form: err.response.data.message };
        setErrors(backendErrors);
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  const formatCardNumber = (number) => {
    return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className="container mx-auto p-16 mt-16">
      <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        {step === 1 && (
          <div className="mb-6">
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
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 mb-2 border rounded"
                placeholder="Address"
                value={shippingDetails.address}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, address: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full p-2 mb-2 border rounded"
                placeholder="City"
                value={shippingDetails.city}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, city: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full p-2 mb-2 border rounded"
                placeholder="Postal Code"
                value={shippingDetails.zipCode}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, zipCode: e.target.value })
                }
              />
            </div>

            <button
              className="w-full py-2 px-4 bg-[#8ae083] text-white rounded-lg hover:bg-green-600 transition duration-300"
              onClick={handleNextStep}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            {user ? (
              <div className="text-center">
                <p className="mb-4">Continue as <span className="font-bold">{user.username}</span></p>
                <button
                  className="py-2 px-4 bg-[#8ae083] text-white rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={handleNextStep}
                >
                  Continue
                </button>
              </div>
            ) : (
              <div>
                <form onSubmit={handleLoginSubmit} className="mb-6">
                  <div className="mb-4">
                    <label
                      htmlFor="emailOrUsername"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email or Username
                    </label>
                    <input
                      type="text"
                      id="emailOrUsername"
                      name="emailOrUsername"
                      value={formData.emailOrUsername}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${
                        errors.emailOrUsername ? 'border-red-500' : 'border-gray-300'
                      } rounded-md`}
                      placeholder="Enter your email or username"
                      required
                    />
                    {errors.emailOrUsername && (
                      <p className="text-red-500 text-sm mt-1">{errors.emailOrUsername}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      } rounded-md`}
                      placeholder="Enter your password"
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  {errors.form && <p className="text-red-500 text-sm mb-4">{errors.form}</p>}

                  <button
                    type="submit"
                    className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-300"
                  >
                    Log In
                  </button>
                </form>

                <button
                  className="w-full py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
                  onClick={handleNextStep}
                >
                  Continue without login
                </button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="relative w-full max-w-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                <div className="absolute top-4 right-4 text-sm">VISA</div>
                <div className="text-lg font-medium tracking-wider mt-4">
                  {cardDetails.cardNumber
                    ? formatCardNumber(cardDetails.cardNumber)
                    : '#### #### #### ####'}
                </div>
                <div className="flex justify-between mt-6">
                  <div>
                    <span className="block text-xs">CARDHOLDER</span>
                    <span className="block font-medium mt-1">
                      {cardDetails.cardName || 'FULL NAME'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs">EXPIRES</span>
                    <span className="block font-medium mt-1">
                      {cardDetails.expiryDate || 'MM/YY'}
                    </span>
                  </div>
                </div>
              </div>

              <form className="w-full max-w-lg">
                <div className="mb-4">
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="cardName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="expiryDate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      value={cardDetails.cvc}
                      onChange={handleCardInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="123"
                      maxLength="3"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                  onClick={handleConfirmOrder}
                >
                  Confirm Payment
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
