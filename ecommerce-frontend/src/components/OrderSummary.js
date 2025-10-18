import React from 'react';

const OrderSummary = ({ order }) => {
  const items = order.OrderItems || [];
  return (
    <div className="order-card">
      <div className="order-header">
        <h3>Order #{order.id}</h3>
        <div style={{ color: '#B12704', fontSize: '1.2rem' }}>${order.totalPrice}</div>
      </div>
      <ul className="order-items">
        {items.map(item => (
          <li key={item.id}>
            {item.Product?.name} × {item.quantity} @ ${item.priceAtPurchase}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSummary;