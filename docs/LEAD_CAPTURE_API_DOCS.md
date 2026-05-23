# Lead Capture API Documentation

## Overview
The Lead Capture API is designed to capture, manage, and track leads from various sources including the Engati chatbot integration. All leads are stored in MongoDB with automatic email and Telegram notifications.

**Base URL:** `http://localhost:3000`

---

## Table of Contents
1. [Create Lead (POST)](#create-lead)
2. [Get All Leads (GET)](#get-all-leads)
3. [Get Lead by ID (GET)](#get-lead-by-id)
4. [Update Lead (PUT)](#update-lead)
5. [Delete Lead (DELETE)](#delete-lead)
6. [Response Models](#response-models)
7. [Error Handling](#error-handling)
8. [Usage Examples](#usage-examples)

---

## API Endpoints

### Create Lead
**Endpoint:** `POST /leads`

**Description:** Create a new lead from chatbot or external source. Automatically sends notifications via email and Telegram.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "company": "string (required)",
  "email": "string (required, valid email format)",
  "phone": "string (optional)",
  "message": "string (optional)",
  "file": "string (optional, file URL)",
  "type": "string (optional, default: 'general_inquiry')"
}
```

**Body Parameters:**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `company` | String | Yes | Company name or person name | "Acme Corp", "John Doe" |
| `email` | String | Yes | Contact email address | "contact@example.com" |
| `phone` | String | No | Contact phone number | "+1-234-567-8900" |
| `message` | String | No | Message or inquiry details | "Interested in partnership" |
| `file` | String | No | URL to attached file (PDF, doc, etc.) | "https://example.com/resume.pdf" |
| `type` | String | No | Lead type from enum | "event_collaboration", "partnership", "media_inquiry", "general_inquiry", "other" |

**Valid Lead Types:**
- `event_collaboration` - For event partnership inquiries
- `partnership` - For business partnership opportunities
- `media_inquiry` - For media/press inquiries
- `general_inquiry` - General questions (default)
- `other` - Any other type of inquiry

**Success Response (201):**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "lead": {
    "_id": "507f1f77bcf86cd799439011",
    "company": "Acme Corp",
    "email": "contact@acme.com",
    "phone": "+1-234-567-8900",
    "message": "Interested in partnership for AI summit",
    "file": "https://example.com/proposal.pdf",
    "type": "partnership",
    "status": "new",
    "notes": "",
    "createdAt": "2026-04-27T10:30:00.000Z",
    "updatedAt": "2026-04-27T10:30:00.000Z",
    "__v": 0
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Company and email are required"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to create lead"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Tech Innovations Inc",
    "email": "sales@techinnovations.com",
    "phone": "+1-555-123-4567",
    "message": "Want to explore partnership opportunities",
    "type": "partnership"
  }'
```

---

### Get All Leads
**Endpoint:** `GET /leads`

**Description:** Retrieve all leads sorted by creation date (newest first).

**Request Parameters:** None

**Query Parameters:** None (currently no filtering/pagination parameters)

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "company": "Acme Corp",
    "email": "contact@acme.com",
    "phone": "+1-234-567-8900",
    "message": "Interested in partnership",
    "file": null,
    "type": "partnership",
    "status": "new",
    "notes": "",
    "createdAt": "2026-04-27T10:30:00.000Z",
    "updatedAt": "2026-04-27T10:30:00.000Z",
    "__v": 0
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "company": "Global Media Ltd",
    "email": "press@globalmedia.com",
    "phone": "+44-20-7946-0958",
    "message": "Media coverage inquiry for upcoming event",
    "file": "https://example.com/media-kit.pdf",
    "type": "media_inquiry",
    "status": "contacted",
    "notes": "Follow up scheduled for next week",
    "createdAt": "2026-04-26T15:45:00.000Z",
    "updatedAt": "2026-04-27T09:00:00.000Z",
    "__v": 0
  }
]
```

**Empty Response (200):**
```json
[]
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to fetch leads"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3000/leads
```

---

### Get Lead by ID
**Endpoint:** `GET /leads/:id`

**Description:** Retrieve a specific lead by its MongoDB ID.

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | String | MongoDB ObjectId of the lead |

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "company": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "+1-234-567-8900",
  "message": "Interested in partnership",
  "file": null,
  "type": "partnership",
  "status": "new",
  "notes": "",
  "createdAt": "2026-04-27T10:30:00.000Z",
  "updatedAt": "2026-04-27T10:30:00.000Z",
  "__v": 0
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Lead not found"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to fetch lead"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3000/leads/507f1f77bcf86cd799439011
```

---

### Update Lead
**Endpoint:** `PUT /leads/:id`

**Description:** Update lead status and notes. Typically used to track lead progress through sales pipeline.

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | String | MongoDB ObjectId of the lead |

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "string (optional)",
  "notes": "string (optional)"
}
```

**Body Parameters:**

| Field | Type | Required | Description | Valid Values |
|-------|------|----------|-------------|--------------|
| `status` | String | No | Lead status in sales pipeline | "new", "contacted", "replied", "closed" |
| `notes` | String | No | Internal notes about the lead | Any text |

**Status Values:**
- `new` - Newly captured lead, no contact yet
- `contacted` - Initial contact made with lead
- `replied` - Lead has responded to contact
- `closed` - Deal closed or lead archived

**Success Response (200):**
```json
{
  "success": true,
  "message": "Lead updated successfully",
  "lead": {
    "_id": "507f1f77bcf86cd799439011",
    "company": "Acme Corp",
    "email": "contact@acme.com",
    "phone": "+1-234-567-8900",
    "message": "Interested in partnership",
    "file": null,
    "type": "partnership",
    "status": "contacted",
    "notes": "Called on 2026-04-27, will follow up next week",
    "createdAt": "2026-04-27T10:30:00.000Z",
    "updatedAt": "2026-04-27T14:25:00.000Z",
    "__v": 0
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Lead not found"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to update lead"
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:3000/leads/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "notes": "Called on 2026-04-27, interested in Q3 collaboration"
  }'
```

---

### Delete Lead
**Endpoint:** `DELETE /leads/:id`

**Description:** Permanently delete a lead from the system.

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | String | MongoDB ObjectId of the lead |

**Request Body:** None

**Success Response (200):**
```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Lead not found"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to delete lead"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:3000/leads/507f1f77bcf86cd799439011
```

---

## Response Models

### Lead Object

```json
{
  "_id": "MongoDB ObjectId",
  "company": "String - Company/person name",
  "email": "String - Email address",
  "phone": "String - Phone number (optional)",
  "message": "String - Lead message/inquiry (optional)",
  "file": "String - File URL (optional, null if not provided)",
  "type": "String - Lead type (enum: event_collaboration, partnership, media_inquiry, general_inquiry, other)",
  "status": "String - Status in pipeline (enum: new, contacted, replied, closed)",
  "notes": "String - Internal notes (optional, empty string by default)",
  "createdAt": "ISO 8601 Date - When lead was created",
  "updatedAt": "ISO 8601 Date - When lead was last updated",
  "__v": "Number - MongoDB version field"
}
```

### Error Response Object

```json
{
  "success": false,
  "error": "String - Error message describing what went wrong"
}
```

### Success Response Object

```json
{
  "success": true,
  "message": "String - Success message",
  "lead": "Lead Object (when applicable)"
}
```

---

## Error Handling

### HTTP Status Codes

| Status | Code | Scenario |
|--------|------|----------|
| 201 | Created | Lead successfully created |
| 200 | OK | Successful GET, PUT, or DELETE |
| 400 | Bad Request | Missing required fields or invalid format |
| 404 | Not Found | Lead ID doesn't exist |
| 500 | Internal Server Error | Server-side error |

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Company and email are required" | Missing required fields | Include both `company` and `email` in request |
| "Lead not found" | Invalid or non-existent ID | Verify the lead ID is correct |
| "Failed to create lead" | Database error | Check MongoDB connection and retry |
| "Failed to fetch leads" | Database error | Check server logs |
| "Failed to update lead" | Database error or validation error | Verify data format and retry |
| "Failed to delete lead" | Database error | Check server logs |

---

## Usage Examples

### Example 1: Create Lead from Chatbot

**Scenario:** Engati chatbot captures user inquiry about event collaboration.

```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Digital Marketing Solutions",
    "email": "events@digitalmarketingsolutions.com",
    "phone": "+1-800-555-0123",
    "message": "Interested in sponsoring the CXO Tech Summit 2026",
    "type": "event_collaboration"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "lead": {
    "_id": "507f1f77bcf86cd799439013",
    "company": "Digital Marketing Solutions",
    "email": "events@digitalmarketingsolutions.com",
    "phone": "+1-800-555-0123",
    "message": "Interested in sponsoring the CXO Tech Summit 2026",
    "file": null,
    "type": "event_collaboration",
    "status": "new",
    "notes": "",
    "createdAt": "2026-04-27T11:45:00.000Z",
    "updatedAt": "2026-04-27T11:45:00.000Z",
    "__v": 0
  }
}
```

**Notifications Sent:**
- Email notification to admin@cxotechbot.com
- Telegram notification to configured channel

---

### Example 2: List All Leads

**Scenario:** Admin dashboard retrieves all leads for review.

```bash
curl -X GET http://localhost:3000/leads
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "company": "Digital Marketing Solutions",
    "email": "events@digitalmarketingsolutions.com",
    "phone": "+1-800-555-0123",
    "message": "Interested in sponsoring the CXO Tech Summit 2026",
    "file": null,
    "type": "event_collaboration",
    "status": "new",
    "notes": "",
    "createdAt": "2026-04-27T11:45:00.000Z",
    "updatedAt": "2026-04-27T11:45:00.000Z"
  }
]
```

---

### Example 3: Update Lead Status

**Scenario:** Sales team contacts lead and updates status.

```bash
curl -X PUT http://localhost:3000/leads/507f1f77bcf86cd799439013 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "notes": "Sarah from sales called. They are interested. Follow-up meeting scheduled for May 5th."
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Lead updated successfully",
  "lead": {
    "_id": "507f1f77bcf86cd799439013",
    "company": "Digital Marketing Solutions",
    "email": "events@digitalmarketingsolutions.com",
    "phone": "+1-800-555-0123",
    "message": "Interested in sponsoring the CXO Tech Summit 2026",
    "file": null,
    "type": "event_collaboration",
    "status": "contacted",
    "notes": "Sarah from sales called. They are interested. Follow-up meeting scheduled for May 5th.",
    "createdAt": "2026-04-27T11:45:00.000Z",
    "updatedAt": "2026-04-27T13:30:00.000Z"
  }
}
```

---

### Example 4: Retrieve Specific Lead

**Scenario:** View detailed information about a specific lead.

```bash
curl -X GET http://localhost:3000/leads/507f1f77bcf86cd799439013
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "company": "Digital Marketing Solutions",
  "email": "events@digitalmarketingsolutions.com",
  "phone": "+1-800-555-0123",
  "message": "Interested in sponsoring the CXO Tech Summit 2026",
  "file": null,
  "type": "event_collaboration",
  "status": "contacted",
  "notes": "Sarah from sales called. They are interested. Follow-up meeting scheduled for May 5th.",
  "createdAt": "2026-04-27T11:45:00.000Z",
  "updatedAt": "2026-04-27T13:30:00.000Z"
}
```

---

### Example 5: Delete Lead

**Scenario:** Remove a spam or duplicate lead from system.

```bash
curl -X DELETE http://localhost:3000/leads/507f1f77bcf86cd799439013
```

**Response:**
```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

