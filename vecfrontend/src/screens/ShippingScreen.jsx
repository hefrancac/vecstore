// src/screens/ShippingScreen.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import CheckoutSteps from '../components/CheckoutSteps'; 
import './ShippingScreen.css'; 

const ShippingScreen = () => {
  // 1. Agora pegamos também 'cartItems' do contexto
  const { shippingAddress, saveShippingAddress, cartItems } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || 'Brasil');

  // Calcula o subtotal para mostrar no resumo
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment'); 
  };

  return (
    <div className="shipping-wrapper">
      {/* Checkout Steps fica no topo */}
      <div className="steps-container">
        <CheckoutSteps step1 />
      </div>

      <div className="shipping-content-grid">
        
        {/* --- COLUNA DA ESQUERDA: RESUMO DO PEDIDO --- */}
        <div className="order-summary-preview">
          <h2>Resumo do Pedido</h2>
          <div className="mini-cart-list">
            {cartItems.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="mini-cart-item">
                  <div className="mini-img-wrapper">
                    <img src={item.image} alt={item.name} />
                    <span className="mini-qty">{item.qty}</span>
                  </div>
                  <div className="mini-details">
                    <h4>{item.name}</h4>
                    {/* Mostra cor/tamanho se existirem no objeto, senão oculta */}
                    <p className="mini-variant">
                      {item.selectedSize && <span>Tam: {item.selectedSize}</span>}
                      {item.selectedColor && <span> | Cor: {item.selectedColor}</span>}
                    </p>
                    <span className="mini-price">
                      {item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mini-total">
            <span>Subtotal:</span>
            <strong>{itemsPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong>
          </div>
        </div>

        {/* --- COLUNA DA DIREITA: FORMULÁRIO (O que já existia) --- */}
        <div className="shipping-form-container">
          <form onSubmit={submitHandler} className="shipping-form">
            <h1 className="shipping-title">Endereço de Entrega</h1>
            
            <div className="form-group">
              <label htmlFor="address">Endereço (Rua, Número, Bairro)</label>
              <input
                type="text"
                id="address"
                placeholder="Ex: Rua das Flores, 123, Centro"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="city">Cidade</label>
              <input
                type="text"
                id="city"
                placeholder="Ex: São Paulo"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="postalCode">CEP</label>
              <input
                type="text"
                id="postalCode"
                placeholder="Ex: 01000-000"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="country">País</label>
              <input
                type="text"
                id="country"
                placeholder="Ex: Brasil"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn-action btn-primary">
              Continuar para Pagamento
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ShippingScreen;