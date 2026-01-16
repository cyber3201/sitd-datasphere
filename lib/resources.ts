export type ResourceType = 'pdf' | 'video' | 'article';

export type ResourceSection = 
  | 'SQL Mastery' 
  | 'DB Design' 
  | 'Management' 
  | 'Governance' 
  | 'Products' 
  | 'Op Model';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
  source?: string; // e.g. "Youtube", "Medium", "DAMA"
  tags: string[];
  section: ResourceSection;
  description?: string;
}

export const RESOURCES: Resource[] = [
  // PDFs
  {
    id: '1',
    title: 'SQL Performance Cheat Sheet',
    type: 'pdf',
    url: 'https://example.com/sql-cheat-sheet.pdf',
    source: 'DataSphere Internal',
    section: 'SQL Mastery',
    tags: ['Performance', 'Indexing', 'Query Optimization'],
    description: 'A quick reference guide for explain plans and index types.'
  },
  {
    id: '2',
    title: 'Data Governance Framework Template',
    type: 'pdf',
    url: 'https://example.com/gov-framework.pdf',
    source: 'DGI Standards',
    section: 'Governance',
    tags: ['Policy', 'Roles', 'Template'],
    description: 'Standard boilerplate for defining data stewards and owners.'
  },
  {
    id: '3',
    title: 'Data Mesh Architecture Whitepaper',
    type: 'pdf',
    url: 'https://example.com/data-mesh-whitepaper.pdf',
    source: 'ThoughtWorks',
    section: 'Op Model',
    tags: ['Decentralization', 'Architecture', 'Strategy'],
    description: 'Deep dive into the 4 principles of Data Mesh.'
  },

  // Videos
  {
    id: '4',
    title: 'Advanced SQL Joins Explained Visually',
    type: 'video',
    url: 'https://youtube.com/watch?v=placeholder1',
    source: 'Youtube',
    section: 'SQL Mastery',
    tags: ['Joins', 'Visuals', 'Beginner'],
    description: 'Understanding Left, Right, Full and Cross joins with diagrams.'
  },
  {
    id: '5',
    title: 'How to Build a Data Product',
    type: 'video',
    url: 'https://youtube.com/watch?v=placeholder2',
    source: 'Youtube',
    section: 'Products',
    tags: ['Product Management', 'Data Contracts'],
    description: 'Step-by-step guide to treating data as a product.'
  },
  {
    id: '6',
    title: '3NF Normalization in 5 Minutes',
    type: 'video',
    url: 'https://youtube.com/watch?v=placeholder3',
    source: 'Youtube',
    section: 'DB Design',
    tags: ['Normalization', 'Database', 'Tutorial'],
    description: 'Quick crash course on Third Normal Form.'
  },

  // Articles
  {
    id: '7',
    title: 'The Guide to Modern Data Quality',
    type: 'article',
    url: 'https://example.com/data-quality-guide',
    source: 'Medium',
    section: 'Management',
    tags: ['Data Quality', 'Testing', 'Reliability'],
    description: 'Implementing freshness and volume checks in production.'
  },
  {
    id: '8',
    title: 'RACI Matrices for Data Teams',
    type: 'article',
    url: 'https://example.com/raci-guide',
    source: 'Harvard Business Review',
    section: 'Op Model',
    tags: ['Organization', 'RACI', 'Management'],
    description: 'How to assign responsibility without creating bottlenecks.'
  },
  {
    id: '9',
    title: 'Choosing the Right Index Type (B-Tree vs Hash)',
    type: 'article',
    url: 'https://example.com/index-types',
    source: 'Postgres Docs',
    section: 'DB Design',
    tags: ['Indexing', 'Performance', 'PostgreSQL'],
    description: 'Technical deep dive into index data structures.'
  }
];