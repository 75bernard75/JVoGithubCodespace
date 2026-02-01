# 🔑 GitHub Actions Configuration Guide

**Purpose**: Setup automated CI/CD pipeline with GitHub Secrets  
**Time Required**: 15-30 minutes  
**Status**: 🟡 IN PROGRESS

---

## ✅ Quick Setup

### Step 1: Configure GitHub Secrets

Go to: **Settings → Secrets and variables → Actions**

Add these secrets:

#### Required Secrets (for Export & Deployment)

```
Name:                    Value:
═══════════════════════════════════════════════════════════
DIRECTUS_URL            http://your-directus-server.com:8055
DIRECTUS_EMAIL          pauld.75020@gmail.com
DIRECTUS_PASSWORD       [Your secure Directus admin password]

DEPLOY_HOST             your-website.com
DEPLOY_USER             deploy-user
DEPLOY_PATH             /var/www/your-site
DEPLOY_KEY              [SSH private key - see below]
```

#### Optional Secrets (for Notifications)

```
SLACK_WEBHOOK           https://hooks.slack.com/services/xxx/yyy/zzz
DISCORD_WEBHOOK         https://discordapp.com/api/webhooks/xxx/yyy
```

---

## 🔑 SSH Key Setup (For Deployment)

### On Your Server

```bash
# 1. Login to production server
ssh your-user@your-server.com

# 2. Create deploy user (if not exists)
sudo useradd -m -s /bin/bash deploy-user
sudo visudo  # Add: deploy-user ALL=(ALL) NOPASSWD: /usr/bin/systemctl

# 3. Generate SSH key on server
su - deploy-user
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github-deploy -N ""

# 4. Setup authorized keys
# The public key is already in ~/.ssh/authorized_keys by default
# Verify:
cat ~/.ssh/github-deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# 5. Get private key (for GitHub)
cat ~/.ssh/github-deploy
```

### In GitHub

1. Copy the **private key** from above
2. Go to: **Settings → Secrets → New repository secret**
3. Name: `DEPLOY_KEY`
4. Value: Paste the entire private key (including `-----BEGIN OPENSSH PRIVATE KEY-----`)
5. Click **Add secret**

---

## 📝 Environment Variables

### For Directus Export

These are used by: `.github/workflows/export.yml`

| Variable | Example | Source |
|----------|---------|--------|
| `DIRECTUS_URL` | `http://localhost:8055` | Your Directus instance |
| `DIRECTUS_EMAIL` | `pauld.75020@gmail.com` | Directus admin email |
| `DIRECTUS_PASSWORD` | `SecurePass123!` | Directus admin password |

**Where to set**: GitHub Secrets

**How to use in workflow**:
```yaml
env:
  DIRECTUS_URL: ${{ secrets.DIRECTUS_URL }}
  DIRECTUS_EMAIL: ${{ secrets.DIRECTUS_EMAIL }}
  DIRECTUS_PASSWORD: ${{ secrets.DIRECTUS_PASSWORD }}
```

### For Deployment

These are used by: `.github/workflows/deploy.yml`

| Variable | Example | Source |
|----------|---------|--------|
| `DEPLOY_HOST` | `example.com` | Your domain/server IP |
| `DEPLOY_USER` | `deploy-user` | Username on server |
| `DEPLOY_PATH` | `/var/www/site` | Website directory on server |
| `DEPLOY_KEY` | `-----BEGIN OPENSSH...` | SSH private key |

**Where to set**: GitHub Secrets

---

## 🧪 Testing Workflows

### Test Export Workflow

1. Go to GitHub → **Actions**
2. Select: **Nightly Directus Export**
3. Click: **Run workflow** → **Branch: main**
4. Click: **Run workflow**
5. Wait for completion (1-2 minutes)
6. Check: `data/directus-export.json` was updated

**Expected result**: ✅ Export commits new file to git

### Test Build Workflow

