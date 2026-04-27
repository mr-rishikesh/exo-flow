# 🚀 Complete Guide - Run, Configure & Access All Features

## ⚡ Your Current Setup

✅ **MongoDB Atlas is Already Configured!**
- Connection URI: `mongodb+srv://mrrishikesh2_db_user:qP9ir3ns0hlQDJ5D@cluster0.axlzsbl.mongodb.net/sandeep`
- Database Name: `sandeep`
- Status: **Ready to use** ✅

---

## 📋 Step 1: Complete Configuration

### Open `.env` File
Edit the `.env` file in your project root:

```env
PORT=3000
NODE_ENV=development

# MongoDB (✅ Already configured)
MONGO_URI=mongodb+srv://mrrishikesh2_db_user:qP9ir3ns0hlQDJ5D@cluster0.axlzsbl.mongodb.net/sandeep

# Admin Credentials (KEEP AS IS or change if you want)
ADMIN_EMAIL=admin@cxotechbot.com
ADMIN_PASSWORD=Admin@123

# Email Notifications (OPTIONAL - Set if you want email alerts)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com      ← Change to YOUR Gmail
EMAIL_PASS=your-app-password         ← Change to YOUR app password

# Telegram Notifications (OPTIONAL - Set if you want Telegram alerts)
TELEGRAM_BOT_TOKEN=your-telegram-bot-token    ← Change if using Telegram
TELEGRAM_CHAT_ID=your-chat-id                 ← Change if using Telegram

# Session Secret (⚠️ IMPORTANT - Change this!)
SESSION_SECRET=your-super-secret-key-change-this
```

### Configuration Options:

#### Option A: Minimal Setup (Just Run It)
✅ Skip email & Telegram config
✅ Just change SESSION_SECRET
✅ Ready to go!

#### Option B: Full Setup (Email Alerts)
Follow steps below to add Gmail alerts

#### Option C: Full Setup (Email + Telegram)
Follow steps below to add both

---

## 🔧 Step 2: Optional - Email Alerts Setup

### If You Want Email Alerts When Leads Arrive:

#### 2.1 Create Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Login with your Gmail account
3. Select: **Mail** and **Windows Computer** (or your device)
4. Click "Generate"
5. Copy the 16-character password

#### 2.2 Update `.env`

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=xxxxxxxxxxxxxxxx   (paste the 16-char password)
```

**Example:**
```env
EMAIL_USER=rishi.techbot@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

✅ **Done!** You'll now receive email alerts when leads are created.

---

## 📱 Step 3: Optional - Telegram Alerts Setup

### If You Want Telegram Alerts When Leads Arrive:

#### 3.1 Create Telegram Bot

1. Open Telegram app
2. Search for: `@BotFather`
3. Send: `/start`
4. Send: `/newbot`
5. Follow prompts:
   - Name: "CXO TechBOT Leads Bot" (or any name)
   - Username: "cxo_techbot_leads_bot" (must be unique)
6. Copy the **TOKEN** (long string starting with numbers)

#### 3.2 Get Your Telegram Chat ID

1. Search for: `@userinfobot`
2. Send: `/start`
3. It shows your **Chat ID**

#### 3.3 Update `.env`

```env
TELEGRAM_BOT_TOKEN=123456789:ABCDEfghijklmnop  (from BotFather)
TELEGRAM_CHAT_ID=987654321                      (from userinfobot)
```

#### 3.4 Test It

Send any message to your bot. You should see the message appear in Telegram chat.

✅ **Done!** You'll now receive Telegram alerts too.

---

## 🔑 Step 4: Change Admin Credentials (Optional but Recommended)

### Current Credentials:
```
Email: admin@cxotechbot.com
Password: Admin@123
```

### To Change (Edit `.env`):

```env
ADMIN_EMAIL=your-new-email@example.com
ADMIN_PASSWORD=YourNewPassword123
```

⚠️ **Important:** After changing, restart the server!

---

## 🔐 Step 5: Secure the Session Secret

### Current Value:
```
SESSION_SECRET=your-super-secret-key-change-this
```

### Change to Something Unique:

```env
SESSION_SECRET=my_super_secret_key_2024_abc123xyz_!@#
```

✅ Generate a random secure key, save it.

---

## 🚀 Step 6: Install Dependencies

```bash
cd c:\AI\ LifeBot\cxo-bot-cms-backend

npm install
```

**Wait for completion.** You should see:
```
added XX packages in X seconds
```

---

## ▶️ Step 7: Start the Server

### Method 1: Simple Run
```bash
npm start
```

### Method 2: Development Mode
```bash
npm run dev
```

