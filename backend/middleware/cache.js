const { cacheUtils } = require('../config/redis');

// Middleware de cache pour les recettes
const cacheRecipes = (duration = 600) => {
  return async (req, res, next) => {
    // Créer une clé unique basée sur l'URL et les query params
    const cacheKey = `recipes:${req.originalUrl}`;

    try {
      // Vérifier si les données sont en cache
      const cachedData = await cacheUtils.get(cacheKey);

      if (cachedData) {
        console.log('📦 Cache HIT:', cacheKey);
        return res.json(cachedData);
      }

      console.log('🔍 Cache MISS:', cacheKey);

      // Sauvegarder la fonction json originale
      const originalJson = res.json.bind(res);

      // Override la fonction json pour mettre en cache
      res.json = (data) => {
        // Mettre en cache la réponse
        cacheUtils.set(cacheKey, data, duration);
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error('Erreur middleware cache:', error);
      next();
    }
  };
};

// Middleware pour invalider le cache après modification
const invalidateRecipesCache = async (req, res, next) => {
  try {
    // Invalider tous les caches de recettes
    await cacheUtils.delPattern('recipes:*');
    console.log('🗑️  Cache des recettes invalidé');
  } catch (error) {
    console.error('Erreur invalidation cache:', error);
  }
  next();
};

module.exports = {
  cacheRecipes,
  invalidateRecipesCache
};
