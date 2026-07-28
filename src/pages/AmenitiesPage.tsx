import React, { useState } from 'react';
import { Plug, Zap, Droplets, Wifi, Maximize2, Dog, Shirt, Sparkles, Navigation, VolumeX, CheckCircle2, Search } from 'lucide-react';
import { Page } from '../types';
import { AMENITIES_LIST } from '../data/parkData';

interface AmenitiesPageProps {
  onOpenBooking: () => void;
}

export const AmenitiesPage: React.FC<AmenitiesPageProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Utilities', 'Comfort & Convenience', 'Site Features', 'Atmosphere'];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Plug': return <Plug className="w-5 h-5 text-[#2D4636]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#2D4636]" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-[#2D4636]" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-[#2D4636]" />;
      case 'Maximize2': return <Maximize2 className="w-5 h-5 text-[#2D4636]" />;
      case 'Dog': return <Dog className="w-5 h-5 text-[#2D4636]" />;
      case 'Shirt': return <Shirt className="w-5 h-5 text-[#2D4636]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#2D4636]" />;
      case 'Navigation': return <Navigation className="w-5 h-5 text-[#2D4636]" />;
      case 'VolumeX': return <VolumeX className="w-5 h-5 text-[#2D4636]" />;
      default: return <CheckCircle2 className="w-5 h-5 text-[#2D4636]" />;
    }
  };

  const filteredAmenities = AMENITIES_LIST.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-8 pb-16 max-w-7xl mx-auto px-6 sm:px-10">
      
      {/* Banner */}
      <div className="bg-[#2D4636] text-[#FDFCF8] rounded-[2.5rem] p-8 sm:p-14 shadow-xl border border-white/10">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C5A072] block">
            Park Features & Facilities
          </span>
          <h1 className="font-serif italic text-3xl sm:text-5xl font-normal tracking-tight">
            South Fork 82 Park Amenities
          </h1>
          <p className="text-xs sm:text-sm text-[#E1EAF0]/90 leading-relaxed font-light">
            Designed for hassle-free RV living with heavy-duty power, clean city hookups, fast Wi-Fi, and spacious outdoor surroundings.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#F4F2EA] p-4 rounded-3xl border border-[#2D4636]/10">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#7C5E43] text-white shadow-md'
                  : 'bg-white text-[#2D4636] hover:bg-gray-100'
              }`}
              id={`amenity-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search amenity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#2D4636]/10 rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#2D4636]"
            id="amenity-search-input"
          />
        </div>

      </div>

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAmenities.map((item) => (
          <div
            key={item.id}
            className="bg-white p-7 rounded-3xl shadow-sm border border-[#2D4636]/10 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E1EAF0] flex items-center justify-center group-hover:bg-[#2D4636] group-hover:text-white transition-colors">
                  {getIcon(item.iconName)}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7C5E43] bg-[#F4F2EA] px-3 py-1 rounded-full border border-[#2D4636]/10">
                  {item.category}
                </span>
              </div>

              <h3 className="font-bold text-lg text-[#2D4636] mb-2">
                {item.name}
              </h3>
              <p className="text-xs text-[#2D4636]/70 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#2D4636]/10 flex items-center gap-1.5 text-xs text-[#2D4636] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#7C5E43]" />
              <span>Available at all sites</span>
            </div>
          </div>
        ))}
      </div>

      {filteredAmenities.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#2D4636]/10">
          <p className="text-[#2D4636]/60 text-xs">No amenities found matching your search.</p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-[#2D4636] text-white p-8 sm:p-12 rounded-[2.5rem] text-center space-y-4 shadow-xl">
        <h3 className="font-serif italic text-2xl sm:text-3xl font-normal text-white">
          Ready to Experience Our Full Hookup RV Sites?
        </h3>
        <p className="text-xs sm:text-sm text-[#E1EAF0]/90 max-w-xl mx-auto font-light">
          Contact our manager today or book online for immediate site availability.
        </p>
        <button
          onClick={onOpenBooking}
          className="bg-[#7C5E43] hover:bg-white hover:text-[#2D4636] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold shadow-lg transition-colors inline-block"
          id="amenities-bottom-book-btn"
        >
          Book Your Stay Now
        </button>
      </div>

    </div>
  );
};
