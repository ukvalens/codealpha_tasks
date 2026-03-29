import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ username: user?.username || '', email: user?.email || '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put('/auth/profile', form);
      updateUser({ username: res.data.username, email: res.data.email });
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">My Profile</h1>
      <div className="card" style={{ maxWidth: 480 }}>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-field">
            <label className="form-label">Username</label>
            <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
          </div>
          <div className="form-field">
            <label className="form-label">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-field">
            <label className="form-label">Role</label>
            <input value={user?.role} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ alignSelf: 'flex-start' }}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
