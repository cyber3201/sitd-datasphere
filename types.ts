
export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}
