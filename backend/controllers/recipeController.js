const Recipe = require('../models/Recipe');
const { validationResult } = require('express-validator');
const { cacheUtils } = require('../config/redis');

// Obtenir toutes les recettes
exports.getAllRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 10, categorie, difficulte, search } = req.query;
    
    let query = {};
    
    if (categorie) {
      query.categorie = categorie;
    }
    
    if (difficulte) {
      query.difficulte = difficulte;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const recipes = await Recipe.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();
    
    const count = await Recipe.countDocuments(query);
    
    res.json({
      recipes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des recettes',
      message: error.message 
    });
  }
};

// Obtenir une recette par ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recette non trouvée' });
    }

    // Incrémenter le compteur de vues dans Redis
    const viewsKey = `recipe:views:${req.params.id}`;
    const views = await cacheUtils.increment(viewsKey);
    
    // Ajouter aux recettes populaires (sorted set)
    await cacheUtils.zIncrBy('recipes:popular', 1, req.params.id);
    
    // Ajouter le nombre de vues à la réponse
    const recipeWithViews = {
      ...recipe.toObject(),
      views: views || 0
    };
    
    res.json(recipeWithViews);
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération de la recette',
      message: error.message 
    });
  }
};

// Créer une nouvelle recette
exports.createRecipe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Préparer les données de la recette
    const recipeData = { ...req.body };
    
    // Si auteur est vide ou invalide, le supprimer et utiliser l'utilisateur connecté
    if (!recipeData.auteur || recipeData.auteur === '') {
      delete recipeData.auteur;
      // Si l'utilisateur est connecté, utiliser son ID
      if (req.user) {
        recipeData.auteur = req.user._id;
        recipeData.auteurNom = `${req.user.prenom} ${req.user.nom}`;
      }
    }
    
    const recipe = new Recipe(recipeData);
    const savedRecipe = await recipe.save();
    
    res.status(201).json({
      message: 'Recette créée avec succès',
      recipe: savedRecipe
    });
  } catch (error) {
    res.status(400).json({ 
      error: 'Erreur lors de la création de la recette',
      message: error.message 
    });
  }
};

// Mettre à jour une recette
exports.updateRecipe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Préparer les données de la recette
    const recipeData = { ...req.body };
    
    // Si auteur est vide ou invalide, le supprimer
    if (!recipeData.auteur || recipeData.auteur === '') {
      delete recipeData.auteur;
    }
    
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      recipeData,
      { new: true, runValidators: true }
    );
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recette non trouvée' });
    }
    
    res.json({
      message: 'Recette mise à jour avec succès',
      recipe
    });
  } catch (error) {
    res.status(400).json({ 
      error: 'Erreur lors de la mise à jour de la recette',
      message: error.message 
    });
  }
};

// Supprimer une recette
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recette non trouvée' });
    }
    
    res.json({ 
      message: 'Recette supprimée avec succès',
      recipe
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la suppression de la recette',
      message: error.message 
    });
  }
};

// Rechercher des recettes
exports.searchRecipes = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Paramètre de recherche requis' });
    }
    
    const recipes = await Recipe.find({
      $text: { $search: q }
    }).limit(20);
    
    res.json({
      recipes,
      count: recipes.length
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la recherche',
      message: error.message 
    });
  }
};

// Obtenir les recettes populaires (les plus vues)
exports.getPopularRecipes = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    // Récupérer les IDs des recettes populaires depuis Redis (déjà triés par score Redis)
    const popularRecipesData = await cacheUtils.zRevRange('recipes:popular', 0, limit - 1);
    
    if (popularRecipesData.length === 0) {
      return res.json({ recipes: [], message: 'Aucune recette populaire pour le moment' });
    }
    
    // Récupérer les détails des recettes depuis MongoDB
    const recipeIds = popularRecipesData.map(item => item.member);
    const recipes = await Recipe.find({ _id: { $in: recipeIds } });
    
    // Créer un Map pour accès rapide aux recettes par ID
    const recipeMap = new Map(recipes.map(r => [r._id.toString(), r]));
    
    // Construire le tableau avec les vues
    const recipesWithViews = await Promise.all(
      popularRecipesData.map(async (item) => {
        const recipe = recipeMap.get(item.member);
        if (!recipe) return null;
        
        const viewsKey = `recipe:views:${item.member}`;
        const views = await cacheUtils.get(viewsKey);
        
        return {
          ...recipe.toObject(),
          views: parseInt(views) || 0,
          popularityScore: item.score
        };
      })
    );
    
    // Filtrer les recettes null et trier par nombre de vues (décroissant)
    const validRecipes = recipesWithViews
      .filter(r => r !== null)
      .sort((a, b) => b.views - a.views);
    
    // Ajouter le rang après le tri
    const rankedRecipes = validRecipes.map((recipe, index) => ({
      ...recipe,
      rank: index + 1
    }));
    
    res.json({
      recipes: rankedRecipes,
      count: rankedRecipes.length
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des recettes populaires',
      message: error.message 
    });
  }
};

// Obtenir les statistiques d'une recette
exports.getRecipeStats = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier que la recette existe
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recette non trouvée' });
    }
    
    // Récupérer les statistiques depuis Redis
    const viewsKey = `recipe:views:${id}`;
    const views = await cacheUtils.get(viewsKey) || 0;
    const popularityScore = await cacheUtils.zScore('recipes:popular', id);
    
    res.json({
      recipeId: id,
      titre: recipe.titre,
      views: parseInt(views),
      popularityScore: popularityScore,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des statistiques',
      message: error.message 
    });
  }
};
