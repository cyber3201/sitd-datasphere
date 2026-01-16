
import { LessonContent } from './courseTypes';

export const DM_CONTENT: Record<string, LessonContent> = {
  'data-management-foundations': {
    slug: 'data-management-foundations',
    objectives: ["Comprendre le cycle de vie de la donnée", "Identifier la valeur stratégique des données", "Définir le rôle du Data Management"],
    why: {
      title: "Gestion des Données : Les Fondations",
      content: "Le Data Management est la discipline maîtresse qui orchestre l'ensemble du cycle de vie des données. Elle consiste à développer et exécuter les politiques, pratiques et procédures qui gèrent la valeur des actifs de données. Dans l'économie moderne, la donnée est souvent comparée au pétrole : brute, elle a peu de valeur, mais raffinée et gérée, elle devient le moteur de l'entreprise.\n\nCependant, contrairement aux ressources physiques, la donnée ne s'use pas quand on l'utilise ; au contraire, elle gagne en valeur lorsqu'elle est partagée et croisée. Mais elle se dégrade aussi rapidement si elle n'est pas entretenue. Une gestion défaillante entraîne non seulement des inefficacités opérationnelles, mais expose aussi l'organisation à des risques critiques : fuites de données, amendes réglementaires, et décisions basées sur des chiffres faux."
    },
    concept: {
      title: "Principes Clés et Cycle de Vie",
      content: `Pour structurer cette gestion, il faut comprendre que la donnée traverse plusieurs états, définissant le **Cycle de Vie de la Donnée** : Création, Stockage, Usage, Archivage, et Destruction. Le Data Management coordonne les fonctions de Gouvernance, Qualité, Architecture et Sécurité autour de ce cycle. Ignorer une étape crée une dette technique massive.

Sur le terrain, la difficulté majeure réside dans la fragmentation des systèmes (Silos). Le Data Management moderne tente de briser ces silos non pas en centralisant tout physiquement (ce qui crée des goulots d'étranglement), mais en standardisant l'interopérabilité. Cela implique souvent de passer d'une approche purement technique ("Est-ce que la base tourne ?") à une approche orientée service ("Est-ce que la donnée est utilisable par le marketing ?"). L'automatisation des tâches répétitives (comme l'ingestion ou le tagging) est essentielle pour permettre aux équipes de se concentrer sur l'analyse à valeur ajoutée plutôt que sur la plomberie.`,
      syntax: ""
    },
    example: {
      title: "Scénario : L'oubli coûteux",
      description: "Une grande entreprise de retail conserve l'historique complet de ses clients depuis 20 ans sans politique de gestion.",
      sql: "",
      result: "Problème : Suite à une cyberattaque, les données de millions d'anciens clients (inactifs depuis 10 ans) sont volées. \nConséquence : L'entreprise paie une amende record (RGPD) pour non-respect du principe de conservation limitée. Une bonne gestion du cycle de vie aurait imposé une purge automatique après 5 ans d'inactivité."
    },
    exercises: [],
    quiz: [
      {
        question: "Quel est l'objectif principal du Data Management ?",
        options: ["Stocker le maximum de données", "Gérer la donnée comme un actif stratégique", "Réparer les ordinateurs", "Empêcher l'accès aux données"],
        answerIndex: 1,
        explanation: "C'est la gestion du cycle de vie complet pour valoriser l'actif."
      },
      {
        question: "Que signifie 'Garbage In, Garbage Out' ?",
        options: ["Il faut vider la corbeille", "Des données de mauvaise qualité en entrée produisent des résultats inutilisables", "L'IA nettoie tout", "Les données sont récupérables"],
        answerIndex: 1,
        explanation: "La qualité des résultats dépend strictement de la qualité des données sources."
      },
      {
        question: "Quelle étape ne fait PAS partie du cycle de vie standard ?",
        options: ["Création", "Archivage", "Improvisation", "Purge"],
        answerIndex: 2,
        explanation: "Le cycle de vie est un processus formel et planifié."
      }
    ],
    summary: [
      "La donnée est un actif qui doit être géré proactivement.",
      "Le cycle de vie couvre la donnée de sa création à sa destruction.",
      "Sans fondations solides, les projets Data avancés échouent."
    ]
  },

  'metadata-management': {
    slug: 'metadata-management',
    objectives: ["Définir les métadonnées", "Différencier Technique, Business et Opérationnel", "Comprendre l'utilité du Data Catalog"],
    why: {
      title: "Le contexte est roi",
      content: "Les métadonnées sont littéralement les 'données sur les données'. Sans elles, une base de données n'est qu'un cimetière de chiffres incompréhensibles. Le Metadata Management consiste à collecter, organiser et maintenir ce contexte pour permettre aux utilisateurs de trouver, comprendre et faire confiance aux informations qu'ils utilisent."
    },
    concept: {
      title: "Les Trois Types de Métadonnées",
      content: `Pour gérer efficacement le patrimoine, il faut distinguer :
1. **Techniques** : Structure physique, types de colonnes, index.
2. **Business** : Définitions métier, glossaire, propriétaires.
3. **Opérationnelles** : Date de mise à jour, lignage, logs d'erreurs.

L'automatisation est la clé du succès d'un catalogue de données. Il est illusoire de penser que les ingénieurs documenteront manuellement chaque colonne. Les outils modernes de 'Metadata Harvesting' scannent automatiquement les bases de données et les outils de BI pour extraire le schéma et le lignage (lineage). Le rôle humain se concentre alors sur l'enrichissement sémantique (décrire le 'pourquoi' et le 'comment' métier) plutôt que sur la saisie de dictionnaires techniques. Une métadonnée active peut même déclencher des alertes si un changement de schéma risque de casser un tableau de bord en aval.`,
      syntax: ""
    },
    example: {
      title: "Le KPI mystère",
      description: "Un Data Analyst doit calculer le 'Chiffre d'Affaires' pour un rapport urgent.",
      sql: "",
      result: "Sans métadonnées, il trouve 3 colonnes : 'CA_Brut', 'CA_Net' et 'Revenue_Total'. Il doit deviner laquelle utiliser. \nAvec un Data Catalog : Il cherche 'Chiffre d'Affaires', trouve la définition validée par la Finance pointant vers 'CA_Net', avec la mention 'Mise à jour ce matin'."
    },
    exercises: [],
    quiz: [
      {
        question: "Que sont les métadonnées ?",
        options: ["Des données cryptées", "Le contexte des données", "Des données obsolètes", "Des sauvegardes"],
        answerIndex: 1,
        explanation: "Elles fournissent le qui, quoi, quand, où et comment de la donnée."
      },
      {
        question: "Quel type décrit la définition métier d'un indicateur ?",
        options: ["Technique", "Opérationnelle", "Business", "Physique"],
        answerIndex: 2,
        explanation: "C'est le glossaire métier qui définit le sens."
      },
      {
        question: "À quoi sert principalement un Data Catalog ?",
        options: ["Stocker les sauvegardes", "Aider à trouver et comprendre les données", "Générer des factures", "Crypter les mots de passe"],
        answerIndex: 1,
        explanation: "C'est le moteur de recherche de l'entreprise."
      }
    ],
    summary: [
      "Les métadonnées transforment la donnée brute en information.",
      "Le catalogue de données est l'outil central de découverte.",
      "L'automatisation de la collecte est indispensable."
    ]
  },

  'data-quality-management': {
    slug: 'data-quality-management',
    objectives: ["Les dimensions de la qualité", "Impact de la non-qualité", "Processus d'amélioration continue"],
    why: {
      title: "La Qualité comme prérequis",
      content: "La gestion de la qualité des données (Data Quality) n'est pas une tâche ponctuelle de nettoyage, mais un processus continu. Des données de mauvaise qualité entraînent des coûts opérationnels directs, des erreurs décisionnelles et une perte de crédibilité des équipes Data. L'objectif est de garantir que les données sont aptes à l'usage prévu ('Fit for Purpose')."
    },
    concept: {
      title: "Les Dimensions de la Qualité",
      content: `On mesure la qualité selon : Complétude, Exactitude, Cohérence, Unicité, Validité et Actualité. La mise en place de 'Pare-feux Qualité' permet de bloquer les données invalides avant qu'elles ne polluent les systèmes d'analyse.

Une approche moderne de la qualité repose sur le concept de 'Data Observability'. Plutôt que d'écrire des milliers de règles manuelles ("cette colonne ne doit pas être nulle"), on utilise des outils qui apprennent les schémas historiques des données. Si le volume de commandes chute de 50% un mardi normal ou si le taux de valeurs nulles explose, le système alerte l'équipe Data avant que les utilisateurs métier ne s'en aperçoivent. Cela permet de passer d'un mode réactif (les utilisateurs se plaignent) à un mode proactif (l'incident est géré avant impact).`,
      syntax: ""
    },
    example: {
      title: "Campagne Marketing ratée",
      description: "Une équipe marketing lance une campagne d'emailing basée sur une base CRM non nettoyée.",
      sql: "",
      result: "Problème : 20% des emails reviennent en erreur et 10% des clients reçoivent le message en double. \nSolution : Règles de validation automatique à la saisie et processus de dédoublonnage réguliers."
    },
    exercises: [],
    quiz: [
      {
        question: "Quelle dimension vérifie qu'un champ obligatoire n'est pas vide ?",
        options: ["Exactitude", "Complétude", "Cohérence", "Unicité"],
        answerIndex: 1,
        explanation: "La complétude mesure le taux de remplissage."
      },
      {
        question: "La qualité des données est-elle une tâche ponctuelle ?",
        options: ["Oui, une fois par an", "Non, c'est un processus continu", "Oui, à la migration", "Non, c'est impossible"],
        answerIndex: 1,
        explanation: "Les données se dégradent naturellement, il faut surveiller constamment."
      },
      {
        question: "Que signifie 'Fit for Purpose' ?",
        options: ["Donnée parfaite", "Suffisante pour l'usage prévu", "Stockée dans le Cloud", "Validée par le PDG"],
        answerIndex: 1,
        explanation: "La qualité est relative à l'usage (ex: précision au mètre pour un livreur)."
      }
    ],
    summary: [
      "Mesurez la qualité selon des dimensions précises.",
      "La non-qualité a un coût business direct.",
      "Passez du réactif au proactif avec l'observabilité."
    ]
  },

  'master-data-management-reference-data': {
    slug: 'master-data-management-reference-data',
    objectives: ["Comprendre le Golden Record", "Distinguer Master Data et Reference Data", "Enjeux de la consolidation"],
    why: {
      title: "La Vérité Unique",
      content: "Dans une entreprise, les données clés (Clients, Produits) sont souvent fragmentées entre plusieurs logiciels (ERP, CRM, Site Web). Le Master Data Management (MDM) vise à créer une référence unique et fiable, le 'Golden Record'. Les Données de Référence, quant à elles, standardisent les valeurs utilisées pour classifier ces données."
    },
    concept: {
      title: "MDM vs Reference Data",
      content: `**Master Data** : Entités cœur du business (Clients, Produits). Le MDM utilise des règles de fusion pour réconcilier les doublons. **Reference Data** : Listes de valeurs autorisées (Codes Pays, Devises).

La mise en œuvre technique d'un MDM repose sur des règles de survivance (Survivorship Rules). Lorsque deux systèmes ont des informations contradictoires pour un même client (ex: CRM dit qu'il habite à Paris, ERP dit Lyon), le système doit décider automatiquement qui a raison. La règle peut être basée sur la récence ("la dernière modification gagne") ou sur la confiance dans la source ("l'adresse de l'ERP est toujours prioritaire pour la facturation"). Sans ces règles explicites, le Golden Record devient un mélange incohérent.`,
      syntax: ""
    },
    example: {
      title: "Le Client Multi-visage",
      description: "Un client appelle le service après-vente.",
      sql: "",
      result: "Sans MDM : Le support voit son adresse de livraison, mais pas ses factures (Compta) ni ses tickets précédents (Support). \nAvec MDM : Vue 360° unifiée consolidant tous les IDs. L'agent a une vision complète."
    },
    exercises: [],
    quiz: [
      {
        question: "Qu'est-ce qu'un 'Golden Record' ?",
        options: ["Un disque de musique", "La version consolidée et unique d'une entité", "La sauvegarde récente", "Un gros client"],
        answerIndex: 1,
        explanation: "C'est l'enregistrement maître issu de la consolidation."
      },
      {
        question: "Lequel est une Donnée de Référence ?",
        options: ["Jean Dupont", "Commande #123", "Code Pays (ISO 3166)", "Email"],
        answerIndex: 2,
        explanation: "Une liste de valeurs standardisée pour la classification."
      },
      {
        question: "Quel est le risque principal sans MDM ?",
        options: ["Perte de mot de passe", "Fragmentation et incohérence", "Base trop rapide", "Trop de sauvegardes"],
        answerIndex: 1,
        explanation: "Les silos empêchent une vue cohérente de l'activité."
      }
    ],
    summary: [
      "Le MDM unifie les entités critiques.",
      "Les Données de Référence sont le vocabulaire commun.",
      "Les règles de survivance déterminent la vérité."
    ]
  },

  'data-security-privacy-access-management': {
    slug: 'data-security-privacy-access-management',
    objectives: ["Principes CIA", "Gestion des accès (RBAC)", "Privacy by Design"],
    why: {
      title: "Protéger l'actif et les personnes",
      content: "La sécurité des données consiste à protéger l'information contre les accès non autorisés, la corruption ou le vol. Au-delà de la sécurité technique, la confidentialité (Privacy) concerne le droit des individus à contrôler leurs données personnelles. C'est un domaine régi par des lois strictes (RGPD, CCPA) et essentiel pour maintenir la confiance."
    },
    concept: {
      title: "Sécurité et Accès",
      content: `La sécurité repose sur la triade **CIA** : Confidentialité, Intégrité, Disponibilité. La gestion des accès utilise souvent le principe du **Moindre Privilège** via le RBAC (Role-Based Access Control).

Une technique avancée de plus en plus utilisée est le **Row-Level Security (RLS)**. Au lieu de donner accès à toute une table "Ventes", on applique des filtres dynamiques au niveau du moteur de base de données : un commercial ne verra que les lignes correspondant à sa région, même s'il exécute \`SELECT * FROM sales\`. Couplé à l'audit des logs d'accès (qui a consulté quoi et quand ?), cela permet une sécurité granulaire indispensable pour les données sensibles, sans multiplier les vues ou les copies de données.`,
      syntax: ""
    },
    example: {
      title: "Fuite de données RH",
      description: "Un fichier Excel avec les salaires est sur un dossier partagé ouvert.",
      sql: "",
      result: "Problème : Violation de confidentialité. \nSolution : Base sécurisée avec accès restreint (RBAC) aux RH uniquement. Chiffrement pour rendre le fichier illisible sans clé en cas de vol."
    },
    exercises: [],
    quiz: [
      {
        question: "Que signifie le principe du 'Moindre Privilège' ?",
        options: ["Accès total", "Droits strictement nécessaires au travail", "Aucun accès", "Droits admin pour tous"],
        answerIndex: 1,
        explanation: "Minimiser la surface d'attaque et les risques d'erreur."
      },
      {
        question: "Quelle réglementation protège les données personnelles en Europe ?",
        options: ["HIPAA", "RGPD (GDPR)", "ISO 27001", "PCI-DSS"],
        answerIndex: 1,
        explanation: "Le Règlement Général sur la Protection des Données."
      },
      {
        question: "Que signifie RBAC ?",
        options: ["Role-Based Access Control", "Really Big Access Control", "Remote Base Access", "Random Access"],
        answerIndex: 0,
        explanation: "Contrôle d'accès basé sur les rôles métier."
      }
    ],
    summary: [
      "La sécurité garantit Confidentialité, Intégrité, Disponibilité.",
      "Restreindre l'accès au nécessaire (Moindre Privilège).",
      "Le RLS permet une sécurité fine à la ligne."
    ]
  }
};
