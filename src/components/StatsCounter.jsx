import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteContent } from '../data/siteContent';

function AnimatedNumber({ value, suffix = '', isDecimal = false, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startVal = 0;
    const endVal = Number(value);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = startVal + (endVal - startVal) * easeProgress;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endVal);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  const formatted = isDecimal
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className="font-extrabold tracking-tight">
      {formatted}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative bg-[#0B0C0E] text-white py-20 sm:py-28 border-b border-neutral-800 architectural-grid-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-neutral-800 pb-6">
          <div>
            <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-widest block mb-1">
              02 // BY THE NUMBERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Metrics of Structural Precision
            </h2>
          </div>
          <p className="text-xs font-mono-tech text-neutral-400 uppercase tracking-wider max-w-xs sm:text-right">
            Verified across all active commercial, industrial & civil sites.
          </p>
        </div>

        {/* 4-Column Exposed Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800 rounded-sm overflow-hidden shadow-2xl">
          {siteContent.stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#0B0C0E] p-8 sm:p-10 flex flex-col justify-between hover:bg-[#121418] transition-colors group relative"
            >
              {/* Corner crosshair accent */}
              <span className="absolute top-2 right-3 font-mono text-[10px] text-neutral-600 group-hover:text-[#E87722] transition-colors">
                +
              </span>

              <div>
                <span className="text-xs font-mono-tech text-[#E87722] tracking-wider uppercase block mb-6">
                  {stat.index}
                </span>

                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white group-hover:text-[#E87722] transition-colors">
                  <AnimatedNumber
                    value={stat.number}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </div>

                <h3 className="text-base font-semibold text-neutral-200 mt-3 tracking-tight">
                  {stat.label}
                </h3>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mt-6 pt-6 border-t border-neutral-800/80">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
