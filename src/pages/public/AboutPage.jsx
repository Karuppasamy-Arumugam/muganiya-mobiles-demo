import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AboutPage() {
  const { db } = useData();
  const content = db.websiteContent || {};
  const about = content.aboutUs || {};
  const partners = content.partners || [];
  const contact = db.contactSettings || {};

  return (
    <div className="about-page pb-5">
      {/* Page Header */}
      <div className="bg-white border-bottom py-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small mb-2">
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item active text-dark" aria-current="page">
                About Us
              </li>
            </ol>
          </nav>
          <h1 className="fw-bold fs-3 text-dark mb-1">About Muganiyaa-Mobiles</h1>
          <p className="text-muted small mb-0">
            Local electronics retailer, trusted device repairers, and authorized brand store partners.
          </p>
        </div>
      </div>

      <div className="container py-5">
        {/* Story Section & Storefront Visual */}
        <div className="row g-5 align-items-center mb-5">
          <div className="col-12 col-lg-6">
            <span className="badge-blush text-uppercase fw-bold mb-2 d-inline-block">Authentic Local Retail</span>
            <h2 className="fw-bold mb-3">{about.title || 'Welcome to Muganiyaa-Mobiles'}</h2>
            <h6 className="text-muted mb-3 fw-medium">{about.subtitle}</h6>
            <div className="text-muted" style={{ lineHeight: '1.8', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
              {about.description}
            </div>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link to="/contact" className="btn btn-brand-primary px-4 py-2">
                Visit Our Showroom
              </Link>
              <Link to="/mobiles" className="btn btn-brand-outline px-4 py-2">
                View Mobile Catalogue
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            {/* Storefront Visual Banner */}
            <div
              className="p-5 rounded-4 shadow-sm text-white position-relative overflow-hidden"
              style={{
                backgroundColor: '#B72E35',
                backgroundImage: 'radial-gradient(circle at 10% 20%, #96232A 0%, #B72E35 90%)',
                minHeight: '380px'
              }}
            >
              <div className="position-relative" style={{ zIndex: 2 }}>
                <span className="badge bg-white text-danger fw-bold mb-3">Muganiyaa Storefront</span>
                <h3 className="fw-bold text-white mb-2">Muganiyaa-Mobiles</h3>
                <p className="text-white-50 mb-4" style={{ fontSize: '0.92rem' }}>
                  Main Bazaar Road, Near Town Clock Tower, Tamil Nadu. Dedicated mobile counter, certified repair bench, and home electronics showroom.
                </p>

                <div className="row g-3">
                  <div className="col-6">
                    <div className="p-3 bg-white bg-opacity-10 rounded">
                      <h4 className="fw-bold mb-0 text-white">100%</h4>
                      <small className="text-white-50">Verified Invoices</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 bg-white bg-opacity-10 rounded">
                      <h4 className="fw-bold mb-0 text-white">15 Min</h4>
                      <small className="text-white-50">SIM & MNP Porting</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Partnerships */}
        <div className="my-5 p-4 p-md-5 rounded-4 border bg-white" style={{ borderColor: 'var(--border-color)' }}>
          <div className="text-center max-w-xl mx-auto mb-4">
            <span className="badge-blush text-uppercase fw-bold mb-1 d-inline-block">Brand Relations</span>
            <h3 className="fw-bold">Our Retail Partnerships</h3>
            <p className="text-muted small">
              Owner-provided retail partnership statements with leading mobile and consumer electronics networks.
            </p>
          </div>

          <div className="row g-4">
            {partners.map((partner, pIdx) => (
              <div key={pIdx} className="col-12 col-md-4">
                <div className="card h-100 p-4 border bg-light rounded-3" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Award size={20} className="text-danger" />
                    <h5 className="fw-bold text-dark mb-0">{partner.name}</h5>
                  </div>
                  <div className="badge-brand mb-3 d-inline-block align-self-start">
                    {partner.badge}
                  </div>
                  <p className="text-muted small mb-0" style={{ lineHeight: '1.6' }}>
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <small className="text-muted" style={{ fontSize: '0.78rem' }}>
              *Note: These are owner-provided partnership statements. Does not imply JioMart Digital central stock integration or authorized brand repair center status.
            </small>
          </div>
        </div>

        {/* Visit Shop Callout */}
        <div className="card p-4 p-md-5 border rounded-4" style={{ backgroundColor: 'var(--secondary-bg)', borderColor: 'var(--border-color)' }}>
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-8">
              <h4 className="fw-bold text-dark mb-2">Planning to Visit Our Store?</h4>
              <p className="text-muted mb-3" style={{ fontSize: '0.92rem' }}>
                We are open 7 days a week. Feel free to bring your old smartphone for evaluation, or walk in with any technical query.
              </p>
              <div className="d-flex flex-wrap gap-4 text-muted small">
                <div className="d-flex align-items-center gap-1">
                  <Clock size={16} className="text-danger" />
                  <span>{contact.hours}</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <MapPin size={16} className="text-danger" />
                  <span>{contact.address}</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 text-md-end">
              <a href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`} className="btn btn-brand-primary px-4 py-3 fw-bold">
                <Phone size={18} className="me-2" />
                <span>Call Store Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
