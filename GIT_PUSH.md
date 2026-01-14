# 📤 Commandes Git pour Pousser le Projet

## Avant de pousser - Vérifications

```powershell
# 1. Vérifier que le .gitignore est correct
cat .gitignore

# 2. Vérifier les fichiers qui seront poussés
git status

# 3. S'assurer que node_modules n'est PAS dans la liste
# S'assurer que .env n'est PAS dans la liste
# S'assurer que .env.example EST dans la liste
```

## Initialiser Git (si pas déjà fait)

```powershell
# Initialiser le repo
git init

# Ajouter l'origine (remplacer par votre URL)
git remote add origin https://github.com/votre-username/gestion-recettes.git

# Vérifier l'origine
git remote -v
```

## Pousser le projet

```powershell
# 1. Ajouter tous les fichiers
git add .

# 2. Vérifier ce qui sera commité
git status

# 3. Faire le commit
git commit -m "Initial commit - Application gestion de recettes avec Redis, MongoDB, JWT"

# 4. Pousser sur GitHub (première fois)
git push -u origin main

# OU si la branche s'appelle master
git push -u origin master
```

## Modifications futures

```powershell
# Après des modifications
git add .
git commit -m "Description des modifications"
git push
```

## Pour le binôme - Cloner le projet

```powershell
# Cloner
git clone https://github.com/votre-username/gestion-recettes.git

# Aller dans le dossier
cd gestion-recettes

# Installer
.\install.ps1

# Démarrer
.\start.ps1
```

## Commandes Git utiles

```powershell
# Voir l'historique
git log --oneline

# Voir les fichiers modifiés
git diff

# Annuler les modifications locales
git checkout -- fichier.js

# Voir les branches
git branch

# Créer une nouvelle branche
git checkout -b feature/ma-fonctionnalite

# Revenir sur main
git checkout main

# Fusionner une branche
git merge feature/ma-fonctionnalite

# Mettre à jour depuis GitHub
git pull
```

## Fichiers importants à vérifier avant push

✅ **À INCLURE :**
- `README.md` - Documentation
- `GUIDE_DEMARRAGE.md` - Guide binôme
- `COMMANDES.md` - Commandes utiles
- `STRUCTURE.md` - Architecture
- `LISEZ-MOI.md` - Premier fichier à lire
- `start.ps1` - Script démarrage
- `install.ps1` - Script installation
- `.gitignore` - Fichiers à ignorer
- `backend/.env.example` - Exemple config
- Tous les fichiers `.js`, `.jsx`, `.json` du code source

❌ **À NE PAS INCLURE (dans .gitignore) :**
- `node_modules/` - Dépendances (trop lourd)
- `.env` - Secrets et config locale
- `package-lock.json` - Peut causer des conflits
- `dist/` ou `build/` - Fichiers compilés
- `.vscode/` - Config IDE personnelle
- `dump.rdb` - Dump Redis

## Message de commit recommandé

```powershell
git commit -m "feat: Application gestion de recettes

- Backend: Node.js + Express + MongoDB + Redis
- Frontend: React + Vite + i18next
- Auth: JWT avec inscription/connexion
- CRUD complet des recettes
- Recherche et filtres (catégorie, difficulté)
- Compteur de vues Redis
- Recettes populaires (top 5)
- Thème marocain moderne
- Multilingue (FR, EN, AR)
- Scripts d'installation et démarrage automatiques"
```

## Créer un README sur GitHub

Après le push, GitHub affichera automatiquement le `README.md`.

Ajoutez dans la description du repo :
```
🍽️ Application de gestion de recettes marocaines avec authentification JWT, cache Redis, et interface multilingue (FR/EN/AR)
```

Tags suggérés :
- `nodejs`
- `express`
- `react`
- `mongodb`
- `redis`
- `jwt`
- `vite`
- `i18next`
- `fullstack`
- `recipes`

## Vérifications finales

Avant de pousser, testez que :

1. ✅ Le projet se lance avec `.\start.ps1`
2. ✅ Le frontend affiche les recettes
3. ✅ L'inscription fonctionne
4. ✅ La connexion fonctionne
5. ✅ La création de recette fonctionne
6. ✅ Le compteur de vues s'incrémente
7. ✅ Les recettes populaires s'affichent
8. ✅ La recherche fonctionne
9. ✅ Les filtres fonctionnent
10. ✅ Le changement de langue fonctionne

## Si erreur lors du push

```powershell
# Erreur : rejected (fetch first)
git pull --rebase origin main
git push

# Erreur : large files
# Vérifiez que node_modules n'est pas inclus
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push
```

---

**🎉 Voilà ! Ton projet est prêt à être partagé !**

Ton binôme n'aura qu'à :
1. Cloner le repo
2. Lancer `.\install.ps1`
3. Lancer `.\start.ps1`

C'est tout ! 🚀
