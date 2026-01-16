
import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'large';
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  className = '',
  variant = 'default'
}) => {
  const isLarge = variant === 'large';
  
  return (
    <div className={`relative ${className}`}>
      <div className={`absolute inset-y-0 left-0 flex items-center pointer-events-none ${isLarge ? 'pl-4' : 'pl-3'}`}>
        <Search className="text-dg-blue/40" size={isLarge ? 20 : 16} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full bg-white border border-dg-blue/20 rounded-xl text-dg-blue placeholder-dg-muted/50 focus:outline-none focus:ring-2 focus:ring-dg-blue/20 focus:border-dg-blue/40 transition-all shadow-sm
          ${isLarge ? 'pl-12 pr-12 py-4 text-lg' : 'pl-9 pr-9 py-2.5 text-sm'}
        `}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className={`absolute inset-y-0 right-0 flex items-center text-dg-muted hover:text-dg-maroon transition-colors ${isLarge ? 'pr-4' : 'pr-3'}`}
          aria-label="Effacer la recherche"
        >
          <X size={isLarge ? 20 : 14} />
        </button>
      )}
    </div>
  );
};
