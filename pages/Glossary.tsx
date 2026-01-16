import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { GlossaryTerm } from '../types';
import { PageContainer } from '../components/PageContainer';

const TERMS: GlossaryTerm[] = [
  { term: 'ACID', definition: 'Atomicity, Consistency, Isolation, Durability. The standard properties that guarantee database transactions are processed reliably.', category: 'Database' },
  { term: 'CAP Theorem', definition: 'States that a distributed data store can only provide two of the following three guarantees: Consistency, Availability, and Partition Tolerance.', category: 'Theory' },
  { term: 'Data Mesh', definition: 'A decentralized sociotechnical approach to share, access, and manage analytical data in complex and large-scale environments.', category: 'Architecture' },
  { term: 'ETL/ELT', definition: 'Extract, Transform, Load (or Extract, Load, Transform). Processes for moving data from a source to a destination.', category: 'Engineering' },
  { term: 'Idempotency', definition: 'A property of operations whereby they can be applied multiple times without changing the result beyond the initial application.', category: 'Engineering' },
  { term: 'Normalization', definition: 'The process of organizing data in a database to reduce redundancy and improve data integrity.', category: 'Database' },
  { term: 'SLA', definition: 'Service Level Agreement. A commitment between a service provider and a client. Particular aspects of the service – quality, availability, responsibilities – are agreed between the service provider and the service user.', category: 'Governance' },
  { term: 'Slowly Changing Dimension (SCD)', definition: 'A dimension table attribute that changes over time. Types 0 through 6 define how these changes are handled.', category: 'Warehousing' },
];

export const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = TERMS.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <PageContainer>
      <div className="mb-12 border-b border-dg-blue/10 pb-8">
        <h1 className="text-4xl font-bold text-dg-blue mb-4">Glossary</h1>
        <p className="text-xl text-dg-muted">Definitions of common terms used within the DataSphere operating model.</p>
      </div>

      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-dg-muted/50" size={20} />
        </div>
        <input
          type="text"
          placeholder="Search for a term..."
          className="w-full pl-10 pr-4 py-3 border border-dg-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-dg-blue focus:border-transparent bg-white shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item) => (
            <div key={item.term} className="bg-white p-6 rounded-lg border border-dg-blue/10 hover:border-dg-blue/30 transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-dg-blue">{item.term}</h3>
                <span className="text-xs font-semibold text-dg-maroon bg-red-50 px-2 py-1 rounded-full">{item.category}</span>
              </div>
              <p className="text-dg-muted leading-relaxed">{item.definition}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-dg-muted">
            No terms found matching your search.
          </div>
        )}
      </div>
    </PageContainer>
  );
};