
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  BarChart, 
  BookOpen, 
  CheckCircle2, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CourseModule, CourseLesson } from '../lib/courseTypes';
import { getCourseStats, isLessonCompleted, subscribeToProgress } from '../lib/progress';
import { normalizeText } from '../lib/search';
import { PageContainer } from './PageContainer';
import { SearchInput } from './SearchInput';
import { ModuleAccordion } from './ModuleAccordion';

interface Props {
  title: string;
  subtitle: string;
  modules: CourseModule[];
  lessons: CourseLesson[];
  basePath: string; // e.g. "/sql-mastery"
  aboutContent: React.ReactNode;
  objectives: string[];
  prerequisites: React.ReactNode;
  level?: string;
}

export const CourseIndex: React.FC<Props> = ({ 
  title, 
  subtitle, 
  modules, 
  lessons, 
  basePath,
  aboutContent,
  objectives,
  prerequisites,
  level = "Intermédiaire"
}) => {
  const [activeTab, setActiveTab] = useState('about');
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

  // Sticky Tab Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'objectifs', 'programme', 'prerequis'];
      const scrollPosition = window.scrollY + 150; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveTab(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 130; // Header (64) + Tabs (approx 60)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveTab(id);
    }
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
  const ctaText = stats.completed === 0 ? "Commencer le parcours" : (stats.percent === 100 ? "Revoir le cours" : "Reprendre le cours");

  const totalMinutes = lessons.reduce((acc, curr) => acc + curr.estimatedMinutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);

  return (
    <div className="bg-dg-cream min-h-screen overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="bg-dg-blue text-white pt-12 pb-16 md:pt-20 md:pb-24 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dg-mint rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dg-maroon rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
        </div>

        <PageContainer className="relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 text-dg-mint font-bold uppercase tracking-wider text-xs mb-6 border border-dg-mint/30 px-3 py-1 rounded-full bg-dg-mint/10">
              <Sparkles size={14} />
              <span>Cursus Structuré</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
              {title}
            </h1>
            
            <p className="text-xl text-dg-cream/80 leading-relaxed max-w-2xl mb-10 font-light">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={ctaLink}
                className="inline-flex items-center justify-center px-8 py-4 bg-dg-mint text-dg-blue font-bold rounded-lg hover:bg-white transition-all shadow-lg shadow-dg-mint/20 text-lg group"
              >
                {ctaText}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-8 text-sm font-medium text-dg-cream/60">
              <div className="flex items-center">
                <BarChart size={18} className="mr-2 text-dg-mint" />
                Niveau : {level}
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2 text-dg-mint" />
                Durée : ~{totalHours}h ({lessons.length} leçons)
              </div>
              <div className="flex items-center">
                <Award size={18} className="mr-2 text-dg-mint" />
                Certificat à la clé
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 2. STICKY TABS */}
      <div className="sticky top-16 z-30 bg-white border-b border-dg-blue/10 shadow-sm overflow-x-auto hide-scrollbar">
        <PageContainer className="!py-0">
          <div className="flex space-x-8">
            {[
              { id: 'about', label: 'À propos' },
              { id: 'objectifs', label: 'Objectifs' },
              { id: 'programme', label: 'Programme' },
              { id: 'prerequis', label: 'Prérequis' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-dg-blue text-dg-blue' 
                    : 'border-transparent text-dg-muted hover:text-dg-blue'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </PageContainer>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
        
        {/* MAIN CONTENT */}
        <div className="space-y-20 min-w-0">
          
          {/* ABOUT */}
          <section id="about" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-dg-blue mb-6">À propos de ce cours</h2>
            <div className="prose prose-lg text-dg-muted leading-relaxed max-w-none">
              {aboutContent}
            </div>
          </section>

          {/* OBJECTIVES */}
          <section id="objectifs" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-dg-blue mb-8">Ce que vous allez apprendre</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-start p-4 bg-white rounded-lg border border-dg-blue/5 shadow-sm">
                  <CheckCircle2 className="text-dg-mint fill-dg-blue mt-0.5 mr-3 flex-shrink-0" size={20} />
                  <span className="text-dg-text font-medium">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          {/* PROGRAMME (SYLLABUS) */}
          <section id="programme" className="scroll-mt-32">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-dg-blue mb-2">Programme du cours</h2>
                <p className="text-dg-muted">
                  {modules.length} modules • {lessons.length} leçons
                </p>
              </div>
              <div className="w-full sm:w-64">
                <SearchInput 
                   value={searchTerm} 
                   onChange={setSearchTerm} 
                   placeholder="Filtrer les leçons..."
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
          <section id="prerequis" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-dg-blue mb-6">Prérequis</h2>
            <div className="bg-[#FFFDF2] border-l-4 border-dg-blue p-6 rounded-r-lg">
              <div className="flex items-start">
                <BookOpen className="text-dg-blue mt-1 mr-4" size={24} />
                <div className="text-dg-muted space-y-2">
                  {Array.isArray(prerequisites) ? (
                    <ul className="list-disc pl-5 space-y-1">
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

        {/* SIDEBAR (PROGRESS) */}
        <aside className="hidden lg:block">
          <div className="sticky top-36 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-dg-blue/10 shadow-sm">
              <h3 className="text-lg font-bold text-dg-blue mb-4">Votre progression</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-dg-muted">{stats.completed} / {stats.total} terminé(s)</span>
                  <span className="text-dg-blue">{stats.percent}%</span>
                </div>
                <div className="w-full h-3 bg-dg-cream rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-dg-mint transition-all duration-500" 
                    style={{ width: `${stats.percent}%` }}
                  />
                </div>
              </div>

              {stats.percent === 100 ? (
                 <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100 mb-4">
                    <Award className="mx-auto text-green-600 mb-2" size={32} />
                    <p className="text-green-800 font-bold">Cours terminé !</p>
                    <p className="text-green-700 text-xs mt-1">Félicitations pour votre assiduité.</p>
                 </div>
              ) : null}

              <Link 
                to={ctaLink}
                className="block w-full py-3 bg-dg-blue text-white font-bold text-center rounded-lg hover:bg-blue-900 transition-colors shadow-lg shadow-dg-blue/10"
              >
                {ctaText}
              </Link>
            </div>

            <div className="bg-dg-cream/50 p-6 rounded-2xl border border-dg-blue/5">
               <h4 className="font-bold text-dg-blue text-sm mb-3">Besoin d'aide ?</h4>
               <p className="text-xs text-dg-muted mb-4">
                 Rejoignez la discussion ou consultez la documentation si vous êtes bloqué.
               </p>
               <div className="space-y-2">
                 <Link to="/contact" className="block text-sm font-medium text-dg-blue hover:underline">
                   Contacter le support
                 </Link>
                 <Link to="/ressources" className="block text-sm font-medium text-dg-blue hover:underline">
                   Voir les ressources
                 </Link>
               </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};
