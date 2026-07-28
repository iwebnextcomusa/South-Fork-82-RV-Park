import React, { useState } from 'react';
import { Phone, Mail, MapPin, Compass, ShieldCheck, FileText, X } from 'lucide-react';
import { Page } from '../types';
import { PARK_INFO } from '../data/parkData';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleLink = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D4636] text-[#E1EAF0] pt-16 pb-12 border-t border-[#2D4636]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Park Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7C5E43] flex items-center justify-center text-white font-serif italic text-2xl shadow-md">
                S
              </div>
              <span className="font-bold text-xl uppercase tracking-tight text-white">
                South Fork 82 <span className="font-light text-[#C5A072]">RV Park</span>
              </span>
            </div>
            <p className="text-xs text-[#E1EAF0]/80 leading-relaxed font-light">
              A welcoming, peaceful haven in Blossom, TX for overnight, weekly, and long-term RV stays under the Texas stars.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                id="footer-book-btn"
                className="inline-flex items-center gap-2 bg-[#7C5E43] hover:bg-white hover:text-[#2D4636] text-white px-5 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-bold transition-all shadow-md"
              >
                Book Your Stay
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#C5A072] mb-4 border-b border-white/10 pb-2">
              Explore Our Park
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => handleLink('home')} className="hover:text-white transition-colors" id="footer-link-home">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('about')} className="hover:text-white transition-colors" id="footer-link-about">
                  About Us & Story
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('amenities')} className="hover:text-white transition-colors" id="footer-link-amenities">
                  Full Park Amenities
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('rates')} className="hover:text-white transition-colors" id="footer-link-rates">
                  Rates & Pricing
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('gallery')} className="hover:text-white transition-colors" id="footer-link-gallery">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('attractions')} className="hover:text-white transition-colors" id="footer-link-attractions">
                  Local East Texas
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('contact')} className="hover:text-white transition-colors" id="footer-link-contact">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#C5A072] mb-4 border-b border-white/10 pb-2">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A072] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Physical Address:</strong>
                  <span className="text-white/80">{PARK_INFO.address}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A072] shrink-0" />
                <div>
                  <strong className="block text-white font-semibold">Phone:</strong>
                  <a href={`tel:${PARK_INFO.phoneRaw}`} className="hover:text-white text-lg font-bold transition-colors">
                    {PARK_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A072] shrink-0" />
                <div>
                  <strong className="block text-white font-semibold">Email:</strong>
                  <a href={`mailto:${PARK_INFO.email}`} className="hover:text-white transition-colors break-all text-white/80">
                    {PARK_INFO.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & Nearby */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#C5A072] mb-4 border-b border-white/10 pb-2">
              Office Hours & Nearby
            </h4>
            <p className="text-xs text-white/80 mb-3 leading-relaxed">
              <strong className="text-white">Check-In / Guest Hours:</strong><br />
              Mon – Sun: 8:00 AM – 7:00 PM<br />
              <span className="text-[11px] text-[#C5A072] mt-1 block italic font-serif">Late arrivals accommodated with prior call.</span>
            </p>
            <div className="pt-2">
              <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-2">Nearby Attractions</p>
              <p className="text-xs font-serif italic text-white/90">Pat Mayse Lake &bull; Historic Paris Texas Square</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar - Centered Footer Requirement */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70 text-center md:text-left">
          <div>
            <p>© {new Date().getFullYear()} {PARK_INFO.name}. All Rights Reserved.</p>
          </div>

          {/* Requirement #8: Developed by iWebNext centered */}
          <div className="text-center font-medium text-sm text-white/90">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-[#C5A072] underline hover:text-white transition-colors font-bold">iWebNext</a>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setModalType('privacy')} className="hover:text-white transition-colors flex items-center gap-1 text-[11px] uppercase tracking-wider" id="privacy-policy-btn">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A072]" />
              Privacy Policy
            </button>
            <button onClick={() => setModalType('terms')} className="hover:text-white transition-colors flex items-center gap-1 text-[11px] uppercase tracking-wider" id="terms-conditions-btn">
              <FileText className="w-3.5 h-3.5 text-[#C5A072]" />
              Terms
            </button>
          </div>
        </div>

      </div>

      {/* Privacy / Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] text-[#2D4636] max-w-2xl w-full rounded-3xl p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl border border-[#2D4636]/10">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-200 transition-colors"
              id="close-policy-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'privacy' ? (
              <div>
                <h3 className="font-serif italic text-2xl font-bold text-[#2D4636] mb-4">Privacy Policy</h3>
                <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                  <p><strong>South Fork 82 RV Park</strong> respects your privacy. This policy details how we collect and protect personal information obtained through our website.</p>
                  <h4 className="font-bold text-[#2D4636] uppercase tracking-wider text-[11px] mt-3">Information We Collect</h4>
                  <p>When you fill out a reservation inquiry or contact form, we collect your name, phone number, email address, stay dates, and RV specifications solely to process your stay.</p>
                  <h4 className="font-bold text-[#2D4636] uppercase tracking-wider text-[11px] mt-3">Use of Information</h4>
                  <p>Your details are strictly used for booking management, guest communication, and park service updates. We never sell, rent, or trade guest information to third parties.</p>
                  <h4 className="font-bold text-[#2D4636] uppercase tracking-wider text-[11px] mt-3">Security</h4>
                  <p>We maintain strict administrative safeguards to protect personal data from unauthorized disclosure.</p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-serif italic text-2xl font-bold text-[#2D4636] mb-4">Terms & Conditions</h3>
                <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                  <p>Welcome to <strong>South Fork 82 RV Park</strong> in Blossom, TX. By reserving or staying at our park, guests agree to abide by the following park guidelines:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Check-In/Check-Out:</strong> Check-in begins at 1:00 PM; Check-out is at 11:00 AM unless prior arrangements are confirmed.</li>
                    <li><strong>Quiet Hours:</strong> Observed between 10:00 PM and 7:00 AM daily.</li>
                    <li><strong>Pets:</strong> Friendly pets are welcome! Must be kept on a leash at all times and cleaned up after immediately.</li>
                    <li><strong>Speed Limit:</strong> 5 MPH throughout all park roadways for safety.</li>
                    <li><strong>Rates:</strong> Pricing is subject to change. Monthly stay rates are subject to metered electric billing.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
