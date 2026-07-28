import React from 'react';
import { Heart, ShieldCheck, Smile, MapPin, Compass, CheckCircle2, Phone } from 'lucide-react';
import { Page } from '../types';
import { PARK_INFO } from '../data/parkData';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="space-y-16 py-8 pb-16 max-w-7xl mx-auto px-6 sm:px-10">
      
      {/* Page Banner */}
      <div className="bg-[#2D4636] text-[#FDFCF8] rounded-[2.5rem] p-8 sm:p-14 shadow-xl border border-white/10 relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C5A072] block">
            About South Fork 82 RV Park
          </span>
          <h1 className="font-serif italic text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Authentic Texas Hospitality & Peaceful Country Living
          </h1>
          <p className="text-xs sm:text-sm text-[#E1EAF0]/90 leading-relaxed font-light">
            Welcome to South Fork 82 RV Park in Blossom, Texas—where quiet rural charm meets clean, modern convenience.
          </p>
        </div>
      </div>

      {/* Main Story & Values Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Story Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#7C5E43] block">
              Our Story
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl font-normal text-[#2D4636]">
              Built with Passion for RVer Comfort
            </h2>
          </div>

          <p className="text-[#2D4636]/80 text-sm leading-relaxed">
            South Fork 82 RV Park was established with a simple, clear purpose: to provide travelers, workers, and full-time RVers with a clean, safe, and genuinely peaceful place to park their rigs in East Texas.
          </p>

          <p className="text-[#2D4636]/80 text-sm leading-relaxed">
            Situated right off US Highway 82 in Blossom, TX, our park eliminates the hassle of navigating tight city turns or unpaved back roads. We’ve designed our grounds to accommodate rigs of all sizes with full 30 and 50 amp hookups, clean water connections, reliable sewer outlets, and fast Wi-Fi.
          </p>

          <p className="text-[#2D4636]/80 text-sm leading-relaxed">
            We believe in honest, friendly Texas hospitality. Whether you're staying for one night on a cross-country journey, working a local contract near Paris, TX, or looking for a long-term peaceful neighborhood, you’ll find a welcoming community here.
          </p>

          {/* Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-[#F4F2EA] p-5 rounded-2xl border border-[#2D4636]/10">
              <Smile className="w-5 h-5 text-[#7C5E43] mb-2" />
              <h4 className="font-bold text-[#2D4636] text-xs uppercase tracking-wider">Friendly Service</h4>
              <p className="text-xs text-[#2D4636]/70 mt-1">Attentive management dedicated to guest satisfaction.</p>
            </div>

            <div className="bg-[#F4F2EA] p-5 rounded-2xl border border-[#2D4636]/10">
              <ShieldCheck className="w-5 h-5 text-[#7C5E43] mb-2" />
              <h4 className="font-bold text-[#2D4636] text-xs uppercase tracking-wider">Quiet Surroundings</h4>
              <p className="text-xs text-[#2D4636]/70 mt-1">Peaceful nights away from noise and heavy traffic.</p>
            </div>

            <div className="bg-[#F4F2EA] p-5 rounded-2xl border border-[#2D4636]/10">
              <Heart className="w-5 h-5 text-[#7C5E43] mb-2" />
              <h4 className="font-bold text-[#2D4636] text-xs uppercase tracking-wider">Pet Friendly</h4>
              <p className="text-xs text-[#2D4636]/70 mt-1">Grassy walking areas for your four-legged companions.</p>
            </div>
          </div>
        </div>

        {/* Featured Images Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#2D4636]/10">
            <img
              src={PARK_INFO.images.about}
              alt="South Fork 82 RV Park grounds view"
              referrerPolicy="no-referrer"
              className="w-full h-72 object-cover"
            />
          </div>

          <div className="bg-[#2D4636] text-[#FDFCF8] p-6 rounded-3xl space-y-4 border border-white/10">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#C5A072]">
              Quick Park Summary
            </h3>
            <ul className="text-xs space-y-2 text-[#E1EAF0]/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A072]" /> Located at 1105 W. Front, Blossom, TX 75416
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A072]" /> Full Hookups (30 & 50 Amp, Water, Sewer)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A072]" /> On-Site Laundry & High-Speed Wi-Fi
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A072]" /> Minutes from Pat Mayse Lake & Paris, TX
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full bg-[#7C5E43] hover:bg-white hover:text-[#2D4636] text-white py-3 rounded-full font-bold text-xs uppercase tracking-widest text-center shadow-md transition-colors"
                id="about-reserve-btn"
              >
                Reserve Your Site
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Welcoming Image Gallery Preview */}
      <div className="space-y-6 pt-10 border-t border-[#2D4636]/10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#7C5E43] block">
            Visual Experience
          </span>
          <h2 className="font-serif italic text-3xl font-normal text-[#2D4636]">
            Welcoming Park Atmosphere
          </h2>
          <p className="text-[#2D4636]/70 text-xs sm:text-sm">
            Take a glance at our spacious grounds, clean utility pedestals, and East Texas surroundings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-3xl overflow-hidden shadow-md group border border-[#2D4636]/10">
            <img
              src={PARK_INFO.images.hero}
              alt="RV park sites"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-md group border border-[#2D4636]/10">
            <img
              src={PARK_INFO.images.amenities}
              alt="Full hookup utility pedestals"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-md group border border-[#2D4636]/10">
            <img
              src={PARK_INFO.images.lakeFishing}
              alt="Nearby fishing spots"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('gallery')}
            className="px-8 py-3 bg-[#2D4636] hover:bg-[#7C5E43] text-white rounded-full text-xs uppercase tracking-widest font-bold shadow-md transition-colors"
            id="about-full-gallery-btn"
          >
            View Full Photo Gallery
          </button>
        </div>
      </div>

    </div>
  );
};
