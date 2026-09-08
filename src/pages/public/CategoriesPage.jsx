import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, RefreshCw, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ProductCard from '../../components/common/ProductCard';

export default function CategoriesPage() {
  const { db, publishedProducts } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCatSlug = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [sortBy, setSortBy] = useState('featured');
  const [priceMax, setPriceMax] = useState(100000);

  const categories = db.categories || [];

  const handleCategorySelect = (slug) => {
    const nextParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', slug);
    }
    setSearchParams(nextParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      nextParams.set('q', searchQuery.trim());
    } else {
      nextParams.delete('q');
    }
    setSearchParams(nextParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery('');
    setPriceMax(100000);
    setSortBy('featured');
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return publishedProducts
      .filter((product) => {
        // Category Filter
        if (selectedCatSlug !== 'all' && product.categorySlug !== selectedCatSlug) {
          return false;
        }

        // Search Query Filter
        if (queryParam) {
          const q = queryParam.toLowerCase();
          const matchName = product.name?.toLowerCase().includes(q);
          const matchBrand = product.brand?.toLowerCase().includes(q);
          const matchCategory = product.category?.toLowerCase().includes(q);
          const matchModel = product.model?.toLowerCase().includes(q);
          const matchTagline = product.tagline?.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCategory && !matchModel && !matchTagline) {
            return false;
          }
        }

        // Price Filter
        if (product.sellingPrice > priceMax) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.sellingPrice - b.sellingPrice;
        if (sortBy === 'price-desc') return b.sellingPrice - a.sellingPrice;
        if (sortBy === 'newest') return (b.isLatestLaunch ? 1 : 0) - (a.isLatestLaunch ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [publishedProducts, selectedCatSlug, queryParam, priceMax, sortBy]);

  const activeCatObj = categories.find((c) => c.slug === selectedCatSlug);

  return (
    <div className="categories-page pb-5">
      {/* Header Banner */}
      <div className="bg-white border-bottom py-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small mb-2">
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item active text-dark" aria-current="page">
                {activeCatObj ? activeCatObj.name : 'All Categories'}
              </li>
            </ol>
          </nav>
          <div className="d-flex flex-column flex-md-row justify-content-between md-align-items-center gap-3">
            <div>
              <h1 className="fw-bold mb-1 fs-3 text-dark">
                {queryParam ? `Search Results for "${queryParam}"` : activeCatObj ? activeCatObj.name : 'All Product Categories'}
              </h1>
              <p className="text-muted small mb-0">
                Browse our complete selection of mobile phones, smart accessories, home electronics, appliances, and SIM cards.
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge-blush">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product Found' : 'Products Found'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="bg-white border-bottom py-3 sticky-top" style={{ zIndex: 1020, top: '65px' }}>
        <div className="container">
          <div className="d-flex align-items-center gap-2 overflow-x-auto pb-1" style={{ whiteSpace: 'nowrap' }}>
            <button
              type="button"
              className={`filter-pill ${selectedCatSlug === 'all' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('all')}
            >
              All Items ({publishedProducts.length})
            </button>
            {categories.map((cat) => {
              const count = publishedProducts.filter((p) => p.categorySlug === cat.slug).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`filter-pill ${selectedCatSlug === cat.slug ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat.slug)}
                >
                  {cat.name} {count > 0 ? `(${count})` : ''}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="container py-4">
        <div className="card p-3 border mb-4 bg-white" style={{ borderColor: 'var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-12 col-md-5">
              <form onSubmit={handleSearchSubmit} className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by keyword, model, brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderColor: 'var(--border-color)' }}
                />
                <button className="btn btn-brand-primary" type="submit">
                  <Search size={16} />
                </button>
              </form>
            </div>

            {/* Price Filter Slider */}
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="catPrice" className="small text-muted fw-semibold text-nowrap">
                  Max: <span className="text-danger fw-bold">₹{priceMax.toLocaleString('en-IN')}</span>
                </label>
                <input
                  id="catPrice"
                  type="range"
                  className="form-range"
                  min="200"
                  max="100000"
                  step="1000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Sort Dropdown & Reset */}
            <div className="col-12 col-md-3 d-flex align-items-center justify-content-md-end gap-2">
              <select
                className="form-select form-select-sm"
                style={{ width: '150px', borderColor: 'var(--border-color)' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              {(selectedCatSlug !== 'all' || queryParam || priceMax < 100000) && (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm p-1 px-2 d-flex align-items-center gap-1"
                  onClick={clearFilters}
                  title="Clear all filters"
                >
                  <X size={14} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="card p-5 text-center border-dashed border-2" style={{ borderColor: 'var(--border-color)' }}>
            <div className="p-3 rounded-circle bg-light d-inline-block mx-auto mb-3">
              <RefreshCw size={36} className="text-muted" />
            </div>
            <h5 className="fw-bold mb-1">No products found</h5>
            <p className="text-muted small mb-4" style={{ maxWidth: '360px', margin: '0 auto' }}>
              We couldn't find any items matching your selected category and price criteria. Try resetting your search filters.
            </p>
            <div>
              <button type="button" className="btn btn-brand-primary btn-sm px-4 py-2" onClick={clearFilters}>
                View All Catalogue Items
              </button>
            </div>
          </div>
        ) : (
          <div className="row g-3 g-md-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
