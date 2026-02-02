#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Products database
const games = [
  {
    slug: "final-fantasy-xvi",
    title: "Final Fantasy XVI PS5 - Note 8.8/10 | Avis et Prix",
    shortTitle: "Final Fantasy XVI",
    price: 69.99,
    rating: 8.8,
    platform: "PlayStation 5",
    genre: "JRPG",
    publisher: "Square Enix",
    year: 2023,
    affiliateLink: "https://amzn.to/FinalFantasyXVI",
    description: "La nouvelle aventure épique de Final Fantasy sur PS5. Un JRPG de nouvelle génération."
  },
  {
    slug: "starfield",
    title: "Starfield Xbox Series X - RPG Spatial | Guide et Prix",
    shortTitle: "Starfield",
    price: 69.99,
    rating: 8.6,
    platform: "Xbox Series X",
    genre: "RPG Sci-Fi",
    publisher: "Bethesda",
    year: 2023,
    affiliateLink: "https://amzn.to/Starfield",
    description: "Explorez l'univers dans ce RPG monumental de Bethesda."
  },
  {
    slug: "zelda-tears-of-kingdom",
    title: "The Legend of Zelda: Tears of the Kingdom - Note 9.8/10",
    shortTitle: "Zelda: Tears of the Kingdom",
    price: 69.99,
    rating: 9.8,
    platform: "Nintendo Switch",
    genre: "Aventure",
    publisher: "Nintendo",
    year: 2023,
    affiliateLink: "https://amzn.to/ZeldaTOTK",
    description: "L'aventure épique de Link continue. Le jeu de référence de la Switch."
  },
  {
    slug: "spider-man-2",
    title: "Marvel's Spider-Man 2 PS5 - Action Aventure 2024",
    shortTitle: "Spider-Man 2",
    price: 69.99,
    rating: 9.2,
    platform: "PlayStation 5",
    genre: "Action Aventure",
    publisher: "Insomniac Games",
    year: 2023,
    affiliateLink: "https://amzn.to/SpiderMan2",
    description: "L'aventure web-slinging la plus époustouflante jamais créée."
  },
  {
    slug: "forza-motorsport-5",
    title: "Forza Motorsport 5 Xbox - Simulation de Course Premium",
    shortTitle: "Forza Motorsport 5",
    price: 69.99,
    rating: 9.0,
    platform: "Xbox Series X",
    genre: "Racing",
    publisher: "Turn 10",
    year: 2023,
    affiliateLink: "https://amzn.to/ForzaMotorsport5",
    description: "Le simulateur de course le plus immersif du marché."
  }
];

const accessories = [
  {
    slug: "elite-controller-series-2",
    title: "Manette Xbox Elite Series 2 - Prix et Avis 2024",
    shortTitle: "Xbox Elite Controller Series 2",
    price: 179.99,
    rating: 9.0,
    category: "controllers",
    brand: "Microsoft",
    affiliateLink: "https://amzn.to/EliteController",
    description: "La meilleure manette Xbox. Entièrement personnalisable."
  },
  {
    slug: "steelseries-arctis-nova",
    title: "SteelSeries Arctis Nova Pro - Meilleur Casque Gaming",
    shortTitle: "SteelSeries Arctis Nova Pro",
    price: 349.99,
    rating: 9.2,
    category: "headsets",
    brand: "SteelSeries",
    affiliateLink: "https://amzn.to/SteelSeriesArctis",
    description: "Le casque gaming haut de gamme avec son spatial 360°."
  },
  {
    slug: "wd-black-c50",
    title: "WD_BLACK C50 1TB - SSD Xbox Series X|S Stockage",
    shortTitle: "WD_BLACK C50",
    price: 149.99,
    rating: 8.9,
    category: "storage",
    brand: "Western Digital",
    affiliateLink: "https://amzn.to/WDBlackC50",
    description: "Expansion de stockage optimisée pour Xbox Series X/S."
  }
];

