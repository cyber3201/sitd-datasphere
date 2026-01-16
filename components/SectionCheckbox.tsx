
import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { isLessonCompleted, toggleLessonCompletion, subscribeToProgress } from '../lib/progress';

interface Props {
  lessonId: string;
}

export const SectionCheckbox: React.FC<Props> = ({ lessonId }) => {
  const [checked, setChecked] = useState(isLessonCompleted(lessonId));

  useEffect(() => {
    // Initial check
    setChecked(isLessonCompleted(lessonId));

    // Subscribe to global updates
    const cleanup = subscribeToProgress(() => {
      setChecked(isLessonCompleted(lessonId));
    });
    return cleanup;
  }, [lessonId]);

  const handleClick = () => {
    toggleLessonCompletion(lessonId);
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        mt-8 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center space-x-4 w-full sm:w-auto
        ${checked 
          ? 'bg-dg-mint/20 border-dg-mint text-dg-blue' 
          : 'bg-white border-dg-blue/10 hover:border-dg-blue/30 text-dg-muted'
        }
      `}
    >
      <div className={`
        w-6 h-6 rounded border flex items-center justify-center transition-colors flex-shrink-0
        ${checked ? 'bg-dg-mint border-dg-mint text-dg-blue' : 'bg-white border-gray-300'}
      `}>
        {checked && <Check size={14} strokeWidth={3} />}
      </div>
      <span className="font-semibold select-none">
        {checked ? 'Leçon terminée' : 'Marquer cette leçon comme terminée'}
      </span>
    </div>
  );
};
