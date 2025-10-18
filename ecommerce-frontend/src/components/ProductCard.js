import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => (
  <div className="product-card">
    <div className="product-image">
      <img src="https://via.placeholder.com/300x200/232F3E/FFFFFF?text=iPhone" alt={product.name} />
    </div>
    <div className="product-info">
      <div className="product-name">{product.name}</div>
      <div className="product-desc">{product.description}</div>
      <div className="product-price">${product.price}</div>
      <Link to={`/products/${product.id}`} className="btn btn-secondary" style={{marginBottom: '0.5rem', display: 'block'}}>
        👁️ Details
      </Link>
      {onAddToCart && (
        <button className="btn btn-primary" onClick={() => onAddToCart(product.id)}>
          🛒 Add to Cart
        </button>
      )}
    </div>
  </div>
);

export default ProductCard;