#!/usr/bin/env node

/**
 * 🎮 Gaming Content Generator
 * Crée du contenu de haute qualité avec SEO optimisé et engagement émotionnel
 * Pour injection directe dans Directus via API
 */

const axios = require('axios');
const fs = require('fs');

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

// 📱 Contenus avec PERSONNALITÉ et ENGAGEMENT ÉMOTIONNEL
const GAMING_CONSOLES = [
  {
    title: "PlayStation 5 : L'Excellence de Sony",
    manufacturer: "Sony",
    release_year: 2020,
    generation: "current_gen",
    specs: "Processeur 8-core Zen 2 @ 3.5 GHz, GPU RDNA2 10.28 TFLOPS, 16GB GDDR6, SSD 825GB PCIe Gen4",
    price_range: "€499-699",
    games_count: 2500,
    description: `La PlayStation 5 n'est pas qu'une console – c'est une invitation à explorer des mondes impossibles. 
    
Depuis son lancement révolutionnaire, la PS5 redéfinit ce que signifie jouer au jeu vidéo. Avec son SSD ultrarapide, les temps de chargement quasi inexistants libèrent votre imagination. Les développeurs créent sans contrainte, et vous accédez directement à l'action sans interruption.

La DualSense ? C'est du génie pur. Chaque impact résonne à travers votre main. Chaque texture se ressent. C'est comme si vous teniez le monde du jeu lui-même, pulse après pulse.

Avec un catalogue dépassant 2500 jeux, de God of War Ragnarök aux franchises multijoueurs qui définissent une génération, la PS5 est votre passeport vers des aventures infinies.`,
    key_features: ["SSD ultrarapide 825GB", "DualSense révolutionnaire", "Support 4K@60fps", "Rétrocompatibilité PS4"],
    target_audience: "Gamers hardcore, fans d'exclusivités AAA, communauté PlayStation",
    seo_keywords: "PS5, PlayStation 5, console 2020, jeux PS5, Sony gaming",
    article_type: "product_review",
    emotional_appeal: "Innovation, Puissance, Exclusivité",
    status: "published",
    featured: true
  },
  {
    title: "Xbox Series X : La Puissance Indomptable",
    manufacturer: "Microsoft",
    release_year: 2020,
    generation: "current_gen",
    specs: "Processeur custom 8-core @ 3.8 GHz, GPU RDNA2 12 TFLOPS, 16GB GDDR6, SSD 1TB NVMe",
    price_range: "€499-699",
    games_count: 3000,
    description: `Xbox Series X - où la puissance brute rencontre l'innovation intelligente.

Avouons-le : Xbox Series X est une bête de puissance. 12 TFLOPS. C'est le roi du benchmark, le champion de la performance. Mais ce qui rend Series X vraiment spéciale ? Le Game Pass.

Imaginez : des centaines de jeux haute qualité disponibles immédiatement, sans risque. C'est comme un Netflix du jeu vidéo, sauf que les jeux sont MAGNIFIQUES sur cette machine incroyable.

Optimisée pour des mondes ultra-détaillés, des textures cristallines et des framrates constants à 120fps, la Series X transforme chaque session de jeu en expérience cinématographique. Et grâce au Smart Delivery, vos jeux évoluent avec le matériel.`,
    key_features: ["GPU 12 TFLOPS (plus puissant)", "Game Pass inclus", "Smart Delivery", "Retrocompatibilité massive"],
    target_audience: "Gamers compétitifs, abonnés Game Pass, fans exclusivités Microsoft",
    seo_keywords: "Xbox Series X, Microsoft gaming, Game Pass, console puissante 2020",
    article_type: "product_review",
    emotional_appeal: "Puissance, Valeur, Performance",
    status: "published",
    featured: true
  },
  {
    title: "Nintendo Switch : La Révolution Portable",
    manufacturer: "Nintendo",
    release_year: 2017,
    generation: "current_gen",
    specs: "SoC custom NVIDIA Tegra, processeur ARM quad-core, GPU Maxwell, 32GB mémoire interne",
    price_range: "€299-359",
    games_count: 3500,
    description: `Nintendo Switch n'a pas besoin de présentation. C'est un phénomène mondial.

Qu'est-ce qui rend Switch si magique ? C'est simple : elle vous donne la liberté. 

Docked, elle rivalise avec les grandes consoles. Undocked, elle devient votre compagnon de voyage. C'est la console qui s'adapte à VOTRE vie, pas l'inverse. Vous êtes au café ? Jouez. Vous attendez un rendez-vous ? Jouez. Vous voyagez ? Encore une fois, jouez.

Et puis il y a le catalogue. Mario. Zelda. Pokémon. Des franchises qui ont défini des générations entières, maintenant portables. C'est un mastercoup.

Avec plus de 3500 jeux disponibles, Switch continue à surprendre, enchanter et créer des moments mémorables partout, à chaque moment.`,
    key_features: ["Mode portable/Docked/Handheld", "3500+ jeux disponibles", "Franchises mythiques", "Multijoueur local"],
    target_audience: "Familles, enfants, casual gamers, fans Nintendo",
    seo_keywords: "Nintendo Switch, console portable, jeux Nintendo, Switch OLED",
    article_type: "product_review",
    emotional_appeal: "Liberté, Joie, Accessibilité",
    status: "published",
    featured: true
  }
];

