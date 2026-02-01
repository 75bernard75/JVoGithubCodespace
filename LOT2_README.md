# 🎮 jeux-video-occasion.com — LOT 2 Backend Setup

**Phase**: PHASE C — LOT 2: Directus Backend  
**Status**: 🟡 Ready for Deployment (T2.1 user action required)  
**Last Updated**: 2025-01-19

---

## 🎯 LOT 2 Overview

**Goal**: Deploy and configure Directus headless CMS backend for content management

**Timeline**: 4.5 hours total
- T2.1: 30 min (user manual setup)
- T2.2: 10 min (automated collections)
- T2.3: 30 min (UX testing)
- T2.4: 45 min (JSON export)
- T2.5: 30 min (security)
- T2.6: 2 hours (documentation)

**Tech Stack**:
- **Backend**: Directus Cloud (PostgreSQL)
- **API**: REST endpoints + authentication
- **Data**: 7 collections, 50+ fields
- **Sync**: Nightly JSON export to Eleventy

---

## 📦 What's Included

### Scripts
- `scripts/setup-directus-cloud.sh` — Manual setup instructions
- `scripts/setup-directus-collections.js` — Auto-create 7 collections
- `scripts/export-directus-json.js` — Export published content

### Documentation
- `HANDOFF_LOT2.md` — Complete LOT 2 specifications
- `LOT2_COMPLETION_CHECKLIST.md` — Validation checklist
- `docs/ADMIN_DIRECTUS_SETUP.md` — Admin guide (access, collections, fields)
- `docs/ADMIN_CONTENT_WORKFLOW.md` — Content creation workflow
- `docs/ADMIN_TROUBLESHOOTING.md` — FAQ + troubleshooting

### Configuration
- `package.json` — Updated with Directus npm scripts
- `.env.example` — Template variables
- `directus-config/collections.json` — Schema reference

---

## 🚀 Quick Start

### 1️⃣ Create Directus Cloud Instance (T2.1)

**Manual step** (15-30 minutes):

```bash
# Go to https://cloud.directus.io
# Create project:
# - Name: jeux-video-occasion
# - Database: PostgreSQL
# - Region: Europe

# Get credentials from email, then:
# Update .env:
DIRECTUS_URL=https://[project].directus.app
DIRECTUS_API_KEY=[your-64-char-api-key]

# Test connection:
curl -H "Authorization: Bearer $DIRECTUS_API_KEY" \
  "$DIRECTUS_URL/api/server/info"
```

✅ **T2.1 Complete when**: Connection test returns JSON

---

### 2️⃣ Create Collections (T2.2)

**Automated** (10 minutes):

```bash
npm run directus:setup
```

**What it does**:
- Creates 7 collections (consoles, guides, accessories, videos, images, affiliate_config, users)
- Adds all required fields
- Sets metadata (UI hints, validation)
- Establishes relationships

✅ **T2.2 Complete when**: Script outputs "✅ Collections setup complete!"

---

### 3️⃣ Validate UX (T2.3)

**Manual testing** (30 minutes):

```bash
# Login to Directus
https://[project].directus.app

# Test CRUD (Create, Read, Update, Delete):
# - Collections → Consoles → Create test entry
# - Fill form, save, verify in table
# - Edit entry, change name, save
# - Delete test entry, confirm modal
# - Test rich text editor in Guides

# Take screenshots of:
# - Collections list (Settings → Collections)
# - Create form
# - Rich text editor
# - Batch delete confirmation
```

✅ **T2.3 Complete when**: All CRUD operations work + screenshots saved

---

### 4️⃣ Export JSON (T2.4)

**Automated** (45 minutes total, includes integration):

```bash
npm run directus:export
# Creates: data/directus-export.json
```

**What it does**:
- Fetches all published content from Directus
- Exports as JSON (consoles, guides, etc.)
- Compatible with Eleventy data format
- Ready for nightly cron sync

