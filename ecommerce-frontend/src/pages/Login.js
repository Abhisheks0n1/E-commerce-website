import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', formData);
      const decoded = JSON.parse(atob(data.token.split('.')[1]));
      onLogin(data.token, decoded.role);
      navigate('/products');
    } catch (err) {
      setError('Invalid username/password');
    }
  };

  return (
    <div className="main">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#232F3E' }}>🔐 Login</h2>
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <input 
            type="text" 
            name="username" 
            placeholder="👤 Username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            type="password" 
            name="password" 
            placeholder="🔒 Password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Login</button>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          No account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;