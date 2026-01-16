
import { LessonContent } from './courseTypes';

export const DP_CONTENT: Record<string, LessonContent> = {
  'what-is-data-product': {
    slug: 'what-is-data-product',
    objectives: ["Comprendre la différence entre Data Asset et Data Product", "Les 4 principes du Data Mesh", "Le Product Mindset"],
    why: {
      title: "Pourquoi le 'Product Thinking' ?",
      content: "Pendant des années, la data a été traitée comme un sous-produit de l'activité (un 'exhaust'). On l'accumulait dans des lacs sans propriétaire. Résultat : des marécages de données inutilisables. Traiter la donnée comme un produit, c'est lui appliquer les standards du développement logiciel : elle doit avoir des utilisateurs, une utilité et une garantie de service."
    },
    concept: {
      title: "Les caractéristiques d'un Data Product",
      content: `Un Data Product n'est pas juste une table ou un fichier CSV. C'est une unité architecturale autonome qui regroupe : Code, Data, Méta-data et Infrastructure. Les principes clés (Data Mesh) sont : Discoverable, Addressable, Trustworthy, Self-describing, Interoperable et Secure.

Ce changement de paradigme implique une transition du mode "Projet" (financement ponctuel, équipe éphémère) vers le mode "Produit" (équipe pérenne, amélioration continue). On ne "livre" pas un Data Product pour l'oublier ensuite ; on le maintient, on gère ses versions et on s'assure qu'il continue de répondre aux besoins des consommateurs. Cette "Servitization" de la donnée oblige les équipes techniques à développer de l'empathie pour leurs utilisateurs et à mesurer le succès non pas en volume de données stockées, mais en satisfaction client.`,
      syntax: ""
    },
    example: {
      title: "Table vs Produit",
      description: "Différence entre une table brute et un produit fini.",
      sql: "",
      result: "Asset : Une table 'LOGS_SERVER_DUMP' sans documentation, avec des doublons et sans propriétaire.\nProduit : Une API 'Customer-360' documentée, maintenue par l'équipe Sales, avec une garantie de fraîcheur < 1h et un taux d'erreur < 0.1%."
    },
    exercises: [],
    quiz: [],
    summary: [
      "Un Data Product a un Propriétaire (Owner) et des Consommateurs.",
      "Il encapsule la complexité pour offrir une interface simple.",
      "La confiance est sa monnaie d'échange principale."
    ]
  },
  'discovery-design': {
    slug: 'discovery-design',
    objectives: ["Identifier les cas d'usage", "Définir le Data Contract", "User Research"],
    why: {
      title: "Concevoir pour l'usage",
      content: "La cause n°1 d'échec des projets data est de construire quelque chose que personne ne veut. La phase de Discovery consiste à comprendre qui sont les utilisateurs (Data Scientists, Analystes, Apps) et quels sont leurs problèmes avant d'écrire la moindre ligne de code."
    },
    concept: {
      title: "Le Data Contract",
      content: `Le contrat de données est l'accord formel entre le Producteur et le Consommateur. Il doit être défini AVANT le développement. Il spécifie le Schéma, la Sémantique, les SLAs et la Politique d'évolution.

Pour valider ce contrat, l'approche "Mockup First" est très efficace. Plutôt que de construire le pipeline ETL complexe, fournissez d'abord un échantillon statique (CSV, vue SQL hardcodée) aux consommateurs. Demandez-leur : "Si je vous livre ça tous les jours, est-ce que ça résout votre problème ?". Cette boucle de feedback rapide permet d'ajuster le schéma (ajouter une colonne, changer un type) pour un coût nul, alors qu'une modification après développement coûterait des semaines de travail.`,
      syntax: ""
    },
    example: {
      title: "Design d'un produit 'Recommandations'",
      description: "L'équipe Marketing veut des recommandations produits pour l'emailing.",
      sql: "",
      result: "Discovery : Ils ont besoin d'un score de propension par client, mis à jour chaque matin à 8h.\nContrat : Table `daily_propensity_scores`, colonnes `user_id`, `product_category`, `score` (0-1). SLA: dispo à 08:00 UTC."
    },
    exercises: [],
    quiz: [],
    summary: [
      "Parlez aux consommateurs avant de coder.",
      "Le Data Contract est votre spécification fonctionnelle et technique.",
      "Utilisez des maquettes de données (mock data) pour valider le besoin."
    ]
  },
  'delivery-architecture': {
    slug: 'delivery-architecture',
    objectives: ["Ports d'entrée/sortie", "Pipeline as Code", "Serving Layer"],
    why: {
      title: "L'anatomie technique",
      content: "Comment structurer techniquement un Data Product pour qu'il soit autonome ? L'architecture doit découpler l'ingestion (Input), la transformation (Interne) et la mise à disposition (Output)."
    },
    concept: {
      title: "Input / Output Ports",
      content: `Le Data Product agit comme un conteneur. Il possède des **Input Ports** (lecture seule des sources) et des **Output Ports** (interfaces de consommation : SQL, API, Fichiers). La logique de transformation est une boîte noire pour l'extérieur.

Un principe crucial est le découplage entre le stockage et le calcul, et entre l'implémentation interne et l'interface exposée. Les consommateurs ne doivent jamais taper directement dans vos tables de travail (staging/raw). Ils doivent accéder à des vues ou des tables publiées via le port de sortie. Cela vous permet de refondre totalement votre pipeline interne (changer d'outil ETL, optimiser le code) sans casser les processus des utilisateurs, tant que vous respectez le contrat de l'interface de sortie.`,
      syntax: ""
    },
    example: {
      title: "Architecture Multi-plan",
      description: "Un produit 'Fraude' doit servir des analystes et une app mobile.",
      sql: "",
      result: "Le pipeline calcule les scores de fraude.\nSortie 1 (Analytique) : Table historique partitionnée pour le reporting.\nSortie 2 (Opérationnelle) : API REST faible latence (<50ms) pour bloquer les transactions en direct."
    },
    exercises: [],
    quiz: [],
    summary: [
      "Encapsulez la logique interne (boîte noire).",
      "Offrez plusieurs interfaces (Ports) selon les besoins.",
      "Tout doit être versionné (Gitops) pour la reproductibilité."
    ]
  },
  'quality-reliability': {
    slug: 'quality-reliability',
    objectives: ["SLI/SLO/SLA", "Observabilité", "Tests automatisés"],
    why: {
      title: "Fiabilité industrielle",
      content: "Si un Data Product casse silencieusement, il perd toute valeur. L'ingénierie de fiabilité (Data Reliability Engineering) vise à détecter et corriger les problèmes AVANT que le consommateur ne s'en aperçoive."
    },
    concept: {
      title: "Les indicateurs de fiabilité",
      content: `Inspirez-vous du SRE : SLI (Indicateur réel), SLO (Objectif interne), SLA (Engagement contractuel). Les tests doivent couvrir la logique (unitaires) et la donnée (qualité).

Pour passer à l'échelle, les Data Contracts doivent devenir exécutables ("Contracts as Code"). Au lieu d'un document PDF, le contrat est un fichier YAML ou JSON qui définit les attentes (schéma, fraîcheur, distribution). Le pipeline CI/CD ou l'outil d'observabilité lit ce fichier et vérifie en permanence que la réalité de la production correspond au contrat. Si une dérive est détectée, une alerte est envoyée directement aux ingénieurs responsables, réduisant le temps de détection (MTTD) et de résolution (MTTR).`,
      syntax: ""
    },
    example: {
      title: "Circuit Breaker",
      description: "Que faire si la source envoie des données corrompues ?",
      sql: "",
      result: "Le pipeline exécute des tests de qualité sur les données entrantes. Si > 5% de NULL sur l'ID client, le pipeline s'arrête (Circuit Break) et alerte l'équipe. On ne publie pas de mauvaises données en production."
    },
    exercises: [],
    quiz: [],
    summary: [
      "Définissez des SLOs clairs et mesurables.",
      "Mettez en place de l'observabilité (Dashboards de santé).",
      "Testez les données en production, pas juste le code."
    ]
  },
  'value-lifecycle': {
    slug: 'value-lifecycle',
    objectives: ["Mesure du ROI", "Adoption", "Dépréciation"],
    why: {
      title: "Gérer le cycle de vie",
      content: "Un produit qui n'est pas utilisé est un déchet coûteux (stockage, calcul, maintenance). Il faut mesurer la valeur réelle apportée par chaque Data Product et savoir dire stop quand elle décline."
    },
    concept: {
      title: "Métriques de succès",
      content: `Comment savoir si votre Data Product réussit ? Mesurez l'Adoption (DAU/MAU), l'Usage (requêtes/jour), la Satisfaction (NPS) et l'Impact business.

La gestion financière (Data FinOps) est indissociable du cycle de vie. Il faut être capable d'attribuer les coûts d'infrastructure (Snowflake credits, AWS costs) à chaque produit. Cela permet de calculer le ROI : si un produit coûte 10k€/mois en calcul mais n'est utilisé que par 2 personnes pour un rapport anecdotique, il y a un problème. Ces métriques objectives facilitent les décisions difficiles de dépréciation (Sunset) ou de refonte pour optimiser les coûts.`,
      syntax: ""
    },
    example: {
      title: "Nettoyage du catalogue",
      description: "Audit annuel des produits.",
      sql: "",
      result: "Le produit 'Old_Marketing_V1' n'a pas été requêté depuis 6 mois. L'équipe décide de le marquer 'Deprecated', notifie les 2 derniers utilisateurs inscrits, et planifie sa suppression dans 30 jours."
    },
    exercises: [],
    quiz: [],
    summary: [
      "Vous ne pouvez pas gérer ce que vous ne mesurez pas.",
      "Un produit a une naissance, une vie et une mort.",
      "Le FinOps permet de rationaliser le portefeuille de produits."
    ]
  }
};
