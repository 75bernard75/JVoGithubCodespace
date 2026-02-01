# 📸 GitHub Secrets Configuration - Visual Step-by-Step

**Purpose**: Add credentials for Directus export workflow  
**Time**: 10 minutes  
**Difficulty**: Very Easy  

---

## 🎯 Overview

GitHub Secrets allow workflows to access sensitive data safely:

```
You add secrets in GitHub UI
         ↓
Workflow reads secrets (hidden from logs)
         ↓
Export script connects to Directus
         ↓
Data exported successfully
```

---

## 🚀 Step-by-Step Guide

### Step 1: Go to GitHub Settings

**In your browser:**
```
https://github.com/75bernard75/JVoGithubCodespace/settings/secrets/actions
```

OR navigate manually:

1. Go to: https://github.com/75bernard75/JVoGithubCodespace
2. Click **Settings** tab
3. Left sidebar: **Secrets and variables**
4. Click **Actions**

**You should see:**
```
Repository secrets
  No secrets yet
  [New repository secret] button
```

---

### Step 2: Add First Secret (DIRECTUS_URL)

Click **[New repository secret]** button

**Form appears:**
```
Name: [________________________________________]
Value: [________________________________________]
                                        [Add secret]
```

**Fill in:**
- **Name**: `DIRECTUS_URL`
- **Value**: `http://localhost:8055`

**Click**: `Add secret`

**Result:**
```
✅ Repository secrets
  ✓ DIRECTUS_URL
```

---

### Step 3: Add Second Secret (DIRECTUS_EMAIL)

Click **[New repository secret]** button again

**Fill in:**
- **Name**: `DIRECTUS_EMAIL`
- **Value**: `admin@jvo.local`

**Click**: `Add secret`

**Result:**
```
✅ Repository secrets
  ✓ DIRECTUS_EMAIL
  ✓ DIRECTUS_URL
```

---

### Step 4: Add Third Secret (DIRECTUS_PASSWORD)

Click **[New repository secret]** button again

**Fill in:**
- **Name**: `DIRECTUS_PASSWORD`
- **Value**: `admin`

**Click**: `Add secret`

**Result:**
```
✅ Repository secrets
  ✓ DIRECTUS_EMAIL
  ✓ DIRECTUS_PASSWORD
  ✓ DIRECTUS_URL
```

**Total Secrets Added**: 3 ✅

---

## ✅ Verify Secrets Added

After adding all 3, you should see:

```
Secrets
════════════════════════════════════════════════════════
  DIRECTUS_EMAIL           Updated 5 seconds ago
  DIRECTUS_PASSWORD        Updated 2 seconds ago
  DIRECTUS_URL             Updated 1 minute ago

  [New repository secret]
```

**Check this page** before running workflow!

---

## 🔐 Important Notes

### Can I See Secret Values?

No. After adding:
- ✅ Name visible (DIRECTUS_PASSWORD)
- ✅ Update time visible
- ❌ Value hidden (security)
- ❌ Can't be copied back out

This is **by design** - GitHub encrypts them.

### If I Need to Change a Secret

1. Click on the secret name
2. Click **Delete**
3. Click **New repository secret**
4. Add with same name but new value

---

## 🧪 Testing Secrets

Once added, test the export workflow:

### In GitHub Actions UI

1. Go to: https://github.com/75bernard75/JVoGithubCodespace/actions
2. Left menu: Click **Nightly Directus Export**
3. Click **Run workflow** (top right)
4. Confirm: **Branch: main**
5. Click **Run workflow**

### What Happens

Workflow starts automatically:
```
Checkout code           ✅ 5 seconds
Setup Node.js           ✅ 15 seconds
Install dependencies    ✅ 30 seconds
Run directus:export     ✅ 30 seconds
  (uses your secrets here)
Check for changes       ✅ 2 seconds
Commit changes          ✅ 5 seconds
────────────────────────────────
Total time: 2-3 minutes
```

### Check Logs

Click on the workflow run to see details:

```
Workflow run: Nightly Directus Export #1
═══════════════════════════════════════════════════════
⬇️ Checkout code
  ✅ 0 seconds

📦 Setup Node.js
  ✅ 15 seconds

📥 Install dependencies
  ✅ 35 seconds

🚀 Export data from Directus
  ✅ 45 seconds
  
  [Log output]
  ⚠️ DIRECTUS_API_KEY not found, authenticating with email/password
  ✅ Authenticated successfully
  🔗 Testing Directus connection...
  ✅ Connected to Directus v11.14.1
  ✅ Fetched 0 items from consoles
  ✅ Fetched 0 items from guides
  ...
  ✅ Export complete!

📊 Check for changes
  ✅ 2 seconds
  
  ✓ No changes in export

💾 Commit changes
  ⏭️ Skipped (no changes)

📢 Notify success
  ✅ Export completed successfully
```

**Status**: ✅ ALL GREEN = SUCCESS

---

## 🎯 Common Scenarios

### Scenario 1: First Run (Current Situation)

**Collections are empty** (no content in Directus yet)

```json
{
  "consoles": [],
  "guides": [],
  "accessories": [],
  ...
  "metadata": { ... }
}
```

**Workflow result**: ✅ SUCCESS (but no commit because no changes)

**This is OK** ✅ Everything works correctly.

---

### Scenario 2: After Adding Content

When you add gaming consoles in Directus admin:

```json
{
  "consoles": [
    { "id": 1, "name": "PlayStation 5", "description": "...", "price": 499 },
    { "id": 2, "name": "Xbox Series X", "description": "...", "price": 499 }
  ],
  ...
}
```

