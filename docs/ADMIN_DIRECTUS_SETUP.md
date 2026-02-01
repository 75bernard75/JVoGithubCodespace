# 📚 Admin Directus Setup Guide

**Last Updated**: 2025-01-19  
**Audience**: Site admins, content editors  
**Purpose**: Complete guide to accessing and using Directus backend

---

## 🔐 Access Credentials

### Admin Panel URL
```
https://[your-project].directus.app
```

**First Login**:
1. Email: The email you registered with on Directus Cloud
2. Password: Generated during setup (check confirmation email)
3. Click **Sign In**

### API Access
For developers integrating Directus with Eleventy:
```
API URL: https://[your-project].directus.app/api
API Key: [stored in .env as DIRECTUS_API_KEY]
```

Test connection:
```bash
curl -H "Authorization: Bearer $DIRECTUS_API_KEY" \
  "https://[your-project].directus.app/api/server/info"
```

---

## 📋 Collections Overview

### 1. **Consoles** (Gaming Systems)
**Purpose**: Database of gaming consoles (Nintendo, PlayStation, Sega, etc.)

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | UUID | Yes | Auto-generated |
| `slug` | String | Yes | URL-friendly: `playstation-2`, `nintendo-64` |
| `name` | String | Yes | Display name: "PlayStation 2" |
| `tier` | Select | Yes | S, A, or B (popularity tier) |
| `release_year` | Integer | No | e.g., 2000 |
| `manufacturer` | String | No | e.g., "Sony" |
| `description_short` | Text | No | 50-100 words overview |
| `seo_title` | String | No | HTML title tag |
| `seo_meta` | String | No | Meta description |
| `persona_primary` | String | Yes | Primary target audience |
| `persona_secondary` | String | No | Secondary audience |
| `technical_level` | Integer | No | 1-5 (1=easy, 5=expert) |
| `status` | Select | Yes | draft, review, published |

**Example**:
```json
{
  "slug": "playstation-2",
  "name": "PlayStation 2",
  "tier": "S",
  "release_year": 2000,
  "manufacturer": "Sony",
  "description_short": "The best-selling console of all time...",
  "persona_primary": "nostalgic-gamer",
  "status": "published"
}
```

---

### 2. **Guides** (How-To Articles)
**Purpose**: Detailed guides for each console (setup, maintenance, game recommendations)

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | UUID | Yes | Auto-generated |
| `slug` | String | Yes | e.g., `ps2-setup-guide` |
| `title` | String | Yes | Display title |
| `guide_type` | String | No | setup, maintenance, game-recs |
| `console_id` | UUID | No | Link to Consoles collection |
| `description` | Text | No | 1-2 sentence summary |
| `content_v1` | Rich Text | No | Markdown for novice (V1) |
| `content_v2` | Rich Text | No | Markdown for intermediate (V2) |
| `content_v3` | Rich Text | No | Markdown for expert (V3) |
| `seo_title` | String | No | HTML title |
| `seo_meta` | String | No | Meta description |
| `persona_primary` | String | Yes | Target persona |
| `technical_level` | Integer | No | 1-5 |
| `status` | Select | Yes | draft, review, published |

**Rich Text Editor**: Uses Markdown format
- Headers: `# Heading`, `## Subheading`
- Bold: `**text**`
- Links: `[Link text](https://example.com)`
- Lists: `- item 1`, `- item 2`

**Example**:
```
# PlayStation 2 Setup Guide

## Prerequisites
- PowerCable
- AV cables...

## Installation
1. Unbox your PS2
2. Connect power...
```

---

### 3. **Accessories** (Hardware & Peripherals)
**Purpose**: Controllers, cables, protective cases, etc.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | UUID | Yes | Auto-generated |
| `slug` | String | Yes | e.g., `ps2-controller-dualshock` |
| `name` | String | Yes | e.g., "DualShock 2 Controller" |
| `category` | String | Yes | controller, cable, case, memory, other |
| `description` | Text | No | Details about the accessory |
| `status` | Select | Yes | draft, review, published |

