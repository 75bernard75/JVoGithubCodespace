# 🚀 LOT 3 - CI/CD AUTOMATION

**Phase**: Continuous Integration / Continuous Delivery  
**Status**: 🟡 IN PROGRESS  
**Start Date**: January 29, 2026  
**Est. Duration**: 3-5 days  
**Priority**: HIGH (enables automated workflow)

---

## 📋 Overview

LOT 3 implements fully automated CI/CD pipeline using GitHub Actions:

```
Directus Changes
       ↓
GitHub Actions Trigger
       ↓
Export Data (nightly or on-demand)
       ↓
Build with Eleventy
       ↓
Deploy to Production
       ↓
Monitoring & Alerts
```

---

## 🎯 Objectives

1. **Automate Exports**: Nightly JSON export from Directus
2. **Build on Schedule**: Eleventy builds automatically  
3. **Deploy Automatically**: Push to production server
4. **Monitor Production**: Track health & performance
5. **Enable Rollback**: Quick recovery if issues occur

---

## 📦 Tasks (LOT 3)

### ✅ T3.1 - GitHub Actions Setup
**Goal**: Configure GitHub Actions workflows  
**Status**: 🟡 IN PROGRESS

#### Subtasks:
- [ ] Create `.github/workflows/export.yml`
  - Trigger: Daily at 2 AM UTC
  - Action: Run `npm run directus:export`
  - Output: Commit to `data/directus-export.json`
  
- [ ] Create `.github/workflows/build.yml`
  - Trigger: On export completion or manual
  - Action: Run `npm run build`
  - Output: Generate `_site/` directory
  
- [ ] Create `.github/workflows/deploy.yml`
  - Trigger: On build completion
  - Action: Deploy to production server (via SSH or webhook)
  - Requirements: SSH key or deploy token

**Deliverables**:
- 3x GitHub Actions workflow files
- Secrets configured in GitHub repo
- Manual trigger capability

---

### 🟡 T3.2 - Nightly Export Trigger
**Goal**: Automate Directus → JSON export  
**Status**: NOT STARTED

#### What It Does:
1. Runs every night at 2 AM UTC
2. Exports all collections to JSON
3. Commits changes to git
4. Triggers build automatically
5. Logs output for debugging

#### Configuration:
- **Trigger**: `cron: '0 2 * * *'` (daily 2 AM UTC)
- **Environment**: GitHub Actions runner (Ubuntu)
- **Script**: `npm run directus:export`
- **Auth**: DIRECTUS_EMAIL + DIRECTUS_PASSWORD (secrets)

#### Files to Modify:
- `.env` → Add export credentials
- `scripts/export-directus-json.js` → Already supports email auth ✅
- `.github/workflows/export.yml` → New file

**Deliverables**:
- Working export workflow
- Automated commit on changes
- Error notifications

---

### 🟡 T3.3 - Build & Deploy
**Goal**: Automate Eleventy build and deployment  
**Status**: NOT STARTED

#### What It Does:
1. Builds Eleventy site
2. Uploads to production server
3. Restarts web server
4. Verifies deployment

#### Deployment Options:
**Option A**: SSH + SCP (Manual VPS)
- SSH into server
- Copy `_site/` via SCP
- Restart nginx/apache
- Verify health check

**Option B**: Webhook (Automated)
- POST to production server
- Server pulls latest repo
- Builds locally
- Restarts automatically

**Option C**: Docker Push (Registry)
- Build Docker image
- Push to registry
- Pull on production
- Restart containers

#### Configuration:
- **Server**: To be provided by user
- **Auth**: SSH key (stored in GitHub Secrets)
- **Trigger**: After build completes
- **Health Check**: Verify site is up

**Deliverables**:
- `.github/workflows/deploy.yml`
- Deployment script template
- Rollback procedure
- Health check validation

---

### 🟡 T3.4 - Monitoring & Alerts
**Goal**: Monitor production site health  
**Status**: NOT STARTED

#### What It Does:
1. **Health Checks**: Verify site responds
2. **Performance**: Track build times
3. **Errors**: Alert on failures
4. **Logs**: Store workflow logs
5. **Rollback**: Quick recovery if needed

#### Monitoring Points:
- ✅ Site uptime (HTTP 200 check)
- ✅ Build success/failure
- ✅ Export completion
- ✅ Deployment status
- ✅ Performance metrics (build time)

#### Alerts:
- Email notification on failure
- Slack message (optional)
- GitHub issue creation (optional)
- Detailed logs in GitHub Actions

