
import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer';
import { PageHero } from '../components/PageHero';
import { AlertTriangle, ArrowRight, FileText } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-dg-text">
      <PageHero 
        title="Conditions Générales" 
        subtitle="Dernière mise à jour : 15/01/2026"
        icon={<FileText size={24} />}
      />

      <PageContainer>
        <div className="max-w-3xl mx-auto pb-20">
          
          {/* Subtle Warning Banner */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-12 flex gap-3 text-sm text-yellow-800">
            <AlertTriangle className="flex-shrink-0 mt-0.5" size={18} />
            <p>
              <strong>Projet Étudiant :</strong> Ce site est un démonstrateur éducatif. Ce document est fourni à titre d'exemple et ne constitue pas un avis juridique certifié.
            </p>
          </div>

          <article className="space-y-12 text-lg leading-relaxed text-dg-muted">
            <section>
              <h2 className="text-2xl font-bold text-dg-blue mb-4">1. Objet</h2>
              <p>
                Les présentes Conditions Générales d’Utilisation (CGU) régissent l'accès et l'utilisation du site <strong>DataSphere</strong>. 
                En naviguant sur ce site, vous acceptez sans réserve les présentes conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dg-blue mb-4">2. Accès au service</h2>
              <p className="mb-4">
                Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Tous les coûts afférents à l'accès au service, que ce soient les frais matériels, logiciels ou d'accès à Internet sont exclusivement à la charge de l'utilisateur.
              </p>
              <p>
                L'éditeur met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité au service, mais n'est tenu à aucune obligation d'y parvenir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dg-blue mb-4">3. Propriété Intellectuelle</h2>
              <p>
                Les marques, logos, signes ainsi que tout le contenu du site (textes, images, son...) font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
              </p>
              <p className="mt-4">
                L'utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie des différents contenus. Une utilisation à des fins strictement privées et éducatives est autorisée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dg-blue mb-4">4. Responsabilité</h2>
              <p>
                Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle. Malgré des mises à jour régulières, le site DataSphere ne peut être tenu responsable de la modification des dispositions administratives et juridiques survenant après la publication. De même, le site ne peut être tenue responsable de l'utilisation et de l'interprétation de l'information contenue dans ce site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dg-blue mb-4">5. Contact</h2>
              <p>
                Pour toute question relative à l'application des présentes CGU, vous pouvez joindre l'éditeur aux coordonnées suivantes : <a href="mailto:zakariagbibar4@gmail.com" className="text-dg-blue hover:underline font-medium">zakariagbibar4@gmail.com</a>.
              </p>
            </section>
          </article>

          <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
             <span className="text-sm text-gray-400">Fin du document</span>
             <Link to="/privacy" className="inline-flex items-center text-dg-blue font-bold hover:text-dg-maroon transition-colors">
               Politique de Confidentialité <ArrowRight size={18} className="ml-2" />
             </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
