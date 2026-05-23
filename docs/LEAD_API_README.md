# Lead Capture API - Complete Documentation Index

Welcome! This directory contains comprehensive documentation for the Lead Capture API. Choose the guide that best fits your needs:

---

## 📚 Documentation Files

### 1. **LEAD_CAPTURE_API_DOCS.md** (START HERE)
**Best for:** Everyone - Complete reference guide with all endpoints

- ✅ Overview of the API
- ✅ All 5 endpoints explained in detail
- ✅ Request/response examples
- ✅ Error handling guide
- ✅ Notification system details
- ✅ Integration with Engati chatbot
- ✅ Best practices
- ✅ Troubleshooting section

**When to use:**
- First time reading about the API
- Need detailed endpoint documentation
- Looking for example payloads
- Troubleshooting specific issues

**File size:** 19 KB | 802 lines

---

### 2. **LEAD_API_QUICK_REFERENCE.md** (QUICK LOOKUP)
**Best for:** Developers - Quick reference card

- ✅ All endpoints in summary table
- ✅ Quick cURL examples
- ✅ Common workflows
- ✅ JavaScript/Python code examples
- ✅ Postman setup guide
- ✅ FAQ section
- ✅ No lengthy explanations

**When to use:**
- Need quick API syntax reference
- Copy-paste cURL commands
- Testing with different languages
- Quick FAQ lookup

**File size:** 8.2 KB | 402 lines

---

### 3. **LEAD_API_IMPLEMENTATION_GUIDE.md** (FOR DEVELOPERS)
**Best for:** Backend developers - Deep technical reference

- ✅ Architecture overview
- ✅ Database schema details
- ✅ Controller function code
- ✅ Data validation strategies
- ✅ Notification system implementation
- ✅ Testing guides (Unit, Integration, Load)
- ✅ Deployment checklist
- ✅ Performance optimization
- ✅ Troubleshooting with code

**When to use:**
- Implementing changes to the API
- Understanding the codebase
- Setting up tests
- Preparing for deployment
- Optimizing performance
- Debugging issues

**File size:** 20 KB | 800+ lines

---

### 4. **LEAD_CAPTURE_API.md** (ORIGINAL DOCS)
**Best for:** Historical reference

- Original API documentation
- Basic endpoint descriptions

**Note:** Use LEAD_CAPTURE_API_DOCS.md instead (more complete)

**File size:** 11 KB | 519 lines

---

## 🚀 Quick Start

### I want to...

#### Create a lead (chatbot integration)
→ See **LEAD_API_QUICK_REFERENCE.md** → Example 1

#### Understand all endpoints
→ Read **LEAD_CAPTURE_API_DOCS.md** → API Endpoints section

#### Test the API with cURL
→ Check **LEAD_API_QUICK_REFERENCE.md** → Testing with Postman

#### Integrate with my application
→ See **LEAD_CAPTURE_API_DOCS.md** → Integration section

#### Modify the API code
→ Read **LEAD_API_IMPLEMENTATION_GUIDE.md** → Controller Functions

#### Deploy to production
→ Check **LEAD_API_IMPLEMENTATION_GUIDE.md** → Deployment Checklist

#### Write tests for the API
→ See **LEAD_API_IMPLEMENTATION_GUIDE.md** → Testing Guide

---

## 📋 API Endpoints Summary

All endpoints return JSON responses.

| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| POST | `/leads` | Create new lead | 201 |
| GET | `/leads` | Get all leads | 200 |
| GET | `/leads/:id` | Get specific lead | 200 |
| PUT | `/leads/:id` | Update lead | 200 |
| DELETE | `/leads/:id` | Delete lead | 200 |

**Base URL:** `http://localhost:3000`

---

## 🎯 Key Features

### Automated Notifications
- Email notification to admin
- Telegram bot notification
- Configurable via .env

### Lead Tracking
- Status pipeline: new → contacted → replied → closed
- Internal notes for sales team
- Timestamps on all records

### Lead Types
- `event_collaboration` - Event partnerships
- `partnership` - Business partnerships
- `media_inquiry` - Press/media inquiries
- `general_inquiry` - General questions
- `other` - Other inquiry types

### Data Validation
- Company and email required
- Email format validation
- Enum validation for types/status
- Input trimming and sanitization

---

## 📦 What You Get

### 5 API Operations
1. **Create** - Capture leads from any source
2. **Read** - List all or specific leads
3. **Update** - Progress leads through pipeline
4. **Delete** - Remove leads from system
5. **Notify** - Automatic email & Telegram alerts

### Full CRUD Interface
- Admin dashboard at `/admin/leads`
- Edit, view, delete leads from UI
- Track lead status and add notes
- Export/analyze lead data

### Engati Chatbot Integration
- Webhook support for automatic capture
- Validates all incoming data
- Sends instant notifications
- Maintains lead history

---

## 🔧 Configuration

### Environment Variables (.env)
```
# Database
MONGO_URI=mongodb+srv://...

# Admin
ADMIN_EMAIL=admin@cxotechbot.com
ADMIN_PASSWORD=Admin@123

# Email Notifications
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-specific-password

# Telegram Notifications
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id

# Server
PORT=3000
SESSION_SECRET=your-secret-key
```

