# 🔐 GitHub Deployment Secrets - Visual Guide

**Task**: Add 4 deployment secrets to GitHub Actions  
**Time**: 10 minutes  
**Difficulty**: Easy  

---

## 📍 Where to Go

**URL**: https://github.com/75bernard75/JVoGithubCodespace/settings/secrets/actions

**Steps**:

### Step 1: Open Settings
1. Go to GitHub repository
2. Click: **Settings** (top right)
3. Scroll down left sidebar
4. Click: **Secrets and variables**
5. Click: **Actions**

**You should see**:
- Existing secrets (DIRECTUS_*)
- "New repository secret" button

---

## 🔑 Secrets to Add

### Secret 1: DEPLOY_HOST

```
┌─────────────────────────────────────────┐
│ New repository secret                   │
├─────────────────────────────────────────┤
│ Name*                                   │
│ ┌─────────────────────────────────────┐ │
│ │ DEPLOY_HOST                         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Secret*                                 │
│ ┌─────────────────────────────────────┐ │
│ │ jvogaming.com                       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Add secret] button                     │
└─────────────────────────────────────────┘
```

**Fill in**:
- **Name**: `DEPLOY_HOST`
- **Value**: Your domain or server IP
  - If you have domain: `jvogaming.com`
  - If using IP: `123.45.67.89`

**Click**: Add secret ✅

---

### Secret 2: DEPLOY_USER

```
┌─────────────────────────────────────────┐
│ New repository secret                   │
├─────────────────────────────────────────┤
│ Name*                                   │
│ ┌─────────────────────────────────────┐ │
│ │ DEPLOY_USER                         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Secret*                                 │
│ ┌─────────────────────────────────────┐ │
│ │ deploy                              │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Add secret] button                     │
└─────────────────────────────────────────┘
```

**Fill in**:
- **Name**: `DEPLOY_USER`
- **Value**: `deploy` (the user we created on server)

**Click**: Add secret ✅

---

### Secret 3: DEPLOY_PATH

```
┌─────────────────────────────────────────┐
│ New repository secret                   │
├─────────────────────────────────────────┤
│ Name*                                   │
│ ┌─────────────────────────────────────┐ │
│ │ DEPLOY_PATH                         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Secret*                                 │
│ ┌─────────────────────────────────────┐ │
│ │ /var/www/jvogaming                  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Add secret] button                     │
└─────────────────────────────────────────┘
```

**Fill in**:
- **Name**: `DEPLOY_PATH`
- **Value**: `/var/www/jvogaming`

**Click**: Add secret ✅

---

### Secret 4: DEPLOY_KEY ⚠️ IMPORTANT

```
┌─────────────────────────────────────────┐
│ New repository secret                   │
├─────────────────────────────────────────┤
│ Name*                                   │
│ ┌─────────────────────────────────────┐ │
│ │ DEPLOY_KEY                          │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Secret*                                 │
│ ┌─────────────────────────────────────┐ │
│ │ -----BEGIN OPENSSH PRIVATE KEY----- │ │
│ │ MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBi │ │
│ │ QKBQD...                            │ │
│ │ ... (VERY LONG - many lines)        │ │
│ │ ...                                 │ │
│ │ -----END OPENSSH PRIVATE KEY-----   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Add secret] button                     │
└─────────────────────────────────────────┘
```

**⚠️ CRITICAL STEPS**:

1. **SSH to your server** and run:
   ```bash
   su - deploy
   cat ~/.ssh/github-deploy
   ```

2. **Copy ENTIRE output** (everything from `-----BEGIN` to `-----END`)

3. **Paste in GitHub**:
   - Name: `DEPLOY_KEY`
   - Value: [Paste the entire private key]

4. **Click**: Add secret ✅

---

## ✅ Verify All Secrets Added

After adding all 4 deployment secrets, your GitHub Secrets page should show:

```
✓ DEPLOY_HOST
✓ DEPLOY_KEY
✓ DEPLOY_PATH
✓ DEPLOY_USER
✓ DIRECTUS_EMAIL    (from T3.2)
✓ DIRECTUS_PASSWORD (from T3.2)
✓ DIRECTUS_URL      (from T3.2)
```

**Total**: 7 secrets ✅

---

## 🧪 Test the Secrets

### Option A: Manual Deploy Test

1. Go to: GitHub Actions
2. Click: "Deploy to Production"
3. Click: **Run workflow**
4. Select: **main** branch
5. Click: **Run workflow**
6. Wait 5 minutes for workflow to complete

**Expected output**: All steps green ✅

---

### Option B: Monitor Workflow

**While workflow is running**:

```
1️⃣ Checkout code       ✅ (30 seconds)
2️⃣ Setup Node.js      ✅ (30 seconds)
3️⃣ Build site         ✅ (2 minutes - builds Eleventy)
4️⃣ Download artifact  ✅ (30 seconds)
5️⃣ Setup SSH key      ✅ (10 seconds)
6️⃣ Deploy via SSH     ✅ (30 seconds - uploads files)
7️⃣ Restart nginx      ✅ (10 seconds)
8️⃣ Health check       ✅ (5 seconds)
```

**Each step** turns green ✅ as it completes

---

## 🔍 Troubleshooting

### "Authentication failed"
**Cause**: Wrong DEPLOY_KEY

**Fix**:
1. SSH to server again
2. Verify private key: `cat ~/.ssh/github-deploy`
3. Copy entire thing
4. Paste in GitHub (DEPLOY_KEY)
5. Run workflow again

### "Connection refused"
**Cause**: DEPLOY_HOST wrong or server down

**Fix**:
1. Test SSH locally: `ssh deploy@DEPLOY_HOST`
2. If fails, check server IP
3. Update DEPLOY_HOST secret
4. Run workflow again

### "Permission denied (publickey)"
**Cause**: Public key not on server

**Fix**:
1. SSH to server as root
2. Check authorized_keys: `cat /home/deploy/.ssh/authorized_keys`
3. If empty, add public key:
   ```bash
   # From server
   su - deploy
   cat ~/.ssh/github-deploy.pub >> ~/.ssh/authorized_keys
   ```

### "Timeout"
**Cause**: SSH connection takes too long

**Fix**:
1. Verify server is running
2. Check firewall allows port 22
3. Try SSH manually first

---

## 📋 Secrets Checklist

- [ ] DEPLOY_HOST set (domain or IP)
- [ ] DEPLOY_USER set (deploy)
- [ ] DEPLOY_PATH set (/var/www/jvogaming)
- [ ] DEPLOY_KEY set (entire private key, with BEGIN/END lines)
- [ ] All 7 secrets visible in GitHub settings
- [ ] Deploy workflow ran successfully
- [ ] Files uploaded to server
- [ ] Domain/IP loads in browser

---

## 🎯 After Verification

Once deployment works:

1. ✅ T3.3b (Deploy trigger) complete
2. 🔄 Setup automatic builds (T3.3a - already ready)
3. 🔄 Setup health checks (T3.4)
4. ⏭️ Move to LOT 4 (content creation)

---

**Status**: Ready to test deployment! 🚀

**Next**: Run manual deploy workflow and verify

