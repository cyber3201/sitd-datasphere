
import { LessonContent } from './courseTypes';

export const DB_CONTENT: Record<string, LessonContent> = {
  // --- MODULE 1: MODÉLISATION ENTITÉ-ASSOCIATION ---
  
  'erd-intro': {
    slug: 'erd-intro',
    objectives: [
      "Comprendre le rôle d'un ERD (Entity Relationship Diagram).",
      "Différencier les modèles Conceptuel, Logique et Physique.",
      "Identifier les trois piliers : Entité, Relation, Attribut."
    ],
    why: {
      title: 'Le plan d\'architecte',
      content: "Avant de construire une maison, on dessine un plan. Pour une base de données, c'est pareil. L'ERD permet de visualiser les besoins métier et de valider la structure des données avec les parties prenantes avant d'écrire la moindre ligne de code SQL. C'est l'étape la plus critique pour éviter la dette technique."
    },
    concept: {
      title: 'Les 3 niveaux de modélisation',
      content: "La modélisation se fait en entonnoir :\n1. **Conceptuel (MCD)** : On définit le *QUOI*. 'Un Étudiant suit des Cours'. Pas de détails techniques.\n2. **Logique (MLD)** : On définit la *STRUCTURE*. Ajout des Clés Primaires (PK) et Étrangères (FK).\n3. **Physique (MPD)** : On définit le *COMMENT*. Types SQL spécifiques (VARCHAR, INT), index et contraintes liés au SGBD (PostgreSQL).",
      syntax: "-- Le résultat final (Physique) ressemble à ceci :\nCREATE TABLE students (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100)\n);"
    },
    example: {
      title: 'De la phrase au schéma',
      description: 'Analysons le besoin : "Une école a des élèves qui s\'inscrivent à des cours."',
      sql: "-- Entités identifiées : Student, Course\n-- Relation : Enrollment (Inscription)\n\n-- Schéma Logique simplifié :\nStudent (id, name)\nCourse (id, title)\nEnrollment (student_id, course_id)",
      result: "Nous avons transformé des noms (Élève, Cours) en Tables et des verbes (S'inscrire) en Relations."
    },
    exercises: [
      {
        question: "Exercice 1 : Dans un système E-commerce, quelles sont les 3 entités principales ?",
        solution: "Customer (Client), Product (Produit), Order (Commande).",
        explanation: "Ce sont les objets 'métier' tangibles qui interagissent."
      },
      {
        question: "Exercice 2 : 'Un auteur écrit un livre'. Est-ce que 'écrit' est une entité ou une relation ?",
        solution: "Une Relation.",
        explanation: "C'est le lien (le verbe) entre l'entité Auteur et l'entité Livre."
      }
    ],
    quiz: [
      {
        question: "Que signifie ERD ?",
        options: ["Entity Rapid Data", "Entity Relationship Diagram", "Efficient Relational Database", "External Relation Data"],
        answerIndex: 1,
        explanation: "Diagramme Entité-Relation."
      },
      {
        question: "A quelle étape choisit-on les types de données (ex: VARCHAR) ?",
        options: ["Conceptuel", "Logique", "Physique", "Jamais"],
        answerIndex: 2,
        explanation: "C'est une contrainte technique liée à l'implémentation physique."
      },
      {
        question: "Une Entité devient généralement une ___ en SQL.",
        options: ["Colonne", "Ligne", "Table", "Fonction"],
        answerIndex: 2,
        explanation: "L'entité 'User' devient la table 'users'."
      },
      {
        question: "Un Attribut devient une ___ en SQL.",
        options: ["Table", "Colonne", "Base", "Vue"],
        answerIndex: 1,
        explanation: "L'attribut 'email' devient la colonne 'email'."
      },
      {
        question: "Pourquoi modéliser avant de coder ?",
        options: ["Pour faire joli", "Pour valider le besoin métier et éviter les erreurs de structure", "Pour ralentir le projet", "C'est obligatoire par la loi"],
        answerIndex: 1,
        explanation: "Corriger un schéma en production coûte 100x plus cher qu'au design."
      }
    ],
    summary: [
      "L'ERD est le langage commun entre le métier et la technique.",
      "Commencez toujours par le conceptuel (les objets et leurs liens).",
      "Ne vous préoccupez pas des types SQL (INT, VARCHAR) au début."
    ]
  },

  'entities-attributes': {
    slug: 'entities-attributes',
    objectives: [
      "Distinguer Entité (Table) et Attribut (Colonne).",
      "Identifier les instances (Lignes).",
      "Choisir les bons attributs pour décrire une entité."
    ],
    why: {
      title: 'Décrire le réel',
      content: "Une entité sans attributs est une coquille vide. Pour qu'une base de données soit utile, nous devons capturer les détails pertinents. Mais attention : tout n'est pas une entité. Une adresse est-elle une entité ou un attribut ? La réponse détermine la flexibilité de votre modèle."
    },
    concept: {
      title: 'Anatomie d\'une Table',
      content: "- **Entité** : Un objet indépendant (ex: `User`). Devient la table.\n- **Attribut** : Une propriété de l'entité (ex: `email`, `birth_date`). Devient la colonne.\n- **Instance** : Une occurrence spécifique (ex: L'utilisateur 'Jean Dupont'). Devient la ligne.\n\n*Règle* : Si une information a elle-même des propriétés (ex: une Ville a un Nom et un Code Postal), c'est probablement une Entité, pas un attribut.",
      syntax: "Table: Users (Entité)\n---------------------\n| id | name  | email | <- Attributs\n| 1  | Jean  | j@b.c | <- Instance\n| 2  | Alice | a@b.c |"
    },
    example: {
      title: 'Modéliser un Produit',
      description: 'Quels attributs définissent un produit e-commerce ?',
      sql: "CREATE TABLE products (\n  sku VARCHAR(50),   -- Identifiant\n  name VARCHAR(200), -- Libellé\n  price DECIMAL,     -- Valeur\n  weight FLOAT       -- Caractéristique physique\n);",
      result: "Chaque attribut a un sens et un type spécifique."
    },
    exercises: [
      {
        question: "Exercice 1 : Dans la table 'Courses', proposez 3 attributs pertinents.",
        solution: "Title (Titre), Description, Level (Niveau), Duration (Durée).",
        explanation: "Ce sont les propriétés intrinsèques d'un cours."
      },
      {
        question: "Exercice 2 : Pourquoi ne pas stocker l'âge d'un utilisateur ?",
        solution: "L'âge change chaque année. Stockez la 'date_de_naissance' et calculez l'âge.",
        explanation: "C'est un attribut dérivé. On stocke la donnée brute immuable."
      }
    ],
    quiz: [
      {
        question: "Une ligne dans une table correspond à...",
        options: ["Un attribut", "Une entité", "Une instance", "Une relation"],
        answerIndex: 2,
        explanation: "C'est un enregistrement unique de l'entité."
      },
      {
        question: "Une colonne 'Adresse' contenant '10 rue de la Paix, 75000 Paris' est-elle une bonne pratique ?",
        options: ["Oui, c'est simple", "Non, c'est un attribut composite", "Oui pour gagner de la place", "Peu importe"],
        answerIndex: 1,
        explanation: "Il vaut mieux séparer rue, ville et code postal pour pouvoir filtrer/trier."
      },
      {
        question: "Un attribut multivalué (ex: téléphones) doit être...",
        options: ["Mis dans une seule colonne avec des virgules", "Mis dans une autre table", "Ignoré", "Mis en nom de colonne"],
        answerIndex: 1,
        explanation: "C'est une relation 1:N déguisée."
      },
      {
        question: "Quel attribut est obligatoire pour identifier une instance ?",
        options: ["Email", "Nom", "Clé Primaire (PK)", "Date"],
        answerIndex: 2,
        explanation: "L'identifiant unique technique."
      },
      {
        question: "Un attribut dérivé (calculable) doit-il être stocké ?",
        options: ["Toujours", "Jamais (sauf pour performance)", "C'est obligatoire", "Seulement les dates"],
        answerIndex: 1,
        explanation: "On évite la redondance. On calcule à la volée (SELECT price * qty)."
      }
    ],
    summary: [
      "Entité = Table, Attribut = Colonne, Instance = Ligne.",
      "Ne stockez pas ce qui peut être calculé (attributs dérivés).",
      "Décomposez les attributs composites (Adresse -> Rue, Ville, CP)."
    ]
  },

  'cardinalities': {
    slug: 'cardinalities',
    objectives: [
      "Comprendre les relations 1:1, 1:N et M:N.",
      "Savoir où placer la Clé Étrangère (FK).",
      "Utiliser une table de jointure pour le M:N."
    ],
    why: {
      title: 'Connecter les données',
      content: "La puissance des bases relationnelles réside dans les liens. 'Un client peut passer combien de commandes ?' La réponse (la cardinalité) dicte la structure technique. Se tromper ici, c'est garantir des doublons ou des données orphelines."
    },
    concept: {
      title: 'Les 3 types de relations',
      content: "**1:1 (One-to-One)** : Un User a un seul Profil. Rare (souvent fusionné).\n**1:N (One-to-Many)** : Un Client a N Commandes. C'est le standard. La FK va côté N.\n**M:N (Many-to-Many)** : Un Étudiant suit N Cours, un Cours a N Étudiants. Nécessite une **table de jointure**.",
      syntax: "-- 1:N (FK dans la table enfant)\nALTER TABLE orders ADD customer_id INT REFERENCES customers;\n\n-- M:N (Nouvelle table)\nCREATE TABLE enrollments (\n  user_id INT REFERENCES users,\n  course_id INT REFERENCES courses\n);"
    },
    example: {
      title: 'Système de Blog',
      description: 'Un auteur écrit plusieurs articles. Un article a plusieurs tags.',
      sql: "Author -> Article : 1:N (FK author_id dans Article)\nArticle <-> Tag : M:N (Table Article_Tags)",
      result: "Structure relationnelle standard."
    },
    exercises: [
      {
        question: "Exercice 1 : Où placer la clé étrangère pour 'Une Équipe a plusieurs Joueurs' ?",
        solution: "Dans la table Joueurs (colonne team_id).",
        explanation: "Le joueur appartient à l'équipe. L'équipe est le parent (1), le joueur est l'enfant (N)."
      },
      {
        question: "Exercice 2 : Comment modéliser 'Un Acteur joue dans plusieurs Films et un Film a plusieurs Acteurs' ?",
        solution: "Créer une table 'Casting' avec actor_id et movie_id.",
        explanation: "C'est du M:N classique."
      }
    ],
    quiz: [
      {
        question: "Dans une relation 1:N, la clé étrangère est...",
        options: ["Côté 1", "Côté N", "Dans une table séparée", "Nulle part"],
        answerIndex: 1,
        explanation: "L'enfant pointe vers son parent."
      },
      {
        question: "La relation M:N nécessite...",
        options: ["Une colonne tableau", "Une table de jointure", "Deux clés primaires", "Rien"],
        answerIndex: 1,
        explanation: "C'est le seul moyen normalisé de lier N à N."
      },
      {
        question: "Une relation 1:1 est souvent remplacée par...",
        options: ["Une fusion des deux tables", "Une relation 1:N", "Une table de jointure", "Un index"],
        answerIndex: 0,
        explanation: "Si 1 User = 1 Profil, autant mettre les champs Profil dans User."
      },
      {
        question: "Que signifie la cardinalité (0,N) ?",
        options: ["Minimum 0, Maximum N", "Minimum 1, Maximum N", "Aucune relation", "Erreur"],
        answerIndex: 0,
        explanation: "C'est une relation optionnelle à plusieurs."
      },
      {
        question: "Quelle table porte la FK dans 'Un Livre a un Éditeur' ?",
        options: ["Livre", "Éditeur", "Les deux", "Aucune"],
        answerIndex: 0,
        explanation: "Un éditeur a plusieurs livres (1:N), donc le livre pointe vers l'éditeur."
      }
    ],
    summary: [
      "1:N = Clé étrangère côté 'Many'.",
      "M:N = Table de jointure intermédiaire.",
      "La cardinalité définit la structure physique des tables."
    ]
  },

  // --- MODULE 2: NORMALIZATION ---
  
  '1nf': {
    slug: '1nf',
    objectives: [
      "Comprendre l'atomicité des données.",
      "Éliminer les groupes répétitifs.",
      "Définir une clé primaire valide."
    ],
    why: {
      title: 'Une place pour chaque chose',
      content: "La Première Forme Normale (1NF) est le niveau zéro de l'hygiène de données. Elle interdit de stocker des listes (ex: 'Java, SQL, Python') dans une seule case. Pourquoi ? Parce que c'est impossible à indexer, filtrer ou joindre efficacement."
    },
    concept: {
      title: 'Règles de la 1NF',
      content: "1. **Atomicité** : Une case = Une valeur.\n2. **Pas de groupes répétitifs** : Pas de colonnes `tel1`, `tel2`, `tel3`.\n3. **Clé Primaire** : Chaque ligne doit être unique et identifiable.",
      syntax: "-- Mauvais (Non 1NF)\nINSERT INTO users (skills) VALUES ('Java, SQL');\n\n-- Bon (1NF - via table liée)\nINSERT INTO skills (user_id, skill) VALUES (1, 'Java');\nINSERT INTO skills (user_id, skill) VALUES (1, 'SQL');"
    },
    example: {
      title: 'Carnet d\'adresses',
      description: 'Un contact peut avoir plusieurs emails.',
      sql: "-- Mauvais : Table Contacts avec colonne 'emails' (texte)\n-- Bon : Table Contacts (id, nom) + Table Emails (contact_id, address)",
      result: "On peut maintenant chercher 'Qui a l'email x ?' instantanément."
    },
    exercises: [
      {
        question: "Exercice 1 : La table `Order(id, items)` où items = 'Apple x2, Pear x5' est-elle en 1NF ?",
        solution: "Non.",
        explanation: "La colonne items contient une liste composite. Il faut une table `OrderLines`."
      },
      {
        question: "Exercice 2 : Comment corriger une table avec `Question`, `Reponse1`, `Reponse2`, `Reponse3` ?",
        solution: "Créer une table `Reponses` liée à la table `Questions`.",
        explanation: "Élimine le groupe répétitif et la limitation arbitraire à 3 réponses."
      }
    ],
    quiz: [
      {
        question: "Quelle est la condition principale de la 1NF ?",
        options: ["Avoir des relations", "Atomicité des valeurs", "Performance", "Avoir un index"],
        answerIndex: 1,
        explanation: "Une valeur indivisible par colonne."
      },
      {
        question: "Le format JSON dans PostgreSQL viole-t-il la 1NF ?",
        options: ["Oui, techniquement", "Non, c'est magique", "Jamais", "Seulement si vide"],
        answerIndex: 0,
        explanation: "Oui, car ce n'est pas atomique au sens relationnel, mais c'est un compromis accepté moderne."
      },
      {
        question: "Avoir `tag1`, `tag2` est un exemple de...",
        options: ["Bon design", "Groupe répétitif", "Clé étrangère", "Normalisation"],
        answerIndex: 1,
        explanation: "C'est une violation de la 1NF."
      },
      {
        question: "Sans clé primaire, une table est-elle en 1NF ?",
        options: ["Oui", "Non", "Peut-être", "Seulement en lecture"],
        answerIndex: 1,
        explanation: "L'unicité des lignes est requise."
      },
      {
        question: "L'atomisation facilite...",
        options: ["Le tri et la recherche", "L'insertion", "L'espace disque", "La couleur"],
        answerIndex: 0,
        explanation: "On peut faire `WHERE skill = 'SQL'`."
      }
    ],
    summary: [
      "Pas de listes dans une colonne.",
      "Pas de colonnes numérotées (col1, col2).",
      "Une table 1NF est 'propre' et consultable."
    ]
  },

  '2nf': {
    slug: '2nf',
    objectives: [
      "Comprendre la dépendance fonctionnelle partielle.",
      "Gérer les clés primaires composites.",
      "Associer chaque attribut à la clé entière."
    ],
    why: {
      title: 'Tout dépend de la clé',
      content: "La 2NF ne concerne que les tables avec une clé primaire composée (plusieurs colonnes). Elle stipule que chaque colonne non-clé doit dépendre de *toute* la clé, pas juste d'une partie. Sinon, vous stockez des infos au mauvais endroit."
    },
    concept: {
      title: 'Éliminer la dépendance partielle',
      content: "Dans une table `OrderLines (order_id, product_id, qty, product_name)`, la clé est `(order_id, product_id)`. \n- `qty` dépend des deux (la quantité de CE produit dans CETTE commande).\n- `product_name` dépend seulement de `product_id`.\n\nC'est une violation. `product_name` doit être déplacé dans la table `Products`.",
      syntax: "-- Mauvais (2NF Violation)\nOrderLine: (order_id, prod_id, qty, prod_price)\n\n-- Bon\nOrderLine: (order_id, prod_id, qty)\nProduct: (prod_id, prod_price)"
    },
    example: {
      title: 'Notes des étudiants',
      description: 'Table `Notes (student_id, course_id, grade, student_name)`.',
      sql: "Problème : student_name dépend de student_id uniquement.\nSolution : Déplacer student_name dans la table Students.",
      result: "Évite de répéter le nom de l'étudiant à chaque note."
    },
    exercises: [
      {
        question: "Exercice 1 : Une table a une clé simple (id). Peut-elle violer la 2NF ?",
        solution: "Non.",
        explanation: "La 2NF ne s'applique qu'aux clés composites. Si la clé est simple, toute dépendance est forcément totale."
      },
      {
        question: "Exercice 2 : `Intervention (mecano_id, voiture_id, date, nom_mecano)`. Quelle colonne viole la 2NF ?",
        solution: "nom_mecano",
        explanation: "Elle dépend seulement de `mecano_id`, pas de la voiture."
      }
    ],
    quiz: [
      {
        question: "La 2NF vise à éliminer...",
        options: ["Les dépendances partielles", "Les doublons", "Les relations M:N", "Les NULLs"],
        answerIndex: 0,
        explanation: "Dépendance à une sous-partie de la clé primaire."
      },
      {
        question: "Quelle est la condition préalable à la 2NF ?",
        options: ["Être en 1NF", "Être en 3NF", "Avoir des index", "Aucune"],
        answerIndex: 0,
        explanation: "La normalisation est incrémentale."
      },
      {
        question: "Si je n'ai pas de clé composite, suis-je en 2NF ?",
        options: ["Oui (si 1NF)", "Non", "Jamais", "Impossible à dire"],
        answerIndex: 0,
        explanation: "Automatiquement."
      },
      {
        question: "Une dépendance partielle entraîne...",
        options: ["De la redondance", "De la performance", "De la sécurité", "Rien"],
        answerIndex: 0,
        explanation: "On répète l'info du produit sur chaque ligne de commande."
      },
      {
        question: "Comment résoudre une violation 2NF ?",
        options: ["Déplacer la colonne dans une nouvelle table", "Supprimer la colonne", "Ajouter une clé", "Changer le type"],
        answerIndex: 0,
        explanation: "On extrait le concept indépendant."
      }
    ],
    summary: [
      "Concerne les clés composites.",
      "Toute colonne doit dépendre de TOUTE la clé.",
      "Évite la redondance des données de référence dans les tables de liaison."
    ]
  },

  '3nf': {
    slug: '3nf',
    objectives: [
      "Comprendre la dépendance transitive.",
      "Séparer les concepts indépendants.",
      "Atteindre le standard industriel."
    ],
    why: {
      title: 'La clé, rien que la clé',
      content: "La 3NF est le standard d'or. Elle dit : 'Une colonne ne doit pas dépendre d'une autre colonne non-clé'. Si vous stockez la Ville en fonction du Code Postal dans la table Utilisateurs, vous violez la 3NF. La Ville dépend du CP, qui dépend de l'Utilisateur. C'est une chaîne (transitive)."
    },
    concept: {
      title: 'Éliminer la dépendance transitive',
      content: "Si A -> B et B -> C, alors C dépend transitivement de A. Dans une table, toutes les colonnes doivent dépendre directement de la clé primaire, sans intermédiaire.",
      syntax: "-- Mauvais (Violation 3NF)\nUsers (id, name, zip_code, city)\n-- city dépend de zip_code\n\n-- Bon\nUsers (id, name, zip_code)\nCities (zip_code, city)"
    },
    example: {
      title: 'Facture et Client',
      description: 'Table `Invoices (id, amount, customer_id, customer_email)`.',
      sql: "Problème : customer_email dépend de customer_id, pas de invoice_id.\nSolution : L'email doit rester dans la table Customers.",
      result: "Si le client change d'email, on ne met à jour qu'une seule table."
    },
    exercises: [
      {
        question: "Exercice 1 : `Product (id, category_id, category_name)`. Analysez.",
        solution: "Non 3NF.",
        explanation: "category_name dépend de category_id. Il faut une table Categories."
      },
      {
        question: "Exercice 2 : Peut-on dénormaliser (violer la 3NF) volontairement ?",
        solution: "Oui, pour la performance (éviter les JOINs).",
        explanation: "C'est un compromis classique en Data Warehousing (Star Schema), mais à éviter en production transactionnelle (OLTP)."
      }
    ],
    quiz: [
      {
        question: "La définition de la 3NF : 'La clé, toute la clé et ...'",
        options: ["Rien que la clé", "Les index", "Les relations", "Le reste"],
        answerIndex: 0,
        explanation: "Mnémotechnique célèbre."
      },
      {
        question: "La 3NF élimine...",
        options: ["Les dépendances transitives", "Les dépendances partielles", "Les doublons", "Les NULLs"],
        answerIndex: 0,
        explanation: "A dépend de B qui dépend de C."
      },
      {
        question: "Stocker 'Total' (Prix * Qty) dans la table Commande est-il 3NF ?",
        options: ["Non", "Oui", "Seulement si correct", "Peu importe"],
        answerIndex: 0,
        explanation: "C'est une dépendance fonctionnelle (calculée). En pure théorie, on ne le stocke pas."
      },
      {
        question: "La normalisation 3NF augmente...",
        options: ["Le nombre de tables (et de JOINs)", "La redondance", "L'espace disque", "Les erreurs"],
        answerIndex: 0,
        explanation: "On fragmente la donnée pour la rendre propre, ce qui complexifie la lecture."
      },
      {
        question: "Quelle forme normale est suffisante pour 99% des applis ?",
        options: ["3NF", "6NF", "1NF", "BCNF"],
        answerIndex: 0,
        explanation: "C'est le point d'équilibre standard."
      }
    ],
    summary: [
      "Pas de dépendance en chaîne (A->B->C).",
      "Séparez les entités distinctes dans leurs propres tables.",
      "La 3NF facilite la maintenance mais oblige à faire des JOINs."
    ]
  },

  // --- MODULE 3: KEYS & CONSTRAINTS ---

  'pk-fk': {
    slug: 'pk-fk',
    objectives: [
      "Choisir entre Clé Naturelle et Clé Surrogate (Artificielle).",
      "Comprendre le rôle de la Clé Étrangère.",
      "Gérer l'intégrité référentielle (CASCADE, RESTRICT)."
    ],
    why: {
      title: 'L\'identité et le lien',
      content: "Comment retrouver une ligne unique parmi des millions ? La Clé Primaire (PK). Comment relier une commande à son client ? La Clé Étrangère (FK). Ce sont les fondations de l'intégrité des données."
    },
    concept: {
      title: 'Types de Clés',
      content: "- **PK Naturelle** : Donnée existante (ex: Email, Numéro Sécu). Avantage: sens métier. Inconvénient: peut changer (mariage, changement d'email).\n- **PK Surrogate** : ID technique (1, 2, 3... ou UUID). Avantage: stable et performant. Recommandé.\n- **Foreign Key** : Pointe vers la PK d'une autre table. Garantit que le lien est valide.",
      syntax: "CREATE TABLE users (id SERIAL PRIMARY KEY); -- Surrogate\nCREATE TABLE orders (\n  user_id INT REFERENCES users(id) -- FK\n);"
    },
    example: {
      title: 'Suppression en cascade',
      description: 'Si je supprime un User, que deviennent ses commandes ?',
      sql: "REFERENCES users(id) ON DELETE CASCADE",
      result: "Les commandes sont supprimées automatiquement. (Attention danger !)"
    },
    exercises: [
      {
        question: "Exercice 1 : Pourquoi ne pas utiliser l'Email comme Clé Primaire ?",
        solution: "L'email peut changer, et c'est une chaîne longue (lent pour les index).",
        explanation: "Préférez un ID numérique interne."
      },
      {
        question: "Exercice 2 : Que se passe-t-il si j'insère une FK qui n'existe pas ?",
        solution: "Erreur de contrainte (Foreign Key Violation).",
        explanation: "La base refuse de créer un lien mort."
      }
    ],
    quiz: [
      {
        question: "Une Clé Primaire doit être...",
        options: ["Unique et Non NULL", "Unique et NULL", "Doublon", "Texte"],
        answerIndex: 0,
        explanation: "Elle identifie formellement la ligne."
      },
      {
        question: "Une Clé Étrangère sert à...",
        options: ["Lier deux tables", "Trier la table", "Sécuriser la table", "Rien"],
        answerIndex: 0,
        explanation: "C'est le pont relationnel."
      },
      {
        question: "Quel type est recommandé pour une PK performante ?",
        options: ["Integer / BigInt", "Varchar", "JSON", "Date"],
        answerIndex: 0,
        explanation: "Les nombres sont les plus rapides à comparer et indexer."
      },
      {
        question: "UUID vs Integer ?",
        options: ["UUID est unique globalement, Integer est plus rapide", "C'est pareil", "Integer est unique globalement", "UUID est plus rapide"],
        answerIndex: 0,
        explanation: "UUID pour les systèmes distribués, Integer pour le standard."
      },
      {
        question: "ON DELETE SET NULL fait quoi ?",
        options: ["Met la FK à NULL si le parent est supprimé", "Supprime l'enfant", "Bloque la suppression", "Rien"],
        answerIndex: 0,
        explanation: "Garde l'historique mais coupe le lien."
      }
    ],
    summary: [
      "Utilisez `id SERIAL PRIMARY KEY` par défaut.",
      "Définissez toujours vos Foreign Keys pour éviter les données orphelines.",
      "Réfléchissez à la stratégie de suppression (CASCADE vs RESTRICT)."
    ]
  },

  'constraints': {
    slug: 'constraints',
    objectives: [
      "Utiliser NOT NULL pour les données obligatoires.",
      "Garantir l'unicité avec UNIQUE.",
      "Valider la logique avec CHECK.",
      "Définir des valeurs par défaut."
    ],
    why: {
      title: 'Les gardes-fous',
      content: "Le code de l'application peut avoir des bugs. La base de données est le dernier rempart. Les contraintes empêchent physiquement l'écriture de données invalides (ex: prix négatif, email dupliqué)."
    },
    concept: {
      title: 'Types de contraintes',
      content: "- **NOT NULL** : Champ obligatoire.\n- **UNIQUE** : Pas de doublon (hors PK).\n- **CHECK** : Condition logique (`price > 0`).\n- **DEFAULT** : Valeur automatique si non fournie (`DEFAULT NOW()`).",
      syntax: "CREATE TABLE products (\n  sku VARCHAR UNIQUE,\n  price DECIMAL CHECK (price >= 0),\n  name TEXT NOT NULL,\n  is_active BOOLEAN DEFAULT true\n);"
    },
    example: {
      title: 'Sécuriser une table User',
      description: 'Email unique, âge > 13.',
      sql: "email VARCHAR(255) UNIQUE,\nage INT CHECK (age >= 13)",
      result: "Impossible d'inscrire deux fois le même email ou un enfant."
    },
    exercises: [
      {
        question: "Exercice 1 : Comment forcer un statut à être 'Draft' ou 'Published' ?",
        solution: "CHECK (status IN ('Draft', 'Published'))",
        explanation: "Restreint les valeurs possibles (comme une Enum)."
      },
      {
        question: "Exercice 2 : Peut-on avoir plusieurs contraintes UNIQUE dans une table ?",
        solution: "Oui.",
        explanation: "Contrairement à la PK (une seule), on peut avoir Email UNIQUE et Phone UNIQUE."
      }
    ],
    quiz: [
      {
        question: "Si j'insère NULL dans une colonne NOT NULL, que se passe-t-il ?",
        options: ["Erreur", "Ça insère 0", "Ça insère vide", "Ça marche"],
        answerIndex: 0,
        explanation: "Rejet strict."
      },
      {
        question: "La contrainte CHECK sert à...",
        options: ["Valider une condition", "Vérifier l'orthographe", "Vérifier la clé", "Rien"],
        answerIndex: 0,
        explanation: "Ex: `score BETWEEN 0 AND 100`."
      },
      {
        question: "UNIQUE autorise-t-il les NULLs ?",
        options: ["Oui (généralement)", "Non", "Jamais", "Un seul NULL"],
        answerIndex: 0,
        explanation: "En SQL standard, NULL != NULL, donc on peut avoir plusieurs NULLs uniques."
      },
      {
        question: "DEFAULT s'applique quand...",
        options: ["On ne fournit pas la valeur à l'insert", "La valeur est NULL", "Tout le temps", "Jamais"],
        answerIndex: 0,
        explanation: "Si on insère explicitement NULL, DEFAULT ne s'active pas (sauf triggers)."
      },
      {
        question: "Les contraintes ralentissent-elles l'insertion ?",
        options: ["Légèrement, mais c'est négligeable vs la sécurité", "Énormément", "Non", "Elles l'accélèrent"],
        answerIndex: 0,
        explanation: "Le coût CPU de vérification est minime."
      }
    ],
    summary: [
      "Blindez vos tables avec des contraintes.",
      "Ne faites pas confiance à l'application pour valider les données critiques.",
      "CHECK est très puissant pour les règles métier simples."
    ]
  },

  // --- MODULE 4: INDEXING ---

  'index-basics': {
    slug: 'index-basics',
    objectives: [
      "Comprendre ce qu'est un index (analogie du livre).",
      "Découvrir la structure B-Tree.",
      "Comprendre le compromis Lecture vs Écriture."
    ],
    why: {
      title: 'Trouver une aiguille dans une botte de foin',
      content: "Sans index, la base doit lire TOUTE la table (Full Scan) pour trouver une ligne. Avec un index, elle va directement au but. C'est la différence entre feuilleter un livre page par page ou utiliser l'index à la fin."
    },
    concept: {
      title: 'Comment ça marche ?',
      content: "Un index est une structure de données séparée (souvent un arbre **B-Tree**) qui copie la valeur de la colonne et pointe vers la ligne. Il est trié, ce qui permet la recherche dichotomique (très rapide).\n\n**Coût** : Chaque `INSERT/UPDATE` doit mettre à jour l'index. Trop d'index ralentissent l'écriture.",
      syntax: "CREATE INDEX idx_users_email ON users(email);"
    },
    example: {
      title: 'Recherche par nom',
      description: 'SELECT * FROM users WHERE lastname = "Doe"',
      sql: "Sans Index : 1 000 000 lectures.\nAvec Index : ~3 lectures (logarithmique).",
      result: "Gain de performance massif."
    },
    exercises: [
      {
        question: "Exercice 1 : Sur quelle colonne mettre un index pour `WHERE age > 18` ?",
        solution: "age",
        explanation: "L'index sera utilisé pour filtrer la plage."
      },
      {
        question: "Exercice 2 : Faut-il indexer une table de 10 lignes ?",
        solution: "Non.",
        explanation: "Le Full Scan est plus rapide car il n'y a pas d'overhead de lecture de l'index."
      }
    ],
    quiz: [
      {
        question: "Un index accélère...",
        options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
        answerIndex: 0,
        explanation: "La lecture (et le WHERE des updates/deletes)."
      },
      {
        question: "Un index ralentit...",
        options: ["INSERT / UPDATE", "SELECT", "La connexion", "Rien"],
        answerIndex: 0,
        explanation: "Il faut maintenir l'arbre à jour à chaque modification."
      },
      {
        question: "La structure par défaut est...",
        options: ["B-Tree", "Hash", "GiST", "Gin"],
        answerIndex: 0,
        explanation: "Balanced Tree, efficace pour = et les plages (<, >)."
      },
      {
        question: "La Clé Primaire est-elle indexée ?",
        options: ["Oui, automatiquement", "Non", "Il faut le demander", "Seulement en MySQL"],
        answerIndex: 0,
        explanation: "C'est indispensable pour garantir l'unicité rapide."
      },
      {
        question: "Qu'est-ce qu'un Full Table Scan ?",
        options: ["Lire toute la table", "Scanner les virus", "Lire l'index", "Une erreur"],
        answerIndex: 0,
        explanation: "Le comportement par défaut sans index."
      }
    ],
    summary: [
      "Indexez les colonnes utilisées dans WHERE et JOIN.",
      "Ne sur-indexez pas (coût d'écriture).",
      "B-Tree est l'index standard polyvalent."
    ]
  },

  'indexing-strategies': {
    slug: 'indexing-strategies',
    objectives: [
      "Utiliser les index composites (multi-colonnes).",
      "Comprendre la règle du préfixe gauche (Leftmost Prefix).",
      "Savoir quand NE PAS indexer (basse cardinalité)."
    ],
    why: {
      title: 'L\'art de l\'optimisation',
      content: "Créer un index sur chaque colonne est une erreur de débutant. Les index composites permettent d'optimiser des requêtes complexes (`WHERE A=1 AND B=2`). Mais attention à l'ordre des colonnes !"
    },
    concept: {
      title: 'Index Composite et Cardinalité',
      content: "- **Composite** : `CREATE INDEX idx_name_city ON users(lastname, city)`. Efficace pour chercher `lastname` OU `lastname + city`. Inutile pour chercher `city` seul (Règle du préfixe).\n- **Cardinalité** : Nombre de valeurs uniques. Indexer une colonne 'Sexe' (H/F) est souvent inutile (l'index renvoie 50% de la table, le moteur préférera tout lire).",
      syntax: "-- Optimise: WHERE a=1 AND b=2\n-- Optimise: WHERE a=1\n-- N'optimise PAS: WHERE b=2\nCREATE INDEX idx_ab ON table(a, b);"
    },
    example: {
      title: 'L\'annuaire téléphonique',
      description: 'Un annuaire est trié par Nom, puis Prénom.',
      sql: "Chercher 'Dupont' : Facile.\nChercher 'Dupont Jean' : Facile.\nChercher 'Jean' (tout court) : Impossible via l'index.",
      result: "L'ordre des colonnes dans l'index est crucial."
    },
    exercises: [
      {
        question: "Exercice 1 : J'ai un index sur (category, price). Ma requête `WHERE price > 100` l'utilise-t-elle ?",
        solution: "Non.",
        explanation: "La colonne de gauche (category) n'est pas utilisée. L'index est trié par catégorie d'abord."
      },
      {
        question: "Exercice 2 : Qu'est-ce qu'un index 'Covering' ?",
        solution: "Un index qui contient toutes les données demandées par le SELECT.",
        explanation: "La base n'a même pas besoin de lire la table principale, l'index suffit (ultra rapide)."
      }
    ],
    quiz: [
      {
        question: "La règle du préfixe gauche s'applique aux...",
        options: ["Index composites", "Index simples", "Clés primaires", "Vues"],
        answerIndex: 0,
        explanation: "L'ordre de déclaration (A, B, C) compte."
      },
      {
        question: "Doit-on indexer une colonne booléenne (Vrai/Faux) ?",
        options: ["Rarement (basse cardinalité)", "Toujours", "Oui pour la vitesse", "Non c'est interdit"],
        answerIndex: 0,
        explanation: "Si l'index ne filtre pas assez (> 10-20% des lignes), le moteur l'ignora."
      },
      {
        question: "Combien de colonnes max dans un index ?",
        options: ["Dépend du SGBD (souvent 32)", "1", "Infini", "2"],
        answerIndex: 0,
        explanation: "Mais en pratique, au-delà de 3-4, c'est rare."
      },
      {
        question: "Un index unique est-il plus rapide ?",
        options: ["Souvent oui", "Non", "Pareil", "Moins rapide"],
        answerIndex: 0,
        explanation: "Le moteur sait qu'il peut s'arrêter dès qu'il trouve une correspondance."
      },
      {
        question: "Comment vérifier si mon index est utilisé ?",
        options: ["EXPLAIN (ou EXPLAIN ANALYZE)", "SELECT INDEX", "SHOW INDEX", "Google"],
        answerIndex: 0,
        explanation: "La commande EXPLAIN affiche le plan d'exécution."
      }
    ],
    summary: [
      "L'ordre des colonnes dans un index composite est vital.",
      "N'indexez pas les colonnes à faible cardinalité (ex: booléens).",
      "Utilisez EXPLAIN pour vérifier vos hypothèses."
    ]
  },

  // --- MODULE 5: ANALYTICAL ---

  'oltp-vs-olap': {
    slug: 'oltp-vs-olap',
    objectives: [
      "Différencier les charges de travail Transactionnelles et Analytiques.",
      "Comprendre pourquoi on sépare la Prod de la BI.",
      "Introduire la dénormalisation."
    ],
    why: {
      title: 'Deux mondes, deux besoins',
      content: "Votre application (Site Web) doit répondre en millisecondes à des milliers d'utilisateurs qui écrivent des commandes (OLTP). Votre équipe Data doit analyser des millions de lignes pour faire des rapports (OLAP). Utiliser la même base pour les deux est une recette pour le désastre (blocages, lenteurs)."
    },
    concept: {
      title: 'OLTP vs OLAP',
      content: "- **OLTP (On-Line Transaction Processing)** : Écritures rapides, petites requêtes, haute concurrence. Modèle **Normalisé (3NF)** pour l'intégrité.\n- **OLAP (On-Line Analytical Processing)** : Lectures massives, agrégations complexes. Modèle **Dénormalisé (Star Schema)** pour la performance de lecture.",
      syntax: "OLTP : SELECT * FROM orders WHERE id = 123; (Rapide)\nOLAP : SELECT SUM(amount) FROM orders WHERE year = 2023; (Lourd)"
    },
    example: {
      title: 'Le cauchemar du lundi matin',
      description: 'Le rapport financier tourne sur la base de prod et bloque les commandes des clients.',
      sql: "Solution : Répliquer les données vers un Data Warehouse dédié (Snowflake, BigQuery) optimisé pour l'analyse.",
      result: "Isolation des charges de travail."
    },
    exercises: [
      {
        question: "Exercice 1 : Un système de réservation de billets de train est-il OLTP ou OLAP ?",
        solution: "OLTP.",
        explanation: "Il gère des transactions unitaires en temps réel."
      },
      {
        question: "Exercice 2 : Pourquoi dénormaliser en OLAP ?",
        solution: "Pour éviter les jointures coûteuses sur des milliards de lignes.",
        explanation: "On préfère répéter le nom du client dans la table de faits pour lire plus vite."
      }
    ],
    quiz: [
      {
        question: "OLTP signifie...",
        options: ["On-Line Transaction Processing", "Old Long Table Process", "Only Left Top Position", "Analytics"],
        answerIndex: 0,
        explanation: "Traitement transactionnel."
      },
      {
        question: "OLAP est optimisé pour...",
        options: ["L'écriture", "La lecture massive et l'agrégation", "La suppression", "Les contraintes"],
        answerIndex: 1,
        explanation: "Business Intelligence, Reporting."
      },
      {
        question: "Le modèle OLTP privilégie...",
        options: ["La normalisation (3NF)", "La dénormalisation", "Les fichiers CSV", "Le NoSQL"],
        answerIndex: 0,
        explanation: "Pour éviter les anomalies de mise à jour."
      },
      {
        question: "Où stocke-t-on généralement les données OLAP ?",
        options: ["Data Warehouse", "Base de prod", "Excel", "Cache Redis"],
        answerIndex: 0,
        explanation: "Entrepôt de données structuré pour l'analyse."
      },
      {
        question: "Une requête qui met 10 minutes est acceptable en...",
        options: ["OLAP", "OLTP", "Jamais", "Les deux"],
        answerIndex: 0,
        explanation: "L'analyse peut prendre du temps, pas l'expérience utilisateur."
      }
    ],
    summary: [
      "OLTP = App (Écriture, 3NF, Rapide).",
      "OLAP = BI (Lecture, Star Schema, Massif).",
      "Ne mélangez pas les deux charges sur le même serveur."
    ]
  },

  'star-schema': {
    slug: 'star-schema',
    objectives: [
      "Comprendre la structure Fait / Dimensions.",
      "Modéliser un schéma en étoile.",
      "Identifier les mesures et les attributs."
    ],
    why: {
      title: 'Simplifier pour analyser',
      content: "Dans un Data Warehouse, les jointures complexes (3NF) sont trop lentes. Le Schéma en Étoile simplifie tout : une table centrale massive (les Faits) entourée de tables descriptives (les Dimensions). C'est le standard de la BI."
    },
    concept: {
      title: 'Fact vs Dimension',
      content: "- **Table de Faits** : Contient les métriques (chiffres) et les clés étrangères. Elle est très longue et étroite. Ex: `Ventes (date_id, product_id, store_id, montant, quantite)`.\n- **Table de Dimension** : Contient le contexte (texte). Elle est large et courte. Ex: `Produit (id, nom, catégorie, couleur)`.\n\nAu centre l'action, autour le contexte.",
      syntax: "SELECT d.year, SUM(f.amount)\nFROM fact_sales f\nJOIN dim_time d ON f.time_id = d.id\nGROUP BY d.year;"
    },
    example: {
      title: 'Analyse Retail',
      description: 'Nous voulons analyser les ventes par Magasin et par Mois.',
      sql: "Fact: Sales\nDim: Store, Time, Product",
      result: "Une seule jointure par dimension suffit. Très performant."
    },
    exercises: [
      {
        question: "Exercice 1 : Dans un schéma étoile, où trouve-t-on le 'Nom du Client' ?",
        solution: "Dimension Client.",
        explanation: "C'est un attribut descriptif."
      },
      {
        question: "Exercice 2 : Où trouve-t-on le 'Montant de la transaction' ?",
        solution: "Table de Faits.",
        explanation: "C'est une mesure numérique additive."
      }
    ],
    quiz: [
      {
        question: "La table centrale s'appelle...",
        options: ["Table de Faits", "Table de Dimensions", "Table Pivot", "Master Table"],
        answerIndex: 0,
        explanation: "Elle enregistre les événements."
      },
      {
        question: "Une dimension contient...",
        options: ["Des descriptions (Qui, Quoi, Où)", "Des chiffres à additionner", "Des logs", "Rien"],
        answerIndex: 0,
        explanation: "Le contexte de l'analyse."
      },
      {
        question: "Le schéma en flocon (Snowflake) est...",
        options: ["Une version normalisée de l'étoile", "Une version plus simple", "Une erreur", "Un logiciel"],
        answerIndex: 0,
        explanation: "Les dimensions sont elles-mêmes normalisées (plus de jointures, moins de redondance)."
      },
      {
        question: "Pourquoi l'étoile est-elle rapide ?",
        options: ["Moins de jointures (1 niveau)", "Plus de tables", "Pas d'index", "Magie"],
        answerIndex: 0,
        explanation: "La structure est optimisée pour les moteurs OLAP."
      },
      {
        question: "Une clé 'Surrogate' est-elle utilisée en Dimension ?",
        options: ["Oui, pour gérer l'historique (SCD)", "Non, on garde l'ID de prod", "Jamais", "Bof"],
        answerIndex: 0,
        explanation: "Indispensable pour gérer les changements (Slowly Changing Dimensions)."
      }
    ],
    summary: [
      "Faits = Chiffres (Centre).",
      "Dimensions = Contexte (Branches).",
      "Optimisé pour les requêtes d'agrégation (SUM, AVG, GROUP BY)."
    ]
  }
};
