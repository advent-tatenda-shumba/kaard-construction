import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SiteVideoRecon from './components/SiteVideoRecon';
import EditorialStatement from './components/EditorialStatement';
import StatsCounter from './components/StatsCounter';
import CapabilitiesSplit from './components/CapabilitiesSplit';
import ProjectPortfolio from './components/ProjectPortfolio';
import ComparisonSlider from './components/ComparisonSlider';
import WorkforceBento from './components/WorkforceBento';
import Footer from './components/Footer';
import RfqDrawer from './components/RfqDrawer';

export default function App() {
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqInitialSector, setRfqInitialSector] = useState('');

  // Global Smooth Inertial Scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const handleOpenRfq = (sector = '') => {
    setRfqInitialSector(sector);
    setRfqOpen(true);
  };

  const handleCloseRfq = () => {
    setRfqOpen(false);
    setRfqInitialSector('');
  };

  return (
    <div className="relative min-h-screen bg-[#F6F5F2] text-[#0B0C0E] font-sans selection:bg-[#E87722] selection:text-white">
      {/* 2px Fixed Brand Accent Scroll Progress Bar */}
      <ScrollProgress />

      {/* Sticky Architectural Navbar */}
      <Navbar onOpenRfq={handleOpenRfq} />

      {/* Main Page Layout */}
      <main>
        {/* Full-Bleed Architectural Hero with Live Metrics & Drone Feed */}
        <Hero onOpenRfq={handleOpenRfq} />

        {/* Live Field Telemetry & Drone Recon Reel */}
        <SiteVideoRecon />

        {/* Newspaper Editorial Statement (Newsreader Ultra-Light Italic) */}
        <EditorialStatement />

        {/* Suffolk-Style "By The Numbers" 4-Column Metric Strip */}
        <StatsCounter />

        {/* Interactive "How We Build" Split-Screen Capability Switcher */}
        <CapabilitiesSplit onOpenRfq={handleOpenRfq} />

        {/* ADCO-Style Filterable Project Portfolio Grid with DJI Aerials */}
        <ProjectPortfolio onOpenRfq={handleOpenRfq} />

        {/* Draggable Before / Completed Site Transformation Slider */}
        <ComparisonSlider />

        {/* Asymmetrical Field Standards & Workforce Bento Grid */}
        <WorkforceBento />
      </main>

      {/* Deep Carbon Architectural Footer with Mother Holding Trust Strip */}
      <Footer onOpenRfq={handleOpenRfq} />

      {/* Interactive Multi-Step RFQ / Estimator Drawer */}
      <RfqDrawer
        isOpen={rfqOpen}
        onClose={handleCloseRfq}
        initialSector={rfqInitialSector}
      />
    </div>
  );
}
