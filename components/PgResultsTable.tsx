
import React from 'react';
import { Terminal, AlertCircle, CheckCircle2, List } from 'lucide-react';

interface ResultData {
  columns: string[];
  values: any[][];
  affectedRows?: number;
}

interface PgResultsTableProps {
  result: ResultData | null;
  error: string | null;
  queryTime: number | null;
  className?: string;
}

export const PgResultsTable: React.FC<PgResultsTableProps> = ({ result, error, queryTime, className }) => {
  return (
    <div className={`flex flex-col h-full bg-white border-l border-dg-blue/10 ${className}`}>
      <div className="p-3 border-b border-dg-blue/10 bg-dg-cream/30 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <List size={16} className="text-dg-blue" />
          <h2 className="font-bold text-dg-blue text-sm uppercase tracking-wider">Résultats</h2>
        </div>
        {queryTime !== null && (
          <span className="text-[10px] font-mono text-dg-muted bg-white px-1.5 py-0.5 rounded border border-dg-blue/5">
            {queryTime}ms
          </span>
        )}
      </div>

      <div className="flex-1 overflow-hidden relative">
        {!result && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-dg-muted/40 p-8 text-center">
            <Terminal size={32} className="mb-3 opacity-50" />
            <p className="text-sm">Exécutez une requête pour voir les résultats.</p>
          </div>
        )}

        {error && (
          <div className="p-4 text-red-600 font-mono text-xs leading-relaxed whitespace-pre-wrap bg-red-50/30 h-full overflow-auto">
            <div className="flex items-center gap-2 mb-2 font-bold border-b border-red-100 pb-2">
              <AlertCircle size={16} /> Erreur SQL
            </div>
            {error}
          </div>
        )}

        {result && (
          <div className="h-full overflow-auto scrollbar-thin">
            {result.columns.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 border-collapse">
                <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                  <tr>
                    {result.columns.map((colName) => (
                      <th key={colName} scope="col" className="px-3 py-2 text-left text-xs font-bold text-dg-muted uppercase tracking-wider whitespace-nowrap border-b border-gray-200 bg-gray-50 border-r border-gray-100 last:border-r-0">
                        {colName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {result.values.map((row, i) => (
                    <tr key={i} className="hover:bg-dg-blue/5 transition-colors group">
                      {row.map((cellValue, colIndex) => {
                        const isNull = cellValue === null;
                        return (
                            <td key={colIndex} className="px-3 py-1.5 whitespace-nowrap text-xs text-dg-text font-mono border-r border-transparent group-hover:border-dg-blue/5 last:border-r-0">
                            {isNull ? <span className="text-gray-300 italic">NULL</span> : String(cellValue)}
                            </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 sticky bottom-0 text-[10px] text-dg-muted font-mono z-20">
                    <tr>
                        <td colSpan={result.columns.length} className="px-3 py-1 border-t border-gray-200">
                            {result.values.length} ligne(s)
                        </td>
                    </tr>
                </tfoot>
              </table>
            ) : (
              <div className="p-8 text-center text-dg-muted flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
                   <CheckCircle2 size={24} className="text-green-600" />
                </div>
                <p className="font-semibold text-sm text-dg-blue">Requête exécutée avec succès.</p>
                <p className="text-xs mt-1">
                  Pas de données retournées.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
