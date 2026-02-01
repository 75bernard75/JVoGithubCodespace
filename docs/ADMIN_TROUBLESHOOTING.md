# 🐛 Admin Troubleshooting Guide

**Purpose**: Diagnose and fix common Directus issues  
**Audience**: Site admins, developers  
**Last Updated**: 2025-01-19

---

## ❌ Common Issues & Solutions

### Issue 1: "Cannot Connect to Directus"

**Error Message**:
```
Unable to reach https://[project].directus.app
Connection timeout
```

**Causes**:
- Internet connection lost
- Directus server down
- Wrong URL
- VPN blocking

**Fix Steps**:
1. Check internet connection
   ```bash
   ping google.com
   ```
2. Verify Directus Cloud status
   - Go to: https://status.directus.io
   - Look for red incidents
3. Check URL spelling
   ```
   Correct: https://jeux-video-occasion.directus.app
   Wrong: https://jeux-video-occasions.directus.app
   ```
4. Try different network (disable VPN)
5. Clear browser cache (Ctrl+Shift+Del)
6. Try different browser

**If still failing**:
- Contact Directus Support: https://directus.io/contact

---

### Issue 2: "Login Failed - Invalid Credentials"

**Error Message**:
```
Authentication failed
Invalid email or password
```

**Causes**:
- Wrong email address
- Wrong password
- Account not activated
- Caps Lock on

**Fix Steps**:
1. Double-check email spelling
2. Verify Caps Lock is OFF
3. Try password reset:
   ```
   Click: Forgot Password?
   Enter email
   Check inbox for reset link
   Set new password
   Login with new password
   ```
4. Check confirmation email
   - Directus sends setup email when account created
   - May be in Spam folder
   - Has temporary password
5. Try different browser
6. Clear browser cookies:
   - Settings → Privacy → Clear cookies for this site

**Still failing?**:
- Password reset link expired → Request new one
- Email not confirmed → Check spam folder

---

### Issue 3: "API Key Invalid"

**Error Message**:
```
401 Unauthorized
Bearer token invalid or expired
```

**Occurs When**:
- `npm run directus:setup` fails
- `npm run directus:export` fails
- Export script can't authenticate

**Causes**:
- API key not copied correctly
- API key expired (quarterly rotation)
- Typo in .env file
- Wrong .env file read

**Fix Steps**:

1. **Verify API key in .env**:
   ```bash
   cat .env | grep DIRECTUS_API_KEY
   # Output should show full key, no quotes
   ```

2. **Check if key is correct length**:
   - Should be 64+ characters
   - If shorter → probably incorrect

3. **Regenerate API key**:
   - Login to Directus admin
   - Go: Settings → API Keys
   - Find existing key
   - Delete old key (trash icon)
   - Click "+ Create"
   - Create new API key
   - Copy full token
   - Update .env with new key
   ```bash
   DIRECTUS_API_KEY=abc123...xyz789
   ```

4. **Test connection**:
   ```bash
   curl -H "Authorization: Bearer $DIRECTUS_API_KEY" \
     "$DIRECTUS_URL/api/server/info"
   # Should return JSON with project info
   ```

5. **Re-run setup script**:
   ```bash
   npm run directus:setup
   ```

---

### Issue 4: "Collections Not Appearing"

**Problem**:
- Click on Collections → Consoles
- Get blank page or loading spinner
- Collections listed but can't open

**Causes**:
- Browser cache stale
- JavaScript not loaded
- Collections not created yet
- Permission issue

**Fix Steps**:

1. **Hard refresh page**:
   ```
   Windows/Linux: Ctrl + Shift + R
   Mac: Cmd + Shift + R
   ```

2. **Clear browser cache**:
   - Chrome: Settings → Privacy → Clear browsing data
   - Firefox: Options → Privacy → Clear Data
   - Safari: Develop → Empty Caches

3. **Verify collections created**:
   ```bash
   # Check if collections exist via API
   curl -H "Authorization: Bearer $DIRECTUS_API_KEY" \
     "$DIRECTUS_URL/api/collections" | jq '.data | length'
   # Should output: 7 (if all 7 created)
   ```

4. **Recreate collections**:
   ```bash
   # If API shows 0 collections:
   npm run directus:setup
   ```

