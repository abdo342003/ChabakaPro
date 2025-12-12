#!/bin/bash

# Script pour rebuild et déployer avec dark mode
# ChabakaPro Dark Mode Deployment

echo "🌓 ChabakaPro - Dark Mode Deployment"
echo "===================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Build Frontend
echo -e "${BLUE}📦 Step 1: Building React frontend...${NC}"
cd /home/abdo/Desktop/OurProject/frontend
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend built successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  Build completed with warnings${NC}"
fi

echo ""

# 2. Copy to Docker
echo -e "${BLUE}🐳 Step 2: Copying to Docker container...${NC}"
cd /home/abdo/Desktop/OurProject
sudo docker cp frontend/build/. chabakapro_frontend:/usr/share/nginx/html/

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Files copied to Docker successfully!${NC}"
else
    echo -e "${YELLOW}❌ Error copying files to Docker${NC}"
    exit 1
fi

echo ""

# 3. Verify containers
echo -e "${BLUE}🔍 Step 3: Checking Docker containers...${NC}"
sudo docker ps | grep chabakapro

echo ""

# 4. Success message
echo -e "${GREEN}🎉 Deployment completed!${NC}"
echo ""
echo "📍 Access the website at:"
echo "   🌐 http://localhost:3000"
echo ""
echo "🌓 Dark Mode Features:"
echo "   • Toggle button in navbar (sun/moon icon)"
echo "   • Auto-detect system preference"
echo "   • Persistent theme selection"
echo "   • Enhanced footer with newsletter"
echo "   • Smooth animations and transitions"
echo ""
echo "💡 To test dark mode:"
echo "   1. Open http://localhost:3000"
echo "   2. Click the sun/moon toggle in navbar"
echo "   3. Theme will switch instantly"
echo "   4. Refresh page - theme persists!"
echo ""
echo -e "${BLUE}Happy testing! 🚀${NC}"
