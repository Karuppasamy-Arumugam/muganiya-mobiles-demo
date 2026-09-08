import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Grid, Smartphone, Headphones, Tv, Wrench, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-bottom shadow-sm" style={{ borderBottomColor: 'var(--border-color)' }}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between overflow-x-auto py-2 gap-3" style={{ whiteSpace: 'nowrap' }}>
          <div className="d-flex align-items-center gap-1 gap-md-2">
            <NavLink
              to="/categories"
              end
              className={({ isActive }) =>
                `d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill text-decoration-none fw-semibold transition-all ${
                  isActive ? 'bg-danger text-white' : 'text-dark hover-bg-light'
                }`
              }
              style={{ fontSize: '0.9rem' }}
            >
              <Grid size={16} />
              <span>All Categories</span>
            </NavLink>

            <NavLink
              to="/mobiles"
              className={({ isActive }) =>
                `d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill text-decoration-none fw-semibold transition-all ${
                  isActive ? 'bg-danger text-white' : 'text-dark hover-bg-light'
                }`
              }
              style={{ fontSize: '0.9rem' }}
            >
              <Smartphone size={16} />
              <span>Mobiles</span>
            </NavLink>

            <NavLink
              to="/categories?category=charging-power"
              className={({ isActive }) =>
                `d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill text-decoration-none fw-semibold transition-all ${
                  isActive ? 'bg-danger text-white' : 'text-dark hover-bg-light'
                }`
              }
              style={{ fontSize: '0.9rem' }}
            >
              <Headphones size={16} />
              <span>Accessories</span>
            </NavLink>

            <NavLink
              to="/categories?category=tvs"
              className={({ isActive }) =>
                `d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill text-decoration-none fw-semibold transition-all ${
                  isActive ? 'bg-danger text-white' : 'text-dark hover-bg-light'
                }`
              }
              style={{ fontSize: '0.9rem' }}
            >
              <Tv size={16} />
              <span>TV</span>
            </NavLink>
          </div>

          <div className="d-none d-md-flex align-items-center gap-2">
            <Link
              to="/contact?service=repair"
              className="d-inline-flex align-items-center gap-1 text-danger text-decoration-none fw-semibold px-2"
              style={{ fontSize: '0.85rem' }}
            >
              <Wrench size={14} />
              <span>Display & Repair Desk</span>
            </Link>
            <span className="text-muted">|</span>
            <Link
              to="/about"
              className="d-inline-flex align-items-center gap-1 text-muted text-decoration-none fw-semibold px-2"
              style={{ fontSize: '0.85rem' }}
            >
              <Sparkles size={14} className="text-warning" />
              <span>JioMart / vivo / OPPO Partner</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
