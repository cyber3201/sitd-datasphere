import React from 'react';
import { Construction } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';

interface GenericPageProps {
  title: string;
  description: string;
}

export const GenericPage: React.FC<GenericPageProps> = ({ title, description }) => {
  return (
    <PageContainer>
      <div className="mb-12 border-b border-dg-blue/10 pb-8">
        <h1 className="text-4xl font-bold text-dg-blue mb-4">{title}</h1>
        <p className="text-xl text-dg-muted">{description}</p>
      </div>

      <div className="bg-white border border-dg-blue/10 rounded-xl p-12 text-center shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-dg-cream rounded-full mb-6">
            <Construction className="text-dg-maroon" size={32} />
        </div>
        <h2 className="text-2xl font-semibold text-dg-blue mb-4">Under Development</h2>
        <p className="text-dg-muted max-w-md mx-auto mb-8">
            The DataSphere scribes are currently documenting the standards for {title}. 
            Check back soon for comprehensive guides and best practices.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6">
            <h3 className="text-lg font-bold text-dg-blue mb-2">Upcoming Topics</h3>
            <ul className="list-disc pl-5 space-y-2 text-dg-muted">
                <li>Strategic Frameworks</li>
                <li>Implementation Patterns</li>
                <li>Tool Selection Guide</li>
                <li>Case Studies</li>
            </ul>
        </div>
        <div className="p-6">
            <h3 className="text-lg font-bold text-dg-blue mb-2">Related Resources</h3>
             <ul className="list-disc pl-5 space-y-2 text-dg-muted">
                <li>External Reference A</li>
                <li>Industry Standard B</li>
            </ul>
        </div>
      </section>
    </PageContainer>
  );
};