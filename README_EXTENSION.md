# 🚀 CXO TechBOT Backend - Extended Version

**A production-ready Node.js backend with lead capture, admin panel, and full content management.**

---

## ⚡ What's New

Your backend now includes:

| Feature | Status | Details |
|---------|--------|---------|
| 📝 **Lead Capture API** | ✅ NEW | Receive leads from Engati chatbot via `/leads` endpoint |
| 🗄️ **MongoDB Integration** | ✅ NEW | Persistent lead storage with full CRUD operations |
| 🔐 **Admin Authentication** | ✅ NEW | Session-based login with secure access control |
| 📊 **Admin Dashboard** | ✅ NEW | View, edit, and manage leads in clean UI |
| 📰 **Article Management** | ✅ NEW | Create/edit/delete articles from admin panel |
| 🔔 **Notifications** | ✅ NEW | Email & Telegram alerts for new leads |
| ✅ **Backward Compatible** | ✅ YES | All existing APIs work without changes |

---

## 🎯 Quick Start

### 1. Install & Run
```bash
npm install
npm start
```

### 2. Access Admin Panel
```
http://localhost:3000/admin/login
Email: admin@cxotechbot.com
Password: Admin@123
```

### 3. Test Lead Capture
```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "YourCompany",
    "email": "contact@company.com",
    "phone": "+91 9876543210",
    "message": "Partnership inquiry",
    "type": "event_collaboration"
  }'
```

---

## 📚 Documentation

Start here based on what you need:

### 🟢 **Just Want to Run It?**
→ Read: **[QUICK_START.md](QUICK_START.md)** (5 minutes)

### 🟡 **Need Complete Setup Instructions?**
→ Read: **[SETUP.md](SETUP.md)** (15 minutes)

### 🔵 **Want to Understand the Architecture?**
→ Read: **[FINAL_SUMMARY.md](FINAL_SUMMARY.md)** (10 minutes)

### 🟣 **Need Technical Details?**
→ Read: **[EXTENSION_SUMMARY.md](EXTENSION_SUMMARY.md)** (20 minutes)

### 🔴 **Ready to Deploy?**
→ Read: **[NEXT_STEPS.md](NEXT_STEPS.md)** (10 minutes)

### ⚫ **Verifying Everything Works?**
→ Read: **[IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md)** (15 minutes)

### 📋 **See Project Structure?**
→ Read: **[PROJECT_STRUCTURE.txt](PROJECT_STRUCTURE.txt)** (5 minutes)

---

## 🏗️ What Was Built

### New Code (16 Files)
- **1 Database Model** - Lead schema
- **2 Controllers** - Lead & admin logic
- **2 Routes** - Lead API & admin routes
- **1 Service** - Notifications (email/Telegram)
- **1 Middleware** - Authentication
- **6 Views** - Admin UI templates
- **3 Docs** - Quick reference guides

### Modified Files (3)
- `server.js` - Added MongoDB, EJS, sessions
- `package.json` - Added dependencies
- `DataService.js` - Added save methods

### Documentation (6 Files)
- QUICK_START.md
- SETUP.md
- EXTENSION_SUMMARY.md
- FINAL_SUMMARY.md
- NEXT_STEPS.md
- IMPLEMENTATION_CHECKLIST.md

---

## 🔗 Key Endpoints

### Lead API (NEW)
```
POST   /leads              Create lead from chatbot
GET    /leads              List all leads (API)
GET    /leads/:id          Get specific lead
PUT    /leads/:id          Update lead status
DELETE /leads/:id          Delete lead
```

### Admin Panel (NEW)
```
GET    /admin/login        Login page
GET    /admin/leads        Leads dashboard
GET    /admin/articles     Article management
```

### Content APIs (EXISTING - UNCHANGED ✅)
```
GET    /articles           Article list with filtering
GET    /events             Event list
GET    /playbooks          Playbook list
GET    /magazines          Magazine list
GET    /masterclasses      Masterclass list
```

---

## 🗂️ File Structure

```
New directories created:
├── models/               (1 file)
├── middleware/          (1 file)
├── views/admin/         (6 templates)
└── docs/               (6 guides)

Modified files:
├── server.js
├── package.json
└── services/DataService.js
```

See **[PROJECT_STRUCTURE.txt](PROJECT_STRUCTURE.txt)** for complete tree.

---

## ⚙️ Tech Stack

**Backend:** Node.js + Express.js
**Database:** MongoDB (Mongoose)
**Admin UI:** EJS templates
**Authentication:** Express-session
**Notifications:** Nodemailer + Telegram API
**Environment:** dotenv

---

## 🎓 Key Features Explained

### 1. Lead Capture
- Chatbot POSTs to `/leads`
- Data saved to MongoDB
- Admin notified via email/Telegram
- Admin can track & manage leads

### 2. Admin Authentication
- Login at `/admin/login`
- Session-based (secure)
- Protected routes
- Auto-redirects if not logged in

### 3. Lead Management
- Dashboard shows all leads
- Click "Edit" to update status
- Add internal notes
- Delete leads

