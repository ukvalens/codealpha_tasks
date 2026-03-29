import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ username: user?.username || '', email: user?.email || '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/auth/profile', form);
      // Update local storage
      const updated = { ...user, username: form.username, email: form.email };
      localStorage.setItem('user', JSON.stringify(updated));
      window.location.reload();
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.username?.slice(0, 2).toUpperCase();

  return (
    <div className="page">
      <h1 className="page-title">My Profile</h1>
      <div className="card" style={{ maxWidth: 500 }}>
        <div className="profile-avatar-section">
          <div className="avatar avatar-xl">{initials}</div>
          <div>
            <h3>{user?.username}</h3>
            <span className="role-badge">{user?.role}</span>
          </div>
        </div>
        <hr className="dropdown-divider" style={{ margin: '1.25rem 0' }} />
        <form onSubmit={handleSubmit} className="form-grid">
          <div>
            <label className="form-label">Username</label>
            <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="form-label">Role</label>
            <input value={user?.role} disabled style={{ opacity: 0.6 }} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