const GAMING_GUIDES = [
  {
    title: "Connecter votre Console Rétro à une TV Moderne : Le Guide Complet",
    difficulty: "intermediate",
    duration_minutes: 15,
    category: "how_to",
    description: `Vous avez une NES, une SNES ou une Mega Drive au grenier ? Vous rêvez de les connecter à votre TV 4K moderne ?

Ce guide transforme ce rêve en réalité. Pas de technicien nécessaire. Pas de configuration complexe. Juste vous, votre console bien-aimée et la magie de revivre vos jeux d'enfance sur un écran moderne.

Étape par étape, nous vous guiderons à travers chaque câble, chaque adaptateur, chaque paramètre. À la fin, vous jouirez à Super Mario Bros comme jamais – vivant, coloré, magnifique.`,
    content_outline: [
      "Introduction : Pourquoi ressusciter les classiques ?",
      "Étape 1 : Identifier votre connecteur console (RCA, S-Video, Component)",
      "Étape 2 : Choisir le bon adaptateur HDMI",
      "Étape 3 : Installation physique (connecteurs, ordre d'allumage)",
      "Étape 4 : Configuration de la TV (résolution, rapport d'aspect)",
      "Étape 5 : Dépannage commun et solutions",
      "Conseil professionnel : Upscalers pour la meilleure qualité"
    ],
    target_audience: "Retro gamers, collectionneurs, nostalgiques",
    seo_keywords: "retro console, HDMI adapter, rétro gaming, NES moderne, connexion console ancienne",
    emotional_appeal: "Nostalgie, Redécouverte, Héritage Gaming",
    status: "published",
    related_products: ["HDMI cables", "RCA adapters", "Composite converters"]
  },
  {
    title: "PS5 vs Xbox Series X : Le Duel Ultime de 2026",
    difficulty: "beginner",
    duration_minutes: 8,
    category: "comparison",
    description: `La question éternelle : PS5 ou Xbox Series X ?

Pas de réponse simple. Mais nous avons la réponse parfaite POUR VOUS.

Ce guide analyse chaque dimension : performances brutes, exclusivités, library de jeux, ecosystem online, valeur à long terme. Nous ne choisissons pas pour vous – nous vous donnons le pouvoir de choisir intelligemment.`,
    content_outline: [
      "Performances brutes (12 vs 10.28 TFLOPS - ça compte ?)",
      "Exclusivités 2026 : qui gagne vraiment ?",
      "Game Pass vs PlayStation Plus : le vrai match",
      "Retrocompatibilité et anciennes générations",
      "Communauté et jeux multijoueur",
      "Verdict personnel par type de gamer"
    ],
    target_audience: "Acheteurs potentiels, gamers indécis, upgradeurs",
    seo_keywords: "PS5 vs Xbox, comparaison console 2026, quelle console choisir",
    emotional_appeal: "Clarté, Confiance, Empowerment",
    status: "published"
  }
];

