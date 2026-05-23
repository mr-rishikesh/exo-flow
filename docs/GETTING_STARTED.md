# Getting Started with CXO TechBOT Backend

Welcome! This guide will get you up and running in 5 minutes.

## ✅ Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
```bash
npm start
```

**Expected output:**
```
🚀 CXO TechBOT Backend running on http://localhost:3000
📡 API Documentation:
   GET  /articles?category=ai&page=1&limit=10
   GET  /articles/categories
   GET  /events?type=masterclass
   GET  /playbooks?q=startup
   POST /articles/:id/click
   POST /events/:id/register
   POST /playbooks/:id/download
```

### Step 3: Test the API
```bash
# In another terminal, test:
curl http://localhost:3000/articles
```

**Done!** 🎉 Your API is running.

---

## 📚 Understanding the Project

### What You Have
- ✅ Complete Express.js backend
- ✅ 10 sample articles, 7 events, 7 playbooks
- ✅ Search, filter, sort, pagination
- ✅ Click/registration/download tracking
- ✅ Engati chatbot integration ready
- ✅ Production-ready code structure

### What You Need to Know

**The API returns clean JSON arrays:**
```json
[
  {
    "title": "Article Title",
    "summary": "Summary...",
    "url": "https://link.com"
  }
]
```

**Engati can read this with:**
```
$array.title$     → "Article Title"
$array.summary$   → "Summary..."
$array.url$       → "https://link.com"
```

---

## 🎯 First Tests

### Test Articles
```bash
# Get all articles
curl http://localhost:3000/articles

# Get AI articles
curl "http://localhost:3000/articles?category=ai"

# Search for "GenAI"
curl "http://localhost:3000/articles?q=genai"

# Get trending (by clicks)
curl "http://localhost:3000/articles?sort=trending"

# Get 5 latest articles
curl "http://localhost:3000/articles?limit=5"
```

### Test Events
```bash
# Get all events
curl http://localhost:3000/events

# Get masterclasses
curl "http://localhost:3000/events?type=masterclass"

# Most registrations first
curl "http://localhost:3000/events?sort=registrations"
```

### Test Playbooks
```bash
# Get all playbooks
curl http://localhost:3000/playbooks

# AI playbooks
curl "http://localhost:3000/playbooks?category=ai"

# Most downloads
curl "http://localhost:3000/playbooks?sort=downloads"
```

---

## 📁 Project Structure (What's What?)

```
📦 cxo-bot-cms-backend/
│
├─ 🚀 server.js              ← Starts the server (npm start)
├─ 📦 package.json           ← Dependencies list
│
├─ 📖 README.md              ← Full documentation (start here)
├─ ⚡ QUICKSTART.md          ← Basic setup (5 min)
├─ 🧪 API_TESTING.md         ← Test examples (50+ tests)
├─ 🏗️  ARCHITECTURE.md       ← How it works inside
├─ 🚀 DEPLOYMENT.md          ← How to deploy (6 options)
├─ 📋 GETTING_STARTED.md     ← This file
│
├─ 📂 routes/                ← HTTP routes
│   ├─ articles.js
│   ├─ events.js
│   └─ playbooks.js
│
├─ 🎮 controllers/           ← Business logic
│   ├─ articleController.js
│   ├─ eventController.js
│   └─ playbookController.js
│
├─ 🔧 services/              ← Helper utilities
│   ├─ DataService.js        ← Loads data from files
│   └─ FilterService.js      ← Filters, sorts, paginates
│
└─ 📊 data/                  ← Your data files
    ├─ articles.json         ← 10 sample articles
    ├─ events.json           ← 7 sample events
    ├─ playbooks.json        ← 7 sample playbooks
    └─ analytics.json        ← Click tracking
```

---

## 🔗 Connecting to Engati

### In Engati Bot Builder

1. **Create a Custom Action:**
   ```
   Name: Get Articles
   URL: http://localhost:3000/articles?category=ai&limit=3
   Method: GET
   ```

2. **Use in Message:**
   ```
   Here are AI articles:
   
   $array.title$
   $array.summary$
   
   Read: $array.url$
   ```

3. **Available Variables:**
   - `$array.title$` - Article title
   - `$array.summary$` - Short description
   - `$array.url$` - Link to full article
   - `$array.tags$` - Topic tags
   - `$array.clicks$` - Popular metric

---

## 🔄 Main Endpoints

