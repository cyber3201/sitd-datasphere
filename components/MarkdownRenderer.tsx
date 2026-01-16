
import React from 'react';

interface Props {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<Props> = ({ content, className = '' }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  
  let currentListType: 'ul' | 'ol' | null = null;
  let currentListItems: string[] = [];
  let currentParagraph: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      blocks.push(
        <p key={`p-${blocks.length}`} className="mb-4 text-lg text-dg-text leading-relaxed text-gray-700">
          {currentParagraph.map((line, i) => (
            <React.Fragment key={i}>
              <InlineMarkdown text={line} />
              {i < currentParagraph.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentListType && currentListItems.length > 0) {
      const Tag = currentListType;
      const listClass = currentListType === 'ol' ? "list-decimal" : "list-disc";
      blocks.push(
        <Tag key={`list-${blocks.length}`} className={`${listClass} pl-6 mb-6 space-y-2 marker:text-dg-blue text-lg text-gray-700`}>
          {currentListItems.map((item, i) => (
            <li key={i} className="pl-2">
              <InlineMarkdown text={item} />
            </li>
          ))}
        </Tag>
      );
      currentListItems = [];
      currentListType = null;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    
    // Empty line -> flush everything
    if (!trimmed) {
      flushList();
      flushParagraph();
      return;
    }

    // Check for List Item
    // Bullet: * or - followed by space
    const isUl = trimmed.startsWith('* ') || trimmed.startsWith('- ');
    // Ordered: Number dot space (e.g. "1. ")
    const isOl = /^\d+\.\s/.test(trimmed);

    if (isUl || isOl) {
      flushParagraph(); // Close paragraph if we hit a list
      
      const newListType = isOl ? 'ol' : 'ul';
      
      // If switching list type, flush previous list
      if (currentListType && currentListType !== newListType) {
        flushList();
      }
      
      currentListType = newListType;
      // Strip marker
      const content = isOl 
        ? trimmed.replace(/^\d+\.\s/, '') 
        : trimmed.replace(/^[\*\-]\s/, '');
      
      currentListItems.push(content);
    } else {
      // Normal text
      flushList(); // Close list if we hit text
      currentParagraph.push(line); 
    }
  });

  // Flush remaining
  flushList();
  flushParagraph();

  return <div className={className}>{blocks}</div>;
};

const InlineMarkdown: React.FC<{ text: string }> = ({ text }) => {
  // Simple regex parser for inline elements
  // 1. Bold: **text**
  // 2. Code: `text`
  // 3. Italic: *text*
  
  // Splitting keeps delimiters in the array due to capturing groups
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          return <strong key={i} className="font-bold text-dg-blue">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
          return <code key={i} className="bg-gray-100 text-dg-maroon px-1.5 py-0.5 rounded font-mono text-sm border border-gray-200">{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length >= 3) {
           return <em key={i} className="italic text-gray-800">{part.slice(1, -1)}</em>;
        }
        return part;
      })}
    </>
  );
};
