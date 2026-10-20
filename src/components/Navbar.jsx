import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function Navbar({ onOpenRfq }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F6F5F2]/90 backdrop-blur-md shadow-sm border-b border-[#0F2C52]/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Title */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded bg-white shadow-sm border border-neutral-200/80 p-1 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <img
                  src={siteContent.brand.logoTransparent}
                  alt="Kaard Construction Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-bold tracking-tight text-base sm:text-lg transition-colors ${
                    scrolled ? 'text-[#0F2C52]' : 'text-white drop-shadow-md'
                  }`}
                >
                  KAARD <span className="font-semibold text-[#58595B] group-hover:text-[#E87722] transition-colors">CONSTRUCTION</span>
                </span>
                <span
                  className={`text-[10px] font-mono-tech tracking-wider uppercase transition-colors ${
                    scrolled ? 'text-[#58595B]' : 'text-neutral-300'
                  }`}
                >
                  Division of Kaard Investments
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {siteContent.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-mono-tech uppercase tracking-wider transition-all duration-200 relative group py-1 ${
                    scrolled
                      ? 'text-[#58595B] hover:text-[#0F2C52]'
                      : 'text-neutral-200 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E87722] transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Action: Request Quote Button & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenRfq()}
                className="hidden sm:inline-flex items-center gap-2 bg-[#E87722] hover:bg-[#CF6415] text-white text-xs font-mono-tech uppercase tracking-wider px-4 py-2.5 rounded transition-all duration-200 shadow-sm hover:shadow group hover:translate-y-[-1px]"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className={`lg:hidden p-2 rounded transition-colors ${
                  scrolled
                    ? 'text-[#0F2C52] hover:bg-black/5'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B0C0E]/95 backdrop-blur-xl border-b border-neutral-800 px-4 pt-4 pb-6 mt-3 space-y-3">
            <div className="flex flex-col space-y-2">
              {siteContent.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-neutral-300 hover:text-[#E87722] text-sm font-mono-tech tracking-wider uppercase py-2 border-b border-neutral-800/60"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRfq();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#E87722] hover:bg-[#CF6415] text-white text-sm font-mono-tech uppercase tracking-wider py-3 rounded"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
