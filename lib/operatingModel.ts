
import { CourseModule, CourseLesson, DEFAULT_SECTIONS } from './courseTypes';

export const OM_MODULES: CourseModule[] = [
  { id: 'om-track', title: 'Operating Model Track' },
];

export const OM_LESSONS: CourseLesson[] = [
  { 
    id: 'om-1', 
    slug: 'teams-structure', 
    title: 'Teams structure (central vs domain vs platform)', 
    moduleId: 'om-track', 
    level: 'Débutant', 
    estimatedMinutes: 20, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'om-2', 
    slug: 'roles-responsibilities', 
    title: 'Roles: Data Product Owner, Engineer, Steward', 
    moduleId: 'om-track', 
    level: 'Intermédiaire', 
    estimatedMinutes: 25, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'om-3', 
    slug: 'decision-rights', 
    title: 'Decision rights & escalation', 
    moduleId: 'om-track', 
    level: 'Avancé', 
    estimatedMinutes: 20, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'om-4', 
    slug: 'funding-model', 
    title: 'Funding model (chargeback/showback)', 
    moduleId: 'om-track', 
    level: 'Pro', 
    estimatedMinutes: 30, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'om-5', 
    slug: 'operating-cadence', 
    title: 'Operating cadence: roadmap & reviews', 
    moduleId: 'om-track', 
    level: 'Intermédiaire', 
    estimatedMinutes: 15, 
    sectionIds: DEFAULT_SECTIONS 
  },
];
