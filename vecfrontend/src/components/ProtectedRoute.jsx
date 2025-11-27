// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 'children' será a página que queremos proteger (ex: ShippingScreen)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Se não estiver logado, redireciona para a Home
    // O 'replace' impede que o utilizador volte para a página de checkout
    return <Navigate to="/" replace />;
  }

  // Se estiver logado, renderiza a página solicitada
  return children;
};

export default ProtectedRoute;