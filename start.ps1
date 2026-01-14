# Script de démarrage du projet Gestion de Recettes
# =====================================================

Write-Host "`n🚀 Démarrage du projet Gestion de Recettes`n" -ForegroundColor Cyan

# Vérifier Node.js
Write-Host "📦 Vérification de Node.js..." -ForegroundColor Yellow
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js n'est pas installé. Téléchargez-le depuis https://nodejs.org" -ForegroundColor Red
    pause
    exit 1
}
$nodeVersion = node -v
Write-Host "✅ Node.js $nodeVersion détecté" -ForegroundColor Green

# Vérifier Redis
Write-Host "`n🔴 Vérification de Redis..." -ForegroundColor Yellow
$redisRunning = Get-Process redis-server -ErrorAction SilentlyContinue
if (-not $redisRunning) {
    Write-Host "⚠️ Redis n'est pas en cours d'exécution" -ForegroundColor Yellow
    if (Test-Path "C:\Program Files\Redis\redis-server.exe") {
        Write-Host "🔄 Démarrage de Redis..." -ForegroundColor Yellow
        Start-Process -FilePath "C:\Program Files\Redis\redis-server.exe" -ArgumentList "C:\Program Files\Redis\redis.windows.conf" -WindowStyle Hidden
        Start-Sleep -Seconds 2
        Write-Host "✅ Redis démarré" -ForegroundColor Green
    } else {
        Write-Host "❌ Redis n'est pas installé. Installez-le depuis https://github.com/microsoftarchive/redis/releases" -ForegroundColor Red
        Write-Host "   Ou continuez sans Redis (les fonctionnalités de cache ne fonctionneront pas)" -ForegroundColor Yellow
        $continue = Read-Host "Continuer sans Redis ? (O/N)"
        if ($continue -ne "O") { exit 1 }
    }
} else {
    Write-Host "✅ Redis est en cours d'exécution" -ForegroundColor Green
}

# Vérifier MongoDB
Write-Host "`n🍃 Vérification de MongoDB..." -ForegroundColor Yellow
$mongoRunning = Get-Process mongod -ErrorAction SilentlyContinue
if (-not $mongoRunning) {
    Write-Host "⚠️ MongoDB n'est pas en cours d'exécution" -ForegroundColor Yellow
    Write-Host "   Assurez-vous que MongoDB est démarré (net start MongoDB ou mongod)" -ForegroundColor Yellow
    $continue = Read-Host "Continuer quand même ? (O/N)"
    if ($continue -ne "O") { exit 1 }
} else {
    Write-Host "✅ MongoDB est en cours d'exécution" -ForegroundColor Green
}

# Installer les dépendances du backend
Write-Host "`n📦 Vérification des dépendances backend..." -ForegroundColor Yellow
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "📥 Installation des dépendances backend..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
    Write-Host "✅ Dépendances backend installées" -ForegroundColor Green
} else {
    Write-Host "✅ Dépendances backend déjà installées" -ForegroundColor Green
}

# Installer les dépendances du frontend
Write-Host "`n📦 Vérification des dépendances frontend..." -ForegroundColor Yellow
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "📥 Installation des dépendances frontend..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
    Write-Host "✅ Dépendances frontend installées" -ForegroundColor Green
} else {
    Write-Host "✅ Dépendances frontend déjà installées" -ForegroundColor Green
}

# Vérifier le fichier .env
Write-Host "`n🔧 Vérification de la configuration..." -ForegroundColor Yellow
if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠️ Fichier .env manquant, création avec valeurs par défaut..." -ForegroundColor Yellow
    @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recettes_db
JWT_SECRET=votre_secret_jwt_super_securise_changez_moi
REDIS_HOST=localhost
REDIS_PORT=6379
"@ | Out-File -FilePath "backend\.env" -Encoding utf8
    Write-Host "✅ Fichier .env créé (modifiez les valeurs si nécessaire)" -ForegroundColor Green
} else {
    Write-Host "✅ Fichier .env trouvé" -ForegroundColor Green
}

# Démarrer le backend
Write-Host "`n🖥️ Démarrage du backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🔧 Backend - Port 5000' -ForegroundColor Green; npm start"
Start-Sleep -Seconds 3

# Démarrer le frontend
Write-Host "🌐 Démarrage du frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host '🎨 Frontend - Port 3000' -ForegroundColor Green; npm run dev"

Write-Host "`n✅ Projet démarré avec succès !`n" -ForegroundColor Green
Write-Host "📌 URLs d'accès:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "   API:      http://localhost:5000/api/recipes`n" -ForegroundColor Yellow

Write-Host "💡 Pour arrêter le projet, fermez les fenêtres PowerShell du backend et frontend" -ForegroundColor Gray
Write-Host "💡 Pour arrêter Redis: Stop-Process -Name redis-server -Force`n" -ForegroundColor Gray

pause
