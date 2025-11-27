// src/components/Header.jsx (COMPLETO E CORRIGIDO)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import {
  FaSearch,
  FaRegHeart,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaUser
} from 'react-icons/fa';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = ({ toggleSearch, openSignUpModal, openLoginModal }) => {
  const { openCart, cartItemCount } = useCart();
  const { user, isAuthenticated, logout, openWishlist } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen(prev => !prev);

  const handleUserAction = (action) => {
    setIsUserMenuOpen(false);

    if (action === 'logout') {
      logout();
    } else if (action === 'register') {
      openSignUpModal();
    } else if (action === 'login') {
      openLoginModal();
    }
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      openLoginModal();
    } else {
      openWishlist();
    }
  };

  return (
    <>
      <div className="promo-bar">
        Frete grátis para pedidos acima de R$299
      </div>

      <header className="header-fixed">
        <nav className="navbar">

          <div className="logo">
            <Link to="/">V&Campolina</Link>
          </div>

          {/* 1. MENU DESKTOP */}
          <ul className="nav-menu-desktop">
            <li><Link to="/">Novidades</Link></li>
            <li><Link to="/categoria/Masculino">Masculino</Link></li>
            <li><Link to="/categoria/Feminino">Feminino</Link></li>
            <li><Link to="/categoria/Treino">Treino</Link></li>
            <li><Link to="/categoria/Casual">Casual</Link></li>
          </ul>

          <div className="nav-icons">
            <button onClick={toggleSearch} className="nav-icon search-icon-btn">
              <FaSearch />
            </button>

            <button onClick={handleWishlistClick} className="nav-icon wishlist-icon-btn">
              <FaRegHeart />
            </button>

            {/* User Menu */}
            <div className="user-menu-container">
              <button onClick={toggleUserMenu} className="nav-icon user-icon-btn">
                {isAuthenticated ? user.name.split(' ')[0] : <FaUser />}
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown-menu">
                  {isAuthenticated ? (
                    <>
                      <button disabled style={{ opacity: 0.7 }}>
                        Olá, {user.name.split(' ')[0]}
                      </button>
                      <button onClick={() => handleUserAction('logout')}>Sair</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleUserAction('login')}>Login</button>
                      <button onClick={() => handleUserAction('register')}>Cadastrar-se</button>
                    </>
                  )}
                </div>
              )}
            </div>

            <button onClick={openCart} className="nav-icon cart-icon-btn">
              <FaShoppingBag />
              {cartItemCount > 0 && (
                <span className="cart-count-badge">{cartItemCount}</span>
              )}
            </button>

            <button className="hamburger-btn" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </header>

      {/* 2. MENU MOBILE */}
      <div className={`nav-menu-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul onClick={() => setIsMobileMenuOpen(false)}>
          <li><Link to="/">Novidades</Link></li>
          <li><Link to="/categoria/Masculino">Masculino</Link></li>
          <li><Link to="/categoria/Feminino">Feminino</Link></li>
          <li><Link to="/categoria/Treino">Treino</Link></li>
          <li><Link to="/categoria/Casual">Casual</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Header;