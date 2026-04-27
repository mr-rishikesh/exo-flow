# Separate Routes Architecture - Lead Types Strategy

## Overview

This document outlines the architecture for creating separate routes for different types of lead captures in the CXO TechBOT Backend. Instead of using a single `/leads` endpoint for all inquiries, we now have specialized routes for different user interactions.

---

## Current Implementation

### 1. Newsletter Subscription Route ✅ IMPLEMENTED

**Purpose:** Capture users who want to subscribe to newsletters

**Endpoint:** `POST /newsletter/subscribe`

**Required Fields:**
- `email` (string, required)

**Stored Data:**
- `email`
- `type: "newsletter"`
- `company: "Newsletter Subscriber"` (default)
- `createdAt` (auto)
- `updatedAt` (auto)

**File Structure:**
```
controllers/newsletterController.js
routes/newsletter.js
```

**Features:**
- ✅ Subscribe with email only
- ✅ Check for duplicate subscriptions
- ✅ Unsubscribe functionality
- ✅ List all subscribers (admin)
- ✅ Delete subscriber by ID (admin)

---

## Future Routes to Implement

Based on your requirements, here are the additional routes you'll likely need:

### 2. Playbook Request Route (TO BE CREATED)

**Purpose:** Users requesting more playbooks on specific topics

**Endpoint:** `POST /playbook-request`

**Expected Fields:** (You will provide exact fields)
- `email` (required)
- `category` or `topic` (required)
- `experience_level` (beginner, intermediate, advanced)
- Other fields as you specify...

**Controller:** `controllers/playbookRequestController.js`

**Route File:** `routes/playbookRequest.js`

---

### 3. Feature Request Route (TO BE CREATED)

**Purpose:** Users requesting specific features or enhancements

**Endpoint:** `POST /feature-request`

**Expected Fields:** (You will provide exact fields)
- `email` (required)
- `feature_title` (required)
- `description`
- `use_case`
- Other fields as you specify...

**Controller:** `controllers/featureRequestController.js`

**Route File:** `routes/featureRequest.js`

---

### 4. Event Registration Route (TO BE CREATED)

**Purpose:** Users registering for specific events

**Endpoint:** `POST /event-registration`

**Expected Fields:** (You will provide exact fields)
- `email` (required)
- `event_id` (required)
- `full_name`
- `company` (optional)
- Other fields as you specify...

**Controller:** `controllers/eventRegistrationController.js`

**Route File:** `routes/eventRegistration.js`

---

## Database Schema Strategy

All these routes store data in the same `Lead` collection but with different `type` values:

```javascript
// Newsletter type
{
  _id: ObjectId,
  email: String,
  type: "newsletter",
  company: "Newsletter Subscriber",
  createdAt: Date,
  updatedAt: Date
}

// Playbook request type (future)
{
  _id: ObjectId,
  email: String,
  type: "playbook_request",
  company: String,
  message: String (category/topic),
  createdAt: Date,
  updatedAt: Date
}

// Feature request type (future)
{
  _id: ObjectId,
  email: String,
  type: "feature_request",
  company: String,
  message: String (feature description),
  createdAt: Date,
  updatedAt: Date
}
```

Update `models/Lead.js` enum when adding new types:
```javascript
type: {
  type: String,
  enum: [
    'event_collaboration',
    'partnership',
    'media_inquiry',
    'general_inquiry',
    'newsletter',        // ✅ Already added
    'playbook_request',  // TODO
    'feature_request',   // TODO
    'event_registration', // TODO
    'other'
  ],
  default: 'general_inquiry'
}
```

---

## Implementation Pattern

Each new route follows the same pattern:

### 1. Create Controller File

**File:** `controllers/routeNameController.js`

```javascript
const Lead = require('../models/Lead');

exports.createRequest = async (req, res) => {
  try {
    const { email, ...otherFields } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    // Create new request
    const request = new Lead({
      email,
      type: 'request_type',
      // Add other fields here
      ...otherFields
    });

    await request.save();

    res.status(201).json({
      success: true,
      message: 'Request created successfully',
      data: request
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create request'
    });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Lead.find({ type: 'request_type' })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch requests'
    });
  }
};
```

### 2. Create Route File

**File:** `routes/routeName.js`