**Example**:
```json
{
  "name": "DualShock 2 Controller",
  "category": "controller",
  "description": "Official wireless controller for PS2"
}
```

---

### 4. **Videos** (Embedded Content)
**Purpose**: YouTube videos, YouTube Shorts, and contextual video intros

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | UUID | Yes | Auto-generated |
| `title` | String | Yes | e.g., "PlayStation 2 Unboxing" |
| `platform` | String | No | youtube, youtube-shorts, twitch |
| `url` | String | Yes | Full embed URL |
| `contextual_intro` | Text | No | 1-2 sentence intro shown before video |

**Video URL Format**:
- YouTube: `https://www.youtube.com/embed/[VIDEO_ID]`
- YouTube Shorts: `https://www.youtube.com/embed/[VIDEO_ID]`
- Extract VIDEO_ID from `https://youtu.be/[VIDEO_ID]` or `https://www.youtube.com/watch?v=[VIDEO_ID]`

**Example**:
```json
{
  "title": "PS2 Full Setup Guide",
  "platform": "youtube",
  "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "contextual_intro": "Watch this expert guide to setting up your PS2 safely..."
}
```

---

### 5. **Images** (Media Library)
**Purpose**: Artwork, screenshots, console photos for site pages

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | UUID | Yes | Auto-generated |
| `filename` | String | Yes | e.g., `ps2-hero.jpg` |
| `alt` | String | Yes | Alt text for accessibility |
| `source_type` | String | No | official, user-submitted, generated |
| `lazy` | Boolean | No | Enable lazy loading? (default: true) |

**Image Upload**:
1. Click "Create" in Images collection
2. Upload image file (JPG, PNG, WebP)
3. Fill in fields (filename, alt text)
4. Click "Save"

**Best Practices**:
- Use descriptive filenames: `ps2-console-front.jpg`
- Alt text should be specific: "White PlayStation 2 console from front" not "image"
- Lazy loading: Enable for images below the fold

---

### 6. **Affiliate Config** (Monetization Settings)
**Purpose**: Configure Amazon Associates and eBay affiliate links

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | UUID | Yes | Auto-generated |
| `type` | String | Yes | amazon, ebay |
| `enabled` | Boolean | No | Toggle on/off |
| `amazon_tag` | String | No | Your Amazon Associates tag |
| `ebay_campid` | String | No | eBay campaign ID |
| `ebay_customid` | String | No | eBay custom ID |

