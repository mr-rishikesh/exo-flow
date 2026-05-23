# Deployment Guide

## 🚀 Deploy Your CXO TechBOT Backend

Choose your preferred hosting platform:

---

## 🟢 Option 1: Heroku (Easiest)

### Prerequisites
- Heroku account (free tier available)
- Git installed
- Heroku CLI installed

### Steps

```bash
# 1. Initialize Git (if not done)
git init
git add .
git commit -m "Initial commit"

# 2. Login to Heroku
heroku login

# 3. Create app
heroku create your-app-name

# 4. Deploy
git push heroku main

# 5. Open app
heroku open

# View logs
heroku logs --tail
```

**App URL:** `https://your-app-name.herokuapp.com`

---

## 🔵 Option 2: Vercel (Recommended)

### Prerequisites
- Vercel account (free)
- Git installed
- Vercel CLI

### Steps

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
```

**App URL:** `https://your-project.vercel.app`

---

## 🟣 Option 3: Railway

### Steps

1. Go to railway.app
2. Connect GitHub account
3. Create new project
4. Select this repository
5. Deploy

**App URL:** Generated automatically

---

## 🟠 Option 4: DigitalOcean App Platform

### Steps

1. Go to DigitalOcean App Platform
2. Connect GitHub
3. Create new app
4. Select repository
5. Configure:
   - Runtime: Node.js
   - Build: `npm install`
   - Run: `npm start`
   - HTTP port: 3000
6. Deploy

**App URL:** `https://your-app-ondigitalocean.app`

---

## 🔴 Option 5: AWS EC2 (Full Control)

### Prerequisites
- AWS account
- EC2 instance (t2.micro free tier)
- SSH key pair

### Steps

```bash
# 1. SSH into instance
ssh -i your-key.pem ec2-user@your-instance-ip

# 2. Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs

# 3. Clone repo
git clone https://github.com/your-repo.git
cd cxo-bot-cms-backend

# 4. Install & start
npm install
npm start

# 5. Use PM2 for auto-restart
npm install -g pm2
pm2 start server.js --name "cxo-api"
pm2 startup
pm2 save
```

**App URL:** `http://your-instance-ip:3000`

---

## 🐳 Option 6: Docker + Any Host

### Create Dockerfile

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Build & Run

```bash
# Build
docker build -t cxo-api .

# Run locally
docker run -p 3000:3000 cxo-api

# Push to Docker Hub
docker tag cxo-api your-username/cxo-api
docker push your-username/cxo-api
```

### Deploy to Docker Host
```bash
docker pull your-username/cxo-api
docker run -d -p 3000:3000 your-username/cxo-api
```

---

## 📋 Pre-Deployment Checklist

- [ ] All files committed to Git
- [ ] package.json has correct start script
- [ ] No sensitive data in code (.env example provided)
- [ ] PORT environment variable supported
- [ ] CORS enabled
- [ ] Data files included in deployment
- [ ] No hardcoded localhost references
- [ ] All dependencies in package.json

---

## 🔧 Environment Variables

Create a `.env` file on your hosting platform:

```bash
PORT=3000
NODE_ENV=production
```

### Heroku
```bash
heroku config:set PORT=3000
heroku config:set NODE_ENV=production
```

### Vercel
Add to `vercel.json`:
```json
{
  "env": {
    "PORT": "3000",
    "NODE_ENV": "production"
  }
}
```

---

## 🌐 Connect to Engati

Once deployed, update your Engati bot:

1. In Engati builder
2. Create custom action
3. Set URL to your deployed API:
   ```
   https://your-app.com/articles?category=ai&limit=3
   ```

4. Use response variables:
   ```
   $array.title$
   $array.summary$
   $array.url$
   ```

---

## 🔐 SSL/HTTPS

### Heroku
Automatically included (https://your-app.herokuapp.com)

### Vercel
Automatically included

### Railway
Automatically included

### Custom Domain
Use Cloudflare (free):
1. Add domain to Cloudflare
2. Point to your app
3. Free SSL included

---

## 📊 Monitoring

### Heroku Logs
```bash
heroku logs --tail
```

### Vercel Logs
Go to Vercel dashboard → Deployments → View Logs

### Custom Server
```bash
# SSH in and check logs
tail -f /var/log/app.log
```

---

## 🚨 Troubleshooting

### App won't start
```bash
# Check logs
heroku logs --tail

# Common issue: PORT not set
# Add: process.env.PORT || 3000
```

### CORS errors from Engati
```javascript
// In server.js, ensure:
app.use(cors());
```

### Data not loading
```bash
# Check data/ folder exists
# Check JSON syntax
npm run validate-json
```

### 503 Service Unavailable
- Wait 1-2 minutes after deploy
- Check logs for errors
- Restart the app

---

## 💡 Best Practices

### 1. Use Environment Variables
```javascript
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
```

### 2. Monitor Performance
```bash
# Add simple monitoring endpoint
GET /health
```

### 3. Log Important Events
```javascript
console.log(`[${new Date().toISOString()}] Event happened`);
```

### 4. Use PM2 for Auto-Restart
```bash
pm2 start server.js
pm2 restart server.js
pm2 stop server.js
```

### 5. Database Backups
When you add a database:
```bash
# Weekly backup
0 2 * * 0 pg_dump db_name > backup.sql
```

---

## 📈 Scaling

### Phase 1: JSON (Current)
- Max: ~10k requests/day
- Storage: < 1MB
- Cost: $0-5/month

### Phase 2: Add Database
- Max: ~100k requests/day
- Storage: Scalable
- Cost: $5-20/month

### Phase 3: Add Cache (Redis)
- Max: 1M+ requests/day
- Latency: < 50ms
- Cost: $10-50/month

### Phase 4: CDN + Database + Cache
- Max: 10M+ requests/day
- Latency: < 20ms
- Cost: $50-500/month

---

## 🎯 Recommended Stack

For production, use:

1. **Hosting:** Railway or DigitalOcean
2. **Database:** PostgreSQL
3. **Cache:** Redis
4. **CDN:** Cloudflare
5. **Monitoring:** Sentry or LogRocket
6. **Analytics:** Mixpanel or Amplitude

Total cost: ~$30-50/month

---

## 📞 Support

If deployment fails:

1. Check platform logs
2. Verify all files included
3. Check Node version compatibility
4. Review .gitignore (shouldn't exclude data/)
5. Verify package.json has all dependencies

Common issues:
- Missing data/ folder → add to Git
- Wrong port → use process.env.PORT
- Module not found → npm install locally first
