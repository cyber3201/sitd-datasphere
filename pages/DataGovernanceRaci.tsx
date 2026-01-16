import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';

export const DataGovernanceRaci: React.FC = () => {
  const roles = ["Data Owner", "Data Steward", "Data Custodian (IT)", "Data User", "Chief Data Officer"];
  const tasks = [
    { name: "Définir la politique de classification", raci: ["A", "R", "C", "I", "A"] },
    { name: "Documenter les métadonnées business", raci: ["A", "R", "I", "I", "I"] },
    { name: "Implémenter les contrôles de sécurité", raci: ["I", "C", "R", "I", "A"] },
    { name: "Valider la qualité des données", raci: ["A", "R", "C", "I", "I"] },
    { name: "Signaler un incident de qualité", raci: ["I", "C", "I", "R", "C"] },
  ];

  return (
    <PageContainer>
      <div className="animate-in fade-in">
        <div className="mb-8">
          <Link to="/data-governance" className="inline-flex items-center text-dg-muted hover:text-dg-blue transition-colors mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Retour au cursus Gouvernance
          </Link>
          <div className="flex justify-between items-end border-b border-dg-blue/10 pb-6">
            <div>
              <h1 className="text-4xl font-bold text-dg-blue mb-2">Modèle RACI</h1>
              <p className="text-dg-muted">Responsible, Accountable, Consulted, Informed. Matrice standard pour la gouvernance.</p>
            </div>
            <button className="hidden sm:flex items-center space-x-2 bg-dg-blue text-white px-4 py-2 rounded hover:bg-dg-maroon transition-colors text-sm font-semibold">
              <Download size={16} />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-dg-blue/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dg-blue/5 border-b border-dg-blue/10">
                  <th className="p-4 font-bold text-dg-blue text-sm uppercase tracking-wider w-1/3">Activité / Décision</th>
                  {roles.map((r, i) => (
                    <th key={i} className="p-4 font-semibold text-dg-text text-xs uppercase tracking-wide border-l border-dg-blue/5">{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dg-blue/5">
                {tasks.map((task, idx) => (
                  <tr key={idx} className="hover:bg-dg-cream/30 transition-colors">
                    <td className="p-4 font-medium text-dg-blue">{task.name}</td>
                    {task.raci.map((val, i) => (
                      <td key={i} className="p-4 text-center border-l border-dg-blue/5">
                        <span className={`
                          inline-flex items-center justify-center w-8 h-8 rounded font-bold text-sm
                          ${val === 'R' ? 'bg-blue-100 text-blue-800' :
                            val === 'A' ? 'bg-red-100 text-red-800' :
                            val === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-600'}
                        `}>
                          {val}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-dg-cream/20 border-t border-dg-blue/5 text-sm text-dg-muted">
            <h4 className="font-bold text-dg-blue mb-2">Légende</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <li><strong className="text-red-800">Accountable (A)</strong>: L'unique décideur final. Il doit valider.</li>
              <li><strong className="text-blue-800">Responsible (R)</strong>: Celui qui effectue le travail.</li>
              <li><strong className="text-yellow-800">Consulted (C)</strong>: Expert consulté avant la décision.</li>
              <li><strong className="text-gray-600">Informed (I)</strong>: Informé après la décision/action.</li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
