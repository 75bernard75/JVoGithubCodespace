import fs from 'fs';

const GAMING_CONSOLES = [
  {
    title: "PlayStation 5 : L'Excellence de Sony",
    manufacturer: "Sony",
    release_year: 2020,
    specs: "Processeur 8-core Zen 2 @ 3.5 GHz, GPU RDNA2 10.28 TFLOPS",
    price_range: "€499-699",
    games_count: 2500,
    status: "published"
  },
  {
    title: "Xbox Series X : La Puissance Indomptable",
    manufacturer: "Microsoft",
    release_year: 2020,
    specs: "Processeur custom 8-core @ 3.8 GHz, GPU RDNA2 12 TFLOPS",
    price_range: "€499-699",
    games_count: 3000,
    status: "published"
  },
  {
    title: "Nintendo Switch : La Révolution Portable",
    manufacturer: "Nintendo",
    release_year: 2017,
    specs: "SoC custom NVIDIA Tegra",
    price_range: "€299-359",
    games_count: 3500,
    status: "published"
  }
];

const GAMING_GUIDES = [
  {
    title: "Connecter votre Console Rétro à une TV Moderne",
    difficulty: "intermediate",
    duration_minutes: 15,
    status: "published"
  },
  {
    title: "PS5 vs Xbox Series X : Le Duel Ultime",
    difficulty: "beginner",
    duration_minutes: 8,
    status: "published"
  }
];

const GAMING_ACCESSORIES = [
  {
    title: "Manette DualSense PlayStation 5",
    category: "controllers",
    brand: "Sony",
    price_eur: 75,
    status: "published"
  },
  {
    title: "Câble HDMI 2.1 Ultra Premium",
    category: "cables",
    brand: "Corsair",
    price_eur: 29,
    status: "published"
  },
  {
    title: "Support Mural Gaming Premium",
    category: "stands_storage",
    brand: "Elgato",
    price_eur: 89,
    status: "published"
  }
];

const data = {
  consoles: GAMING_CONSOLES,
  guides: GAMING_GUIDES,
  accessories: GAMING_ACCESSORIES,
  generated_at: new Date().toISOString(),
  stats: {
    total_items: GAMING_CONSOLES.length + GAMING_GUIDES.length + GAMING_ACCESSORIES.length,
    consoles: GAMING_CONSOLES.length,
    guides: GAMING_GUIDES.length,
    accessories: GAMING_ACCESSORIES.length
  }
};

fs.mkdirSync('./data', { recursive: true });
fs.writeFileSync('./data/gaming-premium-content.json', JSON.stringify(data, null, 2));

console.log('✅ CONTENU PREMIUM GÉNÉRÉ:');
console.log(`   📱 ${GAMING_CONSOLES.length} consoles haute qualité`);
console.log(`   📚 ${GAMING_GUIDES.length} guides détaillés`);
console.log(`   🎧 ${GAMING_ACCESSORIES.length} accessoires premium`);
console.log(`   ━━━━━━━━━━━━━━━━━━━━`);
console.log(`   ✨ ${data.stats.total_items} items au total`);