**Amazon Setup**:
1. Join [Amazon Associates](https://affiliate-program.amazon.com)
2. Generate your tracking ID (e.g., `jeuxvideooneagain-21`)
3. Store in `amazon_tag` field

**eBay Setup**:
1. Join [eBay EPN](https://ebaypartners.com)
2. Get your Campaign ID and Custom ID
3. Store in respective fields

**Example**:
```json
{
  "type": "amazon",
  "enabled": true,
  "amazon_tag": "jeuxvideooneagain-21"
}
```

---

## 🚀 Content Workflow

### Creating a New Console Entry

**Step 1: Gather Info**
- Console name, manufacturer, release year
- Short description (50-100 words)
- Primary persona (nostalgic-gamer, casual-buyer, collector, technical-enthusiast, budget-conscious)

**Step 2: Create in Directus**
1. Go to **Collections → Consoles**
2. Click **+ Create** button
3. Fill in fields:
   ```
   Slug: playstation-2
   Name: PlayStation 2
   Tier: S
   Release Year: 2000
   Manufacturer: Sony
   Description: The best-selling console...
   Persona Primary: nostalgic-gamer
   Status: draft
   ```
4. Click **Save**

**Step 3: Review & Publish**
1. Edit draft entry
2. Verify all fields correct
3. Change Status → **published**
4. Click **Save**

**Entry now appears on website** ✅

### Creating a New Guide

**Step 1: Plan Content**
- Choose console to guide (link via `console_id`)
- Decide guide type: setup, maintenance, game-recs
- Determine target audience (personas)

**Step 2: Write Versions**
Create 3 versions of same guide:
- **V1 (Novice)**: Simple steps, minimal jargon, lots of visuals
- **V2 (Intermediate)**: Technical details, troubleshooting
- **V3 (Expert)**: Advanced tips, optimization, deep dives

**Step 3: Create in Directus**
1. Go to **Collections → Guides**
2. Click **+ Create**
3. Fill in:
   ```
   Slug: ps2-setup-beginners
   Title: PlayStation 2 Setup Guide
   Guide Type: setup
   Console ID: [Select PS2 console]
   Content V1: [Markdown for beginners]
   Content V2: [Markdown for intermediate]
   Content V3: [Markdown for experts]
   Persona Primary: nostalgic-gamer
   Status: draft
   ```
4. Click **Save**

**Step 4: Test & Publish**
1. Navigate to console page on live site
2. Select "Beginner / Intermediate / Expert"
3. Verify guide content displays correctly
4. If OK → Change Status → **published**

**All 3 versions now live** ✅

---

## 🔄 Publishing Workflow

```
DRAFT → REVIEW → PUBLISHED
  ↓        ↓         ↓
Editing   Review    Live on site
          by admin
```

**Status Values**:
- **draft**: Only visible to admin, not on site
- **review**: Marked for review, not on site yet
- **published**: Live on website immediately

**To Publish**:
1. Open entry (Console, Guide, etc.)
2. Scroll to **Status** field
3. Click dropdown → Select **published**
4. Click **Save**
5. Wait 2-5 min for cache clear
6. Visit website to verify live

---

## 🖼️ Uploading Images

**Method 1: Direct Upload (Recommended)**
1. Go to **Collections → Images**
2. Click **+ Create**
3. Click file upload box
4. Select JPG/PNG/WebP file (max 10 MB)
5. Fill fields:
   ```
   Filename: ps2-console.jpg
   Alt: White PS2 console from front
   Lazy: true
   ```
6. Click **Save**

**Method 2: Bulk Upload**
1. Go to **Settings → File Library**
2. Click **Upload** button
3. Drag & drop multiple files
4. Files auto-created in library
5. Edit each to add alt text, metadata

**Image Best Practices**:
- Format: JPG (photos), PNG (graphics), WebP (web)
- Size: < 500 KB per file
- Dimensions: 1200×800 px (horizontal), 800×1200 px (vertical)
- Alt text: Descriptive, specific, 5-10 words

---

## 🔐 Roles & Permissions

**Admin** (You):
- Create, read, update, delete all content
- Access settings
- Manage users and permissions
- Export data

**Editor** (Content team):
- Create, read, update drafts
- Cannot delete
- Cannot access settings
- Cannot publish

**Viewer** (Optional):
- Read-only access
- No create, edit, delete
- No settings access

**To Invite Users**:
1. Go to **Settings → Users**
2. Click **+ Create**
3. Enter email address
4. Assign role (Editor, Viewer)
5. Send invite (auto-email sent)

---

## 🐛 Troubleshooting

### Issue: Can't login to Directus
**Solution**:
- Check email spelling
- Check inbox for password reset email
- Try password reset: https://[your-project].directus.app/forgot-password
- Contact Directus support

### Issue: Collections don't appear
**Solution**:
- Refresh page (Cmd+R or Ctrl+F5)
- Clear browser cache (Settings → Privacy)
- Check internet connection
- Try different browser

### Issue: Changes not showing on website
**Solution**:
- Verify Status = "published" (not draft)
- Wait 2-5 min for cache clear
- Hard refresh website (Cmd+Shift+R)
- Check Eleventy build logs (ask developer)

### Issue: Image upload fails
**Solution**:
- Check file size (< 10 MB)
- Check file format (JPG, PNG, WebP only)
- Try different image
- Contact Directus support

### Issue: Rich text editor not working
**Solution**:
- Try different browser
- Disable browser extensions
- Clear browser cache
- Try Firefox/Chrome (if using Safari)

---

## 📞 Support

**Directus Documentation**: https://docs.directus.io  
**Directus Community**: https://directus.app/community  
**Contact Admin**: [Your email here]

---

**Last Updated**: January 19, 2025  
**Version**: 1.0
