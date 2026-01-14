import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Edit, Trash2, ChefHat, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { recipeService } from '../services/api';

function RecipeDetail({ onEdit, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      const response = await recipeService.getRecipeById(id);
      setRecipe(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement de la recette:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(t('delete_confirm'))) {
      await onDelete(id);
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (!recipe) {
    return <div className="error">{t('no_recipes_found')}</div>;
  }

  return (
    <div className="container">
      <button className="btn btn-secondary" onClick={() => navigate('/')}>
        <ArrowLeft size={20} />
        {t('back')}
      </button>

      <div className="recipe-detail">
        <div 
          className="recipe-detail-image"
          style={recipe.imageUrl ? { backgroundImage: `url(${recipe.imageUrl})` } : {}}
        >
          {!recipe.imageUrl && <ChefHat size={80} className="recipe-placeholder-icon" />}
        </div>

        <div className="recipe-detail-header">
          <div className="recipe-detail-info">
            <h1 className="recipe-detail-title">{recipe.titre}</h1>
            <p className="recipe-detail-description">{recipe.description}</p>
            
            <div className="recipe-meta recipe-detail-meta">
              <div className="meta-item-detail">
                <Clock size={24} />
                <div>
                  <span className="meta-label">{t('preparation')}</span>
                  <span className="meta-value">{recipe.tempsPreparation} {t('min')}</span>
                </div>
              </div>
              {recipe.tempsCuisson > 0 && (
                <div className="meta-item-detail">
                  <Flame size={24} />
                  <div>
                    <span className="meta-label">{t('cooking')}</span>
                    <span className="meta-value">{recipe.tempsCuisson} {t('min')}</span>
                  </div>
                </div>
              )}
              <div className="meta-item-detail">
                <Users size={24} />
                <div>
                  <span className="meta-label">{t('servings')}</span>
                  <span className="meta-value">{recipe.nombrePersonnes} {t('persons')}</span>
                </div>
              </div>
            </div>
            
            <div className="recipe-detail-badges">
              <span className="detail-badge category-badge">{recipe.categorie}</span>
              <span className="detail-badge difficulty-badge">{recipe.difficulte}</span>
            </div>
          </div>
          
          <div className="recipe-detail-actions">
            <button className="btn btn-primary" onClick={() => onEdit(recipe)}>
              <Edit size={18} />
              {t('edit')}
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              <Trash2 size={18} />
              {t('delete')}
            </button>
          </div>
        </div>

        <div className="recipe-detail-content">
          <div className="detail-section">
            <h3 className="detail-section-title">
              <span className="section-icon">📝</span>
              {t('ingredients')}
            </h3>
            <ul className="ingredients-detail">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span className="ingredient-quantity">{ingredient.quantite}</span>
                  <span className="ingredient-name">{ingredient.nom}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h3 className="detail-section-title">
              <span className="section-icon">👨‍🍳</span>
              {t('instructions')}
            </h3>
            <ol className="instructions-detail">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="detail-section">
            <h3 className="detail-section-title">
              <span className="section-icon">🏷️</span>
              {t('tags')}
            </h3>
            <div className="recipe-tags">
              {recipe.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {recipe.auteur && (
          <div className="recipe-author">
            <ChefHat size={18} />
            <span>{t('by')} <strong>{recipe.auteur}</strong></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;
