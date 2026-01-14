# Script d'installation des dépendances
# =====================================

Write-Host "`n📦 Installation des dépendances du projet`n" -ForegroundColor Cyan

# Backend
Write-Host "🔧 Installation des dépendances backend..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'installation backend" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..
Write-Host "✅ Backend installé" -ForegroundColor Green

# Frontend
Write-Host "`n🎨 Installation des dépendances frontend..." -ForegroundColor Yellow
Set-Location frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'installation frontend" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..
Write-Host "✅ Frontend installé" -ForegroundColor Green

# Créer .env si nécessaire
if (-not (Test-Path "backend\.env")) {
    Write-Host "`n⚙️ Création du fichier .env..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "✅ Fichier .env créé (modifiez-le selon vos besoins)" -ForegroundColor Green
    Write-Host "   Fichier: backend\.env" -ForegroundColor Gray
} else {
    Write-Host "`n✅ Fichier .env existe déjà" -ForegroundColor Green
}

Write-Host "`n✅ Installation terminée !`n" -ForegroundColor Green
Write-Host "📌 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "   1. Assurez-vous que MongoDB est démarré" -ForegroundColor Yellow
Write-Host "   2. Assurez-vous que Redis est démarré" -ForegroundColor Yellow
Write-Host "   3. Lancez le projet avec: .\start.ps1`n" -ForegroundColor Yellow

pause
