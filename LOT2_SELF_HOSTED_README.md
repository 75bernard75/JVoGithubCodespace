# 🖥️ LOT 2: Self-Hosted Directus Backend

**For**: jeux-video-occasion.com (Rétro Gaming Affiliation)  
**Status**: 🟡 Ready for T2.1 (user installation)  
**Type**: Self-hosted (your own server or VPS)  
**Last Updated**: 2025-01-19

---

## 📊 What Changed (vs Cloud Version)

| Aspect | Cloud | Self-Hosted |
|--------|-------|------------|
| **Installation** | Point-and-click (browser) | Docker or manual |
| **Cost** | Free tier + paid | Free (self-manage server cost) |
| **Maintenance** | Directus handles | You handle |
| **Control** | Limited | Full |
| **Data** | Directus servers | Your server |
| **Backups** | Auto (Directus) | You manage |
| **Scalability** | Pay for more | Add more servers |
| **Setup Time** | 5 min | 30–60 min |

---

## 🚀 Installation Options

### Option 1️⃣: Docker Compose (Easiest)
```bash
# Single command installation
bash scripts/install-directus-self-hosted.sh
```
- ✅ Includes PostgreSQL
- ✅ Auto-setup
- ✅ Production-ready
- ⏱️ 5–10 minutes

### Option 2️⃣: Manual Installation
```bash
# Node.js + PostgreSQL (advanced users)
# See: docs/INSTALL_DIRECTUS_SELF_HOSTED.md
```
- ✅ Full control
- ❌ More complex
- ⏱️ 30+ minutes

### Option 3️⃣: VPS/Cloud Server
```bash
# Install on Ubuntu/Debian server
# Use Docker + Nginx reverse proxy
# See: docs/INSTALL_DIRECTUS_SELF_HOSTED.md
```
- ✅ Public URL
- ✅ HTTPS ready
- ⏱️ 60+ minutes

---

## ⚡ Quick Start

```bash
# 1. Prepare environment
cp .env.example .env.directus
nano .env.directus  # Edit configuration

# 2. Install Directus
bash scripts/install-directus-self-hosted.sh

# 3. Wait for containers to start
docker-compose ps

# 4. Access Directus
# URL: http://localhost:8055
# Email: (from .env.directus)
# Password: (from .env.directus)

# 5. Create collections
npm run directus:setup

# 6. Export data
npm run directus:export
```

✅ **Done in 30–60 minutes!**

---

## 📋 Files for Self-Hosted Setup

### Configuration Files
- `docker-compose.yml` — Docker setup (Directus + PostgreSQL)
- `.env.directus` — Environment variables (passwords, keys)
- `scripts/install-directus-self-hosted.sh` — Automated installer

### Documentation
- `docs/INSTALL_DIRECTUS_SELF_HOSTED.md` — Complete installation guide
- `START_LOT2.md` — This LOT overview
- `LOT2_README.md` — Task breakdown

### Scripts
- `npm run directus:install` — Same as bash script above
- `npm run directus:setup` — Create collections (T2.2)
- `npm run directus:export` — Export JSON (T2.4)

---

## 🎯 The 6 Tasks

| Task | Time | Command |
|------|------|---------|
| **T2.1: Install Directus** | 60 min | `bash scripts/install-directus-self-hosted.sh` |
| **T2.2: Create Collections** | 10 min | `npm run directus:setup` |
| **T2.3: Test UX** | 30 min | Login + manual testing |
| **T2.4: Export JSON** | 5 min | `npm run directus:export` |
| **T2.5: Security Config** | 30 min | In Directus admin panel |
| **T2.6: Review Docs** | 0 min | Already prepared |

**Total**: 2.5 hours

---

## 🔧 Configuration

### Edit .env.directus

```bash
# Database
DB_USER=directus
DB_PASSWORD=CHANGE_ME_SECURE_PASSWORD

# Directus keys (generate secure values)
DIRECTUS_KEY=your-32-char-secret-key
DIRECTUS_SECRET=your-32-char-secret

# Admin account
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your_secure_password

# Public URL
PUBLIC_URL=http://localhost:8055
# For production: https://directus.yourdomain.com

# CORS (allow your website)
CORS_ORIGIN=https://jeux-video-occasion.com
```

### Generate Secure Keys

```bash
# Generate 32-char key
openssl rand -base64 32

# Copy to DIRECTUS_KEY and DIRECTUS_SECRET
```

---

## 📍 Access Directus

### Local (Your Computer)
```
URL: http://localhost:8055
Email: (from .env.directus)
Password: (from .env.directus)
```

### Remote (VPS/Server)
```
URL: https://directus.yourdomain.com
Email: (from .env.directus)
Password: (from .env.directus)
```

---

## 🐳 Docker Commands

```bash
# Start Directus
docker-compose up -d

# Stop Directus
docker-compose down

# View logs
docker-compose logs -f jvo-directus

# Restart
docker-compose restart jvo-directus

# Get container status
docker-compose ps
```

---

## 💾 Backup & Restore

### Backup Database
```bash
docker-compose exec postgres pg_dump -U directus directus > backup.sql
```

### Restore Database
```bash
docker-compose exec -T postgres psql -U directus directus < backup.sql
```

### Backup Files (uploads)
```bash
docker cp jvo-directus:/directus/uploads ./uploads-backup
```

---

## 🔐 Production Checklist

Before going live:

- [ ] Change all default passwords
- [ ] Generate secure DIRECTUS_KEY and SECRET
- [ ] Setup HTTPS (Let's Encrypt)
- [ ] Configure CORS whitelist
- [ ] Enable rate limiting
- [ ] Setup backups (cron job)
- [ ] Setup monitoring (optional)
- [ ] Setup email notifications (optional)
- [ ] Test API access
- [ ] Test file uploads

---

## 🆘 Common Issues

### Port 8055 Already in Use
```bash
# Change port in docker-compose.yml
# ports:
#   - "8056:8055"
docker-compose restart
```

### Database Connection Failed
```bash
# Check PostgreSQL logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### Can't Login
```bash
# Check credentials in .env.directus
cat .env.directus | grep ADMIN

# Verify credentials match
```

### File Upload Not Working
```bash
# Fix permissions
docker-compose exec directus chmod -R 755 /directus/uploads

# Restart
docker-compose restart jvo-directus
```

---

## 📚 Next Steps

1. **Read**: [docs/INSTALL_DIRECTUS_SELF_HOSTED.md](docs/INSTALL_DIRECTUS_SELF_HOSTED.md)
2. **Install**: Run `bash scripts/install-directus-self-hosted.sh`
3. **Create Collections**: `npm run directus:setup`
4. **Test UX**: Login and test CRUD
5. **Export**: `npm run directus:export`
6. **Configure Security**: CORS, rate limits, etc.

---

## 📞 Support

- **Installation Help**: See `docs/INSTALL_DIRECTUS_SELF_HOSTED.md`
- **Admin Help**: See `docs/ADMIN_DIRECTUS_SETUP.md`
- **Troubleshooting**: See `docs/ADMIN_TROUBLESHOOTING.md`
- **Directus Docs**: https://docs.directus.io
- **Docker Docs**: https://docs.docker.com

---

**Type**: Self-Hosted  
**Status**: 🟡 Ready for T2.1  
**Next**: Install Directus using Docker Compose

