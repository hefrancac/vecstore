// src/screens/HomeScreen.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // <-- Ajuste o caminho
import Hero from '../components/Hero'; // <-- Ajuste o caminho
import ProductCard from '../components/ProductCard'; // <-- Ajuste o caminho

function HomeScreen() { // <-- Mude o nome da função
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Não foi possível carregar os produtos.');
        setLoading(false);
        console.error(err);
      }
    };
    fetchProducts();
  }, []); 

  const renderContent = () => {
    if (loading) {
      return <h2 style={{ textAlign: 'center', padding: '5rem' }}>Carregando produtos...</h2>;
    }
    if (error) {
      return <h2 style={{ textAlign: 'center', padding: '5rem', color: 'red' }}>{error}</h2>;
    }
    return (
      <section className="featured-products">
        <h2 className="section-title">Produtos em Destaque</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    );
  };

  return (
    // Note: Removemos o Header daqui, pois ele ficará no App.jsx
    <main>
      <Hero />
      {renderContent()}
    </main>
  );
}

export default HomeScreen; // <-- Mude o export