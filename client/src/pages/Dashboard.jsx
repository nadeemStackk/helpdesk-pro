import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getTickets } from '../services/ticketService';
import TicketCard from '../components/TicketCard';
import CreateTicketModal from '../components/CreateTicketModal';
import './Dashboard.css';
import Spinner from '../components/Spinner';

const STATUS_FILTERS = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const loadTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (err) {
      setError('Failed to load your tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleCreated = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  const filteredTickets =
    activeFilter === 'All' ? tickets : tickets.filter((t) => t.status === activeFilter);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>My Tickets</h1>
          <p className="page-subtitle">Track and manage your support requests</p>
        </div>
        <motion.button
          className="primary-btn"
          onClick={() => setShowModal(true)}
          whileTap={{ scale: 0.97 }}
        >
          + New Ticket
        </motion.button>
      </div>

      <div className="filter-tabs">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            className={`filter-tab ${activeFilter === status ? 'active' : ''}`}
            onClick={() => setActiveFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

{loading && <div style={{ padding: '60px 0' }}><Spinner /></div>}
      {!loading && error && <div className="state-message error">{error}</div>}

      {!loading && !error && filteredTickets.length === 0 && (
        <div className="empty-state">
          <h3>No tickets here</h3>
          <p>
            {activeFilter === 'All'
              ? "You haven't created any tickets yet."
              : `You have no tickets with status "${activeFilter}".`}
          </p>
        </div>
      )}

      {!loading && !error && filteredTickets.length > 0 && (
        <div className="ticket-list">
          {filteredTickets.map((ticket, i) => (
            <TicketCard key={ticket._id} ticket={ticket} index={i} />
          ))}
        </div>
      )}

      <CreateTicketModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={handleCreated}
      />
    </div>
  );
};

export default Dashboard;