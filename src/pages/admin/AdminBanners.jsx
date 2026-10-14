import React, { useState } from 'react';
import { Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { supabase } from '../../services/supabaseClient';

const emptyBanner = {
  title: '',
  subtitle: '',
  badge: 'Special Promo',
  ctaText: 'Explore Now',
  link: '/mobiles',
  imageUrl: '',
  imagePath: '',
  active: true,
  order: 1
};

export default function AdminBanners() {
  const { db, updateBanners } = useData();
  const banners = db.banners || [];

  const [editingBanner, setEditingBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState(emptyBanner);

  const bannerDestinations = [
    { label: 'Home', value: '/' },
    { label: 'Mobiles', value: '/mobiles' },
    { label: 'All Categories', value: '/categories' },
    { label: 'About Us', value: '/about' },
    { label: 'Contact Us', value: '/contact' },
    { label: 'Privacy Policy', value: '/privacy' },
    ...(db.products || [])
      .filter((product) => product.slug)
      .map((product) => ({
        label: `Product: ${product.name}`,
        value: `/products/${product.slug}`
      }))
  ];

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setErrorMessage('');
    setFormData({
      ...emptyBanner,
      badge: 'New Arrival',
      ctaText: 'Shop Now',
      imageUrl:
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1400&auto=format&fit=crop&q=85',
      order: banners.length
    });
    setShowModal(true);
  };

  const handleOpenEdit = (banner) => {
    setEditingBanner(banner);
    setErrorMessage('');
    setFormData({ ...emptyBanner, ...banner });
    setShowModal(true);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!supabase) {
      setErrorMessage('Supabase is not configured.');
      return;
    }

    setUploadingImage(true);
    setErrorMessage('');

    try {
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const storagePath = `${crypto.randomUUID()}-${safeFileName}`;

      const { error } = await supabase.storage
        .from('banner-images')
        .upload(storagePath, file, {
          upsert: false,
          contentType: file.type || `image/${extension}`
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from('banner-images')
        .getPublicUrl(storagePath);

      setFormData((current) => ({
        ...current,
        imagePath: storagePath,
        imageUrl: data.publicUrl
      }));
    } catch (error) {
      console.error('Could not upload banner image:', error);
      setErrorMessage(error.message || 'Could not upload the banner image.');
    } finally {
      setUploadingImage(false);
      event.target.value = '';
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setErrorMessage('');

    try {
      const bannerToSave = {
        ...formData,
        title: formData.title.trim(),
        order: editingBanner
          ? formData.order
          : banners.length
      };

      const updatedBanners = editingBanner
        ? banners.map((banner) =>
            banner.id === editingBanner.id ? bannerToSave : banner
          )
        : [...banners, bannerToSave];

      await updateBanners(updatedBanners);
      setShowModal(false);
      setEditingBanner(null);
    } catch (error) {
      console.error('Could not save banner:', error);
      setErrorMessage(error.message || 'Could not save the banner.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this promotional hero banner?')) return;

    setErrorMessage('');
    try {
      await updateBanners(banners.filter((banner) => banner.id !== id));
    } catch (error) {
      console.error('Could not delete banner:', error);
      setErrorMessage(error.message || 'Could not delete the banner.');
    }
  };

  const toggleActive = async (bannerToToggle) => {
    setErrorMessage('');

    const updatedBanners = banners.map((banner) =>
      banner.id === bannerToToggle.id
        ? { ...banner, active: !banner.active }
        : banner
    );

    try {
      await updateBanners(updatedBanners);
    } catch (error) {
      console.error('Could not update banner status:', error);
      setErrorMessage(error.message || 'Could not update banner status.');
    }
  };

  const moveOrder = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= banners.length) return;

    const reordered = [...banners];
    [reordered[index], reordered[targetIndex]] = [
      reordered[targetIndex],
      reordered[index]
    ];

    setErrorMessage('');
    try {
      await updateBanners(reordered);
    } catch (error) {
      console.error('Could not reorder banners:', error);
      setErrorMessage(error.message || 'Could not reorder banners.');
    }
  };

  const hasCurrentDestination = bannerDestinations.some(
    (destination) => destination.value === formData.link
  );

  return (
    <div className="admin-banners pb-5">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">
            Hero Carousel Banners
          </h2>
          <p className="text-muted small mb-0">
            Manage promotional slideshow banners shown on the store homepage.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-brand-primary btn-sm d-inline-flex align-items-center gap-1"
          onClick={handleOpenAdd}
        >
          <Plus size={16} />
          <span>Add Hero Banner</span>
        </button>
      </div>

      <div className="row g-4">
        {banners.map((banner, index) => (
          <div key={banner.id} className="col-12 col-lg-6">
            <div
              className="card h-100 border rounded-4 bg-white shadow-sm overflow-hidden d-flex flex-column"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div
                style={{
                  height: '180px',
                  backgroundImage: banner.imageUrl
                    ? `url("${banner.imageUrl}")`
                    : 'none',
                  backgroundColor: '#f4f4f4',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <div className="position-absolute top-0 start-0 m-2">
                  <span className="badge-brand">
                    {banner.badge || 'Banner'}
                  </span>
                </div>

                <div className="position-absolute top-0 end-0 m-2">
                  <button
                    type="button"
                    className={`btn btn-sm py-1 px-2 ${
                      banner.active
                        ? 'btn-success text-white'
                        : 'btn-secondary text-white'
                    }`}
                    onClick={() => toggleActive(banner)}
                  >
                    {banner.active ? 'Active' : 'Hidden'}
                  </button>
                </div>
              </div>

              <div className="p-4 flex-grow-1">
                <h5 className="fw-bold text-dark mb-1">{banner.title}</h5>
                <p className="text-muted small mb-3">{banner.subtitle}</p>
                <div className="text-muted small mb-0">
                  <div>
                    <strong>Destination:</strong>{' '}
                    <code>{banner.link}</code>
                  </div>
                  <div>
                    <strong>Button:</strong> {banner.ctaText}
                  </div>
                </div>
              </div>

              <div className="p-3 border-top bg-light d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-1">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm p-1"
                    disabled={index === 0}
                    onClick={() => moveOrder(index, -1)}
                    title="Move Up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm p-1"
                    disabled={index === banners.length - 1}
                    onClick={() => moveOrder(index, 1)}
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

      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editingBanner ? 'Edit Hero Banner' : 'Create Hero Banner'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                  aria-label="Close"
                />
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label small fw-bold text-dark">
                        Banner Title *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Mega 5G Smartphone Festival"
                        value={formData.title}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            title: event.target.value
                          })
                        }
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold text-dark">
                        Subtitle / Details
                      </label>
                      <textarea
                        rows={2}
                        className="form-control"
                        placeholder="Describe this promotion"
                        value={formData.subtitle}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            subtitle: event.target.value
                          })
                        }
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">
                        Top Badge Text
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Limited Period Deals"
                        value={formData.badge}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            badge: event.target.value
                          })
                        }
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">
                        Button CTA Text
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Explore 5G Phones"
                        value={formData.ctaText}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            ctaText: event.target.value
                          })
                        }
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">
                        Target Page
                      </label>
                      <select
                        className="form-select"
                        value={formData.link || '/mobiles'}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            link: event.target.value
                          })
                        }
                        required
                      >
                        {!hasCurrentDestination && formData.link && (
                          <option value={formData.link}>
                            Current saved page: {formData.link}
                          </option>
                        )}

                        {bannerDestinations.map((destination) => (
                          <option
                            key={destination.value}
                            value={destination.value}
                          >
                            {destination.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">
                        Banner Image URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://..."
                        value={
                          formData.imagePath
                            ? formData.imageUrl
                            : formData.imageUrl
                        }
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            imageUrl: event.target.value,
                            imagePath: ''
                          })
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold text-dark">
                        Or Upload Image File
                      </label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="form-control form-control-sm"
                        onChange={handleImageUpload}
                        disabled={uploadingImage || saving}
                      />
                      {uploadingImage && (
                        <small className="text-muted">
                          Uploading image…
                        </small>
                      )}
                      {formData.imageUrl && (
                        <img
                          src={formData.imageUrl}
                          alt="Banner preview"
                          className="img-fluid rounded mt-2"
                          style={{ maxHeight: '180px' }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowModal(false)}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-brand-primary btn-sm px-4"
                    disabled={saving || uploadingImage}
                  >
                    {saving ? 'Saving…' : 'Save Banner'}
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