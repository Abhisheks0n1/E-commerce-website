import React, { useState, useEffect } from 'react';
import api from '../services/api';
import OrderSummary from '../components/OrderSummary';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError('Please login to view orders');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        
        const { data } = await api.get('/orders/history');
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (!token) return <div>🔐 <a href="/login">Login</a> to view orders</div>;
  if (loading) return <div>🔄 Loading orders...</div>;
  if (error) return <div>❌ {error}</div>;

  return (
    <div>
      <h1>📦 Order History ({orders.length})</h1>
      {orders.length === 0 ? (
        <p>😊 No orders yet. <a href="/products">Shop now!</a></p>
      ) : (
        orders.map(order => <OrderSummary key={order.id} order={order} />)
      )}
    </div>
  );
};

export default Orders;