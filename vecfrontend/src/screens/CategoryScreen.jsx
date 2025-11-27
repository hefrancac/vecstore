// src/screens/CategoryScreen.jsx (CORRIGIDO)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import axios from 'axios';
import ProductCard from '../components/ProductCard'; 
import './CategoryScreen.css'; 

const CategoryScreen = () => {
  const { categoryName } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/products?category=${categoryName}`
        );
        setProducts(data);
        setLoading(false);
      } catch (err) { // <--- A variável 'err' estava aqui
        setError('Não foi possível carregar os produtos.');
        console.error(err); // <--- CORREÇÃO AQUI (usando a variável 'err')
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  const renderContent = () => {
    if (loading) {
      return <h2 style={{ textAlign: 'center', padding: '5rem' }}>A carregar...</h2>;
    }
    if (error) {
      return <h2 style={{ textAlign: 'center', padding: '5rem', color: 'red' }}>{error}</h2>;
    }
    if (products.length === 0) {
      return <h2 style={{ textAlign: 'center', padding: '5rem' }}>Nenhum produto encontrado nesta categoria.</h2>;
    }
    
    return (
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <main className="category-screen-container">
      <div className="category-header">
        <Link to="/" className="back-link">&larr; Todas as Categorias</Link>
        <h1 className="category-title">{categoryName}</h1>
      </div>
      {renderContent()}
    </main>
  );
};

export default CategoryScreen;