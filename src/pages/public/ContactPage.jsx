import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  Wrench
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const { db, addEnquiry } = useData();

  const preselectedService = searchParams.get('service') || '';
  const preselectedProduct = searchParams.get('product') || '';

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    enquiryType: preselectedService ? 'Store Service' : preselectedProduct ? 'Product Availability' : 'General Enquiry',
    selectedProductOrService: preselectedService || preselectedProduct || '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedEnquiryId, setSavedEnquiryId] = useState(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        enquiryType: 'Store Service',
        selectedProductOrService: preselectedService
      }));
    } else if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        enquiryType: 'Product Availability',
        selectedProductOrService: preselectedProduct
      }));
    }
  }, [preselectedService, preselectedProduct]);

  const contact = db.contactSettings || {};

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Please enter your name';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter a contact phone number';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please write a brief enquiry message';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    // Save to local demo database
    const saved = addEnquiry(formData);
    setSavedEnquiryId(saved.id);
    setIsSubmitted(true);
  };

  return (
    <div className="contact-page pb-5">
      {/* Page Header */}
      <div className="bg-white border-bottom py-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small mb-2">
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item active text-dark" aria-current="page">
                Contact Us & Repairs
              </li>
            </ol>
          </nav>
          <h1 className="fw-bold fs-3 text-dark mb-1">Contact Muganiyaa-Mobiles</h1>
          <p className="text-muted small mb-0">
            Submit a repair request, ask about phone stock, or check in-store offers with our retail team.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Contact Details & Map Area */}
          <div className="col-12 col-lg-5">
            <div className="card p-4 border bg-white rounded-4 mb-4 shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
              <h4 className="fw-bold mb-3 text-dark">Showroom Information</h4>

              <div className="d-flex flex-column gap-3 text-muted">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-circle bg-light text-danger flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Store Address</h6>
                    <p className="small mb-0">{contact.address || 'Main Road, Demo City, Tamil Nadu 600001'}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-circle bg-light text-danger flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Telephone & Helpline</h6>
                    <a href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`} className="small text-danger fw-semibold text-decoration-none">
                      {contact.phone || '+91 98765 43210'}
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-circle bg-light text-danger flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Email Support</h6>
                    <p className="small mb-0">{contact.email || 'contact@muganiyaamobiles.demo'}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-circle bg-light text-danger flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Opening Hours</h6>
                    <p className="small mb-0">{contact.hours || 'Mon-Sat: 9:30 AM - 9:30 PM | Sun: 10:00 AM - 8:00 PM'}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Action */}
              <div className="mt-4 pt-3 border-top">
                <a
                  href={`https://wa.me/${contact.whatsapp?.replace(/[^0-9]/g, '') || '919876543210'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Map Area / Details coming soon */}
            <div className="card p-4 border rounded-4 text-center" style={{ backgroundColor: 'var(--secondary-bg)', borderColor: 'var(--border-color)' }}>
              <div className="p-3 rounded-circle bg-white d-inline-block mx-auto mb-2 text-danger shadow-sm">
                <MapPin size={28} />
              </div>
              <h6 className="fw-bold text-dark mb-1">Store Location Map</h6>
              <p className="text-muted small mb-0">
                Interactive Google Map location link will be linked upon physical store verification.
              </p>
            </div>
          </div>

          {/* Enquiry Form Column */}
          <div className="col-12 col-lg-7">
            <div className="card p-4 p-md-5 border rounded-4 bg-white shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
              {isSubmitted ? (
                <div className="py-4 text-center">
                  <div className="p-3 rounded-circle bg-success-subtle text-success d-inline-block mb-3">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="fw-bold text-dark mb-2">Enquiry Received!</h3>
                  <p className="text-muted small mb-4" style={{ maxWidth: '440px', margin: '0 auto' }}>
                    Thank you, <strong>{formData.customerName}</strong>! Your enquiry has been saved to the shop's local inbox (ID: <code>{savedEnquiryId}</code>).
                  </p>

                  <div className="alert alert-info py-2 px-3 small d-inline-block mb-4">
                    <strong>Demo Notice:</strong> This enquiry is saved in your browser's local store and is viewable immediately in the <strong>Admin Enquiries</strong> panel. No real email or SMS was transmitted.
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-brand-primary btn-sm px-4 py-2 me-2"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          customerName: '',
                          phone: '',
                          email: '',
                          enquiryType: 'General Enquiry',
                          selectedProductOrService: '',
                          message: ''
                        });
                      }}
                    >
                      Submit Another Enquiry
                    </button>
                    <Link to="/admin/enquiries" className="btn btn-outline-secondary btn-sm px-3 py-2">
                      View in Demo Admin
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <span className="badge-blush text-uppercase fw-bold mb-1 d-inline-block">Customer Care</span>
                      <h3 className="fw-bold text-dark mb-0">Send an Enquiry</h3>
                    </div>
                    <Wrench size={24} className="text-danger" />
                  </div>
                  <p className="text-muted small mb-4">
                    Fill in your details below. For screen or hardware repairs, please include your phone model in the message.
                  </p>

                  <div className="row g-3">
                    {/* Customer Name */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="customerName" className="form-label small fw-bold text-dark">
                        Your Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        id="customerName"
                        type="text"
                        className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      />
                      {errors.customerName && <div className="invalid-feedback small">{errors.customerName}</div>}
                    </div>

                    {/* Phone Number */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="phone" className="form-label small fw-bold text-dark">
                        Mobile Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="e.g. +91 98410 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      {errors.phone && <div className="invalid-feedback small">{errors.phone}</div>}
                    </div>

                    {/* Email (Optional) */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="email" className="form-label small fw-bold text-dark">
                        Email Address <span className="text-muted fw-normal">(Optional)</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="e.g. name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <div className="invalid-feedback small">{errors.email}</div>}
                    </div>

                    {/* Enquiry Type */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="enquiryType" className="form-label small fw-bold text-dark">
                        Enquiry Type
                      </label>
                      <select
                        id="enquiryType"
                        className="form-select"
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                      >
                        <option value="Smartphone Repair">Smartphone Repair & Display</option>
                        <option value="SIM & MNP Porting">SIM Activation & MNP Porting</option>
                        <option value="Product Availability">Product Price & Stock Availability</option>
                        <option value="EMI & Financing">EMI / Card Offers / Trade-in</option>
                        <option value="Recharge & Bills">Instant Recharge & DTH Bills</option>
                        <option value="General Enquiry">General Store Enquiry</option>
                      </select>
                    </div>

                    {/* Optional Product / Service Selection */}
                    <div className="col-12">
                      <label htmlFor="selectedProductOrService" className="form-label small fw-bold text-dark">
                        Specific Model / Item / Service
                      </label>
                      <input
                        id="selectedProductOrService"
                        type="text"
                        className="form-control"
                        placeholder="e.g. Samsung Galaxy S24 (Onyx Black) or Cracked Screen"
                        value={formData.selectedProductOrService}
                        onChange={(e) => setFormData({ ...formData, selectedProductOrService: e.target.value })}
                      />
                    </div>

                    {/* Message */}
                    <div className="col-12">
                      <label htmlFor="message" className="form-label small fw-bold text-dark">
                        Your Message / Issue Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        placeholder="Describe what you are looking for or the fault symptoms (e.g. screen flickering, blank display, battery drain, porting from Airtel to Jio)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                      {errors.message && <div className="invalid-feedback small">{errors.message}</div>}
                    </div>

                    {/* Submit Button & Disclosure */}
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-brand-primary w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                        <Send size={18} />
                        <span>Submit Store Enquiry</span>
                      </button>
                      <small className="text-muted d-block text-center mt-2" style={{ fontSize: '0.75rem' }}>
                        *Notice: This is a client demo prototype. Submitted data is stored locally in this browser's demo store.
                      </small>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
