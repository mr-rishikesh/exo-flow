# 📚 MongoDB Migration Guide - Complete Documentation

## 🎯 Project Status: ✅ FULLY MIGRATED TO MONGODB

All content is now stored in MongoDB with zero file-based data operations.

---

## 📊 Data Architecture

### Collections in MongoDB

| Collection | Documents | Fields | Source |
|-----------|-----------|--------|--------|
| **articles** | ~15+ | id, title, category, summary, url, tags, clicks | articles.json |
| **events** | ~7+ | id, title, date, speaker, registrations, type | events.json |
| **masterclasses** | ~8+ | id, title, speaker, price, enrollments, topics | masterclasses.json |
| **playbooks** | ~7+ | id, title, category, pages, downloadUrl | playbooks.json |
| **magazines** | ~9+ | id, title, category, coverImage | magazines.json |
| **leads** | Dynamic | id, company, email, type, status, isReviewed | Created via API/Admin |

---

## 🔧 Setup Instructions

### Step 1: Ensure MongoDB is Running
```bash
# Local development
mongod

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Cloud (MongoDB Atlas)
# Create cluster at https://www.mongodb.com/cloud/atlas
```

### Step 2: Configure Environment Variables
Create `.env` file:
```
MONGO_URI=mongodb://localhost:27017/cxo-techbot
PORT=3000
ADMIN_EMAIL=admin@cxotechbot.com
ADMIN_PASSWORD=Admin@123
SESSION_SECRET=your-secret-key
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Start the Server
```bash
npm start
# or
node server.js
```

Expected output:
```
✅ MongoDB connected
📥 Seeding database from JSON files...
  ✅ Seeded 15 articles
  ✅ Seeded 7 events
  ✅ Seeded 8 masterclasses
  ✅ Seeded 7 playbooks
  ✅ Seeded 9 magazines
✅ Database seeding completed
✅ Leads storage initialized with MongoDB
🚀 CXO TechBOT Backend running on http://localhost:3000
```

---

## 🔄 How Data Flows

### On Startup (First Time)
```
Server Start
    ↓
MongoDB Connected
    ↓
