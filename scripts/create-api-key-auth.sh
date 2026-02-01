#!/bin/bash

# Create API Key using authenticated token

TOKEN=$(curl -s -X POST http://localhost:8055/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"pauld.75020@gmail.com","password":"admin"}' | jq -r '.data.access_token')

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "❌ Failed to get authentication token"
  exit 1
fi

echo "✅ Got auth token"

# Create API token
API_KEY=$(curl -s -X POST http://localhost:8055/access_tokens \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"jvo-automation"}' | jq -r '.data.token')

if [ -z "$API_KEY" ] || [ "$API_KEY" = "null" ]; then
  echo "❌ Failed to create API token"
  exit 1
fi

echo "✅ Created API token: ${API_KEY:0:30}..."

# Update .env files
if [ -f "/workspaces/JVoGithubCodespace/.env.directus" ]; then
  sed -i "s/^DIRECTUS_API_KEY=.*/DIRECTUS_API_KEY=${API_KEY}/" /workspaces/JVoGithubCodespace/.env.directus || \
  echo "DIRECTUS_API_KEY=${API_KEY}" >> /workspaces/JVoGithubCodespace/.env.directus
  echo "✅ Updated .env.directus"
fi

if [ -f "/workspaces/JVoGithubCodespace/.env" ]; then
  sed -i "s/^DIRECTUS_API_KEY=.*/DIRECTUS_API_KEY=${API_KEY}/" /workspaces/JVoGithubCodespace/.env || \
  echo "DIRECTUS_API_KEY=${API_KEY}" >> /workspaces/JVoGithubCodespace/.env
  echo "✅ Updated .env"
fi

echo ""
echo "✨ API Key Created Successfully!"
echo ""
echo "Next step: npm run directus:setup"
