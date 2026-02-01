# 🎮 QUICK REFERENCE - PHASE 2 EXECUTION

**Imprimer ce document** ou garder ouvert lors du travail quotidien.

---

## 📋 DAILY CHECKLIST (15 MINUTES)

### ☀️ MORNING (5 min) - Add Consoles
```
□ Open http://localhost:8055/admin
□ Click: Collections → consoles → Create New
□ Fill in:
  - Title: [Console name]
  - Manufacturer: [Brand]
  - Release Year: [Year]  
  - Specs: [Copy from templates or paste]
  - Price Range: [€xxx-xxx]
  - Games Count: [Number]
  - Description: [Details]
□ Click: Save
□ Repeat: Add 2nd console (same steps)
```

### 🌤️ MIDDAY (5 min) - Add Accessories
```
□ Go to: Collections → accessories → Create New
□ Fill in:
  - Title: [Product name]
  - Category: [Type]
  - Price: [€xx]
  - Features: [Bullet points]
  - Amazon Link: [affiliate link]
  - Description: [Details]
□ Click: Save
□ Repeat: Add 2-3 accessories (same steps)
```

### 🌙 EVENING (5 min) - Deploy
```
□ Run: npm run directus:export
□ Run: npm run build
□ Run: git add -A && git commit -m "🎮 [Date]: +5 items" && git push
□ Wait: 2-3 minutes for GitHub Actions
□ Verify: Visit https://75bernard75.github.io/JVoGithubCodespace/
□ Check: Are your new items visible?
```

---

## 📈 WEEKLY TARGETS

| Week | Dates | Target | Status |
|------|-------|--------|--------|
| 1 | Feb 2-8 | 30 items | ⏳ Starting |
| 2 | Feb 9-15 | +50 items (80 total) | ⏳ Pending |
| 3 | Feb 16-22 | +20 items (100+ total) | ⏳ Pending |
| 4 | Feb 23-28 | Testing & launch | ⏳ Pending |

---

## 🎮 CONTENT TEMPLATES

### Console Entry
```
PlayStation 5
Sony
2020
8-core custom Zen 2 CPU, 16GB GDDR6, 825GB SSD, 4K@60fps
€500-700
1000+
The PlayStation 5 is Sony's current-generation console with exceptional performance. 
Ultra-fast SSD ensures instant loading. Innovative DualSense controller with haptic 
feedback. Perfect for AAA games and PlayStation exclusives.
```

### Accessory Entry
```
Manette DualSense Blanc
Controllers
€75
Haptic feedback, Adaptive triggers, Built-in microphone, 3D audio, 12-hour battery
Official PS5 controller with revolutionary haptic feedback and adaptive trigger 
technology. Built-in microphone for voice chat. USB-C charging.
```

### Guide Entry
```
How to Connect Retro Consoles to Modern TV
Intermediate
15 minutes
Many retro consoles use outdated connection standards. This guide walks through 
connecting Nintendo 64, PlayStation 1, or Sega Genesis to modern televisions.
```

---

## 🚀 DEPLOYMENT COMMAND

```bash
npm run directus:export && npm run build && git add -A && git commit -m "🎮 LOT 4: Items added" && git push origin main
```

---

## 🔗 IMPORTANT URLS

| Service | URL |
|---------|-----|
| CMS | http://localhost:8055/admin |
| Live Site | https://75bernard75.github.io/JVoGithubCodespace/ |
| GitHub Repo | https://github.com/75bernard75/JVoGithubCodespace |
| GitHub Actions | https://github.com/75bernard75/JVoGithubCodespace/actions |

---

## 📞 HELP COMMANDS

| Issue | Command |
|-------|---------|
| Check Directus | `docker-compose ps` |
| See items to add | `bash quick-add-items.sh consoles 10` |
| View dashboard | `bash project-dashboard.sh` |
| Verify workflow | `bash validate-lot4-workflow.sh` |
| Read quick guide | `cat START_NOW_5MIN.md` |

---

## 💡 PRO TIPS

1. **Batch Add**: Add 5-6 items, then deploy once
2. **Copy-Paste**: Use templates from COMPLETE_4WEEK_PLAN.md
3. **Images**: Download from Google Images, resize to 400x300px
4. **Links**: Always add Amazon affiliate link to accessories
5. **Time**: Evening deploy = morning traffic next day

---

## ✅ SUCCESS CHECKLIST

- [ ] Day 1: 5 items added, deployed successfully
- [ ] Week 1: 30 items total ← CHECKPOINT 1
- [ ] Week 2: 80 items total ← CHECKPOINT 2
- [ ] Week 3: 100+ items total ← CHECKPOINT 3
- [ ] Week 4: Testing complete, ready to launch ← READY!

---

## 🎯 THIS IS YOUR PLAN

**Your goal**: 15 minutes per day × 28 days = 100+ items = $$$$

**You've got**:
- ✅ Infrastructure (done)
- ✅ Templates (ready)
- ✅ Automated deployment (ready)
- ✅ Documentation (ready)

**All you need to do**: Add content every day

**You can do this!** 🚀
