
import React, { useState, useEffect, useRef } from 'react';
import { X, Camera, Info, Upload } from 'lucide-react';
import { User } from '../lib/auth';
import { UserProfile } from '../lib/profile';

interface ProfileEditModalProps {
  user: User;
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: Partial<User>, updatedProfile: Partial<UserProfile>) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ user, profile, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    school: '',
    city: '',
    linkedin: '',
    github: '',
    website: '',
    role: '',
    openToWork: true
  });
  
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData({
        fullName: user.fullName,
        school: user.school || '',
        city: user.city || '',
        linkedin: profile.links?.linkedin || '',
        github: profile.links?.github || '',
        website: profile.links?.website || '',
        role: profile.preferences?.role || '',
        openToWork: profile.preferences?.openToWork ?? true
      });
      setAvatarPreview(profile.avatar);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, user, profile]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      { // Update Core Auth User
        fullName: formData.fullName,
        school: formData.school,
        city: formData.city
      },
      { // Update Profile Data
        avatar: avatarPreview,
        links: {
          linkedin: formData.linkedin,
          github: formData.github,
          website: formData.website
        },
        preferences: {
          role: formData.role,
          openToWork: formData.openToWork
        }
      }
    );
    onClose();
  };

  const initials = formData.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const inputStyle = "w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-dg-blue focus:ring-1 focus:ring-dg-blue outline-none transition-all text-gray-900 placeholder-gray-400 text-sm";
  const labelStyle = "block text-sm font-semibold text-dg-text mb-1.5";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-dg-text">Détails personnels</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Avatar Section */}
          <div>
            <p className="text-sm text-gray-500 mb-4">Photo de profil (visuel public).</p>
            <div className="flex items-center gap-6">
                <div className="relative">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-dg-blue text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md">
                        {initials}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-white border border-gray-300 text-dg-blue text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                          <Camera size={16} /> Changer
                      </button>
                      {avatarPreview && (
                        <button 
                          type="button"
                          onClick={handleRemoveAvatar}
                          className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-bold rounded-lg hover:bg-red-50 transition-colors"
                        >
                            Supprimer
                        </button>
                      )}
                    </div>
                    <input 
                      ref={fileInputRef} 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                    <p className="text-xs text-gray-400">Max 1MB. JPG, PNG.</p>
                </div>
            </div>
          </div>

          {/* Form */}
          <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className={labelStyle}>Nom complet <span className="text-red-500">*</span></label>
                  <input 
                      type="text" 
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputStyle}
                  />
              </div>
              <div>
                  <label className={labelStyle}>Email (Lecture seule)</label>
                  <input 
                      type="email" 
                      value={user.email}
                      disabled
                      className={`${inputStyle} bg-gray-50 text-gray-500 cursor-not-allowed`}
                  />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className={labelStyle}>École / Entreprise</label>
                  <input 
                      type="text" 
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      placeholder="Ex: Université de Paris"
                      className={inputStyle}
                  />
              </div>
              <div>
                  <label className={labelStyle}>Ville</label>
                  <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Ex: Paris, France"
                      className={inputStyle}
                  />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Links & Prefs */}
            <div>
              <h3 className="text-sm font-bold text-dg-blue uppercase tracking-wider mb-4">Liens & Préférences</h3>
              <div className="space-y-4">
                <div>
                  <label className={labelStyle}>Rôle recherché / Actuel</label>
                  <input 
                      type="text" 
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Ex: Data Scientist Junior"
                      className={inputStyle}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelStyle}>LinkedIn URL</label>
                    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." className={inputStyle} />
                  </div>
                  <div>
                    <label className={labelStyle}>GitHub URL</label>
                    <input type="url" name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/..." className={inputStyle} />
                  </div>
                  <div>
                    <label className={labelStyle}>Portfolio / Site</label>
                    <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className={inputStyle} />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="openToWork" 
                    name="openToWork"
                    checked={formData.openToWork}
                    onChange={(e) => setFormData(prev => ({...prev, openToWork: e.target.checked}))}
                    className="rounded border-gray-300 text-dg-blue focus:ring-dg-blue"
                  />
                  <label htmlFor="openToWork" className="text-sm text-gray-700">À l'écoute de nouvelles opportunités (Open to Work)</label>
                </div>
              </div>
            </div>

            {/* Demographic Notice */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                <div className="text-xs text-blue-800 leading-relaxed">
                    <strong>Pourquoi ces informations ?</strong><br/>
                    Ces données nous permettent de personnaliser votre parcours. Vos liens sociaux enrichissent votre profil public DataSphere.
                </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end gap-3 sticky bottom-0 z-10">
            <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-2.5 text-gray-700 font-bold hover:bg-gray-200 rounded-lg transition-colors text-sm"
            >
                Annuler
            </button>
            <button 
                type="submit" 
                form="profile-form"
                className="px-8 py-2.5 bg-dg-blue text-white font-bold rounded-lg hover:bg-blue-900 shadow-md hover:shadow-lg transition-all text-sm"
            >
                Enregistrer
            </button>
        </div>

      </div>
    </div>
  );
};
