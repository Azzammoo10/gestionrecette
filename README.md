# 🍳 Gestion de Recettes - Application Full Stack

Application complète de gestion de recettes marocaines avec Node.js, Express, React, MongoDB et Redis.

## 🚀 Démarrage Rapide

### Installation automatique (Recommandé)

```powershell
# 1. Cloner le projet
git clone <url-du-repo>
cd gestion-recettes

# 2. Lancer le script de démarrage
.\start.ps1
```

Le script `start.ps1` va automatiquement :
- ✅ Vérifier Node.js, Redis et MongoDB
- ✅ Installer toutes les dépendances
- ✅ Créer le fichier .env
- ✅ Démarrer Redis
- ✅ Lancer backend (port 5000) et frontend (port 3000)

**URLs :**
- Frontend : http://localhost:3000
- Backend : http://localhost:5000
- API : http://localhost:5000/api/recipes

---

## ✨ Fonctionnalités Complètes

### ✅ CRUD Complet (Create, Read, Update, Delete)
- **Créer** : Ajout de nouvelles recettes avec validation complète
- **Lire** : Affichage détaillé des recettes avec toutes les informations
- **Modifier** : Édition de recettes existantes
- **Supprimer** : Suppression de recettes avec confirmation

### ✅ Pagination
- Système de pagination côté serveur
- Paramètres configurables : `page`, `limit`
- Compteur total de pages et d'éléments
- Navigation entre les pages

### ✅ Recherche
- Recherche en texte intégral (MongoDB Text Search)
- Index sur les champs `titre`, `description`, et `tags`
- Endpoint dédié : `/api/recipes/search?q=terme`
- Recherche en temps réel côté client

### ✅ Filtrage
- **Par catégorie** : Entrée, Plat principal, Dessert, Boisson, Autre
- **Par difficulté** : Facile, Moyen, Difficile
- Filtres combinables

### ✅ Compteur de Vues (Redis)
- Incrémentation automatique à chaque consultation d'une recette
- Stockage dans Redis : `recipe:views:{id}`
- Persistance des statistiques
- Affichage du nombre de vues

### ✅ Recettes Populaires (Redis Sorted Set)
- Classement automatique par nombre de vues
- Redis Sorted Set : `recipes:popular`
- Endpoint dédié : `/api/recipes/popular?limit=10`
- Section dédiée dans l'interface avec TOP 5
- Mise à jour en temps réel

### ✅ Cache Intelligent (1 heure)
- **Cache général** : 1 heure (3600s) pour les listes et détails
- **Cache populaires** : 30 minutes (1800s)
- Invalidation automatique lors des mutations (POST, PUT, DELETE)
- Clés de cache structurées : `recipes:*`

### ✅ Authentification JWT
- Système de connexion/inscription complet
- Tokens JWT avec expiration de 30 jours
- Middleware de protection des routes
- Context API pour gestion globale de l'auth

### ✅ Internationalisation (i18n)
- **3 langues** : Français, Anglais, Arabe
- Support RTL complet pour l'arabe
- Traductions complètes de toute l'interface
- Détection automatique de la langue
- Sélecteur de langue moderne

### ✅ Design Moderne et Professionnel
- Glassmorphism et backdrop-filter
- Animations fluides (fadeInUp, slideDown, pulse, float)
- Gradients dynamiques
- Effets hover élégants
- Responsive design complet
- 📊 Gestion complète des ingrédients et instructions
- ⏱️ Temps de préparation et cuisson
- 👥 Nombre de personnes
- 🖼️ Support pour les images
- 🏷️ Système de tags

## 🛠️ Technologies utilisées

### Backend
- **Express.js** 4.18.2 - Framework web
- **Mongoose** 8.0.0 - ODM MongoDB
- **ioredis** - Client Redis pour cache et analytics
- **jsonwebtoken** 9.0.3 - JWT auth
- **bcryptjs** 3.0.3 - Hash passwords
- **express-validator** 7.0.1 - Validation
- **cors** - CORS middleware
- **dotenv** - Variables d'environnement

### Frontend
- **React** 18 - UI Library
- **Vite** 7.3.1 - Build tool
- **React Router** 6.20.0 - Routing
- **Axios** 1.6.2 - HTTP client
- **i18next** - Internationalisation (FR, EN, AR)
- **lucide-react** 0.294.0 - Icônes modernes

## 📦 Installation