// Generate game pages
function generateGamePage(game) {
  const template = `---
title: "${game.title}"
description: "${game.shortTitle} - ${game.platform}: Note ${game.rating}/10. Avis complet, gameplay, prix d'achat neuf et occasion. Guide d'achat."
layout: layouts/base.njk
keywords: "${game.shortTitle}, ${game.platform}, prix, avis, achat, ${game.genre}"
permalink: /jeux/${game.slug}/
---

# ${game.shortTitle} - ${game.platform}

## 🎮 Aperçu

**${game.shortTitle}** - Une expérience gaming incontournable sur ${game.platform}.

**Note:** ${game.rating}/10 | **Prix:** À partir de €${(game.price * 0.75).toFixed(2)} (occasion), €${game.price} (neuf)

---

## 📊 Fiche Technique

| Aspect | Détail |
|--------|--------|
| **Plateforme** | ${game.platform} |
| **Genre** | ${game.genre} |
| **Éditeur** | ${game.publisher} |
| **Date de sortie** | ${game.year} |

---

## 🎯 Caractéristiques Principales

- ✅ ${game.description}
- ✅ Gameplay captivant et immersif
- ✅ Graphismes de généração actuelle
- ✅ Expérience narrative exceptionnelle

---

## 💰 Où Acheter

### [Acheter sur Amazon](${game.affiliateLink})
- **Prix:** €${game.price}
- **Livraison gratuite** avec Prime
- **Occasions à partir de:** €${(game.price * 0.65).toFixed(2)}

---

## ⭐ Verdict

Note: ${game.rating}/10 - **À acheter!** 

---

## Liens Connexes
- [Tous les jeux ${game.platform}](/jeux-populaires/)
- [Guide d'achat complet](/guides/)
`;

  return template;
}

// Generate accessory pages
function generateAccessoryPage(item) {
  const template = `---
title: "${item.title}"
description: "${item.shortTitle} - Note ${item.rating}/10. Prix, avis et guide d'achat complet. Meilleure offre."
layout: layouts/base.njk
keywords: "${item.shortTitle}, ${item.brand}, prix, accessoire gaming"
permalink: /accessoires/${item.slug}/
---

# ${item.shortTitle}

## 🎧 Présentation

${item.description}

**Note:** ${item.rating}/10 | **Prix:** €${item.price}

---

## ✨ Points Forts

- ✅ Qualité ${item.brand}
- ✅ Performance optimale
- ✅ Excellentes critiques
- ✅ Bon rapport qualité/prix

---

## 💰 Où Acheter

### [Acheter sur Amazon](${item.affiliateLink})
- **Prix:** €${item.price}
- **Livraison rapide** Prime
- **Retour facile** 30 jours

---

## ⭐ Verdict: ${item.rating}/10

À recommander pour tous les gamers.

---

## Voir aussi
- [Tous les accessoires gaming](/guide-achat-accessoires/)
- [Meilleurs guides](/guides/)
`;

  return template;
}

// Create directories if they don't exist
const pagesDir = path.join(__dirname, '../src/pages');
const jeuxDir = path.join(pagesDir, 'jeux');
const accessoiresDir = path.join(pagesDir, 'accessoires');

if (!fs.existsSync(jeuxDir)) fs.mkdirSync(jeuxDir, { recursive: true });
if (!fs.existsSync(accessoiresDir)) fs.mkdirSync(accessoiresDir, { recursive: true });

// Generate game pages
games.forEach(game => {
  const content = generateGamePage(game);
  const filePath = path.join(jeuxDir, `${game.slug}.md`);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Créé: ${game.slug}`);
});

// Generate accessory pages
accessories.forEach(item => {
  const content = generateAccessoryPage(item);
  const filePath = path.join(accessoiresDir, `${item.slug}.md`);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Créé: ${item.slug}`);
});

console.log(`\n📊 Statistiques:`);
console.log(`   - ${games.length} pages de jeux générées`);
console.log(`   - ${accessories.length} pages d'accessoires générées`);
console.log(`   - Total: ${games.length + accessories.length} nouvelles pages SEO`);
