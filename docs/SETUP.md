# CXO TechBOT Backend - Complete Setup Guide

## 📋 Overview

This backend includes:
- ✅ Existing content APIs (articles, events, playbooks, magazines, masterclasses)
- ✅ Lead capture system (from Engati chatbot)
- ✅ MongoDB integration for lead storage
- ✅ Admin panel with authentication
- ✅ Admin notifications (email & Telegram)
- ✅ Full CRUD operations for articles & leads

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. MongoDB Setup

**Option A: Local MongoDB (Recommended for development)**

Install MongoDB Community Edition:
- Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
- macOS: `brew install mongodb-community`
- Linux: https://docs.mongodb.com/manual/administration/install-on-linux/

Start MongoDB:
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` with connection string:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cxo-techbot
```

### 3. Configure Environment Variables

Edit `.env` file:

```env
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/cxo-techbot

# Admin Credentials
ADMIN_EMAIL=admin@cxotechbot.com
ADMIN_PASSWORD=Admin@123

# Email Notifications
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Telegram (Optional)
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id

# Session
SESSION_SECRET=your-super-secret-key-change-this
```

**Gmail Setup for Email Notifications:**
1. Enable 2-factor authentication on Gmail
2. Go to https://myaccount.google.com/apppasswords
3. Generate app password for "Mail"
4. Copy password to `EMAIL_PASS` in `.env`

**Telegram Setup (Optional):**
1. Create bot with @BotFather on Telegram
2. Get bot token
3. Send `/start` to your bot and get chat ID (or use https://www.useradgents.com/tools/telegram-id-finder)

### 4. Start Server

```bash
npm start
```

Output should show:
```
✅ MongoDB connected
🚀 CXO TechBOT Backend running on http://localhost:3000
```

---

## 🔗 API Endpoints

### Public APIs (for chatbot)

**Lead Capture:**
```bash
POST /leads
{
  "company": "TechCorp",
  "email": "contact@techcorp.com",
  "phone": "+91 9876543210",
  "message": "Interested in partnership",
  "file": "https://example.com/document.pdf",
  "type": "event_collaboration"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "lead": {
    "_id": "...",
    "company": "TechCorp",
    "email": "contact@techcorp.com",
    "status": "new",
    "createdAt": "2026-04-24T10:30:00Z"
  }
}
```

**Get All Leads:**
```bash
GET /leads
```

**Existing Content APIs** (unchanged):
```bash
GET /articles?category=ai&limit=4
GET /events?type=masterclass
GET /playbooks?q=startup
GET /magazines?category=health-techbot
GET /masterclasses?category=ai
```

---

## 🧑‍💼 Admin Panel

### Login
- URL: `http://localhost:3000/admin/login`
- Email: `admin@cxotechbot.com`
- Password: `Admin@123`

### Features

#### 📊 Leads Dashboard
- **URL:** `/admin/leads`
- View all leads in table format
- See: Company, Email, Phone, Type, Status, File, Created Date
- **Edit Lead:** Click "✏️ Edit" to:
  - Update status (new → contacted → replied → closed)
  - Add internal notes
  - View lead details
- **Delete Lead:** Click "🗑️ Delete"

#### 📝 Articles Management
- **URL:** `/admin/articles`
- View all articles
- **Add Article:** Click "➕ Add Article"
  - Title, Category, Summary, URL, Tags
- **Edit Article:** Click "✏️ Edit"
  - Modify all fields
- **Delete Article:** Click "🗑️ Delete"

---

## 🔐 Authentication

Simple session-based auth:
- Hardcoded credentials (for demo)
- Sessions stored in memory (not persistent)
- Protected routes require login
- Logout clears session

**To change admin credentials:**
Edit `.env`:
```env
ADMIN_EMAIL=newemail@example.com
ADMIN_PASSWORD=NewPassword123
```

---

## 🔔 Notifications

### Email Alerts
When a lead is created, admin receives email with:
- Company name
- Email address
- Phone number
- Lead type
- Message preview
- Link to admin panel

### Telegram Alerts (Optional)
Same info sent as Telegram message to configured chat

**Both are sent simultaneously** (if configured)

---

## 📂 Project Structure

```
.
├── models/
│   └── Lead.js                 # MongoDB Lead schema
├── controllers/
│   ├── leadController.js       # Lead API logic
│   ├── adminController.js      # Admin panel logic
│   └── [existing controllers]
├── services/
│   ├── NotificationService.js  # Email & Telegram
│   └── DataService.js          # JSON file management
├── routes/
│   ├── leads.js                # Lead API routes
│   ├── admin.js                # Admin routes
│   └── [existing routes]
├── middleware/
│   └── authMiddleware.js       # Auth protection
├── views/
│   └── admin/
│       ├── login.ejs
│       ├── leads.ejs
│       ├── edit-lead.ejs
│       ├── articles.ejs
│       ├── new-article.ejs
│       └── edit-article.ejs
├── data/                       # JSON data files
├── server.js                   # Main app
├── .env                        # Configuration
└── package.json
```

---

## 🧪 Testing

### Test Lead Capture (from chatbot)
```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "TestCorp",
    "email": "test@example.com",
    "phone": "+91 1234567890",
    "message": "Interested in collaboration",
    "type": "event_collaboration"
  }'
```

### Test Admin Panel
1. Open `http://localhost:3000/admin/login`
2. Login with demo credentials
3. View leads dashboard
4. Add/edit/delete articles
5. Update lead status

---

## 🚨 Troubleshooting

### MongoDB not connecting
```
❌ MongoDB connection error: connect ECONNREFUSED
```
**Solution:** Start MongoDB service or check connection string

### Email not sending
**Solution:** 
- Check Gmail app password is correct
- Enable "Less secure apps" if using regular password
- Check internet connection

### Session not persisting after logout
**Solution:** This is normal - session is stored in memory. For production, use a session store like MongoDB or Redis.

### Admin routes not working
**Solution:** Make sure you're logged in. Check `/admin/login`

---

## 📊 Data Flow

```
Engati Chatbot
       ↓
  POST /leads
       ↓
  Lead Model (MongoDB)
       ↓
  NotificationService
       ├── Email Alert
       └── Telegram Alert
       ↓
  Admin Panel
       ├── View Leads
       ├── Update Status
       └── Add Notes
```

---

## 🔄 Existing APIs (Unchanged)

All original endpoints continue to work:
- ✅ Articles with filtering & pagination
- ✅ Events with type filtering
- ✅ Playbooks with search
- ✅ Magazines with category filtering
- ✅ Masterclasses with category filtering
- ✅ Analytics tracking (clicks, registrations)

**No breaking changes!**

---

## 📝 Next Steps (Optional Enhancements)

1. **Persistent Sessions:** Add Redis for session storage
2. **JWT Auth:** Replace session-based with JWT tokens
3. **Email Templates:** Use HTML email templates instead of plain text
4. **Lead Scoring:** Add scoring system based on company, type
5. **Export Leads:** CSV/Excel export from admin panel
6. **Analytics Dashboard:** View leads by type, status, date range
7. **Webhook Integration:** Send lead data to external services
8. **Rate Limiting:** Add rate limiting on /leads endpoint
9. **Image Uploads:** Allow file uploads instead of just URLs
10. **Multi-user Admin:** Support multiple admin accounts

---

## 📞 Support

For issues:
1. Check `.env` is properly configured
2. Verify MongoDB is running
3. Check browser console for errors
4. Check server logs for backend errors

---

**Happy coding! 🚀**
