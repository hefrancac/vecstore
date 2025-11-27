// src/screens/PlaceOrderScreen.jsx (CORRIGIDO - ERRO DE SINTAXE)

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutSteps from '../components/CheckoutSteps';
import axios from 'axios'; 
import './PlaceOrderScreen.css'; 

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useCart();
  const { user } = useAuth(); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  const shippingPrice = (itemsPrice > 299 ? 0 : 25.00).toFixed(2);
  const taxPrice = (itemsPrice * 0.05).toFixed(2);
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  
  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, 
        },
      };

      const { data: createdOrder } = await axios.post(
        '/api/orders', 
        {
          orderItems: cartItems.map(item => ({ 
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id, 
          })),
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: Number(itemsPrice),
          taxPrice: Number(taxPrice),
          shippingPrice: Number(shippingPrice),
          totalPrice: Number(totalPrice),
        },
        config
      );

      setLoading(false);
      clearCart(); 
      
      alert('Pedido realizado com sucesso!');
      navigate('/'); 

    } catch (err) {
      // --- CORREÇÃO AQUI ---
      // Removemos o 'L' que estava sobrando
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      // --- FIM DA CORREÇÃO ---
      setLoading(false);
    }
  };

  return (
    <div className="placeorder-container">
      <CheckoutSteps step1 step2 step3 />
      
      <div className="placeorder-grid">
        {/* Coluna da Esquerda: Detalhes */}
        <div className="placeorder-details">
          <div className="order-section">
            <h2>Endereço de Entrega</h2>
            <p>
              <strong>Utilizador: </strong> {user.name} ({user.email})<br />
              <strong>Endereço: </strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>
          <div className="order-section">
            <h2>Pagamento</h2>
            <p><strong>Método: </strong> {paymentMethod}</p>
          </div>
          <div className="order-section">
            <h2>Itens do Pedido</h2>
            {cartItems.length === 0 ? (
              <p>O seu carrinho está vazio.</p>
            ) : (
              <div className="order-items-list">
                {cartItems.map((item) => (
                  <div key={item._id} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <Link to={`/produto/${item._id}`} className="order-item-name">
                      {item.name}
                    </Link>
                    <span className="order-item-price">
                      {item.qty} x {item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} = <strong>{(item.qty * item.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Coluna da Direita: Resumo Financeiro */}
        <div className="placeorder-summary">
          <div className="summary-card">
            <h2>Resumo do Pedido</h2>
            <div className="summary-item">
              <span>Itens:</span>
              <span>{Number(itemsPrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="summary-item">
              <span>Frete:</span>
              <span>{Number(shippingPrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="summary-item">
              <span>Taxas (5%):</span>
              <span>{Number(taxPrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="summary-item total">
              <strong>Total:</strong>
              <strong>{Number(totalPrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong>
            </div>
            
            {error && (
              <div className="summary-item" style={{ color: 'red', display: 'block', fontSize: '0.9rem', textAlign: 'center' }}>
                {error}
              </div>
            )}
            
            <button 
              type="button" 
              className="btn-action btn-primary"
              onClick={placeOrderHandler}
              disabled={cartItems.length === 0 || loading}
            >
              {loading ? 'A processar...' : 'Finalizar Pedido'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;