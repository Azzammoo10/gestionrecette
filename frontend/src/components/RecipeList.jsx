import RecipeCard from './RecipeCard';
import { Search, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function RecipeList({ recipes, loading, filters, onFilterChange, onEdit, onDelete }) {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="filters">
        <div className="filters-header">
          <Filter size={24} />
          <h2>{t('search')}</h2>
        </div>
        <div className="filters-content">
          <div className="filter-group">
            <label>{t('search')}</label>
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={filters.search}
                onChange={(e) => onFilterChange('search', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>{t('category')}</label>
            <select
              value={filters.categorie}
              onChange={(e) => onFilterChange('categorie', e.target.value)}
            >
              <option value="">{t('all_categories')}</option>
              <option value="Entrée">{t('appetizer')}</option>
              <option value="Plat principal">{t('main_course')}</option>
              <option value="Dessert">{t('dessert')}</option>
              <option value="Boisson">{t('drink')}</option>
              <option value="Autre">{t('other')}</option>
            </select>
          </div>

          <div className="filter-group">
            <label>{t('difficulty')}</label>
            <select
              value={filters.difficulte}
              onChange={(e) => onFilterChange('difficulte', e.target.value)}
            >
              <option value="">{t('all_difficulties')}</option>
              <option value="Facile">{t('easy')}</option>
              <option value="Moyen">{t('medium')}</option>
              <option value="Difficile">{t('hard')}</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>{t('loading')}</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🍽️</div>
          <h3>{t('no_recipes_found')}</h3>
          <p>{t('start_adding')}</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