### 4. Article Management
- View all articles
- Add new articles
- Edit existing
- Delete articles
- Changes reflected in API

### 5. Notifications
- Email alert (via Gmail)
- Telegram alert (via bot)
- Sent automatically when lead created
- Includes all lead details

---

## 🚀 Getting Started (3 Steps)

### Step 1: Install
```bash
npm install
```

### Step 2: Start MongoDB
```bash
# Local
mongod

# Or use MongoDB Atlas (cloud)
# Update .env with your connection string
```

### Step 3: Run
```bash
npm start
```

Visit: `http://localhost:3000/admin/login`

---

## ✅ What Didn't Change

✅ All content APIs work as before
✅ JSON file storage for content
✅ Analytics tracking unchanged
✅ Existing controllers untouched
✅ CORS still enabled for chatbot
✅ No breaking changes

---

## 🔐 Default Credentials

```
Email: admin@cxotechbot.com
Password: Admin@123
```

⚠️ **Change these in `.env` before production!**

---

## 🧪 Quick Tests

### Test Lead API
```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{"company":"Test","email":"test@test.com","phone":"+919876543210","type":"event_collaboration"}'
```

### Test Admin
Open: http://localhost:3000/admin/login
Use default credentials

### Test Existing APIs
```bash
curl http://localhost:3000/articles
curl http://localhost:3000/events
```

---

## 📊 Architecture at a Glance

```
Engati Chatbot
    ↓
POST /leads (JSON data)
    ↓
MongoDB (Save)
    ↓
Email + Telegram Alert
    ↓
Admin Dashboard
    ├─ View leads
    ├─ Update status
    └─ Add notes

Plus:
    ↓
Admin Panel
    ├─ Manage articles
    ├─ Edit content
    └─ Delete items
```

---

## 📖 Full Documentation

| Document | Best For |
|----------|----------|
| **QUICK_START.md** | Getting running in 5 minutes |
| **SETUP.md** | Complete setup + troubleshooting |
| **EXTENSION_SUMMARY.md** | Understanding technical details |
| **FINAL_SUMMARY.md** | Project overview & features |
| **NEXT_STEPS.md** | Deployment & configuration |
| **IMPLEMENTATION_CHECKLIST.md** | Verifying everything works |
| **PROJECT_STRUCTURE.txt** | File/folder layout |

---

## 🚨 Prerequisites

- Node.js 14+ (18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)
- Gmail account (for email alerts, optional)
- Telegram bot token (for Telegram, optional)

---

## 🎯 Common Tasks

### Change Admin Password
Edit `.env`:
```env
ADMIN_EMAIL=your-new-email@domain.com
ADMIN_PASSWORD=YourNewPassword123
```

### Enable Email Alerts
1. Create Gmail app password
2. Edit `.env`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Add Telegram Alerts
1. Create bot with @BotFather
2. Get bot token & chat ID
3. Edit `.env`:
```env
TELEGRAM_BOT_TOKEN=your-token
TELEGRAM_CHAT_ID=your-chat-id
```

### Use MongoDB Atlas (Cloud)
1. Create account at mongodb.com/cloud/atlas
2. Create cluster & get connection string
3. Edit `.env`:
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

---

## 🐛 Troubleshooting

**MongoDB not connecting?**
- Ensure `mongod` is running
- Check MONGO_URI in .env

**Login fails?**
- Verify credentials in .env
- Restart server after changes

**Email not sending?**
- Check Gmail app password
- Verify EMAIL_USER and EMAIL_PASS

See **SETUP.md** for more troubleshooting.

---

## 📈 Performance

- ✅ Async/await (non-blocking)
- ✅ Indexed database queries
- ✅ Efficient session management
- ✅ No breaking changes to existing API
- ✅ Production-ready code

---

## 🔄 Git Workflow

Files to commit:
```bash
git add models/ controllers/ routes/ services/ middleware/ views/ .env
git add server.js package.json services/DataService.js
git add QUICK_START.md SETUP.md FINAL_SUMMARY.md
git commit -m "Add lead management, admin panel, and MongoDB integration"
```

---

## 💡 Next Steps

1. **Now:** Read QUICK_START.md
2. **Setup:** Follow SETUP.md
3. **Test:** Use test commands above
4. **Deploy:** Read NEXT_STEPS.md
5. **Enhance:** Consider optional features (see FINAL_SUMMARY.md)

---

## 🎉 Summary

You now have:
- ✅ Lead capture system
- ✅ Admin panel with authentication
- ✅ Article management
- ✅ Email/Telegram notifications
- ✅ MongoDB integration
- ✅ Complete documentation
- ✅ 100% backward compatible

**Everything is ready to use!**

---

## 📞 Need Help?

1. Check **QUICK_START.md** for quick reference
2. Check **SETUP.md** for troubleshooting
3. Read **FINAL_SUMMARY.md** for overview
4. Review code comments (well documented)

---

**Happy coding! 🚀**

*Last Updated: 2026-04-24*
