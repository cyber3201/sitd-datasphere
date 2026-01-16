
import { LessonContent } from './courseTypes';

export const DG_CONTENT: Record<string, LessonContent> = {
  'gov-vs-mgmt': {
    slug: 'gov-vs-mgmt',
    objectives: ["Distinguer gouvernance et management", "Comprendre les rôles stratégiques vs opérationnels", "Identifier les risques d'une mauvaise distinction"],
    why: { 
      title: "Clarifier les rôles", 
      content: "On confond souvent faire (Management) et décider (Gouvernance). Sans cette distinction, les opérationnels sont paralysés par le manque de direction ou, à l'inverse, le management micro-gère sans vision. La gouvernance n'est pas là pour ralentir l'exécution, mais pour s'assurer que l'échelle est posée contre le bon mur avant que l'équipe ne commence à grimper." 
    },
    concept: { 
      title: "La distinction clé", 
      content: `La Gouvernance définit les règles ("Le QUOI" et "Le QUI décide"). Le Management exécute les règles ("Le COMMENT").
*   **Gouvernance** : Stratégie, Politiques, Standards, Audit. Elle s'assure que les données sont gérées correctement.
*   **Management** : Architecture, Nettoyage, Intégration. Il gère les données au quotidien.

Le piège classique est de créer une "Tour d'Ivoire" où la gouvernance écrit des politiques irréalistes que le management ignore. Pour éviter cela, il faut opérationnaliser la gouvernance : les règles doivent être intégrées dans les outils (ex: validation automatique de schémas) plutôt que dans des documents PDF oubliés. Une bonne gouvernance est invisible : elle facilite le bon comportement par défaut ("Nudge") et rend le mauvais comportement difficile.`, 
      syntax: '' 
    },
    example: { 
      title: "Exemple Législatif", 
      description: "Comparaison avec un système politique.", 
      sql: "", 
      result: "Gouvernance = Législateur (Vote les lois sur la limitation de vitesse).\nManagement = Police/Voirie (Installe les panneaux et contrôle les radars)." 
    },
    exercises: [], 
    quiz: [
      {
        question: "La Gouvernance est responsable de...",
        options: ["L'exécution quotidienne", "La définition des règles et politiques", "L'achat des serveurs", "L'écriture du code SQL"],
        answerIndex: 1,
        explanation: "Elle fixe le cap et les règles du jeu."
      },
      {
        question: "Le Data Management est responsable de...",
        options: ["La stratégie long terme", "La mise en œuvre technique et l'exécution", "La définition des standards éthiques", "L'audit financier"],
        answerIndex: 1,
        explanation: "C'est l'art de faire fonctionner les choses concrètement."
      },
      {
        question: "Une politique de gouvernance efficace doit être...",
        options: ["Un PDF de 100 pages", "Intégrée dans les processus et outils", "Ignorée par les équipes", "Réservée aux chefs"],
        answerIndex: 1,
        explanation: "Les règles doivent être applicables et vérifiables."
      }
    ],
    summary: ["La gouvernance décide, le management exécute.", "Les deux doivent collaborer étroitement.", "L'opérationnalisation est la clé de l'adoption."]
  },

  'data-owner': {
    slug: 'data-owner',
    objectives: ["Définir le rôle de Data Owner", "Responsabilité vs Exécution", "Interaction avec l'IT"],
    why: {
      title: "Il faut un capitaine",
      content: "Quand tout le monde est responsable, personne ne l'est. Le Data Owner est la personne du MÉTIER (pas de l'IT) qui possède l'autorité et la responsabilité ultime sur un domaine de données. Sans Owner identifié, les problèmes de qualité pourrissent car l'IT n'a pas la légitimité pour trancher sur les définitions métier."
    },
    concept: {
      title: "Responsabilité et Pouvoir",
      content: `Le Data Owner n'est pas celui qui saisit la donnée ou qui gère la base de données. C'est un rôle stratégique, souvent un directeur ou un manager senior. Ses responsabilités incluent : définir la définition business des données, autoriser les accès (qui a le droit de voir ?), et fixer les exigences de qualité.

La difficulté majeure est souvent l'acceptation de ce rôle par le métier ("Je n'ai pas le temps, c'est un problème IT"). Il est crucial d'expliquer que la donnée est un actif de leur département, au même titre que leur budget ou leur équipe. L'IT agit comme un 'Custodian' (gardien technique), mais ne peut pas décider si un prospect est 'Actif' ou 'Fermé'. Seul le Directeur Commercial (Owner) le peut.`,
      syntax: ""
    },
    example: {
      title: "Conflit de définition",
      description: "Le Marketing et la Finance ne sont pas d'accord sur le calcul de la 'Marge'.",
      sql: "",
      result: "L'IT ne peut pas choisir. Le Data Owner 'Ventes' doit trancher et valider la définition officielle qui sera implémentée dans le Data Warehouse."
    },
    exercises: [],
    quiz: [
      {
        question: "Le Data Owner doit-il savoir coder en SQL ?",
        options: ["Oui, c'est obligatoire", "Non, c'est un rôle business stratégique", "Seulement s'il est sympa", "Oui pour réparer la base"],
        answerIndex: 1,
        explanation: "Il décide du 'Quoi' et du 'Pourquoi', pas du 'Comment technique'."
      },
      {
        question: "Qui est le mieux placé pour être Data Owner des données Clients ?",
        options: ["Le DSI (CIO)", "Le Directeur Commercial ou Marketing", "Le stagiaire IT", "Le fournisseur du logiciel"],
        answerIndex: 1,
        explanation: "Celui qui utilise et comprend la valeur métier de cette donnée."
      },
      {
        question: "Quelle est une responsabilité clé du Data Owner ?",
        options: ["Faire les backups", "Valider les demandes d'accès", "Installer les mises à jour", "Câbler le réseau"],
        answerIndex: 1,
        explanation: "Il est le garant de la sécurité et de la confidentialité de son domaine."
      }
    ],
    summary: ["Le Data Owner est un rôle métier, pas technique.", "Il est responsable de la qualité et des accès.", "L'IT est le gardien (Custodian), pas le propriétaire."]
  },

  'data-steward': {
    slug: 'data-steward',
    objectives: ["Rôle opérationnel du Steward", "Relation avec le Owner", "Activités quotidiennes"],
    why: {
      title: "Le bras droit opérationnel",
      content: "Si le Data Owner est le législateur qui signe les décrets, le Data Steward est l'agent de terrain qui s'assure qu'ils sont appliqués. C'est un rôle d'expert fonctionnel qui connaît la donnée dans ses moindres détails (sémantique, règles de gestion, cas particuliers)."
    },
    concept: {
      title: "L'intendant de la donnée",
      content: `Le Data Stewardship est l'opérationnalisation de la gouvernance. Le Steward documente les métadonnées dans le catalogue, résout les incidents de qualité au quotidien, et assiste les utilisateurs dans leurs demandes. Il fait le pont entre la vision stratégique du Owner et la réalité technique de l'IT.

Au quotidien, le Steward passe beaucoup de temps à 'jardiner' les données : vérifier les doublons, compléter les descriptions manquantes, et former les nouveaux arrivants aux bonnes pratiques de saisie. C'est un rôle souvent ingrat mais essentiel. Pour qu'il soit durable, il faut l'outiller (Catalogues, Dashboards de qualité) et lui donner un mandat clair, sinon il s'épuise à lutter contre l'entropie sans soutien hiérarchique.`,
      syntax: ""
    },
    example: {
      title: "Nettoyage de printemps",
      description: "Le catalogue de données contient 500 tables non documentées.",
      sql: "",
      result: "Le Data Steward ne documente pas tout lui-même. Il identifie les experts (SME), organise des ateliers pour capturer la connaissance, et valide que les définitions saisies sont conformes aux standards de l'entreprise."
    },
    exercises: [],
    quiz: [
      {
        question: "Quelle est la différence entre Owner et Steward ?",
        options: ["Aucune", "Le Owner décide (Stratégie), le Steward exécute (Opérationnel)", "Le Steward est le chef du Owner", "Le Owner est à l'IT"],
        answerIndex: 1,
        explanation: "Relation Décideur / Expert."
      },
      {
        question: "Que fait un Data Steward au quotidien ?",
        options: ["Il répare les imprimantes", "Il documente, qualifie et aide les utilisateurs", "Il décide du budget IT", "Il vend les données"],
        answerIndex: 1,
        explanation: "C'est le référent connaissance et qualité."
      },
      {
        question: "Le Steward est-il nécessairement une personne dédiée à temps plein ?",
        options: ["Oui obligatoirement", "Non, ce peut être une casquette partielle d'un expert métier", "C'est un robot", "C'est un consultant externe"],
        answerIndex: 1,
        explanation: "Souvent, des 'Business Analysts' jouent le rôle de Steward pour leur domaine."
      }
    ],
    summary: ["Le Steward opérationnalise la stratégie du Owner.", "Il maintient le catalogue et la qualité.", "C'est le point de contact privilégié pour les questions sur la donnée."]
  },

  'policy-framework': {
    slug: 'policy-framework',
    objectives: ["Hiérarchie documentaire", "Politiques vs Standards", "Cycle de vie d'une politique"],
    why: {
      title: "Écrire les règles du jeu",
      content: "Une gouvernance sans documents de référence est une tradition orale, fragile et incohérente. Le cadre de politiques (Policy Framework) structure les règles que l'organisation doit suivre pour rester conforme, sécurisée et efficace."
    },
    concept: {
      title: "Politiques, Standards et Procédures",
      content: `Il existe une hiérarchie claire :
1.  **Politique (Policy)** : "Le QUOI". Règle de haut niveau, non négociable. Ex: "Toute donnée personnelle doit être chiffrée."
2.  **Standard** : "Le COMMENT technique". Spécification précise. Ex: "Le chiffrement doit utiliser AES-256."
3.  **Procédure** : "Les ÉTAPES". Guide pas à pas. Ex: "Comment activer le chiffrement sur une base SQL."

Le défi est de maintenir ces documents vivants. Une politique écrite il y a 5 ans et stockée sur un SharePoint que personne ne lit est inutile ("Shelfware"). Les politiques modernes adoptent l'approche "Policy as Code" : les règles sont vérifiées automatiquement par des scripts dans les pipelines CI/CD. Si un développeur essaie de pousser une table contenant des emails sans chiffrement, le déploiement échoue automatiquement.`,
      syntax: ""
    },
    example: {
      title: "Politique de Rétention",
      description: "L'entreprise doit supprimer les données clients 3 ans après la fin du contrat.",
      sql: "",
      result: "Politique : 'Purge à 3 ans'. \nStandard : 'Script SQL DELETE mensuel'. \nProcédure : 'Le Steward valide la liste avant suppression'."
    },
    exercises: [],
    quiz: [
      {
        question: "Quel document est le plus haut niveau et non négociable ?",
        options: ["Procédure", "Standard", "Politique", "Guide"],
        answerIndex: 2,
        explanation: "La politique fixe l'intention et l'obligation."
      },
      {
        question: "Qu'est-ce que le 'Policy as Code' ?",
        options: ["Imprimer les politiques", "Automatiser la vérification des règles via du code", "Apprendre le droit aux développeurs", "Coder sans règles"],
        answerIndex: 1,
        explanation: "Rendre la conformité automatique et bloquante si nécessaire."
      },
      {
        question: "Pourquoi distinguer Standard et Politique ?",
        options: ["Pour faire plus de papier", "Car la technologie (Standard) change plus vite que les principes (Politique)", "C'est pareil", "Pour embêter l'IT"],
        answerIndex: 1,
        explanation: "Cela évite de réécrire la politique chaque fois qu'on change de version de logiciel."
      }
    ],
    summary: ["Hiérarchisez vos règles (Politique > Standard > Procédure).", "Évitez le 'Shelfware' (documents morts).", "Automatisez le contrôle via le Code."]
  },

  'classification': {
    slug: 'classification',
    objectives: ["Niveaux de confidentialité", "Impact sur la sécurité", "Tagging automatique"],
    why: {
      title: "Toutes les données ne se valent pas",
      content: "Traiter une liste de menus de cantine avec la même rigueur que des dossiers médicaux est un gaspillage de ressources. À l'inverse, laisser des secrets industriels en accès libre est suicidaire. La classification permet d'appliquer le juste niveau de sécurité à chaque donnée."
    },
    concept: {
      title: "Niveaux de classification",
      content: `On utilise généralement 3 à 4 niveaux :
1.  **Public** : Aucune conséquence si divulgué (Marketing, Site Web).
2.  **Interne** : Usage employé uniquement (Organigramme, Wikis).
3.  **Confidentiel** : Impact financier/légal si fuite (Salaires, Contrats).
4.  **Secret / Restreint** : Impact vital pour l'entreprise (Secrets R&D, Clés privées).

La classification manuelle échoue souvent par manque de discipline. L'approche moderne repose sur le **DLP (Data Loss Prevention)** et le scan automatique. Des algorithmes parcourent les bases, détectent les motifs sensibles (Regex pour Carte Bancaire, NIR) et suggèrent ou appliquent automatiquement le tag de classification. Cela garantit que même si un humain oublie de marquer une colonne 'Sensible', le système de sécurité la protégera par défaut.`,
      syntax: ""
    },
    example: {
      title: "Emailing de masse",
      description: "Un stagiaire veut envoyer une newsletter et télécharge la base client.",
      sql: "",
      result: "Le système détecte que la colonne 'Email' est classée 'Confidentiel - PII'. Il bloque le téléchargement sur clé USB ou applique un masquage partiel (j***@domain.com) selon les droits du stagiaire."
    },
    exercises: [],
    quiz: [
      {
        question: "Pourquoi classifier les données ?",
        options: ["Pour faire du rangement", "Pour adapter les mesures de sécurité à la sensibilité", "Pour augmenter le stockage", "Pour colorier les tableaux"],
        answerIndex: 1,
        explanation: "On ne protège pas tout de la même manière (coût/efficacité)."
      },
      {
        question: "Quel niveau correspond à des données publiques ?",
        options: ["Niveau 1 (Public)", "Niveau 4 (Secret)", "Niveau 0 (Nul)", "Niveau Rouge"],
        answerIndex: 0,
        explanation: "Données accessibles à tous sans risque."
      },
      {
        question: "Comment gérer la classification à l'échelle ?",
        options: ["Demander à chaque employé", "Utiliser des outils de scan automatique", "Ne rien faire", "Embaucher 100 stewards"],
        answerIndex: 1,
        explanation: "L'automatisation est la seule voie viable pour des pétaoctets de données."
      }
    ],
    summary: ["Définissez une échelle de sensibilité simple (3-4 niveaux).", "La classification dicte les règles de sécurité.", "Automatisez la détection des données sensibles."]
  }
};
