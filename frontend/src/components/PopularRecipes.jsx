import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Eye, Clock, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function PopularRecipes() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPopularRecipes();
  }, []);

  const loadPopularRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/recipes/popular?limit=5');
      setRecipes(response.data.recipes || response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des recettes populaires:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="popular-recipes">
        <div className="popular-header">
          <TrendingUp size={24} />
          <h2>{t('popular_recipes')}</h2>
        </div>
        <div className="loading-small">{t('loading')}</div>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <div className="popular-recipes">
      <div className="popular-header">
        <TrendingUp size={24} />
        <h2>{t('popular_recipes')}</h2>
      </div>
      <div className="popular-list">
        {recipes.map((recipe, index) => (
          <div 
            key={recipe._id} 
            className="popular-item"
            onClick={() => navigate(`/recipe/${recipe._id}`)}
          >
            <div className="popular-rank">#{index + 1}</div>
            <div className="popular-content">
              <h4>{recipe.titre}</h4>
              <div className="popular-meta">
                <span className="popular-stat">
                  <Eye size={14} />
                  {recipe.views || 0} {t('views')}
                </span>
                <span className="popular-stat">
                  <Clock size={14} />
                  {recipe.tempsPreparation + recipe.tempsCuisson} {t('min')}
                </span>
                <span className="popular-stat">
                  <Users size={14} />
                  {recipe.nombrePersonnes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularRecipes;
