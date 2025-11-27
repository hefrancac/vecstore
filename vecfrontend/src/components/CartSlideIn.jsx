// src/components/CartSlideIn.jsx (FINAL)

import React from 'react';
// SPA: Importação de ferramentas de roteamento para garantir navegação sem refresh
import { Link, useNavigate } from 'react-router-dom';
// INTEGRAÇÃO: Importação do Hook que conecta este componente ao "Cérebro" da aplicação (Context API)
import { useCart } from '../context/CartContext'; 
import './CartSlideIn.css'; 
import { FaTimes, FaTrash } from 'react-icons/fa'; 

const CartSlideIn = () => {
  // ESTADO GLOBAL: Extração direta dos dados e funções de controle, evitando "Prop Drilling"
  const { isCartOpen, closeCart, cartItems, removeFromCart, cartItemCount } = useCart();
  
  const navigate = useNavigate(); 

  // PERFORMANCE: Cálculo do total feito no cliente (Front-end) em tempo real via .reduce(), poupando requisições
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  const handleCheckout = () => {
    // FLUXO DO USUÁRIO: Fecha o modal suavemente antes de trocar a rota para manter a fluidez visual
    closeCart(); 
    navigate('/shipping'); 
  };

  return (
    <>
      {/* UI/UX: O Overlay escuro serve para focar a atenção do usuário exclusivamente no carrinho */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart} 
      ></div>

      {/* ANIMAÇÃO CSS: O uso de classes condicionais ('open') permite a transição deslizante (Slide-in) vinda da direita */}
      <div className={`cart-slide-in ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Carrinho ({cartItemCount})</h3>
          <button onClick={closeCart} className="cart-close-btn">
            <FaTimes />
          </button>
        </div>

        <div className="cart-body">
          {/* RENDERIZAÇÃO CONDICIONAL: Feedback imediato caso não haja itens */}
          {cartItems.length === 0 ? (
            <p className="cart-empty-message">O seu carrinho está vazio.</p>
          ) : (
            // LISTAGEM DINÂMICA: Mapeamento do array de objetos vindo do Contexto
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  
                  {/* NAVEGAÇÃO INTERNA: O Link permite ir ao produto mantendo o estado da aplicação carregado */}
                  <Link 
                    to={`/produto/${item._id}`} 
                    className="cart-item-name"
                    onClick={closeCart} 
                  >
                    {item.name}
                  </Link>

                  <span className="cart-item-price">
                    {item.qty} x {item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                
                {/* INTERATIVIDADE: Botão que dispara a ação de remoção no Contexto e atualiza o total instantaneamente */}
                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="cart-item-remove-btn"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              {/* FORMATAÇÃO: Exibição do valor calculado em BRL */}
              <span>{totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            
            <button onClick={handleCheckout} className="cart-checkout-btn">
              Ir para o Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSlideIn;