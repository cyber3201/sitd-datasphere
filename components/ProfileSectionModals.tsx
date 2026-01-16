
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Experience, Education, Project, profileAPI } from '../lib/profile';

type ModalType = 'experience' | 'education' | 'project';

interface Props {
  type: ModalType;
  isOpen: boolean;
  initialData?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const ProfileSectionModal: React.FC<Props> = ({ type, isOpen, initialData, onClose, onSave }) => {
  // Generic form state
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialData) {
        setFormData(initialData);
      } else {
        // Reset defaults based on type
        if (type === 'experience') setFormData({ id: profileAPI.generateId(), title: '', company: '', startDate: '', endDate: '', current: false, description: '' });
        if (type === 'education') setFormData({ id: profileAPI.generateId(), school: '', degree: '', startDate: '', endDate: '', current: false });
        if (type === 'project') setFormData({ id: profileAPI.generateId(), name: '', description: '', link: '' });
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, initialData, type]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const inputStyle = "w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-dg-blue focus:ring-1 focus:ring-dg-blue outline-none transition-all text-gray-900 placeholder-gray-400 text-sm";
  const labelStyle = "block text-sm font-semibold text-dg-text mb-1.5";

  let title = '';
  if (type === 'experience') title = initialData ? 'Modifier une expérience' : 'Ajouter une expérience';
  if (type === 'education') title = initialData ? 'Modifier une formation' : 'Ajouter une formation';
  if (type === 'project') title = initialData ? 'Modifier un projet' : 'Ajouter un projet';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-dg-text">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="section-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* EXPERIENCE FORM */}
            {type === 'experience' && (
              <>
                <div>
                  <label className={labelStyle}>Poste / Titre</label>
                  <input required name="title" value={formData.title} onChange={handleChange} className={inputStyle} placeholder="Ex: Data Analyst" />
                </div>
                <div>
                  <label className={labelStyle}>Entreprise</label>
                  <input required name="company" value={formData.company} onChange={handleChange} className={inputStyle} placeholder="Ex: Google" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>Date de début</label>
                    <input type="month" required name="startDate" value={formData.startDate} onChange={handleChange} className={inputStyle} />
                  </div>
                  <div>
                    <label className={labelStyle}>Date de fin</label>
                    <input type="month" name="endDate" value={formData.endDate} onChange={handleChange} disabled={formData.current} className={`${inputStyle} ${formData.current ? 'bg-gray-100 cursor-not-allowed' : ''}`} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="current" name="current" checked={formData.current} onChange={handleChange} className="rounded border-gray-300 text-dg-blue focus:ring-dg-blue" />
                  <label htmlFor="current" className="text-sm text-gray-700">Poste actuel</label>
                </div>
                <div>
                  <label className={labelStyle}>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={inputStyle} placeholder="Décrivez vos missions..." />
                </div>
              </>
            )}

            {/* EDUCATION FORM */}
            {type === 'education' && (
              <>
                <div>
                  <label className={labelStyle}>École / Université</label>
                  <input required name="school" value={formData.school} onChange={handleChange} className={inputStyle} placeholder="Ex: École Polytechnique" />
                </div>
                <div>
                  <label className={labelStyle}>Diplôme</label>
                  <input required name="degree" value={formData.degree} onChange={handleChange} className={inputStyle} placeholder="Ex: Master Big Data" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>Date de début</label>
                    <input type="month" required name="startDate" value={formData.startDate} onChange={handleChange} className={inputStyle} />
                  </div>
                  <div>
                    <label className={labelStyle}>Date de fin (ou prévue)</label>
                    <input type="month" name="endDate" value={formData.endDate} onChange={handleChange} className={inputStyle} />
                  </div>
                </div>
              </>
            )}

            {/* PROJECT FORM */}
            {type === 'project' && (
              <>
                <div>
                  <label className={labelStyle}>Nom du projet</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className={inputStyle} placeholder="Ex: Analyse Churn Telco" />
                </div>
                <div>
                  <label className={labelStyle}>Lien (Optionnel)</label>
                  <input type="url" name="link" value={formData.link} onChange={handleChange} className={inputStyle} placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className={labelStyle}>Description</label>
                  <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className={inputStyle} placeholder="Technologies utilisées, résultats..." />
                </div>
              </>
            )}

          </form>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2 text-gray-700 font-bold hover:bg-gray-200 rounded-lg transition-colors text-sm">
            Annuler
          </button>
          <button type="submit" form="section-form" className="px-6 py-2 bg-dg-blue text-white font-bold rounded-lg hover:bg-blue-900 shadow-sm transition-all text-sm">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};
