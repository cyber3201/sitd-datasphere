
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PageContainer } from '../components/PageContainer';
import { ProfileEditModal } from '../components/ProfileEditModal';
import { ProfileSectionModal } from '../components/ProfileSectionModals';
import { 
  MapPin, 
  Share2, 
  Pencil, 
  Briefcase, 
  GraduationCap, 
  Plus, 
  BookOpen, 
  Award, 
  ChevronRight,
  Layout,
  Database,
  Shield,
  Package,
  Settings,
  Users,
  Linkedin,
  Github,
  Globe,
  Trash2,
  ExternalLink
} from 'lucide-react';

import { LESSONS as SQL_LESSONS } from '../lib/sqlMastery';
import { DB_LESSONS } from '../lib/dbDesign';
import { DM_LESSONS } from '../lib/dataManagement';
import { DG_LESSONS } from '../lib/dataGovernance';
import { DP_LESSONS } from '../lib/dataProducts';
import { OM_LESSONS } from '../lib/operatingModel';
import { getCourseStats } from '../lib/progress';
import { Link } from 'react-router-dom';
import { profileAPI, UserProfile } from '../lib/profile';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  // State
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeSectionModal, setActiveSectionModal] = useState<'experience' | 'education' | 'project' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null); // For editing specific items

  // Load Profile on mount
  useEffect(() => {
    if (user) {
      setProfile(profileAPI.getProfile(user.id));
    }
  }, [user]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user || !profile) return null;

  const initials = user.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // --- Actions ---

  const handleSaveProfile = (updatedUser: any, updatedProfile: any) => {
    // 1. Update core auth user (Name, City, School)
    updateProfile(updatedUser);
    
    // 2. Update extended profile (Avatar, Links, Roles)
    const newProfile = { ...profile, ...updatedProfile };
    const saved = profileAPI.saveProfile(newProfile);
    if (saved) setProfile(saved);
  };

  const handleSaveSection = (data: any) => {
    if (!profile) return;
    let newProfile = { ...profile };

    if (activeSectionModal === 'project') {
      const exists = newProfile.projects.find(p => p.id === data.id);
      if (exists) {
        newProfile.projects = newProfile.projects.map(p => p.id === data.id ? data : p);
      } else {
        newProfile.projects = [data, ...newProfile.projects];
      }
    } else if (activeSectionModal === 'experience') {
      const exists = newProfile.experiences.find(e => e.id === data.id);
      if (exists) {
        newProfile.experiences = newProfile.experiences.map(e => e.id === data.id ? data : e);
      } else {
        newProfile.experiences = [data, ...newProfile.experiences];
      }
    } else if (activeSectionModal === 'education') {
      const exists = newProfile.educations.find(e => e.id === data.id);
      if (exists) {
        newProfile.educations = newProfile.educations.map(e => e.id === data.id ? data : e);
      } else {
        newProfile.educations = [data, ...newProfile.educations];
      }
    }

    const saved = profileAPI.saveProfile(newProfile);
    if (saved) setProfile(saved);
  };

  const handleDeleteItem = (type: 'project' | 'experience' | 'education', id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
    let newProfile = { ...profile };
    if (type === 'project') newProfile.projects = newProfile.projects.filter(p => p.id !== id);
    if (type === 'experience') newProfile.experiences = newProfile.experiences.filter(e => e.id !== id);
    if (type === 'education') newProfile.educations = newProfile.educations.filter(e => e.id !== id);
    
    const saved = profileAPI.saveProfile(newProfile);
    if (saved) setProfile(saved);
  };

  // --- Stats Logic ---
  const tracks = [
    { title: "SQL Mastery", lessons: SQL_LESSONS, icon: <Database size={20} />, path: "/sql-mastery" },
    { title: "Database Design", lessons: DB_LESSONS, icon: <Layout size={20} />, path: "/db-design" },
    { title: "Data Management", lessons: DM_LESSONS, icon: <Settings size={20} />, path: "/data-management" },
    { title: "Data Governance", lessons: DG_LESSONS, icon: <Shield size={20} />, path: "/data-governance" },
    { title: "Data Products", lessons: DP_LESSONS, icon: <Package size={20} />, path: "/data-products" },
    { title: "Operating Model", lessons: OM_LESSONS, icon: <Users size={20} />, path: "/operating-model" },
  ];

  const activeTracks = tracks.map(track => {
    const stats = getCourseStats(track.lessons);
    return { ...track, stats };
  }).filter(t => t.stats.completed > 0);

  const totalLessons = tracks.reduce((acc, t) => acc + t.lessons.length, 0);
  const totalCompleted = tracks.reduce((acc, t) => acc + getCourseStats(t.lessons).completed, 0);
  const globalPercent = Math.round((totalCompleted / totalLessons) * 100) || 0;

  return (
    <div className="bg-dg-cream min-h-screen pb-12 font-sans">
      <PageContainer className="max-w-[1200px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
          
          {/* LEFT SIDEBAR */}
          <aside className="space-y-6">
            
            {/* Personal Details Card */}
            <div className="bg-white rounded-xl border border-dg-blue/10 shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 text-center border-b border-gray-100 relative">
                
                {/* Edit Button */}
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="absolute top-3 right-3 p-2 text-dg-muted hover:text-dg-blue hover:bg-dg-blue/5 rounded-full transition-colors"
                  title="Modifier le profil"
                >
                  <Pencil size={16} />
                </button>

                {/* Avatar */}
                <div className="w-28 h-28 mx-auto rounded-full bg-dg-blue text-white flex items-center justify-center text-3xl font-bold mb-4 border-4 border-dg-cream shadow-inner overflow-hidden">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                
                {/* Name & Location */}
                <h2 className="text-xl font-bold text-dg-text mb-1">{user.fullName}</h2>
                <p className="text-sm text-dg-blue font-medium mb-1">{profile.preferences.role || 'Apprenant DataSphere'}</p>
                <div className="flex items-center justify-center text-xs text-gray-500 gap-1 mb-6">
                  <MapPin size={12} />
                  <span>{user.city || 'Localisation non définie'}</span>
                </div>

                {/* Open To Work Badge */}
                {profile.preferences.openToWork && (
                  <div className="mb-6 inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                    #OpenToWork
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full py-2 px-4 border border-dg-blue/20 text-dg-blue font-semibold rounded-lg hover:bg-dg-blue/5 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Share2 size={16} />
                    Partager le profil
                  </button>
                </div>
              </div>

              {/* Sidebar Sections */}
              <div className="divide-y divide-gray-50">
                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Liens</h3>
                    <button onClick={() => setIsEditModalOpen(true)} className="text-dg-blue hover:text-dg-maroon"><Pencil size={12}/></button>
                  </div>
                  <div className="space-y-2">
                    {profile.links.linkedin && (
                      <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center text-sm text-gray-600 hover:text-[#0077b5] transition-colors gap-2">
                        <Linkedin size={16} /> LinkedIn
                      </a>
                    )}
                    {profile.links.github && (
                      <a href={profile.links.github} target="_blank" rel="noreferrer" className="flex items-center text-sm text-gray-600 hover:text-black transition-colors gap-2">
                        <Github size={16} /> GitHub
                      </a>
                    )}
                    {profile.links.website && (
                      <a href={profile.links.website} target="_blank" rel="noreferrer" className="flex items-center text-sm text-gray-600 hover:text-dg-blue transition-colors gap-2">
                        <Globe size={16} /> Portfolio
                      </a>
                    )}
                    {!profile.links.linkedin && !profile.links.github && !profile.links.website && (
                      <p className="text-xs text-gray-400 italic">Aucun lien ajouté</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </aside>

          {/* MAIN CONTENT */}
          <main className="space-y-8">
            
            {/* Experience Section */}
            <section>
              <h2 className="text-xl font-bold text-dg-text mb-4">Expérience</h2>
              <div className="bg-white rounded-xl border border-dg-blue/10 shadow-sm p-6 space-y-8">
                
                {/* Projects */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-dg-blue flex items-center gap-2">
                      Projets <InfoTooltip text="Visible par les recruteurs" />
                    </h3>
                    <button 
                      onClick={() => { setEditingItem(null); setActiveSectionModal('project'); }}
                      className="text-xs font-bold text-white bg-dg-blue px-3 py-1.5 rounded hover:bg-blue-900 transition-colors flex items-center gap-1"
                    >
                      <Plus size={14} /> Ajouter
                    </button>
                  </div>

                  {profile.projects.length === 0 ? (
                    <div className="bg-dg-cream/30 border border-dashed border-dg-blue/20 rounded-lg p-6 text-center">
                      <p className="text-sm text-dg-muted mb-4">
                        Démontrez vos compétences avec des projets concrets. Ajoutez vos réalisations DataSphere ici.
                      </p>
                      <button 
                        onClick={() => { setEditingItem(null); setActiveSectionModal('project'); }}
                        className="text-sm font-bold text-dg-blue hover:text-dg-maroon transition-colors"
                      >
                        + Ajouter un projet
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {profile.projects.map((proj) => (
                        <div key={proj.id} className="border border-gray-100 rounded-lg p-4 hover:border-dg-blue/20 transition-all group relative">
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button onClick={() => { setEditingItem(proj); setActiveSectionModal('project'); }} className="p-1.5 text-gray-400 hover:text-dg-blue hover:bg-blue-50 rounded"><Pencil size={14}/></button>
                            <button onClick={() => handleDeleteItem('project', proj.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={14}/></button>
                          </div>
                          <div className="flex items-start justify-between pr-16">
                            <h4 className="font-bold text-dg-blue text-sm">{proj.name}</h4>
                            {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-dg-blue flex items-center"><ExternalLink size={12} className="mr-1"/> Voir</a>}
                          </div>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <hr className="border-gray-100" />

                {/* Work History */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-dg-blue">Historique professionnel</h3>
                    <button 
                      onClick={() => { setEditingItem(null); setActiveSectionModal('experience'); }}
                      className="text-xs font-bold text-dg-blue border border-dg-blue/20 px-3 py-1.5 rounded hover:bg-dg-blue/5 transition-colors flex items-center gap-1"
                    >
                      <Plus size={14} /> Ajouter
                    </button>
                  </div>

                  {profile.experiences.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        Ajoutez votre expérience professionnelle, vos stages ou votre bénévolat.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {profile.experiences.map((exp) => (
                        <div key={exp.id} className="flex gap-4 group">
                          <div className="mt-1 flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-dg-blue/20 border border-dg-blue"></div>
                            <div className="w-px h-full bg-gray-200 my-1"></div>
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-dg-text">{exp.title}</h4>
                                <div className="text-sm font-semibold text-dg-blue">{exp.company}</div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {exp.startDate} — {exp.current ? 'Présent' : exp.endDate}
                                </div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button onClick={() => { setEditingItem(exp); setActiveSectionModal('experience'); }} className="p-1.5 text-gray-400 hover:text-dg-blue"><Pencil size={14}/></button>
                                <button onClick={() => handleDeleteItem('experience', exp.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={14}/></button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </section>

            {/* Education Section */}
            <section>
              <h2 className="text-xl font-bold text-dg-text mb-4">Éducation</h2>
              <div className="bg-white rounded-xl border border-dg-blue/10 shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-dg-blue flex items-center gap-2">
                    Certifications & Diplômes <InfoTooltip text="Validé par DataSphere" />
                  </h3>
                  <button 
                    onClick={() => { setEditingItem(null); setActiveSectionModal('education'); }}
                    className="px-3 py-1.5 border border-dg-blue/20 text-dg-blue text-xs font-bold rounded hover:bg-dg-blue/5 transition-colors flex items-center gap-1"
                  >
                    <Plus size={14} /> Ajouter
                  </button>
                </div>

                {profile.educations.length === 0 ? (
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-dg-blue/5 rounded-lg flex items-center justify-center text-dg-blue">
                      <GraduationCap size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-dg-text">{user.school || 'Ajoutez votre formation'}</h4>
                      <p className="text-sm text-dg-muted">Cliquez sur Ajouter pour compléter votre parcours.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile.educations.map((edu) => (
                      <div key={edu.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
                        <div className="w-12 h-12 bg-dg-blue/5 rounded-lg flex items-center justify-center text-dg-blue group-hover:bg-dg-blue group-hover:text-white transition-colors flex-shrink-0">
                          <GraduationCap size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-bold text-dg-text">{edu.school}</h4>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button onClick={() => { setEditingItem(edu); setActiveSectionModal('education'); }} className="p-1.5 text-gray-400 hover:text-dg-blue"><Pencil size={14}/></button>
                                <button onClick={() => handleDeleteItem('education', edu.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={14}/></button>
                            </div>
                          </div>
                          <p className="text-sm text-dg-blue font-medium">{edu.degree}</p>
                          <p className="text-xs text-dg-muted mt-1">{edu.startDate} - {edu.endDate || 'Présent'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Courses / Progress Section */}
            <section>
              <h2 className="text-xl font-bold text-dg-text mb-4">Cours & Progression</h2>
              <div className="bg-white rounded-xl border border-dg-blue/10 shadow-sm overflow-hidden">
                
                {/* Global Stats */}
                <div className="p-6 bg-dg-blue/5 border-b border-dg-blue/10">
                   <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-dg-blue flex items-center gap-2">
                        <Award size={18} /> Progression Globale
                      </h3>
                      <span className="text-xl font-extrabold text-dg-blue">{globalPercent}%</span>
                   </div>
                   <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-dg-blue/10">
                      <div className="h-full bg-dg-mint transition-all duration-1000" style={{ width: `${globalPercent}%` }} />
                   </div>
                   <p className="text-xs text-dg-muted mt-2 text-right">
                     {totalCompleted} leçons terminées sur {totalLessons}
                   </p>
                </div>

                {/* Active Tracks List */}
                <div className="divide-y divide-gray-100">
                  {activeTracks.length > 0 ? (
                    activeTracks.map((track, i) => (
                      <div key={i} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-dg-blue shadow-sm">
                            {track.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-dg-text text-sm mb-1">{track.title}</h4>
                                <div className="text-xs text-dg-muted mb-3">
                                  DataSphere Course • {track.stats.percent === 100 ? 'Complété' : 'En cours'}
                                </div>
                              </div>
                              {track.stats.percent === 100 && (
                                <Link to={track.path} className="text-xs font-bold text-dg-blue hover:underline">
                                  Voir le certificat
                                </Link>
                              )}
                            </div>
                            
                            {/* Track Progress Bar */}
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${track.stats.percent === 100 ? 'bg-green-500' : 'bg-dg-blue'}`} 
                                  style={{ width: `${track.stats.percent}%` }} 
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-500 min-w-[3rem] text-right">
                                {track.stats.percent}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <BookOpen size={24} />
                      </div>
                      <h3 className="font-bold text-gray-700 mb-2">Aucun cours commencé</h3>
                      <p className="text-sm text-gray-500 mb-6">Explorez le catalogue pour démarrer votre apprentissage.</p>
                      <Link to="/sql-mastery" className="px-6 py-2 bg-dg-blue text-white font-bold rounded-lg text-sm hover:bg-blue-900 transition-colors">
                        Parcourir le catalogue
                      </Link>
                    </div>
                  )}
                </div>

                {activeTracks.length > 0 && (
                  <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                    <Link to="/overview" className="text-sm font-bold text-dg-blue hover:text-dg-maroon flex items-center justify-center gap-1 transition-colors">
                      Voir tous les cours <ChevronRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </section>

          </main>
        </div>
      </PageContainer>

      {/* EDIT MODAL - MAIN DETAILS */}
      <ProfileEditModal 
        user={user}
        profile={profile}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />

      {/* EDIT MODAL - SECTIONS */}
      {activeSectionModal && (
        <ProfileSectionModal 
          type={activeSectionModal}
          isOpen={!!activeSectionModal}
          initialData={editingItem}
          onClose={() => setActiveSectionModal(null)}
          onSave={handleSaveSection}
        />
      )}
    </div>
  );
};

// Helper component for tooltips
const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="group relative inline-block ml-1 cursor-help">
    <div className="text-gray-400 hover:text-dg-blue transition-colors">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    </div>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
    </div>
  </div>
);
