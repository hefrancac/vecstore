// src/main.jsx (COMPLETO E ATUALIZADO)

import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'; // 1. Importar o axios
import App from './App.jsx';
import './index.css';

// Importar Providers
import { CartProvider } from './context/CartContext.jsx'; 
import { AuthProvider } from './context/AuthContext.jsx'; // 2. Importar o AuthProvider

// 3. Definir a URL base da nossa API
axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider> {/* 4. Envolver a App com o AuthProvider */}
        <App />
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>,
)