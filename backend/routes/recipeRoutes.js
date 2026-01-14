const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const recipeController = require('../controllers/recipeController');
const { cacheRecipes, invalidateRecipesCache } = require('../middleware/cache');
const { protect } = require('../middleware/auth');

// Validation middleware
const recipeValidation = [
  body('titre').trim().notEmpty().isLength({ min: 3 }),
  body('description').trim().notEmpty().isLength({ min: 10 }),
  body('ingredients').isArray({ min: 1 }),
  body('instructions').isArray({ min: 1 }),
  body('tempsPreparation').isInt({ min: 1 }),
  body('nombrePersonnes').isInt({ min: 1 })
];

// Routes avec cache (1h = 3600 secondes)
router.get('/', cacheRecipes(3600), recipeController.getAllRecipes);
router.get('/search', cacheRecipes(3600), recipeController.searchRecipes);
router.get('/popular', recipeController.getPopularRecipes); // Pas de cache pour avoir les données en temps réel
router.get('/:id', recipeController.getRecipeById); // Pas de cache pour comptabiliser les vues
router.get('/:id/stats', recipeController.getRecipeStats); // Pas de cache pour stats en temps réel

// Routes protégées qui invalident le cache
router.post('/', protect, invalidateRecipesCache, recipeValidation, recipeController.createRecipe);
router.put('/:id', protect, invalidateRecipesCache, recipeValidation, recipeController.updateRecipe);
router.delete('/:id', protect, invalidateRecipesCache, recipeController.deleteRecipe);

module.exports = router;
