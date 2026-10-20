import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck, Layers, Cpu } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function CapabilitiesSplit({ onOpenRfq }) {
  const [selectedId, setSelectedId] = useState(siteContent.capabilities[0].id);

  const activeCapability =
    siteContent.capabilities.find((c) => c.id === selectedId) ||
    siteContent.capabilities[0];

  return (
    <section id="capabilities" className="relative py-24 sm:py-32 bg-[#F6F5F2] border-b border-[#0F2C52]/10 architectural-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-widest block mb-2">
            03 // CAPABILITY ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F2C52]">
            How We Build.{" "}
            <span className="font-editorial-italic font-extralight text-[#58595B]">
              Integrated Disciplines.
            </span>
          </h2>
          <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
            From precision in-house heavy steel fabrication to site civil containment and certified turnkey delivery, Kaard Construction coordinates every phase under unified engineering governance.
          </p>
        </div>

        {/* Split Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Capability Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {siteContent.capabilities.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  onMouseEnter={() => setSelectedId(item.id)}
                  className={`cursor-pointer p-5 sm:p-6 rounded-sm border transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-white shadow-architectural border-[#0F2C52]/20 translate-x-1'
                      : 'bg-white/40 border-neutral-200/80 hover:bg-white/70 hover:border-neutral-300'
                  }`}
                >
                  {/* Active Indicator Bar on Left */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeCapabilityIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#E87722]"
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono-tech text-[#E87722] tracking-wider uppercase block mb-1">
                        {item.index} {item.tagline}
                      </span>
                      <h3
                        className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                          isSelected ? 'text-[#0F2C52]' : 'text-neutral-700'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <ArrowRight
                      className={`w-5 h-5 transition-transform shrink-0 mt-1 ${
                        isSelected
                          ? 'text-[#E87722] translate-x-1'
                          : 'text-neutral-400 opacity-60'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Dynamic Preview Panel */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="bg-white border border-[#0F2C52]/15 shadow-architectural-lg rounded-sm overflow-hidden crosshair-corner crosshair-corner-tr">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCapability.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col"
                >
                  {/* Photo Display with Technical Overlay Tag */}
                  <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={activeCapability.image}
                      alt={activeCapability.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Blueprint Index Watermark */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-[#E87722] text-xs font-mono-tech uppercase">
                      {activeCapability.index} SPECIFICATION ACTIVE
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-wider block">
                        {activeCapability.tagline}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {activeCapability.title}
                      </h4>
                    </div>
                  </div>

                  {/* Content Scope & Deliverables */}
                  <div className="p-6 sm:p-8 space-y-6 bg-white">
                    <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                      {activeCapability.description}
                    </p>

                    {/* Scope Checklist */}
                    <div>
                      <h5 className="text-xs font-mono-tech text-[#58595B] uppercase tracking-wider mb-3">
                        Engineering Deliverables & Protocols:
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeCapability.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#E87722] shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-neutral-800">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Specifications Bar */}
                    <div className="pt-6 border-t border-neutral-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-sm border border-neutral-200">
                      {Object.entries(activeCapability.specs).map(([key, val]) => (
                        <div key={key}>
                          <span className="text-[10px] font-mono-tech text-[#58595B] uppercase tracking-wider block">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-[#0F2C52] block mt-0.5">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-[#58595B]">
                        Ready to tender or detail specs?
                      </span>
                      <button
                        onClick={() => onOpenRfq(activeCapability.title)}
                        className="inline-flex items-center gap-2 bg-[#0F2C52] hover:bg-[#1A4375] text-white text-xs font-mono-tech uppercase tracking-wider px-4 py-2.5 rounded transition-all"
                      >
                        <span>Inquire About This Service</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#E87722]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
