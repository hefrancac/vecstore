// src/context/CartContext.jsx (ATUALIZADO COM clearCart)

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// Padrão de Custom Hook: Facilita o consumo desse contexto em qualquer página sem precisar de imports repetitivos
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Persistência (UX): O estado inicial busca dados do LocalStorage para evitar que o carrinho suma ao dar F5
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );
  
  // Fluxo de Checkout: Centralização dos dados de envio no estado global para facilitar a finalização da compra
  const [shippingAddress, setShippingAddress] = useState(
    JSON.parse(localStorage.getItem('shippingAddress')) || {}
  );

  const [paymentMethod, setPaymentMethod] = useState(
    JSON.parse(localStorage.getItem('paymentMethod')) || 'PayPal'
  );

  // Controle de UI: Gerenciamos a abertura do modal/sidebar do carrinho globalmente
  const [isCartOpen, setIsCartOpen] = useState(false); 

  // Sincronização: O useEffect garante que qualquer mudança no estado do React atualize automaticamente o banco do navegador
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (productToAdd) => {
    // Lógica de Negócio: Verifica se o item já existe para apenas incrementar a quantidade (evita duplicidade visual)
    const existingItem = cartItems.find((item) => item._id === productToAdd._id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === productToAdd._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      // Imutabilidade: Cria um novo array copiando o anterior e adicionando o novo item
      setCartItems([...cartItems, { ...productToAdd, qty: 1 }]);
    }
    // UX: Feedback imediato abrindo o carrinho ao adicionar
    openCart(); 
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };
  
  const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  const savePaymentMethod = (method) => {
    setPaymentMethod(method);
    localStorage.setItem('paymentMethod', JSON.stringify(method));
  };

  // Limpeza de Estado: Função essencial para resetar o fluxo após o sucesso do pedido
  const clearCart = () => {
    setCartItems([]);
  };
  
  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    openCart,
    closeCart,
    // Dado Derivado: Cálculo do número total de itens feito em tempo real com reduce (sem estado extra)
    cartItemCount: cartItems.reduce((total, item) => total + item.qty, 0),
    
    shippingAddress,
    saveShippingAddress,
    
    paymentMethod,
    savePaymentMethod,
    
    clearCart, 
  };

  return (
    // Provider: Engloba toda a aplicação (App.js) permitindo acesso universal a esses dados
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};