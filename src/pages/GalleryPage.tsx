import React, { useState } from 'react';
import { Maximize2, Camera } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/parkData';
import { LightboxModal } from '../components/LightboxModal';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Grounds', 'Amenities', 'Surrounding Nature', 'RVs & Sites'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  return (
    <div className="space-y-12 py-8 pb-16 max-w-7xl mx-auto px-6 sm:px-10">
      
      {/* Banner */}
      <div className="bg-[#2D4636] text-[#FDFCF8] rounded-[2.5rem] p-8 sm:p-14 shadow-xl border border-white/10">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C5A072] block">
            South Fork 82 Photo Showcase
          </span>
          <h1 className="font-serif italic text-3xl sm:text-5xl font-normal tracking-tight">
            Park & Location Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#E1EAF0]/90 leading-relaxed font-light">
            Explore photos of our spacious RV sites, utility pedestals, surrounding East Texas lakes, and quiet grounds. Click any photo to view in high resolution.
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
            id={`gallery-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-md border border-[#2D4636]/10 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div className="text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A072] bg-black/40 px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                  <h4 className="font-serif italic text-lg text-white font-normal">{item.title}</h4>
                  <p className="text-xs text-gray-300 line-clamp-2">{item.caption}</p>
                </div>

                <div className="absolute top-3 right-3 bg-black/60 p-2 rounded-full text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white">
              <div className="flex justify-between items-center text-xs">
                <h3 className="font-bold text-[#2D4636]">{item.title}</h3>
                <span className="text-[#2D4636]/60 flex items-center gap-1 font-semibold">
                  <Camera className="w-3.5 h-3.5 text-[#7C5E43]" /> View
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}

    </div>
  );
};