5. **Check browser JavaScript**:
   - Open DevTools (F12)
   - Go to Console tab
   - Look for red errors
   - Note error messages for support

6. **Try different browser**:
   - Chrome, Firefox, Safari all work
   - Some extensions block Directus
   - Try "Incognito" / "Private" mode

---

### Issue 5: "Can't Upload Images"

**Error Message**:
```
File upload failed
Request entity too large
```

**Or**:
```
Unsupported media type
```

**Causes**:
- File size > 10 MB
- Wrong file type
- Corrupted file
- Browser issue

**Fix Steps**:

1. **Check file size**:
   ```bash
   ls -lh image.jpg
   # If > 10 MB, compress first
   ```

2. **Compress large images**:
   ```bash
   # Using ImageMagick (if installed)
   convert image.jpg -quality 85 image-compressed.jpg
   
   # Using online: https://tinypng.com
   ```

3. **Check file format**:
   - Supported: JPG, PNG, WebP, GIF
   - NOT supported: TIFF, BMP, PSD
   - Verify extension correct (not .jpeg.jpg)

4. **Try different image**:
   - Test with small sample image
   - If works → original file corrupted

5. **Use different browser**:
   - Chrome/Firefox usually most reliable
   - Safari sometimes has upload issues

6. **Check browser console**:
   - F12 → Console tab
   - Look for error messages
   - Copy error text for support

---

### Issue 6: "Changes Not Showing on Website"

**Problem**:
- Created/edited content in Directus
- Content not appearing on website
- Old content still showing

**Causes**:
- Status still "draft" (not published)
- Website cache not cleared
- Browser cache stale
- Build not triggered

**Fix Steps**:

1. **Verify status is "published"**:
   - Open content in Directus
   - Scroll to Status field
   - Should say "published" (not "draft")
   - If draft → click → select "published" → Save

2. **Wait for cache clear** (2-5 minutes):
   - Website auto-clears every 5 min
   - Wait before checking

3. **Hard refresh website**:
   ```
   Windows/Linux: Ctrl + Shift + R
   Mac: Cmd + Shift + R
   ```

4. **Check website build status**:
   - Go to: https://github.com/[your-repo]/actions
   - Look for "Build Site" job
   - If red ❌ → build failed
   - If green ✅ → build passed
   - If yellow ⏳ → building now

5. **Trigger manual build**:
   ```bash
   # If no automatic build happened:
   git commit --allow-empty -m "trigger build"
   git push origin main
   # GitHub Actions will rebuild
   ```

---

### Issue 7: "Rich Text Editor Not Working"

**Problem**:
- Click content_v1 field
- Text editor won't appear
- Can't format text (bold, links, etc.)

**Causes**:
- Browser JavaScript disabled
- Extension blocking editor
- Browser cache issue
- Unsupported browser

**Fix Steps**:

1. **Check JavaScript enabled**:
   - Chrome: Settings → Privacy & Security → Site Settings → JavaScript
   - Firefox: about:config → javascript.enabled = true
   - Safari: Settings → Privacy → Allow JavaScript

2. **Disable browser extensions**:
   - Chrome: Manage Extensions → Disable all
   - Firefox: Add-ons → Disable all
   - Try editor again
   - Re-enable extensions one by one to find culprit

3. **Clear browser cache & cookies**:
   - Ctrl/Cmd + Shift + Del
   - Select "All time"
   - Check: Cookies, Cached images/files
   - Clear data
   - Refresh Directus

4. **Try Private/Incognito mode**:
   - Ctrl/Cmd + Shift + N
   - Go to Directus
   - Test editor
   - If works → extension issue
   - If still fails → browser issue

5. **Try different browser**:
   - Chrome, Firefox, Safari all supported
   - Some work better than others

---

### Issue 8: "Affiliate Links Not Working"

**Problem**:
- Amazon/eBay links on website not working
- Click link → error page
- Not earning commissions

**Causes**:
- Affiliate tags not configured
- URL format incorrect
- Affiliate account not approved
- Links not in published content

**Fix Steps**:

1. **Verify affiliate config in Directus**:
   - Collections → affiliate_config
   - Check `amazon_tag` field filled
   - Check `amazon_tag` format: `jeuxvideooneagain-21`
   - Check `enabled` = true

