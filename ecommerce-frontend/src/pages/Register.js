import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api';

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '', password: '', role: 'customer'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', formData);
      onLogin(data.token, data.role);
      navigate('/products');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="main">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#232F3E' }}>📝 Register</h2>
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
        
        <div className="form-group">
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="customer">🛒 Customer</option>
            <option value="admin">⚙️ Admin</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">Create Account</button>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;