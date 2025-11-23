// src/components/Hero.jsx (COM VÍDEO DE FUNDO)

import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      {/* 1. VÍDEO DE FUNDO */}
      <video className="hero-video" autoPlay loop muted playsInline>
        {/* O caminho começa com / porque está na pasta public */}
        <source src="/hero-video.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>

      {/* 2. Overlay (Camada escura para o texto aparecer melhor) */}
      <div className="hero-overlay"></div>
      
      {/* 3. Conteúdo (Texto e Botão) */}
      <div className="hero-content">
        <span className="hero-subtitle">Nova Coleção</span>
        <h1 className="hero-title">DESAFIE SEUS LIMITES</h1>
        <p className="hero-description">Equipamento de performance criado para ir além.</p>
        <a href="#" className="hero-cta-button">Comprar Agora</a>
      </div>
    </section>
  );
};

export default Hero;