**Workflow result**: ✅ SUCCESS with commit

**Git shows**:
```
chore: update directus export (2026-02-01 14:30:45)
```

---

### Scenario 3: Error - "Invalid credentials"

**Symptom**:
```
❌ Authenticated failed
   Error: Invalid email or password
```

**Cause**: Secret values don't match Directus admin account

**Fix**:
1. Verify credentials work locally: `npm run directus:export`
2. Check secret values in GitHub:
   - DIRECTUS_EMAIL = admin@jvo.local (correct case)
   - DIRECTUS_PASSWORD = admin
3. If wrong, update secrets (delete & re-add)
4. Retry workflow

---

### Scenario 4: Error - "Directus not found"

**Symptom**:
```
❌ Cannot connect to http://localhost:8055
   Error: ECONNREFUSED
```

**Cause**: Directus not running (containers stopped)

**Fix**:
1. Check Docker: `docker-compose ps`
2. Start if needed: `docker-compose up -d`
3. Wait 10 seconds
4. Retry workflow

---

## 🔄 Workflow Chain After Export

Once export workflow succeeds:

```
Export Workflow
    ↓
✅ data/directus-export.json updated
    ↓
❌ NO automatic build yet (T3.2 only)
    ↓
Manual: Can trigger build in T3.3
```

**In T3.3**, we'll setup automatic build trigger.

---

## 📊 Secret Names (Exact Case)

**Must match exactly:**

```
✅ CORRECT:
  DIRECTUS_URL
  DIRECTUS_EMAIL
  DIRECTUS_PASSWORD

❌ WRONG (won't work):
  directus_url         (lowercase)
  Directus_URL         (mixed case)
  DIRECTUS_url         (mixed case)
  URL                  (too short)
```

**Copy-paste these names** to avoid typos:
```
DIRECTUS_URL
DIRECTUS_EMAIL
DIRECTUS_PASSWORD
```

---

## 🔐 Security Reminders

### Before Adding Secrets

- [x] GitHub repo is private (check settings)
- [x] Only you have write access
- [x] 2FA enabled on GitHub account (optional but recommended)

### After Adding Secrets

- [x] Never commit `.env` file
- [x] Never print secrets in logs
- [x] Keep passwords strong
- [x] Don't share secret values
- [x] Delete unused secrets

### If Secret Is Compromised

1. Go to secrets settings
2. Delete the secret
3. Create new secret with different value
4. Update .env / Directus if needed

---

## 🎓 How Workflow Uses Secrets

In `.github/workflows/export.yml`:

```yaml
- name: 🚀 Export data from Directus
  run: npm run directus:export
  env:
    DIRECTUS_URL: ${{ secrets.DIRECTUS_URL }}
    DIRECTUS_EMAIL: ${{ secrets.DIRECTUS_EMAIL }}
    DIRECTUS_PASSWORD: ${{ secrets.DIRECTUS_PASSWORD }}
```

**What happens:**
1. Workflow reads secret from GitHub
2. Passes to environment variable
3. Script reads from environment
4. Never printed in logs ✅
5. Automatically cleaned up after job

---

## 📝 Troubleshooting Secrets

### I Added Secret But Workflow Still Fails

**Check:**
1. Secret value exactly matches (no extra spaces)
2. Secret name exactly matches workflow variable name
3. Secret is in correct repository (not organization secret)
4. Try again - sometimes needs 10 seconds delay

**Test locally first:**
```bash
# Make sure it works locally
DIRECTUS_URL=http://localhost:8055 \
DIRECTUS_EMAIL=admin@jvo.local \
DIRECTUS_PASSWORD=admin \
npm run directus:export
```

If local works, secrets are correct.

### Workflow Fails But Logs Don't Show Why

**Reason**: GitHub hides secret values in logs for security

**To debug:**
1. Test locally with same values
2. Check export.yml for typos
3. Verify credentials are correct

### Can't Delete Secret

**Reason**: Might be protected by branch rules

**Solution**:
1. Go to Settings → Secrets
2. Click secret name
3. Click **Delete** button
4. Confirm deletion
5. Re-add if needed

---

## ✅ Verification Checklist

After adding secrets:

- [ ] Navigated to Settings → Secrets
- [ ] Saw "New repository secret" button
- [ ] Added DIRECTUS_URL = http://localhost:8055
- [ ] Added DIRECTUS_EMAIL = admin@jvo.local
- [ ] Added DIRECTUS_PASSWORD = admin
- [ ] All 3 secrets visible in list
- [ ] Can't see secret values (expected)
- [ ] Triggered export workflow
- [ ] Workflow completed in 2-3 minutes
- [ ] Workflow shows green ✅ checkmarks
- [ ] Saw "Export completed successfully" message

---

## 🚀 Next Steps

Once secrets are added and export workflow runs:

1. **Verify export** (you're here)
2. **Setup build** (T3.3 next)
3. **Setup deploy** (T3.3)
4. **Monitor health** (T3.4)

---

## 📞 Quick Help

| Issue | Solution |
|-------|----------|
| Can't find Settings | Click repo name → Settings tab |
| Can't find Secrets | Settings → Secrets and variables → Actions |
| Secret not working | Delete and re-add, verify exact value |
| Workflow still failing | Test locally first: `npm run directus:export` |
| Need to change value | Delete secret, create new one |
| Forgot the value | You can't see it - that's OK (it's encrypted) |

---

**Status**: Ready for T3.2 Secret Configuration ✅

**Time to Complete**: 10 minutes

**Next**: Add secrets and run export workflow!
