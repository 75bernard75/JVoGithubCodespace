#!/bin/bash

# 🎮 QUICK ADD ITEMS TO DIRECTUS
# Usage: ./quick-add-items.sh [type] [count]
# Examples: 
#   ./quick-add-items.sh consoles 5
#   ./quick-add-items.sh accessories 10
#   ./quick-add-items.sh guides 3

DIRECTUS_URL="http://localhost:8055"
API_URL="http://localhost:8055/graphql"

TYPE=${1:-consoles}
COUNT=${2:-5}

echo "🎮 Quick Add Items to Directus"
echo "📍 Type: $TYPE"
echo "📊 Count: $COUNT"
echo ""

# Check Directus is accessible
echo "⏳ Checking Directus connection..."
if ! curl -s "$DIRECTUS_URL/admin" > /dev/null 2>&1; then
    echo "❌ ERROR: Directus not running!"
    echo "💡 Start with: docker-compose up -d"
    exit 1
fi
echo "✅ Directus accessible"
echo ""

# Predefined content lists
declare -a CONSOLES=(
    "PlayStation 5|Sony|2020|8-core Zen 2, 16GB GDDR6, 825GB SSD|€500-700|1000+|Next-gen gaming at 4K 60fps with instant load times"
    "Xbox Series X|Microsoft|2020|8-core Zen 2, 12 TFLOPS GPU, 1TB SSD|€500-700|1000+|Most powerful console with Game Pass ecosystem"
    "Nintendo Switch|Nintendo|2017|Custom Tegra, 32GB storage|€300-350|2000+|Hybrid portable/home console, exclusive Nintendo games"
    "PlayStation 4|Sony|2013|8-core custom x86, 8GB GDDR5|€300-350|2500+|Mature AAA library, PS Plus collection"
    "Xbox One S|Microsoft|2016|8-core x86, 4K Blu-ray|€250-300|2000+|4K media capabilities, vast game library"
    "Nintendo Wii U|Nintendo|2012|IBM Power PC Triple-core|€200-250|700+|GamePad innovation, exclusive titles"
    "PlayStation 3|Sony|2006|Cell processor 3.2 GHz|€150-200|2500+|Blu-ray player, legendary library"
    "Xbox 360|Microsoft|2005|Triple-core Xenon 3.2 GHz|€150-200|3000+|Online gaming pioneer"
    "Nintendo 64|Nintendo|1996|93.75 MHz MIPS R4300|€100-150|300+|Iconic 3D gaming, controller innovation"
    "Sega Dreamcast|Sega|1998|Hitachi SH-4 200 MHz|€80-120|600+|Innovative online gaming history"
)

declare -a ACCESSORIES=(
    "Manette DualSense Blanc|Controllers|€75|Haptic feedback, Adaptive triggers, Built-in mic|Official PS5 controller with next-gen features"
    "Câble HDMI 2.1 Ultra|Cables|€25|8K support, 48Gbps bandwidth, 2-meter length|Premium cable for PS5 and Xbox Series X"
    "Support Console Vertical|Cases & Storage|€30|Metal construction, prevents overheating|Elegant stand with proper airflow design"
    "Kit Nettoyage Gaming|Cleaning|€15|Microfiber cloths, brush, compressed air|Complete toolkit for console maintenance"
    "Adaptateur RCA vers HDMI|Cables|€20|Converts composite video to HDMI|Connect retro consoles to modern TVs"
    "Sac Transport Renforcé|Cases & Storage|€40|Waterproof, fits all consoles|Professional gaming bag with compartments"
    "Ventilateur Refroidissement|Power & Cooling|€35|Whisper quiet, adjustable speed|Extends console lifespan significantly"
    "Adaptateur Manette 8BitDo|Controllers|€50|Wireless, battery 20 hours|Play old controllers on new systems"
    "Rallonge HDMI 5 mètres|Cables|€18|Gold-plated connectors, quality signal|Flexible setup for room layout"
    "Étagère Gaming Murale|Cases & Storage|€80|Display 5-6 consoles, tempered glass|Beautiful showcase for collection"
)

