import React, { useState } from 'react';
import { Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { saveImageBlob } from '../../services/indexedDbService';

export default function AdminBanners() {
  const { db, updateBanners } = useData();
  const banners = db.banners || [];

  const [editingBanner, setEditingBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    badge: 'Special Promo',
    ctaText: 'Explore Now',
    link: '/mobiles',
    imageUrl: '',
    active: true,
    order: 1
  });

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setFormData({
      id: `banner-${Date.now()}`,
      title: '',
      subtitle: '',
      badge: 'New Arrival',
      ctaText: 'Shop Now',
      link: '/mobiles',
      imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1400&auto=format&fit=crop&q=85',
      active: true,
      order: banners.length + 1
    });
    setShowModal(true);
  };

  const handleOpenEdit = (b) => {
    setEditingBanner(b);
    setFormData(b);
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgId = `banner-img-${Date.now()}`;
      const dataUrl = await saveImageBlob(imgId, file);
      if (dataUrl) {
        setFormData((prev) => ({ ...prev, imageUrl: dataUrl }));
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let updated = [];
    if (editingBanner) {
      updated = banners.map((b) => (b.id === editingBanner.id ? formData : b));
    } else {
      updated = [...banners, formData];
    }
    updateBanners(updated);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this promotional hero banner?')) {
      updateBanners(banners.filter((b) => b.id !== id));
    }
  };

  const toggleActive = (b) => {
    const updated = banners.map((item) =>
      item.id === b.id ? { ...item, active: !item.active } : item
    );
    updateBanners(updated);
  };

  const moveOrder = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= banners.length) return;
    const reordered = [...banners];
    const temp = reordered[idx];
    reordered[idx] = reordered[targetIdx];
    reordered[targetIdx] = temp;
    updateBanners(reordered);
  };

  return (
    <div className="admin-banners pb-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">Hero Carousel Banners</h2>
          <p className="text-muted small mb-0">
            Manage promotional slideshow banners shown on the store homepage.
          </p>
        </div>

        <button type="button" className="btn btn-brand-primary btn-sm d-inline-flex align-items-center gap-1" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Add Hero Banner</span>
        </button>
      </div>

      <div className="row g-4">
        {banners.map((banner, idx) => (
          <div key={banner.id} className="col-12 col-lg-6">
            <div className="card h-100 border rounded-4 bg-white shadow-sm overflow-hidden d-flex flex-column" style={{ borderColor: 'var(--border-color)' }}>
              {/* Preview Image */}
              <div
                style={{
                  height: '180px',
                  backgroundImage: `url(${banner.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <div className="position-absolute top-0 start-0 m-2">
                  <span className="badge-brand">{banner.badge || 'Banner'}</span>
                </div>
                <div className="position-absolute top-0 end-0 m-2">
                  <button
                    type="button"
                    className={`btn btn-sm py-1 px-2 ${banner.active ? 'btn-success text-white' : 'btn-secondary text-white'}`}
                    onClick={() => toggleActive(banner)}
                  >
                    {banner.active ? 'Active' : 'Hidden'}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-grow-1">
                <h5 className="fw-bold text-dark mb-1">{banner.title}</h5>
                <p className="text-muted small mb-3">{banner.subtitle}</p>
                <div className="text-muted small mb-0">
                  <div><strong>Destination Link:</strong> <code>{banner.link}</code></div>
                  <div><strong>Button CTA:</strong> {banner.ctaText}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-3 border-top bg-light d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-1">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm p-1"
                    disabled={idx === 0}
                    onClick={() => moveOrder(idx, -1)}
                    title="Move Up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm p-1"
                    disabled={idx === banners.length - 1}
                    onClick={() => moveOrder(idx, 1)}
                    title="Move Down"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm px-3"
                    onClick={() => handleOpenEdit(banner)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm px-3"
                    onClick={() => handleDelete(banner.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }} role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editingBanner ? 'Edit Hero Banner' : 'Create Hero Banner'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label small fw-bold text-dark">Banner Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Mega 5G Smartphone Festival"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold text-dark">Subtitle / Details</label>
                      <textarea
                        rows={2}
                        className="form-control"
                        placeholder="e.g. Upgrade to lightning 5G with up to ₹2,000 bank discount and ₹0 Down Payment EMI."
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">Top Badge Text</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Limited Period Deals"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">Button CTA Text</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Explore 5G Phones"
                        value={formData.ctaText}
                        onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">Target Link URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. /mobiles or /categories?category=cooling-appliances"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">Banner Image URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="https://..."
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold text-dark">Or Upload Image File</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control form-control-sm"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-brand-primary btn-sm px-4">
                    Save Banner
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
