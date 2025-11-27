// src/screens/PaymentScreen.jsx (ATUALIZADO)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';
import './PaymentScreen.css'; 

const PaymentScreen = () => {
  const { shippingAddress, paymentMethod, savePaymentMethod } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [method, setMethod] = useState(paymentMethod || 'PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(method);
    
    // NAVEGA PARA A TELA DE RESUMO (em vez do alerta)
    navigate('/placeorder'); 
  };

  return (
    <div className="payment-container">
      {/* Etapas 1 e 2 ativas */}
      <CheckoutSteps step1 step2 />
      
      <form onSubmit={submitHandler} className="payment-form">
        <h1 className="payment-title">Método de Pagamento</h1>
        
        <div className="payment-options">
          <div className="payment-option">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="PayPal"
              checked={method === 'PayPal'}
              onChange={(e) => setMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal ou Cartão de Crédito</label>
          </div>
          
          <div className="payment-option">
            <input
              type="radio"
              id="pix"
              name="paymentMethod"
              value="Pix"
              checked={method === 'Pix'}
              onChange={(e) => setMethod(e.target.value)}
            />
            <label htmlFor="pix">Pix</label>
          </div>
        </div>
        
        <button type="submit" className="btn-action btn-primary">
          Continuar
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;