# Parallel Hearts - Installation Guide

Complete step-by-step instructions to build and deploy Parallel Hearts from scratch on a new server.

---

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** v18.0.0 or higher
- **pnpm** package manager (v8.0.0 or higher)
- **Git** (optional, for version control)
- **Linux/Unix server** (Ubuntu 22.04 recommended)
- **Supabase account** (for backend services)

---

## 🚀 Installation Steps

### Step 1: Install Node.js and pnpm

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (using NodeSource repository)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
node --version  # Should show v20.x.x or higher

# Install pnpm globally
npm install -g pnpm

# Verify pnpm installation
pnpm --version  # Should show v8.x.x or higher
```

### Step 2: Extract Project Files

```bash
# Create project directory
mkdir -p /var/www/parallel-hearts
cd /var/www/parallel-hearts

# Extract the tarball (adjust path as needed)
tar -xzf parallel-hearts-complete.tar.gz

# Verify extraction
ls -la
# You should see: src/, public/, package.json, vite.config.js, etc.
```

### Step 3: Configure Environment Variables

```bash
# Create .env file from example
cp .env.example .env

# Edit .env file with your credentials
nano .env
```

**Required environment variables:**

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Analytics
VITE_ANALYTICS_WEBSITE_ID=your-analytics-id
VITE_ANALYTICS_ENDPOINT=https://your-analytics-endpoint.com
```

**To get Supabase credentials:**
1. Go to https://supabase.com
2. Create a new project (or use existing)
3. Go to Settings → API
4. Copy the Project URL and anon/public key

### Step 4: Install Dependencies

```bash
# Install all project dependencies
pnpm install

# This will install ~460 packages and take 1-2 minutes
# Wait for "Done in X.Xs" message
```

### Step 5: Build the Application

```bash
# Build for production
pnpm run build

# This creates a 'dist' folder with optimized files
# Build should complete in ~10 seconds
```

**Verify build success:**
```bash
ls -lh dist/
# You should see: index.html, assets/ folder
```

### Step 6: Deploy Supabase Edge Functions

The application uses 3 Edge Functions for AI analysis:

#### 6.1 Install Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Verify installation
supabase --version
```

#### 6.2 Login to Supabase

```bash
# Login with your Supabase account
supabase login

# Link to your project
supabase link --project-ref your-project-ref
```

#### 6.3 Deploy Edge Functions

```bash
# Navigate to functions directory (if you have it)
# Or manually deploy via Supabase dashboard

# Function 1: analyze-conversation
# Go to Supabase Dashboard → Edge Functions → New Function
# Name: analyze-conversation
# Copy code from: /supabase-functions/analyze-conversation/index.ts

# Function 2: analyze-assessment  
# Name: analyze-assessment
# Copy code from: /supabase-functions/analyze-assessment/index.ts

# Function 3: transcribe-voice
# Name: transcribe-voice
# Copy code from: /supabase-functions/transcribe-voice/index.ts
```

**Set function secrets:**
```bash
# In Supabase Dashboard → Edge Functions → Settings
# Add these secrets:
ANTHROPIC_API_KEY=your-claude-api-key
OPENAI_API_KEY=your-openai-api-key
```

### Step 7: Serve the Application

#### Option A: Development Server (for testing)

```bash
# Start development server
pnpm run dev

# Server will start on http://localhost:5173
# Press Ctrl+C to stop
```

#### Option B: Production Preview (local)

```bash
# Serve the built files
pnpm run preview

# Server will start on http://localhost:4173
```

#### Option C: Production Server (with Nginx)

**Install Nginx:**
```bash
sudo apt install -y nginx
```

**Configure Nginx:**
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/parallel-hearts
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Change to your domain
    
    root /var/www/parallel-hearts/dist;
    index index.html;
    
    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Enable the site:**
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/parallel-hearts /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx
```

**Your site is now live at:** `http://your-server-ip` or `http://your-domain.com`

#### Option D: Production Server (with PM2 + Serve)

```bash
# Install PM2 and serve globally
npm install -g pm2 serve

# Serve the dist folder on port 3000
pm2 serve dist 3000 --name parallel-hearts --spa

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions shown

# Check status
pm2 status
```

**Your site is now live at:** `http://your-server-ip:3000`

---

## 🔧 Configuration Options

### Customize Port (Development)

Edit `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000,  // Change port here
    host: '0.0.0.0'
  }
})
```

### Enable HTTPS (Production)

**With Nginx + Let's Encrypt:**
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

---

## 🧪 Testing the Installation

### Test 1: Check if site loads
```bash
curl http://localhost:5173  # Dev server
# or
curl http://localhost:4173  # Preview server
# or  
curl http://localhost        # Nginx

# Should return HTML content
```

### Test 2: Check API connectivity
Open browser and navigate to your site, then:
1. Select a relationship type (Romantic/Family/Business)
2. Click "Share the Conversations"
3. Paste sample text
4. Click "Analyze"
5. Should see loading animation and then results

### Test 3: Check Supabase connection
```bash
# Check browser console (F12)
# Should not see any Supabase connection errors
```

---

## 📦 Project Structure

