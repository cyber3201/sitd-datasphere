
import { CourseModule, CourseLesson, DEFAULT_SECTIONS } from './courseTypes';

export const DP_MODULES: CourseModule[] = [
  { id: 'dp-track', title: 'Data Products Track' },
];

export const DP_LESSONS: CourseLesson[] = [
  { 
    id: 'dp-1', 
    slug: 'what-is-data-product', 
    title: 'What is Data as a Product', 
    moduleId: 'dp-track', 
    level: 'Débutant', 
    estimatedMinutes: 10, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'dp-2', 
    slug: 'discovery-design', 
    title: 'Data Product Discovery & Design', 
    moduleId: 'dp-track', 
    level: 'Intermédiaire', 
    estimatedMinutes: 15, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'dp-3', 
    slug: 'delivery-architecture', 
    title: 'Delivery Architecture', 
    moduleId: 'dp-track', 
    level: 'Avancé', 
    estimatedMinutes: 20, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'dp-4', 
    slug: 'quality-reliability', 
    title: 'Quality & Reliability', 
    moduleId: 'dp-track', 
    level: 'Avancé', 
    estimatedMinutes: 25, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'dp-5', 
    slug: 'value-lifecycle', 
    title: 'Value & Lifecycle', 
    moduleId: 'dp-track', 
    level: 'Pro', 
    estimatedMinutes: 15, 
    sectionIds: DEFAULT_SECTIONS 
  },
];