#### Files to Create:
- `.github/workflows/health-check.yml`
- `scripts/health-check.sh`
- Monitoring documentation

**Deliverables**:
- Health check workflow
- Alert configuration
- Incident response guide
- Performance dashboard (GitHub)

---

## 🔧 Technical Details

### GitHub Actions Workflows

#### 1. Export Workflow (`.github/workflows/export.yml`)
```yaml
name: Nightly Directus Export

on:
  schedule:
    - cron: '0 2 * * *'  # Daily 2 AM UTC
  workflow_dispatch:     # Manual trigger

jobs:
  export:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run directus:export
        env:
          DIRECTUS_URL: ${{ secrets.DIRECTUS_URL }}
          DIRECTUS_EMAIL: ${{ secrets.DIRECTUS_EMAIL }}
          DIRECTUS_PASSWORD: ${{ secrets.DIRECTUS_PASSWORD }}
      
      - name: Commit changes
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add data/directus-export.json
          git diff-index --quiet HEAD || git commit -m "chore: update directus export"
          git push
      
      - name: Trigger build
        if: success()
        uses: github/workflow-runs-action@v1
        with:
          workflow: build.yml
```

#### 2. Build Workflow (`.github/workflows/build.yml`)
```yaml
name: Build Eleventy

on:
  push:
    paths:
      - 'data/directus-export.json'
      - 'src/**'
      - 'package.json'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - run: npm run test
      
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: site
          path: _site/
          retention-days: 7
      
      - name: Trigger deploy
        if: success()
        uses: github/workflow-runs-action@v1
        with:
          workflow: deploy.yml
```

#### 3. Deploy Workflow (`.github/workflows/deploy.yml`)
```yaml
name: Deploy to Production

on:
  workflow_run:
    workflows: ["Build Eleventy"]
    types: [completed]
  workflow_dispatch:

jobs:
  deploy:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: site
          path: _site/
      
      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.DEPLOY_HOST }}
          username: ${{ secrets.DEPLOY_USER }}
          key: ${{ secrets.DEPLOY_KEY }}
          script: |
            cd /var/www/jvogaming
            rm -rf _site_old
            mv _site _site_old
            cp -r ~/artifact/_site .
            sudo systemctl restart nginx
            
      - name: Health check
        run: |
          for i in {1..5}; do
            if curl -f https://jvogaming.com > /dev/null; then
              echo "✅ Site is UP"
              exit 0
            fi
            echo "Attempt $i/5 - waiting..."
            sleep 10
          done
          exit 1
```

#### 4. Health Check Workflow (`.github/workflows/health-check.yml`)
```yaml
name: Production Health Check

on:
  schedule:
    - cron: '*/15 * * * *'  # Every 15 minutes
  workflow_dispatch:

jobs:
  health:
    runs-on: ubuntu-latest
    steps:
      - name: Check site status
        run: |
          curl -f https://jvogaming.com || exit 1
          echo "✅ Site is healthy"
      
      - name: Alert on failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
          text: '⚠️ Production site is DOWN'
          status: ${{ job.status }}
```

---

## 🔐 GitHub Secrets Needed

Add these to GitHub repo settings → Secrets:

```
DIRECTUS_URL           → http://localhost:8055 (or production URL)
DIRECTUS_EMAIL         → pauld.75020@gmail.com
DIRECTUS_PASSWORD      → [secure password]

DEPLOY_HOST            → your-server.com
DEPLOY_USER            → deploy-user
DEPLOY_KEY             → [SSH private key]

SLACK_WEBHOOK          → [optional, for notifications]
```

---

## 📊 Expected Workflow

### Daily Cycle
```
2:00 AM UTC  →  Export trigger (nightly-export.yml)
             ↓
             Export data from Directus
             ↓
             Commit to git
             ↓
             Trigger build (build.yml)
             ↓
4:00 AM UTC  →  Build complete
             ↓
             Trigger deploy (deploy.yml)
             ↓
5:00 AM UTC  →  Deployment complete
             ↓
             Health check (every 15 min)
```

### On-Demand Flow
```
User edits content in Directus
             ↓
Manual trigger: "Run Export Workflow"
             ↓
Export immediately (no waiting until 2 AM)
             ↓
Commit & build
             ↓
Deploy within 10 minutes
```

---

## ✅ Prerequisites

Before starting LOT 3, ensure:

- [x] Git repository on GitHub (configured)
- [x] Directus running with credentials available
- [x] Eleventy build working (`npm run build` passes)
- [x] Export script functional (`npm run directus:export` works)
- [x] Production server ready (IP/domain/SSH access)
- [x] All npm scripts defined in `package.json`

**Status**: ✅ ALL READY

---

## 📝 Implementation Plan

### Phase 1: GitHub Actions Setup (T3.1)
**Duration**: 1 day
1. Create `.github/workflows/` directory
2. Create export, build, deploy, health-check workflows
3. Add GitHub Secrets
4. Test each workflow manually

### Phase 2: Nightly Export (T3.2)
**Duration**: 1 day
1. Configure export schedule
2. Setup git auto-commit
3. Test with manual trigger
4. Monitor first automatic run

### Phase 3: Build & Deploy (T3.3)
**Duration**: 2 days
1. Create deployment script
2. Configure SSH access
3. Test deployment to staging
4. Setup rollback procedure
5. Test to production

### Phase 4: Monitoring (T3.4)
**Duration**: 1 day
1. Setup health checks
2. Configure alerts
3. Create incident response guide
4. Document troubleshooting

**Total**: 3-5 days

---

## 🎯 Success Criteria

- [ ] Export workflow runs daily without errors
- [ ] Build completes in <2 minutes
- [ ] Deployment to production succeeds
- [ ] Production site shows latest content
- [ ] Health checks pass every 15 minutes
- [ ] Failed workflows trigger alerts
- [ ] Rollback procedure documented and tested
- [ ] Team can monitor in GitHub Actions UI
- [ ] All logs are retained for debugging
- [ ] No manual steps required after setup

---

## 🚀 After LOT 3

### What You'll Have
✅ Fully automated deployment pipeline  
✅ Nightly exports (no manual updates)  
✅ Continuous build & deploy  
✅ Production monitoring  
✅ Incident alerts  
✅ Rollback capability  

### Ready For
✅ Content creation team (fully automated)  
✅ Multiple deployments per day if needed  
✅ Scale to multiple environments (staging/prod)  
✅ Monitor performance metrics  
✅ Quick debugging via logs  

### Next: LOT 4
After CI/CD is setup, ready for:
- Content creation
- Initial product database
- SEO optimization
- Performance tuning

---

## 📚 Documentation to Create

- [ ] GitHub Actions Guide
- [ ] Deployment Troubleshooting
- [ ] Incident Response Playbook
- [ ] Performance Monitoring Guide
- [ ] Rollback Procedure
- [ ] Secret Management Guide

---

## 🔗 Related Files

**Existing**:
- `package.json` - npm scripts
- `scripts/export-directus-json.js` - Export logic
- `src/` - Eleventy source
- `.eleventy.js` - Eleventy config

**To Create**:
- `.github/workflows/export.yml`
- `.github/workflows/build.yml`
- `.github/workflows/deploy.yml`
- `.github/workflows/health-check.yml`
- `docs/GITHUB_ACTIONS_SETUP.md`
- `docs/DEPLOYMENT_GUIDE.md`
- `scripts/deploy.sh`

---

## 💡 Notes

1. **Cron Schedule**: `0 2 * * *` is 2 AM UTC = varies by timezone
   - Convert to your timezone before deploying
   - Can adjust easily in workflow file

2. **SSH Key Setup**:
   - Generate: `ssh-keygen -t ed25519 -N "" -f deploy_key`
   - Add public key to server: `~/.ssh/authorized_keys`
   - Add private key to GitHub Secrets

3. **Testing**:
   - Always test workflows manually before relying on schedule
   - Use `workflow_dispatch` to trigger manually from GitHub UI

4. **Rollback**:
   - Keep `_site_old` backup
   - Can restore with one SSH command
   - Document procedure for quick recovery

5. **Performance**:
   - Expected build time: 5-30 seconds (Eleventy)
   - Expected export time: 10-30 seconds (Directus API)
   - Total pipeline: ~2 minutes
   - Can run multiple times daily without issue

---

## 📌 Quick Start

Once LOT 3 is complete, the workflow will be:

```bash
# Developers/Content creators
# Just edit in Directus admin UI
# Everything else is automatic!

# To manually trigger export (if needed)
# Go to GitHub → Actions → Nightly Directus Export → Run workflow

# To check deployment status
# Go to GitHub → Actions → see workflow results

# To check site health
# Go to GitHub → Actions → Production Health Check
```

---

**Status**: 🟡 READY TO START  
**Next**: T3.1 - Create GitHub Actions workflows

Let's build LOT 3! 🚀