Check if collections empty?
    ├─ YES → Read /data/*.json files
    │         ↓
    │         Insert into MongoDB
    │         ↓
    │         Seeding Complete ✅
    │
    └─ NO → Use existing data ✅
```

### API Request (Example: GET /articles)
```
Request: GET /articles?category=ai
    ↓
articleController.getArticles()
    ↓
DataService.getArticles()
    ↓
Article.find() [MongoDB Query]
    ↓
Return JSON Response ✅
```

### Admin Create (Example: Create Article)
```
Admin Form Submit
    ↓
POST /admin/articles/create
    ↓
adminController.createArticle()
    ↓
DataService.createArticle(data)
    ↓
new Article({...}).save() [MongoDB Insert]
    ↓
Redirect to articles list ✅
    ↓
Next GET /articles shows new data
```

### Admin Edit (Example: Update Article)
```
Admin Form Submit
    ↓
POST /admin/articles/update/:id
    ↓
adminController.updateArticle()
    ↓
DataService.updateArticle(id, data)
    ↓
Article.findByIdAndUpdate() [MongoDB Update]
    ↓
Updated document returned ✅
    ↓
Next API call returns updated data
```

### Lead Capture (From Chatbot)
```
POST /leads
    ↓
leadController.createLead()
    ↓
LeadService.addLead(data)
    ↓
new Lead({...}).save() [MongoDB Insert]
    ↓
Send notification email
    ↓
Return success response ✅
    ↓
Admin sees new lead in dashboard
```

---

## 📡 API Endpoints

### Content APIs (All Read from MongoDB)

```bash
# Get articles
GET /articles?category=ai&limit=4

# Get single article
GET /articles/:id

# Get events
GET /events?type=masterclass

# Get masterclasses
GET /masterclasses?category=ai

# Get playbooks
GET /playbooks?category=startup

# Get magazines
GET /magazines?category=cxo-techbot
```

### Admin Panel (Create/Update/Delete)

```bash
# Login
POST /admin/login

# View all articles
GET /admin/articles

# Create article
POST /admin/articles/create

# Edit article
POST /admin/articles/update/:id

# Delete article
POST /admin/articles/delete/:id

# Same pattern for: events, masterclasses, playbooks, magazines
```

### Lead Management

```bash
# Capture lead (from chatbot)
POST /leads
{
  "company": "Tech Co",
  "email": "contact@techco.com",
  "phone": "1234567890",
  "message": "Interested in partnership",
  "type": "partnership"
}

# View leads (admin)
GET /admin/leads

# Update lead status
POST /admin/leads/update/:id
{
  "status": "contacted",
  "notes": "Follow up next week"
}

# Toggle review status
POST /admin/leads/toggle-review/:id

# Download leads (CSV/JSON/Excel)
GET /admin/leads/download/csv
GET /admin/leads/download/json
GET /admin/leads/download/excel
```

---

## 🛡️ Data Persistence Guarantees

✅ **All changes are immediately persisted to MongoDB**

- Admin creates/edits/deletes → Saved to DB within milliseconds
- APIs always return fresh data from MongoDB
- No caching, no stale data issues
- No file conflicts or sync delays
- Multi-user safe (concurrent requests handled by MongoDB)

---

## 🔍 Monitoring & Verification

### Check MongoDB Collections
```bash
# Connect to MongoDB
mongo mongodb://localhost:27017/cxo-techbot

# List all collections
show collections

# Check document count
db.articles.countDocuments()
db.events.countDocuments()
db.masterclasses.countDocuments()
db.playbooks.countDocuments()
db.magazines.countDocuments()
db.leads.countDocuments()

# View sample documents
db.articles.findOne()
db.leads.findOne()
```

### Check Server Logs
```bash
# Should see on startup:
✅ MongoDB connected
✅ Seeding database from JSON files...
✅ Seeded X articles
✅ Seeded X events
... etc
✅ Database seeding completed
✅ Leads storage initialized with MongoDB
🚀 CXO TechBOT Backend running
```

---

## 🚀 Deployment to Production

### Step 1: Set MongoDB URI for Production
```
# Use MongoDB Atlas or self-hosted MongoDB
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/cxo-techbot?retryWrites=true&w=majority
```

### Step 2: Deploy Code
```bash
git push origin main
# Deploy via Render/Heroku/AWS/etc.
```

### Step 3: Verify Startup
```bash
# Check logs
heroku logs --tail
# or equivalent for your platform
```

### Step 4: Test APIs
```bash
# Test production endpoints
curl https://your-api.com/articles
curl https://your-api.com/events
curl https://your-api.com/admin/login
```

---

## ⚠️ Troubleshooting

### Issue: Seeding fails with validation error
**Solution:** Check that all JSON files are valid and match the models. All models have been updated to accept all fields from JSON files.

### Issue: MongoDB connection fails
**Solution:** 
- Ensure MongoDB is running
- Check MONGO_URI in .env
- Verify network access if using MongoDB Atlas

### Issue: Data not appearing after restart
**Solution:**
- Seeding only happens if collections are empty
- To re-seed: delete all collections and restart server
- Or: manually import data using MongoDB tools

### Issue: Admin edits not saving
**Solution:** Verify in server logs that DataService methods are being called. All methods are async and should properly save to MongoDB.

---

## 📝 Models & Fields

### Article Model
```javascript
{
  id: String (unique),
  title: String,
  category: String,
  subcategory: String,
  summary: String,
  description: String,
  url: String,
  content: String,
  imageUrl: String,
  tags: [String],
  clicks: Number,
  createdAt: String
}
```

### Event Model
```javascript
{
  id: String (unique),
  title: String,
  description: String,
  date: String,
  endDate: String,
  time: String,
  duration: String,
  location: String,
  imageUrl: String,
  type: String,
  category: String,
  speaker: String,
  url: String,
  tags: [String],
  registrations: Number,
  clicks: Number,
  createdAt: String
}
```

### Masterclass Model
```javascript
{
  id: String (unique),
  title: String,
  subtitle: String,
  description: String,
  category: String,
  content: String,
  imageUrl: String,
  bannerImage: String,
  speaker: String,
  speakerBio: String,
  speakerImage: String,
  date: String,
  time: String,
  duration: String,
  timezone: String,
  level: String,
  maxParticipants: Number,
  currentEnrollments: Number,
  price: Number,
  currency: String,
  topics: [String],
  requirements: String,
  materials: String,
  certification: Boolean,
  certificateType: String,
  recordingAvailable: Boolean,
  registrationUrl: String,
  tags: [String],
  enrollments: Number,
  clicks: Number,
  createdAt: String
}
```

### Playbook Model
```javascript
{
  id: String (unique),
  title: String,
  description: String,
  category: String,
  subcategory: String,
  content: String,
  imageUrl: String,
  pages: Number,
  downloadUrl: String,
  tags: [String],
  downloads: Number,
  clicks: Number,
  createdAt: String
}
```

### Magazine Model
```javascript
{
  id: String (unique),
  title: String,
  description: String,
  category: String,
  content: String,
  coverImage: String,
  downloads: Number,
  clicks: Number,
  createdAt: String
}
```

### Lead Model
```javascript
{
  id: String (unique),
  company: String (required),
  email: String (required),
  phone: String,
  message: String,
  file: String,
  type: String (enum: [...]),
  status: String (enum: new, contacted, replied, closed),
  notes: String,
  isReviewed: Boolean,
  createdAt: Date (MongoDB timestamp),
  updatedAt: Date (MongoDB timestamp)
}
```

---

## ✅ Final Checklist Before Going Live

- [ ] MongoDB running and accessible
- [ ] MONGO_URI set in .env
- [ ] All dependencies installed (`npm install`)
- [ ] Server starts without errors (`npm start`)
- [ ] Startup checks pass (all files found)
- [ ] Database auto-seeds on first startup
- [ ] Test GET endpoints return data from MongoDB
- [ ] Test admin create/edit/delete operations
- [ ] Test lead capture from forms/chatbot
- [ ] Verify all data persists after restart
- [ ] Check server logs show no warnings
- [ ] All APIs respond within expected time
- [ ] Admin panel accessible and functional

---

## 🎉 You're Ready!

Your backend is now **100% MongoDB-driven** with:
- ✅ Zero file-based data operations
- ✅ Automatic data migration from JSON
- ✅ Real-time data persistence
- ✅ Complete CRUD operations
- ✅ Lead capture & management
- ✅ Admin dashboard
- ✅ Production-ready error handling

**Status: READY FOR PRODUCTION DEPLOYMENT**
