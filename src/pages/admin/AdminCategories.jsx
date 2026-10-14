import React, { useState } from 'react';
import { Edit, Trash2, AlertTriangle } from 'lucide-react';
import { useData } from '../../context/DataContext';

const makeCategorySlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function AdminCategories() {
  const { db, addCategory, updateCategory, deleteCategory } = useData();

  const categories = db.categories || [];
  const products = db.products || [];

  const [editingCat, setEditingCat] = useState(null);
  const [newCatName, setNewCatName] = useState('');
  const [catToDelete, setCatToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const checkInUseCount = (catSlug) =>
    products.filter((product) => product.categorySlug === catSlug).length;

  const handleCreateOrUpdate = async (event) => {
    event.preventDefault();

    const name = newCatName.trim();
    if (!name) return;

    setError('');
    setSuccess('');
    setIsSaving(true);

    const categoryData = {
      name,
      slug: makeCategorySlug(name)
    };

    try {
      if (editingCat) {
        await updateCategory(editingCat.id, categoryData);
        setSuccess(`Category "${name}" was updated.`);
      } else {
        await addCategory(categoryData);
        setSuccess(`Category "${name}" was added.`);
      }

      setEditingCat(null);
      setNewCatName('');
    } catch (saveError) {
      setError(saveError.message || 'Could not save the category.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditClick = (category) => {
    setError('');
    setSuccess('');
    setEditingCat(category);
    setNewCatName(category.name);
  };

  const handleCancelEdit = () => {
    setEditingCat(null);
    setNewCatName('');
    setError('');
    setSuccess('');
  };

  const confirmDelete = async () => {
    if (!catToDelete) return;

    setError('');
    setSuccess('');
    setDeletingId(catToDelete.id);

    try {
      await deleteCategory(catToDelete.id);
      setSuccess(`Category "${catToDelete.name}" was deleted.`);
      setCatToDelete(null);
    } catch (deleteError) {
      setError(deleteError.message || 'Could not delete the category.');
    } finally {
      setDeletingId(null);
    }
  };

  const deletingCategoryProductCount = catToDelete
    ? checkInUseCount(catToDelete.slug)
    : 0;

  return (
    <div className="admin-categories pb-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">
            Categories &amp; Navigation
          </h2>
          <p className="text-muted small mb-0">
            Organize store classification taxonomy for mobile phones,
            accessories, appliances, and SIM cards.
          </p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger py-2 small" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success py-2 small" role="status">
          {success}
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div
            className="card p-4 border rounded-4 bg-white shadow-sm"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <h5 className="fw-bold text-dark mb-3">
              {editingCat ? `Edit Category: ${editingCat.name}` : 'Add New Category'}
            </h5>

            <form onSubmit={handleCreateOrUpdate}>
              <div className="mb-3">
                <label
                  htmlFor="categoryName"
                  className="form-label small fw-bold text-dark"
                >
                  Category Name *
                </label>
                <input
                  id="categoryName"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Smart Watches"
                  value={newCatName}
                  onChange={(event) => setNewCatName(event.target.value)}
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-brand-primary btn-sm flex-grow-1"
                  disabled={isSaving || !newCatName.trim()}
                >
                  {isSaving
                    ? 'Saving…'
                    : editingCat
                      ? 'Save Changes'
                      : 'Create Category'}
                </button>

                {editingCat && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div
            className="card border rounded-4 bg-white shadow-sm overflow-hidden"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <div className="p-3 border-bottom bg-light d-flex align-items-center justify-content-between">
              <span className="fw-bold text-dark">
                Configured Categories ({categories.length})
              </span>
            </div>

            <div className="table-responsive">
              <table
                className="table table-hover align-middle mb-0"
                style={{ fontSize: '0.88rem' }}
              >
                <thead className="table-light">
                  <tr>
                    <th>Category Name</th>
                    <th>Slug ID</th>
                    <th>Linked Products</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => {
                    const linkedCount = checkInUseCount(category.slug);

                    return (
                      <tr key={category.id}>
                        <td className="fw-bold text-dark">{category.name}</td>
                        <td className="text-muted small">
                          <code>{category.slug}</code>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              linkedCount > 0
                                ? 'bg-danger-subtle text-danger'
                                : 'bg-light text-muted border'
                            }`}
                          >
                            {linkedCount}{' '}
                            {linkedCount === 1 ? 'Product' : 'Products'}
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm p-1 me-1"
                            onClick={() => handleEditClick(category)}
                            title="Edit Category"
                            disabled={isSaving || deletingId !== null}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm p-1"
                            onClick={() => {
                              setError('');
                              setSuccess('');
                              setCatToDelete(category);
                            }}
                            title="Delete Category"
                            disabled={isSaving || deletingId !== null}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {categories.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-muted small">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {catToDelete && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="deleteCategoryTitle"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  id="deleteCategoryTitle"
                  className="modal-title fw-bold text-danger d-flex align-items-center gap-2"
                >
                  <AlertTriangle size={20} />
                  <span>Delete Category Confirmation</span>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setCatToDelete(null);
                    setError('');
                  }}
                  disabled={deletingId === catToDelete.id}
                  aria-label="Close"
                />
              </div>

              <div className="modal-body">
                <p>
                  Are you sure you want to delete category{' '}
                  <strong>{catToDelete.name}</strong>?
                </p>

                {deletingCategoryProductCount > 0 && (
                  <div className="alert alert-warning small">
                    This category has{' '}
                    <strong>{deletingCategoryProductCount}</strong> linked
                    product(s). Reassign those products before deleting it.
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger small mb-0" role="alert">
                    {error}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setCatToDelete(null);
                    setError('');
                  }}
                  disabled={deletingId === catToDelete.id}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={confirmDelete}
                  disabled={
                    deletingId === catToDelete.id ||
                    deletingCategoryProductCount > 0
                  }
                >
                  {deletingId === catToDelete.id
                    ? 'Deleting…'
                    : 'Proceed with Deletion'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}