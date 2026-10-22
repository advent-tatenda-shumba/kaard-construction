import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Eye, Video, MapPin, Calendar, Layers } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import ProjectDossierDrawer from './ProjectDossierDrawer';

const categories = [
  'All',
  ...Array.from(new Set(siteContent.projects.map((p) => p.category))),
];

export default function ProjectPortfolio({ onOpenRfq }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === 'All'
      ? siteContent.projects
      : siteContent.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="current-projects" className="relative py-24 sm:py-32 bg-[#F6F5F2] border-b border-[#0F2C52]/10 architectural-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 pb-8 border-b border-[#0F2C52]/10">
          <div>
            <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-widest block mb-2">
              03 // ACTIVE SITES & MASTER BLUEPRINTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F2C52]">
              Current Projects.{" "}
              <span className="font-editorial-italic font-extralight text-[#58595B]">
                Active Developments.
              </span>
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-xl">
              Inspect our active site operations, ongoing structural roofing developments, high-rise steel frameworks, and civil infrastructure projects.
            </p>
          </div>

          {/* ADCO-Style Filter Pills with Animated Pill Background */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white/80 backdrop-blur-md rounded-lg border border-[#0F2C52]/10 shadow-sm">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 text-xs font-mono-tech uppercase tracking-wider rounded-md transition-colors z-10 ${
                    isActive ? 'text-white font-medium' : 'text-[#58595B] hover:text-[#0F2C52]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-[#E87722] rounded-md -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reshuffling Project Grid with Framer Motion layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-white border border-[#0F2C52]/15 shadow-architectural rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-architectural-lg transition-all duration-300 relative crosshair-corner"
              >
                {/* Image Container with 700ms Slow Hover Zoom */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-[#E87722] text-[10px] font-mono-tech uppercase border border-white/10 rounded">
                      {project.status || project.category}
                    </span>

                    {project.video ? (
                      <span className="px-2 py-1 bg-[#E87722] text-white text-[10px] font-mono-tech uppercase font-bold rounded flex items-center gap-1 shadow">
                        <Video className="w-3 h-3" />
                        <span>Drone Reel</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#0F2C52] text-[10px] font-mono-tech uppercase font-bold rounded">
                        {project.tonnage}
                      </span>
                    )}
                  </div>

                  {/* Hover Inspect Prompt */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/35 backdrop-blur-[2px]">
                    <div className="px-4 py-2 bg-[#E87722] text-white text-xs font-mono-tech uppercase tracking-wider rounded inline-flex items-center gap-2 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Project Dossier</span>
                    </div>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono-tech text-neutral-300 uppercase block">
                      {project.location} // {project.year}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mt-0.5">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Description & Meta Details */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                    {project.brief}
                  </p>

                  <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech text-[#58595B]">
                      REF: {project.blueprintRef}
                    </span>
                    <span className="text-xs font-bold text-[#0F2C52] group-hover:text-[#E87722] transition-colors inline-flex items-center gap-1 font-mono-tech">
                      View Specs <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Slide-over Project Detail Dossier Drawer */}
      <ProjectDossierDrawer
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onOpenRfq={onOpenRfq}
      />
    </section>
  );
}