### Expected Output:
```
✅ MongoDB connected
🚀 CXO TechBOT Backend running on http://localhost:3000
📡 API Documentation:

📚 CONTENT ENDPOINTS:
   GET  /articles?category=ai&page=1&limit=4
   GET  /events?type=masterclass
   GET  /playbooks?q=startup
   GET  /magazines?category=flagship
   GET  /masterclasses?category=ai

📝 LEAD CAPTURE:
   POST /leads (from Engati chatbot)
   GET  /leads (list all leads)

🔐 ADMIN PANEL:
   GET  http://localhost:3000/admin/login
   GET  http://localhost:3000/admin/leads
   GET  http://localhost:3000/admin/articles

💾 DATA STORED IN: JSON Files + MongoDB
```

✅ **If you see this, the server is running!**

---

## 📍 Step 8: Access Admin Panel

### Login Page
```
URL: http://localhost:3000/admin/login
```

### Login with Your Credentials
```
Email: admin@cxotechbot.com
Password: Admin@123
(or your new credentials if you changed them)
```

### You Should See:
- Login form
- Demo credentials hint
- Green/purple gradient background

### Click "Login"

✅ **You're now in the admin panel!**

---

## 📊 Step 9: Access All Features

### Feature 1: View Leads Dashboard

**After login, you're on the Leads page**

```
URL: http://localhost:3000/admin/leads
```

You should see:
- 📊 Table header with columns:
  - Company
  - Email
  - Phone
  - Type
  - Status
  - File
  - Created
  - Actions

- 🎯 Action buttons:
  - ✏️ Edit (update lead status & notes)
  - 🗑️ Delete (remove lead)

- ✅ Empty state message (no leads yet)

### Feature 2: Manage Articles

**Click "📝 Articles" button in header**

```
URL: http://localhost:3000/admin/articles
```

You should see:
- 📋 Table with all articles
- Columns: Title, Category, Clicks, Created, Actions
- 🎯 Action buttons:
  - ✏️ Edit
  - 🗑️ Delete
- ➕ "Add Article" button

### Feature 3: Add New Article

**Click "➕ Add Article" button**

```
URL: http://localhost:3000/admin/articles/new
```

Fill the form:
```
Title: "AI Trends 2026"
Category: "ai" (select from dropdown)
Summary: "Latest AI developments in 2026"
URL: "https://example.com/article"
Tags: "AI, Technology, Future"
```

Click "✅ Add Article"

✅ **Article saved! See it in the list**

### Feature 4: Edit Article

**On articles page, click "✏️ Edit"**

```
URL: http://localhost:3000/admin/articles/edit/art-001
```

Form appears with:
- Pre-filled fields
- Editable form
- Save/Cancel buttons

Make changes, click "💾 Save Changes"

✅ **Changes saved immediately!**

### Feature 5: Create a Lead (Test)

**Open a new terminal** (don't close the server!)

```bash
cd c:\AI\ LifeBot\cxo-bot-cms-backend

curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "TechCorp Inc",
    "email": "contact@techcorp.com",
    "phone": "+91 9876543210",
    "message": "Interested in partnership",
    "file": "https://example.com/proposal.pdf",
    "type": "event_collaboration"
  }'
```

**Response should be:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "lead": {
    "_id": "...",
    "company": "TechCorp Inc",
    "email": "contact@techcorp.com",
    "status": "new",
    "createdAt": "2026-04-24T10:30:00Z"
  }
}
```

✅ **Lead created!**

#### Check Admin Dashboard
- Go back to http://localhost:3000/admin/leads
- **Refresh the page** (Ctrl+R)
- ✅ New lead appears in the table!

### Feature 6: Update Lead Status

**On leads dashboard, click "✏️ Edit" on your test lead**

```
URL: http://localhost:3000/admin/leads/edit/...
```

You'll see:
- Company (read-only): TechCorp Inc
- Email (read-only): contact@techcorp.com
- Phone (read-only): +91 9876543210
- Type (read-only): event_collaboration
- Message (read-only): Interested in partnership

**Editable fields:**
- **Status dropdown**: Select "contacted" ← Change this!
- **Notes textarea**: "Called on 2026-04-24, very interested"

Click "💾 Save Changes"

✅ **Status updated!**

**Go back to /admin/leads**
- Refresh page
- Status now shows "CONTACTED" ✅
- Notes are saved ✅

### Feature 7: Check Content APIs

**Open new terminal or use curl:**

```bash
# Get articles
curl http://localhost:3000/articles

# Get events
curl http://localhost:3000/events

# Get playbooks
curl http://localhost:3000/playbooks

# Get magazines
curl http://localhost:3000/magazines

# Get masterclasses
curl http://localhost:3000/masterclasses

