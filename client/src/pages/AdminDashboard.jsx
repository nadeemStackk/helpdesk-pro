import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getTickets } from '../services/ticketService';
import { getAllUsers, updateUser } from '../services/userService';
import TicketCard from '../components/TicketCard';
import ConfirmModal from '../components/ConfirmModal';
import './AdminDashboard.css';
import Spinner from '../components/Spinner';

const TABS = ['Overview', 'All Tickets', 'Manage Users'];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [confirmAction, setConfirmAction] = useState(null); // { userId, type, label }

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [ticketData, userData] = await Promise.all([getTickets(), getAllUsers()]);
      setTickets(ticketData);
      setUsers(userData);
    } catch (err) {
      setError('Failed to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'Open').length,
    inProgress: tickets.filter((t) => t.status === 'In Progress').length,
    resolved: tickets.filter((t) => t.status === 'Resolved').length,
    totalUsers: users.length,
  };

  const filteredTickets =
    statusFilter === 'All' ? tickets : tickets.filter((t) => t.status === statusFilter);

  const handleToggleActive = (user) => {
    setConfirmAction({
      userId: user._id,
      type: 'toggleActive',
      newValue: !user.isActive,
      label: user.isActive
        ? `Deactivate ${user.name}'s account?`
        : `Reactivate ${user.name}'s account?`,
      message: user.isActive
        ? `${user.name} will no longer be able to log in.`
        : `${user.name} will regain access to their account.`,
    });
  };

  const handleToggleRole = (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    setConfirmAction({
      userId: user._id,
      type: 'toggleRole',
      newValue: newRole,
      label: `Change ${user.name} to ${newRole}?`,
      message:
        newRole === 'admin'
          ? `${user.name} will gain full admin access, including user management.`
          : `${user.name} will lose admin access and become a regular user.`,
    });
  };

  const confirmUserAction = async () => {
    if (!confirmAction) return;
    const { userId, type, newValue } = confirmAction;
    try {
      const updates = type === 'toggleActive' ? { isActive: newValue } : { role: newValue };
      const updatedUser = await updateUser(userId, updates);
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, ...updatedUser } : u)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user.');
    } finally {
      setConfirmAction(null);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="page-subtitle">Manage all tickets and users across HelpDesk Pro</p>
        </div>
      </div>

      <div className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {error && <div className="auth-error" style={{ marginBottom: 20 }}>{error}</div>}

      {loading && <div style={{ padding: '60px 0' }}><Spinner /></div>}

      {!loading && activeTab === 'Overview' && (
        <div className="stats-grid">
          {[
            { label: 'Total Tickets', value: stats.total, color: 'primary' },
            { label: 'Open', value: stats.open, color: 'info' },
            { label: 'In Progress', value: stats.inProgress, color: 'warning' },
            { label: 'Resolved', value: stats.resolved, color: 'success' },
            { label: 'Total Users', value: stats.totalUsers, color: 'peach' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`stat-card stat-${stat.color}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && activeTab === 'All Tickets' && (
        <>
          <div className="filter-tabs">
            {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((status) => (
              <button
                key={status}
                className={`filter-tab ${statusFilter === status ? 'active' : ''}`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {filteredTickets.length === 0 ? (
            <div className="empty-state">
              <h3>No tickets found</h3>
              <p>There are no tickets matching this filter.</p>
            </div>
          ) : (
            <div className="ticket-list">
              {filteredTickets.map((ticket, i) => (
                <TicketCard key={ticket._id} ticket={ticket} showOwner index={i} />
              ))}
            </div>
          )}
        </>
      )}

      {!loading && activeTab === 'Manage Users' && (
        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-pill role-${u.role}`}>{u.role}</span>
                  </td>
                  <td>
                    <span className={`status-pill ${u.isActive ? 'active' : 'inactive'}`}>
                      {u.isActive ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="user-actions">
                    <button className="table-action-btn" onClick={() => handleToggleRole(u)}>
                      Make {u.role === 'admin' ? 'User' : 'Admin'}
                    </button>
                    <button
                      className={`table-action-btn ${u.isActive ? 'danger' : ''}`}
                      onClick={() => handleToggleActive(u)}
                    >
                      {u.isActive ? 'Deactivate' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={!!confirmAction}
        title={confirmAction?.label || ''}
        message={confirmAction?.message || ''}
        confirmLabel="Confirm"
        onConfirm={confirmUserAction}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
};

export default AdminDashboard;