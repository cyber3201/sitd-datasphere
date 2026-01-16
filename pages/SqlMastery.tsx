
import React from 'react';
import { CourseIndex } from '../components/CourseIndex';
import { MODULES, LESSONS } from '../lib/sqlMastery';

export const SqlMastery: React.FC = () => {
  return (
    <CourseIndex
      title="Maîtrise SQL : De la Requête à l'Architecture"
      subtitle="Un parcours complet pour passer de débutant à expert. Maîtrisez l'écriture de requêtes, l'indexation et l'optimisation."
      modules={MODULES}
      lessons={LESSONS}
      basePath="/sql-mastery"
      level="Intermédiaire → Avancé"
      aboutContent={
        <>
          <p className="mb-4">
            Le SQL est le langage universel de la donnée. Pourtant, il est souvent mal enseigné : on apprend les mots-clés, mais pas comment le moteur de base de données "pense".
          </p>
          <p className="mb-4">
            Ce cursus <strong>DataSphere SQL Mastery</strong> a été conçu pour combler ce vide. Il ne s'agit pas seulement d'apprendre la syntaxe, mais de comprendre l'ingénierie sous-jacente : l'indexation, l'optimisation de requêtes, le modèle relationnel et les fonctions analytiques avancées.
          </p>
          <p>
            Idéal pour les Data Analysts qui veulent passer Senior, les Data Engineers en formation, ou les développeurs Backend souhaitant maîtriser leur couche de persistance.
          </p>
        </>
      }
      objectives={[
        "Écrire des requêtes complexes (CTE, Window Functions)",
        "Optimiser la performance via EXPLAIN et Indexing",
        "Modéliser des bases de données robustes (DDL)",
        "Gérer la qualité et l'intégrité des données",
        "Maîtriser les types de jointures et leurs coûts",
        "Utiliser les transactions pour garantir la cohérence",
        "Manipuler les données temporelles et textuelles",
        "Comprendre l'architecture physique des SGBD"
      ]}
      prerequisites={[
        "Aucune connaissance préalable en base de données n'est requise pour le Module 1.",
        "Un ordinateur capable d'exécuter un navigateur web moderne.",
        "Recommandé : Avoir installé un outil comme DBeaver ou pgAdmin si vous souhaitez pratiquer en local (optionnel)."
      ]}
    />
  );
};
