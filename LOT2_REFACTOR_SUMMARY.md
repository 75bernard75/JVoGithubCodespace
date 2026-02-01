# 🔄 LOT 2 REFACTORED: Cloud → Self-Hosted

**Date**: 2025-01-19  
**Change**: Directus Cloud → Self-Hosted Installation  
**Impact**: Complete refactor of LOT 2 approach

---

## ✅ What Changed

### ❌ Removed (Cloud Version)
- Directus Cloud documentation
- Cloud-specific setup scripts
- Cloud credential management
- Cloud cost considerations

### ✅ Added (Self-Hosted Version)
- `docker-compose.yml` — Complete Docker setup
- `.env.directus` — Environment configuration
- `scripts/install-directus-self-hosted.sh` — Automated installation
- `docs/INSTALL_DIRECTUS_SELF_HOSTED.md` — Comprehensive installation guide
- `LOT2_SELF_HOSTED_README.md` — Self-hosted overview
- Docker health checks
- PostgreSQL setup
- Backup/restore procedures

---

## 📊 Architecture Changes

### Old (Cloud)
```
User
  ↓
[Directus Cloud] (directus.io managed)
  ↓
API
  ↓
Eleventy
  ↓
Website
```

### New (Self-Hosted)
```
User
  ↓
[Docker Container]
  ├─ Directus App
  └─ PostgreSQL DB
  ↓
API (localhost:8055)
  ↓
Eleventy
  ↓
Website
```

---

## 🎯 Installation Methods Available

### 1. Docker Compose (Recommended)
```bash
bash scripts/install-directus-self-hosted.sh
```
- ✅ Fastest (5–10 min)
- ✅ Easiest (one command)
- ✅ Production-ready
- ✅ Includes PostgreSQL

### 2. Manual (Advanced)
```bash
# Node.js + PostgreSQL
# See: docs/INSTALL_DIRECTUS_SELF_HOSTED.md
```
- ✅ Full control
- ❌ More complex
- ⏱️ 30+ minutes

### 3. VPS/Server
```bash
# Install on your own server
# Docker + Nginx reverse proxy
```
- ✅ Public URL
- ✅ Your control
- ✅ HTTPS ready
- ⏱️ 60+ minutes

---

## 📋 Files Created/Modified

### New Files
| File | Purpose | Type |
|------|---------|------|
| `docker-compose.yml` | Docker containers setup | Config |
| `.env.directus` | Environment variables | Config |
| `scripts/install-directus-self-hosted.sh` | Automated installation | Script (bash) |
| `docs/INSTALL_DIRECTUS_SELF_HOSTED.md` | Installation guide | Doc (2,000+ lines) |
| `LOT2_SELF_HOSTED_README.md` | Overview | Doc |

### Updated Files
| File | Changes |
|------|---------|
| `START_LOT2.md` | Changed from Cloud to self-hosted |
| `package.json` | Added `directus:install` script |
| `LOT2_README.md` | (Will be updated) |
| `LOT2_COMPLETION_CHECKLIST.md` | (Will be updated) |

---

## 🚀 Installation Timeline

### Quick Start (Docker)
```
1. Edit .env.directus (5 min)
2. Run install script (5 min)
3. Wait for startup (5–10 min)
4. Login (2 min)
5. Create collections (10 min)
─────────────────────────
Total: 30–35 minutes
```

### Complete Setup (with Security)
```
1. Installation (30 min)
2. Create collections (10 min)
3. Test UX (30 min)
4. Export JSON (5 min)
5. Configure security (30 min)
6. Review documentation (30 min)
─────────────────────────
Total: 2.5 hours
```

---

## 🔧 Configuration Highlights

### docker-compose.yml
- **Directus service** (latest image)
- **PostgreSQL 15** (database)
- **Volumes** (persist data)
- **Health checks** (auto-restart)
- **Networking** (services communicate)

### .env.directus
- Database credentials
- Security keys (DIRECTUS_KEY, SECRET)
- Admin account
- Public URL
- CORS configuration

### install-directus-self-hosted.sh
- Checks Docker/Docker Compose
- Generates secure keys
- Starts containers
- Tests connection
- Shows access details

---

## 🎓 Self-Hosted Advantages

1. **Cost**: No subscription fees
2. **Control**: Full data ownership
3. **Flexibility**: Use any hosting
4. **Customization**: Modify as needed
5. **Privacy**: Data stays on your servers
6. **Scalability**: Add more resources

