import { Outlet } from 'react-router-dom';
import CustomerSidebar from './CustomerSidebar';
import CustomerTopbar from './CustomerTopbar';

const CustomerLayout = () => (
  <div className="layout">
    <CustomerSidebar />
    <div className="main-wrapper">
      <CustomerTopbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>🍴 RestaurantMS © {new Date().getFullYear()} — Built with React & Node.js</p>
      </footer>
    </div>
  </div>
);

export default CustomerLayout;
