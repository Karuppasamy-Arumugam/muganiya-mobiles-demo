import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronRight,
  ZoomIn,
  Tag
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/common/ProductCard';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { db, publishedProducts, activeOffers } = useData();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Find product by slug
  const product = useMemo(() => {
    return (db.products || []).find((p) => p.slug === slug);
  }, [db.products, slug]);

  const inWishlist = product ? isInWishlist(product.id) : false;

  // Selected Variant state: Color + RAM + Storage
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Initialize variant defaults when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : null);
      setSelectedRam(product.ramOptions && product.ramOptions.length > 0 ? product.ramOptions[0] : null);
      setSelectedStorage(product.storageOptions && product.storageOptions.length > 0 ? product.storageOptions[0] : null);
      setActiveImageIndex(0);
      setIsZoomed(false);
      window.scrollTo(0, 0);
    }
  }, [product]);

  // Current active variant match (if product has variants matrix)
  const currentVariant = useMemo(() => {
    if (!product || !product.variants || product.variants.length === 0) {
      return null;
    }
    return (
      product.variants.find((v) => {
        const colorMatch = !selectedColor || v.color === selectedColor.name;
        const ramMatch = !selectedRam || v.ram === selectedRam;
        const storageMatch = !selectedStorage || v.storage === selectedStorage;
        return colorMatch && ramMatch && storageMatch;
      }) || product.variants[0]
    );
  }, [product, selectedColor, selectedRam, selectedStorage]);

  // Dynamic Prices & Stock
  const currentSellingPrice = currentVariant ? currentVariant.sellingPrice : product?.sellingPrice || 0;
  const currentOriginalPrice = currentVariant ? currentVariant.originalPrice : product?.originalPrice || 0;
  const currentStockStatus = currentVariant ? currentVariant.stockStatus : product?.stockStatus || 'In Stock';
  const isOutOfStock = currentStockStatus === 'Out of Stock';

  // Available images gallery
  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) return product.images;
    if (product.coverImage) return [product.coverImage];
    return [];
  }, [product]);

  // Offers attached to this product or general active offers
  const eligibleOffers = useMemo(() => {
    if (!product) return [];
    const productOfferIds = product.offers || [];
    return activeOffers.filter(
      (o) =>
        productOfferIds.includes(o.id) ||
        (o.type === 'EMI Option' && currentSellingPrice >= (o.minPurchase || 0)) ||
        (o.type === 'Card Offer' && currentSellingPrice >= (o.minPurchase || 0))
    );
  }, [product, activeOffers, currentSellingPrice]);

  // Related products in same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return publishedProducts
      .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
      .slice(0, 4);
  }, [publishedProducts, product]);

  const contact = db.contactSettings || {};
  const whatsappNumber = contact.whatsapp?.replace(/[^0-9]/g, '');

  if (!product || product.status === 'draft') {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 max-w-md mx-auto border" style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="fw-bold mb-2">Product Not Found</h3>
          <p className="text-muted small mb-4">
            The requested product may be currently unpublished or out of stock in our active catalogue.
          </p>
          <div>
            <Link to="/mobiles" className="btn btn-brand-primary btn-sm px-4 py-2">
              Back to Mobiles Catalogue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle WhatsApp Enquiry
  const handleWhatsAppEnquiry = () => {
    const variantDesc = currentVariant
      ? `(${currentVariant.color || ''} ${currentVariant.ram || ''} ${currentVariant.storage || ''})`
      : '';
    const message = encodeURIComponent(
      `Hello Muganiyaa-Mobiles! I am interested in ${product.name} ${variantDesc} priced at ₹${currentSellingPrice.toLocaleString('en-IN')}. Please confirm current in-store stock availability.`
    );
    if (whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    } else {
      navigate('/contact');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="product-details-page pb-5">
      {/* 1. Breadcrumbs */}
      <div className="bg-white border-bottom py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={product.categorySlug === 'mobiles' ? '/mobiles' : `/categories?category=${product.categorySlug}`} className="text-muted text-decoration-none">
                  {product.category}
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/mobiles?brand=${encodeURIComponent(product.brand)}`} className="text-muted text-decoration-none">
                  {product.brand}
                </Link>
              </li>
              <li className="breadcrumb-item active text-dark" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* 3. Main Product Selection Area */}
      <div className="container py-4 py-lg-5">
        <div className="row g-4 g-lg-5">
          {/* Image Gallery Column */}
          <div className="col-12 col-lg-6">
            <div className="sticky-top" style={{ top: '100px' }}>
              {/* Main Active Image Viewport */}
              <div
                className="position-relative border rounded-3 p-4 bg-white d-flex align-items-center justify-content-center overflow-hidden"
                style={{
                  borderColor: 'var(--border-color)',
                  aspectRatio: '1 / 1',
                  backgroundColor: 'var(--secondary-bg)',
                  cursor: 'zoom-in'
                }}
                onClick={() => setIsZoomed(!isZoomed)}
                title="Click to toggle zoomed preview"
              >
                <img
                  src={galleryImages[activeImageIndex] || product.coverImage}
                  alt={product.name}
                  className="img-fluid"
                  style={{
                    maxHeight: '90%',
                    maxWidth: '90%',
                    objectFit: 'contain',
                    transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                <button
                  type="button"
                  className="btn btn-light btn-sm rounded-circle position-absolute bottom-0 end-0 m-3 shadow-sm"
                  aria-label="Zoom Image"
                >
                  <ZoomIn size={16} />
                </button>

                {/* Badges */}
                <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-1">
                  {product.isLatestLaunch && <span className="badge-brand">Latest Launch</span>}
                  {product.isBestSeller && <span className="badge-blush">Best Seller</span>}
                </div>
              </div>

              {/* Thumbnails Row */}
              {galleryImages.length > 1 && (
                <div className="d-flex align-items-center gap-2 mt-3 overflow-x-auto pb-1">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`border rounded p-1 bg-white cursor-pointer ${
                        activeImageIndex === idx ? 'border-danger border-2' : ''
                      }`}
                      style={{
                        width: '70px',
                        height: '70px',
                        flexShrink: 0,
                        borderColor: activeImageIndex === idx ? 'var(--primary-red)' : 'var(--border-color)'
                      }}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setIsZoomed(false);
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumb ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Information & Variants Column */}
          <div className="col-12 col-lg-6">
            {/* Brand & Model */}
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-uppercase fw-bold text-danger small" style={{ letterSpacing: '0.06em' }}>
                {product.brand}
              </span>
              <span className="text-muted small">Model: {product.model || 'Standard'}</span>
            </div>

            <h1 className="fw-bold fs-3 text-dark mb-2">{product.name}</h1>

            {product.tagline && (
              <p className="lead text-muted fs-6 mb-3">{product.tagline}</p>
            )}

            {/* Price & Availability Row */}
            <div className="p-3 rounded-3 mb-4 d-flex flex-wrap align-items-baseline gap-3" style={{ backgroundColor: 'var(--secondary-bg)' }}>
              <div>
                <span className="fs-2 fw-extrabold text-dark" style={{ fontWeight: 800 }}>
                  ₹{currentSellingPrice.toLocaleString('en-IN')}
                </span>
                {currentOriginalPrice > currentSellingPrice && (
                  <span className="text-muted text-decoration-line-through ms-2 fs-5">
                    ₹{currentOriginalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div className="ms-auto d-flex align-items-center gap-2">
                {isOutOfStock ? (
                  <span className="badge bg-secondary-subtle text-secondary px-3 py-2 fs-6 d-flex align-items-center gap-1">
                    <XCircle size={15} /> Out of Stock
                  </span>
                ) : (
                  <span className="badge bg-success-subtle text-success px-3 py-2 fs-6 d-flex align-items-center gap-1">
                    <CheckCircle2 size={15} /> In Stock for Store Pickup
                  </span>
                )}
              </div>
            </div>

            {/* Colour Swatches Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="fw-bold small text-dark d-block mb-2">
                  Colour:{' '}
                  <span className="text-danger fw-bold">{selectedColor?.name || 'Select Colour'}</span>
                </label>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {product.colors.map((color, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      className={`btn btn-sm d-inline-flex align-items-center gap-2 p-2 px-3 rounded-pill border ${
                        selectedColor?.name === color.name
                          ? 'border-danger bg-white shadow-sm'
                          : 'border-light-subtle bg-light'
                      }`}
                      style={{
                        outline: selectedColor?.name === color.name ? '2px solid var(--primary-red)' : 'none',
                        outlineOffset: '2px'
                      }}
                      onClick={() => setSelectedColor(color)}
                    >
                      <span
                        className="rounded-circle d-inline-block border"
                        style={{ width: '16px', height: '16px', backgroundColor: color.hex }}
                      />
                      <span className="small fw-semibold">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* RAM Options (if present) */}
            {product.ramOptions && product.ramOptions.length > 0 && (
              <div className="mb-4">
                <label className="fw-bold small text-dark d-block mb-2">
                  RAM Size:{' '}
                  <span className="text-danger fw-bold">{selectedRam}</span>
                </label>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {product.ramOptions.map((ram, rIdx) => (
                    <button
                      key={rIdx}
                      type="button"
                      className={`btn btn-sm px-3 py-2 fw-semibold ${
                        selectedRam === ram ? 'btn-danger' : 'btn-outline-secondary'
                      }`}
                      onClick={() => setSelectedRam(ram)}
                    >
                      {ram} RAM
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage Options (if present) */}
            {product.storageOptions && product.storageOptions.length > 0 && (
              <div className="mb-4">
                <label className="fw-bold small text-dark d-block mb-2">
                  Storage Capacity:{' '}
                  <span className="text-danger fw-bold">{selectedStorage}</span>
                </label>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {product.storageOptions.map((storage, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      className={`btn btn-sm px-3 py-2 fw-semibold ${
                        selectedStorage === storage ? 'btn-danger' : 'btn-outline-secondary'
                      }`}
                      onClick={() => setSelectedStorage(storage)}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons: Direct Call, WhatsApp & Wishlist */}
            <div className="d-flex flex-column flex-sm-row align-items-stretch gap-3 my-4">
              <button
                type="button"
                className="btn btn-brand-primary flex-grow-1 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold"
                onClick={handleWhatsAppEnquiry}
              >
                <MessageCircle size={20} />
                <span>WhatsApp Enquiry</span>
              </button>

              <a
                href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`}
                className="btn btn-brand-outline py-3 px-4 d-flex align-items-center justify-content-center gap-2 fw-bold"
              >
                <Phone size={18} />
                <span>Call Store</span>
              </a>

              <button
                type="button"
                className={`btn py-3 px-3 border ${
                  inWishlist ? 'btn-danger' : 'btn-light'
                }`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                title="Wishlist"
              >
                <Heart size={20} fill={inWishlist ? '#FFFFFF' : 'none'} />
              </button>

              <button
                type="button"
                className="btn btn-light py-3 px-3 border"
                onClick={handleShare}
                title="Share link"
                aria-label="Share product"
              >
                <Share2 size={18} />
              </button>
            </div>

            {copiedShare && (
              <div className="alert alert-success py-1 px-3 small text-center mb-3">
                Product link copied to clipboard!
              </div>
            )}

            {/* In-Store Guarantee Callouts */}
            <div className="border rounded-3 p-3 bg-light">
              <div className="row g-2 small text-muted">
                <div className="col-12 col-sm-6 d-flex align-items-center gap-2">
                  <ShieldCheck size={18} className="text-danger flex-shrink-0" />
                  <span>100% Genuine with Official Bill & Warranty</span>
                </div>
                <div className="col-12 col-sm-6 d-flex align-items-center gap-2">
                  <Truck size={18} className="text-danger flex-shrink-0" />
                  <span>Same-Day Showroom Pickup & Setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. "What Makes It Special" Section */}
        {product.highlights && product.highlights.length > 0 && (
          <div className="my-5 p-4 rounded-4 border bg-white" style={{ borderColor: 'var(--border-color)' }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <Sparkles size={22} className="text-danger" />
              <h4 className="fw-bold mb-0">What Makes It Special</h4>
            </div>
            <div className="row g-3">
              {product.highlights.map((highlight, hIdx) => (
                <div key={hIdx} className="col-12 col-md-6">
                  <div className="d-flex align-items-start gap-2">
                    <span className="text-danger fw-bold">★</span>
                    <span className="text-dark small fw-medium">{highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Category-Specific Specifications */}
        {product.specifications && (
          <div className="my-5">
            <h4 className="fw-bold mb-3 pb-2 border-bottom">Technical Specifications</h4>
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle mb-0" style={{ fontSize: '0.88rem' }}>
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => {
                    // Format camelCase key to Human Label
                    const label = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase());
                    return (
                      <tr key={idx}>
                        <th className="bg-light text-dark fw-bold w-30" style={{ width: '28%' }}>
                          {label}
                        </th>
                        <td className="text-muted">{val}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. Our Offers & EMI Section */}
        {eligibleOffers.length > 0 && (
          <div className="my-5 p-4 rounded-4 border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--secondary-bg)' }}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <Tag size={20} className="text-danger" />
                <h4 className="fw-bold mb-0">Available Offers & EMI Options</h4>
              </div>
              <span className="badge-offer">Verified Store Promos</span>
            </div>

            <div className="row g-3">
              {eligibleOffers.map((offer) => (
                <div key={offer.id} className="col-12 col-md-6">
                  <div className="card h-100 p-3 bg-white border rounded-3" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className="badge-brand small">{offer.type}</span>
                      <small className="text-muted fw-semibold">{offer.provider}</small>
                    </div>
                    <h6 className="fw-bold text-dark mb-2">{offer.title}</h6>
                    {offer.tenureOptions && (
                      <p className="text-muted small mb-1">
                        <strong>Tenure:</strong> {offer.tenureOptions} ({offer.downPayment}, {offer.processingFee})
                      </p>
                    )}
                    {offer.terms && (
                      <p className="text-muted small mb-0" style={{ fontSize: '0.78rem' }}>
                        {offer.terms}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <small className="text-muted d-block mt-3" style={{ fontSize: '0.75rem' }}>
              *Illustrative financing data for demonstration. Final approval is subject to finance provider eligibility checks.
            </small>
          </div>
        )}

        {/* 7. Contact Us / Enquire Strip */}
        <div className="my-5 card p-4 border rounded-4 bg-white" style={{ borderColor: 'var(--border-color)' }}>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
            <div>
              <h5 className="fw-bold mb-1">Have questions about {product.name}?</h5>
              <p className="text-muted small mb-0">
                Ask about genuine accessories, back cover options, tempered glass installation, or trade-in exchange bonuses.
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Link
                to={`/contact?product=${encodeURIComponent(product.name)}`}
                className="btn btn-brand-primary btn-sm px-4 py-2"
              >
                Send Direct Enquiry
              </Link>
            </div>
          </div>
        </div>

        {/* 8. Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="my-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="fw-bold mb-0">Similar Products You Might Like</h4>
              <Link
                to={product.categorySlug === 'mobiles' ? '/mobiles' : `/categories?category=${product.categorySlug}`}
                className="text-danger fw-bold text-decoration-none small d-flex align-items-center gap-1"
              >
                <span>View More</span>
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="row g-3 g-md-4">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="col-12 col-sm-6 col-md-3">
                  <ProductCard product={rel} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
