const Redis = require('ioredis');

const redis = new Redis({
  host: 'localhost',
  port: 6379
});

async function clearCache() {
  try {
    console.log('🧹 Nettoyage du cache Redis...\n');
    
    // Récupérer toutes les clés de cache
    const keys = await redis.keys('recipes:*');
    console.log(`📦 ${keys.length} clés trouvées`);
    
    if (keys.length > 0) {
      // Supprimer toutes les clés
      await redis.del(...keys);
      console.log('✅ Cache vidé !\n');
    }
    
    // Vérifier le sorted set
    console.log('📊 Contenu du sorted set recipes:popular:');
    const popular = await redis.zrevrange('recipes:popular', 0, -1, 'WITHSCORES');
    if (popular.length === 0) {
      console.log('⚠️ Aucune donnée dans recipes:popular');
    } else {
      for (let i = 0; i < popular.length; i += 2) {
        console.log(`  - ${popular[i]}: ${popular[i + 1]} vues`);
      }
    }
    
    // Vérifier les compteurs de vues
    console.log('\n👁️ Compteurs de vues:');
    const viewKeys = await redis.keys('recipe:views:*');
    for (const key of viewKeys.slice(0, 5)) {
      const views = await redis.get(key);
      const id = key.replace('recipe:views:', '');
      console.log(`  - ${id}: ${views} vues`);
    }
    
    redis.disconnect();
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    redis.disconnect();
  }
}

clearCache();