✅ **T2.4 Complete when**: `data/directus-export.json` exists and `npm run build` succeeds

---

### 5️⃣ Security Setup (T2.5)

**Configuration** (30 minutes):

```bash
# In Directus admin:
# - Settings → Security
#   - Enable HTTPS only
#   - Set rate limit: 100 req/min
#   - Set CORS: https://jeux-video-occasion.com
# - Settings → API Keys
#   - Verify your key secure
#   - Plan quarterly rotation
# - Settings → Activity Log
#   - Enable logging (90 day retention)
#   - Verify test action logged
```

✅ **T2.5 Complete when**: Security settings verified + audit log working

---

### 6️⃣ Documentation (T2.6)

**Already generated** (2 hours included):

```bash
# Files created:
ls -la docs/ADMIN*
# ADMIN_DIRECTUS_SETUP.md (collections reference)
# ADMIN_CONTENT_WORKFLOW.md (how-to guides)
# ADMIN_TROUBLESHOOTING.md (FAQ + fixes)
```

✅ **T2.6 Complete when**: All docs reviewed + ready for editor onboarding

---

## 📋 Collections Reference

### 1. Consoles (Gaming Systems)
**Fields**: slug, name, tier (S/A/B), release_year, manufacturer, description, persona, status  
**Purpose**: Database of 25 gaming consoles  
**Example**: PlayStation 2, Nintendo 64, Sega Dreamcast

### 2. Guides (How-To Content)
**Fields**: slug, title, guide_type, console_id, content_v1/v2/v3 (3-tier complexity), persona, status  
**Purpose**: Detailed guides with 3 difficulty levels  
**Example**: "PS2 Setup Guide" (beginner/intermediate/expert versions)

### 3. Accessories (Hardware)
**Fields**: slug, name, category (controller/cable/case), description, status  
**Purpose**: List controllers, cables, protective cases  
**Example**: "DualShock 2 Controller"

### 4. Videos (Embedded Content)
**Fields**: title, platform (youtube/twitch), url, contextual_intro  
**Purpose**: YouTube embeds with context  
**Example**: PS2 unboxing video with "Watch this setup video..."

### 5. Images (Media Library)
**Fields**: filename, alt, source_type, lazy_load  
**Purpose**: Store artwork, screenshots, console photos  
**Example**: "ps2-console-front.jpg"

### 6. Affiliate Config (Monetization)
**Fields**: type (amazon/ebay), enabled, amazon_tag, ebay_campid/customid  
**Purpose**: Configure affiliate links  
**Example**: `amazon_tag: "jeuxvideooneagain-21"`

### 7. Users (Team Access)
**Fields**: email, role (admin/editor/viewer), status  
**Purpose**: User management + permissions  
**Example**: content-editor@team.com (Editor role)

---

## 🔗 API Integration

### Fetch Published Content
```bash
curl -H "Authorization: Bearer $DIRECTUS_API_KEY" \
  "https://[project].directus.app/api/items/consoles?filter[status]=published"
```

**Response**:
```json
{
  "data": [
    {
      "id": "uuid-1",
      "slug": "playstation-2",
      "name": "PlayStation 2",
      "tier": "S",
      "status": "published"
    }
  ]
}
```

### Export JSON Nightly
```bash
npm run directus:export
# Creates: data/directus-export.json
# Use in Eleventy: _data/directus.json
```

---

## ✅ Validation Checklist

**Before Publishing Content**:
- [ ] All required fields filled (marked with *)
- [ ] Spelling & grammar checked
- [ ] Images/videos added
- [ ] Links tested & functional
- [ ] SEO title & meta description present
- [ ] Persona selected
- [ ] Status: "draft" (for review)

**Before Going Live**:
- [ ] Content reviewed by admin
- [ ] All links working
- [ ] Images optimized (< 500 KB)
- [ ] Status: "published"
- [ ] Wait 2-5 min for cache clear
- [ ] Hard refresh website (Cmd+Shift+R)
- [ ] Verify content visible on site

