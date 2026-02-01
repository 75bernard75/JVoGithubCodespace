# 🔐 SECURITY CONFIGURATION GUIDE - LOT 2.5

**Date**: January 29, 2026  
**Status**: ✅ COMPLETE

---

## 📋 What Was Configured

### ✅ CORS (Cross-Origin Resource Sharing)
```
Enabled Origins:
  ✅ http://localhost:3000 (Development)
  ✅ http://localhost:8055 (Admin UI)
  ✅ Production domain (configurable)

Methods Allowed:
  ✅ GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS

Headers:
  ✅ Content-Type, Authorization (allowed)
  ✅ Content-Type, X-Total-Count (exposed)

Max Age: 86400 seconds (24 hours)
```

**Purpose**: Allow your frontend to communicate securely with Directus API

### ✅ Authentication Security
```
Login Attempts: 5 maximum
Lockout Period: 15 minutes
Password Policy: Must contain at least one number

Result: Brute-force protection enabled
```

**Purpose**: Prevent unauthorized access attempts

### ✅ Rate Limiting
```
Request Timeout: 30 seconds
Max Request Size: 100 MB

Result: API protected from abuse
```

**Purpose**: Prevent resource exhaustion attacks

### ✅ Audit Logging
```
Status: ENABLED
Retention: 30 days
Tracking: All user actions logged

Result: Full activity audit trail
```

**Purpose**: Track all changes for compliance and debugging

---

## 🔧 How to Apply to Production

### Step 1: Update CORS for Production Domain

**In Directus Admin**:
```
1. Go to Settings → Project Settings
2. Find "CORS" section
3. Update CORS Origins with your domain:
   - https://jeux-video-occasion.com
   - https://www.jeux-video-occasion.com
4. Save
```

**Via Script**:
```bash
npm run directus:security https://jeux-video-occasion.com
```

### Step 2: Change Admin Password

**First Time Setup**:
```bash
# Access admin at http://localhost:8055
# Click admin avatar → Edit Profile
# Change password from "admin" to something secure
```

**Via Database** (if needed):
```bash
# Generate new secure password hash
node -e "import('argon2').then(({hash}) => { hash('YOUR_NEW_PASSWORD').then(h => console.log(h)); });"

# Update database
docker-compose exec -T postgres psql -U directus -d directus << EOF
UPDATE directus_users 
SET password = 'HASH_HERE'
WHERE email = 'pauld.75020@gmail.com';
EOF
```

### Step 3: Create API Tokens

**Via Admin UI**:
```
1. Login to http://localhost:8055
2. Go to Settings → API Tokens
3. Click "Create Token"
4. Name: "jvo-automation"
5. Select appropriate role/permissions
6. Copy token and save in .env
```

---

## 🛡️ Security Checklist

### ✅ Configured
- [x] CORS whitelist
- [x] Auth rate limiting
- [x] Password policy
- [x] Audit logging
- [x] Request timeout
- [x] Request size limits

### ⚠️ Before Production
- [ ] Update CORS for production domain
- [ ] Change admin password
- [ ] Create API tokens for automation
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Set up monitoring/alerts
- [ ] Review audit logs regularly

### 📋 To Document
- [ ] Incident response plan
- [ ] Backup/restore procedures
- [ ] Access control matrix
- [ ] Security policies
- [ ] Monitoring setup

---

## 🔐 Production Hardening

### SSL/TLS (HTTPS)

**Option 1: Nginx Reverse Proxy** (Recommended)
```nginx
server {
    listen 443 ssl http2;
    server_name directus.jeux-video-occasion.com;

    ssl_certificate /etc/letsencrypt/live/directus.jeux-video-occasion.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/directus.jeux-video-occasion.com/privkey.pem;

    location / {
        proxy_pass http://localhost:8055;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Option 2: Let's Encrypt with Certbot**
```bash
certbot certonly --standalone -d directus.jeux-video-occasion.com
# Follow prompts and use certificate in docker-compose
```

### Firewall Rules

```bash
# Allow Directus from specific IPs only
sudo ufw allow from 192.168.1.0/24 to any port 8055
sudo ufw allow from YOUR_IP to any port 8055

