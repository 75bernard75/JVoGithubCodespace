#!/bin/bash

# 🎯 SCRIPT: Valider workflow LOT 4 Phase 1

set -e

DIRECTUS_URL="http://localhost:8055"
API_URL="$DIRECTUS_URL/api"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         🎮 VALIDATION WORKFLOW LOT 4 PHASE 1              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"

# Test 1: Directus
echo -e "\n${YELLOW}TEST 1: Directus...${NC}"
if curl -s "$API_URL/collections" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Directus accessible${NC}"
else
    echo -e "${RED}❌ Directus NOT accessible!${NC}"
    exit 1
fi

# Test 2: Collections
echo -e "\n${YELLOW}TEST 2: Collections...${NC}"
CONSOLES=$(curl -s "$API_URL/items/consoles?limit=1" | jq '.data | length' 2>/dev/null || echo "0")
echo -e "${GREEN}✅ Consoles: $CONSOLES items${NC}"

# Test 3: Export script
echo -e "\n${YELLOW}TEST 3: Export script...${NC}"
if grep -q "directus:export" package.json; then
    echo -e "${GREEN}✅ npm run directus:export disponible${NC}"
else
    echo -e "${RED}❌ Script manquant!${NC}"
    exit 1
fi

# Test 4: Eleventy
echo -e "\n${YELLOW}TEST 4: Eleventy...${NC}"
if [ -f ".eleventy.js" ]; then
    echo -e "${GREEN}✅ Eleventy configuré${NC}"
else
    echo -e "${RED}❌ Non configuré!${NC}"
    exit 1
fi

# Test 5: GitHub Pages workflow
echo -e "\n${YELLOW}TEST 5: GitHub Pages workflow...${NC}"
if [ -f ".github/workflows/github-pages-deploy.yml" ]; then
    echo -e "${GREEN}✅ Workflow présent${NC}"
else
    echo -e "${RED}❌ Manquant!${NC}"
    exit 1
fi

echo -e "\n${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}✅ WORKFLOW VALIDÉ ET PRÊT!${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${YELLOW}🚀 COMMENCEZ LOT 4:${NC}"
echo "1. Ouvrir Directus: http://localhost:8055"
echo "2. Ajouter consoles, guides, accessoires"
echo "3. npm run directus:export && npm run build"
echo "4. git push origin main"
echo ""
