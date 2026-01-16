
import React, { useState } from 'react';
import { getAssetPath } from '../lib/assets';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export const Figure: React.FC<FigureProps> = ({ src, alt, caption, className = '' }) => {
  const resolvedSrc = getAssetPath(src);
  const [error, setError] = useState<string | null>(null);

  // Development logging
  if (process.env.NODE_ENV === 'development' && !error) {
    // console.log(`[Figure] Rendering: ${resolvedSrc}`);
  }

  return (
    <figure className={`my-8 w-full ${className}`}>
      <div className="bg-white border border-dg-blue/10 rounded-xl overflow-hidden p-4 md:p-8 flex justify-center items-center shadow-sm min-h-[200px]">
        {error ? (
          <div className="text-center p-4 bg-red-50 text-red-600 rounded w-full border border-red-100">
            <p className="font-bold mb-1 text-sm">Image indisponible</p>
            <code className="text-xs break-all bg-white p-1 rounded border border-red-200 block">
              {resolvedSrc}
            </code>
            <p className="text-[10px] mt-2 text-red-400">Vérifiez /debug/assets</p>
          </div>
        ) : (
          <img 
            src={resolvedSrc} 
            alt={alt} 
            className="w-full max-w-[900px] h-auto object-contain"
            loading="lazy"
            decoding="async"
            onError={() => {
              console.error(`[Figure] Failed to load image: ${resolvedSrc}`);
              setError(resolvedSrc);
            }}
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-dg-muted font-medium italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
