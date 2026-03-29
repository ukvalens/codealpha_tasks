import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/customer/dashboard', label: '📊 Dashboard' },
  { to: '/customer/menu', label: '🍽️ Menu' },
  { to: '/customer/reserve', label: '📅 Make Reservation' },
  { to: '/customer/my-reservations', label: '📋 My Reservations' },
  { to: '/customer/my-orders', label: '🛒 Orders' },
];

const CustomerSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🍴 RestaurantMS</h2>
        <p className="user-info">{user?.username} <span className="role-badge">customer</span></p>
      </div>
      <nav>
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default CustomerSidebar;
