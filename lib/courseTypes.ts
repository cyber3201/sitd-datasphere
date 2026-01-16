
export type Level = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Pro';

export interface CourseModule {
  id: string;
  title: string;
}

export interface CourseLesson {
  id: string;
  slug: string;
  title: string;
  moduleId: string;
  level: Level;
  estimatedMinutes: number;
  sectionIds: string[];
}

export interface LessonContent {
  slug: string;
  objectives?: string[]; 
  why: {
    title: string;
    content: string;
    // Figure property removed
  };
  concept: {
    title: string;
    content: string;
    syntax?: string; 
  };
  example: {
    title: string;
    description: string;
    sql: string; 
    result: string; 
  };
  exercises: {
    question: string;
    solution: string;
    explanation: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
  summary?: string[];
}

export const DEFAULT_SECTIONS = ['completed'];
