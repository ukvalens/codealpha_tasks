import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => (
  <div className="layout">
    <Sidebar />
    <div className="main-wrapper">
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>🍴 RestaurantMS &copy; {new Date().getFullYear()} — Built with React & Node.js</p>
      </footer>
    </div>
  </div>
);

export default Layout;
