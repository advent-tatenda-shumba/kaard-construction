import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronsLeftRight, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function ComparisonSlider() {
  const { title, subtitle, beforeImage, afterImage, beforeLabel, afterLabel, specs } =
    siteContent.transformationComparison;

  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleStart = () => {
    isDragging.current = true;
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  return (
    <section id="transformation" className="relative py-24 sm:py-32 bg-[#0B0C0E] text-white border-b border-neutral-800 architectural-grid-dark select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-widest block mb-2">
            05 // STRUCTURAL METAMORPHOSIS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {title.split(':')[0]}:{" "}
            <span className="font-editorial-italic font-extralight text-stone-300">
              {title.split(':')[1] || 'Precision Execution'}
            </span>
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Interactive Comparison Window */}
        <div
          ref={containerRef}
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onMouseMove={handleMouseMove}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={handleTouchMove}
          className="relative h-[380px] sm:h-[500px] lg:h-[580px] w-full rounded-sm overflow-hidden border border-neutral-700 shadow-2xl cursor-ew-resize bg-black"
        >
          {/* AFTER Image (Completed HQ - Background) */}
          <div className="absolute inset-0">
            <img
              src={afterImage}
              alt="Completed Commercial HQ"
              className="w-full h-full object-cover pointer-events-none"
            />
            {/* Label Top-Right */}
            <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/20 text-xs font-mono-tech uppercase tracking-wider text-white">
              {afterLabel}
            </div>
          </div>

          {/* BEFORE Image (Structural Progress - Clipped Foreground) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={beforeImage}
              alt="Structural Site Progress"
              className="w-full h-full object-cover pointer-events-none"
            />
            {/* Label Top-Left */}
            <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/20 text-xs font-mono-tech uppercase tracking-wider text-[#E87722]">
              {beforeLabel}
            </div>
          </div>

          {/* Draggable Divider Line & Orange I-Beam Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#E87722] shadow-[0_0_15px_rgba(232,119,34,0.6)]"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Center Handle Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E87722] border-2 border-white text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95">
              <ChevronsLeftRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          {/* Bottom Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-mono-tech text-neutral-300 uppercase tracking-wider pointer-events-none hidden sm:block">
            ◀ Drag slider to compare phases ({Math.round(sliderPosition)}%) ▶
          </div>
        </div>

        {/* Technical Specification Matrix Below Slider */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800 rounded-sm overflow-hidden">
          {specs.map((spec) => (
            <div key={spec.label} className="p-4 bg-[#121418]">
              <span className="text-[10px] font-mono-tech text-neutral-400 uppercase tracking-wider block">
                {spec.label}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white block mt-1">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
