# 📁 Structure du Projet

```
gestion-recettes/
│
├── 📜 start.ps1                    # Script de démarrage automatique
├── 📜 install.ps1                  # Script d'installation des dépendances
├── 📖 README.md                    # Documentation principale
├── 📖 GUIDE_DEMARRAGE.md          # Guide rapide pour binôme
├── 📖 COMMANDES.md                # Commandes utiles
├── 🚫 .gitignore                  # Fichiers à ignorer par Git
│
├── 🔧 backend/                    # Backend Node.js + Express
│   ├── 📁 config/
│   │   ├── db.js                  # Configuration MongoDB
│   │   └── redis.js               # Configuration Redis + cache utils
│   │
│   ├── 📁 controllers/
│   │   ├── authController.js      # Logique authentification
│   │   └── recipeController.js    # Logique recettes (CRUD, search, popular)
│   │
│   ├── 📁 middleware/
│   │   ├── auth.js                # Protection JWT
│   │   ├── cache.js               # Middleware cache Redis
│   │   └── validation.js          # Validation express-validator
│   │
│   ├── 📁 models/
│   │   ├── User.js                # Modèle utilisateur
│   │   └── Recipe.js              # Modèle recette
│   │
│   ├── 📁 routes/
│   │   ├── authRoutes.js          # Routes /api/auth
│   │   └── recipeRoutes.js        # Routes /api/recipes
│   │
│   ├── 📄 server.js               # Point d'entrée backend
│   ├── 📄 package.json            # Dépendances backend
│   ├── 📄 .env                    # Configuration (non versionné)
│   ├── 📄 .env.example            # Exemple de configuration
│   └── 📄 clearCache.js           # Script pour vider le cache Redis
│
├── 🎨 frontend/                   # Frontend React + Vite
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── RecipeCard.jsx       # Carte recette
│   │   │   ├── RecipeList.jsx       # Liste des recettes
│   │   │   ├── RecipeDetail.jsx     # Détail d'une recette
│   │   │   ├── RecipeForm.jsx       # Formulaire création/édition
│   │   │   ├── PopularRecipes.jsx   # Top 5 recettes populaires
│   │   │   ├── SearchBar.jsx        # Barre de recherche
│   │   │   ├── Filters.jsx          # Filtres (catégorie, difficulté)
│   │   │   ├── Pagination.jsx       # Pagination
│   │   │   ├── Navbar.jsx           # Barre de navigation
│   │   │   ├── LanguageSwitcher.jsx # Sélecteur de langue
│   │   │   ├── Login.jsx            # Page connexion
│   │   │   └── Register.jsx         # Page inscription
│   │   │
│   │   ├── 📁 contexts/
│   │   │   └── AuthContext.jsx      # Context API pour auth
│   │   │
│   │   ├── 📁 services/
│   │   │   └── api.js               # Configuration Axios + interceptors
│   │   │
│   │   ├── 📁 i18n/
│   │   │   ├── i18n.js              # Configuration i18next
│   │   │   └── 📁 locales/
│   │   │       ├── fr.json          # Traductions français
│   │   │       ├── en.json          # Traductions anglais
│   │   │       └── ar.json          # Traductions arabe
│   │   │
│   │   ├── 📄 App.jsx               # Composant principal + routes
│   │   ├── 📄 main.jsx              # Point d'entrée React
│   │   └── 📄 index.css             # Styles CSS (thème marocain)
│   │
│   ├── 📄 index.html               # Template HTML
│   ├── 📄 package.json             # Dépendances frontend
│   └── 📄 vite.config.js           # Configuration Vite
│
└── 📁 node_modules/                # Dépendances (non versionné)
```

## 🔑 Fichiers Clés

### Backend

**server.js** - Point d'entrée
- Configure Express, CORS, middlewares
- Connecte MongoDB et Redis
- Lance le serveur sur port 5000

**config/redis.js** - Gestion Redis
- `redisClient` : Client ioredis
- `cacheUtils` : Fonctions cache (get, set, del, increment, zAdd, zIncrBy, zRevRange)

**controllers/recipeController.js** - Logique métier
- `getAllRecipes` : Liste avec pagination, filtres
- `getRecipeById` : Détail + incrémente vues
- `getPopularRecipes` : Top recettes par vues
- `searchRecipes` : Recherche texte
- `createRecipe` : Créer (protégé)
- `updateRecipe` : Modifier (protégé)
- `deleteRecipe` : Supprimer (protégé)

