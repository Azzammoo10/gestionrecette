const mongoose = require('mongoose');
require('dotenv').config();

const Recipe = require('./models/Recipe');

const sampleRecipes = [
  {
    titre: "Couscous Marocain",
    description: "Un délicieux couscous traditionnel marocain avec légumes et viande d'agneau",
    ingredients: [
      { nom: "Semoule de couscous", quantite: "500g" },
      { nom: "Agneau", quantite: "500g" },
      { nom: "Carottes", quantite: "3" },
      { nom: "Courgettes", quantite: "2" },
      { nom: "Navets", quantite: "2" },
      { nom: "Pois chiches", quantite: "200g" },
      { nom: "Oignon", quantite: "1" },
      { nom: "Épices à couscous", quantite: "2 c.à.s" }
    ],
    instructions: [
      "Faire revenir l'agneau coupé en morceaux avec l'oignon",
      "Ajouter les épices et couvrir d'eau",
      "Ajouter les légumes coupés et les pois chiches",
      "Laisser mijoter 45 minutes",
      "Préparer la semoule à la vapeur",
      "Servir la semoule avec la viande et les légumes"
    ],
    tempsPreparation: 30,
    tempsCuisson: 60,
    nombrePersonnes: 6,
    categorie: "Plat principal",
    difficulte: "Moyen",
    tags: ["marocain", "traditionnel", "agneau", "légumes"],
    auteur: "Chef Fatima"
  },
  {
    titre: "Tajine de Poulet aux Olives",
    description: "Un tajine savoureux avec du poulet tendre, des olives et des citrons confits",
    ingredients: [
      { nom: "Poulet", quantite: "1kg" },
      { nom: "Olives vertes", quantite: "200g" },
      { nom: "Citrons confits", quantite: "2" },
      { nom: "Oignons", quantite: "2" },
      { nom: "Ail", quantite: "4 gousses" },
      { nom: "Gingembre", quantite: "1 c.à.c" },
      { nom: "Safran", quantite: "1 pincée" },
      { nom: "Coriandre fraîche", quantite: "1 bouquet" }
    ],
    instructions: [
      "Faire revenir le poulet avec les oignons et l'ail",
      "Ajouter les épices et un peu d'eau",
      "Laisser mijoter 30 minutes",
      "Ajouter les olives et les citrons confits",
      "Poursuivre la cuisson 15 minutes",
      "Parsemer de coriandre avant de servir"
    ],
    tempsPreparation: 20,
    tempsCuisson: 45,
    nombrePersonnes: 4,
    categorie: "Plat principal",
    difficulte: "Facile",
    tags: ["tajine", "poulet", "marocain", "olives"],
    auteur: "Chef Ahmed"
  },
  {
    titre: "Pastilla au Poulet",
    description: "Une pastilla traditionnelle sucrée-salée avec du poulet et des amandes",
    ingredients: [
      { nom: "Feuilles de brick", quantite: "10" },
      { nom: "Poulet", quantite: "500g" },
      { nom: "Amandes", quantite: "200g" },
      { nom: "Œufs", quantite: "4" },
      { nom: "Oignons", quantite: "2" },
      { nom: "Cannelle", quantite: "2 c.à.c" },
      { nom: "Sucre glace", quantite: "50g" },
      { nom: "Beurre", quantite: "100g" }
    ],
    instructions: [
      "Cuire le poulet avec les oignons et les épices",
      "Effilocher le poulet",
      "Faire revenir les amandes et les mélanger avec la cannelle et le sucre",
      "Préparer les œufs brouillés",
      "Monter la pastilla en couches: feuilles de brick, poulet, œufs, amandes",
      "Badigeonner de beurre et cuire au four à 180°C pendant 30 minutes"
    ],
    tempsPreparation: 45,
    tempsCuisson: 60,
    nombrePersonnes: 6,
    categorie: "Entrée",
    difficulte: "Difficile",
    tags: ["pastilla", "feuilleté", "sucré-salé", "amandes"],
    auteur: "Chef Khadija"
  },
  {
    titre: "Harira Marocaine",
    description: "Soupe traditionnelle marocaine riche et nourrissante",
    ingredients: [
      { nom: "Viande d'agneau", quantite: "300g" },
      { nom: "Lentilles", quantite: "100g" },
      { nom: "Pois chiches", quantite: "100g" },
      { nom: "Tomates", quantite: "400g" },
      { nom: "Oignon", quantite: "1" },
      { nom: "Céleri", quantite: "2 branches" },
      { nom: "Vermicelles", quantite: "100g" },
      { nom: "Épices (cumin, paprika)", quantite: "2 c.à.c" }
    ],
    instructions: [
      "Faire revenir la viande avec l'oignon",
      "Ajouter les tomates écrasées et les épices",
      "Ajouter les lentilles, les pois chiches et l'eau",
      "Laisser mijoter 40 minutes",
      "Ajouter le céleri et les vermicelles",
      "Cuire encore 10 minutes et servir chaud"
    ],
    tempsPreparation: 15,
    tempsCuisson: 50,
    nombrePersonnes: 6,
    categorie: "Entrée",
    difficulte: "Facile",
    tags: ["soupe", "harira", "ramadan", "lentilles"],
    auteur: "Chef Samira"
  },
  {
    titre: "Msemen (Crêpes Feuilletées)",
    description: "Crêpes marocaines feuilletées parfaites pour le petit-déjeuner",
    ingredients: [
      { nom: "Farine", quantite: "500g" },
      { nom: "Semoule fine", quantite: "100g" },
      { nom: "Eau tiède", quantite: "300ml" },
      { nom: "Sel", quantite: "1 c.à.c" },
      { nom: "Levure", quantite: "1 sachet" },
      { nom: "Huile", quantite: "100ml" },
      { nom: "Beurre fondu", quantite: "100g" }
    ],
    instructions: [
      "Mélanger la farine, la semoule, le sel et la levure",
      "Ajouter l'eau progressivement et pétrir",
      "Laisser reposer 30 minutes",
      "Former des boules et les étaler finement",
      "Badigeonner d'huile et beurre, puis plier en carré",
      "Cuire à la poêle jusqu'à coloration dorée"
    ],
    tempsPreparation: 45,
    tempsCuisson: 30,
    nombrePersonnes: 8,
    categorie: "Dessert",
    difficulte: "Moyen",
    tags: ["msemen", "crêpes", "petit-déjeuner", "feuilleté"],
    auteur: "Chef Latifa"
  },
  {
    titre: "Salade Marocaine",
    description: "Salade fraîche de tomates, concombres et poivrons",
    ingredients: [
      { nom: "Tomates", quantite: "4" },
      { nom: "Concombres", quantite: "2" },
      { nom: "Poivrons verts", quantite: "2" },
      { nom: "Oignon", quantite: "1" },
      { nom: "Citron", quantite: "1" },
      { nom: "Huile d'olive", quantite: "3 c.à.s" },
      { nom: "Persil", quantite: "1 bouquet" },
      { nom: "Cumin", quantite: "1 c.à.c" }
    ],
    instructions: [
      "Couper les tomates, concombres et poivrons en petits dés",
      "Hacher finement l'oignon et le persil",
      "Mélanger tous les légumes",
      "Assaisonner avec le citron, l'huile, le sel et le cumin",
      "Laisser reposer 15 minutes avant de servir"
    ],
    tempsPreparation: 15,
    tempsCuisson: 0,
    nombrePersonnes: 4,
    categorie: "Entrée",
    difficulte: "Facile",
    tags: ["salade", "frais", "légumes", "accompagnement"],
    auteur: "Chef Nadia"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Vérifier si des recettes existent déjà
    const count = await Recipe.countDocuments();
    console.log(`📊 Nombre de recettes actuelles: ${count}`);

    if (count === 0) {
      // Insérer les recettes de démonstration
      await Recipe.insertMany(sampleRecipes);
      console.log(`✅ ${sampleRecipes.length} recettes ont été ajoutées!`);
    } else {
      console.log('ℹ️  Des recettes existent déjà dans la base de données');
      const choice = process.argv[2];
      if (choice === '--force') {
        await Recipe.deleteMany({});
        await Recipe.insertMany(sampleRecipes);
        console.log(`✅ Base de données réinitialisée avec ${sampleRecipes.length} recettes!`);
      } else {
        console.log('💡 Utilisez "node seedData.js --force" pour réinitialiser la base de données');
      }
    }

    await mongoose.connection.close();
    console.log('👋 Déconnexion de MongoDB');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

seedDatabase();
