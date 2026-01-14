# 👋 LISEZ-MOI EN PREMIER !

Salut ! Si tu vois ce fichier, c'est que tu viens de cloner le projet. Voici ce que tu dois faire :

## ⚡ Démarrage Ultra-Rapide (3 étapes)

### 1️⃣ Installe les prérequis

Tu as besoin de :
- **Node.js** : https://nodejs.org (prends la version LTS)
- **MongoDB** : https://www.mongodb.com/try/download/community
- **Redis** : https://github.com/microsoftarchive/redis/releases (fichier .msi)

### 2️⃣ Installe le projet

Ouvre PowerShell dans le dossier du projet et tape :

```powershell
.\install.ps1
```

Ce script va installer toutes les dépendances automatiquement.

### 3️⃣ Lance l'application

```powershell
.\start.ps1
```

Ce script va :
- Vérifier que tout est OK
- Démarrer Redis et MongoDB
- Lancer le backend (port 5000)
- Lancer le frontend (port 3000)

**C'est tout !** Ouvre ton navigateur sur http://localhost:3000

---

## 📚 Si tu veux en savoir plus

- **GUIDE_DEMARRAGE.md** : Guide complet de démarrage
- **README.md** : Documentation principale du projet
- **COMMANDES.md** : Toutes les commandes utiles
- **STRUCTURE.md** : Architecture du projet

---

## 🆘 Problèmes ?

### Le script ne fonctionne pas

```powershell
# Autorise l'exécution de scripts PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Redis ne démarre pas

Installe Redis depuis : https://github.com/microsoftarchive/redis/releases/download/win-3.0.504/Redis-x64-3.0.504.msi

### MongoDB ne démarre pas

Démarre-le manuellement :
```powershell
net start MongoDB
```

### Port déjà utilisé

```powershell
# Tue le processus sur le port 5000
$p = Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id $p -Force
```

---

## 🎯 Que fait ce projet ?

C'est une application de gestion de recettes marocaines avec :
- ✅ Authentification (inscription/connexion)
- ✅ CRUD de recettes
- ✅ Recherche et filtres
- ✅ Recettes populaires (top 5 des plus vues)
- ✅ Compteur de vues en temps réel
- ✅ Support multilingue (FR, EN, AR)
- ✅ Design marocain moderne

---

**Bon code ! 🚀**

PS : Si vraiment tu bloques, lis le **GUIDE_DEMARRAGE.md** ou contacte-moi.
