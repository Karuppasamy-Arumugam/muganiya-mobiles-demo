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
import { isSupabaseConfigured } from '../../services/supabaseClient';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailNotice, setEmailNotice] = useState('');
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
  const mapSearchQuery = contact.mapQuery || contact.address || 'Muganiyaa Mobiles';
  const encodedMapQuery = encodeURIComponent(mapSearchQuery);
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodedMapQuery}&output=embed`;
  const savedMapUrl = String(contact.mapUrl || '').trim();
  const hasVerifiedMapUrl = /^https?:\/\//i.test(savedMapUrl);
  const mapLink = hasVerifiedMapUrl
    ? savedMapUrl
    : `https://www.google.com/maps/search/?api=1&query=${encodedMapQuery}`;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitError('');
    setEmailNotice('');
    setIsSubmitting(true);

    try {
      // Save first so the admin inbox still receives the enquiry if email is unavailable.
      const saved = await addEnquiry(formData);
      setSavedEnquiryId(saved.id);

      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
      if (accessKey) {
        try {
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              access_key: accessKey,
              name: formData.customerName.trim(),
              phone: formData.phone.trim(),
              email: formData.email.trim(),
              subject: `Website enquiry: ${formData.enquiryType}`,
              enquiry_type: formData.enquiryType,
              product_or_service: formData.selectedProductOrService,
              message: formData.message.trim(),
              from_name: 'Muganiyaa-Mobiles Website'
            })
          });
          const result = await response.json();
          if (!response.ok || !result.success) throw new Error(result.message || 'Email notification failed.');
          setEmailSent(true);
        } catch (emailError) {
          console.error('Enquiry was saved, but its email notification failed:', emailError);
          setEmailSent(false);
          setEmailNotice('Your enquiry is saved in the Admin Dashboard, but the email notification could not be sent.');
        }
      } else {
        setEmailSent(false);
        setEmailNotice('Your enquiry is saved in the Admin Dashboard. Email notifications are not configured yet.');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Could not submit enquiry:', error);
      setSubmitError(error.message || 'We could not save your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

            {/* Map preview and verified showroom directions */}
            <div className="card border rounded-4 overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
              <div className="p-3 d-flex align-items-center justify-content-between gap-2">
                <div>
                  <h6 className="fw-bold text-dark mb-1">Store Location Map</h6>
                  <p className="text-muted small mb-0">Map preview for {mapSearchQuery}</p>
                </div>
                <MapPin size={22} className="text-danger flex-shrink-0" />
              </div>
              <iframe
                title="Muganiyaa-Mobiles showroom map"
                src={mapEmbedUrl}
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="p-3">
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger btn-sm w-100">
                  <MapPin size={15} className="me-1" />
                  {hasVerifiedMapUrl ? 'Open Verified Location in Google Maps' : 'Search This Address in Google Maps'}
                </a>
                {!hasVerifiedMapUrl && <small className="text-muted d-block mt-2">Add a verified Google Maps share link in Admin → Contact & Hours to link directly to the showroom pin.</small>}
              </div>
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
                    Thank you, <strong>{formData.customerName}</strong>! Your enquiry has been received (ID: <code>{savedEnquiryId}</code>).
                  </p>

                  <div className={`alert ${emailNotice ? 'alert-warning' : 'alert-success'} py-2 px-3 small d-inline-block mb-4`}>
                    {isSupabaseConfigured
                      ? 'Your enquiry is saved in the Supabase Admin Dashboard.'
                      : 'Demo mode: your enquiry is saved in this browser only.'}
                    {emailSent && ' An email notification was sent to the shop.'}
                    {emailNotice && ` ${emailNotice}`}
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-brand-primary btn-sm px-4 py-2 me-2"
                      onClick={() => {
                        setIsSubmitted(false);
                        setEmailSent(false);
                        setEmailNotice('');
                        setSubmitError('');
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

                  {submitError && <div className="alert alert-danger py-2 small" role="alert">{submitError}</div>}

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
                      <button type="submit" disabled={isSubmitting} className="btn btn-brand-primary w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                        <Send size={18} />
                        <span>{isSubmitting ? 'Submitting…' : 'Submit Store Enquiry'}</span>
                      </button>
                      <small className="text-muted d-block text-center mt-2" style={{ fontSize: '0.75rem' }}>
                        {isSupabaseConfigured
                          ? 'Your enquiry will be saved securely for the Admin Dashboard. We may also email the shop.'
                          : '*Notice: Demo mode stores enquiries only in this browser until Supabase is configured.'}
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
