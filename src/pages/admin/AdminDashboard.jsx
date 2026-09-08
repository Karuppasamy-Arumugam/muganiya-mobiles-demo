import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Tag,
  Inbox,
  Image,
  Plus,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminDashboard() {
  const { db, publishedProducts, activeOffers } = useData();

  const allProducts = db.products || [];
  const publishedCount = publishedProducts.length;
  const draftCount = allProducts.length - publishedCount;
  const activeOffersCount = activeOffers.length;
  const enquiries = db.enquiries || [];
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div className="admin-dashboard">
      {/* Page Title Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">Store Dashboard</h2>
          <p className="text-muted small mb-0">
            Real-time overview of Muganiyaa-Mobiles in-browser catalogue, active offers, and customer enquiries.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link to="/admin/products/new" className="btn btn-brand-primary btn-sm d-inline-flex align-items-center gap-1">
            <Plus size={16} />
            <span>Add New Product</span>
          </Link>
          <Link to="/admin/banners" className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1">
            <Image size={16} />
            <span>Manage Banners</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row (Derived from live local database) */}
      <div className="row g-3 mb-4">
        {/* Total Products */}
        <div className="col-6 col-lg-3">
          <div className="card p-3 border rounded-3 bg-white h-100 shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold">Total Products</span>
              <div className="p-2 rounded bg-light text-danger">
                <Package size={20} />
              </div>
            </div>
            <div className="fs-3 fw-bold text-dark">{allProducts.length}</div>
            <small className="text-success d-flex align-items-center gap-1 mt-1">
              <CheckCircle2 size={12} />
              <span>{publishedCount} Published</span>
              {draftCount > 0 && <span className="text-muted ms-1">({draftCount} draft)</span>}
            </small>
          </div>
        </div>

        {/* Active Offers */}
        <div className="col-6 col-lg-3">
          <div className="card p-3 border rounded-3 bg-white h-100 shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold">Active Offers</span>
              <div className="p-2 rounded bg-light text-danger">
                <Tag size={20} />
              </div>
            </div>
            <div className="fs-3 fw-bold text-dark">{activeOffersCount}</div>
            <small className="text-muted mt-1 d-block">
              {(db.offers || []).length - activeOffersCount} Expired or Inactive
            </small>
          </div>
        </div>

        {/* Customer Enquiries */}
        <div className="col-6 col-lg-3">
          <div className="card p-3 border rounded-3 bg-white h-100 shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold">Customer Inquiries</span>
              <div className="p-2 rounded bg-light text-danger">
                <Inbox size={20} />
              </div>
            </div>
            <div className="fs-3 fw-bold text-dark">{enquiries.length}</div>
            <small className={newEnquiriesCount > 0 ? 'text-danger fw-bold d-block mt-1' : 'text-muted d-block mt-1'}>
              {newEnquiriesCount} New Unhandled
            </small>
          </div>
        </div>

        {/* Categories */}
        <div className="col-6 col-lg-3">
          <div className="card p-3 border rounded-3 bg-white h-100 shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold">Categories</span>
              <div className="p-2 rounded bg-light text-danger">
                <Sparkles size={20} />
              </div>
            </div>
            <div className="fs-3 fw-bold text-dark">{(db.categories || []).length}</div>
            <small className="text-muted mt-1 d-block">Mobiles, Audio, TVs, Appliances</small>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <div className="card p-4 border rounded-4 bg-white h-100 shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
            <h5 className="fw-bold text-dark mb-2">Quick Catalogue Actions</h5>
            <p className="text-muted small mb-3">
              Common tasks to update prices, add new arrivals, or attach bank discounts.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/admin/products/new" className="btn btn-brand-soft btn-sm d-inline-flex align-items-center gap-1">
                <Plus size={15} /> Add Mobile or Electronic
              </Link>
              <Link to="/admin/offers" className="btn btn-brand-soft btn-sm d-inline-flex align-items-center gap-1">
                <Tag size={15} /> Add Festive Offer
              </Link>
              <Link to="/admin/banners" className="btn btn-brand-soft btn-sm d-inline-flex align-items-center gap-1">
                <Image size={15} /> Edit Hero Carousel
              </Link>
              <Link to="/admin/contact" className="btn btn-brand-soft btn-sm d-inline-flex align-items-center gap-1">
                Update Store Phone & Hours
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card p-4 border rounded-4 bg-white h-100 shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="fw-bold text-dark mb-0">Public Site Sync</h5>
              <span className="badge bg-success-subtle text-success">Live Synchronization</span>
            </div>
            <p className="text-muted small mb-3">
              Any changes made in this admin panel update the public website immediately in the same browser via shared state.
            </p>
            <div className="d-flex gap-2">
              <Link to="/" target="_blank" rel="noopener noreferrer" className="btn btn-brand-primary btn-sm d-inline-flex align-items-center gap-1">
                <span>View Public Store</span>
                <ExternalLink size={14} />
              </Link>
              <Link to="/admin/demo" className="btn btn-outline-secondary btn-sm">
                Reset Sample Data
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="card border rounded-4 bg-white shadow-sm overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
        <div className="p-3 p-md-4 border-bottom d-flex align-items-center justify-content-between">
          <div>
            <h5 className="fw-bold mb-0">Recent Inquiries & Service Requests</h5>
            <small className="text-muted">Submissions from Contact Form and Product pages</small>
          </div>
          <Link to="/admin/enquiries" className="text-danger fw-bold text-decoration-none small d-flex align-items-center gap-1">
            <span>View All ({enquiries.length})</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="p-4 text-center text-muted small">No enquiries received yet.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.88rem' }}>
              <thead className="table-light">
                <tr>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Product / Service</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id}>
                    <td>
                      <div className="fw-bold text-dark">{enq.customerName}</div>
                      <small className="text-muted">{enq.phone}</small>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{enq.enquiryType}</span>
                    </td>
                    <td className="text-truncate" style={{ maxWidth: '200px' }}>
                      {enq.selectedProductOrService || 'General'}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          enq.status === 'New'
                            ? 'bg-danger-subtle text-danger'
                            : enq.status === 'In Progress'
                            ? 'bg-warning-subtle text-warning-emphasis'
                            : 'bg-success-subtle text-success'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="text-muted small">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="text-end">
                      <Link to="/admin/enquiries" className="btn btn-outline-secondary btn-sm p-1 px-2" style={{ fontSize: '0.75rem' }}>
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
