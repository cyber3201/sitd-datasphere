
import React from 'react';
import { PageContainer } from './PageContainer';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, icon }) => {
  return (
    <section className="relative pt-12 pb-12 bg-dg-cream overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-dg-blue/5 rounded-full blur-[80px] pointer-events-none" />
      
      <PageContainer className="relative z-10 !py-0 text-center">
        {icon && (
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm mb-6 text-dg-blue border border-dg-blue/10">
            {icon}
          </div>
        )}
        <h1 className="text-3xl md:text-5xl font-extrabold text-dg-blue mb-4 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-dg-muted max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </PageContainer>
    </section>
  );
};
