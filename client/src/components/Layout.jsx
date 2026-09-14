import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from './ConfirmModal';
import './Layout.css';

const Layout = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirmed = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/login');
  };

  const navLink = (to, label) => (
    <Link to={to} className={`nav-link ${location.pathname === to ? 'active' : ''}`}>
      {label}
    </Link>
  );

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="navbar-logo">HelpDesk<span>Pro</span></div>

        <nav className="navbar-links">
          {navLink('/dashboard', 'My Tickets')}
          {isAdmin && navLink('/admin', 'Admin Dashboard')}
        </nav>

        <div className="navbar-user">
          <div className="user-badge">
            <div className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
            <div className="user-meta">
              <span className="user-name">{user?.name}</span>
              <span className={`user-role role-${user?.role}`}>{user?.role}</span>
            </div>
          </div>
          <motion.button
            className="logout-btn"
            onClick={() => setShowLogoutModal(true)}
            whileTap={{ scale: 0.96 }}
          >
            Log out
          </motion.button>
        </div>
      </header>

      <main className="app-content">
        <Outlet />
      </main>

      <ConfirmModal
        isOpen={showLogoutModal}
        title="Log out?"
        message="You'll need to sign in again to access your tickets."
        confirmLabel="Log out"
        onConfirm={handleLogoutConfirmed}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
};

export default Layout;