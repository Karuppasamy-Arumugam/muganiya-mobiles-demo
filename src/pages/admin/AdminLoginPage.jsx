import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Key, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import BrandLogo from '../../components/common/BrandLogo';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error);
    }
  };

  const handleQuickDemoAccess = () => {
    loginAsDemo();
    navigate('/admin');
  };

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
          <p className="text-muted small mb-0">Client Presentation & Store Management</p>
        </div>

        {/* Prominent One-Click Demo Access Button */}
        <div className="mb-4 p-3 bg-danger-subtle rounded-3 border border-danger-subtle text-center">
          <div className="d-flex align-items-center justify-content-center gap-1 text-danger fw-bold small mb-2">
            <Sparkles size={16} />
            <span>Interactive Demo Access</span>
          </div>
          <button
            type="button"
            className="btn btn-brand-primary w-100 py-2 fw-bold"
            onClick={handleQuickDemoAccess}
          >
            <span>Enter Demo Admin (1-Click)</span>
            <ArrowRight size={16} className="ms-1" />
          </button>
        </div>

        <div className="position-relative text-center my-3">
          <hr className="my-0" />
          <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 small text-muted">
            or use credentials
          </span>
        </div>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="adminUsername" className="form-label small fw-bold text-dark">Username</label>
            <input
              id="adminUsername"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              required
            />
          </div>

          <div>
            <label htmlFor="adminPassword" className="form-label small fw-bold text-dark">Password</label>
            <input
              id="adminPassword"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="e.g. admin123"
              required
            />
          </div>

          <button type="submit" className="btn btn-brand-outline w-100 py-2 fw-bold mt-2">
            Sign In to Dashboard
          </button>
        </form>

        <div className="mt-4 pt-3 border-top text-center">
          <div className="small text-muted d-flex align-items-center justify-content-center gap-1 mb-2">
            <Key size={14} className="text-secondary" />
            <span>Default demo credentials: <strong>admin</strong> / <strong>admin123</strong></span>
          </div>
          <Link to="/" className="text-decoration-none small text-muted hover-red">
            ← Return to Public Website
          </Link>
        </div>
      </div>

      <div className="text-center mt-3 text-muted small" style={{ maxWidth: '420px', fontSize: '0.75rem' }}>
        <ShieldAlert size={14} className="text-secondary me-1" />
        This is a local demonstration portal. Client-side authentication is illustrative and does not represent live backend security.
      </div>
    </div>
  );
}
