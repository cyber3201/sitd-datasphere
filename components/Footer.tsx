import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-dg-blue/10 bg-dg-cream/50 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
        
        {/* Links Section: Appears first on mobile (top), second on desktop (right) */}
        <div className="flex space-x-6 order-1 md:order-2 mb-4 md:mb-0 font-medium text-dg-muted">
          <Link to="/privacy" className="hover:text-dg-blue transition-colors">Confidentialité</Link>
          <Link to="/terms" className="hover:text-dg-blue transition-colors">Conditions (CGU)</Link>
          <Link to="/contact" className="hover:text-dg-blue transition-colors">Contact</Link>
        </div>

        {/* Copyright Section: Appears second on mobile (bottom), first on desktop (left) */}
        <div className="text-dg-muted/70 order-2 md:order-1 text-xs">
          &copy; {new Date().getFullYear()} DataSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};