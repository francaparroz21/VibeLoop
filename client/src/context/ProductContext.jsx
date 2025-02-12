import React, { createContext, useState, useEffect } from 'react';
import { getAllProducts, postProduct } from '../api/products';
import {createPayment} from '../api/payment'


export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const paymentIntentContext = async (total) => {
    try {
      const response = await createPayment(total)
      return response.data;  
    } catch (error) {
      console.log("Payment error", error);
      throw error; 
    }
  }
  
  const addProduct = async (newProduct) => {
    try {
      const response = await postProduct(newProduct);
      console.log(response)
      setProducts(prevProducts => [...prevProducts, response.data]);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const addToCartByQuantity = (product, quantity) => {
    const existingProduct = cart.find(item => item._id === product._id);
    if (existingProduct) {
      updateCartQuantity(product._id, existingProduct.quantity + quantity);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };
  const clearCart = () => {
    setCart([]);
  };


  const addProductToCart = (product) => {
    const productInCart = cart.find(item => item._id === product._id);

    if (productInCart) {
      setCart(prevCart =>
        prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeProductFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      cart,
      fetchProducts,
      addProduct,
      addProductToCart,
      removeProductFromCart,
      clearCart,
      updateCartQuantity,
      removeFromCart,
      addToCartByQuantity,
      paymentIntentContext
    }}>
      {children}
    </ProductContext.Provider>
  );
};
