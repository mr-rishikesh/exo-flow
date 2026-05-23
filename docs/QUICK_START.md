# 🚀 Quick Start - CXO TechBOT Backend (Extended)

## ⚡ 5-Minute Setup

### 1. Install & Run
```bash
npm install
npm start
```

### 2. MongoDB (Pick One)

**Local:**
```bash
# Start MongoDB service
mongod
```

**Or Cloud:**
- Create MongoDB Atlas account
- Update `.env`: `MONGO_URI=your-atlas-connection-string`

### 3. Login to Admin
```
URL: http://localhost:3000/admin/login
Email: admin@cxotechbot.com
Password: Admin@123
```

---

## 📞 Lead API (For Engati Chatbot)

```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Company Name",
    "email": "contact@company.com",
    "phone": "+91 9876543210",
    "message": "Partnership inquiry",
    "type": "event_collaboration"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "lead": {
    "_id": "65g3h4i5j6k7l8m9",
    "company": "Company Name",
    "email": "contact@company.com",
    "status": "new",
    "createdAt": "2026-04-24T10:30:00Z"
  }
}
```

---

## 🧑‍💼 Admin Features

### 1. Leads Dashboard
- **URL:** `http://localhost:3000/admin/leads`
- View all leads
- Click "✏️ Edit" to update status & add notes
- Click "🗑️ Delete" to remove

### 2. Manage Articles
- **URL:** `http://localhost:3000/admin/articles`
- Click "➕ Add Article"
- Fill: Title, Category, Summary, URL, Tags
- Click "✏️ Edit" to modify
- Click "🗑️ Delete" to remove

---

## 🔑 Configuration (Optional)

Edit `.env`:

```env
# Admin Credentials
ADMIN_EMAIL=admin@cxotechbot.com
ADMIN_PASSWORD=Admin@123

# Gmail (for email alerts)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Telegram (optional)
TELEGRAM_BOT_TOKEN=your-token
TELEGRAM_CHAT_ID=your-chat-id
```

---

## ✅ Existing APIs (Still Work)

```bash
# Get articles
curl http://localhost:3000/articles?category=ai&limit=4

# Get events
curl http://localhost:3000/events?type=masterclass

# Get playbooks
curl http://localhost:3000/playbooks

# Get magazines
curl http://localhost:3000/magazines

# Get masterclasses
curl http://localhost:3000/masterclasses

# Health check
curl http://localhost:3000/health
```

---

## 🐛 Troubleshooting

| Error | Solution |
|-------|----------|
| `ECONNREFUSED` | Start MongoDB: `mongod` |
| Login fails | Check `.env` credentials |
| Email not sending | Check Gmail app password in `.env` |
| Admin routes 404 | Make sure you're logged in |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `models/Lead.js` | MongoDB lead schema |
| `routes/leads.js` | Lead API endpoints |
| `routes/admin.js` | Admin panel routes |
| `controllers/leadController.js` | Lead logic |
| `controllers/adminController.js` | Admin logic |
| `views/admin/*.ejs` | Admin UI templates |
| `.env` | Configuration |

---

## 🎯 Workflow

### From Engati Chatbot
```
User asks for something
  ↓
Chatbot: "Can we contact you?"
  ↓
User: "Yes, contact@company.com"
  ↓
POST /leads (from chatbot backend)
  ↓
Lead saved to MongoDB
  ↓
Admin gets email alert
  ↓
Admin logs in & views lead
  ↓
Admin updates status
```

---

## 🔗 Links

- **Admin Panel:** http://localhost:3000/admin/login
- **Leads Dashboard:** http://localhost:3000/admin/leads
- **Articles Manager:** http://localhost:3000/admin/articles
- **Full Docs:** See `SETUP.md`

---

## 💡 Examples

### Add a Lead Manually
1. Open admin panel
2. (Can't add directly from UI, but test via API above)

### Create Article
1. Go to `/admin/articles`
2. Click "➕ Add Article"
3. Fill form
4. Click "✅ Add Article"

### Update Lead Status
1. Go to `/admin/leads`
2. Click "✏️ Edit" on a lead
3. Change Status dropdown
4. Add notes if needed
5. Click "💾 Save Changes"

---

## ❓ Need Help?

See `SETUP.md` for detailed setup and troubleshooting.
See `EXTENSION_SUMMARY.md` for technical architecture.

**Everything working? You're done!** 🎉

---

**Ready to extend? Read `SETUP.md` for complete documentation.**
