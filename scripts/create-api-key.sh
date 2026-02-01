#!/bin/bash

# Create Directus API Key via Directus CLI
# Uses the Directus bootstrap feature to create a token

echo "🔐 Creating Directus API key..."

# Get the DIRECTUS_KEY from container
DIRECTUS_KEY=$(cd /workspaces/JVoGithubCodespace && cat .env.directus | grep "^DIRECTUS_KEY=" | cut -d'=' -f2)

if [ -z "$DIRECTUS_KEY" ]; then
  echo "❌ DIRECTUS_KEY not found in .env.directus"
  exit 1
fi

echo "Using DIRECTUS_KEY: ${DIRECTUS_KEY:0:20}..."

# Create API token using curl with the DIRECTUS_KEY
# Directus allows service tokens to be created with the KEY environment variable

TOKEN=$(curl -s -X POST http://localhost:8055/tokens \
  -H "Authorization: Bearer ${DIRECTUS_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"name":"jvo-automation"}' | jq -r '.data.token // .data.access_token // empty')

if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
  echo "✅ API token created: ${TOKEN:0:30}..."
  
  # Save to .env.directus
  if grep -q "^DIRECTUS_API_KEY=" /workspaces/JVoGithubCodespace/.env.directus; then
    sed -i "s/^DIRECTUS_API_KEY=.*/DIRECTUS_API_KEY=${TOKEN}/" /workspaces/JVoGithubCodespace/.env.directus
  else
    echo "DIRECTUS_API_KEY=${TOKEN}" >> /workspaces/JVoGithubCodespace/.env.directus
  fi
  
  echo "✅ API key saved to .env.directus"
  echo ""
  echo "✨ API Key Setup Complete!"
  echo ""
  echo "📚 Next step: npm run directus:setup"
  exit 0
else
  echo "⚠️  Failed to create API token via KEY"
  echo ""
  echo "Manual setup required:"
  echo "1. Open http://localhost:8055/admin/"
  echo "2. Find 'Access Tokens' or 'API Tokens' in Settings"
  echo "3. Create a new static token"
  echo "4. Copy the token"
  echo "5. Edit .env.directus and add: DIRECTUS_API_KEY=<token>"
  echo "6. Run: npm run directus:setup"
  exit 1
fi
