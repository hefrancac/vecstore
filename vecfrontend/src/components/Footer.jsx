// src/components/Footer.jsx

import React from 'react';
import './Footer.css'; // <-- DEVE IMPORTAR O 'Footer.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Coluna 1 */}
        <div className="footer-column">
          <h4>Produtos</h4>
          <ul>
            <li><a href="#">Calçados</a></li>
            <li><a href="#">Roupas</a></li>
            <li><a href="#">Acessórios</a></li>
            <li><a href="#">Novidades</a></li>
          </ul>
        </div>
        
        {/* Coluna 2 */}
        <div className="footer-column">
          <h4>Suporte</h4>
          <ul>
            <li><a href="#">Ajuda</a></li>
            <li><a href="#">Status do Pedido</a></li>
            <li><a href="#">Trocas e Devoluções</a></li>
            <li><a href="#">Fale Conosco</a></li>
          </ul>
        </div>
        
        {/* Coluna 3 */}
        <div className="footer-column">
          <h4>Sobre</h4>
          <ul>
            <li><a href="#">Nossa História</a></li>
            <li><a href="#">Carreiras</a></li>
            <li><a href="#">Sustentabilidade</a></li>
            <li><a href="#">Imprensa</a></li>
          </ul>
        </div>
        
        {/* Coluna 4 */}
        <div className="footer-column">
          <h4>Redes Sociais</h4>
          <p>Siga-nos nas redes sociais</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>
      
      {/* Rodapé inferior */}
      <div className="footer-bottom">
        <p>&copy; 2025 PREMIUM. Todos os direitos reservados.</p>
        <div className="footer-links-bottom">
          <a href="#">Termos de Uso</a>
          <a href="#">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;