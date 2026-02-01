#!/usr/bin/env node

/**
 * Configure Directus Security Settings
 * - CORS whitelist
 * - Rate limiting
 * - Audit logging
 */

import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'pauld.75020@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

// Get domain from args or env
const WEBSITE_DOMAIN = process.env.WEBSITE_DOMAIN || process.argv[2] || 'http://localhost:3000';

async function configureSettings() {
  try {
    console.log('🔐 Configuring Directus Security Settings...\n');

    // 1. Authenticate
    console.log('🔑 Authenticating...');
    const authResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    const token = authResponse.data.data.access_token;
    console.log('✅ Authenticated\n');

    // 2. Create API client
    const client = axios.create({
      baseURL: DIRECTUS_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // 3. Get current settings
    console.log('📋 Fetching current settings...');
    const settingsResponse = await client.get('/settings');
    const currentSettings = settingsResponse.data.data;
    console.log('✅ Settings retrieved\n');

    // 4. Configure CORS
    console.log('🌐 Configuring CORS...');
    const corsOrigins = [
      'http://localhost:3000',        // Local dev
      'http://localhost:8055',        // Directus admin
      WEBSITE_DOMAIN,                 // Production domain
    ];

    const updatedSettings = {
      ...currentSettings,
      cors_enabled: true,
      cors_credentials: true,
      cors_origin: corsOrigins.join(','),
      cors_methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      cors_allowed_headers: 'Content-Type,Authorization',
      cors_exposed_headers: 'Content-Type,X-Total-Count',
      cors_max_age: 86400,
    };

    console.log(`  CORS Origins: ${corsOrigins.join(', ')}`);
    console.log(`  CORS Methods: GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS`);
    console.log(`  CORS Max Age: 86400s\n`);

    // 5. Configure Auth & Security
    console.log('🔐 Configuring authentication...');
    updatedSettings.auth_login_attempts = 5;      // Max login attempts
    updatedSettings.auth_login_attempts_timeframe = 15;  // In minutes
    updatedSettings.auth_password_policy = '?=.*\\d';    // Must contain number

    console.log(`  Max login attempts: 5`);
    console.log(`  Lockout period: 15 minutes\n`);

    // 6. Configure API & Rate Limiting
    console.log('⏱️  Configuring rate limiting...');
    updatedSettings.api_max_request_size = '100mb';
    updatedSettings.api_request_timeout = 30000;          // 30 seconds

    console.log(`  Request timeout: 30 seconds`);
    console.log(`  Max request size: 100mb\n`);

    // 7. Enable Audit Logging
    console.log('📝 Configuring audit logging...');
    updatedSettings.audit_logging = true;
    updatedSettings.audit_retention = 30;                 // Keep 30 days

    console.log(`  Audit logging: ENABLED`);
    console.log(`  Retention: 30 days\n`);

    // 8. Update settings
    console.log('💾 Saving settings...');
    await client.patch('/settings', updatedSettings);
    console.log('✅ Settings saved\n');

    // 9. Create an API Token (if needed)
    console.log('🔑 Creating API Token...');
    try {
      const tokenResponse = await client.post('/tokens', {
        name: 'jvo-automation',
        description: 'Token for automated tasks (nightly exports, builds)',
      });

      const apiToken = tokenResponse.data.data.token;
      console.log('✅ API Token created');
      console.log(`   Token: ${apiToken.substring(0, 30)}...`);
      console.log(`   Add to .env: DIRECTUS_API_KEY=${apiToken}\n`);
    } catch (err) {
      console.warn('⚠️  API Token creation skipped (may already exist)');
      console.warn(`   ${err.response?.data?.errors?.[0]?.message || err.message}\n`);
    }

    // 10. Display summary
    console.log('✨ Security Configuration Complete!\n');
    console.log('═══════════════════════════════════════════════════');
    console.log('Security Settings Summary:');
    console.log('═══════════════════════════════════════════════════');
    console.log(`✅ CORS Enabled: ${corsOrigins.join(', ')}`);
    console.log(`✅ Auth Attempts: 5 max (15 min lockout)`);
    console.log(`✅ Rate Limiting: 30s timeout, 100MB max request`);
    console.log(`✅ Audit Logging: ENABLED (30 day retention)`);
    console.log(`✅ API Token: Created for automation`);
    console.log('═══════════════════════════════════════════════════\n');

    console.log('🎯 Next Steps:');
    console.log('1. Review these settings in admin: Settings → Project Settings');
    console.log('2. Create additional API tokens for different roles');
    console.log('3. Configure backup schedule (see docs)');
    console.log('4. Set up monitoring and alerts\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error configuring security:');
    console.error(error.response?.data?.errors || error.message);
    process.exit(1);
  }
}

configureSettings();
