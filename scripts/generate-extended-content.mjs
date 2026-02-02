#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const extendedContent = {
  games: [
    { title: "Elden Ring", console: "PlayStation 5", genre: "RPG Action", release_year: 2022, publisher: "Bandai Namco", price_eur: 59.99, rating: 9.3 },
    { title: "Final Fantasy XVI", console: "PlayStation 5", genre: "JRPG", release_year: 2023, publisher: "Square Enix", price_eur: 69.99, rating: 8.8 },
    { title: "Baldur's Gate 3", console: "PlayStation 5", genre: "RPG", release_year: 2023, publisher: "Larian Studios", price_eur: 64.99, rating: 9.5 },
    { title: "Spider-Man 2", console: "PlayStation 5", genre: "Action Aventure", release_year: 2023, publisher: "Insomniac Games", price_eur: 69.99, rating: 9.2 },
    { title: "Starfield", console: "Xbox Series X", genre: "RPG Sci-Fi", release_year: 2023, publisher: "Bethesda", price_eur: 69.99, rating: 8.6 },
    { title: "Forza Motorsport 5", console: "Xbox Series X", genre: "Racing", release_year: 2023, publisher: "Turn 10", price_eur: 69.99, rating: 9.0 },
    { title: "Halo Infinite", console: "Xbox Series X", genre: "FPS", release_year: 2021, publisher: "343 Industries", price_eur: 59.99, rating: 8.8 },
    { title: "The Legend of Zelda: Tears of the Kingdom", console: "Nintendo Switch", genre: "Aventure", release_year: 2023, publisher: "Nintendo", price_eur: 69.99, rating: 9.8 },
    { title: "Super Mario Bros. Wonder", console: "Nintendo Switch", genre: "Plateforme", release_year: 2023, publisher: "Nintendo", price_eur: 59.99, rating: 8.9 }
  ],

  accessories_expanded: [
    { title: "Manette Xbox Elite Wireless Series 2", category: "controllers", brand: "Microsoft", price_eur: 179.99, rating: 9.0 },
    { title: "Pro Controller Nintendo Switch", category: "controllers", brand: "Nintendo", price_eur: 64.99, rating: 8.7 },
    { title: "SteelSeries Arctis Nova Pro", category: "headsets", brand: "SteelSeries", price_eur: 349.99, rating: 9.2 },
    { title: "Sony WH-CH720N", category: "headsets", brand: "Sony", price_eur: 149.99, rating: 8.5 },
    { title: "Samsung 990 Pro 4TB", category: "storage", brand: "Samsung", price_eur: 399.99, rating: 9.3 },
    { title: "WD_BLACK C50 1TB", category: "storage", brand: "Western Digital", price_eur: 149.99, rating: 8.9 },
    { title: "Anker PowerCore 20100", category: "charging", brand: "Anker", price_eur: 29.99, rating: 8.8 }
  ]
};

fs.writeFileSync(path.join(dataDir, 'games.json'), JSON.stringify({ games: extendedContent.games }, null, 2));
fs.writeFileSync(path.join(dataDir, 'accessories-expanded.json'), JSON.stringify({ accessories: extendedContent.accessories_expanded }, null, 2));

console.log(`✅ ${extendedContent.games.length} jeux générés`);
console.log(`✅ ${extendedContent.accessories_expanded.length} accessoires générés`);
