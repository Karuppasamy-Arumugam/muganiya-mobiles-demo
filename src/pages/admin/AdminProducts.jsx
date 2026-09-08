import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminProducts() {
  const { db, updateProduct, deleteProduct } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [productToDelete, setProductToDelete] = useState(null);

  const categories = db.categories || [];
  const products = db.products || [];

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }
      // Status
      if (selectedStatus !== 'all' && p.status !== selectedStatus) {
        return false;
      }
      // Search Term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = p.name?.toLowerCase().includes(q);
        const matchBrand = p.brand?.toLowerCase().includes(q);
        const matchModel = p.model?.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchModel) return false;
      }
      return true;
    });
  }, [products, selectedCategory, selectedStatus, searchTerm]);

  const togglePublishStatus = (product) => {
    const nextStatus = product.status === 'published' ? 'draft' : 'published';
    updateProduct(product.id, { status: nextStatus });
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="admin-products">
      {/* Title & Add Button Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">Product Catalogue</h2>
          <p className="text-muted small mb-0">
            Manage mobile phones, electronic models, prices, variants, specifications, and visibility.
          </p>
        </div>

        <Link to="/admin/products/new" className="btn btn-brand-primary d-inline-flex align-items-center gap-1">
          <Plus size={18} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="card p-3 border rounded-3 bg-white mb-4 shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
        <div className="row g-3 align-items-center">
          {/* Search Input */}
          <div className="col-12 col-md-5">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-light text-muted border-end-0">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search products by model, name, or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="col-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories ({products.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="col-6 col-md-2">
            <select
              className="form-select form-select-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Visibility</option>
              <option value="published">Published</option>
              <option value="draft">Draft (Hidden)</option>
            </select>
          </div>

          {/* Count Badge */}
          <div className="col-12 col-md-2 text-md-end">
            <span className="badge-blush">
              {filteredProducts.length} Items Found
            </span>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border rounded-4 bg-white shadow-sm overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
        {filteredProducts.length === 0 ? (
          <div className="p-5 text-center">
            <RefreshCw size={36} className="text-muted mb-2" />
            <h6 className="fw-bold mb-1">No products match this filter</h6>
            <p className="text-muted small mb-0">Try clearing your search query or selecting "All Categories".</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.88rem' }}>
              <thead className="table-light">
                <tr>
                  <th style={{ width: '60px' }}>Image</th>
                  <th>Product Details</th>
                  <th>Category & Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Visibility</th>
                  <th className="text-end" style={{ width: '160px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => {
                  const isPublished = p.status === 'published';
                  return (
                    <tr key={p.id}>
                      {/* Image Thumbnail */}
                      <td>
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            backgroundColor: 'var(--secondary-bg)',
                            borderRadius: '6px',
                            overflow: 'hidden'
                          }}
                          className="d-flex align-items-center justify-content-center border"
                        >
                          <img
                            src={p.coverImage}
                            alt={p.name}
                            style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
                          />
                        </div>
                      </td>

                      {/* Product Details */}
                      <td>
                        <div className="fw-bold text-dark">{p.name}</div>
                        <div className="text-muted small">
                          Model: {p.model || 'Standard'} {p.tagline ? `• ${p.tagline}` : ''}
                        </div>
                        {p.colors && p.colors.length > 0 && (
                          <div className="d-flex align-items-center gap-1 mt-1">
                            {p.colors.map((col, idx) => (
                              <span
                                key={idx}
                                className="rounded-circle border d-inline-block"
                                style={{ width: '12px', height: '12px', backgroundColor: col.hex }}
                                title={col.name}
                              />
                            ))}
                            <small className="text-muted ms-1" style={{ fontSize: '0.72rem' }}>
                              ({p.colors.length} {p.colors.length === 1 ? 'colour' : 'colours'})
                            </small>
                          </div>
                        )}
                      </td>

                      {/* Category & Brand */}
                      <td>
                        <div className="badge bg-light text-dark border mb-1">{p.brand}</div>
                        <div className="text-muted small">{p.category}</div>
                      </td>

                      {/* Price */}
                      <td>
                        <div className="fw-bold text-dark">
                          ₹{p.sellingPrice?.toLocaleString('en-IN')}
                        </div>
                        {p.originalPrice > p.sellingPrice && (
                          <div className="text-muted small text-decoration-line-through">
                            ₹{p.originalPrice?.toLocaleString('en-IN')}
                          </div>
                        )}
                      </td>

                      {/* Stock Status */}
                      <td>
                        <span
                          className={`badge ${
                            p.stockStatus === 'In Stock'
                              ? 'bg-success-subtle text-success'
                              : 'bg-secondary-subtle text-secondary'
                          }`}
                        >
                          {p.stockStatus || 'In Stock'}
                        </span>
                      </td>

                      {/* Visibility Toggle Switch */}
                      <td>
                        <button
                          type="button"
                          className={`btn btn-sm py-1 px-2 d-inline-flex align-items-center gap-1 ${
                            isPublished ? 'btn-success-subtle text-success border-success' : 'btn-light text-muted border'
                          }`}
                          onClick={() => togglePublishStatus(p)}
                          title={`Click to ${isPublished ? 'Unpublish' : 'Publish'}`}
                        >
                          {isPublished ? <Eye size={14} /> : <EyeOff size={14} />}
                          <span className="small fw-semibold">{isPublished ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>

                      {/* Action Buttons */}
                      <td className="text-end">
                        <div className="d-inline-flex align-items-center gap-1">
                          {isPublished && (
                            <Link
                              to={`/products/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-secondary btn-sm p-1"
                              title="Preview on Public Website"
                            >
                              <ExternalLink size={14} />
                            </Link>
                          )}

                          <Link
                            to={`/admin/products/edit/${p.id}`}
                            className="btn btn-outline-primary btn-sm p-1"
                            title="Edit Product Details"
                          >
                            <Edit size={14} />
                          </Link>

                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm p-1"
                            onClick={() => setProductToDelete(p)}
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }} role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-danger">Confirm Removal</h5>
                <button type="button" className="btn-close" onClick={() => setProductToDelete(null)} />
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete <strong>{productToDelete.name}</strong> from your local product catalogue?
                </p>
                <small className="text-muted">
                  This action removes the item from your browser's demo storage. You can restore sample defaults anytime in Demo Settings.
                </small>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setProductToDelete(null)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger btn-sm" onClick={confirmDelete}>
                  Yes, Remove Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
