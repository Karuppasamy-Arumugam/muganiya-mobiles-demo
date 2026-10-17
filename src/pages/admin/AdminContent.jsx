import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminContent() {
  const { db, updateWebsiteContent } = useData();

  const [content, setContent] = useState(db.websiteContent || {});
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    setContent(db.websiteContent || {});
  }, [db.websiteContent]);

  const handleAboutChange = (field, value) => {
    setContent((previous) => ({
      ...previous,
      aboutUs: {
        ...(previous.aboutUs || {}),
        [field]: value
      }
    }));
  };

  const handlePartnerChange = (index, field, value) => {
    setContent((previous) => {
      const partners = [...(previous.partners || [])];
      partners[index] = { ...partners[index], [field]: value };

      return { ...previous, partners };
    });
  };

  const handleWhyChooseChange = (index, field, value) => {
    setContent((previous) => {
      const whyChooseUs = [...(previous.whyChooseUs || [])];
      whyChooseUs[index] = { ...whyChooseUs[index], [field]: value };

      return { ...previous, whyChooseUs };
    });
  };

  const handleFooterChange = (field, value) => {
    setContent((previous) => ({
      ...previous,
      footer: {
        ...(previous.footer || {}),
        [field]: value
      }
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSavedSuccess(false);
    setSaveError('');
    setIsSaving(true);

    try {
      await updateWebsiteContent(content);
      setSavedSuccess(true);
      window.setTimeout(() => setSavedSuccess(false), 3000);
    } catch (error) {
      console.error('Could not save website content:', error);
      setSaveError(error.message || 'Could not save website content.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-content pb-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">
            Website Editorial Content
          </h2>
          <p className="text-muted small mb-0">
            Edit the About Us story, retail partner statements, Why Choose Us
            cards, and footer copy.
          </p>
        </div>

        <button
          type="submit"
          form="website-content-form"
          className="btn btn-brand-primary btn-sm d-inline-flex align-items-center gap-2"
          disabled={isSaving}
        >
          <Save size={16} />
          <span>{isSaving ? 'Saving...' : 'Save Website Content'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div
          className="alert alert-success d-flex align-items-center gap-2 mb-4 shadow-sm"
          role="status"
        >
          <CheckCircle2 size={18} />
          <span>Website content successfully saved.</span>
        </div>
      )}

      {saveError && (
        <div className="alert alert-danger mb-4" role="alert">
          {saveError}
        </div>
      )}

      <form id="website-content-form" onSubmit={handleSave}>
        {/* About Us */}
        <div
          className="card p-4 border rounded-4 bg-white shadow-sm mb-4"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <h5 className="fw-bold text-dark mb-3">About Us Page Content</h5>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-dark">
                Main Heading
              </label>
              <input
                type="text"
                className="form-control"
                value={content.aboutUs?.title || ''}
                onChange={(event) =>
                  handleAboutChange('title', event.target.value)
                }
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-dark">
                Subtitle
              </label>
              <input
                type="text"
                className="form-control"
                value={content.aboutUs?.subtitle || ''}
                onChange={(event) =>
                  handleAboutChange('subtitle', event.target.value)
                }
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-dark">
                About Description
              </label>
              <textarea
                rows={5}
                className="form-control"
                value={content.aboutUs?.description || ''}
                onChange={(event) =>
                  handleAboutChange('description', event.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Retail Partners */}
        <div
          className="card p-4 border rounded-4 bg-white shadow-sm mb-4"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <h5 className="fw-bold text-dark mb-3">
            Authorized Retail Partnerships
          </h5>

          <div className="row g-3">
            {(content.partners || []).map((partner, index) => (
              <div key={partner.id || index} className="col-12 col-md-4">
                <div className="card p-3 border bg-light h-100">
                  <h6 className="fw-bold text-dark mb-2">
                    Partner #{index + 1}: {partner.name || ''}
                  </h6>

                  <div className="mb-2">
                    <label className="form-label small fw-bold text-dark">
                      Badge Statement
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={partner.badge || ''}
                      onChange={(event) =>
                        handlePartnerChange(
                          index,
                          'badge',
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className="form-label small fw-bold text-dark">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      className="form-control form-control-sm"
                      value={partner.description || ''}
                      onChange={(event) =>
                        handlePartnerChange(
                          index,
                          'description',
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div
          className="card p-4 border rounded-4 bg-white shadow-sm mb-4"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <h5 className="fw-bold text-dark mb-3">Why Choose Us Pillars</h5>

          <div className="row g-3">
            {(content.whyChooseUs || []).map((item, index) => (
              <div key={item.id || index} className="col-12 col-md-6">
                <div className="card p-3 border bg-light h-100">
                  <div className="mb-2">
                    <label className="form-label small fw-bold text-dark">
                      Pillar #{index + 1} Title
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={item.title || ''}
                      onChange={(event) =>
                        handleWhyChooseChange(
                          index,
                          'title',
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className="form-label small fw-bold text-dark">
                      Statement
                    </label>
                    <textarea
                      rows={2}
                      className="form-control form-control-sm"
                      value={item.description || ''}
                      onChange={(event) =>
                        handleWhyChooseChange(
                          index,
                          'description',
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="card p-4 border rounded-4 bg-white shadow-sm"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <h5 className="fw-bold text-dark mb-3">
            Footer Tagline &amp; Disclaimers
          </h5>

          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-bold text-dark">
                Footer Tagline
              </label>
              <input
                type="text"
                className="form-control"
                value={content.footer?.tagline || ''}
                onChange={(event) =>
                  handleFooterChange('tagline', event.target.value)
                }
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-dark">
                Footer Demo Disclaimer
              </label>
              <textarea
                rows={2}
                className="form-control"
                value={content.footer?.disclaimer || ''}
                onChange={(event) =>
                  handleFooterChange('disclaimer', event.target.value)
                }
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}