---

## Integration with Engati Chatbot

### Webhook Setup

To automatically capture leads from Engati chatbot:

1. **Configure Engati Webhook URL:**
   ```
   https://your-domain.com/leads
   ```

2. **Webhook Payload from Engati:**
   ```json
   {
     "company": "User or Company Name",
     "email": "user@example.com",
     "phone": "optional phone number",
     "message": "user's message or inquiry",
     "type": "general_inquiry"
   }
   ```

3. **Our API will:**
   - Validate the data
   - Store in MongoDB
   - Send email notification to admin
   - Send Telegram notification
   - Return success response

---

## Best Practices

### 1. Always Include Required Fields
```bash
# ❌ WRONG - Missing company
curl -X POST http://localhost:3000/leads \
  -d '{"email": "test@example.com"}'

# ✅ CORRECT - Both required fields
curl -X POST http://localhost:3000/leads \
  -d '{
    "company": "Test Corp",
    "email": "test@example.com"
  }'
```

### 2. Use Correct Lead Types
```bash
# Valid types for categorization
"type": "event_collaboration"    # For event partnerships
"type": "partnership"             # For business partnerships
"type": "media_inquiry"           # For press/media
"type": "general_inquiry"         # Default for unspecified
"type": "other"                   # For other inquiries
```

