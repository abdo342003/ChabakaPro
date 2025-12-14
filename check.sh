#!/bin/bash

# Script de vérification de l'installation ChabakaPro

echo "🔍 Vérification de l'installation ChabakaPro..."
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction de vérification
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1"
        return 1
    fi
}

# Vérifier Docker
echo "📦 Vérification des prérequis..."
command -v docker &> /dev/null
check "Docker installé"

command -v docker-compose &> /dev/null
check "Docker Compose installé"

# Vérifier la structure des fichiers
echo ""
echo "📁 Vérification de la structure..."

[ -f "docker-compose.yml" ] && check "docker-compose.yml" || echo -e "${RED}✗${NC} docker-compose.yml manquant"
[ -f ".env.example" ] && check ".env.example" || echo -e "${RED}✗${NC} .env.example manquant"
[ -f "backend/package.json" ] && check "Backend configuré" || echo -e "${RED}✗${NC} Backend manquant"
[ -f "frontend/package.json" ] && check "Frontend configuré" || echo -e "${RED}✗${NC} Frontend manquant"

# Vérifier le fichier .env
echo ""
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} Fichier .env existe"
    
    # Vérifier les variables importantes
    if grep -q "EMAIL_USER=" .env && ! grep -q "EMAIL_USER=$" .env; then
        echo -e "${GREEN}✓${NC} EMAIL_USER configuré"
    else
        echo -e "${YELLOW}⚠${NC} EMAIL_USER non configuré"
    fi
    
    if grep -q "REACT_APP_PHONE_NUMBER=" .env && ! grep -q "REACT_APP_PHONE_NUMBER=$" .env; then
        echo -e "${GREEN}✓${NC} REACT_APP_PHONE_NUMBER configuré"
    else
        echo -e "${YELLOW}⚠${NC} REACT_APP_PHONE_NUMBER non configuré"
    fi
else
    echo -e "${YELLOW}⚠${NC} Fichier .env manquant - Exécutez: cp .env.example .env"
fi

# Vérifier les ports
echo ""
echo "🔌 Vérification des ports..."

if ! lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Port 4000 disponible (Frontend)"
else
    echo -e "${YELLOW}⚠${NC} Port 4000 déjà utilisé"
fi

if ! lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Port 5001 disponible (Backend)"
else
    echo -e "${YELLOW}⚠${NC} Port 5001 déjà utilisé"
fi

if ! lsof -Pi :27017 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Port 27017 disponible (MongoDB)"
else
    echo -e "${YELLOW}⚠${NC} Port 27017 déjà utilisé"
fi

# Vérifier si Docker est en cours
echo ""
echo "🐳 État de Docker..."
if docker ps &> /dev/null; then
    RUNNING=$(docker-compose ps 2>/dev/null | grep -c "Up")
    if [ "$RUNNING" -gt 0 ]; then
        echo -e "${GREEN}✓${NC} $RUNNING conteneur(s) en cours d'exécution"
        docker-compose ps
    else
        echo -e "${YELLOW}⚠${NC} Aucun conteneur en cours - Exécutez: ./start.sh"
    fi
else
    echo -e "${RED}✗${NC} Docker daemon n'est pas en cours d'exécution"
fi

# Résumé
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 RÉSUMÉ DE L'INSTALLATION"
echo ""

if [ -f ".env" ] && command -v docker &> /dev/null; then
    echo -e "${GREEN}✓${NC} Prêt à démarrer !"
    echo ""
    echo "Pour lancer l'application:"
    echo "  ${GREEN}./start.sh${NC}"
    echo ""
    echo "Accès:"
    echo "  Frontend: ${GREEN}http://localhost:4000${NC}"
    echo "  Backend:  ${GREEN}http://localhost:5001${NC}"
else
    echo -e "${YELLOW}⚠${NC} Configuration incomplète"
    echo ""
    echo "Étapes à suivre:"
    [ ! -f ".env" ] && echo "  1. ${YELLOW}cp .env.example .env${NC}"
    [ ! -f ".env" ] && echo "  2. ${YELLOW}nano .env${NC} (configurer vos valeurs)"
    echo "  3. ${GREEN}./start.sh${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
