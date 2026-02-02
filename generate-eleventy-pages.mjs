import fs from 'fs';
import path from 'path';

// Charger le contenu généré
const contentData = JSON.parse(fs.readFileSync('./data/gaming-premium-content.json', 'utf8'));

/**
 * Générer des pages Eleventy avec contenu SEO optimisé
 */

const generatePages = () => {
  const pagesDir = './src/pages/content';
  fs.mkdirSync(pagesDir, { recursive: true });

  // 🎮 CONSOLES - Pages Premium
  contentData.consoles.forEach((console, idx) => {
    const slug = console.title
      .toLowerCase()
      .replace(/[àâä]/g, 'a')
      .replace(/[éèê]/g, 'e')
      .replace(/[ù]/g, 'u')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const frontmatter = {
      layout: 'console-detail.njk',
      title: console.title,
      description: `${console.title} - ${console.manufacturer} ${console.release_year}. Spécifications, prix et caractéristiques complètes.`,
      manufacturer: console.manufacturer,
      year: console.release_year,
      specs: console.specs,
      priceRange: console.price_range,
      gamesCount: console.games_count,
      featured: console.status === 'published',
      seoKeywords: console.seo_keywords,
      tags: ['consoles', 'gaming', 'hardware'],
      permalink: `/consoles/${slug}/index.html`,
      eleventyNavigation: {
        key: console.title,
        parent: 'Consoles'
      }
    };

    const content = `---
${Object.entries(frontmatter).map(([key, val]) => 
  `${key}: ${typeof val === 'string' ? `"${val.replace(/"/g, '\\"')}"` : JSON.stringify(val)}`
).join('\n')}
---

# ${console.title}

## 📊 Fiche Technique

**Fabricant:** ${console.manufacturer}  
**Année de Sortie:** ${console.release_year}  
**Prix:** ${console.price_range}  
**Catalogue:** ${console.games_count}+ jeux

### Spécifications Complètes

${console.specs}

## 💎 Points Forts

${console.key_features?.map(f => `- **${f}**`).join('\n') || '- Pas de détails'}

## 🎯 Public Cible

${console.target_audience || 'Gamers passionnés'}

---

*Dernière mise à jour: ${new Date().toLocaleDateString('fr-FR')}*
`;

    fs.writeFileSync(
      path.join(pagesDir, `console-${slug}.md`),
      content
    );
  });

  // 📚 GUIDES - Pages Content Rich
  contentData.guides.forEach((guide, idx) => {
    const slug = guide.title
      .toLowerCase()
      .replace(/[àâä]/g, 'a')
      .replace(/[éèê]/g, 'e')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const frontmatter = {
      layout: 'guide-detail.njk',
      title: guide.title,
      description: guide.description,
      difficulty: guide.difficulty,
      duration: guide.duration_minutes,
      category: guide.category,
      seoKeywords: guide.seo_keywords,
      tags: ['guides', 'tutorial', 'gaming'],
      permalink: `/guides/${slug}/index.html`,
      tableOfContents: true
    };

    const content = `---
${Object.entries(frontmatter).map(([key, val]) =>
  `${key}: ${typeof val === 'string' ? `"${val.replace(/"/g, '\\"')}"` : JSON.stringify(val)}`
).join('\n')}
---

# ${guide.title}

⏱️ **Durée:** ${guide.duration_minutes} minutes  
📊 **Difficulté:** ${guide.difficulty.charAt(0).toUpperCase() + guide.difficulty.slice(1)}

## Overview

${guide.description}

## Contenu Complet

${guide.content_outline?.map((item, i) => `${i + 1}. **${item}**`).join('\n') || '- Guide détaillé'}

---

*Guide créé: ${new Date().toLocaleDateString('fr-FR')}*
`;

    fs.writeFileSync(
      path.join(pagesDir, `guide-${slug}.md`),
      content
    );
  });

  // 🎧 ACCESSORIES - Pages Product Rich
  contentData.accessories.forEach((acc, idx) => {
    const slug = acc.title
      .toLowerCase()
      .replace(/[àâä]/g, 'a')
      .replace(/[éèê]/g, 'e')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const frontmatter = {
      layout: 'accessory-detail.njk',
      title: acc.title,
      description: acc.description,
      brand: acc.brand,
      category: acc.category,
      price: acc.price_eur,
      seoKeywords: acc.seo_keywords,
      affiliateLink: acc.amazon_link,
      tags: ['accessoires', 'produits', 'gaming'],
      permalink: `/accessoires/${slug}/index.html`
    };

    const content = `---
${Object.entries(frontmatter).map(([key, val]) =>
  `${key}: ${typeof val === 'string' ? `"${val.replace(/"/g, '\\"')}"` : JSON.stringify(val)}`
).join('\n')}
---

# ${acc.title}

🏷️ **Marque:** ${acc.brand}  
💶 **Prix:** ${acc.price_eur}€  
📂 **Catégorie:** ${acc.category}

## À Propos

${acc.description}

### Caractéristiques

${Object.entries(acc.specs || {}).map(([key, val]) =>
  `- **${key.replace(/_/g, ' ')}:** ${Array.isArray(val) ? val.join(', ') : val}`
).join('\n')}

### Avantages Clés

${acc.key_benefits?.map(b => `✅ ${b}`).join('\n') || '✅ Qualité premium'}

## Où Acheter

[Voir sur Amazon](${acc.amazon_link})

---

*Produit analysé: ${new Date().toLocaleDateString('fr-FR')}*
`;

    fs.writeFileSync(
      path.join(pagesDir, `accessory-${slug}.md`),
      content
    );
  });

  console.log('✅ PAGES GÉNÉRÉES:');
  console.log(`   📄 ${contentData.consoles.length} pages consoles`);
  console.log(`   📚 ${contentData.guides.length} pages guides`);
  console.log(`   🛍️  ${contentData.accessories.length} pages accessoires`);
  console.log(`\n📍 Dossier: ./src/pages/content`);
};

generatePages();
