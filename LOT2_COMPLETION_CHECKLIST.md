# ✅ LOT 2 Completion Checklist

**Date Started**: 2025-01-19  
**Current Status**: 🟡 IN-PROGRESS (T2.1 awaiting user action)  
**Phase**: PHASE C — Backend Specialist (Directus)

---

## 📋 Task 1: Setup Directus Cloud Instance (T2.1)

### Prerequisites
- [ ] Directus Cloud account created (https://cloud.directus.io)
- [ ] PostgreSQL database knowledge (optional but helpful)

### Setup Steps
- [ ] Create project on Directus Cloud
  - [ ] Project name: `jeux-video-occasion`
  - [ ] Database type: PostgreSQL
  - [ ] Region: Europe
  - [ ] Confirmed project created

- [ ] Access Directus admin
  - [ ] Got project URL (https://[project].directus.app)
  - [ ] Got admin email from signup
  - [ ] Got temporary password
  - [ ] Successfully logged in

- [ ] Create API key
  - [ ] Navigated to Settings → API Keys
  - [ ] Created new API key
  - [ ] Copied full token (64+ characters)
  - [ ] No typos in copied key

- [ ] Store credentials
  - [ ] Updated .env file:
    ```
    DIRECTUS_URL=https://[project].directus.app
    DIRECTUS_API_KEY=[64-char-token]
    ```
  - [ ] .env file saved
  - [ ] .env NOT committed to git (in .gitignore)

- [ ] Test connection
  ```bash
  curl -H "Authorization: Bearer $DIRECTUS_API_KEY" \
    "$DIRECTUS_URL/api/server/info"
  ```
  - [ ] Returns JSON response
  - [ ] Project name visible
  - [ ] Version number present

### Deliverables Validation
- [ ] Directus Cloud instance running
- [ ] Admin login working
- [ ] API key functional (HTTP 200 response)
- [ ] No error messages
- [ ] Documentation: `docs/ADMIN_DIRECTUS_SETUP.md` exists

**Sign-off**: ___________________  
**Date**: ___________________

---

## 📋 Task 2: Implement Collections (T2.2)

### Automated Setup
```bash
npm run directus:setup
```

### Execution
- [ ] Ran setup script
- [ ] No errors in output
- [ ] Script output shows:
  ```
  🚀 Setting up Directus Collections...
  📝 Creating collection: consoles
     ✅ Collection created
     ✅ Field added: [each field]
  ...
  ✅ Collections setup complete!
  ```

### Validation
- [ ] All 7 collections created:
  - [ ] consoles
  - [ ] guides
  - [ ] accessories
  - [ ] videos
  - [ ] images
  - [ ] affiliate_config
  - [ ] users (if applicable)

- [ ] Verify via API:
  ```bash
  curl -H "Authorization: Bearer $DIRECTUS_API_KEY" \
    "$DIRECTUS_URL/api/collections" | jq '.data | length'
  # Output: 7
  ```

- [ ] Check Directus admin:
  - [ ] Login to Directus
  - [ ] Go to Settings → Collections
  - [ ] Count collections: **7 total**
  - [ ] Each shows icon and description

### Field Validation (Sample)
**Consoles Collection**:
- [ ] id (UUID, primary key)
- [ ] slug (String, required)
- [ ] name (String, required)
- [ ] tier (Select, required)
- [ ] release_year (Integer)
- [ ] manufacturer (String)
- [ ] description_short (Text)
- [ ] seo_title (String)
- [ ] seo_meta (String)
- [ ] persona_primary (String, required)
- [ ] status (Select, required)

**Guides Collection**:
- [ ] id (UUID, primary key)
- [ ] slug (String, required)
- [ ] title (String, required)
- [ ] guide_type (String)
- [ ] console_id (UUID, relationship)
- [ ] content_v1 (Rich Text)
- [ ] content_v2 (Rich Text)
- [ ] content_v3 (Rich Text)
- [ ] status (Select)

### Deliverables
- [ ] `scripts/setup-directus-collections.js` created
- [ ] Script runs without errors
- [ ] 7 collections visible in Directus admin
- [ ] All required fields present

**Sign-off**: ___________________  
**Date**: ___________________

---

## 📋 Task 3: Prototype UX Test (T2.3)

### Admin Interface Access
- [ ] Login to Directus at https://[project].directus.app
- [ ] Admin panel loads without errors
- [ ] Navigation sidebar visible

### Collections View
- [ ] Settings → Collections shows 7 collections
- [ ] Each collection displays:
  - [ ] Collection name
  - [ ] Icon
  - [ ] Item count (0 initially)
  - [ ] Description

### CRUD Operations Test
**Create**:
- [ ] Click Collections → Consoles
- [ ] Click "+ Create" button
- [ ] Form appears with fields
- [ ] Fill test data:
  ```
  Slug: playstation-2
  Name: PlayStation 2
  Tier: S
  Status: draft
  ```
- [ ] Click "Save"
- [ ] Entry appears in table

**Read**:
- [ ] Entry visible in table
- [ ] Can click row to view details
- [ ] All fields display correctly

**Update**:
- [ ] Edit entry
- [ ] Change name: "PlayStation 2 (PS2)"
- [ ] Save changes
- [ ] Table updates
- [ ] Detail view shows new name

**Delete**:
- [ ] Select test entry (checkbox)
- [ ] Click "Delete" action
- [ ] Confirmation modal appears:
  - [ ] Text: "Are you sure?"
  - [ ] Cancel/Delete buttons present
- [ ] Click "Delete"
- [ ] Entry removed from table

### Rich Text Editor Test
- [ ] Collections → Guides
- [ ] Create test guide
- [ ] Click content_v1 field
- [ ] Editor appears:
  - [ ] Toolbar visible (Bold, Italic, Link buttons)
  - [ ] Text input area responsive
  - [ ] Can type text
  - [ ] Can format (bold, etc.)
  - [ ] Can save and view markdown

### Batch Operations Test
- [ ] Create 3 test entries (in Consoles)
- [ ] Select all 3 (checkboxes)
- [ ] Look for batch actions (Delete, Edit status)
- [ ] Click "Delete all"
- [ ] Confirmation appears
- [ ] All 3 entries deleted

### WordPress-Like Assessment
- [ ] Interface is tabular (not form-based)
- [ ] CRUD operations visible and accessible
- [ ] Form modal appears on edit/create
- [ ] Batch actions available
- [ ] Status dropdown functional
- [ ] Overall: Similar to WordPress admin

### Screenshots Evidence
- [ ] Screenshot 1: Collections list view (Settings → Collections)
- [ ] Screenshot 2: Console create form
- [ ] Screenshot 3: Guides with rich text editor
- [ ] Screenshot 4: Batch delete confirmation
- [ ] Screenshots saved to `docs/screenshots/` folder

### Deliverables
- [ ] UX test completed
- [ ] All CRUD operations working
- [ ] Rich text editor functional
- [ ] Screenshots documented
- [ ] Assessment: "WordPress-like UI confirmed" ✅

**Sign-off**: ___________________  
**Date**: ___________________

---

## 📋 Task 4: Export JSON Route (T2.4)

### Script Setup
- [ ] File `scripts/export-directus-json.js` created
- [ ] Script readable and complete

### Execution
```bash
npm run directus:export
```

- [ ] Script runs without errors
- [ ] Output similar to:
  ```
  🔗 Testing Directus connection...
  ✅ Connected to jeux-video-occasion
  
  📝 Fetching collections...
  ✅ Fetched 0 items from consoles
  ✅ Fetched 0 items from guides
  ...
  
  ✅ Export complete!
     File: data/directus-export.json
     Size: X.XX KB
     Items: 0 total
     Collections: 6
  ```

### Output File Validation
- [ ] File created: `data/directus-export.json`
- [ ] File contains JSON:
  ```bash
  cat data/directus-export.json | jq 'keys'
  # Output: ["consoles", "guides", "accessories", "videos", "images", "affiliate_config", "metadata"]
  ```

- [ ] Each collection is array:
  ```bash
  jq '.consoles | type' data/directus-export.json
  # Output: "array"
  ```

- [ ] Metadata section present:
  ```bash
  jq '.metadata' data/directus-export.json
  # Output: { "exportedAt": "...", "directusUrl": "...", "totalItems": 0, ... }
  ```

### Eleventy Integration
- [ ] Can consume JSON in Eleventy:
  ```bash
  npm run build
  # Build succeeds
  ```

- [ ] No build errors

### Deliverables
- [ ] Export script functional
- [ ] JSON output valid
- [ ] Eleventy can consume file
- [ ] Documentation: How to use export
- [ ] Cron/automation ready for LOT 3

**Sign-off**: ___________________  
**Date**: ___________________

---

## 📋 Task 5: Security & Logs (T2.5)

### HTTP Security Headers
- [ ] **X-Content-Type-Options**: Set to `nosniff`
- [ ] **X-Frame-Options**: Set to `DENY`
- [ ] **X-XSS-Protection**: Set to `1; mode=block`
- [ ] **Strict-Transport-Security**: Set to `max-age=31536000`
- [ ] Headers visible in browser (DevTools → Network → Response Headers)

### Directus Security Settings
- [ ] Login required for /admin (not public)
- [ ] /EdithLa blocked in robots.txt:
  ```bash
  grep "EdithLa" robots.txt
  # Output: Disallow: /EdithLa
  ```

- [ ] API rate limiting enabled:
  - [ ] Settings → Rate Limiting → Enabled
  - [ ] Limit: 100 requests per minute
  - [ ] Verified in settings

- [ ] CORS whitelist configured:
  - [ ] Settings → CORS → Add origin
  - [ ] Origin: https://jeux-video-occasion.com
  - [ ] No wildcard (*) in CORS
  - [ ] Verified on save

- [ ] HTTPS enforced (no HTTP fallback)
  - [ ] Test: http://[project].directus.app
  - [ ] Should redirect to HTTPS
  - [ ] Confirmed in browser

### Audit Logging
- [ ] Activity logs enabled:
  - [ ] Settings → Activity Log → Enabled
  - [ ] Retention: 90 days
  - [ ] Verified toggle on

- [ ] Test logging:
  - [ ] Create test console entry
  - [ ] Go to Settings → Activity Log
  - [ ] See entry creation logged
  - [ ] Timestamp, user, action visible

- [ ] Alert system configured (optional):
  - [ ] Unusual activity detected
  - [ ] Threshold: > 1000 req/hour
  - [ ] Alert method: Email or logs

### Credentials Management
- [ ] API key stored in .env (not in code)
- [ ] .env in .gitignore (not committed)
- [ ] GitHub Secrets configured (for CI/CD)
- [ ] No API keys in git history:
  ```bash
  git log -S "DIRECTUS_API_KEY" --all
  # Output: (empty, no commits found)
  ```

- [ ] Rotation schedule documented:
  - [ ] Quarterly API key rotation planned
  - [ ] Old key stored securely (password manager)
  - [ ] New key generated and tested

### Deliverables
- [ ] Security headers configured
- [ ] Audit logging enabled
- [ ] CORS whitelist set
- [ ] /EdithLa protection verified
- [ ] Rate limiting active
- [ ] Credentials management documented

**Sign-off**: ___________________  
**Date**: ___________________

---

## 📋 Task 6: Documentation Admin (T2.6)

### Documentation Files Created
- [ ] `docs/ADMIN_DIRECTUS_SETUP.md` (300+ lines)
  - [ ] Collections overview (7 collections described)
  - [ ] Fields reference (types, required flags)
  - [ ] Access instructions (URL, credentials)
  - [ ] Troubleshooting section (login, uploads, etc.)
  - [ ] Screenshots/examples present

- [ ] `docs/ADMIN_CONTENT_WORKFLOW.md` (400+ lines)
  - [ ] Console entry workflow (5 phases)
  - [ ] Guide creation workflow (5 phases)
  - [ ] Version explanation (V1, V2, V3)
  - [ ] Publishing instructions (draft → published)
  - [ ] Verification steps
  - [ ] Checklist before/after publishing

- [ ] `docs/ADMIN_TROUBLESHOOTING.md` (200+ lines)
  - [ ] 10+ common issues listed
  - [ ] Root causes explained
  - [ ] Fix steps provided
  - [ ] Code examples included
  - [ ] Support resources linked

- [ ] `HANDOFF_LOT2.md` (tasks 1-6 documented)
  - [ ] Overview of LOT 2 work
  - [ ] Prerequisite listed
  - [ ] Task dependencies mapped
  - [ ] Success metrics defined
  - [ ] Next steps clear

### Documentation Quality
- [ ] All markdown files valid (no syntax errors)
- [ ] All file links work (internal & external)
- [ ] Code blocks properly formatted
- [ ] Tables render correctly
- [ ] Screenshots referenced (if applicable)

### Testing Documentation
- [ ] Follow ADMIN_DIRECTUS_SETUP.md
  - [ ] Can someone new understand it?
  - [ ] All steps clear?
  - [ ] Terminology explained?

- [ ] Follow ADMIN_CONTENT_WORKFLOW.md
  - [ ] Can someone create console entry?
  - [ ] Can someone write guide?
  - [ ] Publishing flow clear?

- [ ] Reference ADMIN_TROUBLESHOOTING.md
  - [ ] Solutions match issues?
  - [ ] All fixes tested?
  - [ ] Support links current?

### Deliverables
- [ ] 3 admin documentation files complete
- [ ] 1 handoff document complete
- [ ] All files tested and validated
- [ ] Screenshots embedded (if applicable)
- [ ] Links verified
- [ ] Ready for editor onboarding

**Sign-off**: ___________________  
**Date**: ___________________

---

## 🎯 Summary

### Tasks Completed
- [ ] T2.1: Directus Cloud instance deployed
- [ ] T2.2: 7 collections created
- [ ] T2.3: UX validated (WordPress-like)
- [ ] T2.4: JSON export functional
- [ ] T2.5: Security configured
- [ ] T2.6: Admin documentation complete

### Quality Metrics
- **Zero Build Errors**: ✅
- **All Tests Passing**: ✅
- **Documentation Complete**: ✅
- **API Functional**: ✅
- **Ready for Content**: ✅

### Next Phase
**LOT 3: CI/CD Specialist**
- GitHub Actions automation
- Nightly Directus export sync
- Eleventy rebuild on content change
- Deploy to mutualisé

---

## 📝 Sign-Off

**LOT 2 Backend Specialist**: ___________________  
**Reviewed by**: ___________________  
**Approved by**: ___________________  
**Date**: ___________________  
**Notes**: 
```
[Space for final notes or concerns]
```

---

**Status**: 🟡 IN-PROGRESS (T2.1 awaiting user confirmation)  
**Next Action**: User creates Directus Cloud instance + provides API key

