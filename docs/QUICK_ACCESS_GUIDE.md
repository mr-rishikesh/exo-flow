# ⚡ Quick Access Guide - Start Using Now!

## ✅ Server is Running!

Your server is now running at: **http://localhost:3000**

---

## 🔑 Admin Panel Access

### Login Page
```
URL: http://localhost:3000/admin/login
```

### Credentials (Use These to Login)
```
Email: admin@cxotechbot.com
Password: Admin@123
```

### Click "Login" → You're In! ✅

---

## 📊 What You Can Do Now

### 1️⃣ View Leads Dashboard
**After login, you land here automatically**
```
http://localhost:3000/admin/leads
```
- 📋 See all leads in a table
- ✏️ Click "Edit" to update status & notes
- 🗑️ Click "Delete" to remove leads
- Currently empty (no leads yet)

### 2️⃣ Manage Articles
**Click "📝 Articles" in the header**
```
http://localhost:3000/admin/articles
```
- 📰 See all articles
- ➕ Click "Add Article" to create new
- ✏️ Click "Edit" to modify
- 🗑️ Click "Delete" to remove

### 3️⃣ Add New Article Right Now!
**Click "➕ Add Article"**
```
http://localhost:3000/admin/articles/new
```

Fill the form:
```
Title: My First Article
Category: ai (choose from dropdown)
Summary: This is my first article about AI
URL: https://example.com/article
Tags: ai, technology, future
```

Click "✅ Add Article" → Done! ✅

### 4️⃣ Create a Test Lead (Via API)
**Open your terminal/command prompt:**

```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "TechCorp",
    "email": "contact@techcorp.com",
    "phone": "+91 9876543210",
    "message": "Interested in partnership",
    "type": "event_collaboration"
  }'
```

**You'll get back:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "lead": {
    "_id": "...",
    "company": "TechCorp",
    "email": "contact@techcorp.com",
    "status": "new"
  }
}
```

✅ **Lead created!**

### 5️⃣ See the Lead in Dashboard
1. Go back to: http://localhost:3000/admin/leads
2. **Refresh the page** (Ctrl+R or Cmd+R)
3. ✅ Your test lead appears in the table!

### 6️⃣ Update Lead Status
1. Click "✏️ Edit" on the lead you just created
2. Change **Status** dropdown from "new" to "contacted"
3. Add **Notes**: "Called and confirmed interest"
4. Click "💾 Save Changes"
5. ✅ Status & notes are saved!

---

## 🔗 Quick Links

| Feature | URL |
|---------|-----|
| Admin Login | http://localhost:3000/admin/login |
| Leads Dashboard | http://localhost:3000/admin/leads |
| Articles Management | http://localhost:3000/admin/articles |
| Add Article | http://localhost:3000/admin/articles/new |
| API - Articles | http://localhost:3000/articles |
| API - Events | http://localhost:3000/events |
| API - Playbooks | http://localhost:3000/playbooks |
| API - Magazines | http://localhost:3000/magazines |
| API - Masterclasses | http://localhost:3000/masterclasses |
| Health Check | http://localhost:3000/health |

---

## 🧪 API Test Commands

### Create a Lead
```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Your Company",
    "email": "your@email.com",
    "phone": "+91 1234567890",
    "message": "Your message",
    "type": "event_collaboration"
  }'
```

### Get All Leads
```bash
curl http://localhost:3000/leads
```

### Get Articles
```bash
curl http://localhost:3000/articles
```

### Get Events
```bash
curl http://localhost:3000/events
```

### Get Playbooks
```bash
curl http://localhost:3000/playbooks
```

### Get Magazines
```bash
curl http://localhost:3000/magazines
```

### Get Masterclasses
```bash
curl http://localhost:3000/masterclasses
```

---

## 📝 Default Data

### Articles Already in System (5):
1. AI & GenAI Playbook
2. Series A Fundraising Playbook
3. Modern Product Management
4. Agentic AI Infrastructure
5. Scaling Startups

### Events (7):
- GenAI for Business Leaders
- Scaling Startups: 0 to Series A
- AI Ethics and Innovation
- And more...

### Playbooks (7):
- AI & GenAI
- Series A Fundraising
- Product Management
- And more...

### Magazines (9):
- CXO Health TechBOT
- Sustainability TechBOT
- Bharat TechBOT
- Coffee Table Books
- And more...

### Masterclasses (8):
- Generative AI for Business
- Data Strategy & Analytics
- Product Strategy
- And more...

---

## 🎯 Step-by-Step: First Time Usage

### Step 1: Open Browser
```
http://localhost:3000/admin/login
```

### Step 2: Login
- Email: `admin@cxotechbot.com`
- Password: `Admin@123`
- Click "Login"

### Step 3: Explore Leads Dashboard
- You should see an empty table
- No leads created yet

### Step 4: Create Your First Lead
- Open terminal/command prompt
- Run the curl command from "Create a Lead" above
- Lead is created!

### Step 5: Refresh Dashboard
- Go back to browser
- Refresh: Ctrl+R (Windows) or Cmd+R (Mac)
- ✅ Your lead appears!

### Step 6: Update Lead Status
- Click "✏️ Edit" on your lead
- Change status to "contacted"
- Add note: "First interaction"
- Click "Save"
- ✅ Changes saved!

### Step 7: Manage Articles
- Click "📝 Articles" in header
- Click "➕ Add Article"
- Fill form and submit
- ✅ Article added!

---

## 🔐 Change Credentials (Optional)

If you want different login credentials:

### Edit `.env` File
```env
ADMIN_EMAIL=your-new-email@example.com
ADMIN_PASSWORD=YourNewPassword123
```

### Restart Server
```bash
# Stop current server (Ctrl+C)
# Then:
npm start
```

✅ New credentials are now active

---

## ⚠️ If Something Doesn't Work

### Server Not Starting?
```bash
# Check if port 3000 is in use:
lsof -i :3000  (Mac/Linux)
netstat -ano | findstr :3000  (Windows)

# Kill the process and restart
npm start
```

### Login Not Working?
- Check `.env` file - verify ADMIN_EMAIL and ADMIN_PASSWORD
- Restart server (important!)
- Try again

### Can't See New Lead in Dashboard?
- Refresh browser page (Ctrl+R)
- Check browser console for errors (F12)
- Make sure curl command returned success

### No Data Showing?
- Scroll down if table is empty
- Check all leads with: `curl http://localhost:3000/leads`
- Make sure server is still running

---

## 📞 Need Help?

📖 **Full Documentation:** See `RUN_AND_ACCESS.md`
🎯 **Troubleshooting:** See `SETUP.md`
🏗️ **Architecture:** See `FINAL_SUMMARY.md`

---

## 🚀 You're Ready!

Everything is set up and working. Start using the features now:

1. ✅ Open http://localhost:3000/admin/login
2. ✅ Login with credentials above
3. ✅ Explore leads dashboard
4. ✅ Create articles
5. ✅ Test API endpoints

**Happy coding! 🎉**
