import React, { useState, useEffect } from 'react';
import api from '../services/api';
import OrderSummary from '../components/OrderSummary';

const AdminDashboard = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stockQuantity: '', categoryId: '' });

  useEffect(() => {
    const fetchData = async () => {
      const [prodRes, orderRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders')
      ]);
      setProducts(prodRes.data.rows || []);
      setOrders(orderRes.data || []);
    };
    fetchData();
  }, [token]);

  const createProduct = async () => {
    await api.post('/products', newProduct);
    alert('✅ Product created!');
    setNewProduct({ name: '', description: '', price: '', stockQuantity: '', categoryId: '' });
  };

  return (
    <div className="main">
      <h1 style={{ marginBottom: '2rem', color: '#232f3e' }}>⚙️ Admin Dashboard</h1>
      
      <div className="admin-section">
        <div className="admin-form">
          <h3>➕ Create Product</h3>
          <div className="form-group"><input placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} /></div>
          <div className="form-group"><input placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} /></div>
          <div className="form-group"><input placeholder="Price" type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} /></div>
          <div className="form-group"><input placeholder="Stock" type="number" value={newProduct.stockQuantity} onChange={e => setNewProduct({...newProduct, stockQuantity: e.target.value})} /></div>
          <button className="btn btn-primary" onClick={createProduct}>Create Product</button>
        </div>

        <div className="admin-form">
          <h3>📊 Stats</h3>
          <p>Products: {products.length}</p>
          <p>Orders: {orders.length}</p>
        </div>
      </div>

      <div className="admin-form">
        <h3>📦 Recent Orders</h3>
        {orders.slice(0, 3).map(order => <OrderSummary key={order.id} order={order} />)}
      </div>
    </div>
  );
};

export default AdminDashboard;