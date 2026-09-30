import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import BrandLogo from '../../components/common/BrandLogo';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await login(email.trim(), password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error);
      }
    } catch {
      setError('Sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-3"
      style={{ backgroundColor: 'var(--secondary-bg)' }}
    >
      <div className="mb-4">
        <BrandLogo size="lg" />
      </div>

      <div
        className="card p-4 p-md-5 border rounded-4 bg-white shadow-sm w-100"
        style={{ maxWidth: '440px', borderColor: 'var(--border-color)' }}
      >
        <div className="text-center mb-4">
          <div
            className="p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
            style={{ backgroundColor: 'var(--soft-blush)', color: 'var(--primary-red)' }}
          >
            <Lock size={28} />
          </div>
          <h4 className="fw-bold text-dark mb-1">Owner Administration</h4>
          <p className="text-muted small mb-0">Sign in with your Supabase admin account</p>
        </div>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="adminEmail" className="form-label small fw-bold text-dark">
              Email
            </label>
            <input
              id="adminEmail"
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label htmlFor="adminPassword" className="form-label small fw-bold text-dark">
              Password
            </label>
            <input
              id="adminPassword"
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-brand-primary w-100 py-2 fw-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in…' : 'Sign In to Dashboard'}
            {!isSubmitting && <ArrowRight size={16} className="ms-1" />}
          </button>
        </form>

        <div className="mt-4 pt-3 border-top text-center">
          <Link to="/" className="text-decoration-none small text-muted hover-red">
            ← Return to Public Website
          </Link>
        </div>
      </div>

      <div className="text-center mt-3 text-muted small" style={{ maxWidth: '420px', fontSize: '0.75rem' }}>
        <ShieldAlert size={14} className="text-secondary me-1" />
        Access requires an active admin profile in the local Supabase database.
      </div>
    </div>
  );
}