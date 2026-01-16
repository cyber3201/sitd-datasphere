
export interface LessonContent {
  slug: string;
  objectives?: string[]; // Added for Module 3+ structure
  why: {
    title: string;
    content: string;
  };
  concept: {
    title: string;
    content: string;
    syntax: string; // or generic code block
  };
  example: {
    title: string;
    description: string;
    sql: string; // generic code
    result: string; // generic text result
  };
  exercises: {
    question: string;
    solution: string;
    explanation: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
  summary?: string[]; // Added for Module 3+ structure
}

export const LESSON_CONTENT: Record<string, LessonContent> = {
  // --- MODULE 1: LES BASES DU SQL ---
  
  'select-from': {
    slug: 'select-from',
    why: {
      title: 'Le fondement de toute interrogation',
      content: "Pour dialoguer avec une base de données, il faut savoir poser la question \"Quoi\" (quelles données je veux ?) et \"Où\" (dans quel tiroir chercher ?). Ces deux mots-clés, SELECT et FROM, constituent l'ossature de 100% des requêtes de lecture. Sans eux, rien n'est possible."
    },
    concept: {
      title: 'Syntaxe et Bonnes Pratiques',
      content: "Une requête SQL se lit comme une phrase anglaise, mais s'exécute dans un ordre logique précis : d'abord le FROM (on localise la table), ensuite le SELECT (on filtre les colonnes).\n\n**Règle d'or : Évitez `SELECT *` en production.**\nBien que pratique pour explorer, demander \"toutes les colonnes\" gaspille de la mémoire, de la bande passante réseau et casse les index couvrants. Préférez toujours lister explicitement les colonnes dont vous avez besoin.",
      syntax: "-- 1. Méthode recommandée (Explicite)\nSELECT full_name, city \nFROM customers;\n\n-- 2. Méthode d'exploration (À éviter en prod)\nSELECT * \nFROM customers;"
    },
    example: {
      title: 'Lister les produits vendus',
      description: 'Nous voulons obtenir la liste des noms de produits et leur prix pour le catalogue.',
      sql: "SELECT name, price\nFROM products;",
      result: "| name           | price |\n|----------------|-------|\n| Laptop Pro X   | 1200  |\n| Wireless Mouse | 25    |\n| HD Monitor     | 300   |"
    },
    exercises: [
      {
        question: "Exercice 1 : Récupérez la liste complète de tous les clients (nom et ville uniquement) pour l'équipe marketing.",
        solution: "SELECT full_name, city FROM customers;",
        explanation: "On cible la table 'customers' et on ne prend que les deux colonnes demandées."
      },
      {
        question: "Exercice 2 (Challenge) : Affichez les identifiants de commande et leur date, mais en renommant la colonne 'order_date' en 'date_achat' (alias).",
        solution: "SELECT order_id, order_date AS date_achat FROM orders;",
        explanation: "Le mot-clé AS permet de renommer une colonne dans le résultat final (très utile pour les rapports)."
      }
    ],
    quiz: [
      {
        question: "Quel mot-clé indique la table source des données ?",
        options: ["SELECT", "SOURCE", "FROM", "WHERE"],
        answerIndex: 2,
        explanation: "FROM spécifie l'origine des données (la table)."
      },
      {
        question: "Pourquoi faut-il éviter SELECT * en production ?",
        options: ["C'est interdit par le standard SQL", "Cela ralentit les performances et consomme du réseau inutilement", "Cela renvoie les données à l'envers", "Cela supprime les données"],
        answerIndex: 1,
        explanation: "Transférer des colonnes inutiles est coûteux."
      },
      {
        question: "L'ordre d'exécution logique par le moteur est :",
        options: ["SELECT puis FROM", "FROM puis SELECT", "Simultané", "Aléatoire"],
        answerIndex: 1,
        explanation: "Le moteur doit d'abord trouver la table (FROM) avant de pouvoir extraire des colonnes (SELECT)."
      },
      {
        question: "Comment renommer une colonne dans le résultat ?",
        options: ["RENAME", "ALIAS", "AS", "IS"],
        answerIndex: 2,
        explanation: "Exemple: SELECT name AS nom_produit..."
      },
      {
        question: "Peut-on interroger plusieurs colonnes à la fois ?",
        options: ["Non, une seule", "Oui, en les séparant par des virgules", "Oui, en les séparant par des ET", "Seulement si elles sont du même type"],
        answerIndex: 1,
        explanation: "SELECT col1, col2, col3 FROM table;"
      }
    ]
  },

  'where': {
    slug: 'where',
    why: {
      title: 'Cibler l\'information pertinente',
      content: "Une base de données contient souvent des millions de lignes. Lire toute la table pour trouver un seul client est inefficace (c'est comme lire tout un dictionnaire pour trouver un mot). La clause WHERE agit comme un filtre puissant qui ne laisse passer que les lignes répondant à vos critères précis."
    },
    concept: {
      title: 'Opérateurs de comparaison',
      content: "Le WHERE se place après le FROM. Il évalue chaque ligne : si la condition est VRAIE, la ligne est gardée.\n\n**Opérateurs principaux :**\n- `=` : Égalité exacte (Textes sensibles à la casse selon les SGBD)\n- `<>` ou `!=` : Différent de\n- `>`, `<`, `>=`, `<=` : Comparaisons numériques ou temporelles\n- `BETWEEN` : Intervalle inclusif (ex: prix entre 10 et 20)",
      syntax: "SELECT * FROM orders\nWHERE amount > 100;\n\nSELECT * FROM customers\nWHERE country = 'France';"
    },
    example: {
      title: 'Commandes importantes',
      description: 'Le directeur des ventes veut voir toutes les commandes supérieures à 1000€.',
      sql: "SELECT order_id, amount, status\nFROM orders\nWHERE amount >= 1000;",
      result: "| order_id | amount | status  |\n|----------|--------|---------|\n| 1024     | 1200   | Shipped |"
    },
    exercises: [
      {
        question: "Exercice 1 : Trouvez tous les produits de la catégorie 'Electronics'.",
        solution: "SELECT * FROM products WHERE category = 'Electronics';",
        explanation: "N'oubliez pas les guillemets simples autour du texte."
      },
      {
        question: "Exercice 2 (Challenge) : Trouvez les commandes qui ne sont PAS 'Shipped' (expédiées).",
        solution: "SELECT * FROM orders WHERE status != 'Shipped';",
        explanation: "L'opérateur != (ou <>) exclut la valeur spécifiée."
      }
    ],
    quiz: [
      {
        question: "Quelle requête est correcte pour filtrer un texte ?",
        options: ["WHERE city = Paris", "WHERE city = 'Paris'", "WHERE city IS Paris", "WHERE city == Paris"],
        answerIndex: 1,
        explanation: "Les chaînes de caractères doivent être entourées de guillemets simples."
      },
      {
        question: "Que fait l'opérateur <> ?",
        options: ["Plus petit ou plus grand", "Inférieur", "Supérieur", "Différent de"],
        answerIndex: 3,
        explanation: "C'est l'opérateur standard SQL pour l'inégalité."
      },
      {
        question: "WHERE amount BETWEEN 10 AND 20 inclut-il 10 et 20 ?",
        options: ["Oui", "Non", "Seulement 10", "Seulement 20"],
        answerIndex: 0,
        explanation: "BETWEEN est inclusif des bornes."
      },
      {
        question: "Où se place le WHERE dans la requête ?",
        options: ["Avant SELECT", "Après FROM", "Après LIMIT", "À la fin"],
        answerIndex: 1,
        explanation: "SELECT ... FROM ... WHERE ..."
      },
      {
        question: "Peut-on utiliser WHERE sur des dates ?",
        options: ["Non", "Oui, avec des guillemets (ex: '2023-01-01')", "Oui, sans guillemets", "Seulement l'année"],
        answerIndex: 1,
        explanation: "Les dates sont traitées comme des chaînes ou des objets date, comparaison standard possible."
      }
    ]
  },

  'order-by-limit-offset': {
    slug: 'order-by-limit-offset',
    why: {
      title: 'Organiser et Restreindre',
      content: "Par défaut, l'ordre des lignes retournées par SQL est imprévisible. Si vous voulez un classement (Top Ventes) ou une liste alphabétique, vous devez le demander explicitement. De plus, pour ne pas surcharger l'application, on ne charge souvent que les X premiers résultats (Pagination)."
    },
    concept: {
      title: 'Trier (ORDER BY) et Paginer (LIMIT)',
      content: "**ORDER BY** : Trie le résultat final. \n- `ASC` (Ascendant, par défaut) : A->Z, 0->9\n- `DESC` (Descendant) : Z->A, 9->0\n\n**LIMIT** : Ne garde que les N premières lignes.\n**OFFSET** : Saute les N premières lignes (pour la page 2, 3...).",
      syntax: "SELECT * FROM products\nORDER BY price DESC\nLIMIT 5;"
    },
    example: {
      title: 'Les 3 produits les plus chers',
      description: 'On veut mettre en avant nos produits premium.',
      sql: "SELECT name, price\nFROM products\nORDER BY price DESC\nLIMIT 3;",
      result: "| name           | price |\n|----------------|-------|\n| Laptop Pro X   | 1200  |\n| 4K TV          | 800   |\n| Smartphone Z   | 750   |"
    },
    exercises: [
      {
        question: "Exercice 1 : Affichez tous les clients triés par ordre alphabétique de leur ville.",
        solution: "SELECT * FROM customers ORDER BY city ASC;",
        explanation: "ASC est optionnel car c'est le défaut, mais c'est bien d'être explicite."
      },
      {
        question: "Exercice 2 (Challenge) : Affichez les 5 commandes les plus récentes.",
        solution: "SELECT * FROM orders ORDER BY order_date DESC LIMIT 5;",
        explanation: "Le tri par date décroissante met les plus récentes en premier."
      }
    ],
    quiz: [
      {
        question: "Quel est l'ordre de tri par défaut ?",
        options: ["Aléatoire", "Descendant (DESC)", "Ascendant (ASC)", "Par ID"],
        answerIndex: 2,
        explanation: "Si on ne précise rien, c'est ASC."
      },
      {
        question: "Comment obtenir la page 2 des résultats (si 10 par page) ?",
        options: ["LIMIT 10 PAGE 2", "LIMIT 10 OFFSET 10", "OFFSET 10", "Page 2"],
        answerIndex: 1,
        explanation: "On prend 10 lignes, après en avoir sauté 10."
      },
      {
        question: "Peut-on trier par plusieurs colonnes ?",
        options: ["Non", "Oui (ex: ORDER BY city, name)", "Oui avec AND", "Seulement si numériques"],
        answerIndex: 1,
        explanation: "C'est très courant pour départager les ex-aequo."
      },
      {
        question: "Où se place LIMIT ?",
        options: ["Au début", "Après FROM", "Dans le WHERE", "Tout à la fin"],
        answerIndex: 3,
        explanation: "C'est la dernière clause appliquée au résultat."
      },
      {
        question: "Si j'utilise LIMIT sans ORDER BY, le résultat est-il garanti ?",
        options: ["Oui", "Non, l'ordre est arbitraire", "Oui, par ID", "Oui, par date"],
        answerIndex: 1,
        explanation: "Sans ORDER BY, la base renvoie les lignes comme elle les trouve."
      }
    ]
  },

  'and-or-not': {
    slug: 'and-or-not',
    why: {
      title: 'Combiner les critères',
      content: "Le monde réel est nuancé. Vous ne cherchez pas juste 'les chaussures', mais 'les chaussures rouges EN taille 42 OU les chaussures bleues EN taille 44'. Les opérateurs logiques permettent de construire ces filtres complexes."
    },
    concept: {
      title: 'Logique Booléenne',
      content: "- **AND** : Il faut que TOUTES les conditions soient vraies.\n- **OR** : Il suffit qu'UNE SEULE condition soit vraie.\n- **NOT** : Inverse le résultat.\n\n**Attention à la priorité** : Le `AND` est prioritaire sur le `OR` (comme la multiplication sur l'addition). Utilisez toujours des parenthèses pour éviter les ambiguïtés !",
      syntax: "SELECT * FROM products\nWHERE (category = 'Toys' OR category = 'Games')\nAND price < 20;"
    },
    example: {
      title: 'Clients cibles',
      description: 'Nous cherchons les clients de France ou d\'Allemagne.',
      sql: "SELECT * FROM customers\nWHERE country = 'France' OR country = 'Germany';",
      result: "Retourne les clients de ces deux pays."
    },
    exercises: [
      {
        question: "Exercice 1 : Trouvez les produits 'Electronics' dont le prix est supérieur à 500.",
        solution: "SELECT * FROM products WHERE category = 'Electronics' AND price > 500;",
        explanation: "Les deux conditions doivent être remplies."
      },
      {
        question: "Exercice 2 (Challenge) : Trouvez les commandes qui sont soit 'Shipped', soit 'Delivered', mais dont le montant est inférieur à 50.",
        solution: "SELECT * FROM orders WHERE (status = 'Shipped' OR status = 'Delivered') AND amount < 50;",
        explanation: "Les parenthèses sont cruciales ici pour grouper les statuts."
      }
    ],
    quiz: [
      {
        question: "Quel est le résultat de : TRUE OR FALSE ?",
        options: ["TRUE", "FALSE", "NULL", "Erreur"],
        answerIndex: 0,
        explanation: "Avec OR, un seul VRAI suffit."
      },
      {
        question: "Quelle est la priorité par défaut ?",
        options: ["OR avant AND", "AND avant OR", "Gauche à droite", "Aucune"],
        answerIndex: 1,
        explanation: "AND lie plus fort que OR."
      },
      {
        question: "Comment exclure une condition ?",
        options: ["MINUS", "EXCEPT", "NOT", "NO"],
        answerIndex: 2,
        explanation: "Exemple: WHERE NOT country = 'USA'."
      },
      {
        question: "A AND B est vrai si :",
        options: ["A est vrai", "B est vrai", "A et B sont vrais", "A ou B est vrai"],
        answerIndex: 2,
        explanation: "C'est l'intersection stricte."
      },
      {
        question: "Pourquoi les parenthèses sont-elles importantes ?",
        options: ["Pour le style", "Pour forcer l'ordre d'évaluation", "Pour la performance", "Pour les commentaires"],
        answerIndex: 1,
        explanation: "Elles lèvent l'ambiguïté logique."
      }
    ]
  },

  'null-handling': {
    slug: 'null-handling',
    why: {
      title: 'L\'absence de données',
      content: "NULL est un concept unique en SQL. Ce n'est pas zéro, ce n'est pas une chaîne vide. C'est \"l'absence de valeur\" ou \"inconnu\". Une erreur fréquente est d'essayer de comparer NULL avec `=`. Cela ne marche jamais, car \"Inconnu\" n'est pas égal à \"Inconnu\"."
    },
    concept: {
      title: 'Gérer l\'inconnu',
      content: "- **IS NULL** : Pour tester si une case est vide.\n- **IS NOT NULL** : Pour tester si elle est remplie.\n- **COALESCE(col, 'defaut')** : Remplace NULL par une valeur par défaut lors de l'affichage.",
      syntax: "-- Incorrect\nWHERE city = NULL\n\n-- Correct\nWHERE city IS NULL\n\n-- Affichage propre\nSELECT COALESCE(phone, 'Non renseigné') FROM customers;"
    },
    example: {
      title: 'Clients sans ville renseignée',
      description: 'On veut identifier les profils incomplets.',
      sql: "SELECT full_name FROM customers\nWHERE city IS NULL;",
      result: "Liste des clients où la colonne city est vide."
    },
    exercises: [
      {
        question: "Exercice 1 : Trouvez les commandes dont le statut n'est pas encore défini (NULL).",
        solution: "SELECT * FROM orders WHERE status IS NULL;",
        explanation: "Utilisez IS NULL, jamais = NULL."
      },
      {
        question: "Exercice 2 (Challenge) : Affichez le nom du produit et sa catégorie. Si la catégorie est NULL, affichez 'Divers'.",
        solution: "SELECT name, COALESCE(category, 'Divers') FROM products;",
        explanation: "COALESCE prend le premier argument non-null."
      }
    ],
    quiz: [
      {
        question: "Que renvoie `SELECT * FROM table WHERE col = NULL` ?",
        options: ["Les lignes où col est vide", "Toutes les lignes", "Aucune ligne", "Erreur"],
        answerIndex: 2,
        explanation: "Toute comparaison avec NULL renvoie NULL (qui est traité comme Faux)."
      },
      {
        question: "Quelle fonction remplace un NULL ?",
        options: ["REPLACE()", "ISNULL()", "COALESCE()", "SWAP()"],
        answerIndex: 2,
        explanation: "Standard SQL pour fournir une valeur de repli."
      },
      {
        question: "NULL est-il égal à 0 ?",
        options: ["Oui", "Non", "Parfois", "Dépend de la base"],
        answerIndex: 1,
        explanation: "0 est une valeur (nombre). NULL est l'absence de valeur."
      },
      {
        question: "Comment exclure les valeurs NULL ?",
        options: ["WHERE col != NULL", "WHERE col IS NOT NULL", "WHERE col <> NULL", "WHERE NOT NULL"],
        answerIndex: 1,
        explanation: "IS NOT NULL est la seule syntaxe valide."
      },
      {
        question: "Dans un tri (ORDER BY), où vont les NULLs ?",
        options: ["Ils disparaissent", "Toujours au début", "Toujours à la fin", "Regroupés ensemble (début ou fin selon SGBD)"],
        answerIndex: 3,
        explanation: "Ils sont considérés comme une valeur spéciale et restent groupés."
      }
    ]
  },

  // --- MODULE 2: JOINTURES ET RELATIONS ---

  'inner-join': {
    slug: 'inner-join',
    why: {
      title: 'Connecter les données',
      content: "Dans une base de données relationnelle, les données sont découpées en tables distinctes pour éviter la répétition (Normalisation). Pour reconstruire l'information complète (ex: qui a acheté quoi ?), il faut recoller les morceaux. La jointure interne (INNER JOIN) est la colle la plus forte : elle ne garde que les paires qui existent des deux côtés."
    },
    concept: {
      title: 'L\'intersection (A ∩ B)',
      content: "L'INNER JOIN compare deux tables sur une colonne commune (la clé). Si une correspondance est trouvée, les deux lignes sont fusionnées. Si aucune correspondance n'existe (ex: un client n'a jamais commandé), la ligne est ignorée.",
      syntax: "SELECT customers.full_name, orders.amount\nFROM customers\nINNER JOIN orders \n  ON customers.customer_id = orders.customer_id;"
    },
    example: {
      title: 'Associer Commandes et Clients',
      description: 'Nous voulons voir le nom du client à côté de chaque montant de commande.',
      sql: "SELECT orders.order_id, customers.full_name, orders.amount\nFROM orders\nJOIN customers \n  ON orders.customer_id = customers.customer_id;",
      result: "| order_id | full_name  | amount |\n|----------|------------|--------|\n| 1024     | John Doe   | 1200   |\n| 1025     | John Doe   | 25     |"
    },
    exercises: [
      {
        question: "Exercice 1 : Affichez le nom du produit et la quantité pour chaque ligne de commande (tables: products, order_items).",
        solution: "SELECT p.name, oi.quantity \nFROM products p \nJOIN order_items oi ON p.product_id = oi.product_id;",
        explanation: "On utilise des alias (p, oi) pour raccourcir la requête."
      },
      {
        question: "Exercice 2 (Challenge) : Affichez l'ID de la commande, la date et le nom du client, mais seulement pour les commandes supérieures à 500€.",
        solution: "SELECT o.order_id, o.order_date, c.full_name\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nWHERE o.amount > 500;",
        explanation: "Le WHERE s'applique après la jointure pour filtrer le résultat combiné."
      }
    ],
    quiz: [
      {
        question: "Si un client n'a pas de commande, apparaît-il dans un INNER JOIN customers/orders ?",
        options: ["Oui, avec des NULL", "Non, il est exclu", "Oui, mais en rouge", "Ça dépend du SGBD"],
        answerIndex: 1,
        explanation: "INNER JOIN ne garde que l'intersection (ceux qui ont une correspondance)."
      },
      {
        question: "Le mot-clé INNER est-il obligatoire ?",
        options: ["Oui", "Non, JOIN suffit", "Oui, sinon c'est un LEFT JOIN", "Non, COMMA suffit"],
        answerIndex: 1,
        explanation: "JOIN est un raccourci standard pour INNER JOIN."
      },
      {
        question: "Comment gérer les colonnes de même nom (ex: id) dans deux tables ?",
        options: ["SQL devine", "Préfixer par le nom de table (table.col)", "Renommer la table", "Impossible"],
        answerIndex: 1,
        explanation: "L'ambiguïté doit être levée explicitement (ex: customers.id)."
      },
      {
        question: "Peut-on joindre plus de 2 tables ?",
        options: ["Non, max 2", "Oui, en enchaînant les JOIN", "Oui, avec des sous-requêtes seulement", "Oui, mais c'est très lent"],
        answerIndex: 1,
        explanation: "FROM t1 JOIN t2 ON ... JOIN t3 ON ..."
      },
      {
        question: "Quelle est la clause pour spécifier la condition de jointure ?",
        options: ["WHERE", "WITH", "ON", "BY"],
        answerIndex: 2,
        explanation: "INNER JOIN ... ON ..."
      }
    ]
  },

  'left-right-join': {
    slug: 'left-right-join',
    why: {
      title: 'Ne laisser personne derrière',
      content: "Parfois, l'absence d'information est une information en soi. Vous voulez la liste de TOUS les clients, même ceux qui n'ont rien acheté (pour les relancer). INNER JOIN les aurait masqués. LEFT JOIN permet de garder la table de gauche intacte et d'y attacher des données si elles existent."
    },
    concept: {
      title: 'Priorité à Gauche (ou Droite)',
      content: "- **LEFT JOIN** : Garde TOUTES les lignes de la table de gauche (la première citée). Si pas de match à droite, remplit avec NULL.\n- **RIGHT JOIN** : Idem mais garde la table de droite. Peu utilisé car on peut toujours réécrire en LEFT JOIN en inversant les tables.",
      syntax: "SELECT c.full_name, o.order_id\nFROM customers c\nLEFT JOIN orders o \n  ON c.customer_id = o.customer_id;"
    },
    example: {
      title: 'Clients sans commandes',
      description: 'On veut tous les clients. Si un client n\'a pas de commande, order_id sera NULL.',
      sql: "SELECT c.full_name, o.amount\nFROM customers c\nLEFT JOIN orders o \n  ON c.customer_id = o.customer_id;",
      result: "| full_name | amount |\n|-----------|--------|\n| John Doe  | 1200   |\n| New User  | NULL   |"
    },
    exercises: [
      {
        question: "Exercice 1 : Affichez tous les produits, et pour ceux qui ont été vendus, la quantité (table order_items).",
        solution: "SELECT p.name, oi.quantity\nFROM products p\nLEFT JOIN order_items oi ON p.product_id = oi.product_id;",
        explanation: "Les produits jamais vendus auront 'quantity' à NULL."
      },
      {
        question: "Exercice 2 (Challenge) : Trouvez les clients qui n'ont JAMAIS passé de commande (indice: utilisez IS NULL).",
        solution: "SELECT c.full_name\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL;",
        explanation: "C'est un pattern classique : LEFT JOIN + WHERE IS NULL pour trouver les orphelins."
      }
    ],
    quiz: [
      {
        question: "Que contient la colonne de droite s'il n'y a pas de correspondance ?",
        options: ["0", "Vide", "NULL", "Une erreur"],
        answerIndex: 2,
        explanation: "NULL signifie 'pas de valeur'."
      },
      {
        question: "A LEFT JOIN B est-il égal à B LEFT JOIN A ?",
        options: ["Oui", "Non", "Seulement si tables identiques", "Oui si INNER"],
        answerIndex: 1,
        explanation: "L'ordre compte : la table 'principale' change."
      },
      {
        question: "Quand utiliser RIGHT JOIN ?",
        options: ["Tout le temps", "Jamais (préférence personnelle)", "Quand la table de droite est plus petite", "Pour la performance"],
        answerIndex: 1,
        explanation: "Il est syntaxiquement valide mais on préfère souvent tout écrire en LEFT JOIN pour la lisibilité (lecture de gauche à droite)."
      },
      {
        question: "Si j'ajoute `WHERE o.amount > 100` sur un LEFT JOIN, que se passe-t-il ?",
        options: ["Rien de spécial", "Ça annule le LEFT JOIN (devient INNER)", "Ça plante", "Ça filtre les NULLs"],
        answerIndex: 1,
        explanation: "Si vous filtrez une valeur sur la table de droite, les NULLs (qui n'ont pas de valeur) sont éliminés, transformant la requête en INNER JOIN implicite."
      },
      {
        question: "Comment compter le nombre de commandes par client (incluant 0) ?",
        options: ["COUNT(order_id) avec INNER JOIN", "COUNT(order_id) avec LEFT JOIN", "SUM(order_id)", "COUNT(*)"],
        answerIndex: 1,
        explanation: "Le LEFT JOIN assure que le client est présent, et COUNT(col) ne compte pas les NULLs (donc renvoie 0)."
      }
    ]
  },

  'full-outer-join': {
    slug: 'full-outer-join',
    why: {
      title: 'L\'Union Totale',
      content: "Parfois, vous avez deux listes qui se chevauchent partiellement, et vous ne voulez perdre personne. Ni les orphelins de gauche, ni les orphelins de droite. FULL OUTER JOIN est l'union complète des deux ensembles."
    },
    concept: {
      title: 'Tout garder',
      content: "FULL JOIN combine les effets de LEFT JOIN et RIGHT JOIN. \n- Match trouvé : Lignes fusionnées.\n- Pas de match à droite : NULL à droite.\n- Pas de match à gauche : NULL à gauche.\n\n*Note : SQLite ne supporte pas FULL JOIN nativement, mais la plupart des SGBD (Postgres, SQL Server) oui.*",
      syntax: "SELECT * \nFROM tableA \nFULL OUTER JOIN tableB \n  ON tableA.id = tableB.id;"
    },
    example: {
      title: 'Comparaison de listes',
      description: 'Imaginez une table "Employés" et une table "BadgeAccès". Certains employés n\'ont pas de badge, et certains badges ne sont assignés à personne.',
      sql: "-- Exemple théorique\nSELECT emp.name, badge.code\nFROM employees emp\nFULL JOIN badges badge \n  ON emp.id = badge.emp_id;",
      result: "| name  | code |\n|-------|------|\n| Alice | B01  | (Match)\n| Bob   | NULL | (Pas de badge)\n| NULL  | B99  | (Badge orphelin)"
    },
    exercises: [
      {
        question: "Exercice 1 : Écrivez la requête pour obtenir TOUS les clients et TOUTES les commandes, qu'ils soient liés ou non.",
        solution: "SELECT c.full_name, o.order_id\nFROM customers c\nFULL OUTER JOIN orders o ON c.customer_id = o.customer_id;",
        explanation: "Cela affichera les clients sans commande ET les commandes orphelines (si elles existaient)."
      },
      {
        question: "Exercice 2 (Challenge) : Comment simuler un FULL JOIN si votre base ne le supporte pas (comme SQLite) ?",
        solution: "SELECT ... LEFT JOIN ... \nUNION \nSELECT ... LEFT JOIN ... (avec tables inversées)",
        explanation: "On fait l'union des deux cas (Gauche + Droite)."
      }
    ],
    quiz: [
      {
        question: "FULL JOIN renvoie-t-il plus ou moins de lignes que INNER JOIN ?",
        options: ["Moins", "Autant", "Plus ou autant", "Toujours double"],
        answerIndex: 2,
        explanation: "Il contient l'INNER JOIN + les rejets des deux côtés."
      },
      {
        question: "Quelle valeur remplit les trous ?",
        options: ["0", "NULL", "Vide", "N/A"],
        answerIndex: 1,
        explanation: "Toujours NULL."
      },
      {
        question: "Est-ce que MySQL supporte FULL JOIN ?",
        options: ["Oui", "Non", "Partiellement", "Via Plugin"],
        answerIndex: 1,
        explanation: "MySQL (historiquement) ne le supporte pas directement, il faut utiliser UNION."
      },
      {
        question: "Dans quel cas FULL JOIN est-il utile ?",
        options: ["Pour la performance", "Pour synchroniser/comparer deux systèmes", "Pour filtrer", "Pour trier"],
        answerIndex: 1,
        explanation: "Très utile pour détecter les écarts de données entre deux sources."
      },
      {
        question: "La clause ON est-elle obligatoire ?",
        options: ["Oui", "Non", "Seulement pour LEFT", "Non, CROSS suffit"],
        answerIndex: 0,
        explanation: "Toute jointure explicite (sauf CROSS) nécessite une condition de liaison."
      }
    ]
  },

  'cross-join': {
    slug: 'cross-join',
    why: {
      title: 'Toutes les combinaisons possibles',
      content: "Le CROSS JOIN est particulier : il ne cherche pas de correspondance. Il associe CHAQUE ligne de la table A avec CHAQUE ligne de la table B. C'est un produit cartésien (Multiplication). Si A a 10 lignes et B a 5 lignes, le résultat aura 50 lignes."
    },
    concept: {
      title: 'Le Produit Cartésien (A x B)',
      content: "Utile pour générer des matrices (ex: chaque produit x chaque couleur), des calendriers ou des données de test. \n\n**Danger** : Sur de grosses tables, le résultat explose (1M x 1M = 1000 Milliards de lignes -> Crash).",
      syntax: "SELECT p.name, c.full_name\nFROM products p\nCROSS JOIN customers c;"
    },
    example: {
      title: 'Grille de possibilités',
      description: 'Nous voulons une liste de toutes les paires possibles Client/Produit pour une campagne marketing massive.',
      sql: "SELECT c.full_name, p.name \nFROM customers c \nCROSS JOIN products p \nLIMIT 5;",
      result: "| full_name | name           |\n|-----------|----------------|\n| John Doe  | Laptop Pro X   |\n| John Doe  | Wireless Mouse |\n| John Doe  | HD Monitor     |\n| Alice...  | Laptop Pro X   |..."
    },
    exercises: [
      {
        question: "Exercice 1 : Générez toutes les combinaisons possibles entre la table 'customers' et la table 'products'.",
        solution: "SELECT * FROM customers CROSS JOIN products;",
        explanation: "Attention au volume de données généré."
      },
      {
        question: "Exercice 2 (Challenge) : Que se passe-t-il si vous faites `SELECT * FROM A, B` sans clause WHERE ?",
        solution: "C'est un CROSS JOIN implicite (ancienne syntaxe).",
        explanation: "C'est une erreur fréquente quand on oublie le `ON ...`."
      }
    ],
    quiz: [
      {
        question: "Si Table A a 10 lignes et Table B a 10 lignes, combien de lignes retourne CROSS JOIN ?",
        options: ["10", "20", "100", "0"],
        answerIndex: 2,
        explanation: "10 x 10 = 100."
      },
      {
        question: "CROSS JOIN a-t-il besoin d'une clause ON ?",
        options: ["Oui", "Non", "Parfois", "Toujours"],
        answerIndex: 1,
        explanation: "Il n'y a pas de condition de correspondance, c'est un mélange total."
      },
      {
        question: "Quel est le risque principal du CROSS JOIN ?",
        options: ["Perte de données", "Performance / Explosion du volume", "Doublons", "Erreur de syntaxe"],
        answerIndex: 1,
        explanation: "Le nombre de lignes croît exponentiellement."
      },
      {
        question: "Quelle est l'autre syntaxe pour CROSS JOIN ?",
        options: ["JOIN sans ON", "Virgule (FROM A, B)", "FULL JOIN", "MERGE"],
        answerIndex: 1,
        explanation: "La syntaxe `FROM A, B` est l'ancienne façon d'écrire une jointure, qui par défaut est un produit cartésien."
      },
      {
        question: "Utilité principale ?",
        options: ["Retrouver des IDs", "Générer des combinaisons (tailles/couleurs)", "Filtrer des dates", "Trier"],
        answerIndex: 1,
        explanation: "Créer des grilles de référence."
      }
    ]
  },

  'union': {
    slug: 'union',
    why: {
      title: 'Empiler les résultats',
      content: "Les JOINs étendent les données horizontalement (ajoutent des colonnes). UNION étend les données verticalement (ajoute des lignes). C'est utile pour combiner deux listes de même nature provenant de tables différentes (ex: Clients France + Clients USA, ou Archives 2023 + Actif 2024)."
    },
    concept: {
      title: 'UNION vs UNION ALL',
      content: "- **UNION** : Combine les résultats et **supprime les doublons** (plus lent car doit trier/comparer).\n- **UNION ALL** : Combine tout, garde les doublons (très rapide).\n\n**Contraintes** : Le nombre de colonnes et leurs types doivent être identiques dans les deux requêtes.",
      syntax: "SELECT city FROM customers\nUNION\nSELECT city FROM suppliers;"
    },
    example: {
      title: 'Liste unique de villes',
      description: 'Quelles sont toutes les villes où nous avons soit un client, soit une livraison ? (Supposons une table shipping_destinations fictive pour l\'exemple, ou utilisons customers deux fois).',
      sql: "-- Villes des clients (USA) + Villes des clients (France)\nSELECT city FROM customers WHERE country='USA'\nUNION\nSELECT city FROM customers WHERE country='France';",
      result: "| city      |\n|-----------|\n| New York  |\n| Paris     |\n| Lyon      |"
    },
    exercises: [
      {
        question: "Exercice 1 : Combinez la liste des noms des clients et la liste des noms des produits dans une seule colonne 'Nom'.",
        solution: "SELECT full_name as Nom FROM customers\nUNION ALL\nSELECT name as Nom FROM products;",
        explanation: "On utilise un alias commun pour la propreté, et UNION ALL pour tout garder."
      },
      {
        question: "Exercice 2 (Challenge) : Sélectionnez les montants des commandes > 1000 ET les montants < 50. Utilisez UNION.",
        solution: "SELECT amount FROM orders WHERE amount > 1000\nUNION\nSELECT amount FROM orders WHERE amount < 50;",
        explanation: "C'est une alternative à l'opérateur OR."
      }
    ],
    quiz: [
      {
        question: "Quelle est la différence entre UNION et UNION ALL ?",
        options: ["Aucune", "UNION trie, UNION ALL filtre", "UNION dédoublonne, UNION ALL garde tout", "UNION ALL est plus lent"],
        answerIndex: 2,
        explanation: "UNION fait un DISTINCT implicite."
      },
      {
        question: "Peut-on faire un UNION entre une colonne Texte et une colonne Nombre ?",
        options: ["Oui", "Non, erreur de type", "Oui, le nombre devient texte", "Ça dépend"],
        answerIndex: 1,
        explanation: "Les types doivent être compatibles (ou convertis explicitement)."
      },
      {
        question: "Si la requête A a 3 colonnes et la requête B en a 2 ?",
        options: ["Ça marche", "Ça complète par NULL", "Erreur SQL", "Ça ignore la 3ème"],
        answerIndex: 2,
        explanation: "Le nombre de colonnes doit être strictement identique."
      },
      {
        question: "Les noms des colonnes dans le résultat final viennent de...",
        options: ["La première requête", "La seconde requête", "Un mélange", "C'est aléatoire"],
        answerIndex: 0,
        explanation: "L'entête est défini par le premier SELECT."
      },
      {
        question: "Peut-on utiliser ORDER BY dans un UNION ?",
        options: ["Non", "Oui, à la toute fin uniquement", "Oui, dans chaque sous-requête", "Oui, au début"],
        answerIndex: 1,
        explanation: "Le tri s'applique au résultat global combiné."
      }
    ]
  },

  // --- MODULE 3: AGRÉGATIONS ET GROUPEMENT ---

  'aggregate-functions': {
    slug: 'aggregate-functions',
    objectives: [
      "Comprendre le rôle des fonctions d'agrégation.",
      "Maîtriser COUNT, SUM, AVG, MIN, MAX.",
      "Comprendre l'impact des valeurs NULL sur les calculs."
    ],
    why: {
      title: 'Synthétiser l\'information',
      content: "Afficher 1 million de commandes est inutile pour un décideur. Il veut savoir : Combien avons-nous vendu ? Quel est le panier moyen ? Quel est le produit le plus cher ? Les agrégations transforment les données brutes en indicateurs clés (KPIs)."
    },
    concept: {
      title: 'Réduire N lignes en 1 valeur',
      content: "Une fonction d'agrégation prend une colonne entière et renvoie une seule valeur.\n\n**Fonctions Clés :**\n- `COUNT(*)` : Compte toutes les lignes.\n- `COUNT(col)` : Compte les valeurs **non-NULL**.\n- `SUM(col)` : Somme des valeurs (numérique).\n- `AVG(col)` : Moyenne (ignore les NULLs).\n- `MIN(col)` / `MAX(col)` : Minimum et Maximum.\n\n**Note sur NULL :** Toutes les fonctions (sauf `COUNT(*)`) ignorent les NULLs. Si vous faites la moyenne de `[10, NULL, 20]`, le résultat est 15 (30/2), pas 10 (30/3).",
      syntax: "SELECT COUNT(*) as total_orders,\n       AVG(amount) as avg_amount\nFROM orders;"
    },
    example: {
      title: 'Analyse des ventes',
      description: 'Calculons des statistiques globales sur toutes les commandes.',
      sql: "SELECT \n  COUNT(*) as nb_commandes,\n  SUM(amount) as ca_total,\n  MAX(amount) as commande_max\nFROM orders;",
      result: "| nb_commandes | ca_total | commande_max |\n|--------------|----------|--------------|\n| 50           | 12500    | 1200         |"
    },
    exercises: [
      {
        question: "Exercice 1 : Comptez combien de produits existent dans la catégorie 'Electronics'.",
        solution: "SELECT COUNT(*) FROM products WHERE category = 'Electronics';",
        explanation: "On filtre d'abord, puis on compte les lignes restantes."
      },
      {
        question: "Exercice 2 (Challenge) : Calculez le prix moyen des produits dont le prix est supérieur à 50.",
        solution: "SELECT AVG(price) FROM products WHERE price > 50;",
        explanation: "La moyenne ne prendra en compte que les produits filtrés."
      }
    ],
    quiz: [
      {
        question: "Quelle fonction compte les lignes, y compris celles avec des NULLs ?",
        options: ["COUNT(id)", "COUNT(NULL)", "COUNT(*)", "SUM(1)"],
        answerIndex: 2,
        explanation: "COUNT(*) est la seule forme qui ne regarde pas le contenu des colonnes."
      },
      {
        question: "Si j'ai 3 lignes : 10, NULL, 20. Que renvoie AVG() ?",
        options: ["10", "15", "NULL", "Erreur"],
        answerIndex: 1,
        explanation: "(10 + 20) / 2 = 15. Le NULL est ignoré."
      },
      {
        question: "Peut-on utiliser SUM() sur du texte ?",
        options: ["Oui, ça concatène", "Non, erreur de type", "Oui, ça compte les caractères", "Ça dépend"],
        answerIndex: 1,
        explanation: "SUM nécessite des données numériques."
      },
      {
        question: "Quelle fonction utiliser pour trouver la date la plus récente ?",
        options: ["LATEST()", "MAX()", "TOP()", "NEW()"],
        answerIndex: 1,
        explanation: "MAX() fonctionne sur les dates (la plus grande date est la plus future)."
      },
      {
        question: "Où se placent les fonctions d'agrégation ?",
        options: ["Dans le FROM", "Dans le SELECT (ou HAVING)", "Dans le WHERE", "Dans le GROUP BY"],
        answerIndex: 1,
        explanation: "On ne peut pas utiliser d'agrégat dans le WHERE (c'est le rôle du HAVING)."
      }
    ],
    summary: [
      "COUNT(*) compte tout, COUNT(col) ignore les NULLs.",
      "AVG et SUM ignorent les NULLs (attention aux moyennes faussées).",
      "MIN et MAX fonctionnent sur les nombres, textes et dates.",
      "Les agrégats se font souvent après un filtre WHERE.",
      "On ne peut pas utiliser d'agrégat directement dans le WHERE."
    ]
  },

  'group-by': {
    slug: 'group-by',
    objectives: [
      "Créer des sous-groupes de données.",
      "Combiner agrégats et colonnes de dimension.",
      "Comprendre la règle stricte du SELECT."
    ],
    why: {
      title: 'Segmenter pour mieux régner',
      content: "Savoir que le CA total est de 1M€, c'est bien. Savoir qu'il vient à 80% de la France, c'est mieux. GROUP BY permet de découper les agrégats par catégorie (par pays, par vendeur, par mois)."
    },
    concept: {
      title: 'Split - Apply - Combine',
      content: "1. **Split** : SQL divise la table en petits paquets (ex: un paquet pour 'France', un pour 'USA').\n2. **Apply** : Il applique l'agrégat (ex: SUM) sur chaque paquet individuellement.\n3. **Combine** : Il recolle les résultats.\n\n**Règle Cruciale** : Si vous utilisez GROUP BY, le SELECT ne peut contenir QUE :\n- Les colonnes présentes dans le GROUP BY.\n- Des fonctions d'agrégation.\nTout le reste est interdit (quelle valeur choisirait-il sinon ?).",
      syntax: "SELECT country, COUNT(*) \nFROM customers \nGROUP BY country;"
    },
    example: {
      title: 'Revenu par Produit',
      description: 'Nous voulons savoir combien chaque produit a rapporté (Prix * Quantité vendue).',
      sql: "SELECT p.name, SUM(p.price * oi.quantity) as revenue\nFROM products p\nJOIN order_items oi ON p.product_id = oi.product_id\nGROUP BY p.name;",
      result: "| name           | revenue |\n|----------------|---------|\n| Laptop Pro X   | 12000   |\n| Wireless Mouse | 500     |"
    },
    exercises: [
      {
        question: "Exercice 1 : Calculez le nombre total d'articles vendus (quantity) pour chaque product_id (table order_items).",
        solution: "SELECT product_id, SUM(quantity) FROM order_items GROUP BY product_id;",
        explanation: "On groupe par ID produit et on somme les quantités."
      },
      {
        question: "Exercice 2 (Challenge) : Calculez le montant total dépensé par chaque client (table orders), trié du plus gros acheteur au plus petit.",
        solution: "SELECT customer_id, SUM(amount) as total FROM orders GROUP BY customer_id ORDER BY total DESC;",
        explanation: "GROUP BY est souvent suivi d'un ORDER BY sur l'agrégat."
      }
    ],
    quiz: [
      {
        question: "Si je fais `GROUP BY city`, puis-je faire `SELECT country` ?",
        options: ["Oui", "Non, sauf si country est aussi dans GROUP BY", "Oui, SQL prend le premier", "Oui, SQL prend au hasard"],
        answerIndex: 1,
        explanation: "Toute colonne non-agrégée du SELECT doit être dans le GROUP BY."
      },
      {
        question: "Peut-on grouper par plusieurs colonnes ?",
        options: ["Non", "Oui (ex: GROUP BY city, gender)", "Seulement 2 max", "Oui mais c'est lent"],
        answerIndex: 1,
        explanation: "Cela crée une ligne par combinaison unique."
      },
      {
        question: "Quel est l'ordre correct ?",
        options: ["GROUP BY > WHERE", "WHERE > GROUP BY", "HAVING > WHERE", "SELECT > GROUP BY"],
        answerIndex: 1,
        explanation: "On filtre les lignes (WHERE), PUIS on groupe."
      },
      {
        question: "Si j'oublie le GROUP BY avec un agrégat et une colonne, que se passe-t-il ?",
        options: ["Ça marche", "Erreur SQL", "Ça groupe tout", "Ça renvoie NULL"],
        answerIndex: 1,
        explanation: "Erreur classique : 'Column X must appear in the GROUP BY clause'."
      },
      {
        question: "COUNT(*) avec GROUP BY compte :",
        options: ["Le total de la table", "Le nombre de lignes par groupe", "Le nombre de groupes", "1"],
        answerIndex: 1,
        explanation: "L'agrégat s'applique à chaque 'paquet'."
      }
    ],
    summary: [
      "GROUP BY divise les données en paquets logiques.",
      "Toute colonne dans SELECT (hors agrégat) DOIT être dans GROUP BY.",
      "On peut grouper par plusieurs colonnes (ex: Pays ET Ville).",
      "L'ordre est toujours : FROM > WHERE > GROUP BY > SELECT.",
      "Permet de passer de l'analyse globale à l'analyse par segment."
    ]
  },

  'having': {
    slug: 'having',
    objectives: [
      "Filtrer les résultats agrégés.",
      "Distinguer WHERE et HAVING.",
      "Écrire des conditions complexes sur des groupes."
    ],
    why: {
      title: 'Filtrer après calcul',
      content: "Supposons que vous vouliez trouver les 'Meilleurs Clients' (ceux qui ont dépensé plus de 1000€). Vous ne pouvez pas utiliser `WHERE amount > 1000` car le WHERE regarde chaque commande individuellement. Vous devez d'abord faire la SOMME, et ensuite filtrer le résultat. C'est le rôle de HAVING."
    },
    concept: {
      title: 'WHERE vs HAVING',
      content: "- **WHERE** : Filtre les lignes **avant** le groupement (Input).\n- **HAVING** : Filtre les groupes **après** l'agrégation (Output).\n\nSi vous filtrez sur une colonne brute (ex: `city`), c'est WHERE. Si vous filtrez sur un calcul (ex: `SUM(amount)`), c'est HAVING.",
      syntax: "SELECT customer_id, SUM(amount)\nFROM orders\nGROUP BY customer_id\nHAVING SUM(amount) > 1000;"
    },
    example: {
      title: 'Villes actives',
      description: 'Trouvons les villes qui ont au moins 2 clients enregistrés.',
      sql: "SELECT city, COUNT(*)\nFROM customers\nGROUP BY city\nHAVING COUNT(*) >= 2;",
      result: "| city     | count |\n|----------|-------|\n| New York | 5     |\n| Paris    | 3     |"
    },
    exercises: [
      {
        question: "Exercice 1 : Trouvez les catégories de produits qui ont un prix moyen supérieur à 50.",
        solution: "SELECT category, AVG(price) FROM products GROUP BY category HAVING AVG(price) > 50;",
        explanation: "On groupe par catégorie, on calcule la moyenne, puis on filtre."
      },
      {
        question: "Exercice 2 (Challenge) : Trouvez les clients qui ont passé plus d'une commande (table orders).",
        solution: "SELECT customer_id FROM orders GROUP BY customer_id HAVING COUNT(*) > 1;",
        explanation: "On compte les lignes par client."
      }
    ],
    quiz: [
      {
        question: "Peut-on utiliser HAVING sans GROUP BY ?",
        options: ["Non, jamais", "Oui, pour filtrer un agrégat global", "Oui, c'est comme WHERE", "Seulement dans MySQL"],
        answerIndex: 1,
        explanation: "C'est rare mais possible (ex: HAVING COUNT(*) > 0)."
      },
      {
        question: "HAVING SUM(amount) > 100 : Quand est-ce évalué ?",
        options: ["Avant le GROUP BY", "Après le GROUP BY", "Avant le WHERE", "En même temps que FROM"],
        answerIndex: 1,
        explanation: "C'est un filtre post-agrégation."
      },
      {
        question: "WHERE SUM(amount) > 100 est-il valide ?",
        options: ["Oui", "Non", "Oui si MySQL", "Oui si Postgres"],
        answerIndex: 1,
        explanation: "Non, WHERE ne connaît pas les agrégats."
      },
      {
        question: "Peut-on mettre plusieurs conditions dans HAVING ?",
        options: ["Non", "Oui avec AND/OR", "Oui avec virgules", "Non, une seule"],
        answerIndex: 1,
        explanation: "Comme WHERE, il accepte les opérateurs logiques."
      },
      {
        question: "Est-il plus performant de filtrer dans WHERE ou HAVING ?",
        options: ["Pareil", "WHERE est mieux (réduit les données tôt)", "HAVING est mieux", "Dépend de la météo"],
        answerIndex: 1,
        explanation: "Il faut toujours filtrer le plus tôt possible (WHERE) si l'agrégat n'est pas nécessaire pour le filtre."
      }
    ],
    summary: [
      "WHERE filtre les lignes brutes.",
      "HAVING filtre les résultats d'agrégation.",
      "HAVING vient après GROUP BY.",
      "On ne peut pas mettre d'agrégat dans WHERE.",
      "Pour la performance, préférez WHERE quand c'est possible."
    ]
  },

  'distinct': {
    slug: 'distinct',
    objectives: [
      "Identifier les valeurs uniques.",
      "Utiliser DISTINCT sur plusieurs colonnes.",
      "Comprendre la différence avec GROUP BY."
    ],
    why: {
      title: 'Éliminer le bruit',
      content: "Parfois, vous ne voulez pas compter, vous voulez juste la liste. 'Quels sont les pays où nous avons des clients ?'. Si vous avez 1000 clients en France, vous ne voulez pas voir 'France' 1000 fois, mais une seule fois."
    },
    concept: {
      title: 'Dédoublonnage',
      content: "`DISTINCT` s'applique à toute la ligne sélectionnée. Si vous sélectionnez plusieurs colonnes, c'est la combinaison unique qui est gardée.\n\nNote : `DISTINCT` est souvent équivalent à un `GROUP BY` sans agrégat, mais il est plus clair pour exprimer l'intention de 'lister les uniques'.",
      syntax: "SELECT DISTINCT country FROM customers;\n\nSELECT DISTINCT city, country FROM customers;"
    },
    example: {
      title: 'Pays actifs',
      description: 'Liste simple des pays présents dans la base.',
      sql: "SELECT DISTINCT country \nFROM customers \nORDER BY country;",
      result: "| country |\n|---------|\n| France  |\n| USA     |"
    },
    exercises: [
      {
        question: "Exercice 1 : Listez les différentes catégories de produits disponibles.",
        solution: "SELECT DISTINCT category FROM products;",
        explanation: "Renvoie chaque catégorie une seule fois."
      },
      {
        question: "Exercice 2 (Challenge) : Listez les IDs des produits qui ont été vendus au moins une fois (table order_items).",
        solution: "SELECT DISTINCT product_id FROM order_items;",
        explanation: "Même si un produit est vendu 50 fois, il n'apparaît qu'une fois."
      }
    ],
    quiz: [
      {
        question: "SELECT DISTINCT a, b FROM table : Que se passe-t-il ?",
        options: ["Unique a", "Unique b", "Combinaison unique (a, b)", "Erreur"],
        answerIndex: 2,
        explanation: "Le dédoublonnage se fait sur l'ensemble des colonnes demandées."
      },
      {
        question: "Quelle est la différence de résultat entre DISTINCT et GROUP BY (sans agrégat) ?",
        options: ["Aucune (généralement)", "DISTINCT trie automatiquement", "GROUP BY est plus rapide", "DISTINCT enlève les NULLs"],
        answerIndex: 0,
        explanation: "Le résultat est le même. GROUP BY est préféré si on prévoit d'ajouter des calculs."
      },
      {
        question: "Peut-on faire COUNT(DISTINCT col) ?",
        options: ["Oui", "Non", "Seulement sur ID", "Jamais"],
        answerIndex: 0,
        explanation: "Très utile ! Ex: COUNT(DISTINCT user_id) pour compter les visiteurs uniques."
      },
      {
        question: "DISTINCT est-il coûteux en performance ?",
        options: ["Non, c'est gratuit", "Oui, car il faut trier/comparer tout", "Seulement sur les nombres", "Moins que SELECT *"],
        answerIndex: 1,
        explanation: "Dédoublonner implique souvent un tri coûteux sur de gros volumes."
      },
      {
        question: "Où se place le mot-clé DISTINCT ?",
        options: ["Après FROM", "Juste après SELECT", "À la fin", "Dans WHERE"],
        answerIndex: 1,
        explanation: "SELECT DISTINCT col1..."
      }
    ],
    summary: [
      "DISTINCT supprime les doublons dans le résultat final.",
      "Fonctionne sur une ou plusieurs colonnes (combinaisons).",
      "COUNT(DISTINCT col) compte les valeurs uniques.",
      "Souvent interchangeable avec GROUP BY pour les listes simples.",
      "Attention à la performance sur les très grosses tables."
    ]
  },

  // --- MODULE 4: MANIPULATION DE DONNÉES (DML) ---

  'insert': {
    slug: 'insert',
    objectives: [
      "Insérer des lignes simples dans une table.",
      "Gérer l'insertion multiple (Batch).",
      "Comprendre l'importance de l'ordre des colonnes.",
      "Gérer les contraintes (NOT NULL)."
    ],
    why: {
      title: 'Peupler la base de données',
      content: "Une base de données vide n'a aucune valeur. L'instruction `INSERT` est la porte d'entrée de toute nouvelle information dans votre système, que ce soit une nouvelle commande client ou l'inscription d'un utilisateur."
    },
    concept: {
      title: 'Ajouter des lignes',
      content: "L'instruction `INSERT INTO` ajoute de nouveaux enregistrements. Vous devez spécifier la table cible, les colonnes que vous remplissez, et les valeurs correspondantes.\n\n**Bonnes Pratiques :**\n- Listez toujours explicitement les colonnes : `INSERT INTO table (col1, col2) ...`. Ne vous fiez pas à l'ordre implicite.\n- Les chaînes de caractères (strings) doivent être entre guillemets simples `'`.\n- Les valeurs doivent correspondre aux types de données (ne mettez pas de texte dans un champ entier).",
      syntax: "-- Insertion simple\nINSERT INTO products (name, price)\nVALUES ('New Gadget', 99.99);\n\n-- Insertion multiple (plus rapide)\nINSERT INTO products (name, price)\nVALUES \n  ('A', 10),\n  ('B', 20);"
    },
    example: {
      title: 'Nouveau Client',
      description: 'Ajoutons un client dans la base. Notez que customer_id est souvent auto-généré (SERIAL/AUTO_INCREMENT), donc on l\'omet.',
      sql: "INSERT INTO customers (full_name, city, country)\nVALUES ('Marie Curie', 'Paris', 'France');",
      result: "| customer_id | full_name   | city  | country |\n|-------------|-------------|-------|---------|\n| 101         | Marie Curie | Paris | France  |"
    },
    exercises: [
      {
        question: "Exercice 1 : Insérez un nouveau produit 'Super Laptop' dans la catégorie 'Electronics' avec un prix de 1500.",
        solution: "INSERT INTO products (name, category, price) VALUES ('Super Laptop', 'Electronics', 1500);",
        explanation: "L'ordre des valeurs doit correspondre exactement à l'ordre des colonnes déclarées."
      },
      {
        question: "Exercice 2 (Challenge) : Insérez deux commandes d'un coup pour le client ID 1. (order_date: '2023-01-01', status: 'Pending', montants: 100 et 200).",
        solution: "INSERT INTO orders (customer_id, order_date, amount, status)\nVALUES \n  (1, '2023-01-01', 100, 'Pending'),\n  (1, '2023-01-01', 200, 'Pending');",
        explanation: "Utilisez une seule requête avec des virgules pour séparer les tuples de valeurs."
      }
    ],
    quiz: [
      {
        question: "Que se passe-t-il si je ne liste pas les colonnes dans INSERT INTO table VALUES (...) ?",
        options: ["Cela ne marche jamais", "Je dois fournir une valeur pour CHAQUE colonne dans l'ordre exact de création", "SQL devine les colonnes", "Cela insère des NULL partout"],
        answerIndex: 1,
        explanation: "C'est risqué car si la structure de la table change (nouvelle colonne), votre code plantera."
      },
      {
        question: "Peut-on insérer NULL dans une colonne définie comme NOT NULL ?",
        options: ["Oui", "Non, cela génère une erreur", "Oui, c'est converti en 0 ou vide", "Seulement si admin"],
        answerIndex: 1,
        explanation: "La contrainte d'intégrité bloque l'insertion."
      },
      {
        question: "Quelle est la méthode la plus performante pour insérer 1000 lignes ?",
        options: ["1000 requêtes INSERT individuelles", "1 requête INSERT avec 1000 lignes (batch)", "Utiliser UPDATE", "Utiliser un fichier JSON"],
        answerIndex: 1,
        explanation: "Le batching réduit drastiquement les allers-retours réseau et la charge transactionnelle."
      },
      {
        question: "Si j'omets une colonne dans la liste, quelle valeur prend-elle ?",
        options: ["NULL ou sa valeur par défaut (DEFAULT)", "0", "Erreur", "La valeur de la ligne précédente"],
        answerIndex: 0,
        explanation: "Si aucune valeur par défaut n'est définie et que la colonne accepte NULL, ce sera NULL."
      },
      {
        question: "Comment insérer une chaîne contenant une apostrophe (ex: L'épée) ?",
        options: ["L'épée", "'L''épée'", "\"L'épée\"", "L\\'épée"],
        answerIndex: 1,
        explanation: "En SQL standard, on double l'apostrophe pour l'échapper."
      }
    ],
    summary: [
      "Utilisez toujours la liste explicite des colonnes.",
      "Privilégiez les insertions multiples (batch) pour la performance.",
      "Les types de données doivent correspondre (attention aux guillemets).",
      "Les colonnes omises prendront leur valeur par défaut ou NULL.",
      "Attention aux contraintes (Primary Key, Not Null) qui peuvent bloquer l'insert."
    ]
  },

  'update': {
    slug: 'update',
    objectives: [
      "Modifier des données existantes.",
      "Utiliser la clause WHERE pour cibler les modifications.",
      "Mettre à jour plusieurs colonnes simultanément.",
      "Éviter le piège de l'UPDATE sans WHERE."
    ],
    why: {
      title: 'L\'évolution de la donnée',
      content: "Les données ne sont pas statiques. Un client déménage, un prix change, une commande passe de 'En cours' à 'Livrée'. L'instruction UPDATE permet de refléter ces changements sans avoir à supprimer et recréer la ligne."
    },
    concept: {
      title: 'Modification ciblée',
      content: "`UPDATE` modifie les valeurs d'une ou plusieurs colonnes pour les lignes qui satisfont une condition.\n\n**Syntaxe :** `UPDATE table SET col1 = val1, col2 = val2 WHERE condition;`\n\n**Danger :** Si vous oubliez le `WHERE`, **TOUTES** les lignes de la table seront mises à jour. C'est une cause fréquente de désastre en production.",
      syntax: "-- Mise à jour sûre\nUPDATE products \nSET price = 25 \nWHERE product_id = 10;"
    },
    example: {
      title: 'Correction d\'adresse',
      description: 'Le client John Doe (ID 1) a déménagé à Lyon.',
      sql: "UPDATE customers\nSET city = 'Lyon'\nWHERE customer_id = 1;",
      result: "La ligne de John Doe a maintenant 'Lyon' comme ville. Les autres clients sont inchangés."
    },
    exercises: [
      {
        question: "Exercice 1 : Augmentez le prix de tous les produits de la catégorie 'Toys' de 10% (multipliez par 1.1).",
        solution: "UPDATE products SET price = price * 1.1 WHERE category = 'Toys';",
        explanation: "On peut utiliser la valeur actuelle de la colonne dans le calcul."
      },
      {
        question: "Exercice 2 (Challenge) : Marquez toutes les commandes du client 5 comme 'Delivered' ET mettez le montant à 0 (geste commercial).",
        solution: "UPDATE orders SET status = 'Delivered', amount = 0 WHERE customer_id = 5;",
        explanation: "On sépare les affectations de colonnes par une virgule."
      }
    ],
    quiz: [
      {
        question: "Que se passe-t-il si j'exécute `UPDATE users SET active = true;` sans WHERE ?",
        options: ["Erreur de syntaxe", "Seulement la première ligne est modifiée", "Toutes les lignes deviennent actives", "Rien"],
        answerIndex: 2,
        explanation: "Sans filtre, l'action s'applique à toute la table."
      },
      {
        question: "Peut-on mettre à jour plusieurs colonnes à la fois ?",
        options: ["Non", "Oui, séparées par des virgules", "Oui, séparées par AND", "Oui, avec plusieurs SET"],
        answerIndex: 1,
        explanation: "Ex: SET col1=1, col2=2."
      },
      {
        question: "Peut-on utiliser une sous-requête dans un UPDATE ?",
        options: ["Jamais", "Oui (ex: SET prix = (SELECT avg...))", "Seulement dans le WHERE", "Uniquement sous Oracle"],
        answerIndex: 1,
        explanation: "C'est puissant pour mettre à jour des données basées sur d'autres tables."
      },
      {
        question: "Comment annuler un UPDATE erroné si je n'ai pas encore fait COMMIT ?",
        options: ["CTRL+Z", "UNDO", "ROLLBACK", "RESET"],
        answerIndex: 2,
        explanation: "Si vous êtes dans une transaction, ROLLBACK annule tout."
      },
      {
        question: "Est-ce que UPDATE modifie l'ID de la ligne ?",
        options: ["Oui", "Non", "Oui, il recrée la ligne", "Ça dépend du SGBD"],
        answerIndex: 1,
        explanation: "L'identité (Primary Key) ne devrait généralement pas changer, mais c'est techniquement possible."
      }
    ],
    summary: [
      "N'oubliez JAMAIS la clause WHERE (sauf intention massive).",
      "On peut modifier plusieurs colonnes en une seule requête.",
      "On peut utiliser des calculs basés sur la valeur actuelle (ex: `score = score + 1`).",
      "Testez votre WHERE avec un SELECT avant de faire l'UPDATE pour vérifier ce que vous ciblez.",
      "Les modifications sont irréversibles si committées (sauf backup)."
    ]
  },

  'delete-vs-truncate': {
    slug: 'delete-vs-truncate',
    objectives: [
      "Supprimer des lignes spécifiques avec DELETE.",
      "Vider une table entière avec TRUNCATE.",
      "Comprendre les différences de performance et de sécurité (Logs, Rollback).",
      "Savoir réinitialiser les identifiants."
    ],
    why: {
      title: 'Faire le ménage',
      content: "Parfois, les données deviennent obsolètes, erronées ou doivent être purgées pour respecter le droit à l'oubli. Il existe deux manières principales de retirer des données : la méthode chirurgicale (`DELETE`) et la méthode radicale (`TRUNCATE`)."
    },
    concept: {
      title: 'Chirurgie vs Bulldozer',
      content: "- **DELETE** : Supprime ligne par ligne. Peut avoir un `WHERE`. Est consigné dans le journal des transactions (plus lent, annulable).\n- **TRUNCATE** : Vide toute la table d'un coup. Pas de `WHERE`. Réinitialise souvent les compteurs d'ID. Très rapide, mais parfois impossible à annuler (selon SGBD).",
      syntax: "-- Suppression ciblée\nDELETE FROM orders WHERE status = 'Cancelled';\n\n-- Vider la table\nTRUNCATE TABLE logs;"
    },
    example: {
      title: 'Supprimer un produit',
      description: 'Nous ne vendons plus le produit ID 99.',
      sql: "-- Sécurité : Vérifier d'abord !\nSELECT * FROM products WHERE product_id = 99;\n\n-- Action\nDELETE FROM products WHERE product_id = 99;",
      result: "La ligne 99 disparaît. Les trous d'ID restent."
    },
    exercises: [
      {
        question: "Exercice 1 : Supprimez toutes les commandes dont le montant est inférieur à 10.",
        solution: "DELETE FROM orders WHERE amount < 10;",
        explanation: "Suppression conditionnelle standard."
      },
      {
        question: "Exercice 2 (Challenge) : Quelle commande utiliser pour vider totalement la table 'temp_data' et remettre l'auto-incrément à 1 ?",
        solution: "TRUNCATE TABLE temp_data;",
        explanation: "TRUNCATE est optimisé pour cela et reset les séquences."
      }
    ],
    quiz: [
      {
        question: "Quelle commande est la plus rapide pour tout supprimer ?",
        options: ["DELETE *", "DELETE FROM table", "TRUNCATE TABLE", "DROP TABLE"],
        answerIndex: 2,
        explanation: "TRUNCATE ne loggue pas chaque suppression individuelle."
      },
      {
        question: "Peut-on utiliser WHERE avec TRUNCATE ?",
        options: ["Oui", "Non", "Seulement avec une option force", "Oui sur SQL Server"],
        answerIndex: 1,
        explanation: "TRUNCATE est tout ou rien."
      },
      {
        question: "DELETE sans WHERE fait quoi ?",
        options: ["Erreur", "Supprime tout", "Supprime la première ligne", "Demande confirmation"],
        answerIndex: 1,
        explanation: "Comme UPDATE, sans filtre, il agit sur toute la table."
      },
      {
        question: "Quelle commande supprime la table elle-même (structure) ?",
        options: ["DELETE", "TRUNCATE", "REMOVE", "DROP"],
        answerIndex: 3,
        explanation: "DROP TABLE détruit les données ET la structure."
      },
      {
        question: "Si je DELETE une ligne, l'ID est-il réutilisé ?",
        options: ["Oui", "Non (généralement)", "Oui après redémarrage", "Seulement si TRUNCATE"],
        answerIndex: 1,
        explanation: "Les trous dans les séquences d'ID sont normaux et permanents avec DELETE."
      }
    ],
    summary: [
      "DELETE pour cibler des lignes (WHERE). Lent pour tout supprimer.",
      "TRUNCATE pour vider la table. Rapide, reset les IDs.",
      "Vérifiez toujours avec un SELECT avant un DELETE.",
      "DELETE est une opération DML (transactionnelle).",
      "TRUNCATE est souvent considéré comme DDL (changement de structure de stockage)."
    ]
  },

  'transactions-intro': {
    slug: 'transactions-intro',
    objectives: [
      "Comprendre le concept d'atomicité (Tout ou Rien).",
      "Utiliser BEGIN, COMMIT et ROLLBACK.",
      "Garantir l'intégrité des données multi-tables."
    ],
    why: {
      title: 'Tout ou Rien',
      content: "Imaginez un virement bancaire : on débite A, on crédite B. Si le système plante entre les deux, l'argent disparaît ! Les transactions garantissent que ces deux opérations sont inséparables : soit elles réussissent toutes les deux, soit aucune ne se produit."
    },
    concept: {
      title: 'ACID et Contrôle',
      content: "Une transaction est une unité logique de travail.\n- **BEGIN** : Démarre la transaction.\n- **COMMIT** : Valide et sauvegarde définitivement les changements.\n- **ROLLBACK** : Annule tout ce qui a été fait depuis le BEGIN (en cas d'erreur).\n\nC'est la propriété **Atomicité** du modèle ACID.",
      syntax: "BEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;"
    },
    example: {
      title: 'Création de commande sécurisée',
      description: 'On doit créer la commande ET diminuer le stock. Si le stock échoue, on ne doit pas créer la commande.',
      sql: "BEGIN;\nINSERT INTO orders (customer_id, amount) VALUES (1, 500);\n-- Oups, erreur détectée ou stock insuffisant\nROLLBACK;\n-- Résultat : Aucune commande n'a été créée.",
      result: "La base de données est revenue à son état initial."
    },
    exercises: [
      {
        question: "Exercice 1 : Écrivez le squelette d'une transaction qui valide des changements.",
        solution: "BEGIN; ... (requêtes) ... COMMIT;",
        explanation: "C'est la structure standard pour grouper des opérations."
      },
      {
        question: "Exercice 2 (Challenge) : Si vous faites un DELETE par erreur dans une transaction ouverte, comment le corriger ?",
        solution: "Exécutez ROLLBACK;",
        explanation: "Cela annulera le DELETE et restaurera les données."
      }
    ],
    quiz: [
      {
        question: "Que signifie ACID ?",
        options: ["Automatic, Consistent, Internal, Data", "Atomicity, Consistency, Isolation, Durability", "Action, Code, Insert, Delete", "Aucune idée"],
        answerIndex: 1,
        explanation: "Ce sont les 4 piliers de la fiabilité des bases de données relationnelles."
      },
      {
        question: "Si le courant coupe avant le COMMIT, que se passe-t-il ?",
        options: ["Les données sont perdues", "La transaction est sauvegardée partiellement", "La base effectue un ROLLBACK automatique au redémarrage", "La base est corrompue"],
        answerIndex: 2,
        explanation: "Le système garantit qu'aucune transaction partielle ne persiste."
      },
      {
        question: "Une transaction peut-elle contenir des SELECT ?",
        options: ["Non", "Oui, pour lire des données cohérentes", "Seulement au début", "Oui mais c'est inutile"],
        answerIndex: 1,
        explanation: "Oui, cela garantit que vous lisez des données stables pendant votre traitement (Isolation)."
      },
      {
        question: "Quel est l'effet de ROLLBACK ?",
        options: ["Valide les changements", "Annule les changements de la transaction en cours", "Supprime la table", "Redémarre le serveur"],
        answerIndex: 1,
        explanation: "Retour à l'état pré-BEGIN."
      },
      {
        question: "Quand les autres utilisateurs voient-ils vos modifications ?",
        options: ["Immédiatement", "Après chaque requête", "Après le COMMIT", "Jamais"],
        answerIndex: 2,
        explanation: "C'est l'Isolation : les changements en cours sont invisibles pour les autres."
      }
    ],
    summary: [
      "Une transaction groupe plusieurs opérations en une seule unité indivisible.",
      "COMMIT rend les changements permanents.",
      "ROLLBACK annule tout en cas de problème.",
      "Essentiel pour la cohérence des données (banque, stocks, réservations).",
      "Tant que ce n'est pas committé, les autres ne le voient pas."
    ]
  },

  // --- MODULE 5: STRUCTURE ET SCHÉMA (DDL) ---

  'sql-data-types': {
    slug: 'sql-data-types',
    objectives: [
      "Choisir le bon type pour optimiser le stockage.",
      "Comprendre la différence entre VARCHAR et TEXT.",
      "Gérer les nombres précis (DECIMAL) vs approximatifs (FLOAT).",
      "Manipuler les dates et temps."
    ],
    why: {
      title: 'L\'art de la précision',
      content: "Choisir le mauvais type de données peut être désastreux. Utiliser `FLOAT` pour de l'argent entraîne des erreurs d'arrondi. Utiliser `TEXT` pour un code postal gaspille de l'espace. Le schéma est la fondation de la performance."
    },
    concept: {
      title: 'Les familles de types',
      content: "- **Numérique** : \n  - `INT` / `BIGINT` : Entiers (IDs, quantités).\n  - `DECIMAL(p,s)` : Décimaux exacts (Argent).\n  - `FLOAT` : Scientifique approximatif.\n- **Texte** :\n  - `VARCHAR(n)` : Longueur variable limitée (ex: email).\n  - `TEXT` : Longueur illimitée (ex: commentaire).\n- **Temporel** :\n  - `DATE` : YYYY-MM-DD.\n  - `TIMESTAMP` : Avec l'heure précise.\n- **Logique** : `BOOLEAN` (Vrai/Faux).",
      syntax: "price DECIMAL(10, 2) -- 10 chiffres, dont 2 après la virgule\nemail VARCHAR(255)\ncreated_at TIMESTAMP"
    },
    example: {
      title: 'Typage d\'un produit',
      description: 'Définissons les types pour notre table products.',
      sql: "-- Exemple de définition\nname VARCHAR(100)\nprice DECIMAL(10, 2)\nis_active BOOLEAN\nstock INT",
      result: "Name: 'Laptop' (String)\nPrice: 999.99 (Exact)\nIs_Active: True\nStock: 50"
    },
    exercises: [
      {
        question: "Exercice 1 : Quel type choisiriez-vous pour stocker une date de naissance ?",
        solution: "DATE",
        explanation: "L'heure n'est pas nécessaire pour une date de naissance."
      },
      {
        question: "Exercice 2 (Challenge) : Quel type pour stocker le contenu d'un article de blog (potentiellement très long) ?",
        solution: "TEXT",
        explanation: "VARCHAR a souvent une limite (ex: 255 ou 65535 selon SGBD), TEXT est fait pour les gros volumes."
      }
    ],
    quiz: [
      {
        question: "Pourquoi ne pas utiliser FLOAT pour les prix ?",
        options: ["C'est trop lent", "Problèmes de précision (arrondis flottants)", "Interdit par la loi", "Prend trop de place"],
        answerIndex: 1,
        explanation: "0.1 + 0.2 peut donner 0.300000004 en flottant."
      },
      {
        question: "Quelle est la différence entre CHAR(10) et VARCHAR(10) ?",
        options: ["Aucune", "CHAR complète avec des espaces (taille fixe), VARCHAR est variable", "VARCHAR est plus rapide", "CHAR pour les chiffres"],
        answerIndex: 1,
        explanation: "CHAR(10) prendra toujours 10 octets/chars, même si vous écrivez 'A'."
      },
      {
        question: "BIGINT est utilisé pour...",
        options: ["Les très grands textes", "Les nombres décimaux", "Les grands entiers (> 2 milliards)", "Les dates"],
        answerIndex: 2,
        explanation: "Nécessaire quand INT (max ~2Mds) ne suffit plus (ex: IDs de réseaux sociaux)."
      },
      {
        question: "Quel type pour stocker 'Vrai' ou 'Faux' ?",
        options: ["VARCHAR(4)", "INT (0/1)", "BOOLEAN", "BIT"],
        answerIndex: 2,
        explanation: "BOOLEAN est le standard SQL le plus sémantique."
      },
      {
        question: "NULL est-il un type de données ?",
        options: ["Oui", "Non, c'est un état/marqueur", "C'est un entier (0)", "C'est un texte ('NULL')"],
        answerIndex: 1,
        explanation: "NULL signifie l'absence de valeur, applicable à n'importe quel type nullable."
      }
    ],
    summary: [
      "Utilisez DECIMAL pour l'argent, jamais FLOAT.",
      "Préférez VARCHAR pour les textes courts, TEXT pour les longs.",
      "DATE suffit si l'heure n'importe pas, sinon TIMESTAMP.",
      "INT suffit généralement, BIGINT pour les tables massives.",
      "Comprendre vos données avant de créer la table économise des problèmes futurs."
    ]
  },

  'create-table': {
    slug: 'create-table',
    objectives: [
      "Créer une table avec la syntaxe CREATE TABLE.",
      "Définir des colonnes, types et contraintes inline.",
      "Comprendre NULL vs NOT NULL.",
      "Définir une Clé Primaire (Primary Key)."
    ],
    why: {
      title: 'Le plan de construction',
      content: "Avant d'insérer des données, il faut construire la structure qui les accueillera. `CREATE TABLE` est l'instruction DDL (Data Definition Language) qui définit le nom de la table, ses colonnes et ses règles."
    },
    concept: {
      title: 'Structure d\'une déclaration',
      content: "La syntaxe suit le motif : Nom de colonne + Type + Contraintes.\n\n**Points clés :**\n- `PRIMARY KEY` : Identifiant unique de la ligne.\n- `NOT NULL` : Interdit les valeurs vides (obligatoire).\n- `DEFAULT` : Valeur si rien n'est fourni.",
      syntax: "CREATE TABLE users (\n  user_id INT PRIMARY KEY,\n  email VARCHAR(255) NOT NULL,\n  created_at DATE DEFAULT CURRENT_DATE\n);"
    },
    example: {
      title: 'Création de la table products',
      description: 'Créons notre table de produits avec un ID, un nom, un prix et une catégorie.',
      sql: "CREATE TABLE products (\n  product_id INT PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  price DECIMAL(10,2) NOT NULL,\n  category VARCHAR(50)\n);",
      result: "Table 'products' créée. Prête à recevoir des données."
    },
    exercises: [
      {
        question: "Exercice 1 : Créez une table 'categories' avec un 'id' (entier, clé primaire) et un 'label' (texte, obligatoire).",
        solution: "CREATE TABLE categories (id INT PRIMARY KEY, label VARCHAR(100) NOT NULL);",
        explanation: "Simple et efficace."
      },
      {
        question: "Exercice 2 (Challenge) : Créez une table 'employees' avec un salaire qui ne peut pas être NULL et vaut 2000 par défaut.",
        solution: "CREATE TABLE employees (\n  id INT PRIMARY KEY,\n  salary DECIMAL(10,2) NOT NULL DEFAULT 2000\n);",
        explanation: "On combine NOT NULL et DEFAULT."
      }
    ],
    quiz: [
      {
        question: "Que se passe-t-il si j'essaie d'insérer NULL dans une colonne NOT NULL ?",
        options: ["Ça marche", "L'insertion est rejetée (Erreur)", "Ça insère 0", "Ça insère une chaîne vide"],
        answerIndex: 1,
        explanation: "La base de données garantit l'intégrité en rejetant la requête."
      },
      {
        question: "Combien de Clés Primaires peut avoir une table ?",
        options: ["0", "1 seule (composée ou non)", "Autant que je veux", "Dépend du nombre de colonnes"],
        answerIndex: 1,
        explanation: "Une table ne peut avoir qu'une seule définition de Primary Key."
      },
      {
        question: "Quelle erreur de syntaxe est fréquente dans CREATE TABLE ?",
        options: ["Oublier le point-virgule", "La virgule après la dernière colonne", "Écrire en majuscules", "Utiliser des espaces"],
        answerIndex: 1,
        explanation: "La dernière colonne ne doit pas être suivie d'une virgule avant la parenthèse fermante."
      },
      {
        question: "À quoi sert DEFAULT ?",
        options: ["À rien", "À remplir automatiquement si on ne fournit pas de valeur", "À forcer une valeur unique", "À créer un index"],
        answerIndex: 1,
        explanation: "Très utile pour les dates de création (DEFAULT NOW()) ou les statuts (DEFAULT 'active')."
      },
      {
        question: "L'ordre des colonnes est-il important ?",
        options: ["Non", "Oui pour la performance", "Oui pour les SELECT *", "Non"],
        answerIndex: 2,
        explanation: "L'ordre de création détermine l'ordre des valeurs dans un INSERT sans liste de colonnes ou un SELECT *."
      }
    ],
    summary: [
      "Chaque colonne a un nom, un type et des contraintes optionnelles.",
      "Définissez toujours une PRIMARY KEY.",
      "Utilisez NOT NULL pour les données obligatoires.",
      "Attention aux virgules traînantes à la fin de la liste.",
      "Les noms de tables sont souvent au pluriel (users, products)."
    ]
  },

  'alter-drop': {
    slug: 'alter-drop',
    objectives: [
      "Ajouter une colonne à une table existante.",
      "Supprimer une colonne (avec précaution).",
      "Modifier le type d'une colonne.",
      "Supprimer une table entière."
    ],
    why: {
      title: 'L\'adaptation au changement',
      content: "Les besoins métiers évoluent. Vous aurez besoin d'ajouter l'email d'un utilisateur, de changer la taille d'un champ description ou de supprimer une fonctionnalité obsolète. SQL permet de modifier le schéma sans perdre les données existantes (la plupart du temps)."
    },
    concept: {
      title: 'ALTER et DROP',
      content: "- **ADD COLUMN** : Ajoute un champ (souvent nullable au début).\n- **DROP COLUMN** : Supprime définitivement la colonne et ses données.\n- **ALTER COLUMN / MODIFY** : Change le type (ex: VARCHAR(50) -> VARCHAR(100)).\n- **DROP TABLE** : Supprime la table et tout son contenu (irréversible).",
      syntax: "ALTER TABLE users ADD phone VARCHAR(20);\nALTER TABLE users DROP COLUMN age;\nDROP TABLE old_logs;"
    },
    example: {
      title: 'Mise à jour des commandes',
      description: 'On veut ajouter un statut de livraison à notre table orders.',
      sql: "ALTER TABLE orders \nADD delivery_status VARCHAR(50) DEFAULT 'Pending';",
      result: "La colonne est ajoutée à la fin de la table. Les lignes existantes prennent la valeur 'Pending'."
    },
    exercises: [
      {
        question: "Exercice 1 : Ajoutez une colonne 'birthdate' de type DATE à la table customers.",
        solution: "ALTER TABLE customers ADD birthdate DATE;",
        explanation: "Les clients existants auront NULL dans cette colonne."
      },
      {
        question: "Exercice 2 (Challenge) : Renommez la colonne 'name' en 'full_name' dans la table products (Syntaxe standard RENAME COLUMN).",
        solution: "ALTER TABLE products RENAME COLUMN name TO full_name;",
        explanation: "Attention, cela peut casser le code de l'application qui utilise l'ancien nom."
      }
    ],
    quiz: [
      {
        question: "Si je fais DROP COLUMN, puis-je récupérer les données ?",
        options: ["Oui avec CTRL+Z", "Non, c'est supprimé physiquement", "Oui dans la corbeille", "Seulement le jour même"],
        answerIndex: 1,
        explanation: "C'est une opération destructrice immédiate (sauf backup externe)."
      },
      {
        question: "Peut-on changer un VARCHAR(50) en VARCHAR(100) ?",
        options: ["Non", "Oui, c'est sans risque (agrandissement)", "Oui mais on perd les données", "Seulement si la table est vide"],
        answerIndex: 1,
        explanation: "Agrandir est sûr. Rétrécir (100 -> 50) peut tronquer des données."
      },
      {
        question: "Quelle commande supprime la table ET sa structure ?",
        options: ["DELETE TABLE", "TRUNCATE TABLE", "DROP TABLE", "REMOVE TABLE"],
        answerIndex: 2,
        explanation: "DROP supprime tout. DELETE/TRUNCATE ne suppriment que les lignes."
      },
      {
        question: "Est-ce risqué de faire un ALTER TABLE sur une table de 10 millions de lignes ?",
        options: ["Non, c'est instantané", "Oui, cela peut verrouiller la table longtemps", "Non, SQL est magique", "Seulement le vendredi"],
        answerIndex: 1,
        explanation: "Modifier la structure d'une grosse table peut bloquer l'accès à l'application pendant la réécriture."
      },
      {
        question: "Si j'ajoute une colonne NOT NULL sans valeur par défaut sur une table non vide, que se passe-t-il ?",
        options: ["Ça marche", "Erreur", "Ça met NULL", "Ça met 0"],
        answerIndex: 1,
        explanation: "Impossible de respecter la contrainte pour les lignes existantes. Il faut soit une DEFAULT, soit autoriser NULL."
      }
    ],
    summary: [
      "ALTER TABLE permet d'évoluer sans tout recréer.",
      "Soyez très prudent avec DROP COLUMN (perte de données).",
      "Agrandir une colonne est sûr, la rétrécir est risqué.",
      "Sur de grosses tables, ALTER peut causer des temps d'arrêt.",
      "Toujours vérifier les dépendances avant de renommer/supprimer."
    ]
  },

  'constraints-pk-fk-unique': {
    slug: 'constraints-pk-fk-unique',
    objectives: [
      "Garantir l'unicité avec PRIMARY KEY et UNIQUE.",
      "Lier les tables avec FOREIGN KEY.",
      "Comprendre les règles métier via CHECK.",
      "Gérer les erreurs de violation de contrainte."
    ],
    why: {
      title: 'Les gardiens de la qualité',
      content: "Une base de données sans contraintes est une poubelle en devenir. Comment empêcher de créer une commande sans client ? Comment empêcher deux utilisateurs d'avoir le même email ? Les contraintes sont des règles strictes appliquées par le moteur pour garantir la cohérence des données."
    },
    concept: {
      title: 'PK, FK, UNIQUE, CHECK',
      content: "- **PRIMARY KEY (PK)** : Identité unique (ex: ID).\n- **FOREIGN KEY (FK)** : Référence une PK d'une autre table. Empêche les orphelins.\n- **UNIQUE** : Interdit les doublons sur une colonne (autre que PK).\n- **CHECK** : Valide une condition logique (ex: `price > 0`).",
      syntax: "CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT REFERENCES customers(id),\n  code VARCHAR(10) UNIQUE\n);"
    },
    example: {
      title: 'Lien Commande-Client',
      description: 'La table orders ne doit accepter que des customer_id qui existent vraiment dans la table customers.',
      sql: "CREATE TABLE orders (\n  order_id INT PRIMARY KEY,\n  customer_id INT,\n  amount DECIMAL(10,2),\n  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)\n);",
      result: "Si on essaie d'insérer un client 999 qui n'existe pas, SQL renvoie une erreur 'Foreign Key Violation'."
    },
    exercises: [
      {
        question: "Exercice 1 : Ajoutez une contrainte UNIQUE sur la colonne 'email' de la table customers.",
        solution: "ALTER TABLE customers ADD CONSTRAINT unique_email UNIQUE (email);",
        explanation: "Cela empêchera deux clients d'avoir le même email."
      },
      {
        question: "Exercice 2 (Challenge) : Créez une table 'products' avec une contrainte CHECK pour que le prix soit toujours positif.",
        solution: "CREATE TABLE products (..., price DECIMAL CHECK (price >= 0));",
        explanation: "La base rejettera tout prix négatif."
      }
    ],
    quiz: [
      {
        question: "Peut-on supprimer un client s'il a des commandes (FK) ?",
        options: ["Oui, sans problème", "Non, erreur de contrainte (sauf CASCADE)", "Oui, les commandes deviennent orphelines", "Oui, les commandes sont supprimées automatiquement"],
        answerIndex: 1,
        explanation: "Par défaut, la FK protège l'intégrité et bloque la suppression du parent."
      },
      {
        question: "Quelle est la différence entre PRIMARY KEY et UNIQUE ?",
        options: ["Aucune", "PK accepte NULL, UNIQUE non", "PK identifie la ligne (1 seule par table), UNIQUE évite les doublons (plusieurs possibles)", "UNIQUE est plus rapide"],
        answerIndex: 2,
        explanation: "Une table a une seule PK, mais peut avoir plusieurs colonnes UNIQUE (email, tel, login...)."
      },
      {
        question: "Une Foreign Key peut-elle être NULL ?",
        options: ["Jamais", "Oui (relation optionnelle)", "Seulement si c'est une PK", "Non, c'est interdit"],
        answerIndex: 1,
        explanation: "Oui, par exemple 'manager_id' peut être NULL si l'employé n'a pas de chef."
      },
      {
        question: "Que fait ON DELETE CASCADE ?",
        options: ["Empêche la suppression", "Supprime les enfants quand le parent est supprimé", "Met les enfants à NULL", "Affiche une alerte"],
        answerIndex: 1,
        explanation: "Cela propage la suppression (dangereux mais utile)."
      },
      {
        question: "Une clé primaire peut-elle être composée de plusieurs colonnes ?",
        options: ["Non", "Oui (Composite Key)", "Seulement en NoSQL", "Oui mais c'est déprécié"],
        answerIndex: 1,
        explanation: "Oui, ex: (student_id, course_id) dans une table de liaison."
      }
    ],
    summary: [
      "Les contraintes protègent vos données contre les bugs applicatifs.",
      "FOREIGN KEY maintient le lien entre les tables.",
      "UNIQUE garantit qu'il n'y a pas de doublons.",
      "CHECK permet d'implémenter des règles métier simples.",
      "Les erreurs de contraintes sont vos amies : elles signalent un problème de logique."
    ]
  },

  // --- MODULE 6: FONCTIONS ET LOGIQUE ---

  'string-functions': {
    slug: 'string-functions',
    objectives: [
      "Nettoyer et normaliser des textes (TRIM, UPPER/LOWER).",
      "Extraire des portions de texte (SUBSTRING).",
      "Concaténer des informations (CONCAT, ||)."
    ],
    why: {
      title: 'Nettoyer le chaos',
      content: "Les données textuelles sont rarement propres. Des espaces en trop, des casses incohérentes ('Paris', 'paris', 'PARIS') ou des formats variés. Les fonctions de chaîne sont indispensables pour standardiser ces données avant analyse."
    },
    concept: {
      title: 'Manipulation de texte',
      content: "SQL offre une boîte à outils pour transformer le texte à la volée.\n\n**Fonctions clés :**\n- `LOWER(col)` / `UPPER(col)` : Change la casse.\n- `TRIM(col)` : Enlève les espaces inutiles autour.\n- `SUBSTRING(col, start, length)` : Extrait une partie.\n- `REPLACE(col, 'old', 'new')` : Remplace une séquence.\n- `CONCAT(a, b)` ou `a || b` : Assemble des textes.",
      syntax: "SELECT UPPER(city), LENGTH(full_name)\nFROM customers;"
    },
    example: {
      title: 'Initiale du client',
      description: 'On veut extraire la première lettre du nom pour créer un avatar.',
      sql: "SELECT \n  full_name, \n  SUBSTRING(full_name, 1, 1) as initial\nFROM customers;",
      result: "| full_name | initial |\n|-----------|---------|\n| John Doe  | J       |"
    },
    exercises: [
      {
        question: "Exercice 1 : Générez une colonne 'email_genere' en minuscules sous la forme 'nom@corp.com' (utilisez full_name).",
        solution: "SELECT LOWER(CONCAT(full_name, '@corp.com')) FROM customers;",
        explanation: "On combine LOWER et CONCAT."
      },
      {
        question: "Exercice 2 (Challenge) : Affichez les 3 premières lettres de la ville en majuscules (Code Ville).",
        solution: "SELECT UPPER(SUBSTRING(city, 1, 3)) FROM customers;",
        explanation: "Imbrication de fonctions : d'abord extraire, puis mettre en majuscule."
      }
    ],
    quiz: [
      {
        question: "Que renvoie SUBSTRING('Hello', 1, 2) ?",
        options: ["He", "el", "H", "Hel"],
        answerIndex: 0,
        explanation: "En SQL, l'index commence souvent à 1. On prend 2 caractères à partir du 1er."
      },
      {
        question: "Que se passe-t-il si je concatène 'A' avec NULL ?",
        options: ["'A'", "'ANULL'", "NULL", "Erreur"],
        answerIndex: 2,
        explanation: "Dans le standard SQL, toute opération avec NULL donne NULL (attention, certains SGBD comme Oracle diffèrent)."
      },
      {
        question: "Quelle fonction enlève les espaces au début et à la fin ?",
        options: ["CLEAN()", "STRIP()", "TRIM()", "CUT()"],
        answerIndex: 2,
        explanation: "TRIM est le standard."
      },
      {
        question: "Comment mettre 'Paris' en 'paris' ?",
        options: ["LOWER()", "UPPER()", "MIN()", "SMALL()"],
        answerIndex: 0,
        explanation: "LOWER pour minuscules."
      },
      {
        question: "L'opérateur || sert à quoi ?",
        options: ["OU logique", "Concaténation de chaînes", "Valeur absolue", "Division parallèle"],
        answerIndex: 1,
        explanation: "C'est l'opérateur standard de concaténation (ex: 'a' || 'b')."
      }
    ],
    summary: [
      "Nettoyez vos données avec TRIM, UPPER et LOWER.",
      "Attention : NULL + Texte = NULL (utilisez COALESCE pour éviter ça).",
      "L'indexation des chaînes commence à 1 en SQL, pas 0.",
      "SUBSTRING permet d'extraire des codes ou des parties de date stockées en texte.",
      "CONCAT ou || permettent d'assembler des champs (ex: Prénom + Nom)."
    ]
  },

  'date-time-functions': {
    slug: 'date-time-functions',
    objectives: [
      "Filtrer par périodes.",
      "Extraire des composants (Année, Mois).",
      "Grouper temporellement (Cohortes)."
    ],
    why: {
      title: 'La dimension temporelle',
      content: "Le temps est la dimension la plus importante de l'analyse (évolution CA, saisonnalité). SQL traite les dates comme des types spéciaux, pas juste des chaînes, ce qui permet de faire des calculs 'intelligents' (ajouter 1 jour, trouver le dernier jour du mois)."
    },
    concept: {
      title: 'Arithmétique des dates',
      content: "Les dates ne sont pas des strings. Utilisez des fonctions dédiées.\n\n**Outils :**\n- `CURRENT_DATE` : Date d'aujourd'hui.\n- `EXTRACT(PART FROM col)` : Récupère l'année, le mois, etc.\n- `DATE_TRUNC('month', col)` : Ramène au premier jour du mois (utile pour grouper).\n- Comparaison : `col >= '2023-01-01'` (format ISO YYYY-MM-DD).",
      syntax: "SELECT EXTRACT(YEAR FROM order_date) as annee,\n       COUNT(*)\nFROM orders\nGROUP BY 1;"
    },
    example: {
      title: 'Commandes de 2023',
      description: 'Filtrer les commandes sur une année spécifique.',
      sql: "SELECT * FROM orders\nWHERE order_date >= '2023-01-01' \n  AND order_date < '2024-01-01';",
      result: "Liste des commandes incluses dans l'intervalle."
    },
    exercises: [
      {
        question: "Exercice 1 : Sélectionnez toutes les commandes passées aujourd'hui ou dans le passé (pas de commandes futures).",
        solution: "SELECT * FROM orders WHERE order_date <= CURRENT_DATE;",
        explanation: "CURRENT_DATE est dynamique."
      },
      {
        question: "Exercice 2 (Challenge) : Comptez le nombre de commandes par année (utilisez EXTRACT).",
        solution: "SELECT EXTRACT(YEAR FROM order_date), COUNT(*) FROM orders GROUP BY 1;",
        explanation: "On extrait l'année et on groupe dessus."
      }
    ],
    quiz: [
      {
        question: "Quel est le format standard ISO pour une date ?",
        options: ["DD-MM-YYYY", "MM/DD/YYYY", "YYYY-MM-DD", "YYYY.MM.DD"],
        answerIndex: 2,
        explanation: "YYYY-MM-DD est le seul format non ambigu triable alphabétiquement."
      },
      {
        question: "Que retourne EXTRACT(MONTH FROM date) ?",
        options: ["Le nom du mois ('Janvier')", "Le numéro (1-12)", "La date du début du mois", "Un timestamp"],
        answerIndex: 1,
        explanation: "Un entier représentant le mois."
      },
      {
        question: "Quelle est la différence entre NOW() et CURRENT_DATE ?",
        options: ["Aucune", "NOW() inclut l'heure (Timestamp), CURRENT_DATE juste la date", "NOW() est pour le futur", "CURRENT_DATE est plus précis"],
        answerIndex: 1,
        explanation: "Si vous n'avez pas besoin de l'heure, préférez CURRENT_DATE."
      },
      {
        question: "Peut-on faire des maths sur les dates (Date - Date) ?",
        options: ["Non", "Oui, cela donne une durée (intervalle ou nombre de jours)", "Oui, cela donne une nouvelle date", "Seulement l'addition"],
        answerIndex: 1,
        explanation: "La soustraction donne la différence de temps."
      },
      {
        question: "Est-ce une bonne pratique de stocker les dates en VARCHAR ?",
        options: ["Oui, c'est plus simple", "Non, on perd les fonctions de date et le tri correct", "Oui pour le format français", "Ça dépend"],
        answerIndex: 1,
        explanation: "Toujours utiliser les types DATE ou TIMESTAMP natifs."
      }
    ],
    summary: [
      "Stockez toujours les dates en type DATE/TIMESTAMP, jamais en texte.",
      "Utilisez le format ISO 'YYYY-MM-DD' pour vos littéraux.",
      "EXTRACT permet d'analyser la saisonnalité (par mois, jour de semaine).",
      "Attention aux fuseaux horaires (Timezones) sur les applications mondiales.",
      "DATE_TRUNC est idéal pour les graphiques mensuels."
    ]
  },

  'case-when': {
    slug: 'case-when',
    objectives: [
      "Créer des catégories personnalisées.",
      "Transformer des codes en libellés.",
      "Calculer des indicateurs conditionnels."
    ],
    why: {
      title: 'La logique métier',
      content: "Les données brutes ne racontent pas toujours toute l'histoire. Vous devez souvent segmenter (ex: Prix < 10 = 'Pas cher') ou traduire des codes techniques (status 'S' = 'Shipped'). `CASE WHEN` est l'instruction `IF/ELSE` du SQL."
    },
    concept: {
      title: 'Conditions ligne par ligne',
      content: "CASE évalue des conditions dans l'ordre et retourne le résultat de la première qui est vraie.\n\n**Syntaxe :**\n`CASE WHEN cond1 THEN val1 WHEN cond2 THEN val2 ELSE defaut END`\n\n**Attention :** Si aucune condition n'est remplie et qu'il n'y a pas de `ELSE`, le résultat est NULL.",
      syntax: "SELECT amount,\n  CASE \n    WHEN amount > 1000 THEN 'VIP'\n    ELSE 'Standard'\n  END as segment\nFROM orders;"
    },
    example: {
      title: 'Traduction de statut',
      description: 'Afficher un libellé français pour le statut de commande.',
      sql: "SELECT order_id, status,\n  CASE status\n    WHEN 'Shipped' THEN 'Expédiée'\n    WHEN 'Pending' THEN 'En attente'\n    ELSE 'Autre'\n  END as statut_fr\nFROM orders;",
      result: "| order_id | status  | statut_fr  |\n|----------|---------|------------|\n| 1024     | Shipped | Expédiée   |"
    },
    exercises: [
      {
        question: "Exercice 1 : Créez une colonne 'taille_commande' : 'Petite' si amount < 50, 'Grande' sinon.",
        solution: "SELECT CASE WHEN amount < 50 THEN 'Petite' ELSE 'Grande' END FROM orders;",
        explanation: "Une logique binaire simple."
      },
      {
        question: "Exercice 2 (Challenge) : Créez un 'flag_urgence'. Si le statut est 'Pending' ET le montant > 500, alors 'URGENT', sinon 'Normal'.",
        solution: "SELECT CASE WHEN status = 'Pending' AND amount > 500 THEN 'URGENT' ELSE 'Normal' END FROM orders;",
        explanation: "On peut combiner plusieurs conditions avec AND/OR dans le WHEN."
      }
    ],
    quiz: [
      {
        question: "Si j'ai 3 conditions WHEN et que la première est vraie, les autres sont-elles évaluées ?",
        options: ["Oui", "Non, il s'arrête à la première", "Seulement si le ELSE est vide", "Ça dépend du SGBD"],
        answerIndex: 1,
        explanation: "C'est un court-circuit. L'ordre des conditions est donc important."
      },
      {
        question: "Quelle est la valeur par défaut si on omet le ELSE ?",
        options: ["0", "Vide", "NULL", "Erreur"],
        answerIndex: 2,
        explanation: "Toujours inclure un ELSE pour éviter les NULLs surprises."
      },
      {
        question: "Peut-on retourner un nombre dans le premier THEN et du texte dans le ELSE ?",
        options: ["Oui", "Non, erreur de type", "Oui, le nombre devient texte", "Seulement si positif"],
        answerIndex: 1,
        explanation: "Tous les résultats d'un CASE doivent avoir le même type de données."
      },
      {
        question: "Le mot-clé de fin est...",
        options: ["STOP", "DONE", "END", "FI"],
        answerIndex: 2,
        explanation: "CASE ... END."
      },
      {
        question: "Peut-on utiliser CASE dans un ORDER BY ?",
        options: ["Non", "Oui", "Seulement pour les nombres", "Jamais"],
        answerIndex: 1,
        explanation: "Oui, c'est très utile pour des tris personnalisés (ex: mettre 'VIP' en premier)."
      }
    ],
    summary: [
      "CASE permet de créer de nouvelles colonnes basées sur la logique.",
      "L'ordre des WHEN est crucial (premier trouvé, premier servi).",
      "N'oubliez pas le ELSE (sinon NULL).",
      "Tous les retours (THEN/ELSE) doivent avoir le même type.",
      "Utilisable dans SELECT, ORDER BY et même GROUP BY."
    ]
  },

  'coalesce-null': {
    slug: 'coalesce-null',
    objectives: [
      "Remplacer les valeurs manquantes.",
      "Éviter la division par zéro.",
      "Prioriser des sources de données."
    ],
    why: {
      title: 'L\'art du repli',
      content: "Les valeurs NULL sont contagieuses. Une seule valeur NULL dans un calcul rend le tout NULL (`10 + NULL = NULL`). Pour construire des rapports robustes, vous devez définir des valeurs par défaut ou des stratégies de repli."
    },
    concept: {
      title: 'COALESCE et NULLIF',
      content: "- **COALESCE(val1, val2, ...)** : Retourne la première valeur non-NULL de la liste. Idéal pour les valeurs par défaut.\n- **NULLIF(val1, val2)** : Retourne NULL si val1 égale val2. Idéal pour éviter la division par zéro (car `x / NULL` donne NULL, pas une erreur).",
      syntax: "SELECT COALESCE(phone, email, 'Inconnu') FROM users;\nSELECT amount / NULLIF(qty, 0) FROM items;"
    },
    example: {
      title: 'Affichage propre',
      description: 'Si la ville est vide, afficher "Non Renseigné".',
      sql: "SELECT full_name, COALESCE(city, 'Non Renseigné') \nFROM customers;",
      result: "Les cases vides sont remplacées par le texte par défaut."
    },
    exercises: [
      {
        question: "Exercice 1 : Affichez la catégorie du produit. Si elle est NULL, affichez 'Générique'.",
        solution: "SELECT COALESCE(category, 'Générique') FROM products;",
        explanation: "Simple valeur de repli."
      },
      {
        question: "Exercice 2 (Challenge) : Calculez le prix unitaire (amount / quantity) en évitant le crash si quantity vaut 0.",
        solution: "SELECT amount / NULLIF(quantity, 0) FROM order_items;",
        explanation: "NULLIF(0, 0) renvoie NULL. La division par NULL renvoie NULL (pas d'erreur)."
      }
    ],
    quiz: [
      {
        question: "Que renvoie COALESCE(NULL, NULL, 5, 10) ?",
        options: ["NULL", "5", "10", "Erreur"],
        answerIndex: 1,
        explanation: "Le premier non-NULL est 5."
      },
      {
        question: "Que renvoie NULLIF(10, 10) ?",
        options: ["10", "0", "NULL", "Vrai"],
        answerIndex: 2,
        explanation: "Les valeurs sont égales, donc NULL."
      },
      {
        question: "Quel est le résultat de 150 / NULL ?",
        options: ["Erreur", "0", "NULL", "Infini"],
        answerIndex: 2,
        explanation: "La propagation du NULL."
      },
      {
        question: "Peut-on utiliser COALESCE avec des types différents (ex: Date et Texte) ?",
        options: ["Oui", "Non, erreur de type", "Oui, converti en texte", "Dépend du jour"],
        answerIndex: 1,
        explanation: "Comme pour CASE, les arguments doivent être compatibles."
      },
      {
        question: "COALESCE est-il standard ?",
        options: ["Oui (ANSI SQL)", "Non, spécifique Oracle (NVL)", "Non, spécifique SQL Server (ISNULL)", "Non, spécifique MySQL (IFNULL)"],
        answerIndex: 0,
        explanation: "COALESCE est le standard portable à privilégier sur NVL ou ISNULL."
      }
    ],
    summary: [
      "COALESCE pour fournir une valeur par défaut (affichage).",
      "NULLIF pour protéger les divisions (éviter erreur div/0).",
      "COALESCE évalue les arguments dans l'ordre.",
      "Les types de données doivent être cohérents.",
      "Utilisez ces fonctions pour rendre vos rapports 'incassables'."
    ]
  },

  // --- MODULE 8: FONCTIONS DE FENÊTRAGE (WINDOW FUNCTIONS) ---

  'window-functions-intro': {
    slug: 'window-functions-intro',
    objectives: [
      "Comprendre la différence entre GROUP BY et Window Functions.",
      "Maîtriser la clause OVER() et PARTITION BY.",
      "Calculer des totaux partiels sans réduire les lignes."
    ],
    why: {
      title: 'Voir le détail ET le global',
      content: "Avec `GROUP BY`, vous perdez le détail des lignes (tout est écrasé en une seule ligne de résumé). Avec les fonctions de fenêtrage, vous gardez chaque ligne intacte tout en y ajoutant des informations contextuelles (ex: le montant de CETTE commande vs le total de CE client)."
    },
    concept: {
      title: 'La Fenêtre Glissante',
      content: "Une fonction de fenêtre s'applique sur un ensemble de lignes (la fenêtre) défini par la clause `OVER`. \n- `PARTITION BY` : Divise les données en groupes (comme GROUP BY, mais sans agrégation).\n- `ORDER BY` : Définit l'ordre dans la fenêtre (pour les cumuls).\n- `ROWS BETWEEN` : Définit la taille de la fenêtre (optionnel).",
      syntax: "SELECT amount, \n       SUM(amount) OVER (PARTITION BY customer_id) as total_customer\nFROM orders;"
    },
    example: {
      title: 'Total client sur chaque ligne',
      description: 'Afficher chaque commande avec le total dépensé par ce client.',
      sql: "SELECT order_id, customer_id, amount,\n       SUM(amount) OVER (PARTITION BY customer_id) as total_spend\nFROM orders;",
      result: "| order_id | cust_id | amount | total_spend |\n|----------|---------|--------|-------------|\n| 101      | 1       | 100    | 300         |\n| 102      | 1       | 200    | 300         |"
    },
    exercises: [
      {
        question: "Exercice 1 : Affichez le nom du produit, son prix, et le prix moyen de TOUS les produits à côté.",
        solution: "SELECT name, price, AVG(price) OVER () as avg_global FROM products;",
        explanation: "OVER() vide signifie 'sur toute la table'."
      },
      {
        question: "Exercice 2 (Challenge) : Affichez chaque commande, son montant, et la part (%) que cela représente par rapport au total de ce client.",
        solution: "SELECT order_id, amount, amount / SUM(amount) OVER (PARTITION BY customer_id) as share FROM orders;",
        explanation: "On divise le montant individuel par la somme fenêtrée."
      }
    ],
    quiz: [
      {
        question: "Quelle est la différence principale avec GROUP BY ?",
        options: ["Aucune", "GROUP BY réduit les lignes, Window les garde", "Window est plus lent", "Window supprime les doublons"],
        answerIndex: 1,
        explanation: "C'est la clé : pas de réduction de cardinalité."
      },
      {
        question: "Que fait PARTITION BY ?",
        options: ["Trie les données", "Divise les données en groupes indépendants pour le calcul", "Filtre les données", "Supprime les données"],
        answerIndex: 1,
        explanation: "Le calcul (ex: SUM) redémarre à zéro pour chaque partition."
      },
      {
        question: "Peut-on mettre une fonction de fenêtre dans le WHERE ?",
        options: ["Oui", "Non, jamais", "Seulement avec une sous-requête", "Oui si c'est RANK"],
        answerIndex: 1,
        explanation: "Elles sont calculées après le WHERE. Il faut utiliser une sous-requête ou CTE pour filtrer dessus."
      },
      {
        question: "OVER() sans arguments signifie...",
        options: ["Erreur", "Partition par ID", "Sur l'ensemble de la table", "Partition par date"],
        answerIndex: 2,
        explanation: "La fenêtre est la table entière."
      },
      {
        question: "ORDER BY dans OVER() est utile pour...",
        options: ["Trier le résultat final", "Calculer des sommes cumulées (Running Total)", "Rien", "Filtrer"],
        answerIndex: 1,
        explanation: "Il change la portée de la fenêtre ligne par ligne (du début jusqu'à la ligne actuelle)."
      }
    ],
    summary: [
      "OVER() définit la fenêtre d'application de la fonction.",
      "PARTITION BY crée des sous-groupes de calcul indépendants.",
      "Les lignes originales ne sont jamais fusionnées.",
      "Idéal pour comparer 'Individu vs Groupe' (Ratio, Écart).",
      "Ne s'utilise pas dans WHERE (utilisez une CTE)."
    ]
  },

  'rank-dense-rank': {
    slug: 'rank-dense-rank',
    objectives: [
      "Classer des données (Top N).",
      "Différencier RANK, DENSE_RANK et ROW_NUMBER.",
      "Gérer les égalités (Ties)."
    ],
    why: {
      title: 'Qui est le premier ?',
      content: "Trier avec ORDER BY c'est bien, mais comment obtenir 'le top 3 des ventes par pays' ? Les fonctions de classement attribuent un numéro d'ordre à chaque ligne au sein de sa partition, ce qui permet ensuite de filtrer (ex: garder les rangs <= 3)."
    },
    concept: {
      title: 'Les 3 mousquetaires du classement',
      content: "- **ROW_NUMBER()** : Numérotation continue unique (1, 2, 3, 4). Arbitraire en cas d'égalité.\n- **RANK()** : Saut de numéro en cas d'égalité (1, 2, 2, 4).\n- **DENSE_RANK()** : Pas de saut (1, 2, 2, 3).\n\nNécessite toujours un `ORDER BY` dans le `OVER()`.",
      syntax: "SELECT name, price, \n       RANK() OVER (ORDER BY price DESC) as rnk\nFROM products;"
    },
    example: {
      title: 'Top clients par pays',
      description: 'Classer les commandes par montant décroissant pour chaque client.',
      sql: "SELECT customer_id, amount,\n       DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC) as rank\nFROM orders;",
      result: "| cust | amt  | rank |\n|------|------|------|\n| 1    | 500  | 1    |\n| 1    | 200  | 2    |\n| 1    | 200  | 2    |\n| 1    | 100  | 3    |"
    },
    exercises: [
      {
        question: "Exercice 1 : Attribuez un numéro de ligne unique à chaque produit, trié par nom.",
        solution: "SELECT name, ROW_NUMBER() OVER (ORDER BY name) FROM products;",
        explanation: "ROW_NUMBER garantit une séquence sans trous."
      },
      {
        question: "Exercice 2 (Challenge) : Trouvez les 3 produits les plus chers de chaque catégorie (utilisez une CTE + RANK).",
        solution: "WITH ranked AS (SELECT *, RANK() OVER (PARTITION BY category ORDER BY price DESC) as r FROM products) SELECT * FROM ranked WHERE r <= 3;",
        explanation: "On classe d'abord dans une CTE, puis on filtre."
      }
    ],
    quiz: [
      {
        question: "Si deux lignes sont ex-aequo au rang 1, quel est le rang suivant avec RANK() ?",
        options: ["2", "3", "1", "Erreur"],
        answerIndex: 1,
        explanation: "1, 1, 3. RANK laisse des trous."
      },
      {
        question: "Et avec DENSE_RANK() ?",
        options: ["2", "3", "1", "Erreur"],
        answerIndex: 0,
        explanation: "1, 1, 2. Pas de trous."
      },
      {
        question: "L'ORDER BY est-il obligatoire dans OVER pour ces fonctions ?",
        options: ["Oui", "Non", "Seulement pour RANK", "Dépend de la base"],
        answerIndex: 0,
        explanation: "Un classement n'a de sens que s'il y a un critère de tri."
      },
      {
        question: "Comment garder une seule ligne par groupe (déduplication) ?",
        options: ["GROUP BY", "ROW_NUMBER() = 1", "DISTINCT", "Tous"],
        answerIndex: 3,
        explanation: "ROW_NUMBER() est souvent utilisé pour dédupliquer en gardant la 'plus récente' (ORDER BY date DESC)."
      },
      {
        question: "ROW_NUMBER() gère-t-il les égalités ?",
        options: ["Oui", "En donnant le même numéro", "Non, il donne des numéros différents arbitrairement", "Il plante"],
        answerIndex: 2,
        explanation: "Il force une unicité séquentielle."
      }
    ],
    summary: [
      "ROW_NUMBER pour une numérotation unique.",
      "RANK pour les compétitions (1er, 2ème ex-aequo, ...).",
      "DENSE_RANK pour ne pas avoir de trous dans le classement.",
      "Toujours utiliser ORDER BY dans le OVER.",
      "Le filtrage (WHERE rank <= 3) se fait via une sous-requête/CTE."
    ]
  },

  'lead-lag': {
    slug: 'lead-lag',
    objectives: [
      "Comparer une ligne avec la précédente/suivante.",
      "Calculer des variations (Delta, Croissance).",
      "Détecter des ruptures de séquence."
    ],
    why: {
      title: 'Regarder dans le rétroviseur',
      content: "Pour calculer une croissance (Ventes ce mois vs mois dernier) ou un délai (Date commande 2 vs commande 1), vous avez besoin d'accéder à la ligne d'avant sans faire de jointure complexe. LEAD et LAG sont faits pour ça."
    },
    concept: {
      title: 'Accès Séquentiel',
      content: "- **LAG(col, N, default)** : Valeur de la ligne N en arrière.\n- **LEAD(col, N, default)** : Valeur de la ligne N en avant.\n\nN vaut 1 par défaut. Default vaut NULL par défaut.",
      syntax: "SELECT order_date, \n       LAG(order_date) OVER (ORDER BY order_date) as prev_date\nFROM orders;"
    },
    example: {
      title: 'Écart entre commandes',
      description: 'Pour chaque client, combien de jours se sont écoulés depuis sa commande précédente ?',
      sql: "SELECT customer_id, order_date,\n       LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) as prev_date\nFROM orders;",
      result: "| cust | date       | prev_date  |\n|------|------------|------------|\n| 1    | 2023-01-01 | NULL       |\n| 1    | 2023-01-15 | 2023-01-01 |"
    },
    exercises: [
      {
        question: "Exercice 1 : Affichez le montant de la commande et le montant de la commande *suivante* (LEAD) pour chaque client.",
        solution: "SELECT amount, LEAD(amount) OVER (PARTITION BY customer_id ORDER BY order_date) FROM orders;",
        explanation: "LEAD regarde vers le futur."
      },
      {
        question: "Exercice 2 (Challenge) : Calculez la variation de montant (Current - Previous) par rapport à la commande précédente.",
        solution: "SELECT amount - LAG(amount, 1, 0) OVER (ORDER BY order_date) as delta FROM orders;",
        explanation: "Utilisez 0 comme valeur par défaut pour éviter NULL sur la première ligne."
      }
    ],
    quiz: [
      {
        question: "Que renvoie LAG sur la toute première ligne ?",
        options: ["0", "La valeur actuelle", "NULL (ou valeur par défaut)", "Erreur"],
        answerIndex: 2,
        explanation: "Il n'y a pas de ligne précédente."
      },
      {
        question: "LEAD(col, 2) regarde...",
        options: ["2 lignes avant", "2 lignes après", "La 2ème ligne de la table", "2 jours plus tard"],
        answerIndex: 1,
        explanation: "Le deuxième argument est l'offset."
      },
      {
        question: "Si je veux remplacer le NULL initial par 0, je fais...",
        options: ["ISNULL(LAG(...), 0)", "LAG(col, 1, 0)", "COALESCE après", "Toutes ces réponses"],
        answerIndex: 3,
        explanation: "Le 3ème argument de LAG est le plus propre, mais COALESCE fonctionne aussi."
      },
      {
        question: "L'ordre est-il important ?",
        options: ["Oui, capital", "Non, SQL devine", "Seulement pour LEAD", "Pas pour les nombres"],
        answerIndex: 0,
        explanation: "Sans ORDER BY, 'précédent' et 'suivant' n'ont aucun sens."
      },
      {
        question: "Peut-on utiliser LAG sur une colonne calculée ?",
        options: ["Non", "Oui", "Seulement si numérique", "Jamais"],
        answerIndex: 1,
        explanation: "Oui, ou imbriquer dans une CTE."
      }
    ],
    summary: [
      "LAG regarde en arrière, LEAD regarde en avant.",
      "Indispensable pour les calculs de variation (Delta).",
      "Toujours définir un ORDER BY dans la fenêtre.",
      "Pensez à la valeur par défaut pour la première/dernière ligne.",
      "Évite les auto-jointures complexes (T1 join T2 on T1.id = T2.id - 1)."
    ]
  },
};