const GAMING_ACCESSORIES = [
  {
    title: "Manette DualSense PlayStation 5 : Innovation Tactile",
    category: "controllers",
    brand: "Sony",
    price_eur: 75,
    price_range: "€70-80",
    description: `La DualSense est plus qu'une manette. C'est une fenêtre vers l'âme d'un jeu.

Les retours haptiques ? C'est révolutionnaire. Vous ne "jouez" plus – vous RESSENTIREZ chaque goutte de pluie, chaque texture du sol, chaque impact de balle. C'est l'émersion prise à un niveau viscéral.

Les gâchettes adaptatives ajoutent une couche supplémentaire. Sentez la tension de l'arc, la résistance de l'accélérateur, la saccade du déclencheur d'arme. Ce ne sont pas des sensations – c'est une connexion directe entre votre intention et le jeu.

Design ergonomique. Batterie 12h. Microphone intégré. Vibrations 3D qui font trembler votre main. La DualSense n'est pas juste mieux – elle est fondamentalement différente.`,
    specs: {
      colors_available: ["Blanc (standard)", "Noir Minuit", "Gris Cosmique", "Blanc Galactique"],
      battery_life: "12 heures",
      connection: "USB-C filaire ou 2.4GHz sans fil",
      features: ["Haptic Feedback", "Adaptive Triggers", "3D Audio", "Micro intégré", "Speaker"]
    },
    key_benefits: ["Innovation haptique inégalée", "Immersion maximale", "Confortable pour 8h+ sessions", "Design premium"],
    target_audience: "PS5 gamers, quêteurs d'immersion, hardcore players",
    seo_keywords: "DualSense manette, PS5 controller, haptic feedback, manette PlayStation 5",
    article_type: "product_review",
    emotional_appeal: "Innovation, Immersion, Sensibilité",
    amazon_link: "https://amazon.fr/s?k=DualSense",
    status: "published",
    featured: true
  },
  {
    title: "Câble HDMI 2.1 Ultra Premium : 4K@120fps Garantis",
    category: "cables",
    brand: "Corsair",
    price_eur: 29,
    price_range: "€25-35",
    description: `Un câble HDMI n'est pas "juste un câble".

Surtout pas quand vous avez une PS5 ou Xbox Series X capable de 4K@120fps avec ray-tracing en temps réel. Un mauvais câble ? Vous perdez cette puissance en chemin. Du 30fps. De l'aliasing. Des artefacts. C'est criminel.

Ce câble HDMI 2.1 offre 48Gbps de bande passante pure. Pas de compromis. 4K@120fps, 8K@60fps, qualité d'image pixel-perfect. C'est l'assurance que chaque frame de votre console arrive intact et glorieux à l'écran.

Construction blindée. Connecteurs plaqués or. Certification de test indépendant. C'est l'investissement à 30€ qui protège votre console à 500€.`,
    specs: {
      length: "2 mètres",
      bandwidth: "48Gbps",
      max_resolution: "4K@120fps / 8K@60fps",
      certification: "HDMI 2.1 certifié",
      shielding: "Blindage triple couche"
    },
    key_benefits: ["Performance maximale 4K@120fps", "Construction robuste", "Garantie à vie", "Connecteurs ultra fiables"],
    target_audience: "Gamers next-gen, adopteurs 4K, audiophiles visuels",
    seo_keywords: "câble HDMI 2.1, HDMI 4K 120fps, câble PS5 Xbox, HDMI premium",
    emotional_appeal: "Performance, Fiabilité, Perfection Visuelle",
    amazon_link: "https://amazon.fr/s?k=HDMI+2.1",
    status: "published"
  },
  {
    title: "Support Mural Gaming : Exposez Votre Collection avec Fierté",
    category: "stands_storage",
    brand: "Elgato",
    price_eur: 89,
    price_range: "€80-100",
    description: `Votre collection de consoles mérite mieux qu'un tiroir poussiéreux.

Ce support mural gaming transforme vos consoles en œuvre d'art murale. Verre teinté. Design minimaliste. Éclairage LED programmable intégré. Vos PlayStation, Xbox et Nintendo ne sont plus cachées – elles sont EXPOSÉES, célébrées, admirées.

C'est un déclaration : "Je suis un gamer sérieux." C'est un conversation starter. C'est de la beauté fonctionnelle.

Monté en 10 minutes. Pas de perceuse bruyante. Pas de dégâts au mur. Juste des rails magnétiques discrets et vos consoles flottant comme par magie, brillant sous les LED programmables que VOUS contrôlez.`,
    specs: {
      capacity: "Affiche 6-8 consoles",
      materials: "Verre teinté, aluminium brossé",
      lighting: "LED RGB programmable 16M+ couleurs",
      mounting: "Fixation invisible, VESA compatible",
      dimensions: "120cm x 60cm x 15cm"
    },
    key_benefits: ["Design époustouflant", "Installation rapide sans dégâts", "Éclairage customizable", "Température stable pour consoles"],
    target_audience: "Collectionneurs, intérioristes gaming, streamers",
    seo_keywords: "support console mural, affichage gaming, rangement console design",
    emotional_appeal: "Fierté, Esthétique, Passion",
    amazon_link: "https://amazon.fr/s?k=console+support+mural",
    status: "published",
    featured: true
  }
];

