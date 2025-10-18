import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const ProductDetail = ({ token }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!token) return alert('Login required');
    try {
      await api.post('/cart/add', { productId: id }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Added to cart');
    } catch (err) {
      alert('Error');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price} | Stock: {product.stockQuantity}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;