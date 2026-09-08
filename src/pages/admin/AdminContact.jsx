import React, { useState } from 'react';
import { Save, CheckCircle2, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminContact() {
  const { db, updateContactSettings } = useData();
  const [settings, setSettings] = useState(db.contactSettings || {});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateContactSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="admin-contact pb-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">Contact Details & Showroom Hours</h2>
          <p className="text-muted small mb-0">
            Configure the shop telephone number, WhatsApp enquiry line, physical showroom address, and operating hours.
          </p>
        </div>

        <button type="button" className="btn btn-brand-primary btn-sm d-inline-flex align-items-center gap-1" onClick={handleSave}>
          <Save size={16} />
          <span>Save Contact Settings</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4 shadow-sm">
          <CheckCircle2 size={18} />
          <span>Contact details and store hours updated across all header, footer, and floating buttons!</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="card p-4 border rounded-4 bg-white shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-dark">
                <Phone size={15} className="text-danger me-1" />
                Store Calling Phone Number *
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="+91 98765 43210"
                value={settings.phone || ''}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                required
              />
              <small className="text-muted">Used for direct call buttons and header enquiries.</small>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-dark">
                <Phone size={15} className="text-success me-1" />
                WhatsApp Enquiry Mobile Number *
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="+919876543210"
                value={settings.whatsapp || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                required
              />
              <small className="text-muted">Used for floating WhatsApp button and product enquiry pre-fills.</small>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-dark">
                <Mail size={15} className="text-danger me-1" />
                Contact Email Address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="contact@muganiyaamobiles.demo"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-dark">
                <Clock size={15} className="text-danger me-1" />
                Store Opening Hours *
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Mon - Sat: 9:30 AM - 9:30 PM | Sun: 10:00 AM - 8:00 PM"
                value={settings.hours || ''}
                onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-dark">
                <MapPin size={15} className="text-danger me-1" />
                Store Physical Showroom Address *
              </label>
              <textarea
                rows={2}
                className="form-control"
                placeholder="Main Bazaar Road, Near Clock Tower, Demo City, Tamil Nadu 600001"
                value={settings.address || ''}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-dark">Map Query Placeholder</label>
              <input
                type="text"
                className="form-control"
                placeholder="Muganiyaa Mobiles"
                value={settings.mapQuery || ''}
                onChange={(e) => setSettings({ ...settings, mapQuery: e.target.value })}
              />
              <small className="text-muted">Will populate the Google Map query when verified.</small>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
