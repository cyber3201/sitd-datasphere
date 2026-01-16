import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Box, ShieldCheck, Clock, Users, Database } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';

export const DataProductCardTemplate: React.FC = () => {
  return (
    <PageContainer>
      <div className="animate-in fade-in">
        <div className="mb-8">
          <Link to="/data-products" className="inline-flex items-center text-dg-muted hover:text-dg-blue transition-colors mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Retour au cursus Data Products
          </Link>
          <h1 className="text-4xl font-bold text-dg-blue mb-2">Data Product Card</h1>
          <p className="text-dg-muted">Un modèle standard pour documenter vos produits de données et exposer leur contrat de service.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-dg-blue/10 overflow-hidden">
          {/* Header */}
          <div className="bg-dg-blue text-white p-8">
              <div className="flex items-start justify-between">
                  <div>
                      <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-dg-mint text-dg-blue text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Certified</span>
                          <span className="text-dg-mint/80 text-sm font-mono">ID: DP-FIN-001</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-2">Monthly Revenue Aggregates</h2>
                      <p className="text-dg-cream/80 max-w-xl">
                          Official monthly revenue figures aggregated by region, product line, and customer segment. Used for financial reporting and executive dashboards.
                      </p>
                  </div>
                  <Box size={48} className="text-dg-mint opacity-50" />
              </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dg-blue/10">
              
              {/* Left Col: Metadata */}
              <div className="p-6 space-y-6">
                  <div>
                      <h3 className="text-xs font-bold text-dg-muted uppercase tracking-wider mb-2 flex items-center">
                          <Users size={14} className="mr-1" /> Ownership
                      </h3>
                      <div className="space-y-2 text-sm">
                          <div>
                              <span className="block text-gray-500 text-xs">Domain Owner</span>
                              <span className="font-medium text-dg-blue">Finance Team</span>
                          </div>
                          <div>
                              <span className="block text-gray-500 text-xs">Product Manager</span>
                              <span className="font-medium text-dg-blue">Jane Doe</span>
                          </div>
                          <div>
                              <span className="block text-gray-500 text-xs">Tech Lead</span>
                              <span className="font-medium text-dg-blue">John Smith</span>
                          </div>
                      </div>
                  </div>
                  <div>
                      <h3 className="text-xs font-bold text-dg-muted uppercase tracking-wider mb-2 flex items-center">
                          <Clock size={14} className="mr-1" /> SLA & Freshness
                      </h3>
                      <div className="bg-dg-cream/30 rounded p-3 text-sm border border-dg-blue/5">
                          <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Update Freq</span>
                              <span className="font-semibold">Monthly</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-gray-600">Availability</span>
                              <span className="font-semibold text-green-700">99.9%</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Middle Col: Quality & Schema */}
              <div className="p-6 md:col-span-2 space-y-8">
                  <div>
                      <h3 className="text-xs font-bold text-dg-muted uppercase tracking-wider mb-3 flex items-center">
                          <Database size={14} className="mr-1" /> Input Data & Logic
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                          Aggregates raw transactions from <code className="bg-gray-100 px-1 rounded text-xs">ERP_SALES</code> and joins with <code className="bg-gray-100 px-1 rounded text-xs">CRM_CUSTOMERS</code>. Excludes internal test accounts.
                      </p>
                  </div>

                  <div>
                       <h3 className="text-xs font-bold text-dg-muted uppercase tracking-wider mb-3 flex items-center">
                          <ShieldCheck size={14} className="mr-1" /> Quality Assurance
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {['Uniqueness on (month, region)', 'Revenue >= 0', 'Currency is valid ISO code', 'No NULL region_id'].map((rule, i) => (
                              <div key={i} className="flex items-center text-sm p-2 rounded bg-green-50 text-green-800 border border-green-100">
                                  <ShieldCheck size={14} className="mr-2 flex-shrink-0" />
                                  {rule}
                              </div>
                          ))}
                      </div>
                  </div>

                   <div>
                      <h3 className="text-xs font-bold text-dg-muted uppercase tracking-wider mb-3">Access & Security</h3>
                      <div className="flex items-center space-x-2 text-sm">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded border border-yellow-200">Confidential</span>
                          <span className="text-gray-500">Requires AD Group: <code className="text-xs">FINANCE_ANALYTICS_READ</code></span>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
