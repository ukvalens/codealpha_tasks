import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'waiter' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>🍴 RestaurantMS</h1>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Username" value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })} required />
          <input type="email" placeholder="Email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required />
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="waiter">Waiter</option>
            <option value="chef">Chef</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        </form>
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Register;
