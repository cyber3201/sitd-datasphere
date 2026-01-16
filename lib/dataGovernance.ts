
import { CourseModule, CourseLesson, DEFAULT_SECTIONS } from './courseTypes';

export const DG_MODULES: CourseModule[] = [
  { id: 'dg-track', title: 'Data Governance Track' },
];

export const DG_LESSONS: CourseLesson[] = [
  { id: 'dg-1', slug: 'gov-vs-mgmt', title: 'Gouvernance vs Management', moduleId: 'dg-track', level: 'Débutant', estimatedMinutes: 15, sectionIds: DEFAULT_SECTIONS },
  { id: 'dg-2', slug: 'data-owner', title: 'Le Rôle du Data Owner', moduleId: 'dg-track', level: 'Intermédiaire', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
  { id: 'dg-3', slug: 'data-steward', title: 'Le Rôle du Data Steward', moduleId: 'dg-track', level: 'Intermédiaire', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
  { id: 'dg-4', slug: 'policy-framework', title: 'Politiques et Standards', moduleId: 'dg-track', level: 'Avancé', estimatedMinutes: 25, sectionIds: DEFAULT_SECTIONS },
  { id: 'dg-5', slug: 'classification', title: 'Classification de la Donnée', moduleId: 'dg-track', level: 'Avancé', estimatedMinutes: 20, sectionIds: DEFAULT_SECTIONS },
];