---

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "lead": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error description"
}
```

---

## 🧪 Testing the API

### Using cURL (Recommended for Quick Testing)
```bash
# Create lead
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{"company":"Test","email":"test@example.com"}'

# Get all leads
curl http://localhost:3000/leads

# Update lead
curl -X PUT http://localhost:3000/leads/{id} \
  -d '{"status":"contacted"}'
```

### Using Postman
1. Open Postman
2. Create new collection "Lead API"
3. Add requests for each endpoint
4. See LEAD_API_QUICK_REFERENCE.md for setup details

### Using JavaScript
```javascript
const response = await fetch('http://localhost:3000/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    company: 'Test Corp',
    email: 'test@example.com'
  })
});
const result = await response.json();
console.log(result);
```

---

## 🔐 Security

### Built-in Security
- ✅ Input validation
- ✅ Email format validation
- ✅ Enum validation
- ✅ XSS protection
- ✅ SQL injection protection (MongoDB)

### Recommended for Production
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Add API authentication
- [ ] Implement request signing
- [ ] Enable CORS restrictions
- [ ] Add request size limits

---

## 📈 Monitoring

### Health Check
```bash
curl http://localhost:3000/health
```

### View Logs
```bash
# Terminal logs
tail -f server.log

# Error logs
tail -f errors.log
```

### Database Status
```bash
# MongoDB Atlas Dashboard
https://cloud.mongodb.com/
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution | Reference |
|-------|----------|-----------|
| 400 error on create | Include company & email | QUICK_REF.md |
| 404 lead not found | Verify lead ID exists | DOCS.md |
| Notifications not sending | Check .env credentials | IMPL_GUIDE.md |
| MongoDB connection error | Verify MONGO_URI | IMPL_GUIDE.md |
| Memory leak in production | Check for event listeners | IMPL_GUIDE.md |

---

## 📖 File Organization

```
cxo-bot-cms-backend/
├── LEAD_API_README.md                  ← You are here
├── LEAD_CAPTURE_API_DOCS.md           ← Full reference (START HERE)
├── LEAD_API_QUICK_REFERENCE.md        ← Quick lookup
├── LEAD_API_IMPLEMENTATION_GUIDE.md   ← For developers
└── LEAD_CAPTURE_API.md                ← Original (deprecated)

models/
└── Lead.js                             ← Schema definition

controllers/
└── leadController.js                   ← Business logic

routes/
└── leads.js                            ← Route definitions

services/
└── NotificationService.js              ← Email & Telegram alerts
```

---

## 📞 Support

### Documentation
- **Full Docs:** LEAD_CAPTURE_API_DOCS.md
- **Quick Ref:** LEAD_API_QUICK_REFERENCE.md
- **Dev Guide:** LEAD_API_IMPLEMENTATION_GUIDE.md

### Issues
- Check troubleshooting section in relevant doc
- Review server logs
- Verify .env configuration

### Contact
- **Email:** developer@factoryjet.com
- **GitHub Issues:** [Report bugs here]

---

## 📊 API Statistics

| Metric | Value |
|--------|-------|
| Total Endpoints | 5 |
| Success Status Code | 200/201 |
| Error Status Codes | 400/404/500 |
| Required Headers | Content-Type: application/json |
| Auth Required | None (public endpoint) |
| Rate Limit | None (recommended: add in production) |

---

## 🎓 Learning Path

### Beginner (New to API)
1. Read LEAD_API_README.md (this file)
2. Read LEAD_CAPTURE_API_DOCS.md overview
3. Try examples with cURL
4. Test with Postman

### Intermediate (Want to integrate)
1. Read LEAD_CAPTURE_API_DOCS.md completely
2. Use LEAD_API_QUICK_REFERENCE.md for examples
3. Integrate with your application
4. Set up notifications

### Advanced (Want to modify)
1. Read LEAD_API_IMPLEMENTATION_GUIDE.md
2. Understand the codebase
3. Modify as needed
4. Write tests
5. Deploy to production

---

## 🚀 Deployment

### Development
```bash
npm run dev
# Runs on http://localhost:3000
```

### Production
```bash
npm run build
npm start

# Or with PM2
pm2 start server.js --name "lead-api"
```

See LEAD_API_IMPLEMENTATION_GUIDE.md for full deployment checklist.

---

## 📄 License

This Lead Capture API is part of the CXO TechBOT Backend.

---

## 🎉 Getting Started Now

Choose one:

1. **I want to use the API immediately**
   → Open `LEAD_API_QUICK_REFERENCE.md`

2. **I need complete API documentation**
   → Open `LEAD_CAPTURE_API_DOCS.md`

3. **I need to understand/modify the code**
   → Open `LEAD_API_IMPLEMENTATION_GUIDE.md`

---

**Happy coding! 🚀**

---

**Last Updated:** April 27, 2026
**Documentation Version:** 1.0
**API Version:** 1.0