### Prérequis
- Node.js (v16 ou supérieur)
- MongoDB (installé et en cours d'exécution)
- Redis (v6 ou supérieur)

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd gestion-recettes
```

### 2. Installer le backend
```bash
cd backend
npm install
```

### 3. Configurer l'environnement backend
Créer un fichier `.env` dans le dossier `backend/` :
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recettes_db
JWT_SECRET=votre_secret_jwt_super_securise
JWT_EXPIRE=30d
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

### 4. Installer le frontend
```bash
cd ../frontend
npm install
```

### 5. Configurer MongoDB
Assurez-vous que MongoDB est en cours d'exécution :
```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongodb
```

### 6. Configurer Redis
Assurez-vous que Redis est en cours d'exécution :
```bash
# Windows (avec WSL ou Redis for Windows)
redis-server

# Linux/Mac
sudo systemctl start redis
# ou
redis-server
```

## 🚀 Démarrage

### Démarrer le backend
```bash
cd backend
npm start
# ou pour le mode développement avec nodemon
npm run dev
```
Le serveur backend démarre sur `http://localhost:5000`

### Démarrer le frontend
```bash
cd frontend
npm run dev
```
L'application frontend démarre sur `http://localhost:3000`

## 📁 Structure du projet

```
gestion-recettes/
├── backend/
│   ├── config/
│   │   └── redis.js              # Configuration Redis + utilitaires cache
│   ├── controllers/
│   │   ├── authController.js     # Gestion auth (login, signup)
│   │   └── recipeController.js   # CRUD + stats + populaires
│   ├── middleware/
│   │   ├── auth.js               # Protection JWT
│   │   └── cache.js              # Middleware cache Redis
│   ├── models/
│   │   ├── Recipe.js             # Schéma Mongoose recettes
│   │   └── User.js               # Schéma utilisateur
│   ├── routes/
│   │   ├── authRoutes.js         # Routes auth
│   │   └── recipeRoutes.js       # Routes recettes
│   ├── .env                      # Variables d'environnement
│   ├── seedData.js               # Données de test
│   ├── package.json
│   └── server.js                 # Point d'entrée backend
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Barre de navigation
│   │   │   ├── RecipeList.jsx           # Liste avec filtres
│   │   │   ├── RecipeCard.jsx           # Card de recette
│   │   │   ├── RecipeDetail.jsx         # Page détail + vues
│   │   │   ├── RecipeForm.jsx           # Formulaire création/édition
│   │   │   ├── PopularRecipes.jsx       # Top recettes populaires
│   │   │   ├── LanguageSwitcher.jsx     # Sélecteur de langue
│   │   │   ├── Login.jsx                # Page connexion
│   │   │   └── Signup.jsx               # Page inscription
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # Context global auth
│   │   ├── services/
│   │   │   └── api.js                   # Service API Axios
│   │   ├── i18n.js                      # Configuration i18next
│   │   ├── App.jsx                      # Composant principal
│   │   ├── index.css                    # Styles globaux modernes
│   │   └── main.jsx                     # Point d'entrée React
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔌 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion (retourne token JWT)
- `GET /api/auth/profile` - Profil utilisateur (protégé)
- `PUT /api/auth/profile` - Modifier profil (protégé)
- `PUT /api/auth/change-password` - Changer mot de passe (protégé)

### Recettes
- `GET /api/recipes` - Liste avec pagination/filtres (cache 1h)
- `GET /api/recipes/search?q=terme` - Recherche textuelle (cache 1h)
- `GET /api/recipes/popular?limit=10` - Recettes populaires (cache 30min)
- `GET /api/recipes/:id` - Détail + incrémentation vues (cache 1h)
- `GET /api/recipes/:id/stats` - Statistiques (vues, popularité) temps réel
- `POST /api/recipes` - Créer (invalide cache, protégé)
- `PUT /api/recipes/:id` - Modifier (invalide cache, protégé)
- `DELETE /api/recipes/:id` - Supprimer (invalide cache, protégé)

### Paramètres de requête
- `page` - Numéro de page (défaut: 1)
- `limit` - Nombre de résultats par page (défaut: 10)
- `categorie` - Filtrer par catégorie
- `difficulte` - Filtrer par difficulté
- `search` - Recherche textuelle
- `q` - Query de recherche (pour /search)

## 📝 Exemple de données

```json
{
  "titre": "Tarte aux pommes",
  "description": "Une délicieuse tarte aux pommes maison",
  "ingredients": [
    {
      "nom": "Pommes",
      "quantite": "500g"
    },
    {
      "nom": "Farine",
      "quantite": "250g"
    },
    {
      "nom": "Beurre",
      "quantite": "125g"
    }
  ],
  "instructions": [
    "Préchauffer le four à 180°C",
    "Éplucher et couper les pommes",
    "Préparer la pâte",
    "Assembler et cuire 40 minutes"
  ],
  "tempsPreparation": 30,
  "tempsCuisson": 40,
  "nombrePersonnes": 6,
  "categorie": "Dessert",
  "difficulte": "Moyen",
  "tags": ["dessert", "fruits", "tarte"],
  "auteur": "Chef Antoine",
  "image": "https://example.com/tarte-pommes.jpg"
}
```

## 📈 Fonctionnalités Redis

### Cache
- Clé générale : `recipes:all?page=1&limit=10&categorie=&difficulte=`
- Clé recherche : `recipes:search?q=terme`
- Clé détail : `recipe:{id}`
- TTL : 3600s (1h) pour routes principales, 1800s (30min) pour populaires

### Statistiques
- **Compteur vues** : `recipe:views:{id}` (type: STRING, commande: INCR)
- **Classement populaire** : `recipes:popular` (type: SORTED SET, commandes: ZINCRBY, ZREVRANGE)

### Commandes Redis Utiles
```bash
# Voir toutes les clés
KEYS recipes:*

# Voir les vues d'une recette
GET recipe:views:123abc

# Voir le top 10 populaire avec scores
ZREVRANGE recipes:popular 0 9 WITHSCORES

# Voir le score d'une recette spécifique
ZSCORE recipes:popular 123abc

# Vider tout le cache recettes
DEL recipes:*

# Réinitialiser le compteur de vues
DEL recipe:views:123abc
```

## 🎯 Bonnes Pratiques Implémentées

✅ Architecture MVC séparée
✅ Middleware d'authentification JWT
✅ Validation des données avec express-validator
✅ Gestion d'erreurs centralisée
✅ Cache intelligent avec Redis (1h)
✅ Analytics en temps réel (vues, popularité)
✅ Indexes MongoDB pour performances
✅ Pagination côté serveur
✅ Code modulaire et réutilisable
✅ Commentaires et documentation
✅ Variables d'environnement
✅ CORS configuré
✅ Sécurité bcrypt pour mots de passe
✅ Design moderne et responsive
✅ Internationalisation complète (3 langues)
✅ Animations et transitions fluides
✅ Support RTL pour l'arabe

## 🎨 Interface Utilisateur

L'application comprend :
- **Page d'accueil** : Section des recettes populaires (TOP 5) + liste complète avec filtres
- **Filtres avancés** : Recherche textuelle, catégorie, difficulté
- **Page de détails** : Affichage complet avec compteur de vues, ingrédients, instructions
- **Formulaire modal** : Création/modification avec validation en temps réel
- **Authentification** : Pages de connexion et inscription avec design moderne
- **Sélecteur de langue** : Dropdown élégant avec drapeaux (FR, EN, AR)
- **Interface responsive** : Design adapté pour mobile, tablette et desktop
- **Design moderne** : Glassmorphism, gradients, animations fluides, effets hover

## 🌍 Langues Supportées

- 🇫🇷 **Français** (par défaut)
- 🇬🇧 **Anglais**
- 🇸🇦 **Arabe** (avec support RTL complet)

Toute l'interface est traduite : navigation, formulaires, messages, boutons, labels, etc.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Développé avec ❤️ pour la gestion moderne de recettes

## 🚀 Améliorations Futures Possibles

- [ ] Upload d'images vers un service cloud (AWS S3, Cloudinary)
- [ ] Système de favoris et collections personnelles
- [ ] Notation et commentaires sur les recettes
- [ ] Partage sur réseaux sociaux
- [ ] Mode hors-ligne avec Service Workers
- [ ] Export PDF des recettes
- [ ] Suggestions de recettes basées sur l'IA
- [ ] Conversion automatique des unités de mesure
- [ ] Timer de cuisine intégré
- [ ] Liste de courses générée automatiquement

## 🐛 Dépannage

### MongoDB ne démarre pas
```bash
# Vérifier le statut
sudo systemctl status mongodb

# Relancer
sudo systemctl restart mongodb
```

### Redis ne démarre pas
```bash
# Vérifier le statut
sudo systemctl status redis

# Relancer
sudo systemctl restart redis
```

### Le cache ne se met pas à jour
```bash
# Se connecter à Redis
redis-cli

# Vider le cache
FLUSHDB
```

### Erreur "Module not found"
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

## 📮 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.
