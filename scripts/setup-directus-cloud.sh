#!/bin/bash
# Directus Cloud Setup Script
# Configure instance on Directus Cloud

echo "🚀 Directus Cloud Setup"
echo "======================="

# Variables
DIRECTUS_PROJECT_NAME="jeux-video-occasion"
DIRECTUS_REGION="eu"  # Europe
DIRECTUS_DB="postgresql"

echo "1️⃣  Creating Directus Cloud Project..."
echo "   Name: $DIRECTUS_PROJECT_NAME"
echo "   Region: $DIRECTUS_REGION"
echo "   Database: $DIRECTUS_DB"
echo ""
echo "⚠️  Manual step required:"
echo "   1. Go to https://cloud.directus.io"
echo "   2. Sign up or login"
echo "   3. Create new project:"
echo "      - Name: $DIRECTUS_PROJECT_NAME"
echo "      - Database: PostgreSQL"
echo "      - Region: Europe (eu)"
echo ""

echo "2️⃣  Once created, you'll receive:"
echo "   ✓ Project URL"
echo "   ✓ Admin email"
echo "   ✓ Initial password"
echo ""

echo "3️⃣  Store credentials in .env:"
echo "   DIRECTUS_URL=https://[project].directus.app"
echo "   DIRECTUS_ADMIN_EMAIL=admin@example.com"
echo "   DIRECTUS_ADMIN_PASSWORD=..."
echo "   DIRECTUS_API_KEY=..."
echo ""

echo "4️⃣  Create admin API key:"
echo "   - Login to Directus admin panel"
echo "   - Settings → API Keys"
echo "   - Create new API key"
echo "   - Copy token to .env"
echo ""

echo "✅ Setup Complete"
echo "Next: npm run directus:collections"