```javascript
const express = require('express');
const controller = require('../controllers/routeNameController');

const router = express.Router();

router.post('/', controller.createRequest);
router.get('/', controller.getRequests);

module.exports = router;
```

### 3. Register in server.js

```javascript
app.use('/route-name', require('./routes/routeName'));
```

---

## Current File Structure

```
cxo-bot-cms-backend/
├── models/
│   └── Lead.js                              # Updated with "newsletter" type
│
├── controllers/
│   ├── leadController.js                    # Original lead capture
│   └── newsletterController.js              # ✅ Newsletter subscriptions
│
├── routes/
│   ├── leads.js                             # Original lead routes
│   └── newsletter.js                        # ✅ Newsletter routes
│
└── server.js                                # Updated to register newsletter route
```

---

## Next Steps - What You Need to Provide

For each new route you want to create, please provide:

1. **Route Name** - What will it be called? (e.g., `/playbook-request`)

2. **Required Fields** - What fields MUST be provided?
   - Example: `email` (always), `category`, `description`, etc.

3. **Optional Fields** - What fields can be optional?
   - Example: `company`, `phone`, `budget`, etc.

4. **Type Value** - What will the `type` field be set to?
   - Example: `playbook_request`, `feature_request`, etc.

5. **Purpose** - What is this route capturing?
   - Example: "Users requesting more playbooks on specific topics"

---

## Example: Playbook Request Implementation

Once you provide the exact fields, it would look like this:

**Step 1: Update Lead Schema**
```javascript
// models/Lead.js
type: {
  enum: [
    'event_collaboration',
    'partnership',
    'media_inquiry',
    'general_inquiry',
    'newsletter',
    'playbook_request',  // ADD THIS
    'other'
  ]
}
```

**Step 2: Create Controller**
```javascript
// controllers/playbookRequestController.js
const Lead = require('../models/Lead');

exports.requestPlaybook = async (req, res) => {
  try {
    const { email, category, experience_level } = req.body;

    if (!email || !category) {
      return res.status(400).json({
        success: false,
        error: 'Email and category are required'
      });
    }

    const request = new Lead({
      email,
      type: 'playbook_request',
      message: `Category: ${category}, Level: ${experience_level}`,
      company: 'Playbook Requester'
    });

    await request.save();

    res.status(201).json({
      success: true,
      message: 'Playbook request submitted',
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to submit request'
    });
  }
};
```

**Step 3: Create Route**
```javascript
// routes/playbookRequest.js
const express = require('express');
const controller = require('../controllers/playbookRequestController');

const router = express.Router();
router.post('/', controller.requestPlaybook);
router.get('/', controller.getRequests);

module.exports = router;
```

**Step 4: Register in server.js**
```javascript
app.use('/playbook-request', require('./routes/playbookRequest'));
```

**Step 5: Test**
```bash
curl -X POST http://localhost:3000/playbook-request \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "category": "Data Science",
    "experience_level": "intermediate"
  }'
```

---

## Benefits of This Approach

✅ **Separation of Concerns** - Each route handles a specific type of request

✅ **Easy to Query** - Filter by `type` to get specific request categories

✅ **Scalable** - Add new routes without modifying existing ones

✅ **Unified Database** - All requests in one collection, easy to manage

✅ **Analytics** - Easy to count/analyze different request types

✅ **Admin Dashboard** - Can create separate admin views for each type

✅ **Notifications** - Can send different emails based on request type

---

## Admin Dashboard Enhancement (Future)

```javascript
// Admin routes
app.get('/admin/newsletter', (req, res) => {
  // Show newsletter subscribers
});

app.get('/admin/playbook-requests', (req, res) => {
  // Show playbook requests
});

app.get('/admin/feature-requests', (req, res) => {
  // Show feature requests
});
```

---

## Summary

**Current Status:**
- ✅ Newsletter route implemented
- ✅ Accepts only email + auto-sets type="newsletter"
- ✅ Stores in Lead collection
- ✅ Documented in NEWSLETTER_API.md

**Ready for You to Specify:**
1. Playbook request fields
2. Feature request fields
3. Event registration fields
4. Any other request types

Once you provide the specific fields for each route, I'll implement them following the same pattern.

---

## Contact

Email: developer@factoryjet.com

For questions about this architecture or to provide the exact fields for new routes.
