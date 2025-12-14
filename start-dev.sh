#!/bin/bash

# ============================================
# ChabakaPro - Démarrage avec Volumes
# ============================================

echo "🚀 Démarrage de ChabakaPro..."
echo ""

# Vérifier si nvm est disponible
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 18 2>/dev/null

# Aller au dossier du projet
cd "$(dirname "$0")" || exit 1

# Arrêter les conteneurs existants
echo "🛑 Arrêt des conteneurs existants..."
docker-compose -f docker-compose.dev.yml down 2>/dev/null
docker-compose down 2>/dev/null

# Build le frontend d'abord
echo ""
echo "📦 Compilation du frontend..."
cd frontend && npm run build && cd ..

# Démarrer avec le docker-compose principal (avec volumes)
echo ""
echo "🐳 Démarrage des conteneurs Docker..."
docker-compose up -d

# Attendre que tout soit prêt
sleep 5

# Vérifier le statut
echo ""
echo "📊 Statut des conteneurs:"
docker-compose ps

echo ""
echo "============================================"
echo "✅ ChabakaPro est prêt!"
echo ""
echo "🌐 Site web:     http://localhost:4000"
echo "🔧 Backend API:  http://localhost:5001"
echo "📊 MongoDB:      localhost:27017"
echo ""
echo "📝 Pour mettre à jour après modifications:"
echo "   ./update.sh   (ou: cd frontend && npm run build)"
echo ""
echo "   Les changements sont visibles immédiatement!"
echo "============================================"
