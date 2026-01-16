import { ALL_LESSONS, ALL_MODULES } from './allCourses';
import { CourseLesson } from './courseTypes';

export const normalizeText = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export interface SearchResult {
  lesson: CourseLesson;
  moduleTitle: string;
  matchType: 'title' | 'module';
  coursePath: string;
}

const getCoursePath = (lesson: CourseLesson): string => {
  if (lesson.id.startsWith('db-')) return '/db-design';
  if (lesson.id.startsWith('dm-')) return '/data-management';
  if (lesson.id.startsWith('dg-')) return '/data-governance';
  if (lesson.id.startsWith('dp-')) return '/data-products';
  if (lesson.id.startsWith('om-')) return '/operating-model';
  return '/sql-mastery';
};

export const searchLessons = (query: string): SearchResult[] => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  const results: SearchResult[] = [];

  ALL_LESSONS.forEach((lesson) => {
    const module = ALL_MODULES.find((m) => m.id === lesson.moduleId);
    const moduleTitle = module?.title || '';
    
    const normTitle = normalizeText(lesson.title);
    const normModule = normalizeText(moduleTitle);

    const path = getCoursePath(lesson);

    if (normTitle.includes(normalizedQuery)) {
      results.push({ lesson, moduleTitle, matchType: 'title', coursePath: path });
    } else if (normModule.includes(normalizedQuery)) {
      results.push({ lesson, moduleTitle, matchType: 'module', coursePath: path });
    }
  });

  return results;
};
