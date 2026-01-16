
import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer';
import { PageHero } from '../components/PageHero';
import { AlertTriangle, ArrowRight, Lock } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-dg-text">
      <PageHero 
        title="Politique de Confidentialité" 
        subtitle="Transparence sur l'usage de vos données."
        icon={<Lock size={24} />}
      />

      <PageContainer>
        <div className="max-w-3xl mx-auto pb-20">
          
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-12 flex gap-3 text-sm text-yellow-800">
            <AlertTriangle className="flex-shrink-0 mt-0.5" size={18} />
            <p>
              <strong>Note :</strong> Ce site ne collecte aucune donnée personnelle sensible et n'a pas de vocation commerciale.
            </p>
          </div>

          <article className="space-y-12 text-lg leading-relaxed text-dg-muted">
            <section>
              <h2 className="text-2xl font-bold text-dg-blue mb-4">1. Collecte de l'information</h2>
              <p className="mb-4">
                Nous recueillons des informations lorsque vous naviguez sur notre site (cookies techniques) ou lorsque vous nous contactez volontairement via le formulaire de contact.
              </p>
              <p>
                Les seules données personnelles potentiellement collectées sont :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 marker:text-dg-blue/50">
                <li>Votre Nom et Prénom (si fournis).</li>
                <li>Votre Adresse E-mail (pour vous répondre).</li>
                <li>Les données de progression pédagogique (stockées localement dans votre navigateur).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dg-blue mb-4">2. Utilisation des informations</h2>
              <p>
                Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 marker:text-dg-blue/50">
                <li>Personnaliser votre expérience et répondre à vos besoins individuels.</li>
                <li>Améliorer notre site Web.</li>
                <li>Améliorer le service client et vos besoins de prise en charge.</li>
                <li>Vous contacter par e-mail (uniquement suite à une demande de votre part).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dg-blue mb-4">3. Confidentialité du commerce en ligne</h2>
              <p>
                Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n’importe quelle raison, sans votre consentement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dg-blue mb-4">4. Protection des données (Cookies)</h2>
              <p>
                Ce site utilise le <strong>Local Storage</strong> de votre navigateur pour sauvegarder votre progression dans les cours (leçons terminées). Ces données ne quittent pas votre navigateur et ne sont pas stockées sur nos serveurs.
              </p>
              <p className="mt-4">
                Nous n'utilisons pas de cookies publicitaires tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dg-blue mb-4">5. Consentement</h2>
              <p>
                En utilisant notre site, vous consentez à notre politique de confidentialité.
              </p>
            </section>
          </article>

          <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
             <span className="text-sm text-gray-400">Fin du document</span>
             <Link to="/terms" className="inline-flex items-center text-dg-blue font-bold hover:text-dg-maroon transition-colors">
               Consulter les CGU <ArrowRight size={18} className="ml-2" />
             </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