1. Push a small change to `src/` folder
2. Go to **Actions** → **Build Eleventy Site**
3. Wait for completion (2-3 minutes)
4. Download artifact: `eleventy-build`
5. Verify: `_site/` contains HTML files

**Expected result**: ✅ Build completes, artifact uploaded

### Test Deploy Workflow

**IMPORTANT**: Only test to staging server first!

1. Go to **Actions** → **Deploy to Production**
2. Click: **Run workflow** → **Branch: main**
3. Click: **Run workflow**
4. Wait for completion (3-5 minutes)
5. SSH to server and verify: `ls -la /var/www/your-site/`
6. Check website: `https://your-domain.com`

**Expected result**: ✅ Files deployed, site accessible

### Test Health Check Workflow

1. Go to **Actions** → **Production Health Check**
2. Click: **Run workflow** → **Branch: main**
3. Click: **Run workflow**
4. Wait for completion (<1 minute)
5. Check output: "✅ Site is UP"

**Expected result**: ✅ Health check passes

---

## 🔐 Secret Security Best Practices

### ✅ DO

- [x] Use strong passwords (20+ characters)
- [x] Rotate secrets every 90 days
- [x] Use separate SSH keys for each service
- [x] Limit SSH key permissions (read-only if possible)
- [x] Use environment-specific secrets (staging vs prod)
- [x] Never commit secrets to git
- [x] Enable 2FA on GitHub account
- [x] Review secret access logs regularly

### ❌ DON'T

- [ ] Commit secrets in `.env` files
- [ ] Share secrets via email or Slack
- [ ] Use same password for multiple services
- [ ] Print secrets in logs
- [ ] Use personal SSH keys
- [ ] Store passwords in code
- [ ] Enable public workflow logs with secrets
- [ ] Use simple/common passwords

---

## 🚨 Troubleshooting

### Export Fails with "Invalid credentials"

**Problem**: Workflow can't authenticate to Directus

**Solution**:
1. Verify `DIRECTUS_EMAIL` is correct
2. Verify `DIRECTUS_PASSWORD` is correct
3. Test locally: `npm run directus:export`
4. Check Directus is running: `docker-compose ps`
5. Check firewall allows connection: `curl $DIRECTUS_URL`

### Deploy Fails with "Permission denied (publickey)"

**Problem**: SSH key not working

**Solution**:
1. Verify private key is in `DEPLOY_KEY` secret
2. Check public key on server: `cat ~/.ssh/authorized_keys`
3. Verify SSH key format: `head -1 $DEPLOY_KEY`
4. Test locally: `ssh -i deploy_key deploy-user@server.com`

### Build Takes Too Long

**Problem**: Workflow timeout after 6 hours

**Solution**:
1. Reduce node_modules size: `npm prune --production`
2. Cache dependencies: Already configured ✅
3. Skip unnecessary steps
4. Reduce image size: Use alpine base image

### Secrets Not Available in Workflow

**Problem**: `${{ secrets.XXX }}` shows as undefined

**Solution**:
1. Verify secret name matches exactly (case-sensitive)
2. Check secret exists: Settings → Secrets
3. Verify branch has access to secret
4. Wait 5 minutes after adding secret

---

## 📊 Monitoring Workflows

### View Workflow Runs

**GitHub Web UI**:
1. Go to: **Actions** tab
2. Click workflow name
3. See all runs with status

### View Workflow Logs

**GitHub Web UI**:
1. Click on a workflow run
2. Click job name
3. Expand each step to see output

### Export Logs Locally

```bash
# Install GitHub CLI
brew install gh  # or apt install gh

# Login
gh auth login

# Get workflow runs
gh run list --repo 75bernard75/JVoGithubCodespace

# Download logs from a run
gh run download <run-id> --dir ./logs
```

---

## 🎯 Workflow Schedule Reference

### Export Workflow
- **Schedule**: Daily at 2 AM UTC
- **Cron**: `0 2 * * *`
- **Timezone**: UTC (not your local time)
- **Adjust**:
  - 7 AM UTC: `0 7 * * *`
  - 2 PM UTC: `0 14 * * *`