```
parallel-hearts/
├── src/                          # Source code
│   ├── pages/                    # React pages
│   │   ├── Landing.jsx          # Landing page with retro TV images
│   │   ├── Welcome.jsx          # 3-option welcome page
│   │   ├── AssessmentQuestionnaire.jsx  # Gamified assessment
│   │   ├── VoiceMessage.jsx     # Voice recording
│   │   ├── LoadingRealities.jsx # Analysis loading
│   │   └── ...
│   ├── components/ui/           # UI components (Radix UI)
│   ├── data/                    # Data files
│   │   └── assessmentQuestions.js  # 12 Realms questions
│   ├── lib/                     # Utilities
│   │   ├── supabase.js         # Supabase client
│   │   └── utils.js            # Helper functions
│   ├── assets/                  # Images and media
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
├── public/                      # Static assets
│   ├── images/                  # Retro TV images
│   │   ├── romantic-tv.png
│   │   ├── family-tv.png
│   │   └── business-tv.png
│   └── videos/                  # Video assets
│       └── avatar.mp4
├── dist/                        # Built files (after build)
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── .env                        # Environment variables
├── .env.example                # Environment template
├── INSTALL.md                  # This file
└── README.md                   # Project documentation
```

---

## 🎮 Features Included

### Landing Page
- ✅ Retro TV images for each relationship type
- ✅ Animated neon borders and glow effects
- ✅ Responsive design

### Welcome Page
- ✅ 3 equal-sized option boxes
- ✅ Share conversations (paste/upload)
- ✅ Answer questions (assessment)
- ✅ Record audio message

### Gamified Assessment
- ✅ 12 Realms of Relational Self
- ✅ Points system (+10 per answer, +50 per realm)
- ✅ 7 badges to unlock
- ✅ 12 realm characters with messages
- ✅ Streak counter
- ✅ Progress tracking
- ✅ Encouragement messages

### AI Analysis
- ✅ Claude-powered psychological analysis
- ✅ 5-10 parallel reality scenarios
- ✅ 14 relationship archetypes
- ✅ Jungian, Attachment, Enneagram frameworks

### Voice Recording
- ✅ Browser-based audio recording
- ✅ OpenAI Whisper transcription
- ✅ Automatic text analysis

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'react-router-dom'"
```bash
# Install missing dependency
pnpm add react-router-dom
```

### Issue: "Supabase connection error"
```bash
# Check .env file has correct credentials
cat .env

# Verify Supabase project is active
# Go to https://supabase.com and check project status
```

### Issue: "Build fails with TypeScript errors"
```bash
# The project uses JSX, TypeScript errors can be ignored
# Or remove TypeScript checking from build:
# Edit package.json, change build script to:
"build": "vite build --mode production"
```

### Issue: "Port already in use"
```bash
# Find process using the port
sudo lsof -i :5173

# Kill the process
kill -9 <PID>

# Or use a different port (edit vite.config.js)
```

### Issue: "Permission denied" when serving
```bash
# Give proper permissions
sudo chown -R $USER:$USER /var/www/parallel-hearts

# Or run with sudo (not recommended)
sudo pnpm run preview
```

---

## 🔄 Updating the Application

```bash
# Pull latest changes (if using git)
git pull origin main

# Reinstall dependencies (if package.json changed)
pnpm install

# Rebuild
pnpm run build

# Restart server
pm2 restart parallel-hearts
# or
sudo systemctl restart nginx
```

---

## 📊 Performance Optimization

### Enable Compression
Already configured in Nginx example above.

### CDN for Static Assets
Consider using a CDN for:
- `/public/images/*.png` (retro TV images ~1.8MB each)
- `/public/videos/avatar.mp4` (if using video)

### Database Optimization
- Enable Supabase connection pooling
- Add indexes on frequently queried fields
- Use Supabase caching for Edge Functions

---

## 🔒 Security Considerations

### Environment Variables
- ✅ Never commit `.env` to git
- ✅ Use `.env.example` as template
- ✅ Rotate API keys regularly

### Supabase Security
- ✅ Enable Row Level Security (RLS)
- ✅ Set up proper authentication
- ✅ Use anon key for client-side only

### Server Security
```bash
# Enable firewall
sudo ufw enable
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp

# Keep system updated
sudo apt update && sudo apt upgrade -y
```

---

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review Supabase documentation: https://supabase.com/docs
- Review Vite documentation: https://vitejs.dev

---

## 📝 License

This project is proprietary. All rights reserved.

---

## ✅ Installation Checklist

- [ ] Node.js v18+ installed
- [ ] pnpm installed
- [ ] Project files extracted
- [ ] .env configured with Supabase credentials
- [ ] Dependencies installed (`pnpm install`)
- [ ] Application built (`pnpm run build`)
- [ ] Supabase Edge Functions deployed
- [ ] Server configured (Nginx or PM2)
- [ ] Site accessible via browser
- [ ] All features tested (landing, welcome, assessment, analysis)
- [ ] HTTPS enabled (production only)
- [ ] Firewall configured (production only)

---

**Installation complete!** 🎉

Your Parallel Hearts application should now be running and accessible.