2. **Verify Amazon Associates account**:
   - Login to: https://affiliate-program.amazon.com
   - Check account approved (not pending)
   - Get correct tracking ID
   - Copy to Directus amazon_tag field

3. **Verify eBay EPN account**:
   - Login to: https://ebaypartners.com
   - Get Campaign ID and Custom ID
   - Copy to Directus ebay_campid and ebay_customid

4. **Check content contains links**:
   - Guide content (content_v1, v2, v3) should have links
   - Link format: `[Product Name](https://amazon.com/dp/[ASIN]?tag=[YOUR-TAG])`
   - Test link manually

5. **Wait for tracking setup**:
   - Amazon tracking can take 24 hours
   - eBay tracking immediate
   - Check commission dashboard next day

6. **Export and test**:
   ```bash
   npm run directus:export
   # Check data/directus-export.json
   # Verify affiliate_config populated
   ```

---

### Issue 9: "Eleventy Build Failing"

**Error Message**:
```
> eleventy
✖ 11ty Fatal Error
Cannot read property 'data' of undefined
```

**Or**:
```
Template Error in [filename]
```

**Causes**:
- Malformed JSON in data files
- Missing required fields
- Syntax error in template
- Collection not matching template

**Fix Steps**:

1. **Check Eleventy build locally**:
   ```bash
   npm run build
   # Shows detailed error message
   ```

2. **Read error message carefully**:
   - Look for file name (template.njk, data.json)
   - Look for line number
   - Error type (JSON parse, undefined, etc.)

3. **Validate JSON**:
   ```bash
   # If JSON error, validate file:
   npm install -g jsonlint
   jsonlint src/_data/somedata.json
   ```

4. **Check for typos in collections**:
   - Directus data must match template expectations
   - Verify field names match (slug, name, title)
   - Verify data types (string, number, boolean)

5. **Review recent changes**:
   - What changed before build failed?
   - Recent Directus export?
   - Recent template edit?
   - Revert change and retry

6. **Ask developer**:
   - Share full error message
   - Share recent changes
   - Share console output

---

### Issue 10: "Performance Problems (Slow Website)"

**Problem**:
- Website loads slowly
- Page takes > 3 seconds
- Images loading late

**Causes**:
- Too many large images
- Unoptimized images
- Too much content
- Too many API calls

**Fix Steps**:

1. **Check image sizes**:
   - Dev Tools → Network tab
   - Reload page
   - Look for image file sizes
   - If > 500 KB each → compress

2. **Compress images**:
   ```bash
   # Use online: https://tinypng.com
   # Or ImageMagick:
   convert image.jpg -quality 80 image-compressed.jpg
   ```

3. **Check page content**:
   - Too many videos? → Lazy-load them
   - Too many guides? → Paginate content
   - Too many related items? → Show top 5

4. **Check Eleventy build time**:
   ```bash
   npm run build
   # Look at: "Total Time: X.XXs"
   # > 10 seconds = too slow
   # Investigate large collections
   ```

5. **Monitor with Lighthouse**:
   ```bash
   npm run test:perf
   # Generates performance score
   # Shows optimization suggestions
   ```

---

## 🔧 Technical Debugging

### Enable Debug Logging

**For Directus operations**:
```bash
# Add to .env:
DEBUG=directus:*
npm run directus:setup
# Shows detailed logs
```

**For Eleventy build**:
```bash
DEBUG=Eleventy npm run build
# Shows verbose build output
```

### Check Network Requests

**In browser DevTools**:
1. Press F12
2. Go to Network tab
3. Reload page
4. Look for red ❌ (failed) requests
5. Click request to see details
6. Check Status code:
   - 200-299: OK
   - 300-399: Redirect
   - 400-499: Client error (bad request)
   - 500-599: Server error

### Check JavaScript Errors

**In browser DevTools**:
1. Press F12
2. Go to Console tab
3. Look for red text (errors)
4. Click error to see details
5. Copy full error message

---

## 📞 Getting Help

### Resources:
- **Directus Docs**: https://docs.directus.io
- **Directus Community**: https://directus.app/community
- **GitHub Issues**: Check project repo

### When Reporting Issues:
Include:
1. Error message (exact text)
2. Steps to reproduce
3. Browser & version
4. Network speed (fast/slow)
5. Screenshots
6. Console errors (if applicable)

---

**Need more help?** Contact admin or check official docs.
