import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminOffers() {
  const { db, addOffer, updateOffer, deleteOffer } = useData();

  const offers = db.offers || [];
  const [editingOffer, setEditingOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    badgeText: '',
    type: 'Card Offer',
    provider: 'HDFC Bank',
    discountAmount: 2000,
    minPurchase: 20000,
    tenureOptions: '',
    downPayment: '',
    processingFee: '',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'active',
    terms: ''
  });

  const handleOpenAdd = () => {
    setEditingOffer(null);
    setFormData({
      title: '',
      badgeText: '',
      type: 'Card Offer',
      provider: 'HDFC Bank',
      discountAmount: 2000,
      minPurchase: 20000,
      tenureOptions: '',
      downPayment: '',
      processingFee: '',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'active',
      terms: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (offer) => {
    setEditingOffer(offer);
    setFormData(offer);
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingOffer) {
      updateOffer(editingOffer.id, formData);
    } else {
      addOffer(formData);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this promotion from active store offers?')) {
      deleteOffer(id);
    }
  };

  const toggleOfferStatus = (offer) => {
    const nextStatus = offer.status === 'active' ? 'expired' : 'active';
    updateOffer(offer.id, { status: nextStatus });
  };

  return (
    <div className="admin-offers pb-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">Offers, Cashback & EMI</h2>
          <p className="text-muted small mb-0">
            Create promotional card discounts, festive exchange cashback, and 0% No-Cost EMI tenures.
          </p>
        </div>

        <button type="button" className="btn btn-brand-primary btn-sm d-inline-flex align-items-center gap-1" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* Offers Cards Grid */}
      <div className="row g-4">
        {offers.map((offer) => {
          const isActive = offer.status === 'active';
          return (
            <div key={offer.id} className="col-12 col-md-6">
              <div className="card h-100 p-4 border rounded-4 bg-white shadow-sm d-flex flex-column" style={{ borderColor: 'var(--border-color)' }}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="badge bg-danger-subtle text-danger fw-bold">{offer.type}</span>
                  <button
                    type="button"
                    className={`btn btn-sm py-0 px-2 ${isActive ? 'btn-success-subtle text-success border-success' : 'btn-secondary-subtle text-secondary'}`}
                    onClick={() => toggleOfferStatus(offer)}
                    title="Toggle active status"
                  >
                    {isActive ? 'Active' : 'Expired / Inactive'}
                  </button>
                </div>

                <h5 className="fw-bold text-dark mb-2">{offer.title}</h5>

                {offer.badgeText && (
                  <div className="mb-2">
                    <span className="badge-offer">Card Badge: {offer.badgeText}</span>
                  </div>
                )}

                <div className="text-muted small mb-3">
                  <div><strong>Provider:</strong> {offer.provider}</div>
                  <div><strong>Min Purchase:</strong> ₹{offer.minPurchase?.toLocaleString('en-IN')}</div>
                  {offer.tenureOptions && <div><strong>Tenure:</strong> {offer.tenureOptions}</div>}
                  <div><strong>Validity:</strong> {offer.startDate} to {offer.endDate}</div>
                </div>

                {offer.terms && (
                  <div className="p-2 bg-light rounded text-muted small mb-3" style={{ fontSize: '0.78rem' }}>
                    {offer.terms}
                  </div>
                )}

                <div className="mt-auto pt-3 border-top d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm px-3"
                    onClick={() => handleOpenEdit(offer)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm px-3"
                    onClick={() => handleDelete(offer.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Offer Editor Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }} role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editingOffer ? 'Edit Promotion Offer' : 'Create New Promotion'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label small fw-bold text-dark">Offer Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Flat ₹2,000 Instant Discount with HDFC Credit Cards"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">Offer Type</label>
                      <select
                        className="form-select"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      >
                        <option value="Card Offer">Card Offer / Bank Discount</option>
                        <option value="EMI Option">No-Cost EMI Option</option>
                        <option value="Cashback & Exchange">Cashback & Exchange Bonus</option>
                        <option value="Shop Discount">Shop Festival Discount</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">Product Card Badge Text</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. ₹2,000 Off on HDFC"
                        value={formData.badgeText}
                        onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">Bank / Finance Provider</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. HDFC Bank or Bajaj Finserv"
                        value={formData.provider}
                        onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">Minimum Purchase (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.minPurchase}
                        onChange={(e) => setFormData({ ...formData, minPurchase: Number(e.target.value) })}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">Tenure Options (for EMI)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 3 Months / 6 Months"
                        value={formData.tenureOptions}
                        onChange={(e) => setFormData({ ...formData, tenureOptions: e.target.value })}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">Down Payment</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. ₹0 Down Payment"
                        value={formData.downPayment}
                        onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-dark">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold text-dark">Terms & Conditions</label>
                      <textarea
                        rows={3}
                        className="form-control"
                        placeholder="Specify terms, eligible card tiers, and in-store redemption rules..."
                        value={formData.terms}
                        onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-brand-primary btn-sm px-4">
                    {editingOffer ? 'Save Offer' : 'Create Offer'}
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
