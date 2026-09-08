import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, RefreshCw, Phone, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ProductCard from '../../components/common/ProductCard';
import { MOBILE_BRANDS } from '../../services/seedData';

export default function MobilesPage() {
  const { publishedProducts, db } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter state
  const selectedBrand = searchParams.get('brand') || 'All Brands';
  const filterParam = searchParams.get('filter') || ''; // 'latest' or 'bestseller'
  const [selectedRams, setSelectedRams] = useState([]);
  const [selectedStorages, setSelectedStorages] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterDrawerOpen, setMobileFilterDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const contact = db.contactSettings || {};
  const whyChooseUs = db.websiteContent?.whyChooseUs || [];

  // Mobiles only
  const allMobiles = useMemo(() => {
    return publishedProducts.filter((p) => p.categorySlug === 'mobiles');
  }, [publishedProducts]);

  // Brand Pills
  const brandsList = useMemo(() => {
    return MOBILE_BRANDS;
  }, []);

  const handleBrandSelect = (brand) => {
    const nextParams = new URLSearchParams(searchParams);
    if (brand === 'All Brands') {
      nextParams.delete('brand');
    } else {
      nextParams.set('brand', brand);
    }
    setSearchParams(nextParams);
    setVisibleCount(8);
  };

  const handleRamToggle = (ram) => {
    setSelectedRams((prev) =>
      prev.includes(ram) ? prev.filter((r) => r !== ram) : [...prev, ram]
    );
    setVisibleCount(8);
  };

  const handleStorageToggle = (storage) => {
    setSelectedStorages((prev) =>
      prev.includes(storage) ? prev.filter((s) => s !== storage) : [...prev, storage]
    );
    setVisibleCount(8);
  };

  const clearAllFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('brand');
    nextParams.delete('filter');
    setSearchParams(nextParams);
    setSelectedRams([]);
    setSelectedStorages([]);
    setMaxPrice(100000);
    setSortBy('featured');
    setVisibleCount(8);
  };

  const isFiltered =
    selectedBrand !== 'All Brands' ||
    selectedRams.length > 0 ||
    selectedStorages.length > 0 ||
    maxPrice < 100000 ||
    filterParam !== '';

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allMobiles
      .filter((product) => {
        // Brand Filter
        if (selectedBrand !== 'All Brands' && product.brand !== selectedBrand) {
          return false;
        }

        // Quick query filter
        if (filterParam === 'latest' && !product.isLatestLaunch) return false;
        if (filterParam === 'bestseller' && !product.isBestSeller) return false;

        // Price Filter
        if (product.sellingPrice > maxPrice) {
          return false;
        }

        // RAM Filter
        if (selectedRams.length > 0) {
          const hasRam = product.ramOptions?.some((r) => selectedRams.includes(r));
          if (!hasRam) return false;
        }

        // Storage Filter
        if (selectedStorages.length > 0) {
          const hasStorage = product.storageOptions?.some((s) => selectedStorages.includes(s));
          if (!hasStorage) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.sellingPrice - b.sellingPrice;
        if (sortBy === 'price-desc') return b.sellingPrice - a.sellingPrice;
        if (sortBy === 'newest') return (b.isLatestLaunch ? 1 : 0) - (a.isLatestLaunch ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [allMobiles, selectedBrand, filterParam, maxPrice, selectedRams, selectedStorages, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="mobiles-page pb-5">
      {/* Page Header */}
      <div className="bg-white border-bottom py-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small mb-2">
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item active text-dark" aria-current="page">
                Mobiles & Smartphones
              </li>
            </ol>
          </nav>
          <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-2">
            <div>
              <h1 className="fw-bold mb-1 fs-3 text-dark">Mobile Phones & 5G Smartphones</h1>
              <p className="text-muted small mb-0">
                Explore genuine phones across all brands, price segments, and memory configurations with local in-store warranty.
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge-blush">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'phone' : 'phones'} available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Horizontal Brand Filter Pills */}
      <div className="bg-white border-bottom py-3 sticky-top" style={{ zIndex: 1020, top: '65px' }}>
        <div className="container">
          <div className="d-flex align-items-center gap-2 overflow-x-auto pb-1" style={{ whiteSpace: 'nowrap' }}>
            {brandsList.map((brand) => (
              <button
                key={brand}
                type="button"
                className={`filter-pill ${selectedBrand === brand ? 'active' : ''}`}
                onClick={() => handleBrandSelect(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Listing Layout */}
      <div className="container py-4">
        {/* Mobile Filter Toggle & Sort Header */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4 bg-white p-3 rounded border" style={{ borderColor: 'var(--border-color)' }}>
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm d-lg-none d-inline-flex align-items-center gap-1"
              onClick={() => setMobileFilterDrawerOpen(true)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters {isFiltered && '•'}</span>
            </button>

            {isFiltered && (
              <button
                type="button"
                className="btn btn-link btn-sm text-danger text-decoration-none d-flex align-items-center gap-1"
                onClick={clearAllFilters}
              >
                <X size={14} />
                <span>Clear Filters</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="d-flex align-items-center gap-2 ms-auto">
            <label htmlFor="sortBy" className="small text-muted fw-semibold text-nowrap">Sort By:</label>
            <select
              id="sortBy"
              className="form-select form-select-sm"
              style={{ width: '160px', borderColor: 'var(--border-color)' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="row g-4">
          {/* Desktop Filter Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="card p-3 border sticky-top" style={{ top: '150px', borderColor: 'var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                <h6 className="fw-bold mb-0">Refine Search</h6>
                {isFiltered && (
                  <button type="button" className="btn btn-link btn-sm text-danger p-0 text-decoration-none" onClick={clearAllFilters}>
                    Reset
                  </button>
                )}
              </div>

              {/* Price Filter */}
              <div className="mb-4">
                <label className="fw-bold small text-dark d-flex justify-content-between mb-2">
                  <span>Max Budget</span>
                  <span className="text-danger fw-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="2000"
                  max="100000"
                  step="2000"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setVisibleCount(8);
                  }}
                />
                <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.72rem' }}>
                  <span>₹2,000</span>
                  <span>₹50,000</span>
                  <span>₹1,00,000+</span>
                </div>
              </div>

              {/* RAM Filter */}
              <div className="mb-4">
                <h6 className="fw-bold small text-dark mb-2">RAM Size</h6>
                <div className="d-flex flex-column gap-1">
                  {['4GB', '6GB', '8GB', '12GB'].map((ram) => (
                    <label key={ram} className="d-flex align-items-center gap-2 small cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedRams.includes(ram)}
                        onChange={() => handleRamToggle(ram)}
                      />
                      <span>{ram} RAM</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Storage Filter */}
              <div className="mb-3">
                <h6 className="fw-bold small text-dark mb-2">Internal Storage</h6>
                <div className="d-flex flex-column gap-1">
                  {['64GB', '128GB', '256GB', '512GB'].map((storage) => (
                    <label key={storage} className="d-flex align-items-center gap-2 small cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedStorages.includes(storage)}
                        onChange={() => handleStorageToggle(storage)}
                      />
                      <span>{storage}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Product Grid Area */}
          <div className="col-12 col-lg-9">
            {visibleProducts.length === 0 ? (
              <div className="card p-5 text-center border-dashed border-2" style={{ borderColor: 'var(--border-color)' }}>
                <div className="p-3 rounded-circle bg-light d-inline-block mx-auto mb-3">
                  <RefreshCw size={36} className="text-muted" />
                </div>
                <h5 className="fw-bold mb-1">No mobile phones match your criteria</h5>
                <p className="text-muted small mb-4" style={{ maxWidth: '360px', margin: '0 auto' }}>
                  Try relaxing your price filter, unchecking RAM/storage limits, or selecting "All Brands".
                </p>
                <div>
                  <button type="button" className="btn btn-brand-primary btn-sm px-4 py-2" onClick={clearAllFilters}>
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="row g-3 g-md-4">
                  {visibleProducts.map((product) => (
                    <div key={product.id} className="col-12 col-sm-6 col-md-4">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProducts.length && (
                  <div className="text-center mt-5">
                    <button
                      type="button"
                      className="btn btn-brand-outline px-4 py-2"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                    >
                      Load More Phones ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterDrawerOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070 }}>
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Filter Mobile Phones</h5>
                <button type="button" className="btn-close" onClick={() => setMobileFilterDrawerOpen(false)} />
              </div>
              <div className="modal-body">
                {/* Brand inside Drawer */}
                <div className="mb-4">
                  <h6 className="fw-bold small text-dark mb-2">Select Brand</h6>
                  <select
                    className="form-select form-select-sm"
                    value={selectedBrand}
                    onChange={(e) => handleBrandSelect(e.target.value)}
                  >
                    {brandsList.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <label className="fw-bold small text-dark d-flex justify-content-between mb-2">
                    <span>Max Budget</span>
                    <span className="text-danger fw-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min="2000"
                    max="100000"
                    step="2000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                </div>

                {/* RAM */}
                <div className="mb-4">
                  <h6 className="fw-bold small text-dark mb-2">RAM</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {['4GB', '6GB', '8GB', '12GB'].map((ram) => (
                      <button
                        key={ram}
                        type="button"
                        className={`btn btn-sm ${selectedRams.includes(ram) ? 'btn-danger' : 'btn-outline-secondary'}`}
                        onClick={() => handleRamToggle(ram)}
                      >
                        {ram}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage */}
                <div className="mb-3">
                  <h6 className="fw-bold small text-dark mb-2">Internal Storage</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {['64GB', '128GB', '256GB', '512GB'].map((storage) => (
                      <button
                        key={storage}
                        type="button"
                        className={`btn btn-sm ${selectedStorages.includes(storage) ? 'btn-danger' : 'btn-outline-secondary'}`}
                        onClick={() => handleStorageToggle(storage)}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={clearAllFilters}>
                  Clear All
                </button>
                <button type="button" className="btn btn-brand-primary btn-sm px-4" onClick={() => setMobileFilterDrawerOpen(false)}>
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Why Choose Us (Grounded Statements) */}
      <section className="mt-5 py-5 border-top" style={{ backgroundColor: 'var(--secondary-bg)' }}>
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-4">
            <span className="badge-blush text-uppercase fw-bold mb-1 d-inline-block">The Local Advantage</span>
            <h3 className="fw-bold">Why Buy from Muganiyaa-Mobiles?</h3>
            <p className="text-muted small">
              Grounded, reliable service from an established local electronics retailer.
            </p>
          </div>

          <div className="row g-3 g-md-4">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 p-4 border bg-white rounded-3 shadow-none" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="p-2 rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '42px', height: '42px', color: 'var(--primary-red)' }}>
                    <CheckCircle2 size={22} />
                  </div>
                  <h6 className="fw-bold text-dark mb-2">{item.title}</h6>
                  <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact Us Preview Strip */}
      <section className="py-4 bg-white border-top">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
          <div>
            <h5 className="fw-bold mb-1">Looking for a specific model or colour variant?</h5>
            <p className="text-muted small mb-0">Call our showroom or send a quick WhatsApp message to reserve units for store pickup.</p>
          </div>
          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <a href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`} className="btn btn-brand-primary btn-sm px-3 py-2 d-inline-flex align-items-center gap-1">
              <Phone size={16} />
              <span>{contact.phone || '+91 98765 43210'}</span>
            </a>
            <Link to="/contact" className="btn btn-brand-outline btn-sm px-3 py-2">
              Contact Store
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
