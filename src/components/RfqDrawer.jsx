import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ArrowLeft, Send, CheckCircle2, ShieldCheck, FileText, Mail, Phone, MessageSquare, Copy } from 'lucide-react';
import { siteContent } from '../data/siteContent';

const TARGET_EMAIL = "office@kaardinvestment.co.zw";
const TARGET_PHONE = "+263 77 515 7802";
const TARGET_WHATSAPP = "263775157802";

export default function RfqDrawer({ isOpen, onClose, initialSector = '' }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    sector: '',
    timeline: '',
    budget: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialSector) {
      setFormData((prev) => ({ ...prev, sector: initialSector }));
    }
  }, [initialSector]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const generateDossierText = (code) => {
    return (
      `*KAARD CONSTRUCTION // PROJECT TENDER RFQ [${code || refCode}]*\n` +
      `----------------------------------------\n` +
      `• Primary Sector: ${formData.sector || 'General Structural / Commercial'}\n` +
      `• Target Timeline: ${formData.timeline || 'Immediate'}\n` +
      `• Budget Allocation: ${formData.budget || 'Standard Capital Tier'}\n` +
      `• Client Name: ${formData.name}\n` +
      `• Corporate Entity: ${formData.company || 'Private Client'}\n` +
      `• Direct Phone: ${formData.phone}\n` +
      `• Direct Email: ${formData.email}\n` +
      `• Preliminary Notes: ${formData.notes || 'None specified'}\n` +
      `----------------------------------------\n` +
      `Official Routing: ${TARGET_EMAIL} | +263 77 515 7802`
    );
  };

  const getWhatsAppLink = (code) => {
    const text = encodeURIComponent(generateDossierText(code));
    return `https://wa.me/${TARGET_WHATSAPP}?text=${text}`;
  };

  const getMailtoLink = (code) => {
    const subject = encodeURIComponent(`Project RFQ [${code || refCode}] - ${formData.name} (${formData.company || 'Inquiry'})`);
    const body = encodeURIComponent(generateDossierText(code));
    return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const randomCode = `KRD-RFQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefCode(randomCode);
    setSubmitted(true);
    // Automatically trigger mailto link so user's client opens draft
    try {
      window.location.href = getMailtoLink(randomCode);
    } catch (err) {
      console.log('Mailto dispatch initiated');
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateDossierText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setCopied(false);
    setFormData({
      sector: '',
      timeline: '',
      budget: '',
      name: '',
      company: '',
      email: '',
      phone: '',
      notes: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="w-screen max-w-xl bg-[#F6F5F2] border-l border-[#0F2C52]/20 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 bg-white border-b border-neutral-200 sticky top-0 z-10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-widest block">
                  PROJECT ESTIMATOR // RFQ
                </span>
                <h3 className="text-xl font-extrabold text-[#0F2C52] tracking-tight">
                  Request an Engineering Tender
                </h3>
                <span className="text-[11px] font-mono-tech text-neutral-500 block mt-0.5">
                  Direct: <span className="text-[#0F2C52] font-semibold">{TARGET_EMAIL}</span> • <span className="text-[#0F2C52] font-semibold">{TARGET_PHONE}</span>
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Progress Bar */}
            {!submitted && (
              <div className="px-6 py-3 bg-[#0F2C52]/5 border-b border-neutral-200 flex items-center justify-between">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono-tech ${
                        step === s
                          ? 'bg-[#E87722] text-white font-bold'
                          : step > s
                          ? 'bg-[#0F2C52] text-white'
                          : 'bg-neutral-200 text-neutral-500'
                      }`}
                    >
                      {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                    </div>
                    <span className="text-[11px] font-mono-tech uppercase text-[#58595B] hidden sm:inline">
                      {s === 1 ? 'Sector' : s === 2 ? 'Scope & Timing' : 'Contact'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Form Body */}
            <div className="p-6 flex-1">
              {submitted ? (
                /* Success Screen with Direct WhatsApp & Email Routing */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-wider block">
                      TENDER DOSSIER REGISTERED // {refCode}
                    </span>
                    <h4 className="text-2xl font-bold text-[#0F2C52]">
                      Thank You, {formData.name || 'Partner'}
                    </h4>
                    <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                      Your engineering inquiry is prepared for direct transmission to our Project Tender Desk. Click below to route instantly via WhatsApp or Email:
                    </p>
                  </div>

                  {/* Direct Action Dispatch Buttons */}
                  <div className="space-y-3 max-w-md mx-auto">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-mono-tech uppercase text-xs tracking-wider px-5 py-3.5 rounded shadow-md transition-all group"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Direct via WhatsApp (+263 77 515 7802)</span>
                    </a>

                    <a
                      href={getMailtoLink()}
                      className="w-full flex items-center justify-center gap-3 bg-[#0F2C52] hover:bg-[#1A4375] text-white font-mono-tech uppercase text-xs tracking-wider px-5 py-3.5 rounded shadow-md transition-all group"
                    >
                      <Mail className="w-4 h-4 text-[#E87722]" />
                      <span>Send via Email ({TARGET_EMAIL})</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-300 font-mono-tech uppercase text-[11px] tracking-wider px-4 py-2.5 rounded transition-all"
                    >
                      <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{copied ? '✓ Copied to Clipboard!' : 'Copy RFQ Dossier Summary'}</span>
                    </button>
                  </div>

                  {/* Summary Dossier Card */}
                  <div className="p-4 bg-white rounded border border-neutral-200 text-left max-w-md mx-auto space-y-2 text-xs font-mono-tech shadow-sm">
                    <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                      <span className="text-neutral-500">Target Email:</span>
                      <span className="font-bold text-[#0F2C52]">{TARGET_EMAIL}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                      <span className="text-neutral-500">WhatsApp / Phone:</span>
                      <span className="font-bold text-[#0F2C52]">{TARGET_PHONE}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                      <span className="text-neutral-500">Sector:</span>
                      <span className="font-bold text-[#0F2C52]">{formData.sector || 'Commercial'}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                      <span className="text-neutral-500">Target Timeline:</span>
                      <span className="font-bold text-[#0F2C52]">{formData.timeline || 'Q1/Q2'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Reference:</span>
                      <span className="font-bold text-[#E87722]">{refCode}</span>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-xs font-mono-tech uppercase tracking-wider rounded transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Sector Selection */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-base font-bold text-[#0F2C52]">
                          Select Primary Construction Sector
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1">
                          Which structural discipline best describes your prospective project?
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {siteContent.rfqOptions.sectors.map((sec) => (
                          <label
                            key={sec.id}
                            className={`p-3.5 rounded border cursor-pointer flex items-center justify-between transition-all ${
                              formData.sector === sec.label
                                ? 'bg-white border-[#E87722] shadow-sm'
                                : 'bg-white/60 border-neutral-200 hover:bg-white'
                            }`}
                          >
                            <span className="text-sm font-medium text-neutral-800">
                              {sec.label}
                            </span>
                            <input
                              type="radio"
                              name="sector"
                              value={sec.label}
                              checked={formData.sector === sec.label}
                              onChange={(e) =>
                                setFormData({ ...formData, sector: e.target.value })
                              }
                              className="text-[#E87722] focus:ring-[#E87722]"
                            />
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Scope, Timeline & Budget */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div>
                        <h4 className="text-base font-bold text-[#0F2C52]">
                          Scope, Timing & Capital Tier
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1">
                          Estimated project parameters for resource scheduling.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-mono-tech text-[#58595B] uppercase block">
                          Target Mobilization Timeline:
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) =>
                            setFormData({ ...formData, timeline: e.target.value })
                          }
                          className="w-full p-3 bg-white border border-neutral-300 rounded text-sm text-neutral-800 focus:outline-none focus:border-[#E87722]"
                        >
                          <option value="">Select Target Timeline</option>
                          {siteContent.rfqOptions.timelines.map((t) => (
                            <option key={t.id} value={t.label}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-mono-tech text-[#58595B] uppercase block">
                          Estimated Capital Allocation / Budget:
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                          }
                          className="w-full p-3 bg-white border border-neutral-300 rounded text-sm text-neutral-800 focus:outline-none focus:border-[#E87722]"
                        >
                          <option value="">Select Capital Range</option>
                          {siteContent.rfqOptions.budgets.map((b) => (
                            <option key={b.id} value={b.label}>
                              {b.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono-tech text-[#58595B] uppercase block">
                          Preliminary Site Address / Notes (Optional):
                        </label>
                        <textarea
                          rows={3}
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                          }
                          placeholder="e.g. 5-storey mixed-use in central precinct, 1200m² site footprint..."
                          className="w-full p-3 bg-white border border-neutral-300 rounded text-sm text-neutral-800 focus:outline-none focus:border-[#E87722]"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-base font-bold text-[#0F2C52]">
                          Contact & Corporate Details
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1">
                          Where should we transmit the preliminary feasibility review?
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-mono-tech text-[#58595B] uppercase block mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="e.g. Marcus Vance"
                            className="w-full p-2.5 bg-white border border-neutral-300 rounded text-sm text-neutral-800 focus:outline-none focus:border-[#E87722]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono-tech text-[#58595B] uppercase block mb-1">
                            Company / Entity
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData({ ...formData, company: e.target.value })
                            }
                            placeholder="e.g. Apex Holdings"
                            className="w-full p-2.5 bg-white border border-neutral-300 rounded text-sm text-neutral-800 focus:outline-none focus:border-[#E87722]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-mono-tech text-[#58595B] uppercase block mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="name@company.com"
                            className="w-full p-2.5 bg-white border border-neutral-300 rounded text-sm text-neutral-800 focus:outline-none focus:border-[#E87722]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono-tech text-[#58595B] uppercase block mb-1">
                            Phone / Mobile *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="+263 77..."
                            className="w-full p-2.5 bg-white border border-neutral-300 rounded text-sm text-neutral-800 focus:outline-none focus:border-[#E87722]"
                          />
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded border border-neutral-200 flex items-start gap-3 mt-4">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-neutral-600 leading-normal">
                          All project blueprints, tenders, and inquiries are protected under strict Kaard Engineering Non-Disclosure Protocols.
                        </span>
                      </div>

                      <div className="p-3 bg-[#0F2C52]/5 rounded border border-[#0F2C52]/15 flex items-start gap-3 mt-2">
                        <Mail className="w-4 h-4 text-[#E87722] shrink-0 mt-0.5" />
                        <div className="text-[11px] text-neutral-700 leading-normal">
                          <span className="font-semibold text-[#0F2C52]">Direct Tender Desk:</span> Automatically routed to <span className="font-mono-tech font-bold text-[#0F2C52]">{TARGET_EMAIL}</span> & WhatsApp <span className="font-mono-tech font-bold text-[#0F2C52]">{TARGET_PHONE}</span>.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </div>

            {/* Footer Buttons */}
            {!submitted && (
              <div className="p-6 bg-white border-t border-neutral-200 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono-tech uppercase text-[#58595B] hover:text-black transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <span className="text-xs font-mono-tech text-neutral-400">
                    Step 1 of 3
                  </span>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={step === 1 && !formData.sector}
                    className="inline-flex items-center gap-2 bg-[#0F2C52] hover:bg-[#1A4375] disabled:opacity-50 text-white text-xs font-mono-tech uppercase tracking-wider px-5 py-2.5 rounded transition-all"
                  >
                    <span>Proceed to Step {step + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.email || !formData.phone}
                    className="inline-flex items-center gap-2 bg-[#E87722] hover:bg-[#CF6415] disabled:opacity-50 text-white text-xs font-mono-tech uppercase tracking-wider px-6 py-2.5 rounded transition-all shadow"
                  >
                    <span>Transmit Tender RFQ</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
