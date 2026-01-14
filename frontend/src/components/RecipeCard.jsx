import { useNavigate } from 'react-router-dom';
import { Clock, Users, Edit, Trash2, ChefHat } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function RecipeCard({ recipe, onEdit, onDelete }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCardClick = (e) => {
    if (e.target.closest('.icon-btn')) {
      return;
    }
    navigate(`/recipe/${recipe._id}`);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Facile': '#10b981',
      'Easy': '#10b981',
      'سهل': '#10b981',
      'Moyen': '#f59e0b',
      'Medium': '#f59e0b',
      'متوسط': '#f59e0b',
      'Difficile': '#ef4444',
      'Hard': '#ef4444',
      'صعب': '#ef4444'
    };
    return colors[difficulty] || '#6b7280';
  };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <div className="recipe-card-badge">
        <span style={{ color: getDifficultyColor(recipe.difficulte) }}>
          {recipe.difficulte}
        </span>
      </div>
      
      <div 
        className="recipe-image" 
        style={recipe.imageUrl ? { backgroundImage: `url(${recipe.imageUrl})` } : {}}
      >
        {!recipe.imageUrl && <ChefHat size={60} className="recipe-placeholder-icon" />}
      </div>
      
      <div className="recipe-content">
        <div className="recipe-header">
          <h3 className="recipe-title">{recipe.titre}</h3>
          <p className="recipe-description">{recipe.description}</p>
        </div>

        <div className="recipe-meta">
          <div className="meta-item">
            <Clock size={16} />
            <span>{recipe.tempsPreparation + recipe.tempsCuisson} {t('min')}</span>
          </div>
          <div className="meta-item">
            <Users size={16} />
            <span>{recipe.nombrePersonnes} {t('persons')}</span>
          </div>
        </div>

        <div className="recipe-category-tag">
          <span className="category-badge">{recipe.categorie}</span>
        </div>

        <div className="recipe-actions">
          <button
            className="icon-btn icon-btn-edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(recipe);
            }}
            title={t('edit')}
          >
            <Edit size={18} />
          </button>
          <button
            className="icon-btn icon-btn-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(recipe._id);
            }}
            title={t('delete')}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
