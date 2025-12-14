#!/bin/bash

# ============================================
# ChabakaPro - Script de mise à jour rapide
# Lance uniquement: npm run build
# Le site est mis à jour instantanément grâce aux volumes Docker
# ============================================

echo "🔄 Mise à jour de ChabakaPro..."
echo ""

# Vérifier si nvm est disponible
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Utiliser Node 18
nvm use 18 2>/dev/null || echo "⚠️  nvm non trouvé, utilisation de node par défaut"

# Aller dans le dossier frontend
cd "$(dirname "$0")/frontend" || exit 1

# Build le frontend
echo "📦 Compilation du frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Mise à jour terminée!"
    echo "🌐 Rafraîchissez votre navigateur: http://localhost:4000"
    echo ""
    echo "💡 Les modifications sont visibles immédiatement grâce aux volumes Docker."
else
    echo ""
    echo "❌ Erreur lors de la compilation!"
    exit 1
fi
