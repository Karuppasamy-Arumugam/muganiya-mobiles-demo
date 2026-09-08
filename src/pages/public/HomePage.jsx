import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  Wrench,
  Radio,
  Zap,
  Phone,
  MessageCircle,
  MapPin,
  Clock
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import ProductCard from '../../components/common/ProductCard';

export default function HomePage() {
  const { db, publishedProducts } = useData();

  const banners = (db.banners || []).filter((b) => b.active);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Reduced motion preference check
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Auto-slide carousel
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, prefersReducedMotion, banners.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  // Latest Launches & Best Sellers
  const latestLaunches = publishedProducts
    .filter((p) => p.isLatestLaunch)
    .slice(0, 4);

  const bestSellers = publishedProducts
    .filter((p) => p.isBestSeller)
    .slice(0, 4);

  const services = db.services || [];
  const content = db.websiteContent || {};
  const contact = db.contactSettings || {};

  return (
    <div className="homepage-wrapper pb-5">
      {/* 3. Hero Carousel */}
      {banners.length > 0 && (
        <section className="hero-carousel-section position-relative bg-dark overflow-hidden" aria-label="Featured Promotions">
          <div
            className="position-relative"
            style={{ minHeight: '380px', maxHeight: '520px', height: '48vw' }}
          >
            {banners.map((banner, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={banner.id}
                  className={`position-absolute top-0 start-0 w-100 h-100 transition-opacity ${
                    isActive ? 'opacity-100 z-index-2' : 'opacity-0 pointer-events-none'
                  }`}
                  style={{
                    transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease-in-out',
                    zIndex: isActive ? 2 : 1
                  }}
                >
                  {/* Background Image with Dark Gradient Overlay */}
                  <div
                    className="w-100 h-100 position-absolute top-0 start-0"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(20, 15, 17, 0.88) 0%, rgba(20, 15, 17, 0.55) 60%, rgba(20, 15, 17, 0.25) 100%), url(${banner.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />

                  {/* Banner Content Container */}
                  <div className="container h-100 position-relative d-flex align-items-center" style={{ zIndex: 3 }}>
                    <div className="text-white" style={{ maxWidth: '620px' }}>
                      {banner.badge && (
                        <span className="badge-brand d-inline-block mb-2 text-uppercase">
                          {banner.badge}
                        </span>
                      )}
                      <h1 className="display-6 display-md-5 fw-extrabold text-white mb-2" style={{ fontWeight: 800 }}>
                        {banner.title}
                      </h1>
                      <p className="lead text-white-50 mb-4 d-none d-sm-block" style={{ fontSize: '1.05rem', lineHeight: '1.5' }}>
                        {banner.subtitle}
                      </p>
                      <div className="d-flex align-items-center gap-3">
                        <Link to={banner.link || '/mobiles'} className="btn btn-brand-primary px-4 py-2">
                          <span>{banner.ctaText || 'Explore Now'}</span>
                          <ArrowRight size={18} />
                        </Link>
                        <Link to="/contact" className="btn btn-outline-light px-3 py-2 d-none d-md-inline-flex">
                          Enquire at Store
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Carousel Controls */}
            {banners.length > 1 && (
              <>
                <button
                  type="button"
                  className="btn btn-dark btn-sm rounded-circle position-absolute top-50 start-0 translate-middle-y ms-3 d-flex align-items-center justify-content-center p-2"
                  style={{ zIndex: 4, backgroundColor: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)' }}
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <button
                  type="button"
                  className="btn btn-dark btn-sm rounded-circle position-absolute top-50 end-0 translate-middle-y me-3 d-flex align-items-center justify-content-center p-2"
                  style={{ zIndex: 4, backgroundColor: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)' }}
                  onClick={nextSlide}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>

                {/* Indicators & Autoplay Pause Button */}
                <div
                  className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex align-items-center gap-2"
                  style={{ zIndex: 4 }}
                >
                  {banners.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="border-0 rounded-pill p-0"
                      style={{
                        width: idx === currentSlide ? '24px' : '8px',
                        height: '8px',
                        backgroundColor: idx === currentSlide ? 'var(--primary-red)' : 'rgba(255,255,255,0.5)',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}

                  {/* Pause / Play Toggle */}
                  <button
                    type="button"
                    className="btn btn-link text-white p-0 ms-2"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Quick Category Icons Strip */}
      <section className="py-4 border-bottom bg-white">
        <div className="container">
          <div className="row g-2 g-md-3 text-center">
            {[
              { name: '5G Mobiles', path: '/mobiles', icon: '📱' },
              { name: 'Smart TVs', path: '/categories?category=tvs', icon: '📺' },
              { name: 'Earbuds & Audio', path: '/categories?category=audio', icon: '🎧' },
              { name: 'Cooling & AC', path: '/categories?category=cooling-appliances', icon: '❄️' },
              { name: 'Kitchen & Induction', path: '/categories?category=kitchen-appliances', icon: '🍳' },
              { name: 'SIM & Repairs', path: '/contact?service=repair', icon: '🔧' }
            ].map((cat, i) => (
              <div key={i} className="col-4 col-md-2">
                <Link
                  to={cat.path}
                  className="card h-100 p-2 text-decoration-none text-dark border-0 hover-bg-light transition-all rounded"
                  style={{ backgroundColor: 'var(--secondary-bg)' }}
                >
                  <div className="fs-3 mb-1">{cat.icon}</div>
                  <div className="fw-bold small">{cat.name}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Launches */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-4">
            <div>
              <span className="text-uppercase fw-bold text-danger small">Just Arrived</span>
              <h2 className="fw-bold mb-0">Latest Launches</h2>
            </div>
            <Link to="/mobiles?filter=latest" className="text-decoration-none fw-bold text-danger d-flex align-items-center gap-1">
              <span>View All Launches</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="row g-3 g-md-4">
            {latestLaunches.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Best Sellers */}
      <section className="py-5" style={{ backgroundColor: 'var(--secondary-bg)' }}>
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-4">
            <div>
              <span className="text-uppercase fw-bold text-danger small">Customer Favorites</span>
              <h2 className="fw-bold mb-0">Best Sellers</h2>
            </div>
            <Link to="/mobiles?filter=bestseller" className="text-decoration-none fw-bold text-danger d-flex align-items-center gap-1">
              <span>Explore All</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="row g-3 g-md-4">
            {bestSellers.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Services (Three Cards) */}
      <section className="py-5" id="services">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-5">
            <span className="badge-blush text-uppercase fw-bold mb-2 d-inline-block">Express Care & Assistance</span>
            <h2 className="fw-bold">Our Store Services</h2>
            <p className="text-muted">
              Fast, dependable solutions by experienced technicians right in our shop showroom.
            </p>
          </div>

          <div className="row g-4">
            {services.map((srv, idx) => {
              const IconComp = srv.icon === 'Wrench' ? Wrench : srv.icon === 'Radio' ? Radio : Zap;
              return (
                <div key={srv.id || idx} className="col-12 col-md-4">
                  <div className="custom-card h-100 p-4 d-flex flex-column">
                    <div
                      className="p-3 rounded-circle mb-3 d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'var(--soft-blush)',
                        color: 'var(--primary-red)'
                      }}
                    >
                      <IconComp size={28} />
                    </div>

                    <h4 className="fw-bold mb-2">{srv.title}</h4>
                    <p className="text-muted small mb-4">{srv.subtitle}</p>

                    <ul className="list-unstyled d-flex flex-column gap-2 mb-4 small text-muted">
                      {srv.features?.map((feat, fIdx) => (
                        <li key={fIdx} className="d-flex align-items-center gap-2">
                          <span className="text-danger fw-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <Link
                        to={`/contact?service=${encodeURIComponent(srv.enquiryService || srv.title)}`}
                        className="btn btn-brand-primary w-100"
                      >
                        Enquire for {srv.title.split('&')[0].trim()}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supporting Partner Area */}
      <section className="py-4 border-top border-bottom" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="text-center mb-3">
            <span className="text-muted small text-uppercase fw-bold" style={{ letterSpacing: '0.08em' }}>
              Authorized Store Retail Partnerships
            </span>
          </div>
          <div className="row g-3 justify-content-center align-items-center text-center">
            <div className="col-12 col-md-4">
              <div className="p-3 border rounded bg-light">
                <div className="fw-bold text-dark fs-6">Official Partner of JioMart Digital</div>
                <small className="text-muted">Wide range of consumer electronics & digital solutions</small>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-3 border rounded bg-light">
                <div className="fw-bold text-dark fs-6">Partner of vivo</div>
                <small className="text-muted">Direct brand distributor for smartphones & accessories</small>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-3 border rounded bg-light">
                <div className="fw-bold text-dark fs-6">Partner of OPPO</div>
                <small className="text-muted">Authorized stockist for OPPO camera smartphones</small>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
              *Owner-provided retail partnership statements. Does not imply JioMart Digital stock integration or authorized brand repair center status.
            </small>
          </div>
        </div>
      </section>

      {/* 7. About Us Preview */}
      <section className="py-5" style={{ backgroundColor: 'var(--secondary-bg)' }}>
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <div
                className="rounded-4 overflow-hidden shadow-sm p-4 text-white position-relative"
                style={{
                  minHeight: '320px',
                  backgroundColor: '#B72E35',
                  backgroundImage: 'radial-gradient(circle at 100% 0%, #96232A 0%, #B72E35 100%)'
                }}
              >
                <div className="position-relative" style={{ zIndex: 2 }}>
                  <span className="badge bg-white text-danger fw-bold mb-3">Shop Showroom</span>
                  <h3 className="fw-bold text-white mb-3">Muganiyaa-Mobiles</h3>
                  <p className="text-white-50" style={{ lineHeight: '1.6' }}>
                    A dedicated retail storefront where you can physically test devices, compare display quality, receive genuine invoice warranties, and walk in for honest technical repairs.
                  </p>
                  <div className="row g-3 mt-2">
                    <div className="col-6">
                      <div className="bg-white bg-opacity-10 p-2 rounded">
                        <div className="fw-bold fs-5">100%</div>
                        <small className="text-white-50">Genuine Devices</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-white bg-opacity-10 p-2 rounded">
                        <div className="fw-bold fs-5">15 Min</div>
                        <small className="text-white-50">SIM & MNP Porting</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <span className="text-uppercase fw-bold text-danger small">About Our Shop</span>
              <h2 className="fw-bold mb-3">{content.aboutUs?.title || 'Welcome to Muganiyaa-Mobiles'}</h2>
              <p className="text-muted" style={{ lineHeight: '1.7' }}>
                {content.aboutUs?.description?.substring(0, 320) ||
                  'Muganiyaa-Mobiles is your trusted local destination for smartphones, audio, TVs, and appliances. We provide honest product guidance and fast in-store services.'}
                ...
              </p>
              <div className="d-flex align-items-center gap-3 mt-4">
                <Link to="/about" className="btn btn-brand-primary">
                  Read Our Full Story
                </Link>
                <Link to="/contact" className="btn btn-brand-outline">
                  Store Directions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Contact Us Preview */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="card border p-4 p-md-5 rounded-4" style={{ borderColor: 'var(--border-color)', backgroundColor: '#FFFFFF' }}>
            <div className="row align-items-center g-4">
              <div className="col-12 col-lg-7">
                <span className="badge-blush text-uppercase fw-bold mb-2 d-inline-block">Need Instant Assistance?</span>
                <h3 className="fw-bold text-dark mb-2">Speak Directly with Our Store Staff</h3>
                <p className="text-muted mb-4">
                  Check immediate variant stock, ask for screen repair estimates, or enquire about finance documents.
                </p>

                <div className="d-flex flex-wrap gap-4 text-muted small">
                  <div className="d-flex align-items-center gap-2">
                    <Clock size={16} className="text-danger" />
                    <span>{contact.hours || 'Mon - Sat: 9:30 AM - 9:30 PM'}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <MapPin size={16} className="text-danger" />
                    <span>Main Road, Demo City</span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-5 text-lg-end">
                <div className="d-flex flex-column flex-sm-row justify-content-lg-end gap-3">
                  <a
                    href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`}
                    className="btn btn-brand-primary py-3 px-4 d-inline-flex align-items-center justify-content-center gap-2 fw-bold"
                  >
                    <Phone size={18} />
                    <span>Call Store</span>
                  </a>
                  <Link
                    to="/contact"
                    className="btn btn-brand-outline py-3 px-4 d-inline-flex align-items-center justify-content-center gap-2 fw-bold"
                  >
                    <MessageCircle size={18} />
                    <span>Send Enquiry</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
