import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Phone, Menu, X, Clock, MapPin } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useWishlist } from '../../context/WishlistContext';
import { useData } from '../../context/DataContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlistCount, openWishlist } = useWishlist();
  const { db } = useData();
  const navigate = useNavigate();

  const contact = db.contactSettings || {};

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/categories?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="border-bottom sticky-top bg-white" style={{ zIndex: 1030 }}>
      {/* Top Utility Bar */}
      <div style={{ backgroundColor: 'var(--secondary-bg)', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem' }} className="py-1">
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="d-flex align-items-center gap-3 text-muted">
            <span className="d-inline-flex align-items-center gap-1">
              <Clock size={13} className="text-danger" />
              <span>{contact.hours || 'Mon - Sat: 9:30 AM - 9:30 PM'}</span>
            </span>
            <span className="d-none d-md-inline-flex align-items-center gap-1">
              <MapPin size={13} className="text-danger" />
              <span>Main Road, Demo City (In-store Pick-up Available)</span>
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="badge-blush d-none d-sm-inline-block">Client Demo Prototype</span>
            <a href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`} className="text-decoration-none fw-semibold text-dark d-inline-flex align-items-center gap-1">
              <Phone size={13} className="text-danger" />
              <span>Enquiry: {contact.phone || '+91 98765 43210'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-2 py-md-3">
        <div className="d-flex align-items-center justify-content-between gap-3">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <BrandLogo />
          </div>

          {/* Search Form (Desktop/Tablet) */}
          <form onSubmit={handleSearchSubmit} className="d-none d-md-flex flex-grow-1 mx-3" style={{ maxWidth: '520px' }}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search mobiles, brands, TVs, ACs, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderColor: 'var(--border-color)', borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)' }}
                aria-label="Search products"
              />
              <button
                className="btn btn-brand-primary"
                type="submit"
                style={{ borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}
                aria-label="Submit search"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Header Actions */}
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            {/* Wishlist Trigger */}
            <button
              type="button"
              className="btn btn-brand-soft position-relative d-inline-flex align-items-center gap-2"
              onClick={openWishlist}
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart size={18} className="text-danger" />
              <span className="d-none d-lg-inline fw-semibold">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Quick Links */}
            <div className="d-none d-lg-flex align-items-center gap-2">
              <Link to="/about" className="btn btn-link text-dark text-decoration-none fw-semibold px-2">
                About Us
              </Link>
              <Link to="/contact" className="btn btn-brand-outline">
                Contact & Repair
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="btn btn-outline-secondary d-md-none p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="d-md-none mt-2">
          <form onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search mobiles, brands, appliances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderColor: 'var(--border-color)' }}
              />
              <button className="btn btn-brand-primary btn-sm" type="submit">
                <Search size={16} />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="d-md-none border-top mt-3 pt-3">
            <nav className="d-flex flex-column gap-2">
              <Link
                to="/"
                className="px-2 py-2 fw-semibold text-dark text-decoration-none rounded hover-bg-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/mobiles"
                className="px-2 py-2 fw-semibold text-dark text-decoration-none rounded hover-bg-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mobiles & Smartphones
              </Link>
              <Link
                to="/categories"
                className="px-2 py-2 fw-semibold text-dark text-decoration-none rounded hover-bg-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Categories & Products
              </Link>
              <Link
                to="/categories?category=tvs"
                className="px-2 py-2 fw-semibold text-dark text-decoration-none rounded hover-bg-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Smart TVs
              </Link>
              <Link
                to="/categories?category=cooling-appliances"
                className="px-2 py-2 fw-semibold text-dark text-decoration-none rounded hover-bg-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cooling & Appliances
              </Link>
              <Link
                to="/about"
                className="px-2 py-2 fw-semibold text-dark text-decoration-none rounded hover-bg-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us & Partners
              </Link>
              <Link
                to="/contact"
                className="px-2 py-2 fw-semibold text-dark text-decoration-none rounded hover-bg-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact & Services
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
