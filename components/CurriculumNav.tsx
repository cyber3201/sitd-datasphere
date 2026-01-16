
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Circle, X, ChevronDown } from 'lucide-react';
import { CourseModule, CourseLesson } from '../lib/courseTypes';
import { isLessonCompleted, subscribeToProgress } from '../lib/progress';

interface Props {
  modules: CourseModule[];
  lessons: CourseLesson[];
  basePath: string;
  currentLessonSlug?: string;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  className?: string;
  variant?: 'desktop' | 'mobile';
}

export const CurriculumNav: React.FC<Props> = ({ 
  modules,
  lessons,
  basePath,
  currentLessonSlug, 
  mobileOpen, 
  setMobileOpen, 
  className,
  variant = 'desktop'
}) => {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  // 1. Update completion status
  const updateCompletion = () => {
    const map: Record<string, boolean> = {};
    lessons.forEach(l => {
      map[l.id] = isLessonCompleted(l.id);
    });
    setCompletedMap(map);
  };

  useEffect(() => {
    updateCompletion();
    const cleanup = subscribeToProgress(updateCompletion);
    return cleanup;
  }, [lessons]);

  // 2. Auto-expand the module containing the current lesson
  useEffect(() => {
    if (currentLessonSlug) {
      const activeLesson = lessons.find(l => l.slug === currentLessonSlug);
      if (activeLesson) {
        setExpandedModules(prev => {
          const newSet = new Set(prev);
          newSet.add(activeLesson.moduleId);
          return newSet;
        });

        if (variant === 'desktop') {
          const el = document.getElementById(`nav-item-${currentLessonSlug}`);
          if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }
        }
      }
    }
  }, [currentLessonSlug, lessons, variant]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const NavContent = () => (
    <div className={`space-y-2 pb-20 ${variant === 'desktop' ? (className || '') : ''}`}>
      {modules.map(module => {
        const moduleLessons = lessons.filter(l => l.moduleId === module.id);
        if (moduleLessons.length === 0) return null;

        const isExpanded = expandedModules.has(module.id);

        return (
          <div key={module.id} className="border-b border-dg-blue/5 last:border-0">
            <button 
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between py-3 px-2 text-left hover:bg-black/5 rounded-md transition-colors group focus:outline-none"
            >
              <h3 className="text-xs font-bold text-dg-muted uppercase tracking-wider group-hover:text-dg-blue transition-colors">
                {module.title}
              </h3>
              <div className={`text-dg-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown size={14} />
              </div>
            </button>

            {isExpanded && (
              <div className="flex flex-col space-y-1 mb-4 pl-2 animate-in slide-in-from-top-1 duration-200">
                {moduleLessons.map(lesson => {
                  const isCompleted = completedMap[lesson.id];
                  const isActive = lesson.slug === currentLessonSlug;

                  return (
                    <Link
                      key={lesson.id}
                      id={`nav-item-${lesson.slug}`}
                      to={`${basePath}/${lesson.slug}`}
                      onClick={() => variant === 'mobile' && setMobileOpen(false)}
                      className={`
                        relative flex items-center py-2 px-2 rounded-md text-sm transition-all duration-200
                        ${isActive 
                          ? 'bg-dg-blue/10 text-dg-blue font-semibold border-l-4 border-dg-blue pl-3' 
                          : 'text-dg-text hover:bg-dg-blue/5 border-l-4 border-transparent pl-3'
                        }
                        ${isCompleted && !isActive ? 'text-dg-muted opacity-80' : ''}
                      `}
                    >
                      <div className={`mr-3 flex-shrink-0 transition-colors ${isCompleted ? 'text-dg-mint' : 'text-gray-300'}`}>
                        {isCompleted ? (
                          <div className="bg-dg-mint/20 rounded-full p-0.5">
                            <Check size={14} className="text-dg-blue" strokeWidth={3} />
                          </div>
                        ) : (
                          <Circle size={14} />
                        )}
                      </div>
                      <span className="truncate">{lesson.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {variant === 'desktop' && (
        <div className="hidden lg:block h-full">
          <NavContent />
        </div>
      )}

      {variant === 'mobile' && mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-[85%] max-w-sm bg-dg-cream h-full shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-dg-blue/10">
            <div className="flex justify-between items-center mb-6 border-b border-dg-blue/10 pb-4">
              <h2 className="text-xl font-bold text-dg-blue">Plan du cours</h2>
              <button 
                onClick={() => setMobileOpen(false)}
                className="p-2 text-dg-muted hover:bg-black/5 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <NavContent />
          </div>
        </div>
      )}
    </>
  );
};
