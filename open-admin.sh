#!/bin/bash

# Script d'accès rapide à l'interface d'administration ChabakaPro

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        INTERFACE D'ADMINISTRATION - CHABAKAPRO              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "🔐 Accès Admin Dashboard"
echo ""
echo "📍 URL: http://localhost:4000/admin-dashboard-chabakapro"
echo "🔑 Mot de passe: admin2025"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Fonctionnalités disponibles:"
echo "  ✓ Dashboard avec statistiques en temps réel"
echo "  ✓ Gestion des messages de contact"
echo "  ✓ Gestion des demandes de devis"
echo "  ✓ Modération des témoignages clients"
echo "  ✓ Visualisation des articles de blog"
echo "  ✓ Gestion du portfolio"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔒 Sécurité:"
echo "  ⚠️  Cette page n'est PAS visible dans le site public"
echo "  ⚠️  Accessible uniquement via l'URL directe"
echo "  ⚠️  Changez le mot de passe pour la production!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Documentation complète: ./ADMIN_GUIDE.md"
echo ""

# Ouvrir dans le navigateur par défaut (Linux)
if command -v xdg-open &> /dev/null; then
    echo "🌐 Ouverture de l'interface admin dans votre navigateur..."
    sleep 2
    xdg-open "http://localhost:4000/admin-dashboard-chabakapro"
else
    echo "ℹ️  Ouvrez manuellement: http://localhost:4000/admin-dashboard-chabakapro"
fi
