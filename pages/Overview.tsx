import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Shield, Settings, Package, Users, ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';

export const Overview: React.FC = () => {
  return (
    <PageContainer>
      <div className="animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="text-center mb-16 pt-10">
          <h1 className="text-5xl font-extrabold text-dg-blue mb-6">La Stratégie Data Unifiée</h1>
          <p className="text-xl text-dg-muted max-w-3xl mx-auto">
            Pour délivrer de la valeur, une entreprise doit orchestrer quatre couches fondamentales. 
            Ce n'est pas seulement de la technique, c'est un écosystème.
          </p>
        </div>

        {/* The 4 Layers Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-20">
          
          {/* Layer 1: Operating Model */}
          <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-dg-maroon relative hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-dg-maroon text-white rounded-full flex items-center justify-center shadow-lg">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-dg-blue mt-6 mb-4 text-center">Operating Model</h3>
            <p className="text-sm text-dg-muted mb-6 text-center">
              L'organisation. Qui fait quoi ? Comment les équipes interagissent ? 
            </p>
            <ul className="text-sm space-y-2 mb-6 text-gray-600">
              <li>• Organisation des Domaines</li>
              <li>• Alignement Stratégique</li>
              <li>• Culture Data</li>
            </ul>
            <Link to="/operating-model" className="flex items-center justify-center text-dg-maroon font-semibold text-sm hover:underline">
              Explorer <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>

          {/* Layer 2: Governance */}
          <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-dg-blue relative hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-dg-blue text-white rounded-full flex items-center justify-center shadow-lg">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold text-dg-blue mt-6 mb-4 text-center">Governance</h3>
            <p className="text-sm text-dg-muted mb-6 text-center">
              Les règles du jeu. Politiques, standards et conformité.
            </p>
            <ul className="text-sm space-y-2 mb-6 text-gray-600">
              <li>• Rôles (Owner, Steward)</li>
              <li>• Politiques d'accès</li>
              <li>• Conformité (GDPR)</li>
            </ul>
            <Link to="/data-governance" className="flex items-center justify-center text-dg-blue font-semibold text-sm hover:underline">
              Explorer <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>

          {/* Layer 3: Management */}
          <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-dg-blue/60 relative hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-dg-blue/80 text-white rounded-full flex items-center justify-center shadow-lg">
              <Settings size={24} />
            </div>
            <h3 className="text-xl font-bold text-dg-blue mt-6 mb-4 text-center">Management</h3>
            <p className="text-sm text-dg-muted mb-6 text-center">
              L'exécution. Cycle de vie, qualité technique et architecture.
            </p>
            <ul className="text-sm space-y-2 mb-6 text-gray-600">
              <li>• Qualité des données</li>
              <li>• Master Data (MDM)</li>
              <li>• Architecture & Lineage</li>
            </ul>
            <Link to="/data-management" className="flex items-center justify-center text-dg-blue/80 font-semibold text-sm hover:underline">
              Explorer <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>

          {/* Layer 4: Data Products */}
          <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-dg-mint relative hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-dg-mint text-dg-blue rounded-full flex items-center justify-center shadow-lg">
              <Package size={24} />
            </div>
            <h3 className="text-xl font-bold text-dg-blue mt-6 mb-4 text-center">Data Products</h3>
            <p className="text-sm text-dg-muted mb-6 text-center">
              La valeur livrée. Packager la donnée pour la consommation.
            </p>
            <ul className="text-sm space-y-2 mb-6 text-gray-600">
              <li>• Data Contracts</li>
              <li>• Discoverability</li>
              <li>• Confiance & SLAs</li>
            </ul>
            <Link to="/data-products" className="flex items-center justify-center text-dg-mint font-bold text-sm text-dg-blue hover:underline">
              Explorer <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>

        {/* Business Outcomes */}
        <div className="bg-dg-blue/5 rounded-2xl p-10 md:p-16 mb-12">
          <h2 className="text-3xl font-bold text-dg-blue mb-10 text-center">Résultats Business Attendus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <OutcomeCard title="Confiance Financière" desc="Des rapports certifiés basés sur des Master Data propres." />
              <OutcomeCard title="Réduction des Risques" desc="Conformité GDPR et sécurité gérée par des politiques claires." />
              <OutcomeCard title="Vélocité Accrue" desc="Les équipes trouvent et utilisent les Data Products sans friction." />
              <OutcomeCard title="Décisions Inter-domaines" desc="Un langage commun permettant de croiser les données Sales, Marketing et Finance." />
              <OutcomeCard title="Intégration M&A" desc="Un Operating Model prêt à absorber de nouvelles entités." />
              <OutcomeCard title="Qualité Durable" desc="La qualité n'est plus un accident, c'est un processus géré." />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

const OutcomeCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
    <div className="flex items-start space-x-4">
        <div className="mt-1 bg-white p-1 rounded-full text-dg-mint shadow-sm">
            <Layers size={20} className="text-dg-blue" />
        </div>
        <div>
            <h4 className="font-bold text-dg-blue text-lg">{title}</h4>
            <p className="text-sm text-dg-muted leading-relaxed">{desc}</p>
        </div>
    </div>
);
