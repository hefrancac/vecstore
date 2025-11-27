// src/components/CheckoutSteps.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './CheckoutSteps.css'; // Vamos criar este CSS

// Recebe props (step1, step2, step3) para saber qual etapa destacar
const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <nav className="checkout-steps">
      {/* Etapa 1: Endereço */}
      <div className={`step ${step1 ? 'active' : ''}`}>
        {step1 ? (
          <Link to="/shipping">Endereço</Link>
        ) : (
          <span>Endereço</span>
        )}
      </div>
      
      {/* Etapa 2: Pagamento */}
      <div className={`step ${step2 ? 'active' : ''}`}>
        {step2 ? (
          <Link to="/payment">Pagamento</Link>
        ) : (
          <span>Pagamento</span>
        )}
      </div>
      
      {/* Etapa 3: Finalizar (Futuro) */}
      <div className={`step ${step3 ? 'active' : ''}`}>
        {step3 ? (
          <Link to="/placeorder">Finalizar Pedido</Link>
        ) : (
          <span>Finalizar Pedido</span>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;