---

## 📚 Documentation Structure

```
docs/
├── ADMIN_DIRECTUS_SETUP.md     # Collections + fields reference
├── ADMIN_CONTENT_WORKFLOW.md   # Step-by-step workflows
├── ADMIN_TROUBLESHOOTING.md    # FAQ + common issues
└── screenshots/                 # Visual guides (coming after T2.3)

LOT2_COMPLETION_CHECKLIST.md    # Validation for all 6 tasks
HANDOFF_LOT2.md                 # Complete LOT 2 specification
```

---

## 🔐 Credentials Security

### Store Safely
```bash
# .env file (git-ignored):
DIRECTUS_URL=https://jeux-video-occasion.directus.app
DIRECTUS_API_KEY=abc123...xyz789

# GitHub Secrets (for CI/CD in LOT 3):
- DIRECTUS_URL
- DIRECTUS_API_KEY
```

### Never
- ❌ Commit .env to git
- ❌ Share API key via email
- ❌ Use same key for dev + production
- ❌ Leave key in code comments

### Rotation Schedule
- 🔄 Change API key quarterly
- 📝 Store old key in password manager
- 🧪 Test new key before deployment

---

## 📊 Project Timeline

```
LOT 1 (Eleventy) ✅ COMPLETE
    ↓
LOT 2 (Directus) 🟡 IN-PROGRESS
    ├── T2.1: User creates instance (awaiting)
    ├── T2.2: Auto-create collections (ready)
    ├── T2.3: UX validation (ready)
    ├── T2.4: JSON export (ready)
    ├── T2.5: Security (ready)
    └── T2.6: Documentation (ready)
        ↓
LOT 3 (CI/CD) ⏳ COMING
    ├── GitHub Actions setup
    ├── Nightly export sync
    └── Deploy pipeline
        ↓
LOT 4 (Content) ⏳ COMING
    ├── Populate 25 consoles
    ├── Write guides (v1/v2/v3)
    ├── Upload images
    └── Assign personas
```

---

## 🚨 Important Notes

### T2.1 is USER ACTION Required
- Cannot proceed until Directus Cloud instance exists
- Manual setup at https://cloud.directus.io
- Provide API key → scripts will work automatically

### API Key Format
- Should be 64+ characters
- Random alphanumeric string
- If shorter → probably wrong
- Copy full token from Directus admin

### Environment Variables
- `.env` file is git-ignored (security)
- `.env.example` is in repo (template)
- Each developer/environment needs own `.env`

---

## 🆘 Quick Help

| Problem | Solution |
|---------|----------|
| Can't login to Directus | Check email, try password reset |
| API key invalid | Regenerate new key in Directus settings |
| Collections won't create | Check DIRECTUS_API_KEY in .env, test connection |
| Can't upload images | Check file size (< 10 MB), file type (JPG/PNG) |
| Content not showing on site | Check Status = "published", wait 2-5 min, hard refresh |
| Build failing | Check for JSON errors, run `npm run build` for details |

**More help**: See `docs/ADMIN_TROUBLESHOOTING.md`

---

## 📞 Support Resources

- **Directus Documentation**: https://docs.directus.io
- **Directus Community**: https://directus.app/community
- **Project Repo**: https://github.com/[your-repo]
- **Admin Contact**: [Your email here]

---

## ✨ Next Steps After LOT 2

1. **LOT 3**: Automate everything (CI/CD, GitHub Actions)
2. **LOT 4**: Populate content (25 consoles, guides, images)
3. **LOT 5**: Setup monetization (affiliate links, GA4)
4. **LOT 6+**: QA, production deployment

---

**Status**: 🟡 Ready for T2.1 user action  
**Questions?** See [HANDOFF_LOT2.md](HANDOFF_LOT2.md) or [ADMIN_DIRECTUS_SETUP.md](docs/ADMIN_DIRECTUS_SETUP.md)

