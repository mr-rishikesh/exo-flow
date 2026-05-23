# 🚀 Quick Start Guide

## ⚡ 30 Second Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create .env File
```
MONGO_URI=mongodb://localhost:27017/cxo-techbot
PORT=3000
ADMIN_EMAIL=admin@cxotechbot.com
ADMIN_PASSWORD=Admin@123
SESSION_SECRET=your-secret-key
```

### 3. Start MongoDB
```bash
# Local
mongod

# Docker
docker run -d -p 27017:27017 mongo:latest

# MongoDB Atlas
# Create at https://www.mongodb.com/cloud/atlas
```

### 4. Start Server
```bash
npm start
```

### 5. Expected Output
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

## 🧪 Quick Tests

### Test APIs
```bash
# Get articles
curl http://localhost:3000/articles

# Get events
curl http://localhost:3000/events

# Get masterclasses
curl http://localhost:3000/masterclasses
```

### Test Admin Login
```bash
# Navigate to
http://localhost:3000/admin/login

# Login with:
Email: admin@cxotechbot.com
Password: Admin@123
```

### Test Lead Capture
```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Test Co",
    "email": "test@example.com",
    "type": "partnership",
    "message": "Interested in partnership"
  }'
```

---

## 📊 Verify MongoDB

### Check Collections
```bash
mongo mongodb://localhost:27017/cxo-techbot

# List collections
show collections

# Count documents
db.articles.countDocuments()
db.events.countDocuments()
db.masterclasses.countDocuments()
db.playbooks.countDocuments()
db.magazines.countDocuments()
db.leads.countDocuments()
```

---

## 🔗 Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /articles | Get all articles |
| GET | /events | Get all events |
| GET | /masterclasses | Get all masterclasses |
| GET | /playbooks | Get all playbooks |
| GET | /magazines | Get all magazines |
| POST | /leads | Create lead (chatbot) |
| GET | /admin/login | Admin login page |
| GET | /admin/leads | View all leads |
| POST | /admin/articles/create | Create article |
| POST | /admin/articles/update/:id | Update article |
| POST | /admin/articles/delete/:id | Delete article |

---

## ⚠️ If Something Goes Wrong

### MongoDB Not Connecting?
```
1. Check MongoDB is running: mongod
2. Check MONGO_URI in .env
3. Check network connection
```

### Data Not Seeding?
```
1. Check /data/*.json files exist
2. Check files are valid JSON
3. Check MongoDB is running
4. Delete collections and restart: 
   db.dropDatabase()
```

### Port 3000 Already In Use?
```
Set different port in .env:
PORT=3001

Or kill process on port 3000:
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

---

## ✅ You're Ready!

Everything is set up and ready to use:
- ✅ MongoDB storing all data
- ✅ Auto-seeding on startup
- ✅ APIs returning live data
- ✅ Admin panel fully functional
- ✅ Lead capture working
- ✅ All changes persisting to database

### Next Steps:
1. Use admin panel to manage content
2. Query APIs to get data
3. Capture leads from chatbot
4. Download reports (leads)
5. Deploy to production

For detailed documentation, see:
- `MONGODB_MIGRATION_GUIDE.md`
- `DEPLOYMENT_CHECKLIST.md`
- `IMPLEMENTATION_SUMMARY.md`

🎉 **Happy coding!**
