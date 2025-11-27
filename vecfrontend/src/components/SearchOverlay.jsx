// src/components/SearchOverlay.jsx (Lógica Ajustada)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SearchOverlay.css';
import { FaSearch, FaTimes } from 'react-icons/fa';

// Recebemos 'isSearchOpen' e 'closeSearch' do App.jsx
const SearchOverlay = ({ isSearchOpen, closeSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // O "DEBOUNCE" (a lógica de busca)
  useEffect(() => {
    // 1. Não pesquisar se o campo estiver vazio
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    // 2. Cria um "timer" (a pesquisa só acontece 300ms DEPOIS que o utilizador parou de digitar)
    const searchTimer = setTimeout(async () => {
      setLoading(true);
      try {
        // 3. Chama a nossa nova API de busca (back-end)
        const { data } = await axios.get(
          `http://localhost:5000/api/products/search?q=${query}`
        );
        setResults(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setResults([]);
      }
      setLoading(false);
    }, 300); // 300ms de espera

    // 4. Limpa o timer se o utilizador continuar a digitar (debounce)
    return () => clearTimeout(searchTimer);

  }, [query]); // Este hook roda sempre que o 'query' muda

  // Limpa a busca e fecha o overlay ao clicar num link
  const handleClose = () => {
    setQuery('');
    setResults([]);
    closeSearch();
  };
  
  return (
    <div className={`search-overlay ${isSearchOpen ? 'open' : ''}`}>
      <div className="search-bar-container">
        {/* Usamos a lupa pequena aqui para complementar o input */}
        <FaSearch style={{ fontSize: '1.5rem', color: '#ccc' }} /> 
        <input
          type="text"
          className="search-input"
          placeholder="Procurar tênis, jaquetas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus={isSearchOpen} // Foca automaticamente no input ao abrir
        />
        {/* O botão 'X' serve para limpar e fechar tudo */}
        <button onClick={handleClose} className="search-close-btn">
          <FaTimes />
        </button>
      </div>

      <div className="search-results">
        {/* Resultados e estados (Loading/Vazio) */}
        {loading && <p style={{ textAlign: 'center' }}>A procurar...</p>}
        
        {!loading && query.length > 0 && results.length === 0 && (
          <p style={{ textAlign: 'center' }}>Nenhum resultado encontrado para "{query}"</p>
        )}

        {results.map((product) => (
          <Link 
            key={product._id} 
            to={`/produto/${product._id}`}
            className="search-result-item"
            onClick={handleClose} // Fecha a busca ao selecionar o produto
          >
            <img src={product.image} alt={product.name} />
            <span className="search-result-name">{product.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchOverlay;