
import React, { useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Menu, X, CheckCircle2, Lightbulb } from 'lucide-react';
import { DP_LESSONS } from '../lib/dataProducts';
import { DP_CONTENT } from '../lib/dataProductsContent';
import { PageContainer } from '../components/PageContainer';
import { SectionCheckbox } from '../components/SectionCheckbox';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export const DataProductsLesson: React.FC = () => {
  const { lessonSlug } = useParams<{ lessonSlug: string }>();
  const [isTocOpen, setIsTocOpen] = useState(false);

  // Find current lesson
  const currentIndex = DP_LESSONS.findIndex(l => l.slug === lessonSlug);
  const lessonMeta = DP_LESSONS[currentIndex];
  const content = lessonSlug ? DP_CONTENT[lessonSlug] : undefined;

  // Prev/Next Logic
  const prevLesson = currentIndex > 0 ? DP_LESSONS[currentIndex - 1] : null;
  const nextLesson = currentIndex < DP_LESSONS.length - 1 ? DP_LESSONS[currentIndex + 1] : null;

  if (!lessonMeta || !content) {
    return <Navigate to="/data-products" replace />;
  }

  const sections = [
    { id: 'why', title: content.why.title },
    { id: 'concept', title: content.concept.title },
    { id: 'example', title: 'Exemple Concret' },
    { id: 'checklist', title: 'Checklist & Résumé' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setIsTocOpen(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* HEADER */}
      <div className="bg-dg-cream border-b border-dg-blue/10 pt-8 pb-12">
        <PageContainer className="!py-0">
          <div className="flex items-center space-x-2 text-sm text-dg-muted mb-6">
            <Link to="/data-products" className="hover:text-dg-blue font-medium">Data Products</Link>
            <span>/</span>
            <span className="text-dg-blue font-semibold truncate">{lessonMeta.title}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-dg-blue mb-4">
            {lessonMeta.title}
          </h1>
          
          {content.objectives && (
            <div className="flex flex-wrap gap-4 mt-6">
              {content.objectives.map((obj, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-dg-blue/5 text-dg-blue text-xs font-bold uppercase tracking-wide border border-dg-blue/10">
                  <CheckCircle2 size={12} className="mr-2" />
                  {obj}
                </span>
              ))}
            </div>
          )}
        </PageContainer>
      </div>

      <PageContainer className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">
          
          {/* ARTICLE */}
          <article className="min-w-0">
            
            <section id="why" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-dg-blue mb-6 border-b border-dg-blue/10 pb-2">
                {content.why.title}
              </h2>
              <MarkdownRenderer content={content.why.content} />
            </section>

            <section id="concept" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-dg-blue mb-6 border-b border-dg-blue/10 pb-2">
                {content.concept.title}
              </h2>
              <MarkdownRenderer content={content.concept.content} />
              
              {content.concept.syntax && (
                <div className="mt-6 bg-[#1e293b] text-gray-200 p-5 rounded-lg overflow-x-auto font-mono text-sm border border-gray-700 shadow-inner">
                  {content.concept.syntax}
                </div>
              )}
            </section>

            <section id="example" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-dg-blue mb-6 border-b border-dg-blue/10 pb-2">
                Exemple Concret
              </h2>
              <div className="bg-dg-blue/5 border-l-4 border-dg-blue rounded-r-xl p-8">
                <h3 className="text-xl font-bold text-dg-blue mb-2 flex items-center">
                  <Lightbulb size={24} className="mr-2 text-yellow-600" />
                  {content.example.title}
                </h3>
                <p className="text-dg-text font-medium mb-4 italic">
                  "{content.example.description}"
                </p>
                {content.example.sql && (
                  <div className="bg-white p-4 rounded border border-dg-blue/10 mb-4 font-mono text-sm text-dg-muted">
                    {content.example.sql}
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-dg-blue/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-dg-muted block mb-1">Résultat & Impact</span>
                  <MarkdownRenderer content={content.example.result} />
                </div>
              </div>
            </section>

            {content.summary && (
              <section id="checklist" className="mb-16 scroll-mt-28">
                <h2 className="text-2xl font-bold text-dg-blue mb-6 border-b border-dg-blue/10 pb-2">
                  À Retenir
                </h2>
                <div className="bg-[#FFFDF2] border border-dg-blue/10 rounded-xl p-8 shadow-sm">
                  <ul className="space-y-4">
                    {content.summary.map((point, i) => (
                      <li key={i} className="flex items-start text-lg text-dg-text">
                        <CheckCircle2 className="text-dg-mint fill-dg-blue mt-1 mr-4 flex-shrink-0" size={20} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            <div className="mt-12 pt-8 border-t border-dg-blue/10">
              <div className="flex justify-center mb-12">
                <SectionCheckbox lessonId={lessonMeta.id} />
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                {prevLesson ? (
                  <Link 
                    to={`/data-products/${prevLesson.slug}`}
                    className="flex items-center px-6 py-4 rounded-xl border border-dg-blue/10 hover:border-dg-blue/30 bg-white hover:bg-dg-cream/30 transition-all group w-full sm:w-auto"
                  >
                    <ArrowLeft size={20} className="mr-3 text-dg-muted group-hover:text-dg-blue" />
                    <div className="text-left">
                      <span className="block text-xs text-dg-muted uppercase tracking-wider">Précédent</span>
                      <span className="font-bold text-dg-blue">{prevLesson.title}</span>
                    </div>
                  </Link>
                ) : <div />}

                {nextLesson ? (
                  <Link 
                    to={`/data-products/${nextLesson.slug}`}
                    className="flex items-center justify-between px-6 py-4 rounded-xl bg-dg-blue text-white hover:bg-blue-900 transition-all shadow-lg shadow-dg-blue/10 group w-full sm:w-auto text-right"
                  >
                    <div className="text-right mr-3">
                      <span className="block text-xs text-white/70 uppercase tracking-wider">Suivant</span>
                      <span className="font-bold">{nextLesson.title}</span>
                    </div>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <Link 
                    to="/data-products"
                    className="flex items-center px-6 py-4 rounded-xl bg-dg-mint text-dg-blue font-bold hover:bg-white transition-all shadow-lg"
                  >
                    Retour au sommaire
                  </Link>
                )}
              </div>
            </div>

          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:block sticky top-32">
            <div className="bg-white border border-dg-blue/10 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-dg-muted uppercase tracking-wider mb-4 border-b border-dg-blue/5 pb-2">
                Dans cet article
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="block w-full text-left px-3 py-2 text-sm text-dg-muted hover:text-dg-blue hover:bg-dg-blue/5 rounded-md transition-colors truncate"
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-dg-blue/5">
                <Link to="/data-products" className="flex items-center text-sm font-semibold text-dg-blue hover:underline">
                  <ArrowLeft size={14} className="mr-2" />
                  Tous les sujets
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </PageContainer>

      {/* MOBILE NAV */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsTocOpen(!isTocOpen)}
          className="bg-dg-blue text-white p-4 rounded-full shadow-xl hover:bg-blue-900 transition-colors"
        >
          {isTocOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isTocOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsTocOpen(false)}>
          <div className="absolute bottom-20 right-6 w-64 bg-white rounded-xl shadow-2xl p-4 animate-in slide-in-from-bottom-10">
            <h4 className="text-xs font-bold text-dg-muted uppercase tracking-wider mb-4 px-2">Navigation</h4>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="block w-full text-left px-3 py-3 text-sm text-dg-blue font-medium border-b border-gray-100 last:border-0"
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

    </div>
  );
};
