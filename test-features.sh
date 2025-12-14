#!/bin/bash

# Script de Test - ChabakaPro Dark Mode & Enhanced Footer
# Version 2.0

echo "🧪 ChabakaPro - Tests de Fonctionnalités v2.0"
echo "=============================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Compteurs
PASSED=0
FAILED=0

# Fonction de test
test_feature() {
    local feature_name=$1
    local test_command=$2
    
    echo -e "${BLUE}Testing: ${feature_name}${NC}"
    
    if eval "$test_command"; then
        echo -e "${GREEN}✅ PASSED${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAILED${NC}"
        ((FAILED++))
    fi
    echo ""
}

# 1. Test: Containers Docker
echo -e "${BLUE}═══ Docker Containers ═══${NC}"
echo ""

test_feature "Frontend Container Running" \
    "sudo docker ps | grep -q chabakapro_frontend"

test_feature "Backend Container Running" \
    "sudo docker ps | grep -q chabakapro_backend"

test_feature "MongoDB Container Running" \
    "sudo docker ps | grep -q chabakapro_mongodb"

# 2. Test: Fichiers du Mode Sombre
echo -e "${BLUE}═══ Dark Mode Files ═══${NC}"
echo ""

test_feature "ThemeContext exists" \
    "[ -f /home/abdo/Desktop/OurProject/frontend/src/context/ThemeContext.js ]"

test_feature "ThemeToggle exists" \
    "[ -f /home/abdo/Desktop/OurProject/frontend/src/components/common/ThemeToggle.js ]"

# 3. Test: Configuration Tailwind
echo -e "${BLUE}═══ Tailwind Configuration ═══${NC}"
echo ""

test_feature "Tailwind darkMode enabled" \
    "grep -q 'darkMode.*class' /home/abdo/Desktop/OurProject/frontend/tailwind.config.js"

test_feature "Custom animations defined" \
    "grep -q 'animation.*pulse' /home/abdo/Desktop/OurProject/frontend/tailwind.config.js"

# 4. Test: Composants Modifiés
echo -e "${BLUE}═══ Modified Components ═══${NC}"
echo ""

test_feature "ThemeProvider in index.js" \
    "grep -q 'ThemeProvider' /home/abdo/Desktop/OurProject/frontend/src/index.js"

test_feature "ThemeToggle in Navbar" \
    "grep -q 'ThemeToggle' /home/abdo/Desktop/OurProject/frontend/src/components/layout/Navbar.js"

test_feature "Dark mode classes in App.js" \
    "grep -q 'dark:bg-gray-900' /home/abdo/Desktop/OurProject/frontend/src/App.js"

test_feature "Enhanced Footer with Newsletter" \
    "grep -q 'Newsletter Section' /home/abdo/Desktop/OurProject/frontend/src/components/layout/Footer.js"

test_feature "WhatsApp CTA in Footer" \
    "grep -q 'Chat WhatsApp' /home/abdo/Desktop/OurProject/frontend/src/components/layout/Footer.js"

test_feature "Trust Badges in Footer" \
    "grep -q 'Certifié' /home/abdo/Desktop/OurProject/frontend/src/components/layout/Footer.js"

# 5. Test: Build
echo -e "${BLUE}═══ Build Files ═══${NC}"
echo ""

test_feature "Frontend build folder exists" \
    "[ -d /home/abdo/Desktop/OurProject/frontend/build ]"

test_feature "Build index.html exists" \
    "[ -f /home/abdo/Desktop/OurProject/frontend/build/index.html ]"

test_feature "Build JS files exist" \
    "ls /home/abdo/Desktop/OurProject/frontend/build/static/js/*.js >/dev/null 2>&1"

test_feature "Build CSS files exist" \
    "ls /home/abdo/Desktop/OurProject/frontend/build/static/css/*.css >/dev/null 2>&1"

# 6. Test: Documentation
echo -e "${BLUE}═══ Documentation ═══${NC}"
echo ""

test_feature "DARK_MODE_GUIDE.md exists" \
    "[ -f /home/abdo/Desktop/OurProject/DARK_MODE_GUIDE.md ]"

test_feature "ENHANCEMENT_SUMMARY.md exists" \
    "[ -f /home/abdo/Desktop/OurProject/ENHANCEMENT_SUMMARY.md ]"

test_feature "VISUAL_GUIDE.md exists" \
    "[ -f /home/abdo/Desktop/OurProject/VISUAL_GUIDE.md ]"

test_feature "QUICK_SUMMARY.md exists" \
    "[ -f /home/abdo/Desktop/OurProject/QUICK_SUMMARY.md ]"

test_feature "CHANGELOG.md exists" \
    "[ -f /home/abdo/Desktop/OurProject/CHANGELOG.md ]"

# 7. Test: Scripts
echo -e "${BLUE}═══ Scripts ═══${NC}"
echo ""

test_feature "deploy-dark-mode.sh exists" \
    "[ -f /home/abdo/Desktop/OurProject/deploy-dark-mode.sh ]"

test_feature "deploy-dark-mode.sh is executable" \
    "[ -x /home/abdo/Desktop/OurProject/deploy-dark-mode.sh ]"

# 8. Test: HTTP Endpoints
echo -e "${BLUE}═══ HTTP Endpoints ═══${NC}"
echo ""

test_feature "Frontend accessible (port 4000)" \
    "curl -s -o /dev/null -w '%{http_code}' http://localhost:4000 | grep -q 200"

test_feature "Backend accessible (port 5001)" \
    "curl -s -o /dev/null -w '%{http_code}' http://localhost:5001/api/health | grep -q -E '200|404'"

# Résultats
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 Test Results Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

TOTAL=$((PASSED + FAILED))

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! ($PASSED/$TOTAL)${NC}"
    echo ""
    echo -e "${GREEN}✅ Dark Mode is ready!${NC}"
    echo -e "${GREEN}✅ Enhanced Footer is deployed!${NC}"
    echo -e "${GREEN}✅ All documentation is in place!${NC}"
    echo ""
    echo "🌐 Access the website:"
    echo "   http://localhost:4000"
    echo ""
    echo "🌓 Test dark mode:"
    echo "   Click the ☀️/🌙 toggle in the navbar"
    echo ""
    EXIT_CODE=0
else
    echo -e "${YELLOW}⚠️  Some tests failed: $FAILED/$TOTAL${NC}"
    echo -e "${GREEN}✅ Passed: $PASSED${NC}"
    echo -e "${RED}❌ Failed: $FAILED${NC}"
    echo ""
    echo "Please check the failed tests above."
    EXIT_CODE=1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

exit $EXIT_CODE
