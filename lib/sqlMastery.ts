
import { CourseModule, CourseLesson, DEFAULT_SECTIONS } from './courseTypes';

export const MODULES: CourseModule[] = [
  { id: 'bases', title: '1. Les Bases du SQL' },
  { id: 'jointures', title: '2. Jointures et Relations' },
  { id: 'agregations', title: '3. Agrégations et Groupement' },
  { id: 'dml', title: '4. Manipulation de Données (DML)' },
  { id: 'ddl', title: '5. Structure et Schéma (DDL)' },
  { id: 'fonctions', title: '6. Fonctions et Logique' },
  { id: 'sous-requetes', title: '7. Sous-requêtes et CTE' },
  { id: 'fenetrage', title: '8. Fonctions de Fenêtrage' },
  { id: 'performance', title: '9. Performance et Indexation' },
];

export const LESSONS: CourseLesson[] = [
  // Module 1: Les Bases
  { id: 'select-from', slug: 'select-from', title: 'SELECT et FROM', moduleId: 'bases', level: 'Débutant', estimatedMinutes: 10, sectionIds: DEFAULT_SECTIONS },
  { id: 'where', slug: 'where', title: 'Filtrer avec WHERE', moduleId: 'bases', level: 'Débutant', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },
  { id: 'order-by-limit-offset', slug: 'order-by-limit-offset', title: 'Tri (ORDER BY) et Pagination', moduleId: 'bases', level: 'Débutant', estimatedMinutes: 10, sectionIds: DEFAULT_SECTIONS },
  { id: 'and-or-not', slug: 'and-or-not', title: 'Opérateurs Logiques', moduleId: 'bases', level: 'Débutant', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },
  { id: 'null-handling', slug: 'null-handling', title: 'Comprendre et gérer NULL', moduleId: 'bases', level: 'Débutant', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },

  // Module 2: Jointures
  { id: 'inner-join', slug: 'inner-join', title: 'La jointure interne (INNER JOIN)', moduleId: 'jointures', level: 'Débutant', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
  { id: 'left-right-join', slug: 'left-right-join', title: 'LEFT et RIGHT JOIN', moduleId: 'jointures', level: 'Intermédiaire', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
  { id: 'full-outer-join', slug: 'full-outer-join', title: 'FULL OUTER JOIN', moduleId: 'jointures', level: 'Intermédiaire', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },
  { id: 'cross-join', slug: 'cross-join', title: 'Produit Cartésien (CROSS JOIN)', moduleId: 'jointures', level: 'Intermédiaire', estimatedMinutes: 10, sectionIds: DEFAULT_SECTIONS },
  { id: 'union', slug: 'union', title: 'Combiner des résultats (UNION)', moduleId: 'jointures', level: 'Intermédiaire', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },

  // Module 3: Agrégations
  { id: 'aggregate-functions', slug: 'aggregate-functions', title: 'Fonctions d\'agrégation', moduleId: 'agregations', level: 'Intermédiaire', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
  { id: 'group-by', slug: 'group-by', title: 'Regrouper avec GROUP BY', moduleId: 'agregations', level: 'Intermédiaire', estimatedMinutes: 25, sectionIds: DEFAULT_SECTIONS },
  { id: 'having', slug: 'having', title: 'Filtrer les groupes (HAVING)', moduleId: 'agregations', level: 'Intermédiaire', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },
  { id: 'distinct', slug: 'distinct', title: 'Éliminer les doublons (DISTINCT)', moduleId: 'agregations', level: 'Intermédiaire', estimatedMinutes: 10, sectionIds: DEFAULT_SECTIONS },

  // Module 4: DML
  { id: 'insert', slug: 'insert', title: 'Insérer des données (INSERT)', moduleId: 'dml', level: 'Intermédiaire', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },
  { id: 'update', slug: 'update', title: 'Mettre à jour (UPDATE)', moduleId: 'dml', level: 'Intermédiaire', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },
  { id: 'delete-vs-truncate', slug: 'delete-vs-truncate', title: 'Supprimer (DELETE vs TRUNCATE)', moduleId: 'dml', level: 'Intermédiaire', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },
  { id: 'transactions-intro', slug: 'transactions-intro', title: 'Introduction aux Transactions', moduleId: 'dml', level: 'Avancé', estimatedMinutes: 30, sectionIds: DEFAULT_SECTIONS },

  // Module 5: DDL
  { id: 'sql-data-types', slug: 'sql-data-types', title: 'Types de données SQL standards', moduleId: 'ddl', level: 'Intermédiaire', estimatedMinutes: 18, sectionIds: DEFAULT_SECTIONS },
  { id: 'create-table', slug: 'create-table', title: 'Création de tables (CREATE TABLE)', moduleId: 'ddl', level: 'Intermédiaire', estimatedMinutes: 22, sectionIds: DEFAULT_SECTIONS },
  { id: 'alter-drop', slug: 'alter-drop', title: 'Modifier la structure (ALTER, DROP)', moduleId: 'ddl', level: 'Intermédiaire', estimatedMinutes: 22, sectionIds: DEFAULT_SECTIONS },
  { id: 'constraints-pk-fk-unique', slug: 'constraints-pk-fk-unique', title: 'Contraintes (PK, FK, UNIQUE)', moduleId: 'ddl', level: 'Avancé', estimatedMinutes: 25, sectionIds: DEFAULT_SECTIONS },

  // Module 6: Fonctions
  { id: 'string-functions', slug: 'string-functions', title: 'Manipulation de chaînes', moduleId: 'fonctions', level: 'Intermédiaire', estimatedMinutes: 18, sectionIds: DEFAULT_SECTIONS },
  { id: 'date-time-functions', slug: 'date-time-functions', title: 'Dates et Heures', moduleId: 'fonctions', level: 'Intermédiaire', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
  { id: 'case-when', slug: 'case-when', title: 'Logique (CASE WHEN)', moduleId: 'fonctions', level: 'Intermédiaire', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
  { id: 'coalesce-null', slug: 'coalesce-null', title: 'Gestion avancée des NULL', moduleId: 'fonctions', level: 'Avancé', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },

  // Module 7: Sous-requêtes
  { id: 'subqueries-where', slug: 'subqueries-where', title: 'Sous-requêtes dans le WHERE', moduleId: 'sous-requetes', level: 'Avancé', estimatedMinutes: 30, sectionIds: DEFAULT_SECTIONS },
  { id: 'subqueries-from', slug: 'subqueries-from', title: 'Sous-requêtes dans le FROM', moduleId: 'sous-requetes', level: 'Avancé', estimatedMinutes: 25, sectionIds: DEFAULT_SECTIONS },
  { id: 'cte-with', slug: 'cte-with', title: 'Common Table Expressions (WITH)', moduleId: 'sous-requetes', level: 'Avancé', estimatedMinutes: 30, sectionIds: DEFAULT_SECTIONS },
  { id: 'recursive-cte', slug: 'recursive-cte', title: 'CTE Récursives', moduleId: 'sous-requetes', level: 'Pro', estimatedMinutes: 45, sectionIds: DEFAULT_SECTIONS },

  // Module 8: Fenêtrage
  { id: 'window-functions-intro', slug: 'window-functions-intro', title: 'Intro Window Functions', moduleId: 'fenetrage', level: 'Pro', estimatedMinutes: 40, sectionIds: DEFAULT_SECTIONS },
  { id: 'rank-dense-rank', slug: 'rank-dense-rank', title: 'Classement (RANK, DENSE)', moduleId: 'fenetrage', level: 'Pro', estimatedMinutes: 30, sectionIds: DEFAULT_SECTIONS },
  { id: 'lead-lag', slug: 'lead-lag', title: 'Séquentiel (LEAD, LAG)', moduleId: 'fenetrage', level: 'Pro', estimatedMinutes: 30, sectionIds: DEFAULT_SECTIONS },

  // Module 9: Performance
  { id: 'btree-indexes', slug: 'btree-indexes', title: 'Index B-Tree', moduleId: 'performance', level: 'Pro', estimatedMinutes: 45, sectionIds: DEFAULT_SECTIONS },
  { id: 'explain', slug: 'explain', title: 'Plan d\'exécution (EXPLAIN)', moduleId: 'performance', level: 'Pro', estimatedMinutes: 50, sectionIds: DEFAULT_SECTIONS },
  { id: 'query-optimization-tips', slug: 'query-optimization-tips', title: 'Optimisation de requêtes', moduleId: 'performance', level: 'Pro', estimatedMinutes: 40, sectionIds: DEFAULT_SECTIONS },
];
