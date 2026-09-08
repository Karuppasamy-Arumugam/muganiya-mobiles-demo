import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { generateChatbotReply } from '../../services/chatbotService';

export default function FloatingActions({ currentProduct = null, currentVariant = null }) {
  const { db } = useData();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: db.chatbotSettings?.welcomeMessage || 'Namaste! Welcome to Muganiyaa-Mobiles. How can I help you today? You can ask about our latest phones, screen repairs, EMI offers, or shop timings.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatMessagesEndRef = useRef(null);

  const chatbotEnabled = db.chatbotSettings?.enabled ?? true;
  const contact = db.contactSettings || {};
  const whatsappNumber = contact.whatsapp?.replace(/[^0-9]/g, '');

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isChatOpen) {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  // Check admin path
  const isAdmin = location.pathname.startsWith('/admin');


  // Construct context-aware WhatsApp text
  const getWhatsAppMessage = () => {
    if (currentProduct) {
      const variantInfo = currentVariant
        ? ` (${currentVariant.color}, ${currentVariant.ram || ''} ${currentVariant.storage || ''})`
        : '';
      return encodeURIComponent(
        `Hello Muganiyaa-Mobiles! I'm enquiring about ${currentProduct.name}${variantInfo} priced at ₹${(currentVariant?.sellingPrice || currentProduct.sellingPrice)?.toLocaleString('en-IN')}. Is this in stock?`
      );
    }
    return encodeURIComponent("Hello Muganiyaa-Mobiles! I'd like to enquire about your product availability and store services.");
  };

  const handleWhatsAppClick = () => {
    if (whatsappNumber && whatsappNumber.length >= 10) {
      const url = `https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Local enquiry preview fallback when number is missing/unconfigured
      setShowWhatsAppModal(true);
    }
  };

  const messageIdCounter = useRef(1);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    // Add user message
    const userMsg = { id: `msg-${messageIdCounter.current++}`, sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsThinking(true);

    // Simulated response delay (realistic typing feel)
    setTimeout(() => {
      const reply = generateChatbotReply(text, {
        products: db.products || [],
        offers: db.offers || [],
        contactSettings: db.contactSettings || {},
        services: db.services || []
      });

      const botMsg = {
        id: `msg-bot-${messageIdCounter.current++}`,
        sender: 'bot',
        text: reply.text,
        products: reply.products || [],
        cta: reply.cta || null,
        actionType: reply.actionType
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, 450);
  };

  const starterQuestions = db.chatbotSettings?.starterQuestions || [
    'Show phones under ₹20,000',
    'Do you repair displays?',
    'What EMI options are available?',
    'How can I contact the shop?'
  ];

  // Do not render floating action buttons on admin portal routes
  if (isAdmin) return null;

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="floating-actions-container" aria-label="Customer support options">
        {/* WhatsApp Button */}
        <button
          type="button"
          className="floating-btn-whatsapp"
          onClick={handleWhatsAppClick}
          aria-label="Enquire on WhatsApp"
          title="Direct WhatsApp Enquiry"
        >
          <MessageCircle size={26} />
        </button>

        {/* Chatbot Button */}
        {chatbotEnabled && (
          <button
            type="button"
            className="floating-btn-chatbot position-relative"
            onClick={() => setIsChatOpen(!isChatOpen)}
            aria-expanded={isChatOpen}
            aria-label="Open Muganiyaa Assistant"
            title="Muganiyaa Assistant Demo"
          >
            {isChatOpen ? <X size={26} /> : <Bot size={26} />}
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
              <span className="visually-hidden">Assistant Online</span>
            </span>
          </button>
        )}
      </div>

      {/* Local WhatsApp Preview Modal (Fallback) */}
      {showWhatsAppModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }} role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                  <MessageCircle size={22} className="text-success" />
                  <span>WhatsApp Enquiry Preview</span>
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowWhatsAppModal(false)} />
              </div>
              <div className="modal-body">
                <p className="text-muted small">
                  In a production installation, this will open WhatsApp with your configured store phone number. Here is the pre-composed customer message that will be sent:
                </p>
                <div className="p-3 bg-light rounded border text-break font-monospace small">
                  {decodeURIComponent(getWhatsAppMessage())}
                </div>
                <div className="mt-3 p-2 border-start border-warning border-3 bg-warning-subtle small">
                  <strong>Shop Phone:</strong> {contact.phone || '+91 98765 43210'} (Editable in Owner Admin)
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowWhatsAppModal(false)}>
                  Close
                </button>
                <Link to="/contact" className="btn btn-brand-primary btn-sm" onClick={() => setShowWhatsAppModal(false)}>
                  Use Contact Form Instead
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Chatbot Window */}
      {chatbotEnabled && isChatOpen && (
        <div className="chatbot-popup" role="dialog" aria-label="Muganiyaa Assistant Chat">
          {/* Header */}
          <div className="p-3 bg-white border-bottom d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div
                className="p-2 rounded-circle"
                style={{ backgroundColor: 'var(--soft-blush)', color: 'var(--primary-red)' }}
              >
                <Bot size={20} />
              </div>
              <div>
                <h6 className="mb-0 fw-bold d-flex align-items-center gap-1" style={{ fontSize: '0.95rem' }}>
                  <span>{db.chatbotSettings?.assistantName || 'Muganiyaa Assistant'}</span>
                  <span className="badge bg-secondary-subtle text-secondary" style={{ fontSize: '0.65rem' }}>
                    Demo
                  </span>
                </h6>
                <small className="text-success d-flex align-items-center gap-1" style={{ fontSize: '0.72rem' }}>
                  <span className="d-inline-block rounded-circle bg-success" style={{ width: '6px', height: '6px' }} />
                  Local Catalogue Intelligent Simulation
                </small>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-light btn-sm rounded-circle p-1"
              onClick={() => setIsChatOpen(false)}
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-grow-1 overflow-y-auto p-3 d-flex flex-column gap-3" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`d-flex flex-column ${msg.sender === 'user' ? 'align-items-end' : 'align-items-start'}`}
              >
                <div
                  className="p-3 rounded shadow-sm"
                  style={{
                    maxWidth: '86%',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    backgroundColor: msg.sender === 'user' ? 'var(--primary-red)' : '#FFFFFF',
                    color: msg.sender === 'user' ? '#FFFFFF' : 'var(--main-text)',
                    borderRadius:
                      msg.sender === 'user'
                        ? '14px 14px 2px 14px'
                        : '14px 14px 14px 2px',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {msg.text}
                </div>

                {/* Clickable Recommended Products inside Chat */}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-2 w-100 d-flex flex-column gap-2" style={{ maxWidth: '95%' }}>
                    {msg.products.map((p) => (
                      <div
                        key={p.id}
                        className="card p-2 border bg-white shadow-sm"
                        style={{ borderColor: 'var(--border-color)', borderRadius: 'var(--radius-sm)' }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={p.coverImage}
                            alt={p.name}
                            style={{ width: '45px', height: '45px', objectFit: 'contain' }}
                          />
                          <div className="flex-grow-1 min-w-0">
                            <div className="fw-bold text-truncate" style={{ fontSize: '0.8rem' }}>
                              {p.name}
                            </div>
                            <div className="text-danger fw-bold" style={{ fontSize: '0.82rem' }}>
                              ₹{p.sellingPrice?.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <Link
                            to={`/products/${p.slug}`}
                            className="btn btn-brand-soft btn-sm p-1 px-2 text-decoration-none"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => setIsChatOpen(false)}
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Link inside Chat */}
                {msg.cta && (
                  <div className="mt-2">
                    <Link
                      to={msg.cta.link}
                      className="btn btn-brand-primary btn-sm d-inline-flex align-items-center gap-1"
                      style={{ fontSize: '0.78rem' }}
                      onClick={() => setIsChatOpen(false)}
                    >
                      <span>{msg.cta.label}</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="d-flex align-items-center gap-2 text-muted small">
                <span className="spinner-grow spinner-grow-sm text-danger" role="status" />
                <span>Muganiyaa Assistant is checking catalogue...</span>
              </div>
            )}
            <div ref={chatMessagesEndRef} />
          </div>

          {/* Starter Chips */}
          <div className="px-3 py-2 bg-white border-top border-bottom overflow-x-auto d-flex gap-2 flex-nowrap">
            {starterQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill text-nowrap"
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}
                onClick={() => handleSendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2 bg-white d-flex gap-2 align-items-center"
          >
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Ask about phones, repairs, EMI..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{ borderRadius: 'var(--radius-sm)' }}
              disabled={isThinking}
            />
            <button
              type="submit"
              className="btn btn-brand-primary btn-sm px-3"
              disabled={!inputVal.trim() || isThinking}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
