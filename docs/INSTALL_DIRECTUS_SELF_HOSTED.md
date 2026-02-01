# 🖥️ Directus Self-Hosted Installation Guide

**For**: jeux-video-occasion.com  
**Installation**: Docker Compose (recommended) or Manual  
**Database**: PostgreSQL 15 (included in Docker setup)  
**Last Updated**: 2025-01-19

---

## 📋 Prerequisites

### Option A: Docker (Easiest)
- **Docker**: https://docs.docker.com/get-docker/
- **Docker Compose**: https://docs.docker.com/compose/install/
- **Disk space**: 5 GB minimum
- **RAM**: 2 GB minimum

### Option B: Manual Installation
- **Node.js**: v18+ (https://nodejs.org/)
- **PostgreSQL**: v12+ (https://www.postgresql.org/download/)
- **npm**: Comes with Node.js

### Option C: Server/VPS
- Linux (Ubuntu 20.04+, CentOS 8+, Debian 10+)
- Docker + Docker Compose installed
- Port 8055 available (or change in .env)
- 50 GB disk space (for data growth)

---

## 🚀 Installation Options

### ✅ Option 1: Docker Compose (Recommended)

**Most reliable and easiest method.**

#### Step 1: Prepare Configuration

```bash
# Copy the environment template
cp .env.example .env.directus

# Edit the file with your settings
nano .env.directus
# Or: vim .env.directus
```

**Important variables to customize**:
```bash
# Database credentials (change in production)
DB_USER=directus
DB_PASSWORD=YOUR_SECURE_PASSWORD

# Directus security keys (generate these)
DIRECTUS_KEY=YOUR_32_CHAR_KEY
DIRECTUS_SECRET=YOUR_32_CHAR_SECRET

# Admin account
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD

# Public URL (where Directus will be accessible)
PUBLIC_URL=http://localhost:8055
# For production: PUBLIC_URL=https://directus.yourdomain.com

# CORS (allow your website to access API)
CORS_ORIGIN=https://jeux-video-occasion.com
```

#### Step 2: Run Installation Script

```bash
# Make script executable
chmod +x scripts/install-directus-self-hosted.sh

# Run installation
bash scripts/install-directus-self-hosted.sh
```

**What this does**:
1. ✅ Checks Docker & Docker Compose installed
2. ✅ Generates secure keys
3. ✅ Creates PostgreSQL database
4. ✅ Starts Directus container
5. ✅ Verifies connection
6. ✅ Shows access details

#### Step 3: Access Directus Admin

```
URL: http://localhost:8055
Email: (from .env.directus)
Password: (from .env.directus)
```

✅ **Installation complete!**

---

### ⚡ Option 2: Manual Docker Compose

**If you prefer manual control:**

```bash
# Start services
docker-compose up -d

# Wait for services to be healthy
docker-compose ps

# Check logs
docker-compose logs -f jvo-directus

# Access Directus
# URL: http://localhost:8055
```

---

### 🛠️ Option 3: Manual Installation (Without Docker)

**For advanced users or specific environments.**

#### Step 1: Install PostgreSQL

**On Ubuntu/Debian**:
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Create database**:
```bash
sudo -u postgres createdb directus
sudo -u postgres createuser directus
sudo -u postgres psql -c "ALTER USER directus WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE directus TO directus;"
```

#### Step 2: Install Node.js

**Using nvm (recommended)**:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
node --version  # Should show v18+
```

#### Step 3: Install Directus

```bash
# Create directory for Directus
mkdir ~/directus-app
cd ~/directus-app

# Initialize npm project
npm init -y

# Install Directus
npm install directus

# Create .env file
cat > .env << EOF
DB_CLIENT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=directus
DB_USER=directus
DB_PASSWORD=your_password

KEY=your-secret-key-minimum-32-chars
SECRET=your-secret-secret-minimum-32-chars

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password

PUBLIC_URL=http://localhost:8055
CORS_ORIGIN=*
EOF
```

#### Step 4: Start Directus

```bash
# Run migrations (first time only)
npx directus bootstrap

# Start Directus (development)
npx directus start

# For production (use PM2)
npm install -g pm2
pm2 start node_modules/directus/dist/start.js --name directus
pm2 startup
pm2 save
```

---

## 🔐 Production Setup

### Using a VPS or Dedicated Server

#### Prerequisites
- Linux server (Ubuntu 20.04+ recommended)
- Domain name (e.g., directus.yourdomain.com)
- SSL certificate (Let's Encrypt, free)
- SSH access to server

#### Step 1: Install Docker on Server

```bash
# SSH into server
ssh root@your-vps-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker --version
docker-compose --version
```

#### Step 2: Setup Project on Server

```bash
# Create app directory
sudo mkdir -p /opt/jvo-directus
sudo chown $USER:$USER /opt/jvo-directus
cd /opt/jvo-directus

# Copy project files
scp docker-compose.yml .env.directus your-user@your-vps-ip:/opt/jvo-directus/
scp scripts/install-directus-self-hosted.sh your-user@your-vps-ip:/opt/jvo-directus/scripts/
```

#### Step 3: Run Installation

```bash
# SSH into server again
ssh your-user@your-vps-ip
cd /opt/jvo-directus

# Edit .env for production
nano .env.directus
# Set:
#   PUBLIC_URL=https://directus.yourdomain.com
#   CORS_ORIGIN=https://jeux-video-occasion.com
#   NODE_ENV=production

# Run installation
bash scripts/install-directus-self-hosted.sh
```

#### Step 4: Setup Reverse Proxy (Nginx)

```bash
# Install Nginx
sudo apt-get install nginx

# Create config
sudo nano /etc/nginx/sites-available/directus
```

**Nginx config**:
```nginx
server {
    listen 80;
    server_name directus.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:8055;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/directus /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 5: Setup SSL (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d directus.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

✅ **Directus is now live at**: https://directus.yourdomain.com

---

## 📊 Container Management

### Start/Stop Directus

```bash
# Start (if stopped)
docker-compose up -d

# Stop
docker-compose down

# Restart
docker-compose restart

# Restart specific service
docker-compose restart jvo-directus
```

### View Logs

```bash
# View logs
docker-compose logs

# Follow logs (live)
docker-compose logs -f jvo-directus

# Logs for postgres
docker-compose logs -f postgres

# Last 100 lines
docker-compose logs --tail=100 jvo-directus
```

### Access Database

```bash
# Access PostgreSQL CLI
docker-compose exec postgres psql -U directus -d directus

# Useful SQL commands
\l              # List databases
\d              # List tables
\q              # Quit
```

---

## 🔧 Configuration

### Security Keys Generation

**Generate secure keys**:
```bash
# Generate 32-char key
openssl rand -base64 32

# Generate 32-char secret
openssl rand -base64 32
```

**Add to .env.directus**:
```bash
DIRECTUS_KEY=your-generated-key
DIRECTUS_SECRET=your-generated-secret
```

### Update Configuration

**To change settings, edit .env.directus then restart**:
```bash
# Edit
nano .env.directus

# Restart (changes apply)
docker-compose restart jvo-directus
```

### Backup Database

```bash
# Backup PostgreSQL
docker-compose exec postgres pg_dump -U directus directus > backup.sql

# Restore from backup
docker-compose exec -T postgres psql -U directus directus < backup.sql
```

### Increase File Upload Limit

```bash
# In .env.directus, add:
FILE_UPLOAD_SIZE_LIMIT=52428800  # 50MB

# Restart
docker-compose restart jvo-directus
```

---

## 📍 Accessing Directus

### Local Access

```
URL: http://localhost:8055
Email: admin@jvo.local
Password: (from .env.directus)
```

### Remote Access (VPS)

```
URL: https://directus.yourdomain.com
Email: your-admin@example.com
Password: (from .env.directus)
```

### API Access

```bash
# Get your API key (after login):
# Settings → API Keys → Create

# Test API
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "http://localhost:8055/server/info"

# Should return:
# {
#   "data": {
#     "project": "Directus",
#     "version": "10.x.x"
#   }
# }
```

---

## 🆘 Troubleshooting

### Port Already in Use

**Error**: `bind: address already in use`

**Solution**:
```bash
# Find what's using port 8055
lsof -i :8055

# Change port in docker-compose.yml:
# ports:
#   - "8056:8055"  # Use 8056 instead

docker-compose up -d
```

### PostgreSQL Connection Failed

**Error**: `could not connect to database`

**Solution**:
```bash
# Check database logs
docker-compose logs postgres

# Verify PostgreSQL is running
docker-compose ps postgres

# Recreate database
docker-compose down -v
docker-compose up -d
```

### Directus Won't Start

**Error**: `ECONNREFUSED` or service unhealthy

**Solution**:
```bash
# Check logs
docker-compose logs jvo-directus

# Wait longer (databases take time to initialize)
sleep 10
docker-compose ps

# If still failing, restart
docker-compose restart jvo-directus
```

### Can't Login

**Error**: `Invalid credentials`

**Solution**:
```bash
# Check admin credentials in .env.directus
cat .env.directus | grep ADMIN

# Verify email and password are correct
# Note: Email must exactly match ADMIN_EMAIL

# Reset admin password (docker-compose running)
docker-compose exec directus npx directus users:update-me \
  --email "admin@jvo.local" \
  --password "new_password"
```

### File Uploads Not Working

**Error**: `EACCES: permission denied` or `Cannot create uploads directory`

**Solution**:
```bash
# Check permissions
docker-compose exec directus ls -la /directus/uploads

# Restart Directus
docker-compose restart jvo-directus

# Or fix permissions
docker-compose exec directus chmod -R 755 /directus/uploads
```

---

## 📚 Next Steps

### 1. Create Collections (T2.2)
```bash
npm run directus:setup
```

### 2. Create API Key
- Login to Directus
- Settings → API Keys → Create
- Copy token
- Save in .env: `DIRECTUS_API_KEY=...`

### 3. Test API
```bash
npm run directus:export
```

### 4. Configure Security (T2.5)
- CORS whitelist
- Rate limiting
- Audit logs
- HTTPS (production)

---

## 📞 Support

- **Directus Docs**: https://docs.directus.io
- **Docker Docs**: https://docs.docker.com
- **PostgreSQL Docs**: https://www.postgresql.org/docs

---

**Installation Type**: Self-Hosted  
**Method**: Docker Compose (recommended)  
**Status**: Ready to start

