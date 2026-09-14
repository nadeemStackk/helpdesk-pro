import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '100px 20px' }}>
    <h1 style={{ fontSize: 60, color: 'var(--primary)' }}>404</h1>
    <p style={{ color: 'var(--ink-soft)', marginTop: 8, marginBottom: 24 }}>
      This page doesn't exist.
    </p>
    <Link to="/dashboard" className="primary-btn">Back to Dashboard</Link>
  </div>
);

export default NotFound;