import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, HardHat, Coffee, Award } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function WorkforceBento() {
  const { badge, title, description, bentoCards } = siteContent.workforceStandards;

  return (
    <section id="workforce" className="relative py-24 sm:py-32 bg-[#F6F5F2] border-b border-[#0F2C52]/10 architectural-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-widest block mb-2">
            06 // FIELD PROTOCOLS & WORKWEAR
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F2C52]">
            {title.split('Driven by')[0]}
            <span className="font-editorial-italic font-extralight text-[#58595B]">
              Driven by Human Precision.
            </span>
          </h2>
          <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Asymmetrical Architectural Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {bentoCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`${card.size} bg-white border border-[#0F2C52]/15 shadow-architectural rounded-sm overflow-hidden flex flex-col justify-between group hover:shadow-architectural-lg transition-all duration-300 relative crosshair-corner`}
            >
              {/* Photo Header */}
              <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-neutral-900">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-[#E87722] text-[10px] font-mono-tech uppercase border border-white/10 rounded">
                    {card.badge}
                  </span>
                </div>

                {/* Title inside image banner */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-mono-tech text-neutral-300 uppercase block">
                    {card.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <p className="text-neutral-700 text-sm leading-relaxed">
                  {card.description}
                </p>

                {card.metrics && (
                  <div className="pt-4 border-t border-neutral-200/80 flex flex-wrap gap-2">
                    {card.metrics.map((m, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0F2C52]/5 text-[#0F2C52] text-xs font-mono-tech"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E87722]" />
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                {card.quote && (
                  <div className="pt-3 border-t border-neutral-200/80 bg-stone-50 p-3 rounded border border-neutral-200">
                    <p className="text-xs font-editorial-italic text-[#0F2C52]">
                      “{card.quote}”
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
