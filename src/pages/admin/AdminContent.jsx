import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminContent() {
  const { db, updateWebsiteContent } = useData();
  const [content, setContent] = useState(db.websiteContent || {});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAboutChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      aboutUs: { ...prev.aboutUs, [field]: value }
    }));
  };

  const handlePartnerChange = (index, field, value) => {
    const updated = [...(content.partners || [])];
    updated[index] = { ...updated[index], [field]: value };
    setContent((prev) => ({ ...prev, partners: updated }));
  };

  const handleWhyChooseChange = (index, field, value) => {
    const updated = [...(content.whyChooseUs || [])];
    updated[index] = { ...updated[index], [field]: value };
    setContent((prev) => ({ ...prev, whyChooseUs: updated }));
  };

  const handleFooterChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, [field]: value }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateWebsiteContent(content);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="admin-content pb-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">Website Editorial Content</h2>
          <p className="text-muted small mb-0">
            Edit the About Us story, retail partner statements, Why Choose Us cards, and footer copy.
          </p>
        </div>

        <button type="button" className="btn btn-brand-primary btn-sm d-inline-flex align-items-center gap-1" onClick={handleSave}>
          <Save size={16} />
          <span>Save Website Content</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4 shadow-sm">
          <CheckCircle2 size={18} />
          <span>Website content successfully updated across public pages!</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Section 1: About Us */}
        <div className="card p-4 border rounded-4 bg-white shadow-sm mb-4" style={{ borderColor: 'var(--border-color)' }}>
          <h5 className="fw-bold text-dark mb-3">About Us Page Content</h5>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-dark">Main Heading</label>
              <input
                type="text"
                className="form-control"
                value={content.aboutUs?.title || ''}
                onChange={(e) => handleAboutChange('title', e.target.value)}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-dark">Subtitle</label>
              <input
                type="text"
                className="form-control"
                value={content.aboutUs?.subtitle || ''}
                onChange={(e) => handleAboutChange('subtitle', e.target.value)}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-dark">About Description</label>
              <textarea
                rows={5}
                className="form-control"
                value={content.aboutUs?.description || ''}
                onChange={(e) => handleAboutChange('description', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Retail Partners */}
        <div className="card p-4 border rounded-4 bg-white shadow-sm mb-4" style={{ borderColor: 'var(--border-color)' }}>
          <h5 className="fw-bold text-dark mb-3">Authorized Retail Partnerships</h5>

          <div className="row g-3">
            {content.partners?.map((partner, pIdx) => (
              <div key={pIdx} className="col-12 col-md-4">
                <div className="card p-3 border bg-light h-100">
                  <h6 className="fw-bold text-dark mb-2">Partner #{pIdx + 1}: {partner.name}</h6>
                  <div className="mb-2">
                    <label className="form-label small fw-bold text-dark">Badge Statement</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={partner.badge}
                      onChange={(e) => handlePartnerChange(pIdx, 'badge', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label small fw-bold text-dark">Description</label>
                    <textarea
                      rows={2}
                      className="form-control form-control-sm"
                      value={partner.description}
                      onChange={(e) => handlePartnerChange(pIdx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Why Choose Us */}
        <div className="card p-4 border rounded-4 bg-white shadow-sm mb-4" style={{ borderColor: 'var(--border-color)' }}>
          <h5 className="fw-bold text-dark mb-3">Why Choose Us Pillars</h5>

          <div className="row g-3">
            {content.whyChooseUs?.map((item, wIdx) => (
              <div key={wIdx} className="col-12 col-md-6">
                <div className="card p-3 border bg-light">
                  <div className="mb-2">
                    <label className="form-label small fw-bold text-dark">Pillar #{wIdx + 1} Title</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={item.title}
                      onChange={(e) => handleWhyChooseChange(wIdx, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label small fw-bold text-dark">Statement</label>
                    <textarea
                      rows={2}
                      className="form-control form-control-sm"
                      value={item.description}
                      onChange={(e) => handleWhyChooseChange(wIdx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Footer */}
        <div className="card p-4 border rounded-4 bg-white shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
          <h5 className="fw-bold text-dark mb-3">Footer Tagline & Disclaimers</h5>

          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-bold text-dark">Footer Tagline</label>
              <input
                type="text"
                className="form-control"
                value={content.footer?.tagline || ''}
                onChange={(e) => handleFooterChange('tagline', e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label small fw-bold text-dark">Footer Demo Disclaimer</label>
              <textarea
                rows={2}
                className="form-control"
                value={content.footer?.disclaimer || ''}
                onChange={(e) => handleFooterChange('disclaimer', e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
