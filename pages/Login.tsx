
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Lock, Mail, AlertCircle, Database } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to Home by default, or the protected page they tried to visit
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Email ou mot de passe incorrect. Avez-vous créé un compte ?');
    }
  };

  return (
    <div className="min-h-screen flex bg-dg-cream">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-16 lg:p-24 bg-white shadow-2xl z-10">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="flex items-center gap-2 mb-12 text-dg-blue font-bold tracking-tight hover:opacity-80 transition-opacity w-fit">
            <Database size={24} className="text-dg-mint" />
            <span>DataSphere</span>
          </Link>

          <h1 className="text-4xl font-extrabold text-dg-blue mb-3">Bon retour</h1>
          <p className="text-dg-muted mb-8">Connectez-vous pour continuer votre apprentissage.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-dg-blue mb-2">Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-dg-blue/20 focus:border-dg-blue outline-none transition-all text-gray-900 placeholder-gray-400"
                  placeholder="nom@exemple.com"
                />
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dg-blue mb-2">Mot de passe</label>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-dg-blue/20 focus:border-dg-blue outline-none transition-all text-gray-900 placeholder-gray-400"
                  placeholder="••••••••"
                />
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-dg-muted">
                <input type="checkbox" className="rounded border-gray-300 text-dg-blue focus:ring-dg-blue" />
                Se souvenir de moi
              </label>
              <button type="button" className="text-dg-blue font-semibold hover:underline">Mot de passe oublié ?</button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-dg-blue text-white font-bold rounded-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-dg-blue/20"
            >
              {isLoading ? (
                <>Chargement...</>
              ) : (
                <>Se connecter <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-dg-muted text-sm">
            Pas encore de compte ? <Link to="/signup" className="text-dg-blue font-bold hover:underline">S'inscrire gratuitement</Link>
          </p>
        </div>
      </div>

      {/* Right Column: Visuals */}
      <div className="hidden lg:flex w-1/2 relative bg-dg-blue overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-[-20%] right-[-20%] w-[800px] h-[800px] bg-dg-mint rounded-full blur-[100px]" />
           <div className="absolute bottom-[-20%] left-[-20%] w-[600px] h-[600px] bg-dg-maroon rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 max-w-lg text-center p-12">
           <div className="mb-8 relative mx-auto w-64 h-64">
              <div className="absolute inset-0 border-2 border-dg-mint/30 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border-2 border-dg-mint/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Database size={64} className="text-dg-mint" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-dg-blue px-3 py-1 rounded-full border border-dg-mint/30 text-dg-mint text-xs font-bold uppercase tracking-wider">
                SQL Mastery
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 bg-dg-blue px-3 py-1 rounded-full border border-dg-mint/30 text-dg-mint text-xs font-bold uppercase tracking-wider">
                Governance
              </div>
           </div>
           
           <h2 className="text-3xl font-bold text-white mb-4">Votre carrière Data commence ici.</h2>
           <p className="text-dg-mint/80 text-lg leading-relaxed">
             Accédez à des cours structurés, des modèles opérationnels et une communauté d'experts.
           </p>
        </div>
      </div>
    </div>
  );
};
