
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { loginUser, logoutUser, postUser } from '../api/users';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (emailOrUsername, password) => {
    setLoading(true); 
    try {
      console.log('Sending login request', { emailOrUsername, password });

      
      const response = await loginUser({ emailOrUsername, password });

     
      setUser(response.data.user);

      
      localStorage.setItem('token', response.data.token);

      
      return response;
    } catch (error) {
      console.error("Error during login process", error);

      
      if (error.response && error.response.data) {
        const backendError = error.response.data.message || 'An error occurred';
        throw new Error(backendError); 
      }

      
      throw new Error('Unable to login. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };


  const signup = async (user) => {
    setLoading(true);
    try {
      await postUser(user)
    } catch (error) {
      console.error("Error in signup process:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await logoutUser()
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