# Health check
curl http://localhost:3000/health
```

✅ **All content APIs work as before!**

### Feature 8: Check Email Alert (If Configured)

If you set up Gmail:

1. Go back to create another lead (use curl from Feature 5)
2. Check your Gmail inbox
3. You should see an email:
   ```
   Subject: New Lead: TechCorp Inc
   From: your-email@gmail.com
   
   Company: TechCorp Inc
   Email: contact@techcorp.com
   Phone: +91 9876543210
   Type: event_collaboration
   ```

✅ **Email alert works!**

### Feature 9: Check Telegram Alert (If Configured)

If you set up Telegram:

1. Create another lead via curl
2. Check your Telegram chat
3. You should see a message:
   ```
   🔔 New Lead Received
   
   📊 Company: TechCorp Inc
   📧 Email: contact@techcorp.com
   ☎️ Phone: +91 9876543210
   🏷️ Type: event_collaboration
   ```

✅ **Telegram alert works!**

---

## 🗑️ Feature 10: Delete Lead

**On leads dashboard:**
1. Click "🗑️ Delete" button on any lead
2. Confirm deletion
3. ✅ Lead removed from list

---

## ✅ Feature Checklist - Verify Everything Works

Use this checklist to verify all features:

### Basic Setup
- [ ] `npm install` completed successfully
- [ ] `npm start` shows "✅ MongoDB connected"
- [ ] Server running on http://localhost:3000

### Admin Panel
- [ ] Can login at http://localhost:3000/admin/login
- [ ] See leads dashboard
- [ ] See articles management page
- [ ] Can logout

### Lead Management
- [ ] Can create lead via API (curl)
- [ ] New lead appears in dashboard
- [ ] Can edit lead status & notes
- [ ] Changes are saved
- [ ] Can delete leads

### Article Management
- [ ] Can view all articles in admin
- [ ] Can add new article
- [ ] Can edit article
- [ ] Changes reflected in API
- [ ] Can delete article

### Content APIs
- [ ] GET /articles works
- [ ] GET /events works
- [ ] GET /playbooks works
- [ ] GET /magazines works
- [ ] GET /masterclasses works
- [ ] All filtering/sorting works

### Notifications (Optional)
- [ ] Email alerts received (if configured)
- [ ] Telegram alerts received (if configured)

### Security
- [ ] Login requires credentials
- [ ] Admin routes protected
- [ ] Session works across pages

---

## 🐛 Troubleshooting

### Server Won't Start

**Error: MongoDB connection error**
```
Solution: Check MONGO_URI in .env is correct
         Verify internet connection
         Check MongoDB Atlas dashboard
```

**Error: Port 3000 already in use**
```
Solution: npm install -g kill-port
         kill-port --port 3000
         npm start
```

### Can't Login

**Error: Invalid credentials**
```
Solution: Check ADMIN_EMAIL in .env
         Check ADMIN_PASSWORD in .env
         Restart server after .env changes
```

### Leads Not Appearing

**Error: Created lead but not in dashboard**
```
Solution: Refresh browser (Ctrl+R)
         Check MongoDB Atlas (data should be there)
         Check browser console for errors (F12)
```

### Email Alerts Not Working

**Error: No email received**
```
Solution: Check EMAIL_USER in .env
         Check EMAIL_PASS (must be app password, not main password)
         Gmail requires app password, not regular password
         Check spam folder
```

### Edit/Delete Not Working

**Error: Form submission fails**
```
Solution: Check browser console (F12)
         Verify MongoDB connection
         Check .env has all required fields
```

---

## 🎯 Common Workflows

### Workflow 1: Lead Comes from Chatbot
```
1. Chatbot POSTs to /leads
2. Lead saved to MongoDB
3. Admin gets email/Telegram alert
4. Admin logs in to admin panel
5. Admin sees new lead in dashboard
6. Admin updates status to "contacted"
7. Admin can see conversation history in notes
```

### Workflow 2: Add New Content
```
1. Admin logs in
2. Go to /admin/articles
3. Click "Add Article"
4. Fill form & submit
5. Changes immediately visible in /articles API
6. Chatbot can fetch and display new article
```

### Workflow 3: Manage Existing Lead
```
1. Admin logs in
2. Go to /admin/leads
3. Click "Edit" on a lead
4. Change status dropdown (new → contacted)
5. Add notes about interaction
6. Click "Save"
7. Status & notes saved permanently
```

---

## 📞 Test API Calls

### Create Lead
```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Company Name",
    "email": "contact@company.com",
    "phone": "+91 9876543210",
    "message": "Message here",
    "type": "event_collaboration"
  }'
```

### Get All Leads
```bash
curl http://localhost:3000/leads
```

### Update Lead Status
```bash
curl -X PUT http://localhost:3000/leads/LEAD_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "notes": "Called, very interested"
  }'
```

### Delete Lead
```bash
curl -X DELETE http://localhost:3000/leads/LEAD_ID
```

---

## 🎉 You're All Set!

Everything is configured and ready to use:

✅ MongoDB connected
✅ Admin panel ready
✅ Lead capture working
✅ APIs functioning
✅ Notifications (optional)

**Happy managing! 🚀**

---

## 📚 Next Steps

1. ✅ Follow this guide to run & access everything
2. ✅ Test each feature using checklists above
3. ✅ Integrate Engati chatbot to POST to /leads
4. ✅ Deploy to production (see NEXT_STEPS.md)

---

**Questions? Check the troubleshooting section or review the other documentation files.**
