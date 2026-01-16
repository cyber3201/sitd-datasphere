
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  Scale, 
  UserCheck, 
  FileText,
  Gavel,
  Layout,
  Clock,
  Layers
} from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { ScrollReveal } from '../components/ScrollReveal';
import { DG_LESSONS } from '../lib/dataGovernance';
import { TrackHero } from '../components/TrackHero';

const getIconForTopic = (slug: string) => {
  if (slug.includes('gov')) return <Gavel size={24} />;
  if (slug.includes('role') || slug.includes('owner')) return <UserCheck size={24} />;
  if (slug.includes('policy') || slug.includes('standard')) return <FileText size={24} />;
  return <Shield size={24} />;
};

export const DataGovernance: React.FC = () => {
  const scrollToCards = () => {
    const el = document.getElementById('programme');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const Illustration = (
    <div className="w-full h-auto aspect-square max-w-[320px] md:max-w-[400px] relative">
       {/* Decorative Elements */}
       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] aspect-[4/3] p-6 bg-dg-blue text-white rounded-2xl shadow-2xl z-20 rotate-[-2deg] lg:scale-110 border border-white/10">
          <div className="flex justify-between items-start mb-4">
              <Shield size={32} className="text-dg-mint" />
              <div className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase font-bold tracking-wider">Policy</div>
          </div>
          <div className="space-y-3 mb-6">
              <div className="h-2 w-full bg-white/20 rounded"></div>
              <div className="h-2 w-3/4 bg-white/20 rounded"></div>
              <div className="h-2 w-1/2 bg-white/20 rounded"></div>
          </div>
          <div className="flex items-center space-x-2 text-dg-mint text-xs font-bold">
              <div className="w-4 h-4 rounded-full bg-dg-mint flex items-center justify-center text-dg-blue">✓</div>
              <span>Compliant</span>
          </div>
       </div>
       
       <div className="absolute right-[10%] top-1/3 -translate-y-1/2 w-[80%] aspect-[4/3] p-6 bg-white rounded-2xl shadow-xl border border-dg-blue/5 z-10 rotate-[3deg] opacity-90 lg:scale-110">
          <div className="flex items-center space-x-3 mb-4">
             <div className="w-8 h-8 bg-dg-maroon/10 rounded-lg flex items-center justify-center text-dg-maroon">
               <Scale size={18} />
             </div>
             <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="bg-dg-cream min-h-screen overflow-x-hidden font-sans">
      
      <TrackHero 
        title={<>Gouvernance <span className="text-transparent bg-clip-text bg-gradient-to-r from-dg-blue to-dg-maroon">Active</span></>}
        subtitle="Sortez de la bureaucratie. Mettez en place les règles, les rôles et les standards qui permettent à vos équipes de courir plus vite, en toute sécurité."
        illustration={Illustration}
        primaryCtaAction={scrollToCards}
        secondaryCtaAction={scrollToCards}
      />

      {/* Stats Bar */}
      <div className="relative z-20 -mt-8 sm:-mt-12 md:-mt-16 px-4 mb-12 sm:mb-16">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl md:shadow-2xl shadow-dg-blue/10 border border-dg-blue/5 p-5 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-8 md:divide-x divide-gray-100">
            <StatItem icon={<Layout className="text-dg-blue" size={24} />} label="Niveau" value="Avancé" />
            <StatItem icon={<Clock className="text-dg-blue" size={24} />} label="Durée" value="~3 Heures" />
            <StatItem icon={<Layers className="text-dg-blue" size={24} />} label="Sujets" value="5 Modules" />
            <StatItem icon={<FileText className="text-dg-blue" size={24} />} label="Format" value="Articles & RACI" />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <section id="programme" className="pb-20">
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-dg-blue mb-4">
              Programme du Cursus
            </h2>
            <p className="text-lg text-dg-muted max-w-2xl mx-auto font-light">
              Des fondamentaux de la prise de décision aux modèles fédérés complexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DG_LESSONS.map((lesson, index) => (
              <ScrollReveal key={lesson.id} delay={index * 0.05}>
                <Link to={`/data-governance/${lesson.slug}`} className="block group h-full">
                  <div className="relative h-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-8 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/5 group-hover:border-dg-mint/20">
                    
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
                    
                    <div className="absolute top-0 right-0 p-6 text-white/10 group-hover:text-dg-mint/20 transition-colors transform group-hover:scale-110 duration-500">
                      {getIconForTopic(lesson.slug)}
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="text-[10px] font-bold text-dg-mint uppercase tracking-widest bg-dg-mint/10 px-2 py-1 rounded border border-dg-mint/20">
                            Module {Math.floor(index / 2) + 1}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-dg-mint transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                          Définition des standards et des responsabilités pour ce domaine.
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