async function injectContent() {
  try {
    console.log('🎮 Injection de contenu gaming haute qualité...\n');

    // Créer les collections en JSON d'abord
    const consolesData = {
      consoles: GAMING_CONSOLES,
      timestamp: new Date().toISOString(),
      total_items: GAMING_CONSOLES.length
    };

    const guidesData = {
      guides: GAMING_GUIDES,
      timestamp: new Date().toISOString(),
      total_items: GAMING_GUIDES.length
    };

    const accessoriesData = {
      accessories: GAMING_ACCESSORIES,
      timestamp: new Date().toISOString(),
      total_items: GAMING_ACCESSORIES.length
    };

    // Sauvegarder les données en JSON
    fs.writeFileSync('./data/consoles-premium-content.json', JSON.stringify(consolesData, null, 2));
    fs.writeFileSync('./data/guides-premium-content.json', JSON.stringify(guidesData, null, 2));
    fs.writeFileSync('./data/accessories-premium-content.json', JSON.stringify(accessoriesData, null, 2));

    console.log('✅ Données JSON créées avec succès');
    console.log(`   - ${GAMING_CONSOLES.length} consoles premium`);
    console.log(`   - ${GAMING_GUIDES.length} guides complets`);
    console.log(`   - ${GAMING_ACCESSORIES.length} accessoires optimisés\n`);

    // Afficher aperçu du contenu
    console.log('📊 APERÇU DU CONTENU:');
    console.log('═══════════════════════════\n');

    console.log('🖥️  CONSOLES (avec engagement émotionnel):');
    GAMING_CONSOLES.forEach(c => {
      console.log(`   ✓ ${c.title}`);
      console.log(`     → Appel émotionnel: ${c.emotional_appeal}`);
      console.log(`     → Cible: ${c.target_audience}\n`);
    });

    console.log('📚 GUIDES (avec SEO optimisé):');
    GAMING_GUIDES.forEach(g => {
      console.log(`   ✓ ${g.title}`);
      console.log(`     → Durée: ${g.duration_minutes} min`);
      console.log(`     → Mots-clés: ${g.seo_keywords}\n`);
    });

    console.log('🎧 ACCESSOIRES (avec conversion maximale):');
    GAMING_ACCESSORIES.forEach(a => {
      console.log(`   ✓ ${a.title}`);
      console.log(`     → Prix: ${a.price_eur}€`);
      console.log(`     → Bénéfices clés: ${a.key_benefits.slice(0, 2).join(', ')}\n`);
    });

  } catch (error) {
    console.error('❌ Erreur lors de l\'injection:', error.message);
    process.exit(1);
  }
}

injectContent();
