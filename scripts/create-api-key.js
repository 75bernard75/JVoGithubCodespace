#!/usr/bin/env node

/**
 * Create Directus API Key
 * Crée une clé API administrative pour l'automatisation
 */

import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Try both .env and .env.directus
const envPath = path.join(__dirname, '../.env');
const envDirectusPath = path.join(__dirname, '../.env.directus');
const configPath = fs.existsSync(envPath) ? envPath : envDirectusPath;

dotenv.config({ path: configPath });

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
// Try to get email from database
const admin_email = await getAdminEmail() || process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

async function createApiKey() {
  try {
    console.log('🔐 Authentifying with Directus...');
    
    // Step 1: Authenticate
    const authResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    const token = authResponse.data.data.access_token;
    console.log('✅ Authentication successful');

    // Step 2: Create API Key
    const client = axios.create({
      baseURL: DIRECTUS_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('🔑 Creating API key...');
    const keyResponse = await client.post('/access_tokens', {
      name: 'jvo-automation',
      role: null, // Admin role (null)
    });

    const apiKey = keyResponse.data.data.access_token;
    console.log('✅ API key created: ' + apiKey.substring(0, 20) + '...');

    // Step 3: Update .env.directus with API key
    const envDirectusPath = path.join(__dirname, '../.env.directus');
    let envDirectusContent = fs.readFileSync(envDirectusPath, 'utf8');
    
    if (envDirectusContent.includes('DIRECTUS_API_KEY=')) {
      envDirectusContent = envDirectusContent.replace(
        /DIRECTUS_API_KEY=.*/,
        `DIRECTUS_API_KEY=${apiKey}`
      );
    } else {
      envDirectusContent += `\nDIRECTUS_API_KEY=${apiKey}`;
    }

    fs.writeFileSync(envDirectusPath, envDirectusContent);
    console.log('✅ API key saved to .env.directus');

    // Also try to update .env if it exists
    const envPath = path.join(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      let envContent = fs.readFileSync(envPath, 'utf8');
      if (envContent.includes('DIRECTUS_API_KEY=')) {
        envContent = envContent.replace(
          /DIRECTUS_API_KEY=.*/,
          `DIRECTUS_API_KEY=${apiKey}`
        );
      } else {
        envContent += `\nDIRECTUS_API_KEY=${apiKey}`;
      }
      fs.writeFileSync(envPath, envContent);
      console.log('✅ API key saved to .env');
    }

    console.log('\n✨ API Key Setup Complete!');
    console.log(`\n📚 Next step: npm run directus:setup`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.response?.data?.errors || error.message);
    process.exit(1);
  }
}

createApiKey();
