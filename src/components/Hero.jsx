import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Video } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function Hero({ onOpenRfq }) {
  const [activeBgIndex, setActiveBgIndex] = useState(0);

  const heroBackgrounds = [
    {
      src: siteContent.hero.backgroundImage,
      title: "Commercial HQ Flagship",
      label: "Glass & Steel Superstructure",
      isVideo: false,
    },
    {
      src: siteContent.hero.secondaryImage,
      title: "Active Residential Site",
      label: "Timber Trusses & Sheeting",
      isVideo: false,
    },
    {
      src: "/assets/videos/site-aerial-flight.mp4",
      title: "Drone Aerial Recon",
      label: "Live 4K Site Video Reel",
      isVideo: true,
    },
    {
      src: "/assets/site-scaffolding-banner.jpg",
      title: "Scaffolding & Heavy Shoring",
      label: "Perimeter Safety Systems",
      isVideo: false,
    },
  ];

  // Automatically cycle through backdrops every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between bg-[#0B0C0E] text-white overflow-hidden pt-24 pb-8">
      {/* Background with Slow Ken Burns Zoom / Video Stream */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroBackgrounds.map((bg, idx) => (
          <motion.div
            key={bg.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeBgIndex === idx ? 1 : 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            {bg.isVideo ? (
              <video
                src={bg.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-105"
              />
            ) : (
              <img
                src={bg.src}
                alt={bg.title}
                className="w-full h-full object-cover animate-kenburns scale-105"
              />
            )}
          </motion.div>
        ))}

        {/* Architectural Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/60 to-[#0B0C0E]/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0B0C0E]/30 to-[#0B0C0E]/70" />
        
        {/* Subtle Architectural Grid Lines */}
        <div className="absolute inset-0 architectural-grid-dark opacity-25 pointer-events-none" />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-28 w-full">
        {/* Top Blueprint Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E87722] text-[11px] font-mono-tech tracking-wider uppercase mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#E87722] animate-ping" />
          <span>{siteContent.hero.badge}</span>
        </motion.div>

        {/* Staggered Heading Reveal */}
        <div className="max-w-4xl space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
          >
            {siteContent.hero.titleLead}{" "}
            <span className="block mt-1 font-editorial-italic font-extralight text-stone-200 tracking-normal text-5xl sm:text-7xl lg:text-8xl">
              {siteContent.hero.titleEmphasis}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-neutral-200 font-light max-w-2xl leading-relaxed pt-2"
          >
            {siteContent.hero.description}
          </motion.p>
        </div>

        {/* Hero Action Buttons & Active Site View Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 pb-12"
        >
          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenRfq()}
              className="inline-flex items-center gap-2.5 bg-[#E87722] hover:bg-[#CF6415] text-white text-xs sm:text-sm font-mono-tech uppercase tracking-wider px-6 py-3.5 rounded transition-all duration-200 shadow-lg shadow-[#E87722]/20 group"
            >
              <span>Initialize Project RFQ</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="#current-projects"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-mono-tech uppercase tracking-wider px-6 py-3.5 rounded border border-white/15 transition-all duration-200"
            >
              <span>Current Projects</span>
            </a>
          </div>

          {/* Perspective View Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-lg border border-white/10">
            <span className="text-[10px] font-mono-tech text-neutral-300 uppercase tracking-widest px-2 hidden sm:inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Site Feed // 5s Cycle:</span>
            </span>
            {heroBackgrounds.map((bg, idx) => (
              <button
                key={bg.title}
                onClick={() => setActiveBgIndex(idx)}
                className={`text-[11px] font-mono-tech px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                  activeBgIndex === idx
                    ? 'bg-[#E87722] text-white font-medium shadow-md shadow-[#E87722]/30 ring-1 ring-[#E87722]/50'
                    : 'text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
                title={`View ${bg.title}`}
              >
                {activeBgIndex === idx && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                <span>0{idx + 1} // {bg.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Glassmorphic Bottom Architectural Metrics Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 backdrop-blur-xl border border-white/15 rounded-lg overflow-hidden shadow-2xl">
          {siteContent.hero.metrics.map((metric) => (
            <div
              key={metric.code}
              className="p-4 sm:p-5 bg-[#0B0C0E]/75 hover:bg-[#0B0C0E]/60 transition-colors flex flex-col justify-between"
            >
              <span className="text-[10px] sm:text-xs font-mono-tech text-[#E87722] tracking-wider uppercase">
                {metric.code}
              </span>
              <div className="mt-1">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white block">
                  {metric.value}
                </span>
                <span className="text-xs text-neutral-400 font-normal">
                  {metric.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
