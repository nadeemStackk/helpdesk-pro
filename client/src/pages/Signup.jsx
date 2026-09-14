import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!name.trim()) return 'Please enter your name';
    if (!email.trim()) return 'Please enter your email';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
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
          <h2>Join the desk.</h2>
          <p>Create an account to start submitting and tracking support tickets.</p>
        </div>
      </motion.div>

      <motion.div
        className="auth-form-panel"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="auth-form-wrap">
          <div className="auth-logo">HelpDesk<span>Pro</span></div>
          <h1>Create your account</h1>
          <p className="auth-subtitle">Start tracking support tickets in minutes</p>

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
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </div>

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
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />
            </div>

            <motion.button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </motion.button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;