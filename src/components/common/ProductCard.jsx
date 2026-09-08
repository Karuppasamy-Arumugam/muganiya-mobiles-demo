import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  // Selected color preview (swatch)
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const [imgError, setImgError] = useState(false);

  const handleCardClick = (e) => {
    // If click was inside a button or link or swatch, don't double navigate
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.color-swatch-circle')) {
      return;
    }
    navigate(`/products/${product.slug}`);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.sellingPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100)
    : 0;

  // Primary image
  const displayImage = imgError || !product.coverImage
    ? `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><rect width="100%" height="100%" fill="%23FAF7F7"/><text x="50%" y="48%" font-family="sans-serif" font-size="14" font-weight="700" fill="%23B72E35" text-anchor="middle">${encodeURIComponent(product.brand || 'MUGANIYAA')}</text><text x="50%" y="56%" font-family="sans-serif" font-size="12" fill="%23756D71" text-anchor="middle">${encodeURIComponent(product.name || 'Product Image')}</text></svg>`
    : product.coverImage;

  // Render concise category-specific spec snippet
  const renderSpecSnippet = () => {
    if (product.specsType === 'phone' && product.specifications) {
      const { display, rearCamera, batteryCapacity } = product.specifications;
      return (
        <div className="text-muted small mt-2" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
          {display && <div>• {display.split(',')[0]}</div>}
          {rearCamera && <div>• {rearCamera.split('+')[0].trim()}</div>}
          {batteryCapacity && <div>• {batteryCapacity}</div>}
        </div>
      );
    }
    if (product.specsType === 'tv' && product.specifications) {
      return (
        <div className="text-muted small mt-2" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
          <div>• {product.specifications.screenSize}</div>
          <div>• {product.specifications.resolution}</div>
          <div>• {product.specifications.audioOutput}</div>
        </div>
      );
    }
    if (product.specsType === 'audio' && product.specifications) {
      return (
        <div className="text-muted small mt-2" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
          <div>• {product.specifications.type}</div>
          <div>• {product.specifications.batteryLife || product.specifications.totalPowerOutput}</div>
        </div>
      );
    }
    if (product.specifications?.powerWattage) {
      return (
        <div className="text-muted small mt-2" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
          <div>• Power: {product.specifications.powerWattage}</div>
          <div>• 100% Genuine Retail Warranty</div>
        </div>
      );
    }
    return null;
  };

  const isOutOfStock = product.stockStatus === 'Out of Stock';

  return (
    <div
      className="product-card cursor-pointer"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Wishlist Button */}
      <button
        type="button"
        className={`product-card-wishlist-btn ${inWishlist ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        title={inWishlist ? 'Saved in wishlist' : 'Add to wishlist'}
      >
        <Heart size={18} fill={inWishlist ? '#B72E35' : 'none'} color={inWishlist ? '#B72E35' : '#756D71'} />
      </button>

      {/* Badges Overlay */}
      <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1" style={{ zIndex: 2 }}>
        {product.isLatestLaunch && <span className="badge-brand">Latest Launch</span>}
        {product.isBestSeller && <span className="badge-blush">Best Seller</span>}
        {hasDiscount && discountPercent >= 10 && (
          <span className="badge-offer">{discountPercent}% OFF</span>
        )}
      </div>

      {/* Image Area */}
      <div className="product-card-img-wrapper">
        <img
          src={displayImage}
          alt={`${product.brand} ${product.name}`}
          className="product-card-img"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Brand & Availability */}
      <div className="d-flex align-items-center justify-content-between mb-1">
        <span className="text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.05em', color: 'var(--primary-red)' }}>
          {product.brand}
        </span>
        <span className="d-inline-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
          {isOutOfStock ? (
            <span className="text-secondary d-flex align-items-center gap-1">
              <XCircle size={12} /> Out of Stock
            </span>
          ) : (
            <span className="text-success fw-semibold d-flex align-items-center gap-1">
              <CheckCircle2 size={12} /> In Stock
            </span>
          )}
        </span>
      </div>

      {/* Product Title */}
      <h6 className="fw-bold mb-1 text-dark text-truncate" title={product.name}>
        <Link to={`/products/${product.slug}`} className="text-dark text-decoration-none hover-red">
          {product.name}
        </Link>
      </h6>

      {/* Short Tagline */}
      {product.tagline && (
        <p className="text-muted small mb-2 text-truncate" style={{ fontSize: '0.8rem' }} title={product.tagline}>
          {product.tagline}
        </p>
      )}

      {/* Specifications Snippet */}
      {renderSpecSnippet()}

      {/* Color Swatches */}
      {product.colors && product.colors.length > 0 && (
        <div className="d-flex align-items-center gap-1 my-2">
          {product.colors.map((c, i) => (
            <span
              key={i}
              className={`color-swatch-circle ${selectedColor?.name === c.name ? 'selected' : ''}`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(c);
              }}
            />
          ))}
          {selectedColor && (
            <small className="text-muted ms-1" style={{ fontSize: '0.7rem' }}>
              {selectedColor.name}
            </small>
          )}
        </div>
      )}

      {/* Spacer to push pricing and button to bottom */}
      <div className="mt-auto pt-2">
        {/* Pricing Area */}
        <div className="d-flex align-items-baseline gap-2 mb-3">
          <span className="fw-bold text-dark fs-5">
            ₹{product.sellingPrice?.toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <span className="text-muted text-decoration-line-through small">
              ₹{product.originalPrice?.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* View Details Action */}
        <Link
          to={`/products/${product.slug}`}
          className="btn btn-brand-soft w-100 py-2 d-flex align-items-center justify-content-center gap-1 fw-bold"
          style={{ fontSize: '0.85rem' }}
        >
          <span>View Details</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
