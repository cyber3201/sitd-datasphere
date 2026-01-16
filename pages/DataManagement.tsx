
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Database, 
  ShieldCheck, 
  Layers, 
  GitBranch, 
  FileText, 
  BarChart2, 
  Users, 
  Clock, 
  CheckCircle2,
  Layout
} from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { ScrollReveal } from '../components/ScrollReveal';
import { DM_LESSONS } from '../lib/dataManagement';
import { TrackHero } from '../components/TrackHero';

// Helper to map icons
const getIconForTopic = (slug: string) => {
  switch(slug) {
    case 'dm-foundations': return <Database size={24} />;
    case 'dm-metadata': return <FileText size={24} />;
    case 'dm-quality': return <CheckCircle2 size={24} />;
    case 'dm-mdm': return <Layers size={24} />;
    case 'dm-security': return <ShieldCheck size={24} />;
    case 'dm-ops': return <GitBranch size={24} />;
    case 'dm-gov-model': return <Users size={24} />;
    case 'dm-semantic': return <BarChart2 size={24} />;
    case 'dm-lifecycle': return <Clock size={24} />;
    case 'dm-stewardship': return <Users size={24} />;
    default: return <Database size={24} />;
  }
};

export const DataManagement: React.FC = () => {
  const scrollToCards = () => {
    const el = document.getElementById('programme');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const Illustration = (
    <div className="w-full h-auto aspect-square max-w-[320px] md:max-w-[400px] relative"> 
       {/* Decorative Cards Stack - Scaled with CSS instead of transform for safer mobile layout */}
       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] aspect-[4/3] p-6 bg-white rounded-2xl shadow-2xl border border-dg-blue/5 z-20 rotate-[-3deg] lg:scale-110">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-dg-blue text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div className="w-full">
              <div className="h-2 w-3/4 bg-gray-200 rounded mb-1"></div>
              <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-gray-100 rounded"></div>
            <div className="h-2 w-5/6 bg-gray-100 rounded"></div>
            <div className="h-2 w-4/6 bg-gray-100 rounded"></div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Validé</span>
            <span className="text-xs text-gray-400">Data Quality</span>
          </div>
       </div>

       <div className="absolute right-[10%] top-1/3 -translate-y-1/2 w-[80%] aspect-[4/3] p-6 bg-dg-blue text-white rounded-2xl shadow-2xl z-10 rotate-[3deg] opacity-90 lg:scale-110">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Database size={18} className="text-dg-mint" />
              <span className="font-bold text-sm">Master Data</span>
            </div>
          </div>
          <div className="h-2 w-full bg-white/20 rounded mb-2"></div>
          <div className="h-2 w-2/3 bg-white/20 rounded"></div>
       </div>
    </div>
  );

  return (
    <div className="bg-dg-cream min-h-screen overflow-x-hidden font-sans">
      
      {/* 1. COMPACT HERO */}
      <TrackHero 
        title={<>Maîtrisez le <span className="text-transparent bg-clip-text bg-gradient-to-r from-dg-blue to-dg-maroon">Data Management</span></>}
        subtitle="Gérez le cycle de vie, la qualité et la gouvernance. Transformez la donnée brute en un actif stratégique fiable et sécurisé."
        illustration={Illustration}
        primaryCtaAction={scrollToCards}
        secondaryCtaAction={scrollToCards}
      />

      {/* 2. FLOATING STATS BAR - Responsive */}
      <div className="relative z-20 -mt-8 sm:-mt-12 md:-mt-16 px-4 mb-12 sm:mb-16">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl md:shadow-2xl shadow-dg-blue/10 border border-dg-blue/5 p-5 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-8 md:divide-x divide-gray-100">
            <StatItem icon={<Layout className="text-dg-blue" size={24} />} label="Niveau" value="Intermédiaire" />
            <StatItem icon={<Clock className="text-dg-blue" size={24} />} label="Durée" value="~3 Heures" />
            <StatItem icon={<Layers className="text-dg-blue" size={24} />} label="Sujets" value="10 Modules" />
            <StatItem icon={<FileText className="text-dg-blue" size={24} />} label="Format" value="Articles" />
          </div>
        </div>
      </div>

      {/* 3. TOPIC CARDS GRID */}
      <section id="programme" className="pb-20">
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-dg-blue mb-4">
              Programme du Cursus
            </h2>
            <p className="text-lg text-dg-muted max-w-2xl mx-auto font-light">
              Une approche modulaire couvrant les piliers essentiels du DAMA-DMBOK.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DM_LESSONS.map((lesson, index) => (
              <ScrollReveal key={lesson.id} delay={index * 0.05}>
                <Link to={`/data-management/${lesson.slug}`} className="block group h-full">
                  <div className="relative h-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-8 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/5 group-hover:border-dg-mint/20">
                    
                    {/* Decorative Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
                    
                    {/* Corner Icon */}
                    <div className="absolute top-0 right-0 p-6 text-white/10 group-hover:text-dg-mint/20 transition-colors transform group-hover:scale-110 duration-500">
                      {getIconForTopic(lesson.slug)}
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="text-[10px] font-bold text-dg-mint uppercase tracking-widest bg-dg-mint/10 px-2 py-1 rounded border border-dg-mint/20">
                            Module {index + 1}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-dg-mint transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                          Apprenez les standards, les processus et les outils clés pour maîtriser ce domaine.
                        </p>
                      </div>
                      
                      <div className="flex items-center text-white font-semibold text-sm group/btn">
                        <span>Lire le module</span>
                        <div className="ml-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-dg-mint group-hover:text-dg-blue transition-all duration-300">
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </PageContainer>
      </section>

    </div>
  );
};

const StatItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 md:space-x-5 md:pl-6 md:first:pl-0">
    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-dg-blue/5 rounded-2xl flex items-center justify-center">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] md:text-sm text-dg-muted uppercase tracking-wider font-bold mb-0.5 md:mb-1 opacity-80 truncate">{label}</p>
      <p className="text-dg-blue font-bold text-sm md:text-xl leading-tight">{value}</p>
    </div>
  </div>
);
