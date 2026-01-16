
import { CourseModule, CourseLesson, DEFAULT_SECTIONS } from './courseTypes';

// We define a single logical module for the track
export const DM_MODULES: CourseModule[] = [
  { id: 'dm-track', title: 'Data Management Track' },
];

export const DM_LESSONS: CourseLesson[] = [
  { 
    id: 'dm-1', 
    slug: 'data-management-foundations', 
    title: 'Data Management Foundations', 
    moduleId: 'dm-track', 
    level: 'Débutant', 
    estimatedMinutes: 10, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'dm-2', 
    slug: 'metadata-management', 
    title: 'Metadata Management', 
    moduleId: 'dm-track', 
    level: 'Intermédiaire', 
    estimatedMinutes: 15, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'dm-3', 
    slug: 'data-quality-management', 
    title: 'Data Quality Management', 
    moduleId: 'dm-track', 
    level: 'Intermédiaire', 
    estimatedMinutes: 20, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'dm-4', 
    slug: 'master-data-management-reference-data', 
    title: 'Master Data Management & Reference Data', 
    moduleId: 'dm-track', 
    level: 'Avancé', 
    estimatedMinutes: 25, 
    sectionIds: DEFAULT_SECTIONS 
  },
  { 
    id: 'dm-5', 
    slug: 'data-security-privacy-access-management', 
    title: 'Data Security, Privacy & Access Management', 
    moduleId: 'dm-track', 
    level: 'Avancé', 
    estimatedMinutes: 20, 
    sectionIds: DEFAULT_SECTIONS 
  },
];
