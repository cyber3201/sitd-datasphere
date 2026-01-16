
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Shield,
  Database,
  Layout,
  FileText,
  Settings,
  ChevronRight
} from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { ScrollReveal } from '../components/ScrollReveal';
import { BackgroundDecor } from '../components/BackgroundDecor';

export const Home: React.FC = () => {
  return (
    <div className="relative overflow-x-hidden">
      <BackgroundDecor />
      
      <div className="relative z-10">
        
        {/* 1. HERO SECTION */}
        <PageContainer>
          <section className="text-center max-w-5xl mx-auto pt-12 pb-20 md:pt-28 md:pb-32">
            <ScrollReveal>
              {/* Badge removed */}
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-dg-blue mb-8 leading-[1.1]">
                Master the Craft of <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-dg-maroon">Data Engineering</span>
                  <motion.svg 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    viewBox="0 0 300 12" 
                    className="absolute -bottom-2 left-0 w-full h-3 text-dg-mint -z-0 opacity-60"
                    fill="none"
                  >
                    <motion.path d="M2 10C50 2 150 2 298 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </motion.svg>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-dg-muted mb-12 leading-relaxed max-w-2xl mx-auto font-light">
                A comprehensive, open-standard knowledge base. From <span className="font-medium text-dg-blue">SQL internals</span> to enterprise <span className="font-medium text-dg-blue">governance frameworks</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-10">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/sql-mastery" 
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white bg-dg-blue hover:bg-blue-900 transition-colors shadow-lg shadow-dg-blue/20 w-full sm:w-auto"
                  >
                    Start SQL Mastery
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/operating-model" 
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-dg-blue bg-white border border-dg-blue/10 hover:border-dg-blue/30 shadow-sm hover:shadow-md transition-all w-full sm:w-auto"
                  >
                    Browse Modules
                  </Link>
                </motion.div>
              </div>

              <p className="text-sm font-semibold text-dg-muted/60 tracking-widest uppercase">
                Structured learning • Practical examples • Governance included
              </p>
            </ScrollReveal>
          </section>
        </PageContainer>

        {/* 2. PURPOSE (Why DataSphere?) */}
        <PageContainer>
          <section className="max-w-4xl mx-auto py-20 px-4">
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-sm font-bold text-dg-maroon tracking-widest uppercase mb-2">Why DataSphere?</h2>
                  <p className="text-3xl font-serif text-dg-blue leading-snug">
                    DataSphere bridges the gap between writing code and building reliable data systems. It is not just about syntax; it is about standards, stewardship, and scalability.
                  </p>
                </div>
                <div className="space-y-4 min-w-[280px]">
                  {[
                    "Master SQL & Fundamentals",
                    "Understand Operating Models",
                    "Build Trusted Products"
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center space-x-3 text-dg-text font-medium bg-white/50 p-3 rounded-lg border border-dg-blue/5 shadow-sm"
                    >
                      <CheckCircle2 className="text-dg-mint flex-shrink-0 fill-dg-blue" size={20} />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>
        </PageContainer>

        {/* 3. ABOUT (Who is it for?) */}
        <PageContainer>
          <section className="py-20 my-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-dg-blue mb-4">Who is this for?</h2>
                <p className="text-lg text-dg-muted max-w-2xl mx-auto">Designed for practitioners at every stage of the data journey, from first query to architectural sign-off.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AudienceCard 
                  icon={<GraduationCap size={24} />}
                  title="Students"
                  desc="Building a strong theoretical foundation."
                  delay={0}
                />
                <AudienceCard 
                  icon={<Briefcase size={24} />}
                  title="Juniors"
                  desc="Applying skills in real-world scenarios."
                  delay={0.1}
                />
                <AudienceCard 
                  icon={<Users size={24} />}
                  title="Transitioners"
                  desc="Moving from Excel to Data Engineering."
                  delay={0.2}
                />
                <AudienceCard 
                  icon={<Shield size={24} />}
                  title="Governance Leads"
                  desc="Establishing policies and standards."
                  delay={0.3}
                />
              </div>
            </ScrollReveal>
          </section>
        </PageContainer>

        {/* 4. LEARNING MAP (Roadmap) */}
        <PageContainer>
          <section className="py-20 max-w-5xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-20">
                  <h2 className="text-4xl font-bold text-dg-blue mb-4">Curriculum Roadmap</h2>
                  <p className="text-dg-muted max-w-xl mx-auto">
                    A structured path designed to take you from query writing to architectural ownership.
                  </p>
              </div>
              
              <div className="relative">
                  {/* Vertical Line with Gradient */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-dg-blue/5 via-dg-blue/20 to-dg-blue/5 -translate-x-1/2 md:translate-x-0" />

                  <div className="space-y-16">
                    <RoadmapItem 
                      side="left"
                      title="SQL Mastery"
                      path="/sql-mastery"
                      desc="Deep dive into query execution, indexing, and optimization strategies."
                      icon={<Database size={18} />}
                      step="01"
                    />
                    <RoadmapItem 
                      side="right"
                      title="Database Design"
                      path="/db-design"
                      desc="Normalization, schema architecture, and modeling patterns."
                      icon={<Layout size={18} />}
                      step="02"
                    />
                    <RoadmapItem 
                      side="left"
                      title="Data Management"
                      path="/data-management"
                      desc="Pipelines, quality checks, and lifecycle management."
                      icon={<Settings size={18} />}
                      step="03"
                    />
                    <RoadmapItem 
                      side="right"
                      title="Governance"
                      path="/data-governance"
                      desc="Policies, stewards, and compliance frameworks."
                      icon={<Shield size={18} />}
                      step="04"
                    />
                    <RoadmapItem 
                      side="left"
                      title="Data Products"
                      path="/data-products"
                      desc="Packaging data with clear ownership and service contracts."
                      icon={<FileText size={18} />}
                      step="05"
                    />
                    <RoadmapItem 
                      side="right"
                      title="Operating Model"
                      path="/operating-model"
                      desc="Team topology and workflow orchestration."
                      icon={<Users size={18} />}
                      step="06"
                    />
                  </div>
              </div>
            </ScrollReveal>
          </section>
        </PageContainer>

        {/* 5. OUTCOMES - Full Width Section outside PageContainer to avoid negative margin overflow */}
        <section className="py-24 bg-white/40 border-y border-dg-blue/5 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-dg-blue mb-12 text-center">What you'll be able to do</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                    {[
                      "Write complex joins and window functions",
                      "Model relational schemas and normalize data",
                      "Define quality rules and access policies",
                      "Create a data product card and KPIs definitions",
                      "Explain governance to business stakeholders",
                      "Architect scalable data pipelines",
                      "Manage metadata and data catalogs",
                      "Implement role-based access control"
                    ].map((outcome, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start space-x-4 group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="mt-1 text-dg-maroon group-hover:text-dg-blue transition-colors">
                          <CheckCircle2 size={20} />
                        </div>
                        <span className="text-dg-text font-medium text-lg">{outcome}</span>
                      </motion.div>
                    ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 6. FEATURED START POINTS */}
        <PageContainer>
          <section className="py-24 text-center">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-dg-blue mb-12">Start your journey here</h2>
              <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto px-4">
                <StartLink 
                  to="/sql-mastery"
                  title="SQL Mastery"
                  subtitle="Beginner to Advanced"
                  color="blue"
                />
                <StartLink 
                  to="/data-governance"
                  title="Governance"
                  subtitle="Overview & Frameworks"
                  color="maroon"
                />
                <StartLink 
                  to="/data-products"
                  title="Data Products"
                  subtitle="Templates & Guides"
                  color="mint"
                />
              </div>
            </ScrollReveal>
          </section>

          {/* 7. FINAL CTA */}
          <section className="py-12">
            <ScrollReveal>
              <div className="relative bg-dg-blue text-dg-cream rounded-3xl p-12 md:p-24 text-center shadow-2xl shadow-dg-blue/20 overflow-hidden mx-auto max-w-6xl group">
                {/* Background Shapes for CTA */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                  <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-dg-mint rounded-full blur-[100px]" />
                  <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] bg-dg-maroon rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Build systems, not just queries.</h2>
                  <p className="text-xl text-dg-mint/90 mb-12 max-w-2xl mx-auto font-light">
                    Join the standard for modern data engineering and governance.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/sql-mastery" 
                      className="inline-block px-12 py-5 bg-dg-mint text-dg-blue font-bold text-lg rounded-xl hover:bg-white transition-colors shadow-lg"
                    >
                      Begin The Course
                    </Link>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </section>
        </PageContainer>
      </div>
    </div>
  );
};

/* --- Subcomponents --- */

const AudienceCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; delay: number }> = ({ icon, title, desc, delay }) => (
  <motion.div 
    whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)" }}
    transition={{ type: "spring", stiffness: 300 }}
    className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-dg-blue/5 shadow-sm transition-all"
  >
    <div className="w-14 h-14 bg-gradient-to-br from-dg-mint/30 to-dg-blue/10 rounded-2xl flex items-center justify-center text-dg-blue mb-6 shadow-inner">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-dg-blue mb-3">{title}</h3>
    <p className="text-sm text-dg-muted leading-relaxed">{desc}</p>
  </motion.div>
);

interface RoadmapItemProps {
  side: 'left' | 'right';
  title: string;
  desc: string;
  path: string;
  icon: React.ReactNode;
  step: string;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ side, title, desc, path, icon, step }) => {
  const isLeft = side === 'left';
  return (
    <div className={`flex md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} relative group`}>
      {/* Spacer for desktop alignment */}
      <div className="hidden md:block md:w-1/2" />
      
      {/* Center Marker */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <motion.div 
          whileHover={{ scale: 1.2 }}
          className="w-12 h-12 rounded-full bg-dg-cream border-[3px] border-white ring-1 ring-dg-blue/20 text-dg-blue flex items-center justify-center shadow-lg relative"
        >
          <div className="absolute inset-0 rounded-full bg-dg-blue/5 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
          {icon}
        </motion.div>
      </div>

      {/* Content */}
      <div className={`pl-24 md:pl-0 md:w-1/2 md:px-12 w-full ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <Link to={path} className="block group/card">
          <div className={`
            inline-block p-6 rounded-2xl border border-dg-blue/5 bg-white hover:border-dg-blue/20 hover:shadow-lg transition-all duration-300
            ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}
          `}>
            <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
              <span className="text-xs font-bold text-dg-maroon/60 uppercase tracking-widest">{step}</span>
              <h3 className="text-xl font-bold text-dg-blue group-hover/card:text-dg-maroon transition-colors">{title}</h3>
            </div>
            <p className="text-dg-muted text-sm leading-relaxed">{desc}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const StartLink: React.FC<{ to: string; title: string; subtitle: string; color: 'blue' | 'maroon' | 'mint' }> = ({ to, title, subtitle, color }) => {
  const hoverBorder = color === 'blue' ? 'group-hover:border-dg-blue' : color === 'maroon' ? 'group-hover:border-dg-maroon' : 'group-hover:border-dg-mint';
  const iconColor = color === 'blue' ? 'text-dg-blue' : color === 'maroon' ? 'text-dg-maroon' : 'text-green-600';

  return (
    <motion.div whileHover={{ y: -4 }} className="flex-1">
      <Link to={to} className={`group flex items-center justify-between p-6 bg-white border border-dg-blue/10 rounded-2xl shadow-sm hover:shadow-md transition-all ${hoverBorder} h-full`}>
        <div className="text-left">
          <span className={`block text-lg font-bold text-dg-blue transition-colors`}>{title}</span>
          <span className="text-sm text-dg-muted">{subtitle}</span>
        </div>
        <div className={`bg-dg-cream p-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity ${iconColor}`}>
          <ChevronRight size={20} />
        </div>
      </Link>
    </motion.div>
  );
};
