# Spécifications Détaillées des Infographiques Gaming

**Date:** Février 2026  
**Version:** 1.0.0  
**Total Infographiques:** 15+

---

## 1. PS5 vs Xbox Series X - Specs Comparison

### Concept Général
Infographie comparative côte à côte montrant les spécifications techniques PS5 vs Xbox Series X avec données visuelles claires et mémorables.

### Données à Afficher

| Catégorie | PS5 | Xbox Series X |
|-----------|-----|---------------|
| **GPU** | 10.28 TFLOPS | 12 TFLOPS |
| **CPU** | 8-core 3.5 GHz | 8-core 3.8 GHz |
| **RAM** | 16GB GDDR6 | 16GB GDDR6 |
| **SSD** | 825GB NVMe | 1TB NVMe |
| **Max Resolution** | 4K @ 120fps | 4K @ 120fps |
| **Price** | $499 USD | $499 USD |
| **Year** | 2020 | 2020 |

### Design Recommandations
- **Dimensions:** 1000x600px (horizontal layout)
- **Couleurs:** PS5 bleu (#003087), Xbox verte (#107C10), gris neutre (#F0F0F0)
- **Police:** Arial Bold pour specs, smaller pour labels
- **Éléments visuels:** Barres comparatives, badges différences clés
- **Format:** PNG + SVG
- **Tools:** Figma, Canva Pro, ou Adobe Illustrator

### Layout Proposé
```
┌─────────────────────────────┬─────────────────────────────┐
│     PLAYSTATION 5           │      XBOX SERIES X          │
│  [Image console PS5]        │  [Image console Xbox]       │
├─────────────────────────────┼─────────────────────────────┤
│ GPU: 10.28 TFLOPS  [████░]  │ GPU: 12 TFLOPS     [█████░] │
│ CPU: 3.5 GHz       [████░]  │ CPU: 3.8 GHz       [█████░] │
│ RAM: 16GB GDDR6    [█████░]  │ RAM: 16GB GDDR6    [█████░] │
│ SSD: 825GB NVMe    [████░]  │ SSD: 1TB NVMe      [█████░] │
│ Price: $499        [Égal]   │ Price: $499        [Égal]   │
└─────────────────────────────┴─────────────────────────────┘
```

### Métadonnées JSON
```json
{
  "id": "infograph-001",
  "title": "PS5 vs Xbox Series X - Complete Specs Comparison",
  "category": "comparison",
  "priority": "CRITICAL",
  "dimensions": "1000x600",
  "formats": ["png", "svg", "webp"],