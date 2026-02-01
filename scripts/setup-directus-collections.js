#!/usr/bin/env node

/**
 * Directus Collections Setup
 * Crée automatiquement toutes les collections et fields
 * 
 * Usage: node scripts/setup-directus-collections.js
 * 
 * Require: DIRECTUS_URL, DIRECTUS_API_KEY dans .env
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
// Use the actual admin email created by Directus (pauld.75020@gmail.com) or fallback to env
const ADMIN_EMAIL = 'pauld.75020@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

let client;

// Initialize client with API key if available, otherwise authenticate with email/password
async function initializeClient() {
  if (DIRECTUS_API_KEY) {
    client = axios.create({
      baseURL: DIRECTUS_URL,
      headers: {
        Authorization: `Bearer ${DIRECTUS_API_KEY}`,
        'Content-Type': 'application/json',
      },
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
      });
    } catch (error) {
      console.error('❌ Authentication failed:', error.response?.data?.errors || error.message);
      process.exit(1);
    }
  }
}

const collections = [
  {
    collection: 'consoles',
    meta: { display_template: '{{ name }}' },
    schema: { name: 'consoles' },
    fields: [
      { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
      { field: 'slug', type: 'string', meta: { required: true, width: 'full' } },
      { field: 'name', type: 'string', meta: { required: true, width: 'half' } },
      { field: 'tier', type: 'string', meta: { width: 'half', interface: 'select' } },
      { field: 'release_year', type: 'integer', meta: { width: 'half' } },
      { field: 'manufacturer', type: 'string', meta: { width: 'half' } },
      { field: 'description_short', type: 'text', meta: { width: 'full' } },
      { field: 'seo_title', type: 'string', meta: { width: 'full' } },
      { field: 'seo_meta', type: 'string', meta: { width: 'full' } },
      { field: 'persona_primary', type: 'string', meta: { required: true, width: 'half' } },
      { field: 'persona_secondary', type: 'string', meta: { width: 'half' } },
      { field: 'technical_level', type: 'integer', meta: { width: 'half' } },
      { field: 'status', type: 'string', meta: { width: 'half', interface: 'select' } },
    ],
  },
  {
    collection: 'guides',
    meta: { display_template: '{{ title }}' },
    schema: { name: 'guides' },
    fields: [
      { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
      { field: 'slug', type: 'string', meta: { required: true, width: 'full' } },
      { field: 'title', type: 'string', meta: { required: true, width: 'full' } },
      { field: 'guide_type', type: 'string', meta: { width: 'half' } },
      { field: 'console_id', type: 'uuid', meta: { width: 'half' } },
      { field: 'description', type: 'text', meta: { width: 'full' } },
      { field: 'content_v1', type: 'text', meta: { width: 'full', interface: 'input-rich-text-md' } },
      { field: 'content_v2', type: 'text', meta: { width: 'full', interface: 'input-rich-text-md' } },
      { field: 'content_v3', type: 'text', meta: { width: 'full', interface: 'input-rich-text-md' } },
      { field: 'seo_title', type: 'string', meta: { width: 'full' } },
      { field: 'seo_meta', type: 'string', meta: { width: 'full' } },
      { field: 'persona_primary', type: 'string', meta: { required: true, width: 'half' } },
      { field: 'technical_level', type: 'integer', meta: { width: 'half' } },
      { field: 'status', type: 'string', meta: { width: 'full' } },
    ],
  },
  {
    collection: 'accessories',
    meta: { display_template: '{{ name }}' },
    schema: { name: 'accessories' },
    fields: [
      { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
      { field: 'slug', type: 'string', meta: { required: true, width: 'full' } },
      { field: 'name', type: 'string', meta: { required: true, width: 'full' } },
      { field: 'category', type: 'string', meta: { required: true, width: 'half' } },
      { field: 'description', type: 'text', meta: { width: 'full' } },
      { field: 'status', type: 'string', meta: { width: 'half' } },
    ],
  },
  {
    collection: 'videos',
    meta: { display_template: '{{ title }}' },
    schema: { name: 'videos' },
    fields: [
      { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
      { field: 'title', type: 'string', meta: { required: true, width: 'full' } },
      { field: 'platform', type: 'string', meta: { width: 'half' } },
      { field: 'url', type: 'string', meta: { width: 'full' } },
      { field: 'contextual_intro', type: 'text', meta: { width: 'full' } },
    ],
  },
  {
    collection: 'images',
    meta: { display_template: '{{ filename }}' },
    schema: { name: 'images' },
    fields: [
      { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
      { field: 'filename', type: 'string', meta: { required: true, width: 'full' } },
      { field: 'alt', type: 'string', meta: { required: true, width: 'full' } },
      { field: 'source_type', type: 'string', meta: { width: 'half' } },
      { field: 'lazy', type: 'boolean', meta: { width: 'half' } },
    ],
  },
  {
    collection: 'affiliate_config',
    meta: { display_template: '{{ type }}' },
    schema: { name: 'affiliate_config' },
    fields: [
      { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
      { field: 'type', type: 'string', meta: { required: true, width: 'half' } },
      { field: 'enabled', type: 'boolean', meta: { width: 'half' } },
      { field: 'amazon_tag', type: 'string', meta: { width: 'full' } },
      { field: 'ebay_campid', type: 'string', meta: { width: 'half' } },
      { field: 'ebay_customid', type: 'string', meta: { width: 'half' } },
    ],
  },
];

async function setupCollections() {
  await initializeClient();
  console.log('🚀 Setting up Directus Collections...\n');

  for (const collection of collections) {
    try {
      console.log(`📝 Creating collection: ${collection.collection}`);

      await client.post('/collections', {
        collection: collection.collection,
        meta: collection.meta,
        schema: collection.schema,
      });

      console.log(`   ✅ Collection created\n`);

      // Add fields
      for (const field of collection.fields) {
        try {
          await client.post(`/fields/${collection.collection}`, {
            field: field.field,
            type: field.type,
            schema: field.schema || {},
            meta: field.meta || {},
          });
          console.log(`   ✅ Field added: ${field.field}`);
        } catch (err) {
          console.warn(`   ⚠️  Field ${field.field}: ${err.response?.data?.errors?.[0]?.message || err.message}`);
        }
      }

      console.log('');
    } catch (err) {
      console.error(`❌ Error creating ${collection.collection}:`, err.response?.data?.errors || err.message);
    }
  }

  console.log('✅ Collections setup complete!');
}

setupCollections().catch(console.error);
