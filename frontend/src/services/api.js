import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const recipeService = {
  // Obtenir toutes les recettes
  getAllRecipes: (params = {}) => {
    return api.get('/recipes', { params });
  },

  // Obtenir une recette par ID
  getRecipeById: (id) => {
    return api.get(`/recipes/${id}`);
  },

  // Créer une nouvelle recette
  createRecipe: (recipeData) => {
    return api.post('/recipes', recipeData);
  },

  // Mettre à jour une recette
  updateRecipe: (id, recipeData) => {
    return api.put(`/recipes/${id}`, recipeData);
  },

  // Supprimer une recette
  deleteRecipe: (id) => {
    return api.delete(`/recipes/${id}`);
  },

  // Rechercher des recettes
  searchRecipes: (query) => {
    return api.get('/recipes/search', { params: { q: query } });
  },
};

export default api;
