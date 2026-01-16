
import { CourseModule, CourseLesson, DEFAULT_SECTIONS } from './courseTypes';

export const DB_MODULES: CourseModule[] = [
  { id: 'erd', title: '1. Modélisation Entité-Association' },
  { id: 'normalization', title: '2. Normalisation' },
  { id: 'keys', title: '3. Clés et Contraintes' },
  { id: 'indexing', title: '4. Performance Physique' },
  { id: 'analytical', title: '5. Modélisation Analytique' },
];

export const DB_LESSONS: CourseLesson[] = [
  // Module 1: ERD
  { id: 'db-1', slug: 'erd-intro', title: 'Introduction aux ERD', moduleId: 'erd', level: 'Débutant', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },
  { id: 'db-2', slug: 'entities-attributes', title: 'Entités et Attributs', moduleId: 'erd', level: 'Débutant', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
  // Fixed slug from 'relationships' to 'cardinalities' to match content map
  { id: 'db-3', slug: 'cardinalities', title: 'Cardinalités (1:N, M:N)', moduleId: 'erd', level: 'Intermédiaire', estimatedMinutes: 25, sectionIds: DEFAULT_SECTIONS },

  // Module 2: Normalization
  { id: 'db-4', slug: '1nf', title: 'Première Forme Normale (1NF)', moduleId: 'normalization', level: 'Intermédiaire', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
  { id: 'db-5', slug: '2nf', title: 'Deuxième Forme Normale (2NF)', moduleId: 'normalization', level: 'Intermédiaire', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
  { id: 'db-6', slug: '3nf', title: 'Troisième Forme Normale (3NF)', moduleId: 'normalization', level: 'Intermédiaire', estimatedMinutes: 25, sectionIds: DEFAULT_SECTIONS },

  // Module 3: Keys
  { id: 'db-7', slug: 'pk-fk', title: 'Clés Primaires et Étrangères', moduleId: 'keys', level: 'Débutant', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },
  { id: 'db-8', slug: 'constraints', title: 'Contraintes d\'Intégrité', moduleId: 'keys', level: 'Intermédiaire', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },

  // Module 4: Indexing
  { id: 'db-9', slug: 'index-basics', title: 'Introduction aux Index', moduleId: 'indexing', level: 'Avancé', estimatedMinutes: 30, sectionIds: DEFAULT_SECTIONS },
  { id: 'db-10', slug: 'indexing-strategies', title: 'Stratégies d\'Indexation', moduleId: 'indexing', level: 'Avancé', estimatedMinutes: 35, sectionIds: DEFAULT_SECTIONS },

  // Module 5: Analytical
  { id: 'db-11', slug: 'oltp-vs-olap', title: 'OLTP vs OLAP', moduleId: 'analytical', level: 'Intermédiaire', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
  { id: 'db-12', slug: 'star-schema', title: 'Le Schéma en Étoile (Star Schema)', moduleId: 'analytical', level: 'Avancé', estimatedMinutes: 40, sectionIds: DEFAULT_SECTIONS },
];
