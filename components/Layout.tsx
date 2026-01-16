
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BackToTopButton } from './BackToTopButton';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-dg-cream font-sans text-dg-text selection:bg-dg-mint selection:text-dg-blue">
      <Header />
      
      {/* Main Content Area - Top padding accounts for fixed header (h-16) */}
      <main className="flex-grow pt-16 flex flex-col w-full max-w-full">
        {children}
      </main>

      <Footer />
      <BackToTopButton />
    </div>
  );
};
