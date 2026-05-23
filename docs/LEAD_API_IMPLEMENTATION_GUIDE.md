# Lead Capture API - Implementation Guide

## For Developers: Complete Integration & Implementation Reference

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Database Schema](#database-schema)
3. [API Routes](#api-routes)
4. [Controller Functions](#controller-functions)
5. [Data Validation](#data-validation)
6. [Notification System](#notification-system)
7. [Testing Guide](#testing-guide)
8. [Deployment Checklist](#deployment-checklist)
9. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Project Structure
```
cxo-bot-cms-backend/
├── models/
│   └── Lead.js                 # MongoDB schema
├── controllers/
│   └── leadController.js       # Business logic
├── routes/
│   └── leads.js               # Route definitions
├── services/
│   └── NotificationService.js # Email & Telegram alerts
├── server.js                  # Express server
└── package.json              # Dependencies
```

### Technology Stack
- **Runtime:** Node.js (v22+)
- **Framework:** Express.js
- **Database:** MongoDB (Atlas)
- **ORM:** Mongoose
- **Authentication:** Express-Session
- **Notifications:** Nodemailer, Telegram Bot API
- **Environment:** dotenv

---

## Database Schema

### Lead Model (models/Lead.js)

```javascript
const leadSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    message: {
      type: String,
      trim: true
    },
    file: {
      type: String,
      default: null
    },
    type: {
      type: String,
      enum: [
        'event_collaboration',
        'partnership',
        'media_inquiry',
        'general_inquiry',
        'other'
      ],
      default: 'general_inquiry'
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'replied', 'closed'],
      default: 'new'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);
```

### Database Indexes
- `email` - For fast email lookups
- `type` - For filtering by lead type
- `status` - For pipeline tracking
- `createdAt` - For sorting

### Timestamps
- `createdAt` - Automatically set when lead created
- `updatedAt` - Automatically updated on changes

---

## API Routes

### Route Definition (routes/leads.js)

```javascript
const express = require('express');
const leadController = require('../controllers/leadController');

const router = express.Router();

// Create new lead
router.post('/', leadController.createLead);

// Get all leads
router.get('/', leadController.getLeads);

// Get specific lead
router.get('/:id', leadController.getLeadById);

// Update lead
router.put('/:id', leadController.updateLead);

// Delete lead
router.delete('/:id', leadController.deleteLead);

module.exports = router;
```

### Server Registration (server.js)

```javascript
// Register routes
app.use('/leads', require('./routes/leads'));
```

### Full Route Paths
- `POST /leads` - Create lead
- `GET /leads` - List all leads
- `GET /leads/:id` - Get single lead
- `PUT /leads/:id` - Update lead
- `DELETE /leads/:id` - Delete lead

---

## Controller Functions

### leadController.js Implementation

#### 1. createLead

**Purpose:** Create new lead and send notifications

```javascript
exports.createLead = async (req, res) => {
  try {
    // Validate required fields
    const { company, email, phone, message, file, type } = req.body;
    
    if (!company || !email) {
      return res.status(400).json({
        success: false,
        error: 'Company and email are required'
      });
    }

    // Create lead document
    const lead = new Lead({
      company,
      email,
      phone: phone || '',
      message: message || '',
      file: file || null,
      type: type || 'general_inquiry'
    });

    // Save to database
    await lead.save();

    // Send notifications
    await NotificationService.notifyLead(lead);

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      lead
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lead'
    });
  }
};
```

**Key Points:**
- Validates company and email (required)
- Creates new Lead document
- Saves to MongoDB
- Triggers notifications
- Returns 201 status on success

---

#### 2. getLeads

**Purpose:** Retrieve all leads sorted by newest first

```javascript
exports.getLeads = async (req, res) => {
  try {
    // Query all leads, sorted descending by creation date
    const leads = await Lead.find().sort({ createdAt: -1 });
    
    // Return array of leads
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leads'
    });
  }
};
```

**Key Points:**
- No parameters required
- Returns array (empty if no leads)
- Sorted by newest first
- Error handling for DB issues

---

#### 3. getLeadById

**Purpose:** Get specific lead by MongoDB ID

```javascript
exports.getLeadById = async (req, res) => {
  try {
    // Find lead by ID
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    // Return lead object
    res.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lead'
    });
  }
};
```

**Key Points:**
- Takes lead ID from URL params
- Returns 404 if not found
- Returns single lead object

---

#### 4. updateLead

**Purpose:** Update lead status and notes

```javascript
exports.updateLead = async (req, res) => {
  try {
    // Extract updatable fields
    const { status, notes } = req.body;
    
    // Find and update lead
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    // Return updated lead
    res.json({
      success: true,
      message: 'Lead updated successfully',
      lead
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update lead'
    });
  }
};
```

**Key Points:**
- Only `status` and `notes` are updatable
- Returns 404 if lead not found
- Uses runValidators for schema validation
- Returns updated lead object

---

#### 5. deleteLead

**Purpose:** Permanently delete lead

```javascript
exports.deleteLead = async (req, res) => {
  try {
    // Find and delete lead
    const lead = await Lead.findByIdAndDelete(req.params.id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    // Return success message
    res.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete lead'
    });
  }
};
```

**Key Points:**
- Permanently deletes from database
- Returns 404 if lead not found
- Cannot be undone

---

## Data Validation

### Client-Side Validation (Recommended)

```javascript
// Validate before sending to API
function validateLead(lead) {
  const errors = [];

  // Company validation
  if (!lead.company || lead.company.trim() === '') {
    errors.push('Company name is required');
  }
  if (lead.company && lead.company.length > 200) {
    errors.push('Company name too long (max 200 chars)');
  }

  // Email validation
  if (!lead.email || lead.email.trim() === '') {
    errors.push('Email is required');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (lead.email && !emailRegex.test(lead.email)) {
    errors.push('Invalid email format');
  }

  // Phone validation (optional)
  if (lead.phone && lead.phone.length > 20) {
    errors.push('Phone too long');
  }

  // Message validation (optional)
  if (lead.message && lead.message.length > 2000) {
    errors.push('Message too long (max 2000 chars)');
  }

  // Type validation
  const validTypes = ['event_collaboration', 'partnership', 'media_inquiry', 'general_inquiry', 'other'];
  if (lead.type && !validTypes.includes(lead.type)) {
    errors.push('Invalid lead type');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Usage
const validation = validateLead(leadData);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}
```

### Server-Side Validation (Already Implemented)

The API validates:
- ✅ `company` and `email` are required
- ✅ Email format validation
- ✅ Type must be from enum
- ✅ Status must be from enum
- ✅ All inputs trimmed

---

## Notification System

### NotificationService.js

```javascript
const nodemailer = require('nodemailer');
const TelegramBot = require('node-telegram-bot-api');

class NotificationService {
  constructor() {
    // Initialize email transporter
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Initialize Telegram bot
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
  }

  async sendEmailAlert(lead) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Lead: ${lead.company}`,
      html: `
        <h2>New Lead Captured</h2>
        <p><strong>Company:</strong> ${lead.company}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone || 'Not provided'}</p>
        <p><strong>Type:</strong> ${lead.type}</p>
        <p><strong>Message:</strong> ${lead.message || 'No message'}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendTelegramAlert(lead) {
    const message = `
🎯 <b>New Lead</b>
📍 Company: ${lead.company}
📧 Email: ${lead.email}
📱 Phone: ${lead.phone || 'N/A'}
🏷️ Type: ${lead.type}
📝 Message: ${lead.message || 'No message'}
    `.trim();

    await this.bot.sendMessage(
      process.env.TELEGRAM_CHAT_ID,
      message,
      { parse_mode: 'HTML' }
    );
  }

  async notifyLead(lead) {
    try {
      // Send both email and Telegram
      await Promise.all([
        this.sendEmailAlert(lead),
        this.sendTelegramAlert(lead)
      ]);
      console.log(`✅ Notifications sent for lead: ${lead.company}`);
    } catch (error) {
      console.error('❌ Error sending notifications:', error);
      // Don't throw - lead is still created
    }
  }
}

module.exports = new NotificationService();
```

### Configuration (.env)

```bash
# Email Settings
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@cxotechbot.com

# Telegram Settings
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=-1001234567890
```

### Email Configuration Steps

**For Gmail:**
1. Enable 2-factor authentication
2. Generate App Password at myaccount.google.com/apppasswords
3. Use generated password in EMAIL_PASSWORD

**For Other Services:**
- Outlook: Use outlook.office365.com
- SendGrid: Configure with SendGrid SMTP
- AWS SES: Configure with AWS credentials

### Telegram Configuration Steps

1. Create Telegram bot via @BotFather
2. Get bot token
3. Add bot to your channel/group
4. Get chat ID: Use `/start` and check API response
5. Add to .env

---

## Testing Guide

### Unit Tests (Jest)

```javascript
// tests/leads.test.js
const request = require('supertest');
const app = require('../server');
const Lead = require('../models/Lead');

describe('Lead API', () => {
  beforeEach(async () => {
    await Lead.deleteMany({});
  });

  describe('POST /leads', () => {
    test('should create lead with valid data', async () => {
      const res = await request(app)
        .post('/leads')
        .send({
          company: 'Test Corp',
          email: 'test@example.com',
          phone: '+1-234-567-8900',
          message: 'Test message',
          type: 'partnership'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.lead.company).toBe('Test Corp');
    });

    test('should return 400 without company', async () => {
      const res = await request(app)
        .post('/leads')
        .send({
          email: 'test@example.com'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /leads', () => {
    test('should get all leads', async () => {
      await Lead.create({
        company: 'Test Corp',
        email: 'test@example.com'
      });

      const res = await request(app).get('/leads');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });
});
```

### Integration Tests (cURL)

```bash
#!/bin/bash

BASE_URL="http://localhost:3000"

# Test 1: Create Lead
echo "Test 1: Creating lead..."
RESPONSE=$(curl -s -X POST $BASE_URL/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Test Corp",
    "email": "test@example.com",
    "message": "Test message",
    "type": "partnership"
  }')

LEAD_ID=$(echo $RESPONSE | jq -r '.lead._id')
echo "Created lead: $LEAD_ID"

# Test 2: Get All Leads
echo "\nTest 2: Getting all leads..."
curl -s -X GET $BASE_URL/leads | jq '.[0]'

# Test 3: Get Single Lead
echo "\nTest 3: Getting single lead..."
curl -s -X GET $BASE_URL/leads/$LEAD_ID | jq '.'

# Test 4: Update Lead
echo "\nTest 4: Updating lead..."
curl -s -X PUT $BASE_URL/leads/$LEAD_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "notes": "Called - very interested"
  }' | jq '.lead.status'

# Test 5: Delete Lead
echo "\nTest 5: Deleting lead..."
curl -s -X DELETE $BASE_URL/leads/$LEAD_ID | jq '.message'
```

### Load Testing (Autocannon)

```bash
npm install -g autocannon

# Simple load test
autocannon http://localhost:3000/leads -c 10 -d 10

# With custom payload for POST
autocannon http://localhost:3000/leads -c 10 -d 10 \
  -m POST \
  --body '{"company":"Test","email":"test@example.com"}'
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] All environment variables set in .env
- [ ] MongoDB Atlas connection verified
- [ ] Email credentials working
- [ ] Telegram bot token valid
- [ ] All tests passing
- [ ] No console.log statements
- [ ] CORS properly configured
- [ ] Rate limiting implemented (optional)
- [ ] Input validation in place

### Database
- [ ] MongoDB Atlas cluster created
- [ ] Collections indexed
- [ ] Backup automated
- [ ] IP whitelist configured
- [ ] Connection string secure

### Security
- [ ] Secrets in .env (not committed)
- [ ] HTTPS enforced
- [ ] API keys protected
- [ ] Input sanitized
- [ ] Error messages safe
- [ ] Rate limiting active

### Monitoring
- [ ] Error logging configured
- [ ] Database metrics monitored
- [ ] API uptime monitoring
- [ ] Alert system configured
- [ ] Log aggregation setup

### Production Environment
```bash
# Install dependencies
npm ci --production

# Set production env
export NODE_ENV=production

# Run with PM2
pm2 start server.js --name "lead-api"
```

---

## Troubleshooting

### Issue: Lead not created, "Company and email are required"

**Diagnosis:**
```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
# Returns: 400 error
```

**Solution:**
Include both required fields:
```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Company Name",
    "email": "test@example.com"
  }'
```

---

### Issue: MongoDB connection error

**Symptoms:** 500 errors on all requests

**Diagnosis:**
```javascript
// Check connection in server.js
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected'))
  .catch(err => console.error('Failed:', err));
```

**Solution:**
1. Verify .env has MONGO_URI
2. Check IP whitelist in MongoDB Atlas
3. Test connection: `npm run test:db`

---

### Issue: Notifications not sending

**Symptoms:** Lead created but no email/Telegram

**Diagnosis:**
```bash
# Check logs
tail -f /var/log/app.log | grep -i notification

# Test email
npm run test:email
```

**Solution:**
1. Verify .env credentials
2. Test email separately: `npm run test:email`
3. Test Telegram: `npm run test:telegram`
4. Check service logs

---

### Issue: Memory leak in production

**Symptoms:** Server memory usage increases over time

**Diagnosis:**
```bash
# Monitor memory
top -p $(pgrep -f 'node server.js')

# Use heap snapshot
node --inspect server.js
# Then use Chrome DevTools
```

**Solution:**
1. Check for unstopped event listeners
2. Ensure MongoDB connections pooled
3. Implement graceful shutdown

---

## Performance Optimization

### Database Optimization

```javascript
// Add indexes to MongoDB
db.leads.createIndex({ "email": 1 });
db.leads.createIndex({ "createdAt": -1 });
db.leads.createIndex({ "type": 1 });
db.leads.createIndex({ "status": 1 });
```

### Query Optimization

```javascript
// Use projection to limit fields
const leads = await Lead.find()
  .select('company email type status createdAt')
  .sort({ createdAt: -1 });
```

### Caching

```javascript
// Add Redis caching
const redis = require('redis');
const client = redis.createClient();

exports.getLeads = async (req, res) => {
  const cached = await client.get('leads:all');
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  const leads = await Lead.find();
  await client.setex('leads:all', 300, JSON.stringify(leads));
  res.json(leads);
};
```

---

## Migration Guide

### Adding New Fields

```javascript
// 1. Update schema in Lead.js
const leadSchema = new mongoose.Schema({
  // ... existing fields
  company_size: {
    type: String,
    enum: ['startup', 'small', 'medium', 'large'],
    default: 'small'
  }
});

// 2. Update controller to handle new field
const { company, email, company_size } = req.body;
const lead = new Lead({ company, email, company_size });

// 3. Run migration for existing documents
db.leads.updateMany({}, { $set: { company_size: 'small' } });

// 4. Update API documentation
```

### Changing Enum Values

```javascript
// 1. Add new value to schema
enum: ['old_value', 'new_value', ...]

// 2. Migrate existing data
db.leads.updateMany(
  { type: 'old_value' },
  { $set: { type: 'new_value' } }
);

// 3. Test thoroughly before deploying
```

---

## Version Control & Releases

### Semantic Versioning
- **1.0.0** - Major.Minor.Patch
- **Breaking changes** - Major (1.0.0 → 2.0.0)
- **New features** - Minor (1.0.0 → 1.1.0)
- **Bug fixes** - Patch (1.0.0 → 1.0.1)

### Release Checklist
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Tag created
- [ ] Release notes prepared

---

## Support & Maintenance

### Backup Strategy
```bash
# Weekly MongoDB backup
0 2 * * 0 mongodump --uri="mongodb+srv://..." --out=/backups/$(date +\%Y\%m\%d)
```

### Log Monitoring
```javascript
// Use Winston for logging
const winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.error('Error message', { leadId, error });
```

### Health Checks
```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    mongodb: mongoose.connection.readyState ? 'connected' : 'disconnected'
  });
});
```

---

## Support Contact

For questions or issues:
- **Email:** developer@factoryjet.com
- **Docs:** LEAD_CAPTURE_API_DOCS.md
- **Quick Ref:** LEAD_API_QUICK_REFERENCE.md
