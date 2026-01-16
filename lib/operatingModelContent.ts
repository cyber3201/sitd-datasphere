
import { LessonContent } from './courseTypes';

export const OM_CONTENT: Record<string, LessonContent> = {
  'teams-structure': {
    slug: 'teams-structure',
    objectives: ["Modèles d'organisation", "Data Mesh vs Centralisé", "Équipe Plateforme"],
    why: {
      title: "L'architecture humaine",
      content: "La loi de Conway stipule que les systèmes techniques finissent par refléter la structure de communication de l'organisation. Si vous voulez une architecture distribuée (comme le Data Mesh), vous ne pouvez pas garder une équipe monolithique. Il faut repenser la topologie des équipes."
    },
    concept: {
      title: "Les 3 types d'équipes (Team Topologies)",
      content: `Il existe 3 types principaux : **Équipes Domaine** (alignées sur le métier, autonomes), **Équipe Plateforme** (fournit l'infra en self-service), et **Équipe Habilitante** (CoE, experts qui forment).

Un facteur critique souvent ignoré est la **charge cognitive**. Une équipe Domaine ne peut pas être experte en tout (Kubernetes, Kafka, Spark, Métier, UX). Si on leur demande de tout gérer, ils saturent et la qualité baisse. Le rôle de l'équipe Plateforme est de masquer cette complexité en fournissant des abstractions simples ("Click-to-deploy pipeline"). L'objectif est de maximiser le temps passé sur la logique métier (le "Flow") et de minimiser le temps passé sur la plomberie.`,
      syntax: ""
    },
    example: {
      title: "Transition vers le Mesh",
      description: "Une entreprise passe d'une équipe Data centrale de 50 personnes à un modèle fédéré.",
      sql: "",
      result: "L'équipe centrale est divisée. 30 ingénieurs rejoignent directement les départements Marketing, Finance et Ops. 15 ingénieurs forment l'équipe Plateforme pour gérer Snowflake/Airflow. 5 experts forment le Centre d'Excellence pour la gouvernance."
    },
    exercises: [],
    quiz: [],
    summary: [
      "Déplacez la compétence data au plus près du métier.",
      "L'équipe Plateforme doit construire un produit interne pour réduire la complexité.",
      "Attention à la charge cognitive des équipes distribuées."
    ]
  },
  'roles-responsibilities': {
    slug: 'roles-responsibilities',
    objectives: ["Data Product Owner", "Data Engineer vs Analyst", "Data Steward"],
    why: {
      title: "Clarifier qui fait quoi",
      content: "Dans les organisations modernes, les rôles deviennent flous. Le Data Scientist fait du SQL, l'Ingénieur fait du Dashboarding. Cette confusion crée de la frustration et de la dette technique. Définir des fiches de poste claires basées sur les responsabilités (et non les outils) est crucial."
    },
    concept: {
      title: "Les Rôles Clés",
      content: `Les rôles essentiels sont : **Data Product Owner** (Vision & Valeur), **Data Engineer** (Plateforme & Pipeline), **Analytics Engineer** (Modélisation), et **Data Steward** (Qualité & Métier).

L'émergence du rôle d'**Analytics Engineer** (popularisé par dbt) est un changement majeur. Il comble le fossé historique entre l'ingénieur (qui sait coder mais ne connaît pas le métier) et l'analyste (qui connaît le métier mais code mal). Ce profil "T-shaped" applique les bonnes pratiques logicielles (git, tests, DRY) à la modélisation SQL pure. Cela permet de libérer les Data Engineers pour qu'ils se concentrent sur l'infrastructure hard-core, tout en professionnalisant la couche sémantique.`,
      syntax: ""
    },
    example: {
      title: "Une équipe idéale (Squad)",
      description: "Composition d'une équipe Data Domaine.",
      sql: "",
      result: "1 Data Product Owner (Vision) + 2 Data Engineers (Pipeline/Infra) + 1 Analytics Engineer (Modélisation) + 1 Data Steward (Qualité/Métier). Ensemble, ils sont autonomes pour livrer de bout en bout."
    },
    exercises: [],
    quiz: [],
    summary: [
      "Le DPO est le garant de la valeur.",
      "L'Analytics Engineer apporte la rigueur logicielle au SQL.",
      "Des rôles clairs évitent les conflits de territoire."
    ]
  },
  'decision-rights': {
    slug: 'decision-rights',
    objectives: ["Prise de décision décentralisée", "Escalade", "Standards globaux vs locaux"],
    why: {
      title: "Qui décide ?",
      content: "La paralysie décisionnelle tue la vélocité. Si chaque changement de schéma nécessite la signature du Chief Data Officer, rien n'avance. Il faut définir explicitement qui a le droit de décider quoi, et comment gérer les conflits."
    },
    concept: {
      title: "Matrice de décision",
      content: `Distinguez **Décisions Locales** (Autonomie du domaine) et **Globales** (Cohérence entreprise). Utilisez l'escalade pour les conflits.

Pour formaliser cela, le framework **RAPID** (Recommend, Agree, Perform, Input, Decide) est très efficace. Par exemple, pour un changement de standard API : L'équipe Plateforme *Recommande*, les Domaines donnent un *Input*, le Data Council doit être d'accord (*Agree*), et le CDO *Décide* formellement. Une fois la décision prise, le principe du "Disagree and Commit" s'applique : même si un domaine n'était pas d'accord, il s'engage à suivre le standard pour le bien commun de l'interopérabilité.`,
      syntax: ""
    },
    example: {
      title: "Conflit Marketing vs Finance",
      description: "Le Marketing veut changer la définition d'un 'Lead'.",
      sql: "",
      result: "C'est une donnée partagée. Ils ne peuvent pas décider seuls. Le Data Steward 'Client' (Global) organise un atelier. Si pas d'accord, le CDO tranche. Une fois décidé, le changement est appliqué partout."
    },
    exercises: [],
    quiz: [],
    summary: [
      "Maximisez l'autonomie locale pour la vitesse.",
      "Imposez des standards globaux pour l'interopérabilité.",
      "Utilisez un framework clair (RACI ou RAPID) pour les votes."
    ]
  },
  'funding-model': {
    slug: 'funding-model',
    objectives: ["Chargeback", "Showback", "Financement Produit"],
    why: {
      title: "Qui paie l'addition ?",
      content: "Le Cloud (Snowflake, BigQuery) coûte cher. Si tout est payé par l'IT central, les métiers consomment sans compter. Si on facture tout aux métiers, ils freinent l'innovation. Le modèle de financement (FinOps) doit inciter aux bons comportements."
    },
    concept: {
      title: "Modèles de Financement",
      content: `Les modèles classiques sont : Centralisé (Gratuit), **Showback** (Facture fictive pédagogique), et **Chargeback** (Refacturation réelle). Le financement "Produit" (budget annuel stable) est préférable au financement "Projet" (budget au coup par coup).

La difficulté technique du Chargeback réside dans l'attribution précise des coûts unitaires (Unit Economics). Il est facile de facturer un serveur dédié, mais comment facturer un cluster Kubernetes partagé ou une table Data Warehouse utilisée par 10 départements ? Il faut mettre en place un système de tagging rigoureux de toutes les ressources Cloud et définir des clés de répartition (ex: au prorata du temps de calcul ou du stockage). Sans cette transparence, le Chargeback est perçu comme une taxe injuste par le métier et crée des tensions politiques.`,
      syntax: ""
    },
    example: {
      title: "Mise en place du Showback",
      description: "Sensibiliser sans punir.",
      sql: "",
      result: "Chaque domaine reçoit un rapport mensuel de ses coûts Snowflake. Le domaine 'Marketing' réalise qu'il consomme 60% du budget global pour des requêtes mal optimisées. Le mois suivant, ils priorisent l'optimisation avec leurs ingénieurs."
    },
    exercises: [],
    quiz: [],
    summary: [
      "Commencez par le Showback pour éduquer.",
      "Le financement par produit favorise la maintenance long terme.",
      "La transparence des coûts (Tagging) est un prérequis technique."
    ]
  },
  'operating-cadence': {
    slug: 'operating-cadence',
    objectives: ["Rituels Agile", "QBR", "Gestion d'incidents"],
    why: {
      title: "Le rythme de l'équipe",
      content: "Une organisation ne tourne pas par magie. Elle nécessite des rituels synchronisés pour planifier, exécuter et corriger. La cadence opérationnelle relie la stratégie (long terme) à l'exécution (quotidien)."
    },
    concept: {
      title: "Les Rituels Clés",
      content: `Adoptez des rituels à différentes échelles : Hebdo (Sprint, Demo), Trimestriel (QBR, OKRs) et Événementiel (Incidents).

Un rituel sous-estimé est l'analyse **Pre-Mortem**. Avant de lancer un gros projet ou produit, l'équipe se réunit et imagine : "Nous sommes dans 6 mois, le projet a échoué catastrophiquement. Pourquoi ?". Cet exercice permet d'identifier les risques implicites (manque de sponsorship, dette technique, adoption) et de mettre en place des mitigations *avant* de commencer. C'est souvent plus efficace que le Post-Mortem qui arrive trop tard. De plus, les démos croisées entre domaines (ex: Marketing montre à Finance) sont vitales pour éviter la réinvention de la roue.`,
      syntax: ""
    },
    example: {
      title: "QBR Data",
      description: "Préparation du Q3.",
      sql: "",
      result: "Le CDO et les DPOs rencontrent le Comex. Bilan Q2 : 80% des OKRs atteints. Objectif Q3 : Focus sur la réduction du Churn. Les équipes domaine mettent à jour leur roadmap pour prioriser les données liées à la rétention client."
    },
    exercises: [],
    quiz: [],
    summary: [
      "Les rituels créent de la prévisibilité et de l'alignement.",
      "Faites des Pre-Mortems pour anticiper les échecs.",
      "Synchronisez la tech et le business via les QBRs."
    ]
  }
};
