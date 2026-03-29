import { useEffect, useState } from 'react';
import api from '../../api/axios';

const CustomerMenu = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    api.get('/menu/categories').then(r => setCategories(r.data));
    api.get('/menu/items').then(r => setItems(r.data.filter(i => i.is_available)));
  }, []);

  const filtered = items.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory ? item.category_id === +filterCategory : true;
    return matchSearch && matchCat;
  });

  return (
    <div className="page">
      <h1 className="page-title">🍽️ Our Menu</h1>

      <div className="menu-filters">
        <input placeholder="🔍 Search dishes..." value={search}
          onChange={e => setSearch(e.target.value)} className="menu-search" />
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {(search || filterCategory) && (
          <button className="btn-secondary btn-sm" onClick={() => { setSearch(''); setFilterCategory(''); }}>✕ Clear</button>
        )}
      </div>
      <p className="menu-count">{filtered.length} item{filtered.length !== 1 ? 's' : ''} found</p>

      {categories.filter(c => !filterCategory || c.id === +filterCategory).map(cat => {
        const catItems = filtered.filter(i => i.category_id === cat.id);
        if (catItems.length === 0) return null;
        return (
          <div key={cat.id} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)', borderLeft: '4px solid var(--primary)', paddingLeft: '0.75rem' }}>
              {cat.name}
            </h2>
            <div className="menu-grid">
              {catItems.map(item => (
                <div key={item.id} className="menu-card">
                  {item.image_url && <img src={item.image_url} alt={item.name} className="menu-img" onError={e => e.target.style.display = 'none'} />}
                  <div className="menu-card-body">
                    <span className="menu-category">{item.category_name}</span>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="menu-footer">
                      <strong>${parseFloat(item.price).toFixed(2)}</strong>
                      <span className="badge badge-available">Available</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {filtered.length === 0 && <p className="no-results">No items found.</p>}
    </div>
  );
};

export default CustomerMenu;
