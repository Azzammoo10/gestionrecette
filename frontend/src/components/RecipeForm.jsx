import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function RecipeForm({ recipe, onSubmit, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    ingredients: [{ nom: '', quantite: '' }],
    instructions: [''],
    tempsPreparation: 0,
    tempsCuisson: 0,
    nombrePersonnes: 0,
    categorie: 'Autre',
    difficulte: 'Moyen',
    imageUrl: '',
    tags: [],
    auteur: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recipe) {
      setFormData({
        titre: recipe.titre || '',
        description: recipe.description || '',
        ingredients: recipe.ingredients && recipe.ingredients.length > 0 ? recipe.ingredients : [{ nom: '', quantite: '' }],
        instructions: recipe.instructions && recipe.instructions.length > 0 ? recipe.instructions : [''],
        tempsPreparation: recipe.tempsPreparation || 0,
        tempsCuisson: recipe.tempsCuisson || 0,
        nombrePersonnes: recipe.nombrePersonnes || 0,
        categorie: recipe.categorie || 'Autre',
        difficulte: recipe.difficulte || 'Moyen',
        imageUrl: recipe.imageUrl || '',
        tags: recipe.tags || [],
        auteur: recipe.auteur || ''
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { nom: '', quantite: '' }]
    }));
  };

  const removeIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData(prev => ({
      ...prev,
      instructions: newInstructions
    }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.titre || formData.titre.length < 3) {
      newErrors.titre = t('title') + ' ' + t('password_too_short');
    }

    if (!formData.description || formData.description.length < 10) {
      newErrors.description = t('description') + ' must be at least 10 characters';
    }

    if (formData.ingredients.length === 0 || formData.ingredients.some(i => !i.nom || !i.quantite)) {
      newErrors.ingredients = t('ingredients_title') + ' required';
    }

    if (formData.instructions.length === 0 || formData.instructions.some(i => !i.trim())) {
      newErrors.instructions = t('instructions_title') + ' required';
    }

    if (!formData.tempsPreparation || formData.tempsPreparation < 1) {
      newErrors.tempsPreparation = t('prep_time') + ' required';
    }

    if (!formData.nombrePersonnes || formData.nombrePersonnes < 1) {
      newErrors.nombrePersonnes = t('servings') + ' required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Formulaire soumis, données:', formData);

    if (!validate()) {
      console.error('Validation échouée, erreurs:', errors);
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    console.log('Validation réussie, envoi au serveur...');

    try {
      // Nettoyer les données avant l'envoi
      const cleanData = { ...formData };
      
      // Supprimer le champ auteur s'il est vide
      if (!cleanData.auteur || cleanData.auteur === '') {
        delete cleanData.auteur;
      }
      
      console.log('Données nettoyées:', cleanData);
      
      await onSubmit(cleanData);
      console.log('Recette créée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      console.error('Message erreur serveur:', error.response?.data?.error);
      console.error('Message détaillé:', error.response?.data?.message);
      console.error('Erreurs de validation:', error.response?.data?.errors);
      alert('Erreur: ' + (error.response?.data?.message || error.response?.data?.error || error.message || t('error_save')));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{recipe ? t('edit_recipe_title') : t('new_recipe_title')}</h2>
          <button className="icon-btn close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>{t('title')} *</label>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                placeholder={t('title_placeholder')}
              />
              {errors.titre && <span className="error">{errors.titre}</span>}
            </div>

            <div className="form-group">
              <label>{t('description')} *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t('description_placeholder')}
              />
              {errors.description && <span className="error">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('category')}</label>
                <select name="categorie" value={formData.categorie} onChange={handleChange}>
                  <option value="Entrée">{t('appetizer')}</option>
                  <option value="Plat principal">{t('main_course')}</option>
                  <option value="Dessert">{t('dessert')}</option>
                  <option value="Boisson">{t('drink')}</option>
                  <option value="Autre">{t('other')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t('difficulty')}</label>
                <select name="difficulte" value={formData.difficulte} onChange={handleChange}>
                  <option value="Facile">{t('easy')}</option>
                  <option value="Moyen">{t('medium')}</option>
                  <option value="Difficile">{t('hard')}</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('prep_time')} *</label>
                <input
                  type="number"
                  name="tempsPreparation"
                  value={formData.tempsPreparation}
                  onChange={handleChange}
                  min="1"
                />
                {errors.tempsPreparation && <span className="error">{errors.tempsPreparation}</span>}
              </div>

              <div className="form-group">
                <label>{t('cooking_time')}</label>
                <input
                  type="number"
                  name="tempsCuisson"
                  value={formData.tempsCuisson}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>{t('servings')} *</label>
                <input
                  type="number"
                  name="nombrePersonnes"
                  value={formData.nombrePersonnes}
                  onChange={handleChange}
                  min="1"
                />
                {errors.nombrePersonnes && <span className="error">{errors.nombrePersonnes}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>{t('ingredients_title')} *</label>
              {errors.ingredients && <span className="error">{errors.ingredients}</span>}
              <div className="ingredients-list">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <input
                      type="text"
                      placeholder={t('quantity')}
                      value={ingredient.quantite}
                      onChange={(e) => handleIngredientChange(index, 'quantite', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder={t('ingredient')}
                      value={ingredient.nom}
                      onChange={(e) => handleIngredientChange(index, 'nom', e.target.value)}
                    />
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => removeIngredient(index)}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-secondary" onClick={addIngredient}>
                <Plus size={18} />
                {t('add_ingredient')}
              </button>
            </div>

            <div className="form-group">
              <label>{t('instructions_title')} *</label>
              {errors.instructions && <span className="error">{errors.instructions}</span>}
              <div className="instructions-list">
                {formData.instructions.map((instruction, index) => (
                  <div key={index} className="instruction-item">
                    <textarea
                      placeholder={`${t('step')} ${index + 1}`}
                      value={instruction}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      style={{ minHeight: '60px' }}
                    />
                    {formData.instructions.length > 1 && (
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => removeInstruction(index)}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-secondary" onClick={addInstruction}>
                <Plus size={18} />
                {t('add_instruction')}
              </button>
            </div>

            <div className="form-group">
              <label>{t('image_url')}</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://exemple.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label>{t('tags_title')}</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder={t('add_tag')}
                />
                <button type="button" className="btn btn-secondary" onClick={addTag}>
                  <Plus size={18} />
                </button>
              </div>
              <div className="recipe-tags">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="tag" style={{ cursor: 'pointer' }} onClick={() => removeTag(tag)}>
                    {tag} <X size={14} />
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>{t('author')}</label>
              <input
                type="text"
                name="auteur"
                value={formData.auteur}
                onChange={handleChange}
                placeholder={t('author_placeholder')}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {t('cancel')}
            </button>
            <button type="submit" className="btn btn-success">
              {recipe ? t('update') : t('create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeForm;
