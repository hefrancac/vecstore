// src/screens/ProductScreen.jsx (CORRIGIDO)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
import { useCart } from '../context/CartContext'; 
import { FaHeart, FaRegHeart, FaShareAlt, FaWhatsapp } from 'react-icons/fa';
import ProductCard from '../components/ProductCard'; 
import './ProductScreen.css'; 

const SIZES = ['38', '39', '40', '41', '42', '43'];
const SHIRT_SIZES = ['P', 'M', 'G', 'GG'];

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated, wishlist, addToWishlist, removeFromWishlist } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        setProduct(null);
        setRelatedProducts([]);
        setSelectedSize(null);
        setIsExpanded(false);
        setError(null);
        setSelectedColor(null);

        const { data: mainProduct } = await axios.get(`/api/products/${productId}`);
        
        if (mainProduct) {
          setProduct(mainProduct); 
          setMainImage(mainProduct.image); 
          if (mainProduct.colors && mainProduct.colors.length > 0) {
            setSelectedColor(mainProduct.colors[0]); 
          }

          if (mainProduct.category) {
            try {
              const { data: relatedData } = await axios.get(`/api/products?category=${mainProduct.category}`);
              setRelatedProducts(relatedData.filter((p) => p._id !== mainProduct._id).slice(0, 4));
            } catch (err) { console.error(err); }
          }
        } else {
          setError('Produto não encontrado.');
        }
      } catch (err) {
        setError('Produto não encontrado.');
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };
    fetchProductAndRelated();
  }, [productId]); 

  const isLiked = React.useMemo(() => {
    if (!product) return false; 
    return wishlist.some((item) => item._id === product._id);
  }, [wishlist, product]); 

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para adicionar aos favoritos.');
      return;
    }
    isLiked ? removeFromWishlist(product._id) : addToWishlist(product._id);
  };

  const handleAddToCart = () => {
    if (!selectedSize) { alert('Por favor, selecione um tamanho.'); return; }
    addToCart(product); 
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copiado!');
  };

  if (loading) return <h2 style={{ textAlign: 'center', padding: '10rem' }}>A carregar...</h2>;
  if (error) return <h2 style={{ textAlign: 'center', padding: '10rem', color: 'red' }}>{error}</h2>;
  if (!product) return <h2 style={{ textAlign: 'center', padding: '10rem' }}>Produto não encontrado.</h2>;

  const sizeOptions = (product.category === 'Treino' || product.category === 'Casual') ? SHIRT_SIZES : SIZES;

  return (
    <main className="product-screen-container">
      <Link to="/" className="back-link">&larr; Voltar</Link>
      <div className="product-details-grid">
        <div className="product-gallery">
          <div className="main-image-container">
            <img src={mainImage} alt={product.name} className="main-product-image" />
          </div>
          <div className="product-thumbnails">
            {product.images && product.images.map((img, index) => (
              <img key={index} src={img} alt="thumb" className={`thumbnail-image ${img === mainImage ? 'active' : ''}`} onClick={() => setMainImage(img)} />
            ))}
          </div>
        </div>
        <div className="product-info-details">
          <span className="info-category">{product.category}</span>
          <h1 className="info-title">{product.name}</h1>
          <span className="info-price">{product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
          
          {product.colors && product.colors.length > 0 && (
            <div className="selector-group">
              <label>Cor: <span className="selected-value">{selectedColor}</span></label>
              <div className="color-selector">
                {product.colors.map((color) => (
                  <button key={color} className={`color-option ${selectedColor === color ? 'active' : ''}`} title={color} onClick={() => setSelectedColor(color)} />
                ))}
              </div>
            </div>
          )}

          <div className="selector-group">
            <label>Tamanho:</label>
            <div className="size-selector">
              {sizeOptions.map((size) => (
                <button key={size} className={`size-option ${selectedSize === size ? 'active' : ''}`} onClick={() => setSelectedSize(size)}>{size}</button>
              ))}
            </div>
          </div>

          <button onClick={handleAddToCart} className="btn-action btn-primary">Adicionar ao Carrinho</button>
          <button onClick={handleWishlistClick} className="btn-action btn-secondary">
            {isLiked ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'} <FaHeart style={{marginLeft: '8px'}}/>
          </button>

          <div className="description-section">
            <p className={`description-text ${isExpanded ? 'expanded' : ''}`}>{product.description}</p>
            <button onClick={() => setIsExpanded(!isExpanded)} className="toggle-description">{isExpanded ? 'Ver menos' : 'Ver mais detalhes'}</button>
          </div>
        </div>
      </div>
      <div className="related-products-section">
        <h2 className="section-title">Quem viu, viu também</h2>
        <div className="related-products-grid">
            {relatedProducts.map((related) => (<ProductCard key={related._id} product={related} />))}
        </div>
      </div>
    </main>
  );
};
export default ProductScreen;