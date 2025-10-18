import React from 'react';

const CartItem = ({ item, onRemove }) => (
  <div className="cart-item">
    <img src={`https://via.placeholder.com/80?text=${item.Product.name.charAt(0)}`} alt={item.Product.name} />
    <div className="cart-item-info">
      <h4>{item.Product.name}</h4>
      <p>Qty: {item.quantity} × ${item.Product.price} = ${item.quantity * item.Product.price}</p>
    </div>
    <button className="btn btn-secondary" onClick={() => onRemove(item.productId)}>🗑️ Remove</button>
  </div>
);

export default CartItem;