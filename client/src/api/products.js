import axios from './axios.js';

export const getAllProducts = () => {
  return axios.get('/products', {
    withCredentials: true,  
  });
};

export const getProductById = (productId) => {
  return axios.get(`/products/${productId}`, {
    withCredentials: true,  
  });
};

export const postProduct = (data) => {
  return axios.post('/products', data, {
    withCredentials: true,  
  });
};

export const addProductToUserCart = (productId, userId) => {
  return axios.post(`/products/${productId}/${userId}`, null, {
    withCredentials: true, 
  });
};
