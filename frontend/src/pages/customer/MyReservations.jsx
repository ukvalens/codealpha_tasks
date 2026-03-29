import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const MyReservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    api.get('/reservations').then(r => {
      setReservations(r.data.filter(res =>
        res.customer_email === user?.email || res.customer_name === user?.username
      ));
    });
  }, [user]);

  const filtered = reservations.filter(r => {
    const matchSearch = r.reservation_date?.split('T')[0].includes(search) ||
      r.table_number?.toString().includes(search);
    const matchStatus = filterStatus ? r.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  return (
    <div className="page">
      <h1 className="page-title">📋 My Reservations</h1>

      <div className="card">
        <div className="menu-filters" style={{ marginBottom: '1rem' }}>
          <input placeholder="🔍 Search by date or table..." value={search}
            onChange={e => setSearch(e.target.value)} className="menu-search" />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            {['pending', 'confirmed', 'cancelled', 'completed'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {(search || filterStatus) && (
            <button className="btn-secondary btn-sm" onClick={() => { setSearch(''); setFilterStatus(''); }}>✕ Clear</button>
          )}
        </div>
        <p className="menu-count">{filtered.length} reservation{filtered.length !== 1 ? 's' : ''}</p>

        {filtered.length === 0 ? (
          <p className="no-results">No reservations found.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Table</th><th>Date</th><th>Time</th><th>Party</th><th>Status</th><th>Special Requests</th></tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>#{r.id}</td>
                  <td>Table {r.table_number}</td>
                  <td>{r.reservation_date?.split('T')[0]}</td>
                  <td>{r.reservation_time}</td>
                  <td>{r.party_size}</td>
                  <td><span className={`badge badge-${r.status}`}>{r.status}</span></td>
                  <td>{r.special_requests || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
