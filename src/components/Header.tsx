import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, Calendar, Compass } from 'lucide-react';
import { Page } from '../types';
import { PARK_INFO } from '../data/parkData';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'rates', label: 'Rates' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'attractions', label: 'Local' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full sticky top-0 z-40 transition-all duration-300">
      {/* Top Bar for Direct Contact */}
      <div className="bg-[#1E3126] text-[#E1EAF0] text-xs py-2 px-4 sm:px-10 border-b border-[#2D4636]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a 
              href={`tel:${PARK_INFO.phoneRaw}`} 
              className="flex items-center gap-1.5 hover:text-[#C5A072] transition-colors group"
              id="topbar-phone-link"
            >
              <Phone className="w-3.5 h-3.5 text-[#7C5E43] group-hover:scale-110 transition-transform" />
              <span className="font-medium">{PARK_INFO.phone}</span>
            </a>
            <a 
              href={`mailto:${PARK_INFO.email}`} 
              className="hidden sm:flex items-center gap-1.5 hover:text-[#C5A072] transition-colors"
              id="topbar-email-link"
            >
              <Mail className="w-3.5 h-3.5 text-[#7C5E43]" />
              <span>{PARK_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={PARK_INFO.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-[#E1EAF0] hover:text-[#C5A072] transition-colors"
              id="topbar-map-link"
            >
              <MapPin className="w-3.5 h-3.5 text-[#7C5E43]" />
              <span className="hidden md:inline">{PARK_INFO.address}</span>
              <span className="md:hidden">Blossom, TX</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#FDFCF8]/95 backdrop-blur-md shadow-md py-3 border-b border-[#2D4636]/10' 
          : 'bg-[#FDFCF8] py-4 border-b border-[#2D4636]/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-10 flex items-center justify-between">
          
          {/* Logo / Business Name */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 text-left group focus:outline-none"
            id="header-brand-logo-btn"
          >
            <div className="w-9 h-9 bg-[#2D4636] rounded-full flex items-center justify-center text-white shadow-sm group-hover:bg-[#7C5E43] transition-colors">
              <span className="font-serif italic text-xl leading-none">S</span>
            </div>
            <div>
              <span className="block font-bold text-lg sm:text-xl tracking-tight text-[#2D4636] uppercase leading-none">
                South Fork 82 <span className="font-light text-[#7C5E43]">RV Park</span>
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[#7C5E43] font-semibold mt-0.5">
                Blossom, Texas
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] font-semibold">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`transition-all duration-200 ${
                    isActive
                      ? 'text-[#2D4636] font-bold border-b-2 border-[#7C5E43] pb-0.5'
                      : 'text-[#2D4636]/60 hover:text-[#2D4636]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Book Stay Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              id="header-book-stay-btn"
              className="px-6 py-2.5 bg-[#2D4636] hover:bg-[#7C5E43] text-white text-[11px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 shadow-md transform active:scale-95 flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Stay</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-[#E1EAF0] text-[#2D4636] hover:bg-[#2D4636] hover:text-white focus:outline-none transition-colors"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FDFCF8] border-t border-[#2D4636]/10 px-6 pt-4 pb-6 space-y-3 shadow-lg">
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    id={`mobile-nav-${item.id}`}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-colors ${
                      isActive
                        ? 'bg-[#2D4636] text-white font-bold'
                        : 'text-[#2D4636]/70 hover:bg-[#E1EAF0] hover:text-[#2D4636]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#2D4636]/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                id="mobile-book-now-btn"
                className="w-full flex items-center justify-center gap-2 bg-[#7C5E43] hover:bg-[#2D4636] text-white py-3 rounded-full text-xs uppercase tracking-widest font-bold shadow-md transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Stay Now</span>
              </button>

              <a
                href={`tel:${PARK_INFO.phoneRaw}`}
                id="mobile-call-btn"
                className="w-full flex items-center justify-center gap-2 border-2 border-[#2D4636] text-[#2D4636] py-2.5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#2D4636] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call {PARK_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

