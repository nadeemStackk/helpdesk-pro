import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StatusBadge, PriorityBadge } from './Badge';
import './TicketCard.css';

const TicketCard = ({ ticket, showOwner = false, index = 0 }) => {
  const formattedDate = new Date(ticket.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link to={`/tickets/${ticket._id}`} className="ticket-card">
        <div className="ticket-card-top">
          <h3>{ticket.title}</h3>
          <StatusBadge status={ticket.status} />
        </div>
        <p className="ticket-card-desc">{ticket.description}</p>
        <div className="ticket-card-bottom">
          <div className="ticket-card-tags">
            <PriorityBadge priority={ticket.priority} />
            <span className="ticket-category">{ticket.category}</span>
          </div>
          <div className="ticket-card-meta">
            {showOwner && ticket.createdBy?.name && (
              <span className="ticket-owner">{ticket.createdBy.name}</span>
            )}
            <span className="ticket-date">{formattedDate}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TicketCard;