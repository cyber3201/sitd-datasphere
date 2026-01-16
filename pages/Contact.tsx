
import React, { useState } from 'react';
import { Mail, Clock, Send, CheckCircle2, AlertCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { PageHero } from '../components/PageHero';

export const Contact: React.FC = () => {
  // Scroll handled by ScrollToTop

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl outline-none transition-all text-[#0B1220] placeholder-[#0B1220]/45 bg-white border border-[#1E3A8A]/10 focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] shadow-sm";
  const labelClasses = "block text-sm font-semibold text-dg-blue mb-2";

  return (
    <div className="bg-dg-cream min-h-screen">
      <PageHero 
        title="Contactez-nous" 
        subtitle="Une question sur un cours ? Une suggestion ? Nous nous efforçons de répondre rapidement."
        icon={<MessageSquare size={24} />}
      />

      <PageContainer className="max-w-6xl -mt-6">
        <div className="animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
            
            {/* LEFT COLUMN: Info */}
            <div className="md:col-span-5 lg:col-span-4 space-y-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-dg-blue/5">
                <div className="space-y-8">
                  <div className="flex items-start group">
                    <div className="mt-1 mr-4 text-dg-blue bg-dg-blue/5 p-2 rounded-lg">
                       <Mail size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-dg-blue text-lg mb-1">Email direct</h3>
                      <a href="mailto:zakariagbibar4@gmail.com" className="text-dg-muted hover:text-dg-maroon transition-colors text-base break-all">
                        zakariagbibar4@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 mr-4 text-dg-blue bg-dg-blue/5 p-2 rounded-lg">
                       <Clock size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-dg-blue text-lg mb-1">Délai de réponse</h3>
                      <p className="text-dg-muted text-base">
                        Réponse sous 48h ouvrables
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Form */}
            <div className="md:col-span-7 lg:col-span-8">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-dg-blue/5 relative z-10">
                {status === 'success' ? (
                  <div className="h-full flex flex-col justify-center items-center text-center py-20 animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-dg-blue mb-3">Message envoyé !</h3>
                    <p className="text-dg-muted mb-8 max-w-sm mx-auto">Merci de nous avoir contactés. Nous reviendrons vers vous très vite.</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="text-dg-blue font-bold hover:text-dg-maroon flex items-center transition-colors"
                    >
                      Envoyer un autre message <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={labelClasses}>Nom complet</label>
                        <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jean Dupont" className={inputClasses} />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClasses}>Email</label>
                        <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="jean@exemple.com" className={inputClasses} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className={labelClasses}>Sujet</label>
                      <select required id="subject" name="subject" value={formData.subject} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                        <option value="" disabled>Sélectionnez un sujet</option>
                        <option value="content">Question sur un cours</option>
                        <option value="support">Problème technique</option>
                        <option value="other">Autre demande</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClasses}>Message</label>
                      <textarea required id="message" name="message" rows={6} minLength={20} value={formData.message} onChange={handleChange} placeholder="Bonjour, je vous contacte car..." className={`${inputClasses} resize-y min-h-[150px]`} />
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto px-10 py-3.5 bg-dg-blue text-white font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-lg shadow-dg-blue/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-base">
                        {status === 'loading' ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" /> Envoi...
                          </>
                        ) : (
                          <>Envoyer <Send size={18} className="ml-2" /></>
                        )}
                      </button>
                      
                      {status === 'error' && (
                        <div className="text-red-700 text-sm flex items-center">
                          <AlertCircle size={16} className="mr-2" /> Une erreur est survenue.
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