| Endpoint | What It Does | Example |
|----------|--------------|---------|
| `GET /articles` | Get articles | `/articles?category=ai&limit=5` |
| `GET /events` | Get events | `/events?type=masterclass` |
| `GET /playbooks` | Get playbooks | `/playbooks?q=startup` |
| `POST /articles/:id/click` | Track clicks | `/articles/art-001/click` |
| `POST /events/:id/register` | Track registrations | `/events/evt-001/register` |
| `POST /playbooks/:id/download` | Track downloads | `/playbooks/pb-001/download` |

---

## ⚙️ Customization

### Add More Articles
Edit `data/articles.json`:
```json
{
  "id": "art-011",
  "category": "ai",
  "subcategory": "genai",
  "title": "Your New Article",
  "summary": "Brief summary...",
  "url": "https://your-url.com",
  "tags": ["AI", "NewTopic"],
  "createdAt": "2026-04-20",
  "clicks": 0
}
```

### Change Default Limit
In `FilterService.js`, line 48:
```javascript
limit: options.limit || 10,  // Change 10 to something else
```

### Add New Sorting Option
In `FilterService.js`, expand the `sort()` method:
```javascript
} else if (sortBy === 'alphabetical') {
  sorted.sort((a, b) => a.title.localeCompare(b.title));
}
```

---

## 🐛 Common Issues & Fixes

### "Cannot find module 'express'"
```bash
npm install
```

### "Port 3000 already in use"
```bash
PORT=4000 npm start
```

### "data/articles.json not found"
Make sure you're in the right directory:
```bash
cd "c:/AI LifeBot/cxo-bot-cms-backend"
npm start
```

### "CORS error from Engati"
CORS is already enabled. If still failing:
- Check your Engati domain
- Verify internet connection
- Restart the server

---

## 📊 How Data Flows

```
Engati Bot
    ↓
Sends: GET /articles?category=ai
    ↓
Server receives request
    ↓
articleController.getArticles()
    ↓
DataService loads data/articles.json
    ↓
FilterService filters by category
    ↓
Returns clean JSON array
    ↓
Engati displays results to user
    ↓
User clicks article
    ↓
POST /articles/:id/click
    ↓
Click count updated in analytics.json
```

---

## 🎓 Learning Path

### Beginner
1. Run `npm start`
2. Test endpoints with curl
3. Edit data files
4. Connect to Engati

### Intermediate
1. Read ARCHITECTURE.md
2. Understand request flow
3. Add new endpoints
4. Custom filters

### Advanced
1. Add database (PostgreSQL)
2. Add authentication
3. Deploy to production
4. Scale to millions of users

---

## 📖 What to Read Next

| Document | When | Time |
|----------|------|------|
| README.md | Full details | 15 min |
| API_TESTING.md | Want to test everything | 20 min |
| ARCHITECTURE.md | Want to understand design | 20 min |
| DEPLOYMENT.md | Ready to go live | 30 min |

---

## ✨ Key Features

✅ **Filtering** - By category, subcategory, type  
✅ **Search** - Case-insensitive on title  
✅ **Pagination** - Built-in page/limit support  
✅ **Sorting** - Latest, trending, registrations, downloads  
✅ **Analytics** - Auto-tracking of clicks/registrations  
✅ **Categories** - Dynamic category listing  
✅ **Clean JSON** - No wrapper objects (Engati-friendly)  
✅ **CORS** - Enabled for all domains  
✅ **Error Handling** - Graceful error responses  
✅ **Modular** - Easy to extend and maintain  

---

## 🚀 Next Steps

### Immediate
- [ ] Run `npm install && npm start`
- [ ] Test 3 API endpoints
- [ ] Connect to Engati

### This Week
- [ ] Read full README.md
- [ ] Test all endpoints (API_TESTING.md)
- [ ] Add your own articles

### This Month
- [ ] Deploy to production
- [ ] Set up monitoring
- [ ] Add email notifications

---

## 📞 Questions?

Check these in order:
1. **QUICKSTART.md** - Basic setup
2. **README.md** - Full documentation
3. **API_TESTING.md** - How to test
4. **ARCHITECTURE.md** - How it works inside
5. **DEPLOYMENT.md** - Deployment options

---

## 🎉 You're Ready!

Your production-ready backend is complete. Start building! 🚀

**Next:** `npm start` and then read README.md for full documentation.
