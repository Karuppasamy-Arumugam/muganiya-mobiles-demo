import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { saveImageBlob } from '../../services/indexedDbService';
import { MOBILE_BRANDS } from '../../services/seedData';

export default function AdminProductEditor() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { db, addProduct, updateProduct } = useData();

  const categories = db.categories || [];
  const activeOffers = (db.offers || []).filter((o) => o.status === 'active');

  const [activeTab, setActiveTab] = useState('basic');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    brand: 'Samsung',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: '',
    description: '',
    coverImage: '',
    images: [],
    colors: [{ name: 'Black', hex: '#1C1C1E' }],
    ramOptions: ['8GB'],
    storageOptions: ['128GB', '256GB'],
    variants: [],
    originalPrice: 29999,
    sellingPrice: 24999,
    stockStatus: 'In Stock',
    badges: [],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'phone',
    specifications: {
      cpu: '',
      frontCamera: '',
      rearCamera: '',
      display: '',
      batteryCapacity: '',
      chargingSpeed: '',
      operatingSystem: '',
      warranty: '1 Year Brand Warranty'
    },
    highlights: ['']
  });

  // Load existing product if edit mode
  useEffect(() => {
    if (isEditMode) {
      const existing = (db.products || []).find((p) => p.id === id);
      if (existing) {
        setFormData({
          ...existing,
          colors: existing.colors || [],
          ramOptions: existing.ramOptions || [],
          storageOptions: existing.storageOptions || [],
          variants: existing.variants || [],
          images: existing.images || (existing.coverImage ? [existing.coverImage] : []),
          highlights: existing.highlights && existing.highlights.length > 0 ? existing.highlights : [''],
          specifications: existing.specifications || {}
        });
      }
    }
  }, [id, isEditMode, db.products]);

  // Handle Category Change
  const handleCategoryChange = (e) => {
    const selectedCat = categories.find((c) => c.name === e.target.value);
    const catSlug = selectedCat ? selectedCat.slug : 'mobiles';
    const specsType =
      catSlug === 'mobiles'
        ? 'phone'
        : catSlug === 'tvs'
        ? 'tv'
        : catSlug === 'audio'
        ? 'audio'
        : catSlug === 'cooling-appliances'
        ? 'cooling'
        : catSlug === 'kitchen-appliances'
        ? 'appliance'
        : catSlug === 'sim-cards'
        ? 'sim'
        : 'accessory';

    setFormData((prev) => ({
      ...prev,
      category: e.target.value,
      categorySlug: catSlug,
      specsType
    }));
  };

  // Image Upload via IndexedDB
  const handleImageFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      const imageId = `img-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, '')}`;
      const dataUrl = await saveImageBlob(imageId, file);
      if (dataUrl) {
        setFormData((prev) => ({
          ...prev,
          coverImage: prev.coverImage || dataUrl,
          images: [...prev.images, dataUrl]
        }));
      }
    }
  };

  // Add Custom Image URL
  const [newImageUrl, setNewImageUrl] = useState('');
  const handleAddImageUrl = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        coverImage: prev.coverImage || newImageUrl.trim(),
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  // Colours Management
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');

  const handleAddColor = () => {
    if (newColorName.trim()) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, { name: newColorName.trim(), hex: newColorHex }]
      }));
      setNewColorName('');
      setNewColorHex('#000000');
    }
  };

  const handleRemoveColor = (idx) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== idx)
    }));
  };

  // Generate / Regenerate Variant Combinations
  const handleGenerateVariants = () => {
    const colors = formData.colors.length > 0 ? formData.colors : [{ name: 'Standard', hex: '#000000' }];
    const rams = formData.ramOptions.length > 0 ? formData.ramOptions : [''];
    const storages = formData.storageOptions.length > 0 ? formData.storageOptions : [''];

    const combinations = [];
    colors.forEach((c) => {
      rams.forEach((r) => {
        storages.forEach((s) => {
          combinations.push({
            color: c.name,
            ram: r,
            storage: s,
            sellingPrice: formData.sellingPrice,
            originalPrice: formData.originalPrice,
            stockStatus: 'In Stock',
            sku: `${formData.model || 'MOD'}-${c.name.substring(0, 3).toUpperCase()}-${s || 'STD'}`
          });
        });
      });
    });

    setFormData((prev) => ({ ...prev, variants: combinations }));
  };

  // Highlights Management
  const handleHighlightChange = (idx, val) => {
    const updated = [...formData.highlights];
    updated[idx] = val;
    setFormData((prev) => ({ ...prev, highlights: updated }));
  };

  const handleAddHighlight = () => {
    setFormData((prev) => ({ ...prev, highlights: [...prev.highlights, ''] }));
  };

  const handleRemoveHighlight = (idx) => {
    setFormData((prev) => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== idx) }));
  };

  // Save / Update Handler
  const handleSaveProduct = (targetStatus = formData.status) => {
    const productPayload = {
      ...formData,
      status: targetStatus,
      sellingPrice: Number(formData.sellingPrice),
      originalPrice: Number(formData.originalPrice),
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    if (isEditMode) {
      updateProduct(id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      navigate('/admin/products');
    }, 800);
  };

  return (
    <div className="admin-product-editor pb-5">
      {/* Top Breadcrumb & Save Action Bar */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4 bg-white p-3 rounded-3 border shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
        <div className="d-flex align-items-center gap-2">
          <Link to="/admin/products" className="btn btn-light btn-sm p-2 rounded-circle" title="Back to products list">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h3 className="fw-bold text-dark mb-0 fs-5">
              {isEditMode ? `Edit: ${formData.name || 'Product'}` : 'Add New Product'}
            </h3>
            <small className="text-muted">
              {isEditMode ? `ID: ${id}` : 'Create a new catalogue item with custom variants'}
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => handleSaveProduct('draft')}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="btn btn-brand-primary btn-sm d-flex align-items-center gap-1"
            onClick={() => handleSaveProduct('published')}
          >
            <Save size={16} />
            <span>{isEditMode ? 'Update & Publish' : 'Publish Product'}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 shadow-sm mb-4">
          <CheckCircle2 size={20} />
          <span>Product successfully saved and synchronized to public website! Redirecting...</span>
        </div>
      )}

      {/* 8-Tab Navigation Bar */}
      <div className="card border rounded-4 bg-white shadow-sm overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
        <div className="border-bottom bg-light px-3 pt-2">
          <ul className="nav nav-tabs border-0 flex-nowrap overflow-x-auto" style={{ whiteSpace: 'nowrap' }}>
            {[
              { id: 'basic', label: '1. Basic Details' },
              { id: 'images', label: '2. Images' },
              { id: 'variants', label: '3. Colours & Variants' },
              { id: 'pricing', label: '4. Pricing & Stock' },
              { id: 'specs', label: '5. Specifications' },
              { id: 'highlights', label: '6. What Makes It Special' },
              { id: 'offers', label: '7. Offers' },
              { id: 'visibility', label: '8. Visibility' }
            ].map((tab) => (
              <li key={tab.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-link border-0 fw-semibold px-3 py-2 ${
                    activeTab === tab.id ? 'active text-danger border-bottom border-danger border-3 bg-white' : 'text-muted'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          {/* TAB 1: BASIC DETAILS */}
          {activeTab === 'basic' && (
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label small fw-bold text-dark">Product Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Samsung Galaxy S24 5G"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label small fw-bold text-dark">Model Code / Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. SM-S921B"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label small fw-bold text-dark">Brand *</label>
                <select
                  className="form-select"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                >
                  {MOBILE_BRANDS.filter((b) => b !== 'All Brands').map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                  <option value="Symphony">Symphony</option>
                  <option value="Crompton">Crompton</option>
                  <option value="Prestige">Prestige</option>
                  <option value="Fabiano">Fabiano</option>
                  <option value="Pigeon">Pigeon</option>
                  <option value="Ultra">Ultra</option>
                  <option value="Philips">Philips</option>
                  <option value="Havells">Havells</option>
                  <option value="Jio">Jio</option>
                  <option value="Airtel">Airtel</option>
                  <option value="Vi">Vi</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label small fw-bold text-dark">Category *</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={handleCategoryChange}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold text-dark">Short Tagline</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Galaxy AI is here - Flagship Compact Performance"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold text-dark">Full Description</label>
                <textarea
                  rows={4}
                  className="form-control"
                  placeholder="Detailed description of features, display, battery, and camera..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* TAB 2: IMAGES */}
          {activeTab === 'images' && (
            <div>
              <h6 className="fw-bold mb-3">Product Photos & Cover Image</h6>

              {/* Upload Input via IndexedDB */}
              <div className="p-4 border rounded-3 bg-light text-center mb-4">
                <Upload size={32} className="text-danger mb-2" />
                <h6 className="fw-bold mb-1">Upload Local Image Files</h6>
                <p className="text-muted small mb-3">
                  Images are stored in browser <strong>IndexedDB</strong>, preserving quality without filling localStorage limits.
                </p>
                <label className="btn btn-brand-primary btn-sm px-4 cursor-pointer">
                  <span>Browse Photos from Computer</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageFileUpload}
                  />
                </label>
              </div>

              {/* Add Remote URL */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-dark">Or Add Image Web URL</label>
                <div className="input-group">
                  <input
                    type="url"
                    className="form-control form-control-sm"
                    placeholder="https://example.com/phone.jpg"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleAddImageUrl}>
                    Add URL
                  </button>
                </div>
              </div>

              {/* Uploaded / Configured Gallery Thumbnails */}
              <div className="row g-3">
                {formData.images.map((img, i) => (
                  <div key={i} className="col-6 col-sm-4 col-md-3">
                    <div className="card p-2 border position-relative">
                      <img
                        src={img}
                        alt={`Photo ${i + 1}`}
                        style={{ width: '100%', height: '140px', objectFit: 'contain' }}
                      />
                      <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
                        <button
                          type="button"
                          className={`btn btn-sm p-1 ${formData.coverImage === img ? 'btn-danger' : 'btn-light'}`}
                          style={{ fontSize: '0.7rem' }}
                          onClick={() => setFormData({ ...formData, coverImage: img })}
                        >
                          {formData.coverImage === img ? 'Cover Photo' : 'Make Cover'}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm p-1 border-0"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, idx) => idx !== i),
                              coverImage: prev.coverImage === img ? prev.images[0] || '' : prev.coverImage
                            }))
                          }
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COLOURS & VARIANTS */}
          {activeTab === 'variants' && (
            <div>
              <h6 className="fw-bold mb-3">Colours & Variant Matrix</h6>

              {/* Colours Editor */}
              <div className="card p-3 border mb-4 bg-light">
                <h6 className="fw-bold small mb-2 text-dark">Product Colours (Named Hex Codes)</h6>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {formData.colors.map((c, i) => (
                    <div key={i} className="d-inline-flex align-items-center gap-2 p-1 px-3 bg-white border rounded-pill small">
                      <span className="rounded-circle border" style={{ width: '14px', height: '14px', backgroundColor: c.hex }} />
                      <span className="fw-semibold">{c.name}</span>
                      <button
                        type="button"
                        className="btn-close btn-sm p-0 ms-1"
                        style={{ width: '8px', height: '8px' }}
                        onClick={() => handleRemoveColor(i)}
                      />
                    </div>
                  ))}
                </div>

                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Colour Name (e.g. Onyx Black)"
                    style={{ width: '200px' }}
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                  />
                  <input
                    type="color"
                    className="form-control form-control-color form-control-sm"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    title="Choose hex colour"
                  />
                  <button type="button" className="btn btn-brand-primary btn-sm px-3" onClick={handleAddColor}>
                    Add Colour
                  </button>
                </div>
              </div>

              {/* RAM and Storage Arrays */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold text-dark">RAM Sizes (Comma-separated)</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. 6GB, 8GB, 12GB"
                    value={formData.ramOptions?.join(', ')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ramOptions: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })
                    }
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold text-dark">Storage Sizes (Comma-separated)</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. 128GB, 256GB, 512GB"
                    value={formData.storageOptions?.join(', ')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        storageOptions: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })
                    }
                  />
                </div>
              </div>

              {/* Generate Combinations Action */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="fw-bold mb-0">Valid Variant Combinations</h6>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1"
                  onClick={handleGenerateVariants}
                >
                  <Sliders size={14} />
                  <span>Generate Matrix from Colors & Storage</span>
                </button>
              </div>

              {/* Variant Combinations Table */}
              {formData.variants && formData.variants.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-sm align-middle small">
                    <thead className="table-light">
                      <tr>
                        <th>Colour</th>
                        <th>RAM / Storage</th>
                        <th>Selling Price (₹)</th>
                        <th>Original Price (₹)</th>
                        <th>Stock Status</th>
                        <th>SKU</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.variants.map((v, idx) => (
                        <tr key={idx}>
                          <td className="fw-bold">{v.color}</td>
                          <td>{v.ram ? `${v.ram} + ` : ''}{v.storage || 'Standard'}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={v.sellingPrice}
                              onChange={(e) => {
                                const updated = [...formData.variants];
                                updated[idx].sellingPrice = Number(e.target.value);
                                setFormData({ ...formData, variants: updated });
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={v.originalPrice}
                              onChange={(e) => {
                                const updated = [...formData.variants];
                                updated[idx].originalPrice = Number(e.target.value);
                                setFormData({ ...formData, variants: updated });
                              }}
                            />
                          </td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={v.stockStatus}
                              onChange={(e) => {
                                const updated = [...formData.variants];
                                updated[idx].stockStatus = e.target.value;
                                setFormData({ ...formData, variants: updated });
                              }}
                            >
                              <option value="In Stock">In Stock</option>
                              <option value="Out of Stock">Out of Stock</option>
                            </select>
                          </td>
                          <td className="text-muted">{v.sku}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-light border small text-muted">
                  No variant matrix generated yet. Click "Generate Matrix" above to automatically create pricing per colour and storage combination.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PRICING & AVAILABILITY */}
          {activeTab === 'pricing' && (
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label small fw-bold text-dark">Base Selling Price (₹) *</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.sellingPrice}
                  onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label small fw-bold text-dark">Base Original Price (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Crossed out if higher than selling price"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label small fw-bold text-dark">Default Stock Availability</label>
                <select
                  className="form-select"
                  value={formData.stockStatus}
                  onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                >
                  <option value="In Stock">In Stock (Available for Store Pickup)</option>
                  <option value="Out of Stock">Out of Stock (Awaiting Consignment)</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB 5: SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <div>
              <h6 className="fw-bold mb-3">
                Technical Specifications ({formData.specsType?.toUpperCase() || 'GENERAL'})
              </h6>

              {formData.specsType === 'phone' ? (
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-dark">Display</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.specifications?.display || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, display: e.target.value }
                        })
                      }
                      placeholder="e.g. 6.7 inch 120Hz AMOLED"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-dark">Processor / CPU</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.specifications?.cpu || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, cpu: e.target.value }
                        })
                      }
                      placeholder="e.g. Snapdragon 8 Gen 3"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-dark">Rear Camera</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.specifications?.rearCamera || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, rearCamera: e.target.value }
                        })
                      }
                      placeholder="e.g. 50MP OIS + 12MP Ultra-wide"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-dark">Front Camera</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.specifications?.frontCamera || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, frontCamera: e.target.value }
                        })
                      }
                      placeholder="e.g. 32MP Eye-AF Selfie"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-dark">Battery & Charging</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.specifications?.batteryCapacity || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, batteryCapacity: e.target.value }
                        })
                      }
                      placeholder="e.g. 5000 mAh, 80W Fast Charge"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-dark">Operating System</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.specifications?.operatingSystem || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, operatingSystem: e.target.value }
                        })
                      }
                      placeholder="e.g. Android 14"
                    />
                  </div>
                </div>
              ) : (
                <div className="row g-3">
                  {Object.entries(formData.specifications || {}).map(([k, val], i) => (
                    <div key={i} className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark text-capitalize">
                        {k.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={val}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specifications: { ...formData.specifications, [k]: e.target.value }
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: WHAT MAKES IT SPECIAL */}
          {activeTab === 'highlights' && (
            <div>
              <h6 className="fw-bold mb-3">Concise Highlights & Bullet Points</h6>
              <div className="d-flex flex-column gap-2 mb-3">
                {formData.highlights.map((hl, i) => (
                  <div key={i} className="d-flex align-items-center gap-2">
                    <span className="text-danger fw-bold">★</span>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Flagship ZEISS portrait camera with optical image stabilization"
                      value={hl}
                      onChange={(e) => handleHighlightChange(i, e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm p-1"
                      onClick={() => handleRemoveHighlight(i)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
                onClick={handleAddHighlight}
              >
                <Plus size={14} /> Add Highlight Bullet
              </button>
            </div>
          )}

          {/* TAB 7: OFFERS */}
          {activeTab === 'offers' && (
            <div>
              <h6 className="fw-bold mb-3">Attach Store Offers & Financing</h6>
              <p className="text-muted small mb-3">
                Check eligible promotions that should display on this product's page.
              </p>
              <div className="d-flex flex-column gap-2">
                {activeOffers.map((offer) => {
                  const isChecked = formData.offers?.includes(offer.id);
                  return (
                    <label key={offer.id} className="card p-3 border cursor-pointer d-flex flex-row align-items-center gap-3">
                      <input
                        type="checkbox"
                        className="form-check-input mt-0"
                        checked={isChecked}
                        onChange={() => {
                          const updated = isChecked
                            ? formData.offers.filter((oid) => oid !== offer.id)
                            : [...(formData.offers || []), offer.id];
                          setFormData({ ...formData, offers: updated });
                        }}
                      />
                      <div>
                        <div className="fw-bold text-dark small">{offer.title}</div>
                        <span className="badge bg-light text-dark border small">{offer.type}</span>
                        <small className="text-muted ms-2">{offer.provider}</small>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 8: VISIBILITY & BADGES */}
          {activeTab === 'visibility' && (
            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div className="card p-4 border bg-light rounded-3">
                  <h6 className="fw-bold mb-3 text-dark">Publishing Status</h6>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="statusSwitch"
                      checked={formData.status === 'published'}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })
                      }
                    />
                    <label className="form-check-label fw-semibold" htmlFor="statusSwitch">
                      {formData.status === 'published' ? 'Published (Live on Website)' : 'Draft (Hidden from Store)'}
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="card p-4 border bg-light rounded-3">
                  <h6 className="fw-bold mb-3 text-dark">Featured Badges</h6>

                  <div className="form-check form-switch mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="latestLaunchSwitch"
                      checked={formData.isLatestLaunch}
                      onChange={(e) => setFormData({ ...formData, isLatestLaunch: e.target.checked })}
                    />
                    <label className="form-check-label small fw-semibold" htmlFor="latestLaunchSwitch">
                      Mark as Latest Launch (Shows on Home & Filter)
                    </label>
                  </div>

                  <div className="form-check form-switch mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="bestSellerSwitch"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    />
                    <label className="form-check-label small fw-semibold" htmlFor="bestSellerSwitch">
                      Mark as Best Seller (Shows in Best Sellers grid)
                    </label>
                  </div>

                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="featuredSwitch"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                    <label className="form-check-label small fw-semibold" htmlFor="featuredSwitch">
                      Featured Item (Boosts search ranking)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
