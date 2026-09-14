import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getTicketById, updateTicket, deleteTicket, addComment } from '../services/ticketService';
import { StatusBadge, PriorityBadge } from '../components/Badge';
import ConfirmModal from '../components/ConfirmModal';
import Spinner from '../components/Spinner';
import './TicketDetail.css';

const STATUS_OPTIONS = ['Open', 'In Progress', 'Resolved', 'Closed'];

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [commentText, setCommentText] = useState('');
  const [postingComment, setPostingComment] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [notFoundOrForbidden, setNotFoundOrForbidden] = useState(false);

  const loadTicket = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTicketById(id);
      setTicket(data.ticket);
      setComments(data.comments);
    } catch (err) {
      if (err.response?.status === 404 || err.response?.status === 403) {
        setNotFoundOrForbidden(true);
      } else {
        setError('Failed to load ticket details.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const isOwner = ticket && ticket.createdBy?._id === user?.id;
  const canEdit = isOwner || isAdmin;

  const handleStatusChange = async (newStatus) => {
    setStatusUpdating(true);
    try {
      const updated = await updateTicket(id, { status: newStatus });
      setTicket(updated);
    } catch (err) {
      setError('Failed to update status.');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTicket(id);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete ticket.');
      setShowDeleteModal(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setPostingComment(true);
    try {
      const newComment = await addComment(id, commentText);
      setComments((prev) => [...prev, newComment]);
      setCommentText('');
    } catch (err) {
      setError('Failed to add comment.');
    } finally {
      setPostingComment(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0' }}>
        <Spinner />
      </div>
    );
  }

  if (notFoundOrForbidden) {
    return (
      <div className="empty-state">
        <h3>Ticket not found</h3>
        <p>This ticket doesn't exist or you don't have access to it.</p>
        <Link to="/dashboard" className="primary-btn" style={{ display: 'inline-block', marginTop: 16 }}>
          Back to My Tickets
        </Link>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="empty-state">
        <h3>Something went wrong</h3>
        <p>{error || 'Unable to load this ticket right now.'}</p>
        <Link to="/dashboard" className="primary-btn" style={{ display: 'inline-block', marginTop: 16 }}>
          Back to My Tickets
        </Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Link to={isAdmin ? '/admin' : '/dashboard'} className="back-link">
        &larr; Back to tickets
      </Link>

      {error && <div className="auth-error" style={{ marginTop: 16 }}>{error}</div>}

      <div className="ticket-detail-card">
        <div className="ticket-detail-header">
          <div>
            <h1>{ticket.title}</h1>
            <div className="ticket-detail-meta">
              <span>Created by <strong>{ticket.createdBy?.name}</strong></span>
              <span>&middot;</span>
              <span>{new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          <div className="ticket-detail-badges">
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </div>

        <p className="ticket-detail-desc">{ticket.description}</p>

        <div className="ticket-detail-tags">
          <span className="tag-pill">{ticket.category}</span>
          {ticket.assignedTo?.name && (
            <span className="tag-pill">Assigned to {ticket.assignedTo.name}</span>
          )}
        </div>

        {isAdmin && (
          <div className="admin-controls">
            <label>Update status:</label>
            <div className="status-buttons">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  className={`status-option ${ticket.status === status ? 'active' : ''}`}
                  onClick={() => handleStatusChange(status)}
                  disabled={statusUpdating || ticket.status === status}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}

        {canEdit && (
          <div className="ticket-detail-actions">
            <button className="danger-link-btn" onClick={() => setShowDeleteModal(true)}>
              Delete ticket
            </button>
          </div>
        )}
      </div>

      <div className="comments-section">
        <h2>Comments ({comments.length})</h2>

        <div className="comments-list">
          {comments.length === 0 && (
            <p className="state-message" style={{ padding: '24px 0' }}>No comments yet.</p>
          )}
          {comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className={`comment-avatar ${comment.author?.role === 'admin' ? 'admin' : ''}`}>
                {comment.author?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="comment-body">
                <div className="comment-header">
                  <strong>{comment.author?.name}</strong>
                  {comment.author?.role === 'admin' && <span className="admin-tag">Admin</span>}
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p>{comment.message}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="comment-form" onSubmit={handleAddComment}>
          <textarea
            rows={3}
            placeholder="Write a reply..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className="primary-btn" disabled={postingComment || !commentText.trim()}>
            {postingComment ? 'Posting...' : 'Post comment'}
          </button>
        </form>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete this ticket?"
        message="This will permanently delete the ticket and all its comments. This cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </motion.div>
  );
};

export default TicketDetail;