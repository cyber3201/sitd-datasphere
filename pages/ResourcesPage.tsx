
import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  Youtube, 
  BookOpen, 
  ExternalLink, 
  Download,
  Filter,
  Library
} from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { PageHero } from '../components/PageHero';
import { RESOURCES, ResourceType, ResourceSection } from '../lib/resources';
import { normalizeText } from '../lib/search';
import { SearchInput } from '../components/SearchInput';

export const ResourcesPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');
  const [selectedSection, setSelectedSection] = useState<ResourceSection | 'all'>('all');

  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedQuery(query); }, 250);
    return () => clearTimeout(handler);
  }, [query]);

  const filteredResources = useMemo(() => {
    const normQuery = normalizeText(debouncedQuery);
    return RESOURCES.filter(resource => {
      if (selectedType !== 'all' && resource.type !== selectedType) return false;
      if (selectedSection !== 'all' && resource.section !== selectedSection) return false;
      if (!normQuery) return true;
      const titleMatch = normalizeText(resource.title).includes(normQuery);
      const descMatch = resource.description ? normalizeText(resource.description).includes(normQuery) : false;
      const tagsMatch = resource.tags.some(tag => normalizeText(tag).includes(normQuery));
      return titleMatch || descMatch || tagsMatch;
    });
  }, [debouncedQuery, selectedType, selectedSection]);

  const getIcon = (type: ResourceType) => {
    switch (type) {
      case 'pdf': return <FileText size={20} className="text-dg-maroon" />;
      case 'video': return <Youtube size={20} className="text-red-600" />;
      case 'article': return <BookOpen size={20} className="text-dg-blue" />;
    }
  };

  const getLabel = (type: ResourceType) => {
    switch (type) {
      case 'pdf': return 'PDF';
      case 'video': return 'Vidéo';
      case 'article': return 'Article';
    }
  };

  return (
    <div className="bg-dg-cream min-h-screen">
      <PageHero 
        title="Ressources" 
        subtitle="PDFs, vidéos YouTube et articles sélectionnés pour approfondir vos connaissances."
        icon={<Library size={24} />}
      />

      <PageContainer>
        <div className="animate-in fade-in duration-500 min-h-[60vh] -mt-6">
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 relative z-20">
            <SearchInput 
              value={query}
              onChange={setQuery}
              placeholder="Rechercher (SQL, Governance, Index...)"
              variant="large"
              className="shadow-lg border-dg-blue/10"
            />
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
            
            <div className="flex p-1 bg-white border border-dg-blue/10 rounded-lg shadow-sm">
              {(['all', 'pdf', 'video', 'article'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    selectedType === type 
                      ? 'bg-dg-blue text-white shadow-sm' 
                      : 'text-dg-muted hover:bg-dg-blue/5 hover:text-dg-blue'
                  }`}
                >
                  {type === 'all' ? 'Tout' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <div className="relative group w-full md:w-64">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={16} className="text-dg-muted group-hover:text-dg-blue" />
               </div>
               <select
                 value={selectedSection}
                 onChange={(e) => setSelectedSection(e.target.value as ResourceSection | 'all')}
                 className="w-full pl-10 pr-4 py-2.5 bg-white border border-dg-blue/10 rounded-lg shadow-sm text-sm font-medium text-dg-muted focus:outline-none focus:ring-2 focus:ring-dg-blue/20 focus:text-dg-blue cursor-pointer hover:border-dg-blue/30 appearance-none"
               >
                 <option value="all">Toutes les sections</option>
                 <option value="SQL Mastery">SQL Mastery</option>
                 <option value="DB Design">DB Design</option>
                 <option value="Management">Management</option>
                 <option value="Governance">Governance</option>
                 <option value="Products">Products</option>
                 <option value="Op Model">Op Model</option>
               </select>
            </div>
          </div>

          {/* Results List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredResources.length === 0 ? (
              <div className="text-center py-20 bg-white/50 border border-dashed border-dg-blue/10 rounded-xl">
                <p className="text-dg-muted">Aucune ressource trouvée.</p>
                <button 
                  onClick={() => {setQuery(''); setSelectedType('all'); setSelectedSection('all');}} 
                  className="mt-2 text-dg-blue font-semibold hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              filteredResources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white border border-dg-blue/5 rounded-xl hover:border-dg-blue/30 hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row p-5 sm:items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-dg-cream/50 group-hover:bg-dg-blue/5 transition-colors`}>
                        {getIcon(resource.type)}
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-dg-blue group-hover:text-dg-maroon transition-colors truncate w-full sm:w-auto">
                          {resource.title}
                        </h3>
                        {resource.type === 'pdf' && (
                           <span className="inline-flex items-center text-[10px] uppercase font-bold text-dg-muted bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                             PDF
                           </span>
                        )}
                      </div>
                      <p className="text-sm text-dg-muted mb-2 line-clamp-1">{resource.description}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-dg-muted/80">
                        <span className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-1.5 ${
                            resource.type === 'video' ? 'bg-red-400' : 
                            resource.type === 'pdf' ? 'bg-dg-maroon' : 'bg-dg-blue'
                          }`} />
                          {getLabel(resource.type)}
                        </span>
                        <span className="w-px h-3 bg-dg-blue/10 hidden sm:block"></span>
                        <span>{resource.section}</span>
                        <span className="w-px h-3 bg-dg-blue/10 hidden sm:block"></span>
                        <span className="font-medium text-dg-blue/70">{resource.source}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {resource.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-dg-blue/5 text-dg-blue/70 border border-dg-blue/5 group-hover:border-dg-blue/10">#{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-dg-blue/5 mt-2 sm:mt-0 flex sm:flex-col items-center justify-between sm:justify-center gap-3">
                      <ExternalLink size={18} className="text-dg-muted group-hover:text-dg-blue transition-colors" />
                      {resource.type === 'pdf' && (
                        <span className="flex items-center text-xs font-semibold text-dg-blue hover:text-dg-maroon opacity-0 group-hover:opacity-100 transition-opacity">
                          <Download size={14} className="mr-1" /> Ouvrir
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
          
          <div className="max-w-4xl mx-auto mt-8 text-center text-xs text-dg-muted/60">
             {filteredResources.length} ressource{filteredResources.length > 1 ? 's' : ''}
          </div>

        </div>
      </PageContainer>
    </div>
  );
};
