import React, { useEffect, useState } from 'react';
import { getOverallStats, subscribeToProgress } from '../lib/progress';

export const SqlProgressBar: React.FC = () => {
  const [stats, setStats] = useState(getOverallStats());

  useEffect(() => {
    const cleanup = subscribeToProgress(() => {
      setStats(getOverallStats());
    });
    return cleanup;
  }, []);

  if (stats.total === 0) return null;

  return (
    <div className="w-full bg-dg-cream border-b border-dg-blue/10 py-3 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-dg-blue mb-1">
          <span>Progression</span>
          <span>{stats.completed} / {stats.total} leçons terminées ({stats.percent}%)</span>
        </div>
        <div className="w-full h-2 bg-dg-blue/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-dg-mint transition-all duration-500 ease-out"
            style={{ width: `${stats.percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};