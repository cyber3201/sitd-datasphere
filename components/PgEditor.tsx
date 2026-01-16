
import React from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Trash2, Code2, Loader2 } from 'lucide-react';

interface PgEditorProps {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
  loading: boolean;
  status: 'ready' | 'running' | 'error';
  className?: string;
}

const EXAMPLES = [
  { label: 'Exemple: Basic Join', sql: "SELECT c.first_name, c.country, o.item, o.amount\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nWHERE c.country = 'USA';" },
  { label: 'Exemple: Group By', sql: "SELECT c.country, COUNT(o.order_id) as total_orders, SUM(o.amount) as total_spent\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nGROUP BY c.country\nHAVING SUM(o.amount) > 0;" },
  { label: 'Exemple: Window Function', sql: "SELECT \n  item,\n  amount,\n  RANK() OVER (ORDER BY amount DESC) as rank_price\nFROM orders;" },
  { label: 'Exemple: CTE', sql: "WITH high_value_orders AS (\n  SELECT * FROM orders WHERE amount > 500\n)\nSELECT * FROM high_value_orders;" },
];

export const PgEditor: React.FC<PgEditorProps> = ({ 
  code, 
  onChange, 
  onRun, 
  onReset,
  loading,
  status,
  className 
}) => {
  const handleExampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between p-2 border-b border-dg-blue/10 gap-2 bg-white flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onRun}
            disabled={loading}
            className={`
              flex items-center px-3 py-1.5 rounded text-sm font-bold text-white transition-all shadow-sm
              ${loading ? 'bg-dg-muted cursor-wait' : 'bg-dg-blue hover:bg-blue-900'}
            `}
          >
            {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Play size={16} className="mr-2 fill-current" />}
            Run
          </button>
          
          <div className="h-6 w-px bg-dg-blue/10 mx-1" />

          <button
            onClick={() => onChange('')}
            className="p-1.5 text-dg-muted hover:text-dg-maroon hover:bg-dg-cream rounded transition-colors"
            title="Effacer"
          >
            <Trash2 size={16} />
          </button>
          
          <button
            onClick={onReset}
            className="p-1.5 text-dg-muted hover:text-dg-blue hover:bg-dg-cream rounded transition-colors"
            title="Réinitialiser la DB"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 max-w-[200px] sm:max-w-xs">
          <div className="relative w-full">
            <select 
              className="w-full appearance-none pl-8 pr-4 py-1.5 bg-dg-cream/30 border border-dg-blue/20 rounded text-xs font-medium text-dg-blue focus:outline-none focus:ring-1 focus:ring-dg-blue cursor-pointer truncate"
              onChange={handleExampleChange}
              value=""
            >
              <option value="" disabled>Charger un exemple...</option>
              {EXAMPLES.map((ex, i) => (
                <option key={i} value={ex.sql}>{ex.label}</option>
              ))}
            </select>
            <Code2 size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-dg-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative min-h-0">
         <Editor
            height="100%"
            defaultLanguage="sql"
            value={code}
            onChange={(val) => onChange(val || '')}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              padding: { top: 16 },
              lineNumbers: 'on',
              renderLineHighlight: 'all',
              overviewRulerBorder: false,
              hideCursorInOverviewRuler: true,
              automaticLayout: true,
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                verticalScrollbarSize: 10,
              }
            }}
            theme="light"
          />
          
          {/* Status Indicator */}
          <div className="absolute bottom-2 right-4 text-[10px] font-mono pointer-events-none px-2 py-1 rounded bg-white/90 border border-dg-blue/10 text-dg-muted shadow-sm z-10">
            {status === 'running' ? 'Exécution...' : status === 'error' ? 'Erreur' : 'Prêt (SQLite)'}
          </div>
      </div>
    </div>
  );
};