### 3. Handle Responses Properly
```bash
# Check for success flag before processing
response = curl -X POST http://localhost:3000/leads -d '...'
if response.success == true:
  leadId = response.lead._id
  # Process the new lead
else:
  # Handle error
  error_msg = response.error
```

### 4. Update Status When Taking Action
```bash
# Always update status as you progress through sales pipeline
# 1. First contact
curl -X PUT http://localhost:3000/leads/{id} \
  -d '{"status": "contacted"}'

# 2. After getting response
curl -X PUT http://localhost:3000/leads/{id} \
  -d '{"status": "replied"}'

# 3. When deal closes
curl -X PUT http://localhost:3000/leads/{id} \
  -d '{"status": "closed", "notes": "Signed contract on..."}'
```

### 5. Add Meaningful Notes
```bash
curl -X PUT http://localhost:3000/leads/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "notes": "Called 2026-04-27 10:30 AM. Interest level: High. Budget: $50K-100K. Follow-up: May 5th."
  }'
```

---

## Notifications

When a lead is created, the following notifications are automatically sent:

### Email Notification
- **Recipient:** Admin email (configured in .env)
- **Subject:** "New Lead: [Company Name]"
- **Content:** Lead details including company, email, phone, type

### Telegram Notification
- **Channel:** Configured Telegram bot channel
- **Message:** Formatted lead details with emoji indicators
- **Content:** Company, email, phone, message, and lead type

