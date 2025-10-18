import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/products');
        setProducts(data.rows || data || []);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!token) return alert('Login required');
    try {
      await api.post('/cart/add', { productId });
      alert('✅ Added to cart!');
    } catch (err) {
      alert('❌ Error adding to cart');
    }
  };

  if (loading) return <div className="loading">🔄 Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="main">
      <h1 className="text-center" style={{ marginBottom: '2rem', color: '#232f3e' }}>
        🛒 All Products ({products.length})
      </h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Products;