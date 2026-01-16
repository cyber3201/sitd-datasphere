import { MODULES as SQL_MODULES, LESSONS as SQL_LESSONS } from './sqlMastery';
import { DB_MODULES, DB_LESSONS } from './dbDesign';
import { DM_MODULES, DM_LESSONS } from './dataManagement';
import { DG_MODULES, DG_LESSONS } from './dataGovernance';
import { DP_MODULES, DP_LESSONS } from './dataProducts';
import { OM_MODULES, OM_LESSONS } from './operatingModel';
import { CourseModule, CourseLesson } from './courseTypes';

// Combine all lessons for global search and progress tracking
export const ALL_LESSONS: CourseLesson[] = [
  ...SQL_LESSONS,
  ...DB_LESSONS,
  ...DM_LESSONS,
  ...DG_LESSONS,
  ...DP_LESSONS,
  ...OM_LESSONS,
];

export const ALL_MODULES: CourseModule[] = [
  ...SQL_MODULES,
  ...DB_MODULES,
  ...DM_MODULES,
  ...DG_MODULES,
  ...DP_MODULES,
  ...OM_MODULES,
];
