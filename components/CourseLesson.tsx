
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, List, Check, X as XIcon, Lightbulb, Construction, Target, BookOpen, ChevronUp, ChevronDown } from 'lucide-react';
import { CourseModule, CourseLesson, LessonContent } from '../lib/courseTypes';
import { CurriculumNav } from './CurriculumNav';
import { SectionCheckbox } from './SectionCheckbox';
import { SqlProgressBar } from './SqlProgressBar';
import { MarkdownRenderer } from './MarkdownRenderer';
import { authAPI } from '../lib/auth';

interface Props {
  modules: CourseModule[];
  lessons: CourseLesson[];
  contentMap: Record<string, LessonContent>;
  basePath: string;
}

export const CourseLessonPage: React.FC<Props> = ({ modules, lessons, contentMap, basePath }) => {
  const { lessonSlug } = useParams<{ lessonSlug: string }>();
  const [mobilePlanOpen, setMobilePlanOpen] = useState(false);
  const location = useLocation();
  
  const decodedSlug = lessonSlug ? decodeURIComponent(lessonSlug) : '';

  const lessonIndex = lessons.findIndex(l => l.slug === decodedSlug);
  const lessonMeta = lessons[lessonIndex];

  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;
  
  const content: LessonContent | undefined = decodedSlug ? contentMap[decodedSlug] : undefined;

  // Track history
  useEffect(() => {
    if (lessonMeta && content) {
      authAPI.addToHistory({
        title: lessonMeta.title,
        slug: lessonMeta.slug,
        path: location.pathname,
        timestamp: Date.now()
      });
    }
  }, [lessonMeta, content, location.pathname]);

  if (!lessonMeta) {
    return <Navigate to={basePath} replace />;
  }
  
  return (
    <div className="animate-in fade-in duration-300">
      
      {/* 1. Full-Width Progress Bar */}
      <div className="sticky top-16 z-40 bg-dg-cream shadow-sm">
        <SqlProgressBar /> 
      </div>

      {/* 2. Mobile Sticky Header for Content Nav */}
      <div className="lg:hidden sticky top-[7.5rem] z-30 bg-dg-cream/95 backdrop-blur border-b border-dg-blue/10 px-4 py-3 flex justify-between items-center shadow-sm">
        <span className="font-semibold text-dg-blue truncate pr-4 text-sm">{lessonMeta.title}</span>
        <button 
          onClick={() => setMobilePlanOpen(true)}
          className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-dg-maroon hover:bg-dg-blue/5 px-3 py-1.5 rounded transition-colors border border-dg-blue/10"
        >
          <List size={16} />
          <span>Plan</span>
        </button>
      </div>

      {/* 3. Main Grid Layout */}
      <div className="max-w-[1500px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px] gap-10 items-start">
          
          {/* Left Column: Content */}
          <main className="min-w-0 w-full">
            <Link to={basePath} className="inline-flex items-center text-dg-muted hover:text-dg-blue mb-8 transition-colors text-sm font-medium">
              <ArrowLeft size={16} className="mr-1" />
              Retour au cursus
            </Link>

            {content ? (
              <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-dg-blue prose-a:text-dg-blue hover:prose-a:text-dg-maroon">
                <header className="mb-8 border-b border-dg-blue/10 pb-8 not-prose">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold uppercase ${
                      lessonMeta.level === 'Débutant' ? 'bg-green-100 text-green-800' :
                      lessonMeta.level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800' :
                      lessonMeta.level === 'Avancé' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lessonMeta.level}
                    </span>
                    <span className="flex items-center text-xs text-dg-muted font-medium">
                      <Clock size={14} className="mr-1" />
                      {lessonMeta.estimatedMinutes} min
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dg-blue leading-tight break-words hyphens-auto mb-6">
                    {lessonMeta.title}
                  </h1>

                  {/* Optional Objectives Section */}
                  {content.objectives && content.objectives.length > 0 && (
                    <div className="bg-white border border-dg-blue/10 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-dg-blue font-bold text-sm uppercase tracking-wide">
                        <Target size={18} />
                        Objectifs de la leçon
                      </div>
                      <ul className="space-y-2">
                        {content.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start text-base text-dg-muted">
                            <Check size={16} className="mt-1 mr-2 text-dg-mint flex-shrink-0 stroke-[3]" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </header>

                <section id="why" className="mb-16 scroll-mt-36">
                  <h2 className="text-2xl font-bold text-dg-blue mb-4">1. {content.why.title}</h2>
                  <div className="bg-dg-blue/5 p-6 rounded-lg border-l-4 border-dg-blue mb-6 not-prose">
                    <MarkdownRenderer content={content.why.content} />
                  </div>
                </section>

                <section id="concept" className="mb-16 scroll-mt-36">
                  <h2>2. {content.concept.title}</h2>
                  <MarkdownRenderer content={content.concept.content} />
                  
                  {content.concept.syntax && (
                    <div className="bg-[#1e1e1e] text-gray-200 p-5 rounded-lg overflow-x-auto shadow-inner border border-gray-700 not-prose my-6">
                      <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap">{content.concept.syntax}</pre>
                    </div>
                  )}
                </section>

                <section id="example" className="mb-16 scroll-mt-36">
                  <h2>3. Exemple : {content.example.title}</h2>
                  <p>{content.example.description}</p>
                  <div className="grid grid-cols-1 gap-6 not-prose my-6">
                    {content.example.sql && (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-dg-muted mb-2">Modèle / Code</div>
                        <div className="bg-[#1e1e1e] text-gray-200 p-5 rounded-lg overflow-x-auto shadow-inner border border-gray-700">
                          <pre className="text-sm font-mono leading-relaxed">{content.example.sql}</pre>
                        </div>
                      </div>
                    )}
                    {content.example.result && (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-dg-muted mb-2">Analyse / Résultat</div>
                        <div className="bg-white border border-gray-200 p-4 rounded-lg overflow-x-auto shadow-sm">
                          <div className="text-sm font-mono text-dg-text whitespace-pre-wrap">
                             <MarkdownRenderer content={content.example.result} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <section id="exercises" className="mb-16 scroll-mt-36">
                  <h2>4. Exercices Pratiques</h2>
                  <div className="space-y-6 not-prose">
                    {content.exercises.map((ex, idx) => (
                      <ExerciseCard key={idx} index={idx + 1} exercise={ex} />
                    ))}
                  </div>
                </section>

                <section id="quiz" className="mb-16 scroll-mt-36">
                  <h2>5. Quiz de validation</h2>
                  <div className="space-y-8 not-prose">
                    {content.quiz.map((q, idx) => (
                      <QuizCard key={idx} index={idx + 1} quiz={q} />
                    ))}
                  </div>
                </section>

                {/* Optional Summary Section */}
                {content.summary && content.summary.length > 0 && (
                  <section id="summary" className="mb-12 scroll-mt-36 not-prose">
                    <div className="bg-dg-cream border border-dg-blue/10 rounded-xl p-8">
                       <h2 className="flex items-center text-xl font-bold text-dg-blue mb-4">
                         <BookOpen size={24} className="mr-2" />
                         À retenir
                       </h2>
                       <ul className="space-y-3">
                         {content.summary.map((point, i) => (
                           <li key={i} className="flex items-start text-dg-muted">
                             <div className="w-1.5 h-1.5 rounded-full bg-dg-blue mt-2 mr-3 flex-shrink-0" />
                             <span>{point}</span>
                           </li>
                         ))}
                       </ul>
                    </div>
                  </section>
                )}

                {/* Lesson Completion Checkbox - Only ONE per page */}
                <div className="mt-8 pt-8 border-t border-dg-blue/10 not-prose bg-dg-cream/20 p-6 rounded-xl text-center">
                  <p className="text-dg-muted mb-4 font-medium">Avez-vous maîtrisé cette leçon ?</p>
                  <div className="flex justify-center">
                    <SectionCheckbox lessonId={lessonMeta.id} />
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 not-prose">
                  {prevLesson ? (
                    <Link to={`${basePath}/${prevLesson.slug}`} className="flex items-center px-4 py-3 rounded-lg border border-dg-blue/10 hover:border-dg-blue/30 hover:bg-white transition-all text-dg-muted hover:text-dg-blue w-full sm:w-auto">
                      <ArrowLeft size={18} className="mr-2" />
                      <div>
                        <div className="text-xs uppercase tracking-wide opacity-70">Précédent</div>
                        <div className="font-semibold">{prevLesson.title}</div>
                      </div>
                    </Link>
                  ) : <div className="w-full sm:w-auto" />}

                  {nextLesson ? (
                    <Link to={`${basePath}/${nextLesson.slug}`} className="flex items-center justify-between sm:justify-start px-4 py-3 rounded-lg bg-dg-blue text-white hover:bg-dg-blue/90 shadow-sm transition-all w-full sm:w-auto text-right sm:text-left">
                      <div className="mr-3">
                        <div className="text-xs uppercase tracking-wide opacity-80">Suivant</div>
                        <div className="font-semibold">{nextLesson.title}</div>
                      </div>
                      <ArrowRight size={18} />
                    </Link>
                  ) : (
                    <Link to={basePath} className="flex items-center px-6 py-3 rounded-lg bg-dg-mint text-dg-blue font-bold hover:bg-white border border-transparent hover:border-dg-mint transition-all">
                      Terminer le module
                      <Check size={18} className="ml-2" />
                    </Link>
                  )}
                </div>
              </article>
            ) : (
              <div className="bg-white border border-dg-blue/10 rounded-xl p-12 text-center shadow-sm mt-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-dg-cream rounded-full mb-6">
                    <Construction className="text-dg-maroon" size={40} />
                </div>
                <h1 className="text-3xl font-bold text-dg-blue mb-4">{lessonMeta.title}</h1>
                <h2 className="text-xl font-medium text-dg-muted mb-6">Contenu à venir</h2>
                <p className="text-dg-muted max-w-lg mx-auto mb-10 leading-relaxed">
                    Le contenu de cette leçon est en cours d'intégration.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  {nextLesson && (
                    <Link 
                      to={`${basePath}/${nextLesson.slug}`}
                      className="flex items-center px-6 py-3 bg-dg-blue text-white rounded-lg hover:bg-dg-blue/90 transition-colors shadow-sm font-medium"
                    >
                      Passer à la leçon suivante
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </main>

          {/* Right Column: Curriculum Navigation (Desktop Only) */}
          <aside className="hidden lg:block sticky top-36 w-full flex-shrink-0 h-[calc(100vh-9rem)] overflow-y-auto scrollbar-thin pl-6 border-l border-dg-blue/5 self-start">
             <CurriculumNav 
               variant="desktop"
               modules={modules}
               lessons={lessons}
               basePath={basePath}
               currentLessonSlug={lessonMeta.slug} 
               mobileOpen={false} 
               setMobileOpen={() => {}} 
             />
          </aside>

          {/* Mobile Drawer */}
          <CurriculumNav 
             variant="mobile"
             modules={modules}
             lessons={lessons}
             basePath={basePath}
             currentLessonSlug={lessonMeta.slug} 
             mobileOpen={mobilePlanOpen} 
             setMobileOpen={setMobilePlanOpen} 
           />
        </div>
      </div>
    </div>
  );
};

const ExerciseCard: React.FC<{ index: number; exercise: LessonContent['exercises'][0] }> = ({ index, exercise }) => {
  const [showSolution, setShowSolution] = useState(false);
  return (
    <div className="bg-white border border-dg-blue/10 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6">
        <div className="flex items-start gap-3">
          <span className="bg-dg-blue text-white text-xs font-bold px-2 py-1 rounded">Ex {index}</span>
          <p className="font-medium text-dg-text">{exercise.question}</p>
        </div>
      </div>
      <div className="bg-dg-cream/30 border-t border-dg-blue/5 px-6 py-3">
        <button onClick={() => setShowSolution(!showSolution)} className="flex items-center text-sm font-semibold text-dg-blue hover:text-dg-maroon transition-colors focus:outline-none">
          {showSolution ? <ChevronUp size={16} className="mr-1" /> : <ChevronDown size={16} className="mr-1" />}
          {showSolution ? 'Masquer la solution' : 'Voir la solution'}
        </button>
        {showSolution && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-[#1e1e1e] text-gray-200 p-3 rounded-md mb-3"><pre className="text-sm font-mono whitespace-pre-wrap">{exercise.solution}</pre></div>
            <div className="flex items-start gap-2 text-sm text-dg-muted"><Lightbulb size={16} className="mt-0.5 text-yellow-600 flex-shrink-0" /><p>{exercise.explanation}</p></div>
          </div>
        )}
      </div>
    </div>
  );
};

const QuizCard: React.FC<{ index: number; quiz: LessonContent['quiz'][0] }> = ({ index, quiz }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const handleSelect = (idx: number) => { if (isRevealed) return; setSelectedOption(idx); setIsRevealed(true); };
  const isCorrect = selectedOption === quiz.answerIndex;

  return (
    <div className="bg-white border border-dg-blue/10 rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg text-dg-blue mb-4">Question {index} : {quiz.question}</h3>
      <div className="space-y-2">
        {quiz.options.map((option, idx) => {
          let styles = "border-dg-blue/10 hover:bg-dg-blue/5 hover:border-dg-blue/30";
          let icon = null;
          if (isRevealed) {
            if (idx === quiz.answerIndex) { styles = "bg-green-50 border-green-500 text-green-900"; icon = <Check size={18} className="text-green-600" />; }
            else if (selectedOption === idx) { styles = "bg-red-50 border-red-500 text-red-900"; icon = <XIcon size={18} className="text-red-600" />; }
            else { styles = "opacity-50 border-transparent"; }
          } else if (selectedOption === idx) { styles = "bg-dg-blue/10 border-dg-blue"; }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} disabled={isRevealed} className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center justify-between ${styles}`}>
              <span>{option}</span>{icon}
            </button>
          );
        })}
      </div>
      {isRevealed && (
        <div className={`mt-4 p-4 rounded-lg text-sm ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'} animate-in fade-in`}>
          <p className="font-bold mb-1">{isCorrect ? 'Correct !' : 'Incorrect.'}</p><p>{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
};
