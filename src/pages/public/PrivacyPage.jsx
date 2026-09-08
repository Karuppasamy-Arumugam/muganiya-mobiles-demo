import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="privacy-page pb-5">
      <div className="bg-white border-bottom py-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small mb-2">
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item active text-dark" aria-current="page">
                Privacy Information
              </li>
            </ol>
          </nav>
          <h1 className="fw-bold fs-3 text-dark mb-1">Privacy & Demo Disclosures</h1>
          <p className="text-muted small mb-0">
            Information regarding browser storage, demonstration data handling, and privacy standards.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="card p-4 p-md-5 border rounded-4 bg-white shadow-sm max-w-3xl mx-auto" style={{ borderColor: 'var(--border-color)' }}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="p-3 rounded-circle bg-light text-danger">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h4 className="fw-bold text-dark mb-1">Demonstration Privacy Policy</h4>
              <small className="text-muted">Effective Date: September 2026</small>
            </div>
          </div>

          <div className="d-flex flex-column gap-4 text-muted" style={{ lineHeight: '1.7', fontSize: '0.92rem' }}>
            <section>
              <h5 className="fw-bold text-dark mb-2">1. Client Demo Prototype Notice</h5>
              <p>
                This website is built exclusively as an interactive client presentation and technical prototype for <strong>Muganiyaa-Mobiles</strong>. It demonstrates the complete public storefront architecture, product catalogue, variant selector, and owner administration workflows without requiring live cloud databases or paid third-party services.
              </p>
            </section>

            <section>
              <h5 className="fw-bold text-dark mb-2">2. Local Browser Storage (localStorage & IndexedDB)</h5>
              <p>
                All dynamic operations—including product modifications in the admin panel, hero banner changes, customer wishlist selections, and contact form submissions—are stored locally in your web browser using HTML5 <code>localStorage</code> and <code>IndexedDB</code>.
              </p>
              <ul className="small">
                <li><strong>No External Server:</strong> No data is sent to external databases or cloud analytics.</li>
                <li><strong>Browser Isolated:</strong> Changes made on this device are strictly local and will not affect other devices or visitors.</li>
                <li><strong>Data Reset:</strong> You can completely reset all stored modifications back to default sample values anytime via the <strong>Demo Settings</strong> tab in the owner admin panel.</li>
              </ul>
            </section>

            <section>
              <h5 className="fw-bold text-dark mb-2">3. Zero Tracking & Third-Party Cookies</h5>
              <p>
                We do not use advertising trackers, profiling cookies, external AI LLM network calls, or paid tracking pixels on this demo website. Fonts and scripts are loaded securely from standard CDNs with privacy protection.
              </p>
            </section>

            <section>
              <h5 className="fw-bold text-dark mb-2">4. Questions & Shop Contact</h5>
              <p>
                For official enquiries regarding actual store stock, repair services, or retail billing, please contact <strong>Muganiyaa-Mobiles</strong> directly at our showroom or through our verified telephone numbers.
              </p>
            </section>
          </div>

          <div className="mt-5 pt-4 border-top text-center">
            <Link to="/" className="btn btn-brand-primary btn-sm px-4 py-2">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
