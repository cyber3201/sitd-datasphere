
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  CheckCircle2, 
  PlayCircle, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { CourseModule, CourseLesson } from '../lib/courseTypes';

interface ModuleAccordionProps {
  module: CourseModule & { lessons: CourseLesson[] };
  basePath: string;
  completedMap: Record<string, boolean>;
  isSearchActive: boolean;
}

export const ModuleAccordion: React.FC<ModuleAccordionProps> = ({ 
  module, 
  basePath, 
  completedMap,
  isSearchActive 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-expand if search is active
  useEffect(() => {
    if (isSearchActive) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isSearchActive]);

  return (
    <div className="bg-white border border-dg-blue/10 rounded-xl overflow-hidden shadow-sm transition-all hover:border-dg-blue/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-dg-cream/30 px-6 py-4 flex justify-between items-center text-left focus:outline-none focus:bg-dg-blue/5 hover:bg-dg-blue/5 transition-colors group"
        aria-expanded={isOpen}
        aria-controls={`module-content-${module.id}`}
      >
        <div className="flex-1 pr-4">
          <h3 className="font-bold text-dg-blue group-hover:text-dg-maroon transition-colors text-lg">
            {module.title}
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs font-semibold text-dg-muted/70 uppercase tracking-wider hidden sm:inline-block">
            {module.lessons.length} leçons
          </span>
          <div className={`p-1 rounded-full bg-white border border-dg-blue/10 text-dg-blue transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={20} />
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`module-content-${module.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-dg-blue/5 border-t border-dg-blue/5">
              {module.lessons.map((lesson) => {
                const isCompleted = completedMap[lesson.id];
                return (
                  <Link 
                    key={lesson.id} 
                    to={`${basePath}/${lesson.slug}`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-dg-blue/5 transition-colors group"
                  >
                    <div className="flex items-center space-x-4 overflow-hidden">
                      <div className={`flex-shrink-0 ${isCompleted ? 'text-dg-mint' : 'text-dg-muted/30 group-hover:text-dg-blue/50'}`}>
                        {isCompleted ? <CheckCircle2 size={20} className="fill-dg-blue text-dg-mint" /> : <PlayCircle size={20} />}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-medium truncate ${isCompleted ? 'text-dg-muted' : 'text-dg-blue'}`}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                            lesson.level === 'Débutant' ? 'bg-green-50 text-green-700 border-green-100' :
                            lesson.level === 'Intermédiaire' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                            'bg-orange-50 text-orange-700 border-orange-100'
                          }`}>
                            {lesson.level}
                          </span>
                          <span className="text-[10px] text-dg-muted flex items-center">
                            <Clock size={10} className="mr-1" /> {lesson.estimatedMinutes} min
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                        {isCompleted ? (
                            <span className="text-xs font-bold text-dg-mint uppercase tracking-wider">Terminé</span>
                        ) : (
                            <div className="p-1 rounded-full bg-white border border-dg-blue/10 text-dg-blue opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight size={16} />
                            </div>
                        )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