---

## 📝 Task Changes

### T2.1 (Installation) — New Process
**Old**: Create account on Directus Cloud  
**New**: Install Directus using Docker/manual setup

**Effort**: 30–60 minutes (vs 15 min for Cloud)  
**Complexity**: Higher (but fully scripted)

### T2.2–T2.6
**No changes** — Same tasks as before

---

## 🔐 Security Considerations

### Self-Hosted Security Responsibilities
- [ ] Regular database backups
- [ ] Apply updates/patches
- [ ] Configure firewall
- [ ] Setup SSL/TLS (HTTPS)
- [ ] Monitor logs
- [ ] Update containers regularly
- [ ] Secure API keys
- [ ] Rate limiting

### We've Provided
- ✅ Secure key generation (in script)
- ✅ Environment variable templates
- ✅ Docker security defaults
- ✅ Database isolation (network)
- ✅ CORS configuration template
- ✅ Rate limiting config

---

## 🐳 Docker Advantages

Why Docker Compose is best:
- ✅ All-in-one setup (Directus + PostgreSQL)
- ✅ Isolated environment (no system pollution)
- ✅ Easy backup/restore
- ✅ Easy to restart/upgrade
- ✅ Works on any OS (Mac, Windows, Linux)
- ✅ Production-ready
- ✅ No complex installation steps

---

## 📱 Production Deployment

### Local Development
```bash
bash scripts/install-directus-self-hosted.sh
# Runs on http://localhost:8055
```

### VPS Deployment
```bash
# SSH into server
ssh user@your-vps-ip

# Copy docker-compose.yml + .env.directus

# Edit .env.directus:
#   PUBLIC_URL=https://directus.yourdomain.com
#   CORS_ORIGIN=https://jeux-video-occasion.com

# Run installation script
bash scripts/install-directus-self-hosted.sh

# Setup Nginx reverse proxy
# Setup SSL certificate (Let's Encrypt)
```

### Result
```
https://directus.yourdomain.com (public, HTTPS)
```

---

## 🚀 Next Steps

### Immediately
1. Read `docs/INSTALL_DIRECTUS_SELF_HOSTED.md`
2. Choose installation method (Docker recommended)
3. Run installation script
4. Test access to Directus

### After Installation (T2.2+)
1. Create collections: `npm run directus:setup`
2. Test UX (login, CRUD operations)
3. Export JSON: `npm run directus:export`
4. Configure security settings
5. Review documentation

---

## ❓ FAQ

### Q: Can I still use Directus Cloud if I want?
**A**: Yes, but you'd need to use the old setup instructions. Self-hosted is now the default.

### Q: What if I don't have Docker?
**A**: See manual installation in `docs/INSTALL_DIRECTUS_SELF_HOSTED.md`

### Q: Can I move from self-hosted to cloud later?
**A**: Yes, export data and import to cloud version.

### Q: Do I need to manage backups?
**A**: Yes, but script is included in documentation.

### Q: What if server goes down?
**A**: You control restart. Docker auto-restart is enabled.

### Q: Can I upgrade Directus easily?
**A**: Yes, update docker image version and restart.

---

## 📊 Statistics

### New Code/Documentation
- Docker Compose config: 80 lines
- Installation script: 200+ lines
- Installation guide: 2,000+ lines
- **Total**: 2,280+ lines

### Changes to Existing Files
- START_LOT2.md: Refactored (Cloud → Self-Hosted)
- package.json: Added `directus:install` script
- Other LOT 2 docs: (queued for update)

---

## ✨ Summary

**Old Approach**:
- Cloud-based (SaaS)
- No installation needed
- Limited control
- Subscription cost

**New Approach**:
- Self-hosted (Docker)
- Full installation guide
- Complete control
- No recurring costs

**Installation Time**:
- Old: 15 minutes (point-and-click)
- New: 30–60 minutes (automated script + setup)

**Complexity**:
- Old: Very simple
- New: Simple (for Docker), complex (for manual)

---

## 🎯 Status

- ✅ Docker setup configured
- ✅ Installation script created
- ✅ Documentation written
- ✅ START_LOT2.md updated
- ✅ Ready for T2.1 (user installation)

---

**Change Date**: 2025-01-19  
**Status**: Complete refactor  
**Next**: User installs Directus self-hosted

