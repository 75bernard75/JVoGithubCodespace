#!/usr/bin/env bash

##############################################################################
# Directus Self-Hosted Installation Script
# 
# Installs Directus + PostgreSQL using Docker Compose
# Pour: jeux-video-occasion.com
# 
# Usage: bash scripts/install-directus-self-hosted.sh
##############################################################################

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║     🚀 Directus Self-Hosted Installation                      ║"
echo "║        jeux-video-occasion.com                                ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# ============================================================================
# 1. Prerequisites Check
# ============================================================================

echo "📋 Checking prerequisites..."
echo ""

if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found!"
    echo "   Please install Docker: https://docs.docker.com/get-docker/"
    exit 1
fi
echo "✅ Docker installed ($(docker --version))"

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found!"
    echo "   Please install Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi
echo "✅ Docker Compose installed ($(docker-compose --version))"

echo ""

# ============================================================================
# 2. Check if containers already running
# ============================================================================

if docker ps -a --format '{{.Names}}' | grep -q "jvo-directus"; then
    echo "⚠️  Directus container already exists!"
    read -p "Do you want to remove and reinstall? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🗑️  Stopping and removing existing containers..."
        docker-compose down -v || true
        echo "✅ Removed"
    else
        echo "Aborting installation"
        exit 1
    fi
fi

echo ""

# ============================================================================
# 3. Check for .env.directus file
# ============================================================================

if [ ! -f ".env.directus" ]; then
    echo "❌ .env.directus file not found!"
    echo "   Please create it from .env.example or run:"
    echo "   cp .env.example .env.directus"
    exit 1
fi
echo "✅ .env.directus found"

# ============================================================================
# 4. Generate secure keys if needed
# ============================================================================

echo ""
echo "🔐 Checking security keys..."

# Check if keys are default values
if grep -q "DIRECTUS_KEY=your-secret-key-change-me" .env.directus; then
    echo "⚠️  Default DIRECTUS_KEY detected - generating secure key..."
    
    # Generate random 32+ char key
    NEW_KEY=$(openssl rand -base64 32)
    sed -i.bak "s|DIRECTUS_KEY=.*|DIRECTUS_KEY=${NEW_KEY}|" .env.directus
    echo "✅ Generated new DIRECTUS_KEY"
fi

if grep -q "DIRECTUS_SECRET=your-secret-secret-change-me" .env.directus; then
    echo "⚠️  Default DIRECTUS_SECRET detected - generating secure secret..."
    
    # Generate random 32+ char secret
    NEW_SECRET=$(openssl rand -base64 32)
    sed -i.bak "s|DIRECTUS_SECRET=.*|DIRECTUS_SECRET=${NEW_SECRET}|" .env.directus
    echo "✅ Generated new DIRECTUS_SECRET"
fi

echo ""

# ============================================================================
# 5. Start Directus with Docker Compose
# ============================================================================

echo "🚀 Starting Directus + PostgreSQL..."
echo ""

# Load environment variables
export $(cat .env.directus | grep -v '^#' | xargs)

# Start containers
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be healthy..."
echo ""

# Wait for Directus to be healthy
MAX_ATTEMPTS=30
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if docker-compose ps | grep -q "jvo-directus.*healthy"; then
        echo "✅ Directus is healthy!"
        break
    fi
    
    ATTEMPT=$((ATTEMPT + 1))
    echo "   Waiting... ($ATTEMPT/$MAX_ATTEMPTS)"
    sleep 2
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
    echo "❌ Timeout: Directus did not start properly"
    echo "   Check logs: docker-compose logs jvo-directus"
    exit 1
fi

echo ""

# ============================================================================
# 6. Verify Installation
# ============================================================================

echo "🔍 Verifying installation..."
echo ""

PUBLIC_URL=$(grep "^PUBLIC_URL=" .env.directus | cut -d= -f2)
ADMIN_EMAIL=$(grep "^ADMIN_EMAIL=" .env.directus | cut -d= -f2)

echo "✅ Directus is running!"
echo ""
echo "📍 Access Directus:"
echo "   URL: $PUBLIC_URL"
echo "   Email: $ADMIN_EMAIL"
echo ""

# ============================================================================
# 7. Test API Connection
# ============================================================================

echo "🧪 Testing API connection..."
echo ""

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$PUBLIC_URL/server/info")

if [ "$RESPONSE" = "200" ]; then
    echo "✅ API is responding correctly (HTTP 200)"
else
    echo "⚠️  API returned HTTP $RESPONSE"
    echo "   This may be normal - wait a few more seconds and try again"
fi

echo ""

# ============================================================================
# 8. Create API Key
# ============================================================================

echo "🔑 Creating API key for automation..."
echo ""

# Wait a moment for database to fully initialize
sleep 5

# Create API key (will be done manually after first login for security)
echo "⚠️  API key creation:"
echo "   1. Login to Directus at: $PUBLIC_URL"
echo "   2. Go to: Settings → API Keys"
echo "   3. Create new key"
echo "   4. Copy token and add to .env:"
echo "      DIRECTUS_API_KEY=[your-token]"
echo ""

# ============================================================================
# 9. Success Message
# ============================================================================

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║     ✅ Directus Self-Hosted Installation Complete!            ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "📝 Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Access Directus Admin:"
echo "   URL: $PUBLIC_URL"
echo "   Email: $ADMIN_EMAIL"
echo "   Password: (from .env.directus ADMIN_PASSWORD)"
echo ""
echo "2️⃣  Create API Key:"
echo "   - Go to Settings → API Keys"
echo "   - Create new API key"
echo "   - Copy and save in .env"
echo ""
echo "3️⃣  Create Collections:"
echo "   npm run directus:setup"
echo ""
echo "4️⃣  Test Collections:"
echo "   npm run directus:export"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ============================================================================
# 10. Show Container Status
# ============================================================================

echo "📊 Container Status:"
echo ""
docker-compose ps
echo ""

# ============================================================================
# 11. Show Useful Commands
# ============================================================================

echo "📚 Useful Commands:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "View logs:"
echo "  docker-compose logs -f jvo-directus"
echo ""
echo "Stop Directus:"
echo "  docker-compose down"
echo ""
echo "Restart Directus:"
echo "  docker-compose restart"
echo ""
echo "Remove all data (WARNING: destructive):"
echo "  docker-compose down -v"
echo ""
echo "Access PostgreSQL directly:"
echo "  docker-compose exec postgres psql -U directus -d directus"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
