import axios from './axios.js'; 

export const createPayment = (data) => {
  return axios.post('/payment/payment-intent', data, {
    headers: {
      'Content-Type': 'application/json', 
    },
    withCredentials: true, 
  });
};
