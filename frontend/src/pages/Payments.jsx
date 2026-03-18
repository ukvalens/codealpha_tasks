import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ order_id: '', amount: '', payment_method: 'cash', transaction_id: '' });

  const fetchAll = async () => {
    const [pays, ords] = await Promise.all([api.get('/payments'), api.get('/orders')]);
    setPayments(pays.data);
    setOrders(ords.data.filter(o => o.status !== 'completed' && o.status !== 'cancelled'));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleOrderSelect = (orderId) => {
    const order = orders.find(o => o.id === +orderId);
    setForm({ ...form, order_id: orderId, amount: order ? order.total_amount : '' });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/payments', { ...form, order_id: +form.order_id, amount: +form.amount });
      toast.success('Payment processed!');
      setShowForm(false);
      setForm({ order_id: '', amount: '', payment_method: 'cash', transaction_id: '' });
      fetchAll();
    } catch (err) { toast.error(err.response?.data?.error || 'Failed'); }
  };

  const totalRevenue = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Payments</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>+ Process Payment</button>
      </div>

      <div className="stat-card" style={{ borderLeft: '4px solid #059669', marginBottom: '1.5rem' }}>
        <div className="stat-icon">💰</div>
        <div>
          <p className="stat-label">Total Revenue</p>
          <h3 className="stat-value">${totalRevenue.toFixed(2)}</h3>
        </div>
      </div>

      {showForm && (
        <div className="card">
          <h2>Process Payment</h2>
          <form onSubmit={handleCreate} className="form-grid">
            <select value={form.order_id} onChange={e => handleOrderSelect(e.target.value)} required>
              <option value="">Select Order</option>
              {orders.map(o => <option key={o.id} value={o.id}>Order #{o.id} - Table {o.table_number} (${parseFloat(o.total_amount).toFixed(2)})</option>)}
            </select>
            <input type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
            <select value={form.payment_method} onChange={e => setForm({ ...form, payment_method: e.target.value })}>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="online">Online</option>
            </select>
            <input placeholder="Transaction ID (optional)" value={form.transaction_id} onChange={e => setForm({ ...form, transaction_id: e.target.value })} />
            <button type="submit" className="btn-primary">Process Payment</button>
          </form>
        </div>
      )}

      <div className="card">
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Order</th><th>Amount</th><th>Method</th><th>Status</th><th>Transaction ID</th><th>Date</th></tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td>#{p.id}</td>
                <td>Order #{p.order_id}</td>
                <td>${parseFloat(p.amount).toFixed(2)}</td>
                <td><span className="badge badge-reserved">{p.payment_method}</span></td>
                <td><span className={`badge badge-${p.payment_status === 'completed' ? 'available' : 'occupied'}`}>{p.payment_status}</span></td>
                <td>{p.transaction_id || '-'}</td>
                <td>{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
