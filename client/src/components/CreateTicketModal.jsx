import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createTicket } from '../services/ticketService';
import './CreateTicketModal.css';

const CreateTicketModal = ({ isOpen, onClose, onCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technical');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetAndClose = () => {
    setTitle('');
    setDescription('');
    setCategory('Technical');
    setPriority('Medium');
    setError('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Please fill in both title and description');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const ticket = await createTicket({ title, description, category, priority });
      onCreated(ticket);
      resetAndClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
        >
          <motion.div
            className="modal-box ticket-modal"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Create a new ticket</h3>
            <p className="modal-subtitle">Describe your issue and we'll take a look</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief summary of the issue"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide as much detail as possible"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Technical</option>
                    <option>Billing</option>
                    <option>Account</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="modal-btn-cancel" onClick={resetAndClose}>
                  Cancel
                </button>
                <button type="submit" className="modal-btn-primary" disabled={loading}>
                  {loading ? 'Creating...' : 'Create ticket'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateTicketModal;