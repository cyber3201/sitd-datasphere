
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Lock, Mail, User as UserIcon, MapPin, GraduationCap, Database, AlertCircle } from 'lucide-react';

export const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    school: '',
    city: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    await register({
      fullName: formData.fullName,
      email: formData.email,
      school: formData.school,
      city: formData.city,
      password: formData.password
    });

    // Redirect to Home
    navigate('/');
  };

  const inputClass = "w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-dg-blue/20 focus:border-dg-blue outline-none transition-all text-gray-900 placeholder-gray-400";

  return (
    <div className="min-h-screen flex bg-dg-cream">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 bg-white shadow-2xl z-10 overflow-y-auto">
        <div className="max-w-md w-full mx-auto my-auto">
          <Link to="/" className="flex items-center gap-2 mb-8 text-dg-blue font-bold tracking-tight hover:opacity-80 transition-opacity w-fit">
            <Database size={24} className="text-dg-mint" />
            <span>DataSphere</span>
          </Link>

          <h1 className="text-3xl font-extrabold text-dg-blue mb-3">Créer un compte</h1>
          <p className="text-dg-muted mb-8">Rejoignez la référence francophone de l'ingénierie data.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-dg-blue mb-1">Nom complet</label>
              <div className="relative">
                <input required name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} placeholder="Jean Dupont" />
                <UserIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-dg-blue mb-1">École / Entreprise</label>
                <div className="relative">
                  <input name="school" value={formData.school} onChange={handleChange} className={inputClass} placeholder="Université X" />
                  <GraduationCap size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dg-blue mb-1">Ville</label>
                <div className="relative">
                  <input name="city" value={formData.city} onChange={handleChange} className={inputClass} placeholder="Paris" />
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dg-blue mb-1">Email</label>
              <div className="relative">
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="nom@exemple.com" />
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-dg-blue mb-1">Mot de passe</label>
                <div className="relative">
                  <input required type="password" name="password" minLength={8} value={formData.password} onChange={handleChange} className={inputClass} placeholder="8+ caractères" />
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dg-blue mb-1">Confirmer</label>
                <div className="relative">
                  <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={inputClass} placeholder="Répéter" />
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 bg-dg-blue text-white font-bold rounded-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-dg-blue/20"
              >
                {isLoading ? 'Création...' : <>Commencer l'aventure <ArrowRight size={20} /></>}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-dg-muted text-sm">
            Déjà un compte ? <Link to="/login" className="text-dg-blue font-bold hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>

      {/* Right Column: Visuals */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-dg-blue to-[#0F172A] overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        
        <div className="relative z-10 max-w-lg p-12 text-white">
           <h2 className="text-4xl font-extrabold mb-6 leading-tight">
             Rejoignez une communauté d'élite.
           </h2>
           <ul className="space-y-6 text-lg text-dg-cream/90">
             <li className="flex items-start gap-4">
               <div className="w-8 h-8 rounded-lg bg-dg-mint text-dg-blue flex items-center justify-center flex-shrink-0 font-bold">1</div>
               <div>
                 <strong className="block text-white">Apprenez par la pratique</strong>
                 Des exercices SQL interactifs et des cas réels.
               </div>
             </li>
             <li className="flex items-start gap-4">
               <div className="w-8 h-8 rounded-lg bg-dg-mint text-dg-blue flex items-center justify-center flex-shrink-0 font-bold">2</div>
               <div>
                 <strong className="block text-white">Standardisez vos connaissances</strong>
                 Data Governance, Modeling, Ops : tout y est.
               </div>
             </li>
             <li className="flex items-start gap-4">
               <div className="w-8 h-8 rounded-lg bg-dg-mint text-dg-blue flex items-center justify-center flex-shrink-0 font-bold">3</div>
               <div>
                 <strong className="block text-white">Suivez votre progression</strong>
                 Certificats de fin de module (bientôt disponible).
               </div>
             </li>
           </ul>
        </div>
      </div>
    </div>
  );
};
