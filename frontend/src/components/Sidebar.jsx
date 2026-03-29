import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/app/dashboard', label: '📊 Dashboard', roles: ['admin', 'manager', 'waiter', 'chef'] },
  { to: '/app/tables', label: '🪑 Tables', roles: ['admin', 'manager', 'waiter'] },
  { to: '/app/menu', label: '🍽️ Menu', roles: ['admin', 'manager', 'waiter', 'chef'] },
  { to: '/app/orders', label: '📋 Orders', roles: ['admin', 'manager', 'waiter', 'chef'] },
  { to: '/app/reservations', label: '📅 Reservations', roles: ['admin', 'manager', 'waiter'] },
  { to: '/app/payments', label: '💳 Payments', roles: ['admin', 'manager'] },
  { to: '/app/announcements', label: '📢 Announcements', roles: ['admin', 'manager', 'waiter', 'chef'] },
  { to: '/app/settings', label: '⚙️ Settings', roles: ['admin'] },
];

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🍴 RestaurantMS</h2>
        <p className="user-info">{user?.username} <span className="role-badge">{user?.role}</span></p>
      </div>
      <nav>
        {navItems
          .filter(item => item.roles.includes(user?.role))
          .map(item => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {item.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
