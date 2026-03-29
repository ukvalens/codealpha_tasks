import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Reservations from './pages/Reservations';
import Payments from './pages/Payments';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/app/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tables" element={<Tables />} />
            <Route path="menu" element={<Menu />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="payments" element={<ProtectedRoute roles={['admin', 'manager']}><Payments /></ProtectedRoute>} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="*" element={<Navigate to="/app/dashboard" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
