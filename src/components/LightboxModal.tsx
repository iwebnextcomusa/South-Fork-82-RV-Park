import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const currentItem = items[currentIndex];

  if (!currentItem) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center text-white py-2 px-4 z-10">
        <div>
          <span className="text-sm font-semibold tracking-wider text-[#C5A072] uppercase">
            {currentItem.category} • {currentIndex + 1} of {items.length}
          </span>
          <h3 className="text-xl font-heading font-bold">{currentItem.title}</h3>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-gray-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          id="lightbox-close-btn"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Area with Controls */}
      <div className="relative flex-1 w-full max-w-6xl flex items-center justify-center my-2">
        
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-[#7D553A] transition-colors focus:outline-none"
          id="lightbox-prev-btn"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Display Image */}
        <img
          src={currentItem.src}
          alt={currentItem.alt}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-[#7D553A] transition-colors focus:outline-none"
          id="lightbox-next-btn"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Caption Bottom Bar */}
      <div className="w-full max-w-3xl text-center text-gray-200 py-3 px-6 bg-black/40 rounded-2xl border border-white/10">
        <p className="text-sm leading-relaxed">{currentItem.caption}</p>
      </div>
    </div>
  );
};
