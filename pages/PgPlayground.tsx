
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Database, SqlJsStatic } from 'sql.js';
import { RefreshCw, AlertTriangle, Database as DbIcon, Check, Terminal } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { PgSchemaExplorer } from '../components/PgSchemaExplorer';
import { PgEditor } from '../components/PgEditor';
import { PgResultsTable } from '../components/PgResultsTable';

declare global {
  interface Window {
    initSqlJs: (config?: any) => Promise<SqlJsStatic>;
  }
}

// ... (SEED_SQL and INITIAL_QUERY constants remain unchanged)
const SEED_SQL = `
DROP TABLE IF EXISTS shippings;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;

-- Create Tables (SQLite uses INTEGER PRIMARY KEY for auto-increment)
CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  age INTEGER,
  country TEXT
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  item TEXT,
  amount INTEGER,
  customer_id INTEGER,
  FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE shippings (
  shipping_id INTEGER PRIMARY KEY,
  status TEXT,
  customer_id INTEGER,
  FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
);

-- Seed Data
INSERT INTO customers (first_name, last_name, age, country) VALUES
('John', 'Doe', 34, 'USA'),
('Alice', 'Smith', 28, 'UK'),
('Bob', 'Brown', 45, 'Canada'),
('Emma', 'Wilson', 31, 'France'),
('David', 'Lee', 29, 'Germany');

INSERT INTO orders (item, amount, customer_id) VALUES
('Laptop', 1200, 1),
('Mouse', 25, 1),
('Keyboard', 80, 2),
('Monitor', 300, 3),
('Phone', 800, 4),
('Tablet', 450, 4),
('Headphones', 150, 5);

INSERT INTO shippings (status, customer_id) VALUES
('Shipped', 1),
('Pending', 2),
('Delivered', 3),
('Processing', 4),
('Shipped', 5);
`;

const INITIAL_QUERY = `-- Bienvenue dans le Playground SQL (SQLite) !
-- Les tables 'customers', 'orders' et 'shippings' sont prêtes.

SELECT * FROM customers LIMIT 10;`;

export const PgPlayground: React.FC = () => {
  const [db, setDb] = useState<Database | null>(null);
  const [schema, setSchema] = useState<Record<string, {name: string, type: string}[]>>({});
  const [code, setCode] = useState(INITIAL_QUERY);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [queryTime, setQueryTime] = useState<number | null>(null);
  const [status, setStatus] = useState<'ready' | 'running' | 'error'>('ready');
  
  const initRef = useRef(false);
  const dbRef = useRef<Database | null>(null);

  const fetchSchema = (database: Database) => {
    try {
      const tablesRes = database.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;");
      const newSchema: Record<string, any[]> = {};
      if (tablesRes.length > 0 && tablesRes[0].values) {
        const tableNames = tablesRes[0].values.map((row) => row[0] as string);
        for (const table of tableNames) {
          const colsRes = database.exec(`PRAGMA table_info(${table})`);
          if (colsRes.length > 0) {
            newSchema[table] = colsRes[0].values.map((row) => ({
              name: row[1] as string,
              type: row[2] as string
            }));
          }
        }
      }
      setSchema(newSchema);
    } catch (e) {
      console.error("Schema fetch error:", e);
    }
  };

  const initDatabase = async () => {
    if (initRef.current) return;
    initRef.current = true;
    setLoading(true);
    setInitError(null);
    try {
      if (typeof window.initSqlJs !== 'function') throw new Error("La librairie SQL.js n'a pas pu se charger depuis le CDN.");
      const SQL = await window.initSqlJs({
        locateFile: file => `https://unpkg.com/sql.js@1.13.0/dist/${file}` 
      });
      const database = new SQL.Database();
      dbRef.current = database;
      database.run(SEED_SQL);
      fetchSchema(database);
      setDb(database);
    } catch (err: any) {
      console.error("SQL.js init failed:", err);
      setInitError(`Erreur: ${err.message || "Impossible de charger le moteur SQL"}`);
      initRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initDatabase();
    return () => {
      if (dbRef.current) { dbRef.current.close(); dbRef.current = null; }
      initRef.current = false;
    };
  }, []);

  const runQuery = useCallback(async () => {
    if (!db || !code.trim()) return;
    setLoading(true);
    setStatus('running');
    setError(null);
    setResult(null);
    setQueryTime(null);
    setTimeout(() => {
      const start = performance.now();
      try {
        const resArray = db.exec(code);
        const end = performance.now();
        if (resArray.length > 0) {
          const lastRes = resArray[resArray.length - 1];
          setResult({ columns: lastRes.columns, values: lastRes.values, affectedRows: db.getRowsModified() });
        } else {
           setResult({ columns: [], values: [], affectedRows: db.getRowsModified() });
        }
        setQueryTime(Math.round(end - start));
        setStatus('ready');
        if (code.toLowerCase().match(/\b(create|drop|alter)\b/)) fetchSchema(db);
      } catch (err: any) {
        setError(err.message || "Erreur SQL inconnue");
        setStatus('error');
      } finally {
        setLoading(false);
      }
    }, 10);
  }, [db, code]);

  const resetDb = async () => {
    if (!db || !confirm("Ceci va réinitialiser la base de données. Continuer ?")) return;
    setLoading(true);
    try {
      db.run(SEED_SQL);
      fetchSchema(db);
      setCode(INITIAL_QUERY);
      setResult(null);
      setError(null);
      setStatus('ready');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInsertSnippet = (text: string) => { setCode(prev => prev + (prev ? '\n' : '') + text); };

  if (initError) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-red-50 rounded-xl border border-red-100">
          <AlertTriangle size={48} className="text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-red-800 mb-2">Erreur de chargement</h2>
          <p className="text-red-600 mb-6 max-w-md">{initError}</p>
          <button onClick={() => { initRef.current = false; initDatabase(); }} className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
            <RefreshCw size={18} className="mr-2" /> Réessayer
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-dg-cream overflow-hidden">
      {/* Header Bar */}
      <div className="h-16 pt-16 bg-white border-b border-dg-blue/10 flex items-center justify-between px-4 lg:px-8 shadow-sm z-20">
         <div className="flex items-center gap-3">
            <div className="bg-dg-blue/10 p-1.5 rounded-lg text-dg-blue">
               <Terminal size={18} />
            </div>
            <h1 className="font-bold text-dg-blue">Playground SQL</h1>
            <span className="text-xs px-2 py-0.5 bg-dg-mint/20 text-dg-blue rounded-full border border-dg-mint/30 font-medium">SQLite In-Memory</span>
         </div>
         <div className="text-xs text-dg-muted hidden sm:block">
            Toutes les données sont volatiles (reset au rechargement).
         </div>
      </div>

      {/* Editor Layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <div className="lg:w-64 flex-shrink-0 h-1/3 lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-dg-blue/10 bg-white">
          <PgSchemaExplorer schema={schema} onInsert={handleInsertSnippet} className="h-full" />
        </div>
        <div className="flex-1 flex flex-col min-w-0 h-1/3 lg:h-full border-b lg:border-b-0 lg:border-r border-dg-blue/10">
          <PgEditor code={code} onChange={setCode} onRun={runQuery} onReset={resetDb} loading={loading && !db} status={status} className="h-full" />
        </div>
        <div className="lg:w-[450px] flex-shrink-0 h-1/3 lg:h-full min-w-0 overflow-hidden">
          <PgResultsTable result={result} error={error} queryTime={queryTime} className="h-full" />
        </div>
      </div>
    </div>
  );
};
