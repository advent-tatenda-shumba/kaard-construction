import React from 'react';
import { ArrowUpRight, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function Footer({ onOpenRfq }) {
  const { motherCompany } = siteContent.brand;

  return (
    <footer id="standards" className="bg-[#0B0C0E] text-white border-t border-neutral-800 architectural-grid-dark relative">
      {/* Accreditation Trust Strip */}
      <div className="border-b border-neutral-800 bg-[#121418]/90 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-widest">
              CERTIFIED STRUCTURAL QUALITY // ACCREDITATIONS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              {siteContent.brand.accreditations.map((acc) => (
                <div key={acc.name} className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E87722] shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {acc.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 block">
                      {acc.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-white p-1 border border-neutral-700 flex items-center justify-center overflow-hidden">
                <img
                  src={siteContent.brand.logoTransparent}
                  alt="Kaard Construction"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  KAARD <span className="text-neutral-400">CONSTRUCTION</span>
                </span>
                <span className="text-[10px] font-mono-tech text-[#E87722] uppercase tracking-widest block">
                  {siteContent.brand.division}
                </span>
              </div>
            </div>

            <p className="text-sm font-editorial-italic font-extralight text-neutral-300 text-lg leading-relaxed max-w-sm">
              “{siteContent.brand.slogan}”
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
              Specialized contractors in heavy structural steel fabrication, high-rise commercial architecture, industrial warehousing, and civil infrastructure throughout Southern Africa.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenRfq()}
                className="inline-flex items-center gap-2 bg-[#E87722] hover:bg-[#CF6415] text-white text-xs font-mono-tech uppercase tracking-wider px-5 py-3 rounded transition-all shadow"
              >
                <span>Request Project Tender</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-widest block">
              NAVIGATE // BLUEPRINT
            </span>
            <ul className="space-y-2.5">
              {siteContent.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-xs font-mono-tech text-neutral-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2 group"
                  >
                    <span className="text-neutral-600 group-hover:text-[#E87722]">›</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Contact & Site Operations */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono-tech text-[#E87722] uppercase tracking-widest block">
              HEADQUARTERS // FIELD OPERATIONS
            </span>
            <div className="space-y-3 text-xs text-neutral-400 font-mono-tech">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E87722] shrink-0 mt-0.5" />
                <span>{siteContent.brand.contact.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E87722] shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/263775157802"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <span>{siteContent.brand.contact.phone}</span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded uppercase">
                    WhatsApp
                  </span>
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#E87722] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${siteContent.brand.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteContent.brand.contact.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-neutral-500 border-t border-neutral-800">
                {siteContent.brand.contact.hours}
              </div>
            </div>
          </div>
        </div>

        {/* Mother Holding Company Portal Connection */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-neutral-400">
          <div className="flex items-center gap-2">
            <span>A proud operating division of</span>
            <a
              href={motherCompany.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E87722] hover:text-white font-bold inline-flex items-center gap-1 transition-colors"
            >
              <span>Kaard Investments</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-neutral-600">({motherCompany.url.replace('https://', '')})</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-500">
            <span>GRID-ID: ZW-HRE-01</span>
            <span>•</span>
            <span className="text-[#E87722]">SWISS ARCHITECTURAL STANDARD</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center sm:text-left text-[11px] font-mono-tech text-neutral-500">
          © {new Date().getFullYear()} KAARD CONSTRUCTION. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
