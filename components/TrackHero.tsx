
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageContainer } from './PageContainer';

interface TrackHeroProps {
  title: React.ReactNode;
  subtitle: string;
  illustration?: React.ReactNode;
  primaryCtaText?: string;
  primaryCtaAction?: () => void;
  secondaryCtaText?: string;
  secondaryCtaAction?: () => void;
}

export const TrackHero: React.FC<TrackHeroProps> = ({
  title,
  subtitle,
  illustration,
  primaryCtaText = "Commencer",
  primaryCtaAction,
  secondaryCtaText = "Voir le programme",
  secondaryCtaAction
}) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-24 md:pb-40 overflow-hidden bg-dg-cream border-b border-dg-blue/5">
      {/* Background Gradients & Shapes (Restricted for Mobile performance) */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-dg-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-dg-mint/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Right Abstract Geometric Decoration (Hidden on small mobile to prevent clutter) */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 lg:translate-x-0 w-[600px] h-[600px] opacity-30 pointer-events-none hidden md:block">
         <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_60s_linear_infinite]">
           <path fill="#1E3A8A" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,71.6,32.6C61,43.7,51.1,53.1,40.1,61.6C29.1,70.1,17,77.7,3.9,71C-9.2,64.3,-23.3,43.2,-36.3,30.3C-49.3,17.4,-61.2,12.7,-67.2,1.3C-73.2,-10.1,-73.3,-28.2,-64.8,-43.3C-56.3,-58.4,-39.2,-70.5,-23.6,-76.1C-8,-81.7,6.1,-80.8,20.5,-76.4Z" transform="translate(100 100) scale(1.1)" opacity="0.1" />
         </svg>
      </div>

      <PageContainer className="relative z-10 !py-0">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          {/* Left Content (Order 2 on mobile, 1 on desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl w-full text-center lg:text-left order-2 lg:order-1"
          >
            {/* Title: Scaled down for mobile */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-dg-blue mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              {title}
            </h1>
            
            {/* Subtitle: Improved readability */}
            <p className="text-base sm:text-lg md:text-2xl text-dg-muted mb-8 sm:mb-10 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            {/* CTAs: Stacked full width on mobile, row on desktop */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center lg:justify-start">
              {primaryCtaAction && (
                <button 
                  onClick={primaryCtaAction}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-dg-blue text-white font-bold rounded-xl hover:bg-blue-900 transition-all shadow-lg shadow-dg-blue/20 text-base sm:text-lg group"
                >
                  {primaryCtaText}
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              )}
              {secondaryCtaAction && (
                <button 
                  onClick={secondaryCtaAction}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white border border-dg-blue/10 text-dg-blue font-semibold rounded-xl hover:bg-dg-cream transition-all hover:shadow-md text-base sm:text-lg"
                >
                  {secondaryCtaText}
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Visual (Order 1 on mobile, 2 on desktop) */}
          {illustration && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative w-full flex items-center justify-center order-1 lg:order-2"
            >
               {/* Container limits width on mobile to prevent overflow */}
               <div className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-none flex justify-center lg:transform lg:scale-110 lg:origin-center">
                 {illustration}
               </div>
            </motion.div>
          )}

        </div>
      </PageContainer>
    </section>
  );
};