### Configuration (.env)
```
# Email Notifications
ADMIN_EMAIL=admin@cxotechbot.com
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Telegram Notifications
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

---

## Troubleshooting

### Lead Not Created
**Symptoms:** Getting 400 error "Company and email are required"

**Solution:** Ensure both fields are included in request body:
```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Company Name",
    "email": "email@example.com"
  }'
```

### Lead Not Found
**Symptoms:** Getting 404 error when fetching specific lead

**Solution:** Verify the lead ID is correct using:
```bash
# Get all leads and check IDs
curl http://localhost:3000/leads
```

### Notifications Not Sending
**Symptoms:** Lead created but no email/Telegram notification

**Solution:** Check configuration:
1. Verify .env file has correct email/Telegram settings
2. Check server logs for notification errors
3. Confirm email service credentials are valid
4. Verify Telegram bot token and chat ID

### Database Connection Issues
**Symptoms:** 500 error on all lead operations

**Solution:**
1. Check MongoDB Atlas connection string in .env
2. Verify network IP whitelist in MongoDB Atlas
3. Check server logs: `tail -f server.log`

---

## Rate Limiting

Currently, there is **no rate limiting** implemented. In production, consider implementing:

- Max 100 requests per minute per IP
- Max 10 lead creations per minute
- Throttling for specific endpoints

---

## Security Considerations

1. **Input Validation:** All user inputs are validated and trimmed
2. **Email Validation:** Email field must be valid format
3. **Data Storage:** All leads stored securely in MongoDB
4. **No API Key Required:** Public endpoint (can add authentication if needed)
5. **CORS Enabled:** Accessible from any origin

### Recommended Security Improvements
- Add rate limiting
- Add API key/token authentication
- Add request size limits
- Add input sanitization for XSS prevention
- Add HTTPS enforcement in production

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-27 | Initial release with core CRUD operations |

---

## Support & Contact

For issues or questions regarding the Lead Capture API:

- **Email:** developer@factoryjet.com
- **Documentation:** See LEAD_CAPTURE_API_DOCS.md
- **Endpoint:** POST /leads (for lead capture)

---

## License

This API is part of the CXO TechBOT Backend and is subject to the same license terms as the main application.
