import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, CheckCircle2, Database } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminDemoSettings() {
  const { db, resetData } = useData();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Approximate storage calculation
  const calculateStorageSize = () => {
    try {
      const serialized = JSON.stringify(db);
      return (new Blob([serialized]).size / 1024).toFixed(1); // KB
    } catch {
      return '~45';
    }
  };

  const handleConfirmReset = () => {
    resetData();
    setShowConfirmModal(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="admin-demo-settings pb-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">Demo Storage & Sample Reset</h2>
          <p className="text-muted small mb-0">
            Inspect browser storage statistics and restore original factory seed data for client demonstrations.
          </p>
        </div>
      </div>

      {resetSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4 shadow-sm">
          <CheckCircle2 size={18} />
          <span>Demo store reset! Original 17 products, categories, active offers, banners, and sample enquiries restored.</span>
        </div>
      )}

      <div className="row g-4">
        {/* Storage Health & Info */}
        <div className="col-12 col-lg-7">
          <div className="card p-4 border rounded-4 bg-white shadow-sm mb-4" style={{ borderColor: 'var(--border-color)' }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="p-3 rounded-circle bg-light text-danger">
                <Database size={24} />
              </div>
              <div>
                <h5 className="fw-bold text-dark mb-0">Client Presentation Data Engine</h5>
                <small className="text-muted">HTML5 localStorage + IndexedDB Hybrid Layer</small>
              </div>
            </div>

            <p className="text-muted small" style={{ lineHeight: '1.6' }}>
              This demonstration stores all state changes in your browser's persistent storage. When you edit a product, create an offer, or submit a contact enquiry, it persists across page reloads on this machine without relying on external cloud endpoints or API keys.
            </p>

            <div className="row g-3 mt-2 text-center">
              <div className="col-4">
                <div className="p-3 bg-light rounded border">
                  <div className="fs-5 fw-bold text-dark">{calculateStorageSize()} KB</div>
                  <small className="text-muted">JSON Storage</small>
                </div>
              </div>

              <div className="col-4">
                <div className="p-3 bg-light rounded border">
                  <div className="fs-5 fw-bold text-dark">{(db.products || []).length}</div>
                  <small className="text-muted">Products in DB</small>
                </div>
              </div>

              <div className="col-4">
                <div className="p-3 bg-light rounded border">
                  <div className="fs-5 fw-bold text-dark">{(db.enquiries || []).length}</div>
                  <small className="text-muted">Saved Inquiries</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Action Column */}
        <div className="col-12 col-lg-5">
          <div className="card p-4 border rounded-4 bg-white shadow-sm border-danger border-opacity-25" style={{ borderColor: 'var(--border-color)' }}>
            <div className="d-flex align-items-center gap-2 mb-2 text-danger">
              <AlertTriangle size={20} />
              <h5 className="fw-bold mb-0">Reset to Sample Seed Data</h5>
            </div>

            <p className="text-muted small mb-4">
              If you have made extensive test edits, deleted items, or wish to start fresh for a new client presentation, you can restore the factory demonstration dataset anytime.
            </p>

            <button
              type="button"
              className="btn btn-danger py-2 w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
              onClick={() => setShowConfirmModal(true)}
            >
              <RotateCcw size={16} />
              <span>Reset to Sample Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }} role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2">
                  <AlertTriangle size={20} />
                  <span>Confirm Factory Seed Reset</span>
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)} />
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to revert all changes? This will replace any custom products, banners, offers, and enquiries you added with the original demonstration catalog.
                </p>
                <small className="text-muted">
                  This only affects your local browser cache.
                </small>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowConfirmModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger btn-sm" onClick={handleConfirmReset}>
                  Yes, Revert to Seed Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
