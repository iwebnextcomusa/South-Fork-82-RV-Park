import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';
import { Page } from '../types';
import { LOCAL_ATTRACTIONS, PARK_INFO } from '../data/parkData';

interface AttractionsPageProps {
  onOpenBooking: () => void;
}

export const AttractionsPage: React.FC<AttractionsPageProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Fishing & Lakes', 'Parks & Trails', 'Historic & Shopping'];

  const filteredAttractions = LOCAL_ATTRACTIONS.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  return (
    <div className="space-y-12 py-8 pb-16 max-w-7xl mx-auto px-6 sm:px-10">
      
      {/* Banner */}
      <div className="bg-[#2D4636] text-[#FDFCF8] rounded-[2.5rem] p-8 sm:p-14 shadow-xl border border-white/10">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C5A072] block">
            Explore East Texas
          </span>
          <h1 className="font-serif italic text-3xl sm:text-5xl font-normal tracking-tight">
            Local Attractions & Outdoor Recreation
          </h1>
          <p className="text-xs sm:text-sm text-[#E1EAF0]/90 leading-relaxed font-light">
            South Fork 82 RV Park in Blossom, TX puts you within minutes of fishing, boating, hiking trails, historic downtown shopping, and Texas BBQ dining.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center bg-[#F4F2EA] p-3 rounded-full border border-[#2D4636]/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#7C5E43] text-white shadow-md'
                : 'bg-white text-[#2D4636] hover:bg-gray-100'
            }`}
            id={`attraction-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAttractions.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#2D4636]/10 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-[#2D4636] text-[#C5A072] text-[11px] font-bold px-3 py-1 rounded-full shadow-md border border-white/10 flex items-center gap-1">
                  <Navigation className="w-3 h-3" /> {item.distance}
                </span>
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-bold text-lg text-[#2D4636]">
                  {item.name}
                </h3>
                <p className="text-xs text-[#2D4636]/70 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2">
                  <span className="text-[10px] font-bold text-[#7C5E43] uppercase tracking-widest block mb-2">
                    Highlights:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.highlights.map((hl, idx) => (
                      <span key={idx} className="text-[10px] bg-[#F4F2EA] text-[#2D4636] px-3 py-1 rounded-full border border-[#2D4636]/10 font-semibold">
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <a
                href={PARK_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#2D4636] hover:bg-[#7C5E43] text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C5A072]" />
                <span>Map Directions From Park</span>
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Bottom Callout */}
      <div className="bg-[#F4F2EA] p-8 sm:p-10 rounded-[2.5rem] border border-[#2D4636]/10 text-center space-y-4 max-w-3xl mx-auto shadow-sm">
        <h3 className="font-serif italic text-2xl text-[#2D4636]">
          Looking For A Specific Destination or Fishing Spot?
        </h3>
        <p className="text-xs text-[#2D4636]/70 leading-relaxed max-w-xl mx-auto">
          Ask our virtual park assistant Barnaby in the chatbot widget at the bottom right corner of your screen! Barnaby can answer questions about boat ramps, local BBQ joints, and trail access.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenBooking}
            className="bg-[#7C5E43] hover:bg-[#2D4636] text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-md transition-colors"
            id="attractions-book-stay-btn"
          >
            Book Your RV Stay Today
          </button>
        </div>
      </div>

    </div>
  );
};
