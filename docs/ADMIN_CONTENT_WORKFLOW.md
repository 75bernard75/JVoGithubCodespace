# 📝 Content Workflow Guide

**Purpose**: Step-by-step guide for creating content in Directus  
**Audience**: Content editors, site admins  
**Last Updated**: 2025-01-19

---

## 🎯 Content Types

### 1️⃣ Consoles (Gaming Systems)
**Goal**: Create entries for each gaming console  
**Effort**: 10 min per console  
**Output**: Console page on website

### 2️⃣ Guides (How-To Articles)
**Goal**: Write 3-tier guides (V1, V2, V3 complexity)  
**Effort**: 2-3 hours per full guide  
**Output**: Dynamic content based on user level

### 3️⃣ Accessories (Hardware)
**Goal**: List controllers, cables, cases  
**Effort**: 5 min per accessory  
**Output**: Accessory reference pages

### 4️⃣ Videos (Embedded Content)
**Goal**: Link YouTube videos with context  
**Effort**: 2 min per video  
**Output**: Video embed in guides/pages

### 5️⃣ Images (Media Assets)
**Goal**: Upload and tag photos/artwork  
**Effort**: 1 min per image  
**Output**: Website images (lazy-loaded)

---

## ⚙️ Workflow States

Every piece of content flows through states:

```
┌─────────────────────────────────────────────┐
│                   DRAFT                      │
│     (Only visible to you, not on site)      │
│                                              │
│              Edit, review, test             │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│                   REVIEW                     │
│     (Marked for editor approval, locked)    │
│                                              │
│            Wait for admin sign-off          │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│                PUBLISHED                     │
│        (Live on website, visible to all)    │
│                                              │
│             Cache clear in 2-5 min          │
└─────────────────────────────────────────────┘
```

---

## 📚 Complete Console Entry Workflow

### Phase 1: Gather Information (10 min)

Before creating in Directus, collect:
- **Console name**: "Nintendo 64"
- **Slug**: "nintendo-64" (URL-safe, lowercase, hyphens)
- **Manufacturer**: "Nintendo"
- **Release year**: 1996
- **Tier**: S (top), A (popular), B (niche)
- **Short description**: 50-100 word overview
- **Technical level**: 1-5 (1=easy, 5=expert)
- **Primary persona**: Who will read most? (See personas below)

**Personas**:
1. **nostalgic-gamer** — Wants to relive childhood, story-driven
2. **casual-buyer** — Price-conscious, wants easiest option
3. **collector** — Wants completeness, rarity info
4. **technical-enthusiast** — Wants specs, modding, optimization
5. **budget-conscious** — Wants value for money, alternatives

**Tier Decision**:
- **S**: Released within 5 years, 1M+ units sold, broad appeal (PS2, Switch, PS4)
- **A**: Released within 10 years, 100K+ units sold, moderate appeal (PS3, Xbox 360)
- **B**: Niche systems, 10K+ units sold, specialty interest (Sega Dreamcast, 3DO)

### Phase 2: Create Draft in Directus (15 min)

**Step 1: Go to Collections → Consoles**
```
URL: https://[your-project].directus.app/admin/content/consoles
```

**Step 2: Click "+ Create" button**

**Step 3: Fill in fields**
```
┌──────────────────────────────────────────┐
│ CONSOLE CREATION FORM                    │
├──────────────────────────────────────────┤
│                                          │
│ Slug *                                   │
│ [__________ nintendo-64 ________]        │
│                                          │
│ Name *                                   │
│ [__________ Nintendo 64 ________]        │
│                                          │
│ Tier *                                   │
│ [Select...▼]  → Choose "S"               │
│                                          │
│ Release Year                             │
│ [__________ 1996 ________]               │
│                                          │
│ Manufacturer                             │
│ [__________ Nintendo ________]           │
│                                          │
│ Description Short                        │
│ [________________                        │
│  Nintendo 64 was the third home         │
│  console released by Nintendo...        │
│  ________________________________________]│
│                                          │
│ SEO Title                                │
│ [__________ Nintendo 64 - RetroGames _] │
│                                          │
│ SEO Meta                                 │
│ [__________ Buy Nintendo 64 online... _]│
│                                          │
│ Persona Primary *                        │
│ [Select...▼]  → Choose "nostalgic-gamer"│
│                                          │
│ Technical Level                          │
│ [___3___]  (Slider: 1-5)                 │
│                                          │
│ Status *                                 │
│ [Select...▼]  → Choose "draft"          │
│                                          │
│ [    Save    ] [    Cancel    ]         │
└──────────────────────────────────────────┘
```

