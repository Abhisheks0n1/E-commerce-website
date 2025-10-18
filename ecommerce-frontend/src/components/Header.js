import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ token, role, onLogout }) => (
  <header className="header">
    <div className="header-nav">
      <Link to="/products" className="logo">🛒 ShopNow</Link>
      <div className="nav-links">
        <Link to="/products">📦 Products</Link>
        {token && <Link to="/cart">🛒 Cart</Link>}
        {token && <Link to="/orders">📋 Orders</Link>}
        {role === 'admin' && <Link to="/admin">⚙️ Admin</Link>}
        {token ? (
          <button className="btn-logout" onClick={onLogout}>🚪 Logout</button>
        ) : (
          <>
            <Link to="/login">🔐 Login</Link>
            <Link to="/register">📝 Register</Link>
          </>
        )}
      </div>
    </div>
  </header>
);

export default Header;