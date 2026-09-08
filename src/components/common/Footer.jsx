import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Lock } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useData } from '../../context/DataContext';

export default function Footer() {
  const { db } = useData();
  const contact = db.contactSettings || {};
  const content = db.websiteContent || {};
  const footerContent = content.footer || {};

  return (
    <footer className="bg-white border-top mt-auto" style={{ borderTopColor: 'var(--border-color)' }}>
      {/* Top Value Strip */}
      <div style={{ backgroundColor: 'var(--secondary-bg)', borderBottom: '1px solid var(--border-color)' }} className="py-4">
        <div className="container">
          <div className="row g-3 text-center text-md-start">
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <div className="rounded-circle p-2" style={{ backgroundColor: 'var(--soft-blush)', color: 'var(--primary-red)' }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">100% Genuine Products</h6>
                  <small className="text-muted">Brand warranties & verified manufacturer distribution</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <div className="rounded-circle p-2" style={{ backgroundColor: 'var(--soft-blush)', color: 'var(--primary-red)' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Express In-Store Services</h6>
                  <small className="text-muted">15-minute SIM activation & fast repair turnaround</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <div className="rounded-circle p-2" style={{ backgroundColor: 'var(--soft-blush)', color: 'var(--primary-red)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Local Personalized Guidance</h6>
                  <small className="text-muted">Direct phone & WhatsApp support with our local staff</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Shop Intro */}
          <div className="col-12 col-lg-4">
            <BrandLogo />
            <p className="mt-3 text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              {footerContent.tagline || 'Your trusted neighborhood destination for mobile phones, electronics, genuine accessories, express smartphone repairs, and recharge services.'}
            </p>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className="badge-blush">JioMart Digital Partner</span>
              <span className="badge-blush">vivo Partner</span>
              <span className="badge-blush">OPPO Partner</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold mb-3 text-dark">Top Categories</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.88rem' }}>
              <li>
                <Link to="/mobiles" className="text-decoration-none text-muted hover-red">
                  5G Smartphones
                </Link>
              </li>
              <li>
                <Link to="/categories?category=tablets" className="text-decoration-none text-muted hover-red">
                  Tablets
                </Link>
              </li>
              <li>
                <Link to="/categories?category=audio" className="text-decoration-none text-muted hover-red">
                  Audio & Earbuds
                </Link>
              </li>
              <li>
                <Link to="/categories?category=tvs" className="text-decoration-none text-muted hover-red">
                  Smart TVs
                </Link>
              </li>
              <li>
                <Link to="/categories?category=cooling-appliances" className="text-decoration-none text-muted hover-red">
                  Cooling & ACs
                </Link>
              </li>
              <li>
                <Link to="/categories?category=kitchen-appliances" className="text-decoration-none text-muted hover-red">
                  Kitchen Appliances
                </Link>
              </li>
              <li>
                <Link to="/categories?category=sim-cards" className="text-decoration-none text-muted hover-red">
                  SIM Cards & MNP
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Shop Info */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold mb-3 text-dark">Store Services</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.88rem' }}>
              <li>
                <Link to="/contact?service=repair" className="text-decoration-none text-muted hover-red">
                  Screen & Display Repair
                </Link>
              </li>
              <li>
                <Link to="/contact?service=sim" className="text-decoration-none text-muted hover-red">
                  SIM Card Activation
                </Link>
              </li>
              <li>
                <Link to="/contact?service=sim" className="text-decoration-none text-muted hover-red">
                  Mobile Number Porting (MNP)
                </Link>
              </li>
              <li>
                <Link to="/contact?service=recharge" className="text-decoration-none text-muted hover-red">
                  Instant Mobile Recharge
                </Link>
              </li>
              <li>
                <Link to="/contact?service=recharge" className="text-decoration-none text-muted hover-red">
                  DTH Dish Top-up
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none text-muted hover-red">
                  About Muganiyaa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="col-12 col-md-6 col-lg-4">
            <h6 className="fw-bold mb-3 text-dark">Store Visit & Hours</h6>
            <ul className="list-unstyled d-flex flex-column gap-3 text-muted" style={{ fontSize: '0.88rem' }}>
              <li className="d-flex align-items-start gap-2">
                <MapPin size={18} className="text-danger flex-shrink-0 mt-1" />
                <span>{contact.address || 'Main Bazaar Road, Demo City (Editable in Admin)'}</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Phone size={18} className="text-danger flex-shrink-0" />
                <a href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`} className="text-decoration-none text-dark fw-semibold">
                  {contact.phone || '+91 98765 43210'}
                </a>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Mail size={18} className="text-danger flex-shrink-0" />
                <span>{contact.email || 'contact@muganiyaamobiles.demo'}</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <Clock size={18} className="text-danger flex-shrink-0 mt-1" />
                <span>{contact.hours || 'Mon-Sat: 9:30 AM - 9:30 PM | Sun: 10:00 AM - 8:00 PM'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Admin Access Bar */}
      <div style={{ backgroundColor: 'var(--secondary-bg)', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem' }} className="py-3">
        <div className="container d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2 text-muted">
          <div>
            © {new Date().getFullYear()} <strong className="text-dark">Muganiyaa-Mobiles</strong>. All rights reserved. (Demo Presentation Only)
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link to="/privacy" className="text-muted text-decoration-none hover-red">
              Privacy Information
            </Link>
            <span>•</span>
            {/* Discreet Owner / Admin Access */}
            <Link
              to="/admin/login"
              className="text-muted text-decoration-none d-inline-flex align-items-center gap-1 hover-red"
              title="Shop Owner Administration Portal"
            >
              <Lock size={12} />
              <span>Owner Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
