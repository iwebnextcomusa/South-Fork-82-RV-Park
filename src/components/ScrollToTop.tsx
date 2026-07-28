import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      id="scroll-to-top-btn"
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-40 bg-[#7D553A] hover:bg-[#213A30] text-[#FBF8F3] p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-[#FBF8F3]"
      title="Scroll back to top"
    >
      <ChevronUp className="w-6 h-6 animate-bounce" />
    </button>
  );
};
