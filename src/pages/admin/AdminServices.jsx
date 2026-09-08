import React, { useState } from 'react';
import { Save, CheckCircle2, Wrench, Radio, Zap } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminServices() {
  const { db, updateServices } = useData();
  const [services, setServices] = useState(db.services || []);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdateField = (index, field, value) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleUpdateFeatures = (index, featureIndex, value) => {
    const updated = [...services];
    const feats = [...updated[index].features];
    feats[featureIndex] = value;
    updated[index].features = feats;
    setServices(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateServices(services);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="admin-services pb-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">Core Store Services</h2>
          <p className="text-muted small mb-0">
            Edit titles, descriptions, and bullet points for the 3 primary showroom service cards.
          </p>
        </div>

        <button type="button" className="btn btn-brand-primary btn-sm d-inline-flex align-items-center gap-1" onClick={handleSave}>
          <Save size={16} />
          <span>Save All Services</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4 shadow-sm">
          <CheckCircle2 size={18} />
          <span>Service cards successfully updated on the homepage!</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="row g-4">
          {services.map((srv, idx) => {
            const Icon = srv.icon === 'Wrench' ? Wrench : srv.icon === 'Radio' ? Radio : Zap;
            return (
              <div key={srv.id || idx} className="col-12 col-lg-4">
                <div className="card p-4 border rounded-4 bg-white shadow-sm h-100" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="p-2 rounded bg-light text-danger">
                      <Icon size={22} />
                    </div>
                    <span className="badge bg-light text-dark border">Service Card #{idx + 1}</span>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-dark">Service Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={srv.title}
                      onChange={(e) => handleUpdateField(idx, 'title', e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-dark">Subtitle / Summary</label>
                    <textarea
                      rows={3}
                      className="form-control"
                      value={srv.subtitle}
                      onChange={(e) => handleUpdateField(idx, 'subtitle', e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-dark">Feature Bullets</label>
                    <div className="d-flex flex-column gap-2">
                      {srv.features?.map((feat, fIdx) => (
                        <input
                          key={fIdx}
                          type="text"
                          className="form-control form-control-sm"
                          value={feat}
                          onChange={(e) => handleUpdateFeatures(idx, fIdx, e.target.value)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="form-label small fw-bold text-dark">Linked Enquiry Tag</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={srv.enquiryService || ''}
                      onChange={(e) => handleUpdateField(idx, 'enquiryService', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}