declare -a GUIDES=(
    "Connecter Consoles Rétro à TV Moderne|Intermediate|15 minutes|Pour adapter anciennes consoles aux téléviseurs modernes. Guide complet avec liste adaptateurs."
    "PS5 vs Xbox Series X : Comparaison|Beginner|10 minutes|Décortique différences performance, exclusivités, prix. Aide à choisir."
    "Optimiser Performance Console|Advanced|30 minutes|Techniques pour meilleure performance. Ventilation, refroidissement, réglages."
    "Bien Nettoyer Votre Collection|Intermediate|20 minutes|Protéger investissement gaming. Méthodes sûres et efficaces."
    "Meilleur Jeux PS5 2026|Beginner|5 minutes|Top 20 jeux PS5 à absolument avoir. Catégories action, RPG, sport."
    "Jeux Xbox Game Pass|Beginner|5 minutes|Meilleurs titres inclus Game Pass. Guide optimisation abonnement."
    "Setup Gaming Pas Cher|Intermediate|25 minutes|Construire setup gaming €500 maximum. Optimisation budget."
    "Streaming Setup Gaming|Advanced|45 minutes|Configuration complète pour streamer. Caméra, micro, capture, OBS."
    "Nintendo vs PS vs Xbox|Beginner|8 minutes|Philosophies différentes des trois géants. Quel écosystème choisir?"
    "Accessoires Essentiels Gamers|Beginner|12 minutes|Top 10 accessoires indispensables. Qualité/prix optimal."
)

# Display options and let user choose
case "$TYPE" in
    consoles)
        echo "🎮 Available Consoles to Add:"
        for i in "${!CONSOLES[@]}"; do
            IFS='|' read -r name mfr year specs price games desc <<< "${CONSOLES[$i]}"
            echo "  $((i+1)). $name"
        done
        echo ""
        echo "✅ Will add first $COUNT consoles"
        echo ""
        for ((i=0; i<COUNT && i<${#CONSOLES[@]}; i++)); do
            IFS='|' read -r name mfr year specs price games desc <<< "${CONSOLES[$i]}"
            echo "  ├─ $name ($mfr)"
        done
        ;;
    
    accessories)
        echo "🎧 Available Accessories to Add:"
        for i in "${!ACCESSORIES[@]}"; do
            IFS='|' read -r name cat price features desc <<< "${ACCESSORIES[$i]}"
            echo "  $((i+1)). $name"
        done
        echo ""
        echo "✅ Will add first $COUNT accessories"
        echo ""
        for ((i=0; i<COUNT && i<${#ACCESSORIES[@]}; i++)); do
            IFS='|' read -r name cat price features desc <<< "${ACCESSORIES[$i]}"
            echo "  ├─ $name ($cat)"
        done
        ;;
    
    guides)
        echo "📚 Available Guides to Add:"
        for i in "${!GUIDES[@]}"; do
            IFS='|' read -r title diff duration desc <<< "${GUIDES[$i]}"
            echo "  $((i+1)). $title"
        done
        echo ""
        echo "✅ Will add first $COUNT guides"
        echo ""
        for ((i=0; i<COUNT && i<${#GUIDES[@]}; i++)); do
            IFS='|' read -r title diff duration desc <<< "${GUIDES[$i]}"
            echo "  ├─ $title ($duration)"
        done
        ;;
    
    *)
        echo "❌ Unknown type: $TYPE"
        echo "Valid types: consoles, accessories, guides"
        exit 1
        ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 NEXT STEPS:"
echo "  1. Go to: $DIRECTUS_URL/admin"
echo "  2. Click on: Collections → ${TYPE^}"
echo "  3. Click: Create New"
echo "  4. Copy details above and fill in form"
echo "  5. Click: Save"
echo "  6. Repeat steps 3-5 for each item"
echo ""
echo "⚡ After adding $COUNT items, deploy:"
echo "  npm run directus:export"
echo "  npm run build"
echo "  git add -A && git commit -m '🎮 Added $COUNT $TYPE' && git push"
echo ""
echo "📊 Check site at:"
echo "  https://75bernard75.github.io/JVoGithubCodespace/"
echo ""
echo "✨ You can add this entire list in ~10-15 minutes!"
echo ""
