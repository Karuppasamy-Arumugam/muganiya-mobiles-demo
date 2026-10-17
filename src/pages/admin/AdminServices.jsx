import React, { useEffect, useState } from 'react';
import {
  Save,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Smartphone,
  Tablet,
  Tv,
  Headphones,
  BatteryCharging,
  Cable,
  ShieldCheck,
  Wrench,
  Radio,
  Zap,
  Wifi,
  Monitor,
  Laptop,
  ShoppingBag,
  CreditCard,
  Camera,
  Speaker,
  Bluetooth,
  Plug,
  Settings
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const serviceIcons = {
  Smartphone,
  Tablet,
  Tv,
  Headphones,
  BatteryCharging,
  Cable,
  ShieldCheck,
  Wrench,
  Radio,
  Zap,
  Wifi,
  Monitor,
  Laptop,
  ShoppingBag,
  CreditCard,
  Camera,
  Speaker,
  Bluetooth,
  Plug,
  Settings
};

const iconOptions = [
  { name: 'Smartphone', label: 'Mobile phones' },
  { name: 'Tablet', label: 'Tablets' },
  { name: 'Tv', label: 'TVs' },
  { name: 'Headphones', label: 'Audio' },
  { name: 'BatteryCharging', label: 'Battery & charging' },
  { name: 'Cable', label: 'Cables' },
  { name: 'ShieldCheck', label: 'Warranty & protection' },
  { name: 'Wrench', label: 'Repair' },
  { name: 'Radio', label: 'SIM & connectivity' },
  { name: 'Zap', label: 'Recharge & power' },
  { name: 'Wifi', label: 'Network & internet' },
  { name: 'Monitor', label: 'Displays' },
  { name: 'Laptop', label: 'Computers' },
  { name: 'ShoppingBag', label: 'Retail & shopping' },
  { name: 'CreditCard', label: 'Payments & EMI' },
  { name: 'Camera', label: 'Camera service' },
  { name: 'Speaker', label: 'Speakers' },
  { name: 'Bluetooth', label: 'Bluetooth devices' },
  { name: 'Plug', label: 'Electrical service' },
  { name: 'Settings', label: 'Other service' }
];

const createEmptyService = () => ({
  title: '',
  subtitle: '',
  features: [''],
  enquiryService: '',
  icon: 'Wrench',
  active: true
});

function IconPicker({ value, onChange }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {iconOptions.map(({ name, label }) => {
        const Icon = serviceIcons[name];
        const selected = value === name;

        return (
          <button
            key={name}
            type="button"
            className={`btn d-flex flex-column align-items-center gap-1 ${
              selected ? 'btn-danger' : 'btn-outline-secondary'
            }`}
            style={{ width: 82, minHeight: 72 }}
            onClick={() => onChange(name)}
            aria-pressed={selected}
            title={label}
          >
            <Icon size={20} />
            <span style={{ fontSize: 10 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function FeatureFields({ features, onChange }) {
  const safeFeatures = Array.isArray(features) ? features : [];

  const updateFeature = (index, value) => {
    onChange(
      safeFeatures.map((feature, featureIndex) =>
        featureIndex === index ? value : feature
      )
    );
  };

  const addFeature = () => onChange([...safeFeatures, '']);

  const removeFeature = (index) => {
    onChange(safeFeatures.filter((_, featureIndex) => featureIndex !== index));
  };

  return (
    <div>
      <label className="form-label fw-semibold">Features</label>

      <div className="d-flex flex-column gap-2">
        {safeFeatures.map((feature, index) => (
          <div key={index} className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control"
              value={feature || ''}
              placeholder={`Feature ${index + 1}`}
              onChange={(event) => updateFeature(index, event.target.value)}
            />

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => removeFeature(index)}
              aria-label={`Remove feature ${index + 1}`}
              title="Remove feature"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-sm btn-outline-secondary mt-2"
        onClick={addFeature}
      >
        <Plus size={15} className="me-1" />
        Add feature
      </button>
    </div>
  );
}

export default function AdminServices() {
  const { db, addService, updateService, deleteService } = useData();

  const [services, setServices] = useState(db.services || []);
  const [newService, setNewService] = useState(createEmptyService());
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setServices(db.services || []);
  }, [db.services]);

  const updateLocalService = (index, field, value) => {
    setServices((current) =>
      current.map((service, serviceIndex) =>
        serviceIndex === index
          ? { ...service, [field]: value }
          : service
      )
    );
  };

  const updateLocalFeatures = (index, features) => {
    updateLocalService(index, 'features', features);
  };

  const handleAddService = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsAdding(true);

    const cleanedService = {
      ...newService,
      title: newService.title.trim(),
      features: (newService.features || [])
        .map((feature) => feature.trim())
        .filter(Boolean)
    };

    try {
      await addService(cleanedService);
      setNewService(createEmptyService());
      setIsAddFormOpen(false);
      setMessage('Service added successfully.');
    } catch (error) {
      console.error('Could not add service:', error);
      setMessage(error.message || 'Could not add the service.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleSaveService = async (service) => {
    setMessage('');
    setSavingId(service.id);

    const cleanedService = {
      ...service,
      title: service.title.trim(),
      features: (service.features || [])
        .map((feature) => feature.trim())
        .filter(Boolean)
    };

    try {
      await updateService(service.id, cleanedService);
      setEditingId(null);
      setMessage('Service updated successfully.');
    } catch (error) {
      console.error('Could not update service:', error);
      setMessage(error.message || 'Could not update the service.');
    } finally {
      setSavingId(null);
    }
  };

  const handleCancelEdit = () => {
    setServices(db.services || []);
    setEditingId(null);
    setMessage('');
  };

  const handleDeleteService = async (service) => {
    const confirmed = window.confirm(
      `Delete "${service.title}"? It will be removed from the public website.`
    );

    if (!confirmed) return;

    setMessage('');
    setSavingId(service.id);

    try {
      await deleteService(service.id);
      setMessage('Service deleted successfully.');
    } catch (error) {
      console.error('Could not delete service:', error);
      setMessage(error.message || 'Could not delete the service.');
    } finally {
      setSavingId(null);
    }
  };

  const activeCount = services.filter((service) => service.active).length;

  return (
    <div className="admin-services pb-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2">
            <h2 className="fw-bold text-dark mb-1 fs-3">Store Services</h2>
            <span className="badge rounded-pill bg-light text-dark border">
              {services.length} total
            </span>
          </div>
          <p className="text-muted small mb-0">
            Manage the services shown on your public website. {activeCount} currently visible.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-brand-primary d-inline-flex align-items-center gap-2"
          onClick={() => {
            setIsAddFormOpen((open) => !open);
            setMessage('');
          }}
        >
          {isAddFormOpen ? <X size={17} /> : <Plus size={17} />}
          {isAddFormOpen ? 'Close Form' : 'Add New Service'}
        </button>
      </div>

      {message && (
        <div className="alert alert-info" role="status">
          {message}
        </div>
      )}

      {isAddFormOpen && (
        <div className="card border rounded-4 bg-white shadow-sm p-4 mb-4">
          <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
            <div>
              <h3 className="h5 fw-bold mb-1">Add a Service</h3>
              <p className="small text-muted mb-0">
                Add the service details and choose an icon for its public card.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-light"
              onClick={() => setIsAddFormOpen(false)}
              aria-label="Close add service form"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleAddService}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Service title</label>
                <input
                  className="form-control"
                  value={newService.title}
                  onChange={(event) =>
                    setNewService((current) => ({
                      ...current,
                      title: event.target.value
                    }))
                  }
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Enquiry tag</label>
                <input
                  className="form-control"
                  value={newService.enquiryService}
                  onChange={(event) =>
                    setNewService((current) => ({
                      ...current,
                      enquiryService: event.target.value
                    }))
                  }
                  placeholder="For example: Smartphone Repair"
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={newService.subtitle}
                  onChange={(event) =>
                    setNewService((current) => ({
                      ...current,
                      subtitle: event.target.value
                    }))
                  }
                />
              </div>

              <div className="col-12">
                <FeatureFields
                  features={newService.features}
                  onChange={(features) =>
                    setNewService((current) => ({ ...current, features }))
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Choose an icon</label>
                <IconPicker
                  value={newService.icon}
                  onChange={(icon) =>
                    setNewService((current) => ({ ...current, icon }))
                  }
                />
              </div>

              <div className="col-12 d-flex justify-content-end gap-2 pt-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setNewService(createEmptyService());
                    setIsAddFormOpen(false);
                  }}
                  disabled={isAdding}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-brand-primary d-inline-flex align-items-center gap-2"
                  disabled={isAdding}
                >
                  <Plus size={16} />
                  {isAdding ? 'Adding...' : 'Add Service'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {services.length === 0 && !isAddFormOpen && (
        <div className="card border rounded-4 bg-white p-5 text-center">
          <div className="mx-auto mb-3 p-3 rounded-circle bg-light text-danger">
            <Wrench size={28} />
          </div>
          <h3 className="h5 fw-bold">No services yet</h3>
          <p className="text-muted mb-3">
            Add your first service to show it on the public website.
          </p>
          <button
            type="button"
            className="btn btn-brand-primary mx-auto d-inline-flex align-items-center gap-2"
            onClick={() => setIsAddFormOpen(true)}
          >
            <Plus size={17} />
            Add New Service
          </button>
        </div>
      )}

      <div className="row g-4">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.icon] || Wrench;
          const isEditing = editingId === service.id;
          const isSaving = savingId === service.id;

          return (
            <div
              key={service.id || service.slug || index}
              className="col-12 col-xl-6"
            >
              <article className="card border rounded-4 bg-white shadow-sm p-4 h-100">
                <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-3 rounded-3 bg-light text-danger">
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="small text-muted">
                        Service #{index + 1}
                      </div>
                      {!isEditing && (
                        <span
                          className={`badge ${
                            service.active ? 'bg-success' : 'bg-secondary'
                          }`}
                        >
                          {service.active ? 'Visible on website' : 'Hidden'}
                        </span>
                      )}
                    </div>
                  </div>

                  {!isEditing && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2"
                      onClick={() => {
                        setMessage('');
                        setEditingId(service.id);
                      }}
                    >
                      <Pencil size={15} />
                      Edit
                    </button>
                  )}
                </div>

                {!isEditing ? (
                  <>
                    <h3 className="h5 fw-bold mb-2">{service.title}</h3>
                    <p className="text-muted mb-3">
                      {service.subtitle || 'No description added.'}
                    </p>

                    {(service.features || []).length > 0 && (
                      <ul className="list-unstyled d-flex flex-column gap-2 mb-3">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={`${service.id}-feature-${featureIndex}`}
                            className="d-flex gap-2"
                          >
                            <Check
                              size={17}
                              className="text-success flex-shrink-0 mt-1"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="small text-muted mt-auto">
                      Enquiry tag:{' '}
                      <span className="fw-semibold text-dark">
                        {service.enquiryService || 'Not set'}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Service title
                      </label>
                      <input
                        className="form-control"
                        value={service.title || ''}
                        onChange={(event) =>
                          updateLocalService(index, 'title', event.target.value)
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={service.subtitle || ''}
                        onChange={(event) =>
                          updateLocalService(
                            index,
                            'subtitle',
                            event.target.value
                          )
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <FeatureFields
                        features={service.features}
                        onChange={(features) =>
                          updateLocalFeatures(index, features)
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Enquiry tag
                      </label>
                      <input
                        className="form-control"
                        value={service.enquiryService || ''}
                        onChange={(event) =>
                          updateLocalService(
                            index,
                            'enquiryService',
                            event.target.value
                          )
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Choose an icon
                      </label>
                      <IconPicker
                        value={service.icon || 'Wrench'}
                        onChange={(icon) =>
                          updateLocalService(index, 'icon', icon)
                        }
                      />
                    </div>

                    <label className="form-check d-flex align-items-center gap-2 mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={Boolean(service.active)}
                        onChange={(event) =>
                          updateLocalService(
                            index,
                            'active',
                            event.target.checked
                          )
                        }
                      />
                      <span>Show this service on the website</span>
                    </label>

                    <div className="d-flex flex-wrap gap-2 mt-auto">
                      <button
                        type="button"
                        className="btn btn-brand-primary d-inline-flex align-items-center gap-2"
                        onClick={() => handleSaveService(service)}
                        disabled={isSaving}
                      >
                        <Save size={16} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-secondary d-inline-flex align-items-center gap-2"
                        onClick={handleCancelEdit}
                        disabled={isSaving}
                      >
                        <X size={16} />
                        Cancel
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger d-inline-flex align-items-center gap-2 ms-md-auto"
                        onClick={() => handleDeleteService(service)}
                        disabled={isSaving}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}