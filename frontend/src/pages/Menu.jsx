import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('');
  const [activeTab, setActiveTab] = useState('items');
  const [showItemForm, setShowItemForm] = useState(false);
  const [showCatForm, setShowCatForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [itemForm, setItemForm] = useState({ category_id: '', name: '', description: '', price: '', image_url: '' });
  const [catForm, setCatForm] = useState({ name: '', description: '' });
  const { user } = useAuth();
  const canManage = ['admin', 'manager'].includes(user?.role);

  const fetchAll = async () => {
    const [cats, its] = await Promise.all([api.get('/menu/categories'), api.get('/menu/items')]);
    setCategories(cats.data);
    setItems(its.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await api.post('/menu/categories', catForm);
      toast.success('Category created!');
      setCatForm({ name: '', description: '' });
      setShowCatForm(false);
      fetchAll();
    } catch (err) { toast.error(err.response?.data?.error || 'Failed'); }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await api.put(`/menu/items/${editItem.id}`, { ...itemForm, is_available: true });
        toast.success('Item updated!');
      } else {
        await api.post('/menu/items', { ...itemForm, category_id: +itemForm.category_id, price: +itemForm.price });
        toast.success('Item created!');
      }
      setItemForm({ category_id: '', name: '', description: '', price: '', image_url: '' });
      setShowItemForm(false);
      setEditItem(null);
      fetchAll();
    } catch (err) { toast.error(err.response?.data?.error || 'Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      await api.delete(`/menu/items/${id}`);
      toast.success('Deleted!');
      fetchAll();
    } catch { toast.error('Failed to delete'); }
  };

  const startEdit = (item) => {
    setEditItem(item);
    setItemForm({ category_id: item.category_id, name: item.name, description: item.description, price: item.price, image_url: item.image_url || '' });
    setShowItemForm(true);
    setActiveTab('items');
  };

  const filteredItems = items.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory ? item.category_id === +filterCategory : true;
    const matchAvailability = filterAvailability === '' ? true
      : filterAvailability === 'available' ? item.is_available : !item.is_available;
    return matchSearch && matchCategory && matchAvailability;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Menu</h1>
        {canManage && (
          <div className="btn-group">
            <button className="btn-secondary" onClick={() => setShowCatForm(!showCatForm)}>+ Category</button>
            <button className="btn-primary" onClick={() => { setShowItemForm(!showItemForm); setEditItem(null); setItemForm({ category_id: '', name: '', description: '', price: '', image_url: '' }); }}>+ Item</button>
          </div>
        )}
      </div>

      {showCatForm && canManage && (
        <div className="card">
          <h2>New Category</h2>
          <form onSubmit={handleCreateCategory} className="form-grid">
            <input placeholder="Category Name" value={catForm.name} onChange={e => setCatForm({ ...catForm, name: e.target.value })} required />
            <input placeholder="Description" value={catForm.description} onChange={e => setCatForm({ ...catForm, description: e.target.value })} />
            <button type="submit" className="btn-primary">Create</button>
          </form>
        </div>
      )}

      {showItemForm && canManage && (
        <div className="card">
          <h2>{editItem ? 'Edit Item' : 'New Menu Item'}</h2>
          <form onSubmit={handleItemSubmit} className="form-grid">
            <select value={itemForm.category_id} onChange={e => setItemForm({ ...itemForm, category_id: e.target.value })} required>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input placeholder="Item Name" value={itemForm.name} onChange={e => setItemForm({ ...itemForm, name: e.target.value })} required />
            <input placeholder="Description" value={itemForm.description} onChange={e => setItemForm({ ...itemForm, description: e.target.value })} />
            <input type="number" step="0.01" placeholder="Price" value={itemForm.price} onChange={e => setItemForm({ ...itemForm, price: e.target.value })} required />
            <input placeholder="Image URL (optional)" value={itemForm.image_url} onChange={e => setItemForm({ ...itemForm, image_url: e.target.value })} />
            <button type="submit" className="btn-primary">{editItem ? 'Update' : 'Create'}</button>
          </form>
        </div>
      )}

      <div className="tabs">
        <button className={activeTab === 'items' ? 'tab active' : 'tab'} onClick={() => setActiveTab('items')}>Menu Items</button>
        <button className={activeTab === 'categories' ? 'tab active' : 'tab'} onClick={() => setActiveTab('categories')}>Categories</button>
      </div>

      {activeTab === 'items' && (
        <>
          <div className="menu-filters">
            <input
              placeholder="🔍 Search by name or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="menu-search"
            />
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={filterAvailability} onChange={e => setFilterAvailability(e.target.value)}>
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
            {(search || filterCategory || filterAvailability) && (
              <button className="btn-secondary btn-sm" onClick={() => { setSearch(''); setFilterCategory(''); setFilterAvailability(''); }}>✕ Clear</button>
            )}
          </div>
          <p className="menu-count">{filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found</p>
          <div className="menu-grid">
            {filteredItems.length === 0 ? (
              <p className="no-results">No items match your search.</p>
            ) : filteredItems.map(item => (
            <div key={item.id} className="menu-card">
              {item.image_url && <img src={item.image_url} alt={item.name} className="menu-img" onError={e => e.target.style.display = 'none'} />}
              <div className="menu-card-body">
                <span className="menu-category">{item.category_name}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="menu-footer">
                  <strong>${parseFloat(item.price).toFixed(2)}</strong>
                  <span className={`badge badge-${item.is_available ? 'available' : 'occupied'}`}>
                    {item.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                {canManage && (
                  <div className="btn-group mt-1">
                    <button className="btn-secondary btn-sm" onClick={() => startEdit(item)}>Edit</button>
                    <button className="btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'categories' && (
        <div className="card">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Name</th><th>Description</th></tr></thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id}><td>{c.id}</td><td>{c.name}</td><td>{c.description}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Menu;
