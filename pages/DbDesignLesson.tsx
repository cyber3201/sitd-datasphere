import React from 'react';
import { CourseLessonPage } from '../components/CourseLesson';
import { DB_MODULES, DB_LESSONS } from '../lib/dbDesign';
import { DB_CONTENT } from '../lib/dbDesignContent';

export const DbDesignLesson: React.FC = () => {
  return (
    <CourseLessonPage 
      modules={DB_MODULES}
      lessons={DB_LESSONS}
      contentMap={DB_CONTENT}
      basePath="/db-design"
    />
  );
};
