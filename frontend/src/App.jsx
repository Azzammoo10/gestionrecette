import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import PopularRecipes from './components/PopularRecipes';
import Login from './components/Login';
import Signup from './components/Signup';
import { recipeService } from './services/api';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Chargement...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    categorie: '',
    difficulte: '',
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadRecipes();
  }, [filters]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeService.getAllRecipes(filters);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Erreur lors du chargement des recettes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecipe = () => {
    setEditingRecipe(null);
    setShowForm(true);
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleDeleteRecipe = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      try {
        await recipeService.deleteRecipe(id);
        loadRecipes();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de la recette');
      }
    }
  };

  const handleSubmitRecipe = async (recipeData) => {
    try {
      console.log('App.jsx - handleSubmitRecipe appelé avec:', recipeData);
      
      if (editingRecipe) {
        console.log('Mode édition, ID:', editingRecipe._id);
        await recipeService.updateRecipe(editingRecipe._id, recipeData);
      } else {
        console.log('Mode création');
        const response = await recipeService.createRecipe(recipeData);
        console.log('Réponse du serveur:', response);
      }
      
      console.log('Fermeture du formulaire et rechargement...');
      setShowForm(false);
      setEditingRecipe(null);
      loadRecipes();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      console.error('Détails erreur:', error.response?.data);
      throw error;
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className="App">
      <Navbar onCreateRecipe={handleCreateRecipe} />
      
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login />
          } 
        />
        <Route 
          path="/signup" 
          element={
            isAuthenticated ? <Navigate to="/" /> : <Signup />
          } 
        />
        <Route 
          path="/" 
          element={
            <>
              <PopularRecipes />
              <RecipeList
                recipes={recipes}
                loading={loading}
                filters={filters}
                onFilterChange={handleFilterChange}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
              />
            </>
          } 
        />
        <Route 
          path="/recipe/:id" 
          element={
            <RecipeDetail 
              onEdit={handleEditRecipe}
              onDelete={handleDeleteRecipe}
            />
          } 
        />
      </Routes>

      {showForm && isAuthenticated && (
        <RecipeForm
          recipe={editingRecipe}
          onSubmit={handleSubmitRecipe}
          onClose={() => {
            setShowForm(false);
            setEditingRecipe(null);
          }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
