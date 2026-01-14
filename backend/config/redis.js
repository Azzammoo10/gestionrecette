const Redis = require('ioredis');

// Configuration Redis
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3
});

redisClient.on('connect', () => {
  console.log('✅ Redis connecté');
});

redisClient.on('error', (err) => {
  console.error('❌ Erreur Redis:', err.message);
});

redisClient.on('ready', () => {
  console.log('🚀 Redis prêt');
});

// Fonctions utilitaires pour le cache
const cacheUtils = {
  // Définir une valeur dans le cache
  async set(key, value, expirationInSeconds = 3600) {
    try {
      const stringValue = JSON.stringify(value);
      await redisClient.setex(key, expirationInSeconds, stringValue);
      return true;
    } catch (error) {
      console.error('Erreur cache set:', error);
      return false;
    }
  },

  // Récupérer une valeur du cache
  async get(key) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erreur cache get:', error);
      return null;
    }
  },

  // Supprimer une clé du cache
  async del(key) {
    try {
      await redisClient.del(key);
      return true;
    } catch (error) {
      console.error('Erreur cache del:', error);
      return false;
    }
  },

  // Supprimer toutes les clés correspondant à un pattern
  async delPattern(pattern) {
    try {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(...keys);
      }
      return true;
    } catch (error) {
      console.error('Erreur cache delPattern:', error);
      return false;
    }
  },

  // Incrémenter un compteur
  async increment(key, expirationInSeconds = null) {
    try {
      const value = await redisClient.incr(key);
      if (expirationInSeconds) {
        await redisClient.expire(key, expirationInSeconds);
      }
      return value;
    } catch (error) {
      console.error('Erreur cache increment:', error);
      return null;
    }
  },

  // Vérifier si une clé existe
  async exists(key) {
    try {
      const exists = await redisClient.exists(key);
      return exists === 1;
    } catch (error) {
      console.error('Erreur cache exists:', error);
      return false;
    }
  },

  // Ajouter à un sorted set (pour les recettes populaires)
  async zAdd(key, score, member) {
    try {
      await redisClient.zadd(key, score, member);
      return true;
    } catch (error) {
      console.error('Erreur cache zadd:', error);
      return false;
    }
  },

  // Incrémenter le score dans un sorted set
  async zIncrBy(key, increment, member) {
    try {
      const newScore = await redisClient.zincrby(key, increment, member);
      return parseFloat(newScore);
    } catch (error) {
      console.error('Erreur cache zincrby:', error);
      return null;
    }
  },

  // Obtenir les meilleurs éléments d'un sorted set
  async zRevRange(key, start, stop) {
    try {
      const members = await redisClient.zrevrange(key, start, stop, 'WITHSCORES');
      const results = [];
      for (let i = 0; i < members.length; i += 2) {
        results.push({
          member: members[i],
          score: parseFloat(members[i + 1])
        });
      }
      return results;
    } catch (error) {
      console.error('Erreur cache zrevrange:', error);
      return [];
    }
  },

  // Obtenir le score d'un membre dans un sorted set
  async zScore(key, member) {
    try {
      const score = await redisClient.zscore(key, member);
      return score ? parseFloat(score) : 0;
    } catch (error) {
      console.error('Erreur cache zscore:', error);
      return 0;
    }
  }
};

module.exports = { redisClient, cacheUtils };