**Step 4: Click Save**
- Entry created as DRAFT
- Only you can see it
- No changes to website yet

### Phase 3: Test Draft (5 min)

**Step 1: Visit website**
```
https://jeux-video-occasion.com
```

**Step 2: Look for Nintendo 64**
- Should NOT appear (draft, hidden)

**Step 3: Check content accuracy**
- Is slug correct? (used in URL)
- Is name spelled correctly?
- Is description accurate?

**Step 4: Make edits if needed**
- Click entry in Directus
- Edit fields
- Click Save
- Repeat test

### Phase 4: Publish (2 min)

**When ready to go live**:
1. Open draft entry
2. Find **Status** field (bottom)
3. Click dropdown: **draft** → **published**
4. Click **Save**

**What happens**:
- Entry published immediately
- Website cache clears (2-5 min)
- Entry visible on website

### Phase 5: Verify Live (2 min)

**Step 1: Wait 2-5 min**
- Cache clearing happens automatically

**Step 2: Hard refresh website**
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**Step 3: Verify console appears**
- Search for Nintendo 64
- Click console link
- Verify details display correctly

✅ **Console live!**

---

## 📖 Complete Guide Workflow

**Guides are longer** (2-3 hours work), but same workflow.

### Phase 1: Plan Content (30 min)

**Decide**:
- Which console? (Nintendo 64)
- What guide type?
  - **setup**: How to connect, power on, initial setup
  - **maintenance**: Cleaning, repairs, preservation
  - **game-recs**: Best games, what to buy
- Who's the audience?
  - novice = nostalgic-gamer, casual-buyer
  - intermediate = collector, budget-conscious
  - expert = technical-enthusiast

### Phase 2: Write V1 (Novice) (45 min)

**Use SIMPLE language**:
- Short sentences
- Few technical terms
- Lots of visuals (reference images)
- Clear steps

**V1 Template**:
```markdown
# Nintendo 64 Setup Guide

## What You Need
- Nintendo 64 console
- Power cable
- Video cable
- Controller(s)

## Step 1: Connect Power
1. Find power cable
2. Plug into console back
3. Plug outlet into wall

[IMAGE: N64 power connection]

## Step 2: Connect Video
1. Take video cable
2. Plug AV side into console
3. Plug yellow (video) into TV
4. Plug white (sound) into TV

[IMAGE: N64 video cable]

## Step 3: Turn On
1. Press power button (red)
2. Wait for Nintendo logo
3. Insert game cartridge
4. Press power button on controller

## Troubleshooting
**No picture?**
- Try different TV input
- Check cable connections

**No sound?**
- Check TV volume
- Check cable connections
```

### Phase 3: Write V2 (Intermediate) (60 min)

**Add technical details**:
- Specifications (processor, RAM)
- Common issues & fixes
- Optional upgrades
- Performance tips

**V2 Template** (extends V1):
```markdown
# Nintendo 64 Setup & Maintenance

## Technical Specs
- **Processor**: MIPS R4300 @ 93.75 MHz
- **RAM**: 4 MB SDRAM
- **Storage**: Cartridge-based (4-64 MB)
- **Resolution**: 320×240 to 640×480 pixels
- **Controller**: Unique three-pronged design

## Advanced Setup
1. Use RGB cable (better quality than AV)
2. Consider composite vs. S-video
3. Test with original cartridge first

## Maintenance
### Cleaning Cartridges
1. Use isopropyl alcohol (99%) on cotton swab
2. Gently clean metal contacts
3. Let dry 5 minutes before use

### Console Cleaning
1. Use compressed air for dust
2. Avoid water near electronics
3. Clean monthly if heavy use

## Optional Upgrades
- **RGB Amp**: Better video quality
- **Composite Cable**: Standard option
- **Wireless Controller**: Modern alternative

## Troubleshooting
**Cartridge read errors?**
- Clean cartridge contacts
- Try different cartridge
- Check console connections

**Flickering video?**
- Try different video cable
- Use RGB instead of composite
```

### Phase 4: Write V3 (Expert) (60 min)

