import React, { useState } from 'react';
import { Edit, Trash2, AlertTriangle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminCategories() {
  const { db, addCategory, updateCategory, deleteCategory } = useData();

  const categories = db.categories || [];
  const products = db.products || [];

  const [editingCat, setEditingCat] = useState(null);
  const [newCatName, setNewCatName] = useState('');
  const [catToDelete, setCatToDelete] = useState(null);

  const handleCreateOrUpdate = (e) => {
    e.preventDefault();
    if (editingCat) {
      updateCategory(editingCat.id, {
        name: newCatName.trim(),
        slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      });
      setEditingCat(null);
    } else if (newCatName.trim()) {
      addCategory({
        name: newCatName.trim(),
        slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      });
    }
    setNewCatName('');
  };

  const handleEditClick = (cat) => {
    setEditingCat(cat);
    setNewCatName(cat.name);
  };

  const checkInUseCount = (catSlug) => {
    return products.filter((p) => p.categorySlug === catSlug).length;
  };

  const confirmDelete = () => {
    if (catToDelete) {
      deleteCategory(catToDelete.id);
      setCatToDelete(null);
    }
  };

  return (
    <div className="admin-categories pb-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">Categories & Navigation</h2>
          <p className="text-muted small mb-0">
            Organize store classification taxonomy for mobile phones, accessories, appliances, and SIM cards.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Form: Add / Edit Category */}
        <div className="col-12 col-lg-4">
          <div className="card p-4 border rounded-4 bg-white shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
            <h5 className="fw-bold text-dark mb-3">
              {editingCat ? `Edit Category: ${editingCat.name}` : 'Add New Category'}
            </h5>

            <form onSubmit={handleCreateOrUpdate}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-dark">Category Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Smart Watches"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-brand-primary btn-sm flex-grow-1">
                  {editingCat ? 'Save Changes' : 'Create Category'}
                </button>
                {editingCat && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setEditingCat(null);
                      setNewCatName('');
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Existing Categories Table */}
        <div className="col-12 col-lg-8">
          <div className="card border rounded-4 bg-white shadow-sm overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
            <div className="p-3 border-bottom bg-light d-flex align-items-center justify-content-between">
              <span className="fw-bold text-dark">Configured Categories ({categories.length})</span>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.88rem' }}>
                <thead className="table-light">
                  <tr>
                    <th>Category Name</th>
                    <th>Slug ID</th>
                    <th>Linked Products</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => {
                    const linkedCount = checkInUseCount(cat.slug);
                    return (
                      <tr key={cat.id}>
                        <td className="fw-bold text-dark">{cat.name}</td>
                        <td className="text-muted small"><code>{cat.slug}</code></td>
                        <td>
                          <span className={`badge ${linkedCount > 0 ? 'bg-danger-subtle text-danger' : 'bg-light text-muted border'}`}>
                            {linkedCount} {linkedCount === 1 ? 'Product' : 'Products'}
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm p-1 me-1"
                            onClick={() => handleEditClick(cat)}
                            title="Edit Category"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm p-1"
                            onClick={() => setCatToDelete(cat)}
                            title="Delete Category"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Category Warning Modal */}
      {catToDelete && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }} role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2">
                  <AlertTriangle size={20} />
                  <span>Delete Category Confirmation</span>
                </h5>
                <button type="button" className="btn-close" onClick={() => setCatToDelete(null)} />
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete category <strong>{catToDelete.name}</strong>?
                </p>
                {checkInUseCount(catToDelete.slug) > 0 && (
                  <div className="alert alert-warning small">
                    <strong>Warning:</strong> There are currently <strong>{checkInUseCount(catToDelete.slug)}</strong> products assigned to this category. Deleting it will leave those products without an active category filter.
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCatToDelete(null)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger btn-sm" onClick={confirmDelete}>
                  Proceed with Deletion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
