
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Check for reduced motion preference
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: isReducedMotion ? 'auto' : 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-3.5 bg-dg-mint text-dg-blue rounded-full shadow-lg shadow-dg-blue/10 hover:shadow-xl hover:shadow-dg-blue/20 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-dg-blue focus:ring-offset-2 animate-in fade-in slide-in-from-bottom-4"
      aria-label="Retour en haut"
      title="Retour en haut"
    >
      <ArrowUp size={24} strokeWidth={2.5} />
    </button>
  );
};
