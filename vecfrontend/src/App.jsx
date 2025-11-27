// src/App.jsx (COMPLETO E ATUALIZADO com a rota /placeorder)

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 

// --- 1. Importar Componentes de Layout ---
import Header from './components/Header';
import CartSlideIn from './components/CartSlideIn';
import Footer from './components/Footer';
import SearchOverlay from './components/SearchOverlay';
import WishlistSlideIn from './components/WishlistSlideIn'; 
import NotificationPopup from './components/NotificationPopup';
import ProtectedRoute from './components/ProtectedRoute'; // O "Segurança"

// --- 2. Importar Modals ---
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal'; 

// --- 3. Importar Telas (Screens) ---
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CategoryScreen from './screens/CategoryScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen'; 
import PlaceOrderScreen from './screens/PlaceOrderScreen'; // <-- NOVO IMPORT

function App() {
  const { login, isWishlistOpen, closeWishlist } = useAuth(); 

  // Estados para os Modais/Overlays
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Funções de Controle
  const toggleSearch = () => setIsSearchOpen(prev => !prev);
  const closeSearch = () => setIsSearchOpen(false);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);
  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  
  const handleLoginSuccess = (userInfo) => {
      login(userInfo); 
      closeSignUpModal();
      closeLoginModal();
  };

  return (
    <Router>
      {/* --- 4. Componentes Globais (Layout) --- */}
      <Header 
        toggleSearch={toggleSearch} 
        openSignUpModal={openSignUpModal} 
        openLoginModal={openLoginModal}
      />
      
      {/* Overlays e Pop-ups */}
      <CartSlideIn />
      <SearchOverlay 
        isSearchOpen={isSearchOpen}
        closeSearch={closeSearch} 
      />
      <WishlistSlideIn 
        isOpen={isWishlistOpen} 
        closeModal={closeWishlist} 
      /> 
      <NotificationPopup />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        closeModal={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        closeModal={closeSignUpModal} 
        onSignUpSuccess={handleLoginSuccess} 
      />

      {/* --- 5. Conteúdo Principal (Rotas) --- */}
      <main>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/produto/:id" element={<ProductScreen />} />
          <Route path="/categoria/:categoryName" element={<CategoryScreen />} />
          
          {/* Rotas Protegidas (Checkout) */}
          <Route 
            path="/shipping" 
            element={
              <ProtectedRoute>
                <ShippingScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute>
                <PaymentScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/placeorder" 
            element={
              <ProtectedRoute>
                <PlaceOrderScreen />
              </ProtectedRoute>
            } 
          /> {/* <-- NOVA ROTA ADICIONADA */}
        </Routes>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;