import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/siteContent';

export default function EditorialStatement() {
  const { quote, attribution, division, coordinates } = siteContent.editorialQuote;

  return (
    <section className="relative py-24 sm:py-32 bg-[#F6F5F2] border-y border-[#0F2C52]/10 architectural-grid overflow-hidden">
      {/* Decorative Blueprint Corner Crosshairs */}
      <div className="absolute top-4 left-4 font-mono-tech text-xs text-[#E87722] select-none pointer-events-none">
        + [GRID-REF: 01A-KRD]
      </div>
      <div className="absolute top-4 right-4 font-mono-tech text-xs text-[#E87722] select-none pointer-events-none">
        [TOLERANCE: ±0.00mm] +
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/70 backdrop-blur-md border border-[#0F2C52]/15 p-8 sm:p-14 lg:p-16 shadow-architectural rounded-sm crosshair-corner crosshair-corner-tr"
        >
          {/* Top Section Index */}
          <div className="flex items-center justify-between pb-8 border-b border-[#0F2C52]/10 mb-8 sm:mb-10">
            <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-widest">
              01 // CORE PHILOSOPHY & METRIC RIGOR
            </span>
            <span className="text-xs font-mono-tech text-[#58595B] uppercase tracking-wider hidden sm:inline">
              {coordinates}
            </span>
          </div>

          {/* Oversized Brand Quotation Mark (Matching Font Reference) */}
          <div className="text-[#E87722] text-7xl sm:text-8xl lg:text-9xl font-editorial-italic leading-none h-14 sm:h-20 select-none opacity-85">
            “
          </div>

          {/* High-Impact Statement in Ultra-Light Italic Serif */}
          <blockquote className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-editorial-italic font-extralight text-[#0B0C0E] leading-[1.25] tracking-tight text-neutral-900">
            {quote}
          </blockquote>

          {/* Attribution & Technical Division Tag */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-[#0F2C52]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm sm:text-base text-[#0F2C52] tracking-tight">
                {attribution}
              </p>
              <p className="text-xs font-mono-tech text-[#58595B] uppercase tracking-wider mt-0.5">
                {division}
              </p>
            </div>

            <div className="inline-flex items-center gap-3 self-start sm:self-auto px-3.5 py-1.5 rounded bg-[#0F2C52]/5 border border-[#0F2C52]/10">
              <span className="w-2 h-2 rounded-full bg-[#E87722]" />
              <span className="text-[11px] font-mono-tech text-[#0F2C52] uppercase tracking-wider">
                ISO 9001:2015 AUDITED
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
