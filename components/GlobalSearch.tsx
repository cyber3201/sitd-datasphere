import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Check, Circle, Hash, ArrowRight } from 'lucide-react';
import { searchLessons, normalizeText, SearchResult } from '../lib/search';
import { isLessonCompleted } from '../lib/progress';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 0) {
        setResults(searchLessons(query));
        setSelectedIndex(0);
      } else {
        setResults([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (result: SearchResult) => {
    // Use the dynamic course path from result
    navigate(`${result.coursePath}/${result.lesson.slug}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">
      <div 
        className="absolute inset-0 bg-dg-blue/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-dg-blue/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[70vh]">
        <div className="flex items-center px-4 py-4 border-b border-dg-blue/5">
          <Search className="text-dg-blue/50 mr-3" size={24} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-xl text-dg-blue placeholder-dg-muted/50 focus:outline-none"
            placeholder="Rechercher une leçon (SQL, DB Design...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-1 hover:bg-dg-cream rounded-full text-dg-muted">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-2 scrollbar-thin">
          {query.trim() === '' && (
             <div className="p-8 text-center text-dg-muted">
               <p className="mb-2">Recherchez dans tous les modules.</p>
               <div className="flex justify-center gap-2 text-xs opacity-60">
                 <span className="border border-dg-blue/20 px-1.5 rounded">↑</span>
                 <span className="border border-dg-blue/20 px-1.5 rounded">↓</span>
                 <span>naviguer</span>
                 <span className="border border-dg-blue/20 px-1.5 rounded ml-2">↵</span>
                 <span>ouvrir</span>
               </div>
             </div>
          )}

          {query.trim() !== '' && results.length === 0 && (
            <div className="p-8 text-center text-dg-muted">
              Aucun résultat pour "{query}"
            </div>
          )}

          {results.map((result, index) => {
            const isSelected = index === selectedIndex;
            const isCompleted = isLessonCompleted(result.lesson.id);

            return (
              <div
                key={result.lesson.id}
                onClick={() => handleSelect(result)}
                className={`
                  group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
                  ${isSelected ? 'bg-dg-blue text-white' : 'hover:bg-dg-blue/5 text-dg-text'}
                `}
              >
                <div className="flex items-center overflow-hidden">
                  <div className={`mr-3 flex-shrink-0 ${isSelected ? 'text-dg-mint' : (isCompleted ? 'text-dg-mint' : 'text-gray-300')}`}>
                    {isCompleted ? <Check size={18} /> : <Circle size={18} />}
                  </div>
                  
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                       <span className={`font-semibold truncate ${isSelected ? 'text-white' : 'text-dg-blue'}`}>
                         <HighlightText text={result.lesson.title} highlight={query} isSelected={isSelected} />
                       </span>
                       <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                         isSelected 
                          ? 'border-white/30 text-white/80' 
                          : 'border-dg-blue/10 text-dg-muted bg-white'
                       }`}>
                         {result.lesson.level}
                       </span>
                    </div>
                    <div className={`text-xs truncate flex items-center mt-0.5 ${isSelected ? 'text-dg-cream/80' : 'text-dg-muted'}`}>
                      <Hash size={10} className="mr-1 opacity-70" />
                      {result.moduleTitle} 
                      <span className="mx-1">•</span>
                      <span className="uppercase tracking-widest text-[9px]">
                        {result.coursePath.replace('/', '')}
                      </span>
                    </div>
                  </div>
                </div>
                {isSelected && <ArrowRight size={18} className="text-dg-mint animate-pulse ml-2 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
        <div className="bg-dg-cream/50 px-4 py-2 text-[10px] text-dg-muted border-t border-dg-blue/5 flex justify-between">
           <span>DataSphere Search</span>
           <span>ESC pour fermer</span>
        </div>
      </div>
    </div>
  );
};

const HighlightText: React.FC<{ text: string; highlight: string; isSelected: boolean }> = ({ text, highlight, isSelected }) => {
  if (!highlight.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        normalizeText(part) === normalizeText(highlight) ? (
          <mark key={i} className={`bg-transparent font-extrabold underline decoration-2 underline-offset-2 ${isSelected ? 'text-dg-mint decoration-dg-mint' : 'text-dg-blue decoration-dg-mint/50'}`}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};