import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const handleLogin = (newToken, newRole) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  return (
    <Router>
      <Header token={token} role={role} onLogout={handleLogout} />
      <div className="main">
        <Routes>
          <Route path="/" element={<Products token={token} />} />
          <Route path="/products" element={<Products token={token} />} />
          <Route path="/products/:id" element={<ProductDetail token={token} />} />
          <Route path="/cart" element={token ? <Cart token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="/orders" element={token ? <Orders token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="/admin" element={role === 'admin' ? <AdminDashboard token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;