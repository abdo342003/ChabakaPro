#!/bin/bash

# Script de démarrage pour ChabakaPro

echo "🚀 Démarrage de ChabakaPro..."
echo ""

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker Desktop."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé."
    exit 1
fi

# Créer le fichier .env s'il n'existe pas
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cp .env.example .env
    echo "⚠️  N'oubliez pas de configurer vos variables d'environnement dans .env"
fi

# Construire et démarrer les conteneurs
echo "🔨 Construction des conteneurs Docker..."
docker-compose build

echo "▶️  Démarrage des services..."
docker-compose up -d

echo ""
echo "✅ ChabakaPro est en cours de démarrage!"
echo ""
echo "📍 Accès aux services:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:5000"
echo "   - MongoDB: mongodb://localhost:27017"
echo ""
echo "📊 Voir les logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Arrêter les services:"
echo "   docker-compose down"
echo ""
