# 🛠️ Commandes Utiles - Gestion de Recettes

## 📦 Installation

```powershell
# Installation complète
.\install.ps1

# Installation backend uniquement
cd backend
npm install

# Installation frontend uniquement
cd frontend
npm install
```

## 🚀 Démarrage

```powershell
# Démarrage automatique (tout en un)
.\start.ps1

# Démarrage manuel backend
cd backend
npm start

# Démarrage manuel frontend
cd frontend
npm run dev
```

## 🔴 Redis

```powershell
# Démarrer Redis
Start-Process "C:\Program Files\Redis\redis-server.exe" -ArgumentList "C:\Program Files\Redis\redis.windows.conf" -WindowStyle Hidden

# Vérifier si Redis tourne
Get-Process redis-server

# Arrêter Redis
Stop-Process -Name redis-server -Force

# Vider le cache Redis (backend en cours d'exécution)
cd backend
node clearCache.js

# Commandes Redis CLI (si redis-cli est dans le PATH)
redis-cli KEYS *           # Voir toutes les clés
redis-cli KEYS recipes:*   # Voir les clés recettes
redis-cli FLUSHALL         # Vider tout Redis (⚠️ attention)
redis-cli ZREVRANGE recipes:popular 0 -1 WITHSCORES  # Voir les recettes populaires
```

## 🍃 MongoDB

```powershell
# Démarrer MongoDB (service Windows)
net start MongoDB

# Arrêter MongoDB (service)
net stop MongoDB

# Démarrer MongoDB (manuel)
mongod

# Vérifier si MongoDB tourne
Get-Process mongod

# Se connecter à MongoDB avec mongosh
mongosh
use recettes_db
db.recettes.find()  # Voir toutes les recettes
db.users.find()     # Voir tous les utilisateurs
```

## 🧪 Tests API avec PowerShell

### Obtenir toutes les recettes
```powershell
Invoke-RestMethod http://localhost:5000/api/recipes | ConvertTo-Json -Depth 3
```

### Obtenir une recette spécifique
```powershell
$id = "votre_recipe_id"
Invoke-RestMethod http://localhost:5000/api/recipes/$id
```

### Tester le compteur de vues
```powershell
$id = "votre_recipe_id"
1..5 | ForEach-Object {
    $recipe = Invoke-RestMethod "http://localhost:5000/api/recipes/$id"
    Write-Host "Visite $_ : $($recipe.views) vues" -ForegroundColor Green
}
```

### Obtenir les recettes populaires
```powershell
$popular = Invoke-RestMethod "http://localhost:5000/api/recipes/popular?limit=5"
$popular.recipes | Format-Table rank, titre, views
```

### Rechercher des recettes
```powershell
Invoke-RestMethod "http://localhost:5000/api/recipes?search=poulet"
```

### Filtrer par catégorie
```powershell
Invoke-RestMethod "http://localhost:5000/api/recipes?categorie=Entrée"
```

### Inscription (Register)
```powershell
$body = @{
    nom = "Test User"
    email = "test@example.com"
    motDePasse = "Test1234!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

### Connexion (Login)
```powershell
$body = @{
    email = "test@example.com"
    motDePasse = "Test1234!"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
$token = $response.token
Write-Host "Token: $token"
```

### Créer une recette (avec authentification)
```powershell
$token = "votre_token_jwt"
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$body = @{
    titre = "Ma Nouvelle Recette"
    description = "Une délicieuse recette"
    ingredients = @(
        @{ nom = "Farine"; quantite = "500g" }
        @{ nom = "Sucre"; quantite = "200g" }
    )
    instructions = @("Mélanger", "Cuire")
    tempsPreparation = 30
    nombrePersonnes = 4
    categorie = "Dessert"
    difficulte = "Facile"
} | ConvertTo-Json -Depth 3

Invoke-RestMethod -Uri "http://localhost:5000/api/recipes" -Method POST -Headers $headers -Body $body
```

## 🐛 Dépannage

### Tuer un processus sur un port
```powershell
# Port 5000 (backend)
$process = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
if ($process) { Stop-Process -Id $process -Force }

# Port 3000 (frontend)
$process = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
if ($process) { Stop-Process -Id $process -Force }
```

### Voir les processus Node.js
```powershell
Get-Process node
```

### Arrêter tous les processus Node.js
```powershell
Stop-Process -Name node -Force
```

### Vérifier les ports ouverts
```powershell
Get-NetTCPConnection -LocalPort 5000, 3000, 6379, 27017 | Format-Table
```

### Nettoyer node_modules et réinstaller
```powershell
# Backend
Remove-Item backend\node_modules -Recurse -Force
cd backend
npm install

# Frontend
Remove-Item frontend\node_modules -Recurse -Force
cd frontend
npm install
```

## 📊 Logs et Debug

### Voir les logs du backend
Les logs s'affichent dans la fenêtre PowerShell du backend. Recherchez :
- `🚀 Serveur démarré sur le port 5000`
- `✅ Redis connecté`
- `✅ Connecté à MongoDB`
- `📦 Cache HIT` / `🔍 Cache MISS`

### Voir les logs du frontend
Les logs s'affichent dans :
- Console du navigateur (F12)
- Fenêtre PowerShell du frontend (erreurs Vite)

### Mode développement avec plus de logs
Modifiez `backend/server.js` pour plus de verbosité ou utilisez :
```javascript
console.log('DEBUG:', variable);
```

## 🔄 Git

### Avant de pousser
```powershell
# Vérifier les fichiers modifiés
git status

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Description des changements"

# Pousser
git push origin main
```

### Après le clone (binôme)
```powershell
# Cloner
git clone <url>
cd gestion-recettes

# Installer
.\install.ps1

# Démarrer
.\start.ps1
```

## 📈 Statistiques Redis

### Voir toutes les clés
```powershell
cd backend
node -e "const redis = require('ioredis'); const client = new redis(); client.keys('*').then(keys => { console.log(keys); client.disconnect(); });"
```

### Compter les recettes dans MongoDB
```powershell
mongosh --eval "use recettes_db; db.recettes.countDocuments()"
```

## 🎨 Frontend - Build de production

```powershell
cd frontend
npm run build
# Les fichiers sont dans frontend/dist
```

## 🔐 Sécurité

### Changer le JWT_SECRET
```powershell
# Générer un secret aléatoire
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Copier le résultat dans backend/.env
```

---

**💡 Astuce** : Créez un alias PowerShell pour démarrer rapidement :
```powershell
Set-Alias -Name startapp -Value "C:\Users\AZZAM\gestion-recettes\start.ps1"
# Puis tapez juste: startapp
```
