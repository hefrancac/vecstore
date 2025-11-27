// src/context/AuthContext.jsx (CORRIGIDO)

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')) || null);
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  
  // Referência interna para o timer (para limpar timeouts anteriores)
  const [timerId, setTimerId] = useState(null);

  const showNotification = (message) => {
    if (timerId) clearTimeout(timerId);
    setNotification({ show: true, message });
    const newTimer = setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    setTimerId(newTimer);
  };

  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('userInfo');
    setWishlist([]); 
  }, []);

  const fetchWishlist = useCallback(async (token) => {
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('/api/users/wishlist', config);
      setWishlist(data); 
    } catch (error) {
      if (error.response && error.response.status === 401) logout();
    }
  }, [logout]);

  useEffect(() => {
    if (user && user.token) fetchWishlist(user.token);
    else setWishlist([]); 
  }, [user, fetchWishlist]);

  const addToWishlist = async (productId) => {
    try {
      if (!user || !user.token) throw new Error('Usuário não autenticado');
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('/api/users/wishlist', { productId }, config);
      await fetchWishlist(user.token); 
      showNotification("Adicionado aos Favoritos!");
    } catch (error) { console.error(error); }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/users/wishlist/${productId}`, config);
      await fetchWishlist(user.token); 
      showNotification("Removido dos Favoritos!");
    } catch (error) { console.error(error); }
  };

  const login = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  // (AQUI REMOVEMOS A DUPLICAÇÃO DE LOGOUT/LOGIN)

  const value = { 
      user, isAuthenticated: !!user, login, logout, 
      wishlist, addToWishlist, removeFromWishlist, 
      isWishlistOpen, openWishlist, closeWishlist, notification 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};