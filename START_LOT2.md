# 🚀 LOT 2: PHASE C Backend Directus (Self-Hosted)

**Welcome to LOT 2!** This is the **self-hosted** Directus backend phase.

## ⚡ Quick Navigation

### 📖 Read These First
1. **[INSTALL_DIRECTUS_SELF_HOSTED.md](docs/INSTALL_DIRECTUS_SELF_HOSTED.md)** ← Start here (10 min)
   - Installation options (Docker, manual, VPS)
   - Step-by-step setup
   - Production configuration

2. **[LOT2_README.md](LOT2_README.md)** ← Overview (5 min)
   - Overview of 6 tasks (T2.1–T2.6)
   - Collections summary
   - Architecture flow

3. **[LOT2_COMPLETION_CHECKLIST.md](LOT2_COMPLETION_CHECKLIST.md)** ← Validation (during work)
   - Checklist for each task
   - Sign-off section
   - Quality gates

### 📚 Admin Guides (After T2.2)
- **[ADMIN_DIRECTUS_SETUP.md](docs/ADMIN_DIRECTUS_SETUP.md)**
  - Collections reference (slug, name, tier, etc.)
  - Fields overview
  - Screenshots + examples

- **[ADMIN_CONTENT_WORKFLOW.md](docs/ADMIN_CONTENT_WORKFLOW.md)**
  - How to create a console
  - How to write a guide (v1/v2/v3)
  - Publishing workflow

- **[ADMIN_TROUBLESHOOTING.md](docs/ADMIN_TROUBLESHOOTING.md)**
  - Common problems + fixes
  - FAQ items
  - Support resources

---

## 🎯 Your Mission (Right Now)

### Step 1: Install Directus Self-Hosted (T2.1)
**Status**: 🟡 **USER ACTION REQUIRED** (30–60 minutes)

```bash
# Option A: Docker (Easiest)
chmod +x scripts/install-directus-self-hosted.sh
bash scripts/install-directus-self-hosted.sh

# Option B: Manual (Advanced)
# See: docs/INSTALL_DIRECTUS_SELF_HOSTED.md
```

**After installation**:
```bash
# Test connection:
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "http://localhost:8055/server/info"

# Should return JSON with version info
```

✅ **When you can login → T2.1 COMPLETE**

---

### Step 2: Once T2.1 is Done, Run This
```bash
npm run directus:setup    # T2.2 (10 min) — Creates 7 collections
```

✅ **When output shows "✅ Collections setup complete!" → T2.2 DONE**

---

### Step 3: Verify UX (Manual Testing)
**Status**: 🟡 **30 minutes**, then we move on

1. Login to Directus: `http://localhost:8055` (or your URL)
2. Test Create + Edit + Delete a console
3. Check rich text editor in Guides
4. Take screenshots
5. Confirm "WordPress-like" UI ✅

---

### Step 4: Export & Security
Once T2.1-T2.3 done:

```bash
npm run directus:export   # T2.4 — JSON export
# T2.5 — Security checks (configure in Directus admin)
# T2.6 — Docs review (already prepared)
```

---

## 📋 Six Tasks in LOT 2

| # | Task | Time | Status | Your Action |
|---|------|------|--------|-------------|
| T2.1 | Install Directus Self-Hosted | 60 min | 🟡 **NOW** | Run install script (Docker) |
| T2.2 | Create Collections | 10 min | ⏳ Ready | `npm run directus:setup` |
| T2.3 | UX Validation | 30 min | ⏳ Ready | Login, test CRUD |
| T2.4 | JSON Export | 5 min | ⏳ Ready | `npm run directus:export` |
| T2.5 | Security Setup | 30 min | ⏳ Ready | Configure in admin |
| T2.6 | Documentation | 0 min | ✅ Ready | Review (already done) |

**Total**: 2.5 hours (mostly automated after T2.1)

---

## 🎓 What You Need to Know

### Self-Hosted vs Cloud
- **Self-Hosted**: You install & manage
- **Free**: No subscription fees
- **Control**: Full control of data & servers
- **Flexible**: Can use any hosting provider
- **Responsibility**: You maintain backups, security, updates

### Collections (What You're Creating)
- **Consoles** — List of 25 gaming systems (PS2, N64, etc.)
- **Guides** — How-to articles with 3 difficulty levels
- **Accessories** — Controllers, cables, cases
- **Videos** — YouTube embeds with context
- **Images** — Photos, artwork, screenshots
- **Affiliate Config** — Amazon + eBay settings
- **Users** — Team member access control

### Why This Matters
- Self-hosted = full control + no subscription
- Separates **content** (Directus) from **website** (Eleventy)
- Editors use Directus (no coding)
- Website pulls data daily (pure HTML)
- Perfect for scaling content

---

## 🔐 Security Checklist

**Before Installation**:
- [ ] Docker installed (or Node.js + PostgreSQL)
- [ ] .env.directus file created
- [ ] Generated secure keys (DIRECTUS_KEY, DIRECTUS_SECRET)
- [ ] Port 8055 available (or changed)

**After Installation**:
- [ ] Can login to Directus
- [ ] API key created
- [ ] CORS configured (for your website domain)
- [ ] Rate limiting enabled (100 req/min)
- [ ] Backups setup (database snapshots)

---

## ✅ Success Looks Like

### After T2.1
```
✅ Directus running (http://localhost:8055)
✅ Can login with admin credentials
✅ PostgreSQL database initialized
✅ API responding to requests
```

### After T2.2
```
✅ 7 collections visible
✅ 50+ fields configured
✅ No errors in script output
```

### After T2.3
```
✅ Can create console entry
✅ Can edit existing entry
✅ Can delete entry
✅ Rich text editor works
✅ UI feels WordPress-like
```

### After T2.4
```
✅ data/directus-export.json exists
✅ File contains valid JSON
✅ npm run build succeeds
```

### After T2.5
```
✅ CORS whitelist configured
✅ Rate limiting active
✅ Audit logs enabled
✅ HTTPS setup (production)
```

### After T2.6
```
✅ 3 admin guides reviewed
✅ Installation documented
✅ Ready for team onboarding
```

---

## 📞 Help

**For Installation Issues**:
- See: [INSTALL_DIRECTUS_SELF_HOSTED.md](docs/INSTALL_DIRECTUS_SELF_HOSTED.md)
- Docker problems: Check `docker-compose logs`
- Database issues: Check PostgreSQL health

**For Admin Questions**:
- See: [ADMIN_DIRECTUS_SETUP.md](docs/ADMIN_DIRECTUS_SETUP.md)
- See: [ADMIN_TROUBLESHOOTING.md](docs/ADMIN_TROUBLESHOOTING.md)

---

## 🚀 Let's Go!

### Next Action (Right Now):

1. **Read installation guide**
   ```
   docs/INSTALL_DIRECTUS_SELF_HOSTED.md
   ```

2. **Choose installation method**
   - Option A (Docker Compose) — Easiest
   - Option B (Manual) — More control
   - Option C (VPS) — Production

3. **Run installation**
   ```bash
   bash scripts/install-directus-self-hosted.sh
   # Or follow manual steps in docs
   ```

4. **Create collections**
   ```bash
   npm run directus:setup
   ```

5. **Confirm when ready** ← Message us then!

---

**Status**: 🟡 Ready for T2.1 user action  
**Estimated Time to LOT 2 Complete**: 2.5 hours (after installation)  
**Next Phase**: LOT 3 (CI/CD automation)

