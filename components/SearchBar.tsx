
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight, Hash, FileText, Layout } from 'lucide-react';
import { searchLessons, SearchResult, normalizeText } from '../lib/search';

interface SearchBarProps {
  className?: string;
  onNavigate?: () => void; // Callback to close mobile menu if needed
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  className = '', 
  onNavigate,
  placeholder = "Rechercher une leçon..." 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Search logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 0) {
        const found = searchLessons(query);
        setResults(found.slice(0, 8)); // Limit to 8 results
        setShowDropdown(true);
        setSelectedIndex(-1);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 150); // Fast debounce

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      } else if (results.length > 0) {
        // If nothing selected but Enter pressed, pick first
        handleSelect(results[0]);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(`${result.coursePath}/${result.lesson.slug}`);
    setShowDropdown(false);
    setQuery('');
    if (onNavigate) onNavigate();
  };

  // Helper to highlight text
  const Highlight: React.FC<{ text: string }> = ({ text }) => {
    if (!query) return <>{text}</>;
    const parts = text.split(new RegExp(`(${normalizeText(query)})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          normalizeText(part) === normalizeText(query) ? 
            <span key={i} className="bg-yellow-100 text-dg-blue font-bold">{part}</span> : 
            part
        )}
      </>
    );
  };

  return (
    <div ref={containerRef} className={`relative group ${className}`}>
      {/* Input Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dg-muted/50 group-focus-within:text-dg-blue transition-colors">
          <Search size={16} />
        </div>
        <input
          type="text"
          className="w-full pl-9 pr-8 py-2 bg-white border border-dg-blue/10 rounded-full text-sm text-dg-text placeholder-dg-muted/60 focus:outline-none focus:ring-2 focus:ring-dg-blue/10 focus:border-dg-blue/30 transition-all shadow-sm"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if(query) setShowDropdown(true); }}
          onKeyDown={handleKeyDown}
          aria-label="Rechercher"
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); setResults([]); }}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-dg-muted hover:text-dg-maroon cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && results.length > 0 && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-xl shadow-xl border border-dg-blue/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[60vh] overflow-y-auto">
          <div className="py-2">
            <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-dg-muted/50 tracking-wider">
              Résultats ({results.length})
            </div>
            {results.map((result, index) => (
              <button
                key={result.lesson.id}
                onClick={() => handleSelect(result)}
                className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors
                  ${index === selectedIndex ? 'bg-dg-blue/5' : 'hover:bg-dg-blue/5'}
                `}
              >
                <div className="flex items-center min-w-0 flex-1 mr-3">
                  <div className={`mr-3 p-1.5 rounded-md flex-shrink-0 ${index === selectedIndex ? 'bg-white text-dg-blue shadow-sm' : 'bg-dg-cream/50 text-dg-muted'}`}>
                    <FileText size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-dg-blue truncate">
                      <Highlight text={result.lesson.title} />
                    </div>
                    <div className="text-xs text-dg-muted truncate flex items-center">
                      <span className="opacity-70">{result.moduleTitle}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                   <span className={`text-[10px] border px-1.5 py-0.5 rounded ${
                     index === selectedIndex ? 'border-dg-blue/20 bg-white text-dg-blue' : 'border-transparent text-dg-muted/50'
                   }`}>
                     Go
                   </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results State */}
      {showDropdown && query && results.length === 0 && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-xl shadow-xl border border-dg-blue/10 p-4 z-50 text-center text-sm text-dg-muted">
          Aucun résultat pour "{query}"
        </div>
      )}
    </div>
  );
};