### Health Check Workflow
- **Schedule**: Every 15 minutes
- **Cron**: `*/15 * * * *`
- **Run count**: 96 per day
- **Adjust**:
  - Every hour: `0 * * * *`
  - Every 30 min: `*/30 * * * *`

**Cron Time Format**:
```
Min  Hour  Day  Month  Weekday
0    2     *    *      *        (daily at 2 AM)
*/15 *     *    *      *        (every 15 min)
0    9-17  *    *      1-5      (9 AM-5 PM, weekdays)
```

---

## 🔄 Manual Workflow Triggers

### From GitHub Web UI

1. Go to **Actions**
2. Click workflow name
3. Click **Run workflow**
4. Click **Run workflow** button

**Available workflows**:
- ✅ Nightly Directus Export (test export)
- ✅ Build Eleventy Site (test build)
- ✅ Deploy to Production (test deploy)
- ✅ Production Health Check (test health)

### From Command Line

```bash
# Install GitHub CLI
gh auth login

# Trigger export
gh workflow run export.yml -r 75bernard75/JVoGithubCodespace

# Trigger build
gh workflow run build.yml -r 75bernard75/JVoGithubCodespace

# Trigger deploy
gh workflow run deploy.yml -r 75bernard75/JVoGithubCodespace
```

---

## 📋 Checklist

Before going live:

- [ ] All secrets configured in GitHub
- [ ] Export workflow tested (manual trigger)
- [ ] Build workflow tested (manual trigger)
- [ ] Deploy workflow tested to staging
- [ ] Health check workflow responds
- [ ] SSH key working on production
- [ ] Web server configured (nginx/apache)
- [ ] DNS pointing to server
- [ ] SSL certificate installed
- [ ] Firewall allows GitHub Actions IPs
- [ ] Deployment path exists on server
- [ ] Log rotation configured
- [ ] Backups scheduled
- [ ] Monitoring alerts setup
- [ ] Team notified of automation

---

## 🆘 Support

### Common Commands

```bash
# List all secrets
gh secret list --repo 75bernard75/JVoGithubCodespace

# Delete a secret
gh secret delete DEPLOY_KEY --repo 75bernard75/JVoGithubCodespace

# Re-add a secret
gh secret set DEPLOY_KEY < ~/.ssh/deploy_key

# View workflow file
cat .github/workflows/export.yml

# Test local build
npm run build

# Test local export
npm run directus:export

# Check Docker containers
docker-compose ps
```

### When Something Breaks

1. **Check GitHub Actions logs**:
   - Go to Actions tab
   - Click failing workflow
   - See which step failed
   - Read error message

2. **Test locally**:
   ```bash
   # Test export
   npm run directus:export
   
   # Test build
   npm run build
   
   # Test export with SSH
   ssh deploy-user@server.com "ls -la /var/www/site"
   ```

3. **Check server**:
   ```bash
   # SSH to server
   ssh deploy-user@server.com
   
   # Check disk space
   df -h
   
   # Check permissions
   ls -la /var/www/site/
   
   # Check web server
   sudo systemctl status nginx
   ```

4. **Create GitHub issue**:
   - Include workflow run URL
   - Include error message
   - Include any logs
   - Tag `@help`

---

## 📞 Quick Reference

| Need | Command | Time |
|------|---------|------|
| Add secret | GitHub UI → Settings → Secrets | 1 min |
| Test export | GitHub Actions → Run workflow | 2 min |
| View logs | GitHub Actions → Click run | 1 min |
| Download artifacts | GitHub Actions → Download | 1 min |
| Manual deploy | GitHub Actions → Run deploy | 5 min |
| Check health | GitHub Actions → Health check | 1 min |

---

**Next**: [T3.2 - Configure Nightly Exports](START_LOT3.md#-t32---nightly-export-trigger)

**Status**: 🟡 READY FOR SECRETS CONFIGURATION
