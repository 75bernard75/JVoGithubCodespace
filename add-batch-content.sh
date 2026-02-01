#!/bin/bash
set -e

DIRECTUS_URL="http://localhost:8055"
API_URL="$DIRECTUS_URL/api"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🎮 BATCH ADD GAMING CONTENT PREVIEW                    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"

TYPE=${1:-consoles}
COUNT=${2:-3}

echo -e "\n${YELLOW}Vérification Directus...${NC}"
curl -s "$API_URL/collections" > /dev/null && echo -e "${GREEN}✅ Directus accessible${NC}" || { echo -e "${RED}❌ Directus down!${NC}"; exit 1; }

echo -e "\n${YELLOW}Ajout de $COUNT items ($TYPE)...${NC}"

case $TYPE in
    consoles)
        echo "  ├─ PlayStation 5"
        echo "  ├─ Xbox Series X"
        echo "  ├─ Nintendo Switch"
        echo "  ├─ PlayStation 4"
        echo "  └─ Xbox One"
        ;;
    accessories)
        echo "  ├─ Manette DualSense"
        echo "  ├─ Câble HDMI 2.1"
        echo "  ├─ Support Console"
        echo "  ├─ Sac Transport"
        echo "  └─ Kit Nettoyage"
        ;;
    guides)
        echo "  ├─ Connecter consoles rétro"
        echo "  ├─ Meilleurs jeux PS5"
        echo "  └─ Xbox vs PlayStation"
        ;;
esac

echo -e "\n${GREEN}✅ Items prêts à ajouter via Directus (http://localhost:8055)${NC}"
echo -e "\n${YELLOW}Prochaines étapes:${NC}"
echo "1. Collections → $TYPE → Create New"
echo "2. Remplir le formulaire"
echo "3. Save"
echo "4. Répéter $COUNT fois"
echo "5. npm run directus:export && npm run build && git push"
echo ""
