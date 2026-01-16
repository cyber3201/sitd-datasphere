
import { ALL_LESSONS } from './allCourses';
import { CourseLesson } from './courseTypes';

// We use a new key to ensure we don't load the old broken state
const STORAGE_KEY = 'datasphere_progress_v3'; // Incremented version to force clean slate or migration
const EVENT_KEY = 'dg_progress_updated';

// Simple map: lessonId -> boolean
type ProgressData = Record<string, boolean>;

// Map old numeric IDs to new Slugs for migration
const MIGRATION_MAP: Record<string, string> = {
  '1': 'select-from',
  '2': 'where',
  '3': 'order-by-limit-offset',
  '4': 'and-or-not',
  '5': 'null-handling',
  '6': 'inner-join',
  '7': 'left-right-join',
  '8': 'full-outer-join',
  '9': 'cross-join',
  '10': 'union',
  '11': 'aggregate-functions',
  '12': 'group-by',
  '13': 'having',
  '14': 'distinct',
  '15': 'insert',
  '16': 'update',
  '17': 'delete-vs-truncate',
  '18': 'transactions-intro',
  '19': 'sql-data-types',
  '20': 'create-table',
  '21': 'alter-drop',
  '22': 'constraints-pk-fk-unique',
  '23': 'string-functions',
  '24': 'date-time-functions',
  '25': 'case-when',
  '26': 'coalesce-null',
  '27': 'subqueries-where',
  '28': 'subqueries-from',
  '29': 'cte-with',
  '30': 'recursive-cte',
  '31': 'window-functions-intro',
  '32': 'rank-dense-rank',
  '33': 'lead-lag',
  '34': 'btree-indexes',
  '35': 'explain',
  '36': 'query-optimization-tips'
};

const notifyUpdate = () => {
  window.dispatchEvent(new Event(EVENT_KEY));
};

// Check for old v2 storage and migrate if v3 is empty
const migrateStorage = () => {
  try {
    const v3Raw = localStorage.getItem(STORAGE_KEY);
    if (!v3Raw) {
      const v2Raw = localStorage.getItem('datasphere_progress_v2');
      if (v2Raw) {
        const v2Data = JSON.parse(v2Raw);
        const v3Data: ProgressData = {};
        
        Object.keys(v2Data).forEach(oldId => {
          if (v2Data[oldId]) {
            // Check if it's one of the old numeric IDs
            const newSlug = MIGRATION_MAP[oldId];
            if (newSlug) {
              v3Data[newSlug] = true;
            } else {
              // If it's already a slug (e.g. from partial previous usage), keep it
              v3Data[oldId] = true;
            }
          }
        });
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(v3Data));
      }
    }
  } catch (e) {
    console.error("Migration failed", e);
  }
};

// Run migration once on module load
migrateStorage();

export const getProgress = (): ProgressData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

/**
 * Toggles the completion status of a specific lesson.
 */
export const toggleLessonCompletion = (lessonId: string) => {
  const progress = getProgress();
  
  if (progress[lessonId]) {
    delete progress[lessonId]; // Mark as incomplete
  } else {
    progress[lessonId] = true; // Mark as complete
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  notifyUpdate();
};

/**
 * Checks if a specific lesson is marked as completed.
 */
export const isLessonCompleted = (lessonId: string): boolean => {
  const progress = getProgress();
  return !!progress[lessonId];
};

/**
 * Calculates statistics for a subset of lessons (e.g., a specific module or course).
 */
export const getCourseStats = (lessons: CourseLesson[]) => {
  const totalLessons = lessons.length;
  let completedCount = 0;

  // Read once to avoid reading storage N times
  const progress = getProgress();

  lessons.forEach((l) => {
    // Check by ID (which is now the slug)
    if (progress[l.id]) {
      completedCount++;
    }
  });

  return {
    total: totalLessons,
    completed: completedCount,
    percent: totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100),
  };
};

// Global stats
export const getOverallStats = () => getCourseStats(ALL_LESSONS);

export const subscribeToProgress = (callback: () => void) => {
  window.addEventListener(EVENT_KEY, callback);
  return () => window.removeEventListener(EVENT_KEY, callback);
};
