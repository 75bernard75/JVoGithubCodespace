#!/bin/bash

# Script pour ajouter du contenu initial via API Directus
# Usage: ./add-content.sh

set -e

DIRECTUS_URL="http://localhost:8055"
API_URL="$DIRECTUS_URL/api"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  🎮 SCRIPT AJOUT CONTENU INITIAL DIRECTUS${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"

# Données de test - Consoles
echo -e "\n${YELLOW}📍 Étape 1: Vérifier la connexion à Directus...${NC}"
curl -s "$API_URL/collections" > /dev/null && echo -e "${GREEN}✅ Directus accessible!${NC}" || { echo "❌ Directus non accessible à $DIRECTUS_URL"; exit 1; }

echo -e "\n${YELLOW}📍 Étape 2: Afficher les consoles actuelles...${NC}"
echo "Consoles dans Directus:"
curl -s "$API_URL/items/consoles?limit=100" | jq '.data | length' 2>/dev/null || echo "0"

echo -e "\n${YELLOW}📍 Étape 3: Afficher les accessoires actuels...${NC}"
echo "Accessoires dans Directus:"
curl -s "$API_URL/items/accessories?limit=100" | jq '.data | length' 2>/dev/null || echo "0"

echo -e "\n${YELLOW}📍 Étape 4: Afficher les guides actuels...${NC}"
echo "Guides dans Directus:"
curl -s "$API_URL/items/guides?limit=100" | jq '.data | length' 2>/dev/null || echo "0"

echo -e "\n${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ Données actuelles vérifiées!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"

echo -e "\n${BLUE}📌 PROCHAINES ÉTAPES:${NC}"
echo "1. Allez à http://localhost:8055"
echo "2. Collections → Consoles → Create New"
echo "3. Remplissez les champs et cliquez Save"
echo "4. Répétez pour Guides et Accessories"
echo "5. Exécutez: npm run directus:export && npm run build && git push"
echo ""
echo -e "${YELLOW}👉 Ou utilisez le formulaire Directus pour ajouter contenu!${NC}"
