// src/components/ProductCard.jsx (CORRIGIDO)

import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaRegHeart, FaHeart } from 'react-icons/fa'; 
// "Utilizamos a Context API para evitar Prop Drilling. Aqui consumimos Autenticação e Carrinho globalmente."
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 
import './ProductCard.css';

// "Este é um componente reutilizável. Ele recebe os dados via props e renderiza o card dinamicamente."
const ProductCard = ({ product }) => {
  const { 
    isAuthenticated, 
    wishlist, 
    addToWishlist, 
    removeFromWishlist,
    openLoginModal 
  } = useAuth();
  
  const { addToCart } = useCart(); 
  
  // "Performance: Uso do useMemo para recalcular o estado do like apenas quando necessário, otimizando a renderização."
  const isLiked = React.useMemo(() => {
    return wishlist.some((item) => item._id === product._id);
  }, [wishlist, product._id]); 

  
  const handleWishlistClick = (e) => {
    e.preventDefault(); 

    // "UX e Segurança: Validamos se o usuário está logado antes de permitir a ação. Se não, abrimos o Modal de Login."
    if (!isAuthenticated) { 
      openLoginModal ? openLoginModal() : alert('Você precisa estar logado para adicionar aos favoritos.');
      return; 
    }

    // "Interatividade: O estado visual do botão muda instantaneamente baseado na lógica do banco de dados."
    if (isLiked) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        
        {/*"Conceito de SPA: O componente Link garante a navegação entre páginas sem recarregar o navegador (No Refresh)." */}
        <Link to={`/produto/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        <div className="product-hover-actions">
          {/*"Integração direta com o Global State do carrinho ao clicar." */}
          <button onClick={() => addToCart(product)} className="quick-view-btn">
            Adicionar
          </button>
          
          <button 
            onClick={handleWishlistClick} 
            className={`wishlist-btn ${isLiked ? 'liked' : ''}`}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/produto/${product._id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        {/* "Formatação: Tratamento do preço para o padrão monetário brasileiro (BRL) diretamente no front." */}
        <span className="product-price">
          {product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;