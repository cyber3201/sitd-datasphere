
import React, { useState } from 'react';
import { Database, Table, Columns, ChevronRight, ChevronDown, PlusCircle } from 'lucide-react';

interface ColumnDef {
  name: string;
  type: string;
}

interface SchemaExplorerProps {
  schema: Record<string, ColumnDef[]>;
  onInsert: (text: string) => void;
  className?: string;
}

export const PgSchemaExplorer: React.FC<SchemaExplorerProps> = ({ schema, onInsert, className }) => {
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({});

  const toggleTable = (tableName: string) => {
    setExpandedTables(prev => ({
      ...prev,
      [tableName]: !prev[tableName]
    }));
  };

  const tables = Object.keys(schema).sort();

  return (
    <div className={`flex flex-col bg-white border-r border-dg-blue/10 h-full ${className}`}>
      <div className="p-3 border-b border-dg-blue/10 bg-dg-cream/30 flex items-center gap-2">
        <Database size={16} className="text-dg-blue" />
        <h2 className="font-bold text-dg-blue text-sm uppercase tracking-wider">Tables</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {tables.length === 0 ? (
          <div className="text-xs text-dg-muted p-2 italic">Chargement du schéma...</div>
        ) : (
          tables.map(tableName => (
            <div key={tableName} className="rounded-md overflow-hidden">
              <div 
                className="flex items-center justify-between px-2 py-1.5 hover:bg-dg-blue/5 cursor-pointer group rounded"
                onClick={() => toggleTable(tableName)}
              >
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {expandedTables[tableName] ? 
                    <ChevronDown size={14} className="text-dg-muted" /> : 
                    <ChevronRight size={14} className="text-dg-muted" />
                  }
                  <Table size={14} className="text-dg-blue flex-shrink-0" />
                  <span className="text-sm font-medium text-dg-text truncate select-none">{tableName}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onInsert(`SELECT * FROM ${tableName} LIMIT 20;`);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-dg-blue text-dg-muted transition-opacity"
                  title="Générer SELECT"
                >
                  <PlusCircle size={12} />
                </button>
              </div>

              {expandedTables[tableName] && (
                <div className="pl-6 pr-2 py-1 space-y-0.5 border-l border-dg-blue/5 ml-2.5 my-1">
                  {schema[tableName].map(col => (
                    <div 
                      key={col.name}
                      onClick={() => onInsert(col.name)}
                      className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-dg-blue/5 cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <Columns size={12} className="text-dg-muted/70" />
                        <span className="text-dg-muted truncate group-hover:text-dg-blue transition-colors">{col.name}</span>
                      </div>
                      <span className="text-[10px] text-dg-muted/50 font-mono flex-shrink-0 ml-2">{col.type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
