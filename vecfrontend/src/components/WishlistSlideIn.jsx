// src/components/WishlistSlideIn.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Pega os dados
import { FaTimes, FaRegHeart } from 'react-icons/fa'; // Ícones
import './WishlistSlideIn.css'; // Vamos criar este CSS

// Recebe 'isOpen' e 'closeModal' do App.jsx
const WishlistSlideIn = ({ isOpen, closeModal }) => {
    // 1. Pega a lista de desejos direto do cérebro (AuthContext)
    const { wishlist, removeFromWishlist } = useAuth();

    return (
        <>
            {/* O Overlay (fundo escuro) */}
            <div 
                className={`ws-overlay ${isOpen ? 'open' : ''}`}
                onClick={closeModal} // Fecha ao clicar no fundo
            ></div>

            {/* O Painel Lateral (Slide-in) */}
            <div className={`ws-slide-in ${isOpen ? 'open' : ''}`}>
                <div className="ws-header">
                    <h3>Favoritos ({wishlist.length})</h3>
                    <button onClick={closeModal} className="ws-close-btn">
                        <FaTimes />
                    </button>
                </div>

                <div className="ws-body">
                    {wishlist.length === 0 ? (
                        <div className="ws-empty">
                            <FaRegHeart size={40} />
                            <p>Sua lista de favoritos está vazia.</p>
                            <span>Salve itens clicando no coração.</span>
                        </div>
                    ) : (
                        wishlist.map((item) => (
                            <div key={item._id} className="ws-item">
                                <img src={item.image} alt={item.name} className="ws-item-image" />
                                <div className="ws-item-details">
                                    <Link 
                                        to={`/produto/${item._id}`} 
                                        className="ws-item-name"
                                        onClick={closeModal} // Fecha o modal ao navegar
                                    >
                                        {item.name}
                                    </Link>
                                    <span className="ws-item-price">
                                        {item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => removeFromWishlist(item._id)} 
                                    className="ws-item-remove-btn"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default WishlistSlideIn;