import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CartItem from '../components/CartItem';

const Cart = ({ token }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await api.get('/cart');
        setCart(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  const removeItem = async (productId) => {
    await api.delete(`/cart/remove/${productId}`);
    setCart(prev => ({ 
      ...prev, 
      items: prev.items.filter(item => item.productId !== productId),
      subtotal: prev.subtotal - (prev.items.find(i => i.productId === productId)?.quantity * prev.items.find(i => i.productId === productId)?.Product.price || 0)
    }));
  };

  const placeOrder = async () => {
    try {
      await api.post('/orders/place');
      alert('✅ Order placed successfully!');
      setCart({ items: [], subtotal: 0, total: 0 });
    } catch (err) {
      alert('❌ Error placing order');
    }
  };

  if (loading) return <div className="loading">🔄 Loading cart...</div>;

  return (
    <div className="main">
      <h1 style={{ marginBottom: '2rem', color: '#232f3e' }}>🛒 Shopping Cart</h1>
      <div className="cart-container">
        {cart.items.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            Your cart is empty. <a href="/products">Start shopping!</a>
          </p>
        ) : (
          <>
            {cart.items.map(item => (
              <CartItem key={item.id} item={item} onRemove={removeItem} />
            ))}
            <div className="cart-total">
              Total: ${cart.total}
            </div>
            <button className="btn btn-primary" style={{ width: '100%', fontSize: '1.2rem' }} onClick={placeOrder}>
              💳 Place Order - ${cart.total}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;