**Deep technical dive**:
- Emulation comparison
- Modding capabilities
- Overclocking info
- Market analysis

**V3 Template** (advanced):
```markdown
# Nintendo 64 Complete Technical Guide

## Architecture Deep Dive
### Graphics Processing
- RSP (Reality Signal Processor) handles 3D rendering
- SGI Graphics Library software
- Z-buffer supports complex scenes
- 16-bit color depth (5-bit per channel)

### CPU & Memory
- Custom MIPS R4300i @ 93.75 MHz
- 4 MB RDRAM (expensive at launch)
- Cartridge bus bandwidth limiting

### Comparison to Competitors
| System | CPU | RAM | Graphics |
|--------|-----|-----|----------|
| N64 | 93.75 MHz | 4 MB | RCP |
| PS1 | 33 MHz | 2 MB | GPU |
| Sega Saturn | 28.6 MHz | 2 MB | VDP1/2 |

## Modding & Modification
### ROM Hacking
- Use hex editor to modify game ROMs
- Tools: Lunar Magic, TASEdit, Nemu64
- Common mods: texture packs, level editors

### Hardware Mods
- Composite-to-RGB adapter
- Flash cartridge (play ROM files)
- Overclocking: risks vs. benefits

### Emulation Analysis
- Emulators: Mupen64Plus, Project64
- Accuracy: TASBot, cycle-accurate emulation
- Performance: Modern hardware needed

## Market & Rarity Analysis
- Original price: $199 (1996)
- Current value: $150-400 (depends on condition)
- Rare cartridges: $1000+
- Grading: AKA Grading (CGC, VGA)

## Advanced Preservation
- Cartridge longevity: 50+ years (stable)
- Thermal concerns: Minimal
- Backup strategies: Game copying legal issues
```

### Phase 5: Create in Directus (30 min)

**Step 1: Collections → Guides**
**Step 2: Click "+ Create"**
**Step 3: Fill form**:
```
Slug: nintendo-64-setup
Title: Nintendo 64 Setup Guide
Guide Type: setup
Console ID: [Search & select N64]
Description: Complete setup and maintenance guide
Content V1: [Paste novice version]
Content V2: [Paste intermediate version]
Content V3: [Paste expert version]
Persona Primary: nostalgic-gamer
Technical Level: 3
Status: draft
```

**Step 4: Save**

### Phase 6: Test All 3 Versions (30 min)

**On website**:
1. Go to Nintendo 64 console page
2. Look for "Choose your level" selector
3. Test **Beginner** (V1):
   - Should show novice content
   - Short, simple language
   - Images visible
4. Test **Intermediate** (V2):
   - Should show detailed content
   - Technical specs present
   - Troubleshooting expanded
5. Test **Advanced** (V3):
   - Should show expert content
   - Deep technical info
   - Rare/market info present

**If issues**:
- Go back to Directus
- Edit content
- Save & refresh website

### Phase 7: Publish (2 min)

**Ready to go live**:
1. Open guide in Directus
2. Status: **draft** → **published**
3. Click Save
4. Wait 2-5 min
5. Hard refresh website
6. Verify all 3 versions work

✅ **Guide live!**

---

## 📋 Quick Reference Checklist

### Before Publishing Content
- [ ] All required fields filled
- [ ] Spelling & grammar checked
- [ ] Images/videos added
- [ ] Links tested
- [ ] SEO title & description present
- [ ] Persona selected correctly
- [ ] Status ready to change to "published"
- [ ] Tested on website (if possible)

### After Publishing
- [ ] Website cache cleared (2-5 min)
- [ ] Hard refresh (Cmd+Shift+R)
- [ ] Content visible on site
- [ ] All links working
- [ ] Images loading
- [ ] No error messages

---

## 🆘 Common Issues & Fixes

| Problem | Cause | Solution |
|---------|-------|----------|
| Content not showing | Status still "draft" | Change Status → published |
| Old content showing | Browser cache | Hard refresh (Cmd+Shift+R) |
| Image won't upload | File too large | Reduce to < 10 MB |
| Rich text not saving | Browser issue | Try different browser |
| Console link broken | Wrong console_id | Re-select console in guide |
| Video not playing | Wrong URL format | Use embed URL (youtube.com/embed/) |

---

**Questions?** See [ADMIN_DIRECTUS_SETUP.md](ADMIN_DIRECTUS_SETUP.md) for detailed collection info.