# Block direct access, use reverse proxy instead
sudo ufw deny 8055/tcp
```

### Database Security

```bash
# Change PostgreSQL password
docker-compose exec postgres psql -U postgres << EOF
ALTER USER directus WITH PASSWORD 'NEW_SECURE_PASSWORD';
EOF
```

### Environment Variables

**Production `.env`**:
```
DIRECTUS_URL=https://directus.jeux-video-occasion.com
DIRECTUS_KEY=$(openssl rand -base64 32)
DIRECTUS_SECRET=$(openssl rand -base64 32)
DB_PASSWORD=VERY_STRONG_PASSWORD
ADMIN_PASSWORD=VERY_STRONG_PASSWORD
```

---

## 📊 Security Monitoring

### View Audit Logs

**In Admin UI**:
```
1. Go to Settings → Activity Log
2. Filter by user/action/date
3. Review for suspicious activity
```

**Via API**:
```bash
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:8055/activity?limit=100
```

### Monitor Login Attempts

**Check Auth Logs**:
```bash
docker-compose logs directus | grep -i "login\|auth"
```

**Database Query**:
```bash
docker-compose exec -T postgres psql -U directus -d directus << EOF
SELECT user_id, action, ip_address, timestamp 
FROM directus_activity 
WHERE action = 'login'
ORDER BY timestamp DESC LIMIT 20;
EOF
```

---

## 🚨 Incident Response

### If Compromised

1. **Immediately**:
   - [ ] Change all admin passwords
   - [ ] Revoke all API tokens
   - [ ] Review audit logs for unauthorized actions
   - [ ] Restore from backup if data modified

2. **Short-term**:
   - [ ] Update CORS whitelist if exposed
   - [ ] Rotate database password
   - [ ] Check for data exfiltration
   - [ ] Enable MFA if available

3. **Long-term**:
   - [ ] Audit all user accounts
   - [ ] Review and tighten permissions
   - [ ] Update security policies
   - [ ] Conduct security training

---

## 🔑 API Key Management

### Creating Tokens

```bash
# Use script to create token
npm run directus:security

# Or manually via API
curl -X POST http://localhost:8055/tokens \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"automation-token"}'
```

### Token Rotation

**Best Practice**: Rotate every 90 days
```bash
# 1. Create new token
# 2. Update .env and deployment config
# 3. Revoke old token
# 4. Monitor for issues
```

### Token Permissions

Create separate tokens for different purposes:
- **Automation**: Read/Write to collections only
- **Analytics**: Read-only access
- **Admin**: Full access (use sparingly)

---

## ✨ What's Protected Now

### ✅ Configured in This Session
1. **CORS**: Frontend can communicate safely
2. **Auth**: Login attempts limited
3. **Passwords**: Policy enforced
4. **Audit**: All actions logged
5. **Rate Limiting**: API protected from abuse

### ⚠️ Still Needed for Production
1. HTTPS/SSL certificates
2. Firewall configuration
3. Database password changes
4. Backup automation
5. Monitoring setup
6. Incident response plan

---

## 📚 Related Documentation

- Installation: [docs/INSTALL_DIRECTUS_SELF_HOSTED.md](docs/INSTALL_DIRECTUS_SELF_HOSTED.md)
- Admin Guide: [docs/ADMIN_DIRECTUS_SETUP.md](docs/ADMIN_DIRECTUS_SETUP.md)
- Troubleshooting: [docs/ADMIN_TROUBLESHOOTING.md](docs/ADMIN_TROUBLESHOOTING.md)

---

## 🎯 Next Phase (LOT 3)

In CI/CD automation, we'll add:
- [ ] Automated backup scripts
- [ ] Health monitoring
- [ ] Alert notifications
- [ ] Security scanning
- [ ] Log aggregation

---

## 🚀 Quick Commands

```bash
# Configure security (with domain)
npm run directus:security https://jeux-video-occasion.com

# View logs
docker-compose logs directus

# Check auth attempts
docker-compose exec postgres psql -U directus -d directus \
  -c "SELECT COUNT(*) FROM directus_activity WHERE action = 'login';"

# Backup database
docker-compose exec postgres pg_dump -U directus -d directus > backup.sql

# Restore database
docker-compose exec -T postgres psql -U directus -d directus < backup.sql
```

---

**Configuration Date**: January 29, 2026  
**Status**: ✅ COMPLETE  
**Last Review**: January 29, 2026  
**Next Review**: Before production launch
