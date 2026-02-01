#!/usr/bin/env node

/**
 * Export Directus Collections to JSON
 * Fetches all published content from Directus and exports as JSON
 * 
 * Usage: node scripts/export-directus-json.js
 * 
 * Requires: DIRECTUS_URL, DIRECTUS_API_KEY in .env
 * Output: data/directus-export.json
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_API_KEY = process.env.DIRECTUS_API_KEY;
const ADMIN_EMAIL = 'pauld.75020@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const OUTPUT_FILE = path.join(__dirname, '../data/directus-export.json');

let client;

// Initialize client
async function initializeClient() {
  if (DIRECTUS_API_KEY) {
    client = axios.create({
      baseURL: DIRECTUS_URL,
      headers: {
        Authorization: `Bearer ${DIRECTUS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
  } else {
    console.log('⚠️  DIRECTUS_API_KEY not found, authenticating with email/password...');
    try {
      const authResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });
      
      const token = authResponse.data.data.access_token;
      console.log('✅ Authenticated successfully');
      
      client = axios.create({
        baseURL: DIRECTUS_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
    } catch (error) {
      console.error('❌ Authentication failed:', error.response?.data?.errors || error.message);
      process.exit(1);
    }
  }
}

// Ensure data directory exists
const dataDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const collections = [
  'consoles',
  'guides',
  'accessories',
  'videos',
  'images',
  'affiliate_config',
];

async function fetchCollectionData(collection) {
  try {
    const response = await client.get(`/items/${collection}`, {
      params: {
        // Include all fields
        fields: '*.*',
        // Set reasonable limit
        limit: 1000,
      },
    });

    console.log(`✅ Fetched ${response.data.data.length} items from ${collection}`);
    return response.data.data;
  } catch (error) {
    console.error(`❌ Error fetching ${collection}:`, error.response?.data?.errors || error.message);
    return [];
  }
}

async function exportData() {
  await initializeClient();
  console.log('🚀 Starting Directus export...\n');

  const exportData = {};
  let totalItems = 0;

  // Test connection first
  try {
    console.log('🔗 Testing Directus connection...');
    const info = await client.get('/server/info');
    console.log(`✅ Connected to ${info.data.data.project}`);
    console.log(`   Version: ${info.data.data.version}\n`);
  } catch (error) {
    console.error('❌ Cannot connect to Directus:', error.message);
    console.error('   Check DIRECTUS_URL and DIRECTUS_API_KEY in .env');
    process.exit(1);
  }

  // Fetch all collections
  for (const collection of collections) {
    const data = await fetchCollectionData(collection);
    exportData[collection] = data;
    totalItems += data.length;
  }

  // Add metadata
  exportData.metadata = {
    exportedAt: new Date().toISOString(),
    directusUrl: DIRECTUS_URL,
    totalItems: totalItems,
    collections: collections.length,
    version: '1.0',
  };

  // Write to file
  try {
    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify(exportData, null, 2),
      'utf8'
    );
    console.log(`\n✅ Export complete!`);
    console.log(`   File: ${OUTPUT_FILE}`);
    console.log(`   Size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB`);
    console.log(`   Items: ${totalItems} total`);
    console.log(`   Collections: ${collections.length}`);
  } catch (error) {
    console.error('❌ Error writing export file:', error.message);
    process.exit(1);
  }
}

// Run export
exportData().catch((error) => {
  console.error('❌ Export failed:', error);
  process.exit(1);
});
