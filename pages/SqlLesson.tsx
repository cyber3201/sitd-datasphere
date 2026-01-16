import React from 'react';
import { CourseLessonPage } from '../components/CourseLesson';
import { MODULES, LESSONS } from '../lib/sqlMastery';
import { LESSON_CONTENT } from '../lib/lessonContent';

export const SqlLesson: React.FC = () => {
  return (
    <CourseLessonPage 
      modules={MODULES}
      lessons={LESSONS}
      contentMap={LESSON_CONTENT}
      basePath="/sql-mastery"
    />
  );
};
