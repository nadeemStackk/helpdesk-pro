import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-form-panel"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="auth-form-wrap">
          <div className="auth-logo">HelpDesk<span>Pro</span></div>
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Sign in to manage your support tickets</p>

          {error && (
            <motion.div
              className="auth-error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <motion.button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </motion.button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </motion.div>

      <motion.div
        className="auth-visual-panel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="floating-cards">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`float-card float-card-${i}`}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              <div className={`float-card-badge badge-${i}`} />
              <div className="float-card-line long" />
              <div className="float-card-line short" />
            </motion.div>
          ))}
        </div>
        <div className="visual-text">
          <h2>Support, organized.</h2>
          <p>Track tickets, assign priorities, and resolve issues — all in one clean dashboard.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;