
import React from 'react';
import { Layout } from 'lucide-react';
import { ModernTrackLayout } from '../components/ModernTrackLayout';
import { DB_MODULES, DB_LESSONS } from '../lib/dbDesign';

export const DbDesign: React.FC = () => {
  const illustration = (
    <div className="relative w-full h-auto aspect-[4/3] max-w-[300px] md:max-w-[400px] bg-white rounded-2xl shadow-2xl border border-dg-blue/10 p-6 md:p-8 flex flex-col justify-center items-center rotate-3 lg:scale-110">
        <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 w-12 h-12 md:w-16 md:h-16 bg-dg-blue rounded-xl shadow-lg flex items-center justify-center text-white">
            <Layout size={24} className="md:w-8 md:h-8" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-6 w-full">
            <div className="h-20 md:h-24 bg-dg-blue/5 rounded border border-dg-blue/10 flex items-center justify-center text-xs md:text-sm text-dg-blue font-mono font-bold">USERS</div>
            <div className="h-20 md:h-24 bg-dg-blue/5 rounded border border-dg-blue/10 flex items-center justify-center text-xs md:text-sm text-dg-blue font-mono font-bold">ORDERS</div>
        </div>
        <div className="w-1 h-8 md:h-10 bg-dg-blue/20 my-2 md:my-3"></div>
        <div className="w-full h-12 md:h-16 bg-dg-mint/20 rounded border border-dg-mint/50 flex items-center justify-center text-xs md:text-sm text-dg-blue font-mono font-bold">
            RELATIONSHIP (1:N)
        </div>
    </div>
  );

  return (
    <ModernTrackLayout 
      title="Design de Base de Données"
      subtitle="Architecture, modélisation et optimisation des schémas de données pour la performance et la scalabilité."
      modules={DB_MODULES}
      lessons={DB_LESSONS}
      basePath="/db-design"
      level="Intermédiaire"
      illustration={illustration}
      aboutContent={
        <>
          <p className="mb-4">
            Une base de données mal conçue est une dette technique qui ralentit tout le système. Le DB Design est l'art de structurer l'information pour garantir l'intégrité, éviter la redondance et assurer la performance.
          </p>
          <p>
            Ce cours vous guidera à travers les concepts fondamentaux de la modélisation (ERD), de la normalisation (jusqu'à la 3NF) et des stratégies d'indexation physique. Vous apprendrez à faire les bons compromis entre flexibilité et rigueur.
          </p>
        </>
      }
      objectives={[
        "Modéliser des diagrammes Entité-Association (ERD) clairs",
        "Appliquer les règles de Normalisation (1NF, 2NF, 3NF)",
        "Choisir les clés primaires et étrangères appropriées",
        "Concevoir des schémas optimisés pour l'écriture (OLTP)",
        "Comprendre la modélisation dimensionnelle (OLAP/Star Schema)",
        "Définir des contraintes d'intégrité robustes"
      ]}
      prerequisites={[
        "Connaissance de base du SQL (SELECT, INSERT, etc.) recommandée.",
        "Compréhension des concepts de tables et colonnes."
      ]}
    />
  );
};