**middleware/cache.js** - Cache middleware
- Vérifie cache Redis avant contrôleur
- Sauvegarde la réponse en cache si MISS
- TTL configurable par route

**models/Recipe.js** - Schéma Mongoose
```javascript
{
  titre, description, ingredients[], instructions[],
  tempsPreparation, tempsCuisson, nombrePersonnes,
  categorie, difficulte, imageUrl, tags[],
  auteur (ref User), auteurNom,
  timestamps: createdAt, updatedAt
}
```

### Frontend

**App.jsx** - Router
```jsx
Routes:
- / : RecipeList + PopularRecipes
- /recipe/:id : RecipeDetail
- /login : Login
- /register : Register
```

**components/PopularRecipes.jsx**
- Affiche top 5 recettes
- GET /api/recipes/popular?limit=5
- Design carte gradient rose/mint

**components/RecipeForm.jsx**
- Modal création/édition
- Validation côté client
- Envoie JWT token

**services/api.js** - Axios
- Base URL : http://localhost:5000/api
- Request interceptor : ajoute JWT token
- Response interceptor : gère 401 (redirect login)

**i18n/i18n.js** - Internationalisation
- Langues : FR (default), EN, AR
- RTL pour arabe
- localStorage pour persister

**index.css** - Thème marocain
- Variables CSS : --primary, --secondary, --tertiary
- Couleurs : rose corail, mint, saffron
- Gradient background pastel
- Animations hover

## 📊 Base de données

### MongoDB - Collection `recettes`
```javascript
{
  _id: ObjectId,
  titre: String,
  description: String,
  ingredients: [{ nom, quantite }],
  instructions: [String],
  tempsPreparation: Number,
  tempsCuisson: Number,
  nombrePersonnes: Number,
  categorie: String,
  difficulte: String,
  imageUrl: String,
  tags: [String],
  auteur: ObjectId,
  auteurNom: String,
  createdAt: Date,
  updatedAt: Date
}
```

### MongoDB - Collection `users`
```javascript
{
  _id: ObjectId,
  nom: String,
  email: String (unique),
  motDePasse: String (hashed bcrypt),
  createdAt: Date
}
```

### Redis - Clés

**Cache réponses API** (TTL 1h)
```
recipes:/api/recipes
recipes:/api/recipes?page=1&limit=10
recipes:/api/recipes?search=poulet
recipes:/api/recipes?categorie=Entrée
```

**Compteurs de vues** (pas d'expiration)
```
recipe:views:6968226f2ff86182f58ad116 = 9
recipe:views:69680214df6c2cadc38d396a = 3
```

**Sorted set popularité** (pas d'expiration)
```
recipes:popular
  - member: 6968226f2ff86182f58ad116, score: 9
  - member: 69680214df6c2cadc38d3973, score: 6
```

## 🔄 Flux de données

### Consultation d'une recette

1. User clique sur recette → Frontend
2. `GET /api/recipes/:id` → Backend
3. Backend incrémente `recipe:views:{id}` dans Redis
4. Backend incrémente score dans `recipes:popular` (ZINCRBY)
5. Backend récupère recette depuis MongoDB
6. Backend ajoute `views` depuis Redis
7. Backend retourne JSON avec recette + vues
8. Frontend affiche RecipeDetail

### Recettes populaires

1. Frontend charge `GET /api/recipes/popular?limit=5`
2. Backend récupère top IDs depuis `recipes:popular` (ZREVRANGE)
3. Backend récupère détails depuis MongoDB
4. Backend récupère `views` pour chaque recette
5. Backend trie par nombre de vues décroissant
6. Backend ajoute `rank` (1 à 5)
7. Frontend affiche PopularRecipes

### Création de recette

1. User remplit RecipeForm → Frontend
2. Frontend envoie `POST /api/recipes` avec JWT token
3. Middleware `protect` vérifie token
4. Backend valide données (express-validator)
5. Backend nettoie champ `auteur` vide
6. Backend ajoute `req.user._id` comme auteur
7. Backend sauvegarde dans MongoDB
8. Backend invalide cache
9. Frontend recharge liste

## 🎯 Points d'entrée

**Développement:**
- Frontend dev: `npm run dev` (Vite hot reload)
- Backend dev: `npm start` (nodemon auto-restart)

**URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API: http://localhost:5000/api/recipes

**Scripts:**
- Installation: `.\install.ps1`
- Démarrage: `.\start.ps1`
- Clear cache: `node backend/clearCache.js`
