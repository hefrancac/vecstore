// src/components/NotificationPopup.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext'; // Vamos ler o estado dele
import './NotificationPopup.css'; // Vamos criar este CSS

const NotificationPopup = () => {
  // 1. Lê o estado da notificação (mensagem e visibilidade) do cérebro
  const { notification } = useAuth();

  // 2. Se a notificação não deve ser mostrada, não renderiza nada
  if (!notification.show) {
    return null;
  }

  // 3. Se deve ser mostrada, renderiza a "mini janela"
  return (
    <div className="notification-popup">
      {notification.message}
    </div>
  );
};

export default NotificationPopup;