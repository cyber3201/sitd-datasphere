
import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundDecor: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Top Right Mint Blob */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-dg-mint/20 blur-[100px]"
      />
      
      {/* Middle Left Blue Blob */}
      <motion.div 
        animate={{ 
          x: [-20, 20, -20],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[30%] -left-[10%] w-[500px] h-[500px] rounded-full bg-dg-blue/10 blur-[120px]"
      />

      {/* Bottom Right Maroon Accent */}
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-dg-maroon/5 blur-[90px]" />
    </div>
  );
};
