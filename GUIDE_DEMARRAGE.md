# 🚀 Guide de démarrage rapide

## Pour le binôme qui clone le projet

### 1️⃣ Prérequis

Installez ces logiciels avant de commencer :

**Node.js (obligatoire)**
- Téléchargez : https://nodejs.org
- Version recommandée : 18.x ou supérieur
- Vérifiez : `node -v`

**MongoDB (obligatoire)**
- Téléchargez : https://www.mongodb.com/try/download/community
- Version recommandée : 6.x ou supérieur
- Démarrez : `net start MongoDB` ou `mongod`

**Redis (obligatoire)**
- Téléchargez : https://github.com/microsoftarchive/redis/releases
- Fichier : Redis-x64-3.0.504.msi
- Installez dans : `C:\Program Files\Redis\`

### 2️⃣ Installation du projet

```powershell
# 1. Cloner le repo
git clone <url-du-repo>
cd gestion-recettes

# 2. Installer les dépendances
.\install.ps1
```

Le script `install.ps1` va :
- Installer toutes les dépendances npm (backend + frontend)
- Créer le fichier `.env` automatiquement

### 3️⃣ Configuration (Optionnel)

Si besoin, modifiez `backend\.env` :

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recettes_db
JWT_SECRET=changez_moi_en_production
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4️⃣ Démarrage

```powershell
# Lancer tout automatiquement
.\start.ps1
```

Le script va :
✅ Vérifier les prérequis  
✅ Démarrer Redis automatiquement  
✅ Lancer le backend (http://localhost:5000)  
✅ Lancer le frontend (http://localhost:3000)  

### 5️⃣ Accès à l'application

Ouvrez votre navigateur :
- **Frontend** : http://localhost:3000
- **API** : http://localhost:5000/api/recipes

### 6️⃣ Compte de test

Créez un compte ou utilisez :
- **Email** : test@test.com
- **Mot de passe** : Test1234!

---

## 🛠️ Commandes utiles

### Démarrage manuel

**Backend :**
```powershell
cd backend
npm start
```

**Frontend :**
```powershell
cd frontend
npm run dev
```

### Vérifier Redis

```powershell
# Voir si Redis tourne
Get-Process redis-server

# Démarrer Redis
Start-Process "C:\Program Files\Redis\redis-server.exe"

# Arrêter Redis
Stop-Process -Name redis-server -Force
```

### Vérifier MongoDB

```powershell
# Voir si MongoDB tourne
Get-Process mongod

# Démarrer MongoDB (service)
net start MongoDB

# Démarrer MongoDB (manuel)
mongod
```

---

## 🐛 Problèmes courants

### Le backend ne démarre pas

**Erreur : Port 5000 déjà utilisé**
```powershell
# Trouver et tuer le processus
$process = Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id $process -Force
```

**Erreur : MongoDB connection failed**
- Vérifiez que MongoDB est lancé : `net start MongoDB`
- Vérifiez l'URL dans `.env` : `MONGODB_URI=mongodb://localhost:27017/recettes_db`

**Erreur : Redis connection failed**
- Démarrez Redis : `Start-Process "C:\Program Files\Redis\redis-server.exe"`
- Le projet peut fonctionner sans Redis mais sans cache

### Le frontend ne se connecte pas

- Vérifiez que le backend tourne sur le port 5000
- Vérifiez dans `frontend\src\services\api.js` que l'URL est `http://localhost:5000`
- Désactivez temporairement votre antivirus/firewall

### Erreur CORS

C'est normal si vous testez depuis un autre port. Le backend accepte :
- http://localhost:3000 (frontend Vite)
- http://localhost:5173 (frontend Vite alternatif)

---

## 📚 Fonctionnalités principales

✅ **CRUD** - Créer, modifier, supprimer des recettes  
✅ **Authentification** - JWT avec inscription/connexion  
✅ **Recherche** - Par titre, ingrédients, catégorie  
✅ **Filtres** - Par catégorie et difficulté  
✅ **Pagination** - Navigation entre les pages  
✅ **Compteur de vues** - Suivi des recettes consultées  
✅ **Recettes populaires** - Top 5 des plus vues  
✅ **Multilingue** - FR, EN, AR avec RTL  
✅ **Thème marocain** - Design moderne et coloré  

---

## 💡 Conseils

- Laissez les fenêtres PowerShell ouvertes (backend/frontend)
- Pour arrêter : fermez les fenêtres ou `Ctrl+C`
- Les logs s'affichent dans les fenêtres PowerShell
- Rechargez la page si une erreur survient
- Videz le cache navigateur en cas de problème (Ctrl+Shift+R)

---

## 📞 Besoin d'aide ?

1. Lisez le `README.md` complet
2. Vérifiez que tous les services sont lancés
3. Consultez les logs dans les terminaux
4. Contactez le développeur principal

Bon développement ! 🚀
