
import React, { useEffect, useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { getAssetPath } from '../lib/assets';

const ASSETS_TO_CHECK = [
  '/illustrations/db-design/erd-intro-fig-1.svg',
  '/illustrations/db-design/entities-attributes-fig-1.svg',
  '/illustrations/db-design/cardinalities-fig-1.svg',
  '/illustrations/db-design/1nf-fig-1.svg',
  '/illustrations/db-design/2nf-fig-1.svg',
  '/illustrations/db-design/3nf-fig-1.svg',
  '/illustrations/db-design/primary-foreign-keys-fig-1.svg',
  '/illustrations/db-design/constraints-basics-fig-1.svg',
  '/illustrations/db-design/indexing-basics-fig-1.svg',
  '/illustrations/db-design/schema-performance-patterns-fig-1.svg',
  '/illustrations/db-design/star-schema-intro-fig-1.svg',
  '/illustrations/db-design/grain-scd-metrics-fig-1.svg',
];

export const DebugAssets: React.FC = () => {
  const [statuses, setStatuses] = useState<Record<string, { status: number | string; type: string | null; error?: string }>>({});

  useEffect(() => {
    ASSETS_TO_CHECK.forEach(path => {
      const fullPath = getAssetPath(path);
      fetch(fullPath)
        .then(res => {
          setStatuses(prev => ({
            ...prev,
            [path]: { status: res.status, type: res.headers.get('content-type') }
          }));
        })
        .catch((err) => {
          setStatuses(prev => ({
            ...prev,
            [path]: { status: 'FETCH_ERR', type: null, error: String(err) }
          }));
        });
    });
  }, []);

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dg-blue mb-2">Asset Debugger</h1>
        <p className="text-dg-muted">Checking availability of {ASSETS_TO_CHECK.length} diagrams.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ASSETS_TO_CHECK.map(path => {
          const fullPath = getAssetPath(path);
          const info = statuses[path];
          const isOk = info?.status === 200;
          const isSvg = info?.type?.includes('svg');
          
          return (
            <div key={path} className={`border rounded-lg overflow-hidden bg-white shadow-sm flex flex-col md:flex-row ${isOk ? 'border-green-200' : 'border-red-200'}`}>
              <div className="p-4 bg-gray-50 border-r border-gray-100 w-full md:w-1/3 text-xs font-mono break-all flex flex-col justify-center">
                <div className="mb-2">
                   <span className="font-bold text-gray-500 block">Path:</span>
                   <span className="text-dg-blue">{path}</span>
                </div>
                <div className="mb-2">
                   <span className="font-bold text-gray-500 block">Resolved:</span>
                   <span className="text-gray-400">{fullPath}</span>
                </div>
                <div className="flex justify-between items-center bg-white p-2 rounded border">
                   <div>
                     <div className={isOk ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                       {info ? (info.status === 200 ? 'HTTP 200' : `HTTP ${info.status}`) : 'Checking...'}
                     </div>
                     <div className="text-gray-500 mt-1">
                       {info ? (info.type || 'No Type') : '...'}
                     </div>
                   </div>
                   <a href={fullPath} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold ml-4">
                     Open ↗
                   </a>
                </div>
                {!isSvg && isOk && (
                  <div className="mt-2 text-orange-600 font-bold">Warning: Content-Type is not SVG!</div>
                )}
              </div>
              
              <div className="p-4 flex items-center justify-center bg-white w-full md:w-2/3 min-h-[150px]">
                <img 
                  src={fullPath} 
                  alt="Asset Preview" 
                  className="max-w-full h-auto max-h-[300px] shadow-sm border border-gray-100"
                />
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
};
