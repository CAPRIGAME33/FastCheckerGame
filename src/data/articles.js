// Catégories des articles
export const CATEGORIES = {
  tech: 'Technologie',
  sante: 'Santé',
  env: 'Environnement',
  culture: 'Culture',
  education: 'Éducation',
  celebrites: 'Célébrités',
  complot: 'Complotisme',
  ecologie: 'Écologie'
};

// Liste des articles
export const articles = [
  { id: 'A101', title: "Instagram va supprimer la fonction 'like' dans 10 pays", isTrue: true, category: 'tech' },
  { id: 'A102', title: "Un ado de 16 ans crée une app qui détecte les fake news avec 98% de précision", isTrue: false, category: 'tech' },
  { id: 'A103', title: "TikTok permet maintenant de gagner de l'argent en regardant des vidéos", isTrue: false, category: 'tech' },
  { id: 'B101', title: "Dormir avec son téléphone augmente le risque de cancer de 70%", isTrue: false, category: 'sante' },
  { id: 'B102', title: "Une étude prouve que jouer aux jeux vidéo améliore la concentration", isTrue: true, category: 'sante' },
  { id: 'B103', title: "Un nouveau régime permet de perdre 10 kilos en mangeant du chocolat", isTrue: false, category: 'sante' },
  { id: 'C101', title: "Des étudiants créent une paille qui détecte les drogues dans les boissons", isTrue: true, category: 'innovation' },
  { id: 'C102', title: "Un nouveau type d'arbre absorbe 10 fois plus de CO2", isTrue: false, category: 'env' },
  { id: 'C103', title: "Les sacs biodégradables sont plus polluants que les sacs plastiques", isTrue: true, category: 'env' },
  { id: 'C104', title: "Une ville entière fonctionne désormais uniquement à l'énergie solaire", isTrue: true, category: 'env' },
  { id: 'C105', title: "Les voitures électriques émettent plus de CO2 que les diesel", isTrue: false, category: 'env' },
  { id: 'D101', title: "Netflix va bloquer le partage de compte entre amis", isTrue: true, category: 'culture' },
  { id: 'D102', title: "Une IA prédit les futures tendances musicales avec 90% de précision", isTrue: false, category: 'culture' },
  { id: 'E101', title: "Une université propose un diplôme en création de contenus TikTok", isTrue: true, category: 'education' },
  { id: 'E102', title: "Les devoirs seront interdits dans les lycées dès 2025", isTrue: false, category: 'education' },
  // Célébrités
  { id: 'F101', title: "Taylor Swift achète une île privée pour ses chats", isTrue: false, category: 'celebrites' },
  { id: 'F102', title: "BTS annonce leur retour surprise après le service militaire", isTrue: false, category: 'celebrites' },
  { id: 'F103', title: "Zendaya va réaliser son premier film en 2024", isTrue: true, category: 'celebrites' },
  { id: 'F104', title: "Timothée Chalamet refuse un rôle Marvel pour se concentrer sur le théâtre", isTrue: false, category: 'celebrites' },
  { id: 'F105', title: "Billie Eilish compose la bande originale des JO 2024", isTrue: true, category: 'celebrites' },
  { id: 'F106', title: "Le compte TikTok de Kylie Jenner piraté par des fans", isTrue: false, category: 'celebrites' },
  { id: 'F107', title: "Tom Holland quitte définitivement le rôle de Spider-Man", isTrue: false, category: 'celebrites' },
  { id: 'F108', title: "Ed Sheeran ouvre une école de musique gratuite à Londres", isTrue: true, category: 'celebrites' },
  { id: 'F109', title: "Dua Lipa devient ambassadrice de l'UNESCO", isTrue: true, category: 'celebrites' },
  { id: 'F110', title: "Justin Bieber lance sa propre cryptomonnaie", isTrue: false, category: 'celebrites' },
  // Complotisme
 { id: 'G101', title: "Des puces 5G découvertes dans des chewing-gums populaires", isTrue: false, category: 'complot' },
 { id: 'G102', title: "Les réseaux sociaux utilisent l'IA pour contrôler les émotions des ados", isTrue: false, category: 'complot' },
 { id: 'G103', title: "Un groupe secret d'influenceurs manipule les tendances TikTok", isTrue: false, category: 'complot' },
 { id: 'G104', title: "Les jeux vidéo contiennent des messages subliminaux gouvernementaux", isTrue: false, category: 'complot' },
 { id: 'G105', title: "Les smartphones écoutent nos conversations pour la publicité", isTrue: true, category: 'complot' },
 { id: 'G106', title: "Une IA a prédit la fin du monde en 2025 avec 99% de précision", isTrue: false, category: 'complot' },
 { id: 'G107', title: "Des aliens cachés parmi les stars de K-pop", isTrue: false, category: 'complot' },
 { id: 'G108', title: "Netflix change secrètement la fin des séries selon votre profil", isTrue: false, category: 'complot' },
 { id: 'G109', title: "Les filtres Instagram modifient subtilement notre perception de la réalité", isTrue: true, category: 'complot' },
 { id: 'G110', title: "Un réseau d'avatars IA contrôle les commentaires YouTube", isTrue: false, category: 'complot' },

  // Écologie
 { id: 'H101', title: "Une algue mangeuse de plastique découverte dans l'océan", isTrue: true, category: 'ecologie' },
 { id: 'H102', title: "Des baskets qui se décomposent en plantes après utilisation", isTrue: false, category: 'ecologie' },
 { id: 'H103', title: "Un festival de musique alimenté uniquement par l'énergie du public", isTrue: true, category: 'ecologie' },
 { id: 'H104', title: "Des téléphones portables fonctionnant à l'eau de pluie", isTrue: false, category: 'ecologie' },
 { id: 'H105', title: "Des uniformes scolaires fabriqués à partir de bouteilles recyclées", isTrue: true, category: 'ecologie' },
 { id: 'H106', title: "Un pays interdit TikTok car l'app consomme trop d'énergie", isTrue: false, category: 'ecologie' },
 { id: 'H107', title: "Des arbres génétiquement modifiés qui brillent la nuit pour remplacer les lampadaires", isTrue: true, category: 'ecologie' },
 { id: 'H108', title: "Les vêtements d'occasion réduisent plus la pollution que les voitures électriques", isTrue: true, category: 'ecologie' },
 { id: 'H109', title: "Un nouveau réseau social qui plante un arbre par like", isTrue: false, category: 'ecologie' },
 { id: 'H110', title: "Des étudiants créent du plastique qui se dissout dans l'eau de mer", isTrue: true, category: 'ecologie' },
  // Nouvelles Technologies
 { id: 'I101', title: "Une IA peut maintenant rêver à notre place pendant notre sommeil", isTrue: false, category: 'tech' },
 { id: 'I102', title: "Des lentilles de contact connectées qui traduisent en temps réel", isTrue: true, category: 'tech' },
 { id: 'I103', title: "Un nouveau casque VR qui permet de goûter la nourriture virtuelle", isTrue: false, category: 'tech' },
 { id: 'I104', title: "Des tatouages électroniques qui affichent nos émotions", isTrue: true, category: 'tech' },
 { id: 'I105', title: "Une IA a appris à lire dans les pensées avec 95% de précision", isTrue: false, category: 'tech' },
 { id: 'I106', title: "Des écouteurs qui traduisent les conversations en 40 langues", isTrue: true, category: 'tech' },
 { id: 'I107', title: "Un robot TikToker gagne 10 millions d'abonnés en une semaine", isTrue: false, category: 'tech' },
 { id: 'I108', title: "Des hologrammes 3D remplacent les profs absents dans un lycée", isTrue: false, category: 'tech' },
 { id: 'I109', title: "Un smartphone qui se recharge en captant les ondes WiFi", isTrue: true, category: 'tech' },
 { id: 'I110', title: "Une IA capable de prédire les futures tendances de mode", isTrue: true, category: 'tech' }
];

// Liste des événements spéciaux
export const events = [
  {
    id: 1,
    name: "Rapidité récompensée",
    description: "Gagnez 300 points si vous faites un choix en moins de 15 secondes !",
    effect: "QUICK_CHOICE",
    value: 300,
    timeLimit: 15
  },
  {
    id: 2,
    name: "Chasseur de Fake News",
    description: "Gagnez 500 points si vous trouvez une fake news dans les 15 secondes !",
    effect: "FIND_FAKE",
    value: 500,
    timeLimit: 15
  },
  {
    id: 3,
    name: "Information cruciale",
    description: "Attention ! Perdez 300 points si vous ne validez pas une information vraie dans les 15 secondes",
    effect: "MISS_TRUE",
    value: -300,
    timeLimit: 15
  },
  {
    id: 4,
    name: "Autonomie forcée",
    description: "Perdez 500 points si vous utilisez le Fast Checking dans les 45 prochaines secondes",
    effect: "NO_FASTCHECK",
    value: -500,
    timeLimit: 45
  }
];