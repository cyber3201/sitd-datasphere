
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  BarChart, 
  BookOpen, 
  CheckCircle2, 
  Award,
  Layers,
  FileText,
  Layout
} from 'lucide-react';
import { CourseModule, CourseLesson } from '../lib/courseTypes';
import { getCourseStats, isLessonCompleted, subscribeToProgress } from '../lib/progress';
import { normalizeText } from '../lib/search';
import { PageContainer } from './PageContainer';
import { SearchInput } from './SearchInput';
import { ModuleAccordion } from './ModuleAccordion';
import { TrackHero } from './TrackHero';

interface Props {
  title: string;
  subtitle: string;
  modules: CourseModule[];
  lessons: CourseLesson[];
  basePath: string;
  aboutContent: React.ReactNode;
  objectives: string[];
  prerequisites: React.ReactNode;
  level?: string;
  illustration?: React.ReactNode;
}

export const ModernTrackLayout: React.FC<Props> = ({ 
  title, 
  subtitle, 
  modules, 
  lessons, 
  basePath,
  aboutContent,
  objectives,
  prerequisites,
  level = "Intermédiaire",
  illustration
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState(getCourseStats(lessons));
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});

  // Sync progress
  useEffect(() => {
    const updateState = () => {
      setStats(getCourseStats(lessons));
      const map: Record<string, boolean> = {};
      lessons.forEach(l => map[l.id] = isLessonCompleted(l.id));
      setCompletedMap(map);
    };
    updateState();
    return subscribeToProgress(updateState);
  }, [lessons]);

  const scrollToContent = () => {
    const el = document.getElementById('content-start');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter Logic for Syllabus
  const filteredModules = useMemo(() => {
    const query = normalizeText(searchTerm);
    if (!query) return modules.map(m => ({ ...m, lessons: lessons.filter(l => l.moduleId === m.id) }));

    return modules.map(module => {
      const moduleMatches = normalizeText(module.title).includes(query);
      const matchingLessons = lessons.filter(l => 
        l.moduleId === module.id && 
        (moduleMatches || normalizeText(l.title).includes(query))
      );
      return { ...module, lessons: matchingLessons };
    }).filter(m => m.lessons.length > 0);
  }, [searchTerm, modules, lessons]);

  // Determine "Next Lesson"
  const nextLesson = lessons.find(l => !completedMap[l.id]) || lessons[0];
  const ctaLink = nextLesson ? `${basePath}/${nextLesson.slug}` : basePath;
  const ctaText = stats.completed === 0 ? "Commencer" : (stats.percent === 100 ? "Revoir" : "Reprendre");

  const totalMinutes = lessons.reduce((acc, curr) => acc + curr.estimatedMinutes, 0);
  const totalHours = Math.ceil(totalMinutes / 60);

  return (
    <div className="bg-dg-cream min-h-screen overflow-x-hidden font-sans">
      
      {/* 1. HERO */}
      <TrackHero 
        title={title}
        subtitle={subtitle}
        illustration={illustration}
        primaryCtaText={ctaText}
        primaryCtaAction={() => window.location.hash = ctaLink}
        secondaryCtaAction={scrollToContent}
      />

      {/* 2. FLOATING STATS BAR - Responsive Grid */}
      <div className="relative z-20 -mt-8 sm:-mt-12 md:-mt-16 px-4 mb-12 sm:mb-16">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl md:shadow-2xl shadow-dg-blue/10 border border-dg-blue/5 p-5 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-8 md:divide-x divide-gray-100">
            <StatItem icon={<Layout className="text-dg-blue" size={24} />} label="Niveau" value={level} />
            <StatItem icon={<Clock className="text-dg-blue" size={24} />} label="Durée" value={`~${totalHours} Heures`} />
            <StatItem icon={<Layers className="text-dg-blue" size={24} />} label="Sujets" value={`${modules.length} Modules`} />
            <StatItem icon={<FileText className="text-dg-blue" size={24} />} label="Leçons" value={`${lessons.length} Articles`} />
          </div>
        </div>
      </div>

      <div id="content-start" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
        
        {/* MAIN CONTENT */}
        <div className="space-y-12 md:space-y-16 min-w-0">
          
          {/* ABOUT */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-dg-blue mb-4 md:mb-6">À propos</h2>
            <div className="prose prose-lg text-dg-muted leading-relaxed max-w-none">
              {aboutContent}
            </div>
          </section>

          {/* OBJECTIVES */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-dg-blue mb-4 md:mb-6">Ce que vous allez apprendre</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-start p-4 md:p-5 bg-white rounded-xl border border-dg-blue/5 shadow-sm hover:border-dg-blue/20 transition-colors">
                  <CheckCircle2 className="text-dg-mint fill-dg-blue mt-0.5 mr-3 md:mr-4 flex-shrink-0" size={20} />
                  <span className="text-dg-text font-medium text-sm md:text-base">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          {/* PROGRAMME (SYLLABUS) */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-dg-blue mb-2">Programme</h2>
                <p className="text-dg-muted text-base md:text-lg">
                  Parcourez les modules à votre rythme.
                </p>
              </div>
              <div className="w-full sm:w-72">
                <SearchInput 
                   value={searchTerm} 
                   onChange={setSearchTerm} 
                   placeholder="Filtrer..."
                   variant="default" 
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredModules.length > 0 ? (
                filteredModules.map(module => (
                  <ModuleAccordion 
                    key={module.id} 
                    module={module} 
                    basePath={basePath} 
                    completedMap={completedMap}
                    isSearchActive={!!searchTerm}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-white border border-dashed border-dg-blue/20 rounded-xl">
                   <p className="text-dg-muted">Aucune leçon ne correspond à votre recherche.</p>
                   <button onClick={() => setSearchTerm('')} className="text-dg-blue font-semibold hover:underline mt-2">
                     Réinitialiser
                   </button>
                </div>
              )}
            </div>
          </section>

          {/* PREREQUIS */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-dg-blue mb-4 md:mb-6">Prérequis</h2>
            <div className="bg-[#FFFDF2] border-l-4 border-dg-blue p-6 md:p-8 rounded-r-xl shadow-sm">
              <div className="flex items-start">
                <BookOpen className="text-dg-blue mt-1 mr-4 md:mr-5 flex-shrink-0" size={24} />
                <div className="text-dg-muted space-y-3 text-base md:text-lg">
                  {Array.isArray(prerequisites) ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {prerequisites.map((req: string, i: number) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  ) : prerequisites}
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* SIDEBAR (PROGRESS) - Hidden on mobile, sticky on desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-dg-blue/10 shadow-lg">
              <h3 className="text-xl font-bold text-dg-blue mb-6">Votre progression</h3>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-dg-muted">{stats.completed} / {stats.total} terminé(s)</span>
                  <span className="text-dg-blue font-bold">{stats.percent}%</span>
                </div>
                <div className="w-full h-4 bg-dg-cream rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-dg-mint transition-all duration-500" 
                    style={{ width: `${stats.percent}%` }}
                  />
                </div>
              </div>

              {stats.percent === 100 ? (
                 <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100 mb-6">
                    <Award className="mx-auto text-green-600 mb-2" size={32} />
                    <p className="text-green-800 font-bold">Cours terminé !</p>
                 </div>
              ) : null}

              <Link 
                to={ctaLink}
                className="block w-full py-4 bg-dg-blue text-white font-bold text-lg text-center rounded-xl hover:bg-blue-900 transition-all shadow-lg shadow-dg-blue/20 hover:shadow-xl hover:-translate-y-0.5"
              >
                {ctaText}
              </Link>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

const StatItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 md:space-x-5 md:pl-6 md:first:pl-0">
    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-dg-blue/5 rounded-2xl flex items-center justify-center">
      {/* Icon size handled by parent passing different sizes or classnames if needed, 
          but generally 24px (mobile) to 32px (desktop) works well. 
          Here we accept the node passed which has the size prop. 
      */}
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] md:text-sm text-dg-muted uppercase tracking-wider font-bold mb-0.5 md:mb-1 opacity-80 truncate">{label}</p>
      <p className="text-dg-blue font-bold text-sm md:text-xl leading-tight">{value}</p>
    </div>
  </div>
);
