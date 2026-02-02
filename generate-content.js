// 🎮 Générateur de Contenu Gaming Premium
const fs = require('fs');
const path = require('path');

const GAMING_CONSOLES = [
  {
    title: "PlayStation 5 : L'Excellence de Sony",
    manufacturer: "Sony",
    release_year: 2020,
    generation: "current_gen",
    specs: "Processeur 8-core Zen 2 @ 3.5 GHz, GPU RDNA2 10.28 TFLOPS, 16GB GDDR6, SSD 825GB PCIe Gen4",
    price_range: "€499-699",
    games_count: 2500,
    description: "La PlayStation 5 n'est pas qu'une console – c'est une invitation à explorer des mondes impossibles.",
    key_features: ["SSD ultrarapide 825GB", "DualSense révolutionnaire", "Support 4K@60fps"],
    seo_keywords: "PS5, PlayStation 5, console 2020",
    featured: true,
    status: "published"
  },
  {
    title: "Xbox Series X : La Puissance Indomptable",
    manufacturer: "Microsoft",
    release_year: 2020,
    generation: "current_gen",
    specs: "Processeur custom 8-core @ 3.8 GHz, GPU RDNA2 12 TFLOPS, 16GB GDDR6, SSD 1TB NVMe",
    price_range: "€499-699",
    games_count: 3000,
    description: "Xbox Series X - où la puissance brute rencontre l'innovation intelligente.",
    key_features: ["GPU 12 TFLOPS", "Game Pass inclus", "Smart Delivery"],
    seo_keywords: "Xbox Series X, Microsoft gaming, Game Pass",
    featured: true,
    status: "published"
  }
];

const GAMING_GUIDES = [
  {
    title: "Connecter votre Console Rétro à une TV Moderne",
    difficulty: "intermediate",
    duration_minutes: 15,
    category: "how_to",
    description: "Guide complet pour connecter les consoles rétro à une TV moderne.",
    seo_keywords: "retro console, HDMI adapter, rétro gaming",
    status: "published"
  }
];

const GAMING_ACCESSORIES = [
  {
    title: "Manette DualSense PlayStation 5",
    category: "controllers",
    brand: "Sony",
    price_eur: 75,
    description: "La DualSense est plus qu'une manette. C'est une fenêtre vers l'âme d'un jeu.",
    specs: {
      battery_life: "12 heures",
      colors: ["Blanc", "Noir", "Gris"]
    },
    seo_keywords: "DualSense, PS5 controller",
    amazon_link: "https://amazon.fr/s?k=DualSense",
    status: "published"
  }
];

const data = {
  consoles: GAMING_CONSOLES,
  guides: GAMING_GUIDES,
  accessories: GAMING_ACCESSORIES,
  generated_at: new Date().toISOString()
};

fs.mkdirSync('./data', { recursive: true });
fs.writeFileSync('./data/gaming-premium-content.json', JSON.stringify(data, null, 2));

console.log('✅ Contenu premium créé :');
console.log(`   - ${GAMING_CONSOLES.length} consoles`);
console.log(`   - ${GAMING_GUIDES.length} guides`);
console.log(`   - ${GAMING_ACCESSORIES.length} accessoires`);
