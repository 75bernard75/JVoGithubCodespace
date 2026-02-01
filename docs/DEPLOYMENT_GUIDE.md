# 🚀 Deployment Guide for JVoGaming

**Purpose**: Deploy site to production server  
**Time Required**: 30-60 minutes (first time)  
**Difficulty**: Medium  
**Status**: 🟡 IN PROGRESS

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Production server ready (VPS/Dedicated)
- [ ] Domain registered and DNS configured
- [ ] SSH access working (`ssh user@server.com`)
- [ ] Web server installed (nginx or Apache)
- [ ] Node.js installed on server (optional, for local builds)
- [ ] GitHub repository created
- [ ] GitHub Secrets configured
- [ ] SSL certificate obtained (Let's Encrypt)
- [ ] All workflows tested locally

---

## 🎯 Deployment Options

Choose your deployment method:

### Option A: Automated via GitHub Actions ⭐ Recommended
- **Setup**: 30 minutes
- **Deployment time**: 5 minutes
- **Frequency**: Every commit or on schedule
- **Requirements**: SSH access to server

### Option B: Manual via SCP
- **Setup**: 15 minutes
- **Deployment time**: 10 minutes
- **Frequency**: On-demand
- **Requirements**: SSH access to server

### Option C: Git Pull on Server
- **Setup**: 20 minutes
- **Deployment time**: 2 minutes
- **Frequency**: Push-to-deploy
- **Requirements**: Git installed on server

---

## 🔧 Server Setup

### Step 1: Create Deploy User

```bash
# SSH to server as root or sudo user
ssh root@your-server.com

# Create deploy user
sudo useradd -m -s /bin/bash deploy-user
sudo usermod -aG sudo deploy-user

# Switch to deploy user
su - deploy-user

# Create .ssh directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

### Step 2: Setup Web Directory

```bash
# Create website directory
sudo mkdir -p /var/www/jvogaming
sudo chown deploy-user:deploy-user /var/www/jvogaming
chmod 755 /var/www/jvogaming

# Create logs directory
sudo mkdir -p /var/log/jvogaming
sudo chown deploy-user:deploy-user /var/log/jvogaming
```

### Step 3: Install Web Server (nginx)

```bash
# Install nginx
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx

# Create nginx config
sudo tee /etc/nginx/sites-available/jvogaming > /dev/null <<'EOF'
server {
    listen 80;
    server_name jvogaming.com www.jvogaming.com;
    
    root /var/www/jvogaming;
    index index.html;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name jvogaming.com www.jvogaming.com;
    
    root /var/www/jvogaming;
    index index.html;
    
    # SSL certificates (we'll setup with certbot)
    ssl_certificate /etc/letsencrypt/live/jvogaming.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jvogaming.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # Cache headers
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA fallback
    try_files $uri $uri/ /index.html;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/jvogaming /etc/nginx/sites-enabled/
sudo nginx -t  # Test config
sudo systemctl restart nginx
```

### Step 4: Setup HTTPS with Let's Encrypt

```bash
# Get SSL certificate
sudo certbot certonly --nginx -d jvogaming.com -d www.jvogaming.com

# Setup auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test renewal
sudo certbot renew --dry-run
```

### Step 5: Setup SSH Key

```bash
# Generate SSH key on server
su - deploy-user
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github-deploy -N ""

# Display public key
cat ~/.ssh/github-deploy.pub

# Add to authorized_keys
cat ~/.ssh/github-deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Display private key (for GitHub Secrets)
cat ~/.ssh/github-deploy
```

---

## 🤖 Option A: Automated Deployment (GitHub Actions)

### Setup GitHub Secrets

In GitHub repository:
**Settings → Secrets and variables → Actions**

Add these secrets:

```
DEPLOY_HOST       = jvogaming.com
DEPLOY_USER       = deploy-user
DEPLOY_PATH       = /var/www/jvogaming
DEPLOY_KEY        = [private SSH key from above]
```

### How It Works

```
1. You push code to GitHub
2. GitHub Actions triggers automatically
3. Build job runs: npm run build
4. Deploy job runs: rsync to server
5. Website updates automatically
```

### Manual Trigger

If you need to deploy without pushing code:

1. Go to GitHub → **Actions**
2. Click **Deploy to Production**
3. Click **Run workflow**
4. Click **Run workflow** button
5. Wait 5 minutes for deployment

### Check Deployment Status

**GitHub Web UI**:
1. Go to **Actions** tab
2. Click **Deploy to Production**
3. See latest run status

**Command Line**:
```bash
gh run list --workflow deploy.yml
```

---

## 🔄 Option B: Manual Deployment (SCP)

### One-Time Setup

```bash
# Generate SSH key locally
ssh-keygen -t ed25519 -C "deploy" -f ~/.ssh/deploy_key -N ""

# Add public key to server
ssh-copy-id -i ~/.ssh/deploy_key.pub deploy-user@jvogaming.com

# Test access
ssh -i ~/.ssh/deploy_key deploy-user@jvogaming.com "ls -la"
```

### Deploy Script

Create: `scripts/deploy-manual.sh`

```bash
#!/bin/bash

# Configuration
DEPLOY_HOST="jvogaming.com"
DEPLOY_USER="deploy-user"
DEPLOY_PATH="/var/www/jvogaming"
DEPLOY_KEY="$HOME/.ssh/deploy_key"

echo "🚀 Starting deployment..."

# Build locally
echo "📦 Building site..."
npm run build || exit 1

# Upload to server
echo "📤 Uploading files..."
rsync -avz --delete \
  -e "ssh -i $DEPLOY_KEY" \
  _site/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/

# Restart web server
echo "🔄 Restarting web server..."
ssh -i $DEPLOY_KEY $DEPLOY_USER@$DEPLOY_HOST \
  "sudo systemctl restart nginx"

# Check health
echo "✅ Checking site..."
sleep 5
if curl -f https://$DEPLOY_HOST > /dev/null; then
  echo "✅ Deployment successful!"
  echo "🌐 Visit: https://$DEPLOY_HOST"
else
  echo "❌ Deployment failed - site not responding"
  exit 1
fi
```

### Run Deployment

```bash
# Build and deploy manually
bash scripts/deploy-manual.sh

# Or just copy files
rsync -avz --delete _site/ deploy-user@jvogaming.com:/var/www/jvogaming/

# Verify on server
ssh deploy-user@jvogaming.com "ls -la /var/www/jvogaming"
```

---

## 🔄 Option C: Git Pull on Server

### Setup Git Repository on Server

```bash
# SSH to server
ssh deploy-user@jvogaming.com

# Clone repository
cd /var/www/jvogaming
git clone https://github.com/75bernard75/JVoGithubCodespace.git .

# Or use SSH (better for automation)
git clone git@github.com:75bernard75/JVoGithubCodespace.git .
```

### Create Deploy Script on Server

Create: `/var/www/jvogaming/deploy.sh`

```bash
#!/bin/bash
set -e

cd /var/www/jvogaming

echo "🔄 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm ci

echo "🏗️ Building site..."
npm run build

echo "✅ Build complete"

# If using Docker/systemd
# sudo systemctl restart jvogaming

# Or nginx
# sudo systemctl restart nginx

echo "🎉 Deployment complete!"
```

### Deploy via Git Push

```bash
# Make changes locally
git add .
git commit -m "Update content"
git push origin main

# On server, trigger deploy script
ssh deploy-user@jvogaming.com \
  "cd /var/www/jvogaming && bash deploy.sh"
```

---

## 🔒 Security Setup

### SSH Hardening

```bash
# On server, edit /etc/ssh/sshd_config
sudo nano /etc/ssh/sshd_config

# Recommended settings:
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
X11Forwarding no
AllowUsers deploy-user@IP
```

### Firewall Setup

```bash
# Enable firewall
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow Directus (internal only)
sudo ufw allow from 127.0.0.1 to any port 8055

# Check status
sudo ufw status
```

### Permissions

```bash
# Make web directory readable
chmod 755 /var/www/jvogaming
chmod 644 /var/www/jvogaming/*.html

# Make logs writable
chmod 755 /var/log/jvogaming
chmod 644 /var/log/jvogaming/*.log
```

---

## 🔄 Rollback Procedure

### If Deployment Breaks

#### Option A: Git Rollback

```bash
# SSH to server
ssh deploy-user@jvogaming.com

# Go to site directory
cd /var/www/jvogaming

# See recent commits
git log --oneline -5

# Rollback to previous version
git revert HEAD
git push origin main
```

#### Option B: Manual Backup

```bash
# Create backup before deploy
cp -r /var/www/jvogaming /var/www/jvogaming.backup.$(date +%s)

# Restore if needed
rm -rf /var/www/jvogaming/_site
cp -r /var/www/jvogaming.backup.XXXXX/_site /var/www/jvogaming/

# Restart web server
sudo systemctl restart nginx
```

#### Option C: GitHub Actions Rollback

1. Go to **Actions** → **Deploy to Production**
2. Click previous successful run
3. Click **Re-run all jobs**
4. Deploy previous version automatically

---

## 📊 Verification

### After Deployment

Check if everything works:

```bash
# 1. Check website loads
curl https://jvogaming.com

# 2. Check specific pages
curl https://jvogaming.com/guides/
curl https://jvogaming.com/consoles/

# 3. Check SSL certificate
curl -I https://jvogaming.com | grep SSL

# 4. Check performance
curl -w "@curl-format.txt" -o /dev/null -s https://jvogaming.com

# 5. SSH and verify files
ssh deploy-user@jvogaming.com "ls -lah /var/www/jvogaming/"
```

### Health Checks

GitHub Actions runs health checks automatically:

1. Every 15 minutes
2. Checks site responds with HTTP 200
3. Alerts if site down
4. See results in **Actions** → **Production Health Check**

---

## 🆘 Troubleshooting

### "Permission denied" on SSH

```bash
# Check SSH key
ssh -v -i ~/.ssh/deploy_key deploy-user@server.com

# Fix permissions
chmod 600 ~/.ssh/deploy_key
chmod 700 ~/.ssh

# Check server side
ssh -i ~/.ssh/deploy_key deploy-user@server.com \
  "chmod 600 ~/.ssh/authorized_keys; chmod 700 ~/.ssh"
```

### "rsync: command not found"

```bash
# Install rsync on server
ssh deploy-user@server.com "sudo apt install -y rsync"
```

### "No space left on device"

```bash
# Check disk space
ssh deploy-user@server.com "df -h"

# Clean old deployments
ssh deploy-user@server.com "rm -rf /var/www/jvogaming.backup.*"

# Check nginx logs
ssh deploy-user@server.com "du -sh /var/log/nginx/"
```

### Site shows old content

```bash
# Clear browser cache
Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)

# Clear nginx cache (if configured)
ssh deploy-user@server.com "sudo systemctl restart nginx"

# Check deployed files
ssh deploy-user@server.com "ls -la /var/www/jvogaming/"
```

### Build fails on GitHub Actions

1. Go to **Actions** → Click failing run
2. Expand failed step
3. Read error message
4. Fix locally: `npm run build`
5. Commit and push again

---

## 📈 Monitoring

### View Real-Time Logs

```bash
# Nginx access log
ssh deploy-user@server.com \
  "tail -f /var/log/nginx/access.log"

# Nginx error log
ssh deploy-user@server.com \
  "tail -f /var/log/nginx/error.log"

# Systemd logs
ssh deploy-user@server.com \
  "sudo journalctl -u nginx -f"
```

### GitHub Actions Monitoring

1. Go to **Actions** tab
2. See all workflow runs
3. Click run to see details
4. Expand each step for logs
5. Download artifacts

### Performance Monitoring

```bash
# Check page load time
curl -w "Total time: %{time_total}s\n" https://jvogaming.com

# Check server resources
ssh deploy-user@server.com "top -b -n 1"

# Check disk usage
ssh deploy-user@server.com "du -sh /var/www/jvogaming"
```

---

## ✅ Post-Deployment

### After Successful Deployment

- [ ] Test website loads: `https://jvogaming.com`
- [ ] Check mobile display
- [ ] Verify all pages load
- [ ] Test affiliate links
- [ ] Check console for errors (F12)
- [ ] Test on different browsers
- [ ] Check SSL certificate (🔒 in address bar)
- [ ] Run Lighthouse audit (DevTools)
- [ ] Monitor error logs for 24 hours
- [ ] Document deployment details

### Regular Maintenance

```bash
# Weekly: Check backups exist
ls -la /var/www/jvogaming.backup.*

# Monthly: Rotate logs
ssh deploy-user@server.com "sudo logrotate /etc/logrotate.d/nginx"

# Monthly: Update dependencies
npm update

# Quarterly: Renew SSL (automatic)
sudo certbot renew

# Quarterly: Update server packages
sudo apt update && sudo apt upgrade -y
```

---

## 📞 Quick Commands Reference

| Task | Command |
|------|---------|
| Deploy manually | `bash scripts/deploy-manual.sh` |
| Check disk space | `ssh deploy-user@server.com "df -h"` |
| View access logs | `ssh deploy-user@server.com "tail -f /var/log/nginx/access.log"` |
| Restart web server | `ssh deploy-user@server.com "sudo systemctl restart nginx"` |
| View deployed files | `ssh deploy-user@server.com "ls -la /var/www/jvogaming"` |
| Create backup | `ssh deploy-user@server.com "cp -r /var/www/jvogaming /var/www/jvogaming.backup"` |
| Rollback | `git revert HEAD && git push` |
| Test SSL | `curl -I https://jvogaming.com` |

---

**Next**: Set up GitHub Secrets and run first deployment!

**Status**: 🟡 READY FOR DEPLOYMENT
