import React, { useState } from 'react';
import { Save, CheckCircle2, Bot, Plus, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminChatbot() {
  const { db, updateChatbotSettings } = useData();
  const [settings, setSettings] = useState(db.chatbotSettings || {});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleStarterQuestionChange = (index, value) => {
    const updated = [...(settings.starterQuestions || [])];
    updated[index] = value;
    setSettings({ ...settings, starterQuestions: updated });
  };

  const handleAddQuestion = () => {
    const updated = [...(settings.starterQuestions || []), ''];
    setSettings({ ...settings, starterQuestions: updated });
  };

  const handleRemoveQuestion = (index) => {
    const updated = (settings.starterQuestions || []).filter((_, i) => i !== index);
    setSettings({ ...settings, starterQuestions: updated });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateChatbotSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="admin-chatbot pb-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 fs-3">Muganiyaa Assistant Configuration</h2>
          <p className="text-muted small mb-0">
            Configure simulated AI chatbot prompts, starter questions, and response behaviors.
          </p>
        </div>

        <button type="button" className="btn btn-brand-primary btn-sm d-inline-flex align-items-center gap-1" onClick={handleSave}>
          <Save size={16} />
          <span>Save Assistant Settings</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4 shadow-sm">
          <CheckCircle2 size={18} />
          <span>Chatbot settings updated! Testing changes immediately in floating assistant window.</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="card p-4 border rounded-4 bg-white shadow-sm mb-4" style={{ borderColor: 'var(--border-color)' }}>
          <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
            <div className="d-flex align-items-center gap-3">
              <div className="p-3 rounded-circle bg-danger-subtle text-danger">
                <Bot size={28} />
              </div>
              <div>
                <h5 className="fw-bold text-dark mb-0">Assistant Visibility & Status</h5>
                <small className="text-muted">Controls whether the floating chat widget appears on public store pages</small>
              </div>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="chatbotEnabled"
                checked={settings.enabled ?? true}
                onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
              />
              <label className="form-check-label fw-bold small" htmlFor="chatbotEnabled">
                {settings.enabled ? 'Enabled (Online)' : 'Disabled'}
              </label>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-dark">Assistant Display Name *</label>
              <input
                type="text"
                className="form-control"
                value={settings.assistantName || 'Muganiyaa Assistant'}
                onChange={(e) => setSettings({ ...settings, assistantName: e.target.value })}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-dark">Greeting / Welcome Message *</label>
              <textarea
                rows={3}
                className="form-control"
                value={settings.welcomeMessage || ''}
                onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-dark">Fallback Message (When no match is found) *</label>
              <textarea
                rows={3}
                className="form-control"
                value={settings.fallbackMessage || ''}
                onChange={(e) => setSettings({ ...settings, fallbackMessage: e.target.value })}
                required
              />
            </div>

            {/* Quick Starter Chips */}
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <label className="form-label small fw-bold text-dark mb-0">Suggested Starter Prompts</label>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm p-1 px-2 d-inline-flex align-items-center gap-1"
                  onClick={handleAddQuestion}
                >
                  <Plus size={14} />
                  <span>Add Starter Prompt</span>
                </button>
              </div>

              <div className="d-flex flex-column gap-2">
                {settings.starterQuestions?.map((q, qIdx) => (
                  <div key={qIdx} className="d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={q}
                      onChange={(e) => handleStarterQuestionChange(qIdx, e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm p-1"
                      onClick={() => handleRemoveQuestion(qIdx)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
