# 🎮 Jeux Vidéo Occasion — Architecture Complète

## 📋 Overview

Projet **affiliation premium** dédié aux consoles et jeux vidéo d'occasion (1970–2015).

- **Front** : Eleventy (statique ultra-léger)
- **Back-office** : Directus (headless, sécurisé sous `/EdithLa`)
- **Affiliation** : Amazon + eBay (API conformes)
- **Langue** : FR-only en V1 (multilingue préparé)
- **Hébergement** : Mutualisé (o2switch/MassiveHoster)

---

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev    # Eleventy local (port 8080)
```

### Build Production
```bash
npm run build  # Génère _site/
```

### Tests
```bash
npm run test:all  # SEO + Content + Affiliate + Security
```

---

## ✅ Status LOT 0 & LOT 1

### LOT 0 — Cadrage final ✅
- ✅ Décisions ambiguïtés résolues
  - **AMB-1** : Directus (UX WordPress-like)
  - **AMB-2** : Scénarios 1+3 (API + imports directs configurables)
  - **AMB-6** : Option A (prototype test avant LOT 2)
- ✅ Architecture validée
- ✅ Collections Directus schéma défini
- ✅ Configs globales gelées

### LOT 1 — Front Eleventy ✅
- ✅ Init Eleventy + config
- ✅ Templates base + layouts
- ✅ CSS minimal (< 20KB)
- ✅ Tests automatisés (SEO/Security/Affiliate)
- ✅ Build performance : < 0.3s (3 pages = **17KB**)
- ✅ Performance budgets codifiés en CI/CD

---

## 📁 Structure Repo

```
/workspaces/JVoGithubCodespace/
├── .github/workflows/       # CI/CD GitHub Actions
├── src/
│   ├── _data/               # Données JSON (future Directus export)
│   ├── _includes/layouts/   # Templates Nunjucks
│   ├── assets/
│   │   ├── css/main.css     # Styles purgés
│   │   ├── js/              # JS minimal
│   │   └── images/          # Assets (lazy loading)
│   ├── pages/               # Pages statiques
│   │   ├── index.md         # Accueil
│   │   ├── transparence-affiliation.md
│   │   └── mentions-legales.md
│   └── robots.txt           # SEO + sécurité
├── scripts/
│   ├── test-seo.js          # Validation canonicals, maillage
│   ├── test-security.js     # Validation robots, headers
│   ├── test-content.js      # Gating checks (V3, personas, media)
│   ├── test-affiliate.js    # API conformité
│   └── export-json.js       # Export Directus
├── directus-config/
│   └── collections.json     # Schéma collections (consoles, guides, etc.)
├── .eleventy.js             # Config Eleventy
├── package.json             # Scripts + dépendances
├── .env.example             # Config template
└── _site/                   # Build statique (3 pages, 17KB)
```

---

## 🔐 Sécurité Back-office

### /EdithLa (Non-indexable)
```
✅ robots.txt             → Disallow /EdithLa
✅ Headers               → X-Robots-Tag: noindex
✅ Auth                  → Login obligatoire
✅ HTTPS                 → Enforced
✅ Logs                  → Audit trail complet
```

### Affiliation
```
✅ Amazon tag            → jeuxvideooneagain-21 (fixe)
✅ eBay EPN             → campid/customid configurables (admin)
✅ Conformité           → API officielles uniquement
✅ Tracking             → GA4 clics sortants
```

---

## 📊 Performance & Tests

### Build Stats
- **Taille totale** : 17 KB (3 pages HTML)
- **Temps build** : < 1 sec
- **Pages** : 3 (accueil + légales + transparence)

### Tests Automatisés
✅ SEO : canonicals, orphelines, hreflang  
✅ Security : robots.txt, /EdithLa protection  
✅ Affiliate : Amazon tag, eBay config  
✅ Content : gating (V3, personas, media)

### Performance Budgets (CI)
| Métrique | Cible | Alerte | Critique |
|----------|-------|--------|----------|
| HTML | < 50 KB | 55 KB | ❌ > 65 KB |
| CSS | < 20 KB | 25 KB | ❌ > 30 KB |
| JS | < 30 KB | 35 KB | ❌ > 45 KB |
| Images | < 150 KB | 170 KB | ❌ > 200 KB |
| Build (500 pages) | < 60s | 70s | ❌ > 80s |

---

## 🎯 Personas & Intent

5 personas intégrés dans chaque page :
- 🎮 **Nostalgique CSP+** → Nostalgie, expertise
- 👨‍👩‍👧 **Parent pragmatique** → Budget, fiabilité
- 🏆 **Collectionneur exigeant** → Rareté, authenticité
- 💰 **Gamer Budget** → Meilleur rapport qualité
- 🔧 **Tech curieux** → Modifications, compatibilité

---

## 📝 Workflow Contenu (V1→V3)

1. **V1 (Brut)** → Contenu informatif rapide
2. **V2 (Éditeur)** → Réécriture humaine
3. **V3 (Final)** → Lissage + anti-footprint IA

**Gating publication stricte** :
- ❌ Pas de V3 = publication bloquée
- ❌ Persona absent = publication bloquée
- ❌ Money page sans vidéo = publication bloquée
- ❌ Images < seuil = publication bloquée

---

## 🎥 Médias (Règles obligatoires)

- **Vidéos** : Min 1 par page pilier/money
- **Images** : Min 1 (souvent 2–6)
- **Alt** : Naturels, pas keyword stuffing
- **Formats** : WebP/AVIF + fallback JPEG
- **Lazy loading** : 100% (images + iframes vidéo)

---

## 🌍 Multilingue (Dormant V1)

- ✅ Architecture prête (/fr/, /en/, /es/)
- ✅ Champs langue en back-office
- ✅ hreflang quand clusters complets
- ⏸ Activation post-autorité FR

---

## 📞 Prochaines Étapes

### LOT 2 — Back-office Directus
- Setup Directus cloud/self-hosted
- Test prototype UX (editor)
- Configuration collections finalisée
- Export JSON route sécurisée

### LOT 3 — CI/CD & Déploiement
- GitHub Actions setup complet
- Tests SEO/perf + enforcement budgets
- Deploy FTP/SFTP o2switch
- Rollback stratégie

### LOT 4 — Contenu TIER S
- Workflow agents IA (A0→A11)
- 12 consoles piliers
- 48 pages (acheter + expertise + accessoires)
- Affiliation intégrée

---

## 📜 Liens Ressources

- **SOURCE OF TRUTH** : Document référence complet (Phases 0–7)
- **Directus** : CMS headless open-source
- **Eleventy** : Générateur statique ultra-rapide
- **GitHub Actions** : CI/CD gratuit

---

**Status** : 🟢 **LOT 0–1 Complet**  
**Version** : 1.0.0  
**Date** : Janvier 2025  
**Prochaine validation** : Prototype Directus (LOT 2)
