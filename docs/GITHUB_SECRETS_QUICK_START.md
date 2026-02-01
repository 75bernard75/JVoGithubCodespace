# 🔐 GitHub Secrets Setup Guide

**Purpose**: Add Directus credentials to GitHub for automated export  
**Time**: 10 minutes  
**Difficulty**: Very Easy  

---

## 📍 Where to Go

### Step 1: Open GitHub Repository Settings

1. Go to your GitHub repository:
   ```
   https://github.com/75bernard75/JVoGithubCodespace
   ```

2. Click **"Settings"** tab (top right of repo page)

3. In left sidebar, find **"Secrets and variables"**

4. Click **"Actions"** (under Secrets and variables)

You should now see a page titled: **"Actions secrets and variables"**

---

## 🔐 Add Secret #1: DIRECTUS_URL

### The Process

1. Click green button: **"New repository secret"**

2. Fill in the form:

   ```
   Name:  DIRECTUS_URL
   Value: http://localhost:8055
   ```

   (If Directus is remote, use its actual URL)

3. Click **"Add secret"**

### Success

You'll see:
```
DIRECTUS_URL     ••••••••• (hidden) ❌ (delete button)
```

---

## 🔐 Add Secret #2: DIRECTUS_EMAIL