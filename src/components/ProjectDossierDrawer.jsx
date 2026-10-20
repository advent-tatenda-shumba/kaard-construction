import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Video, Calendar, MapPin, Building, Ruler, CheckCircle2 } from 'lucide-react';

export default function ProjectDossierDrawer({ project, isOpen, onClose, onOpenRfq }) {
  const [activeMedia, setActiveMedia] = useState(0);

  if (!isOpen || !project) return null;

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

        {/* Slide-over Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="w-screen max-w-2xl bg-[#F6F5F2] border-l border-[#0F2C52]/20 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 bg-white border-b border-neutral-200 sticky top-0 z-10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-widest block">
                  PROJECT DOSSIER // {project.blueprintRef}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2C52] tracking-tight mt-1">
                  {project.title}
                </h3>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
                aria-label="Close dossier"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 space-y-8 flex-1">
              {/* Main Photo / Video Display */}
              <div className="space-y-3">
                <div className="h-72 sm:h-84 rounded overflow-hidden border border-neutral-300 shadow-sm bg-black relative">
                  {project.video && activeMedia === 0 ? (
                    <video
                      src={project.video}
                      controls
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={project.gallery ? project.gallery[activeMedia] || project.heroImage : project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Media Thumbnails Selector */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {project.video && (
                    <button
                      onClick={() => setActiveMedia(0)}
                      className={`h-16 w-24 rounded overflow-hidden border shrink-0 relative bg-black transition-all ${
                        activeMedia === 0 ? 'border-[#E87722] ring-2 ring-[#E87722]/30' : 'border-neutral-300 opacity-70'
                      }`}
                    >
                      <video src={project.video} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Video className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  )}

                  {project.gallery &&
                    project.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveMedia(i)}
                        className={`h-16 w-24 rounded overflow-hidden border shrink-0 transition-all ${
                          activeMedia === i ? 'border-[#E87722] ring-2 ring-[#E87722]/30' : 'border-neutral-300 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${project.title} thumbnail ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded bg-white border border-neutral-200">
                <div>
                  <span className="text-[10px] font-mono-tech text-[#58595B] uppercase block">
                    Sector
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0F2C52] block mt-0.5">
                    {project.sector}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech text-[#58595B] uppercase block">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0F2C52] block mt-0.5">
                    {project.location}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech text-[#58595B] uppercase block">
                    Steel & Specs
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#E87722] block mt-0.5">
                    {project.tonnage}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech text-[#58595B] uppercase block">
                    Floor Area
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0F2C52] block mt-0.5">
                    {project.sqm}
                  </span>
                </div>
              </div>

              {/* Scope & Engineering Narrative */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono-tech text-[#58595B] uppercase tracking-wider mb-1">
                    Project Scope & Execution
                  </h4>
                  <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
                    {project.brief}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono-tech text-[#58595B] uppercase tracking-wider mb-1">
                    Kaard Engineering Methodology
                  </h4>
                  <p className="text-sm sm:text-base text-neutral-800 leading-relaxed bg-white p-4 rounded border border-neutral-200">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Verified Metrics Strip */}
              {project.stats && (
                <div className="pt-4 border-t border-neutral-300">
                  <h4 className="text-xs font-mono-tech text-[#58595B] uppercase tracking-wider mb-3">
                    Verified Execution Metrics
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {Object.entries(project.stats).map(([label, val]) => (
                      <div key={label} className="p-3 bg-stone-100 rounded border border-neutral-200">
                        <span className="text-[10px] font-mono-tech text-[#58595B] uppercase block">
                          {label.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#0F2C52] block mt-0.5">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="p-6 bg-white border-t border-neutral-200 flex items-center justify-between gap-4 sticky bottom-0">
              <span className="text-xs font-mono-tech text-[#58595B]">
                REF: {project.blueprintRef} // QC AUDITED
              </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenRfq(project.title);
                }}
                className="inline-flex items-center gap-2 bg-[#E87722] hover:bg-[#CF6415] text-white text-xs sm:text-sm font-mono-tech uppercase tracking-wider px-5 py-3 rounded transition-all shadow"
              >
                <span>Inquire About Similar Build</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
