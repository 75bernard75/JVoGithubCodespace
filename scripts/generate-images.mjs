#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '../src/assets/images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create SVG placeholder images instead of PNG (they render better and are smaller)
const images = {
  'logo.svg': `<svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="60" fill="#1a1a1a"/>
    <text x="100" y="40" font-size="32" font-weight="bold" fill="#ff6b35" text-anchor="middle" font-family="Arial">🎮 Gaming Premium</text>
  </svg>`,
  
  'ps5-hero.svg': `<svg width="600" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="300" fill="#001a33"/>
    <circle cx="150" cy="150" r="80" fill="#0066cc" opacity="0.8"/>
    <rect x="350" y="100" width="160" height="160" fill="#0066cc" opacity="0.8" rx="20"/>
    <text x="300" y="180" font-size="48" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">PlayStation 5</text>
    <text x="300" y="230" font-size="24" fill="#ff6b35" text-anchor="middle" font-family="Arial">L'Excellence Gaming</text>
  </svg>`,
  
  'xbox-hero.svg': `<svg width="600" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="300" fill="#1a1a1a"/>
    <rect x="100" y="80" width="120" height="140" fill="#107c10" opacity="0.8" rx="10"/>
    <circle cx="380" cy="150" r="70" fill="#107c10" opacity="0.8"/>
    <text x="300" y="180" font-size="48" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">Xbox Series X</text>
    <text x="300" y="230" font-size="24" fill="#ff6b35" text-anchor="middle" font-family="Arial">La Puissance Indomptable</text>
  </svg>`,
  
  'game-placeholder.svg': `<svg width="300" height="400" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="400" fill="#333"/>
    <rect x="30" y="30" width="240" height="280" fill="#0066cc" rx="10"/>
    <text x="150" y="180" font-size="32" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">🎮 Jeu AAA</text>
    <text x="150" y="360" font-size="18" fill="white" text-anchor="middle" font-family="Arial">Couverture Jeu</text>
  </svg>`,
  
  'accessory-placeholder.svg': `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#f5f5f5"/>
    <circle cx="120" cy="150" r="80" fill="#ff6b35" opacity="0.7"/>
    <rect x="220" y="80" width="140" height="140" fill="#0066cc" opacity="0.7" rx="10"/>
    <text x="200" y="270" font-size="20" fill="#1a1a1a" text-anchor="middle" font-family="Arial">Accessoire Gaming</text>
  </svg>`,
  
  'og-image.svg': `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2d2d2d;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#grad)"/>
    <circle cx="300" cy="315" r="150" fill="#0066cc" opacity="0.6"/>
    <rect x="650" y="165" width="300" height="300" fill="#ff6b35" opacity="0.6" rx="20"/>
    <text x="600" y="120" font-size="72" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">Gaming Premium</text>
    <text x="600" y="220" font-size="48" fill="#ff6b35" text-anchor="middle" font-family="Arial">Guides • Accessoires • Jeux</text>
    <text x="600" y="520" font-size="32" fill="white" text-anchor="middle" font-family="Arial">Votre Source Complète Gaming</text>
  </svg>`,
};

Object.entries(images).forEach(([filename, content]) => {
  const filePath = path.join(imagesDir, filename);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Créé: ${filename}`);
});

console.log(`\n📊 ${Object.keys(images).length} images de placer créées`);
