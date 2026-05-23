# Lead Capture API - Quick Reference Guide

**Base URL:** `http://localhost:3000/leads`

---

## All Endpoints Summary

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|------------|
| POST | `/leads` | Create new lead | 201 |
| GET | `/leads` | Get all leads | 200 |
| GET | `/leads/:id` | Get specific lead | 200 |
| PUT | `/leads/:id` | Update lead | 200 |
| DELETE | `/leads/:id` | Delete lead | 200 |

---

## Create Lead - POST /leads

**Required Fields:** `company`, `email`

```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Company Name",
    "email": "contact@company.com",
    "phone": "+1-234-567-8900",
    "message": "Message text",
    "type": "partnership"
  }'
```

**Lead Types:**
- `event_collaboration` - Event partnerships
- `partnership` - Business partnerships
- `media_inquiry` - Press/media
- `general_inquiry` - General questions (default)
- `other` - Other inquiries

---

## Get All Leads - GET /leads

```bash
curl http://localhost:3000/leads
```

**Returns:** Array of all leads, sorted by newest first

---

## Get Single Lead - GET /leads/:id

```bash
curl http://localhost:3000/leads/507f1f77bcf86cd799439011
```

**Returns:** Single lead object or 404 if not found

---

## Update Lead - PUT /leads/:id

**Updatable Fields:** `status`, `notes`

```bash
curl -X PUT http://localhost:3000/leads/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "notes": "Follow-up scheduled for May 5th"
  }'
```

**Status Values:**
- `new` - Newly captured (default)
- `contacted` - Contact made
- `replied` - Lead responded
- `closed` - Deal closed/archived

---

## Delete Lead - DELETE /leads/:id

```bash
curl -X DELETE http://localhost:3000/leads/507f1f77bcf86cd799439011
```

**Returns:** Success message

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Lead created successfully",
  "lead": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## Common Errors

| Error | Solution |
|-------|----------|
| "Company and email are required" | Include both fields |
| "Lead not found" | Verify lead ID exists |
| "Failed to create lead" | Check MongoDB connection |
| "Failed to update lead" | Verify data format |
| "Failed to delete lead" | Check server logs |

---

## Lead Object Structure

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "company": "Company Name",
  "email": "email@company.com",
  "phone": "+1-234-567-8900",
  "message": "Inquiry message",
  "file": null,
  "type": "partnership",
  "status": "new",
  "notes": "",
  "createdAt": "2026-04-27T10:30:00.000Z",
  "updatedAt": "2026-04-27T10:30:00.000Z"
}
```

---

## Workflow Example

### Step 1: Create Lead (Chatbot captures inquiry)
```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Tech Corp",
    "email": "contact@techcorp.com",
    "message": "Interested in partnership",
    "type": "partnership"
  }'
# Response: { "success": true, "lead": { "_id": "123..." } }
```

### Step 2: Contact Lead (Sales team reaches out)
```bash
curl -X PUT http://localhost:3000/leads/123... \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "notes": "Called on 2026-04-27, very interested"
  }'
```

### Step 3: Track Response (Lead replies)
```bash
curl -X PUT http://localhost:3000/leads/123... \
  -d '{
    "status": "replied",
    "notes": "Responded positively, wants demo"
  }'
```

### Step 4: Close Deal (Agreement reached)
```bash
curl -X PUT http://localhost:3000/leads/123... \
  -d '{
    "status": "closed",
    "notes": "Contract signed 2026-05-10, partnership active"
  }'
```

---

## Testing with Postman

### 1. Create Lead
- **Method:** POST
- **URL:** `http://localhost:3000/leads`
- **Body (JSON):**
```json
{
  "company": "Test Company",
  "email": "test@company.com",
  "phone": "+1-234-567-8900",
  "message": "Test message",
  "type": "partnership"
}
```

### 2. Get All Leads
- **Method:** GET
- **URL:** `http://localhost:3000/leads`

### 3. Get Single Lead
- **Method:** GET
- **URL:** `http://localhost:3000/leads/{ID_FROM_STEP_1}`

### 4. Update Lead
- **Method:** PUT
- **URL:** `http://localhost:3000/leads/{ID_FROM_STEP_1}`
- **Body (JSON):**
```json
{
  "status": "contacted",
  "notes": "Initial contact made"
}
```

### 5. Delete Lead
- **Method:** DELETE
- **URL:** `http://localhost:3000/leads/{ID_FROM_STEP_1}`

---

## Integration with Engati

**Webhook URL for Engati:** 
```
http://your-domain.com/leads
```

**Engati sends POST with:**
```json
{
  "company": "User/Company",
  "email": "user@example.com",
  "phone": "optional",
  "message": "user inquiry",
  "type": "general_inquiry"
}
```

---

## Notifications

When a lead is created:
1. **Email** sent to admin with lead details
2. **Telegram** notification to configured channel

**Configure in .env:**
```
ADMIN_EMAIL=admin@cxotechbot.com
TELEGRAM_BOT_TOKEN=your-token
TELEGRAM_CHAT_ID=your-chat-id
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK (GET, PUT, DELETE success) |
| 201 | Created (POST success) |
| 400 | Bad Request (missing fields) |
| 404 | Not Found (lead doesn't exist) |
| 500 | Server Error (database issue) |

---

## JavaScript/Node.js Example

```javascript
// Create Lead
const response = await fetch('http://localhost:3000/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    company: 'Tech Corp',
    email: 'contact@techcorp.com',
    message: 'Partnership inquiry',
    type: 'partnership'
  })
});
const lead = await response.json();
console.log(lead.lead._id); // Get the ID

// Get All Leads
const all = await fetch('http://localhost:3000/leads').then(r => r.json());
console.log(all); // Array of leads

// Update Lead
const updated = await fetch(`http://localhost:3000/leads/${lead.lead._id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'contacted',
    notes: 'Called and interested'
  })
}).then(r => r.json());
```

---

## Python Example

```python
import requests
import json

BASE_URL = 'http://localhost:3000/leads'

# Create Lead
response = requests.post(BASE_URL, json={
    'company': 'Tech Corp',
    'email': 'contact@techcorp.com',
    'message': 'Partnership inquiry',
    'type': 'partnership'
})
lead = response.json()
lead_id = lead['lead']['_id']

# Get All Leads
all_leads = requests.get(BASE_URL).json()

# Update Lead
requests.put(f'{BASE_URL}/{lead_id}', json={
    'status': 'contacted',
    'notes': 'Called and interested'
})

# Delete Lead
requests.delete(f'{BASE_URL}/{lead_id}')
```

---

## Tips & Tricks

### 1. Auto-increment leads
```bash
# Get total leads
curl http://localhost:3000/leads | jq 'length'
```

### 2. Search by email (manual)
```bash
# Get all and filter
curl http://localhost:3000/leads | jq '.[] | select(.email=="contact@example.com")'
```

### 3. Batch update status
```bash
# Get all new leads and mark contacted
curl http://localhost:3000/leads | jq '.[] | select(.status=="new") | ._id' | \
while read id; do
  curl -X PUT http://localhost:3000/leads/$id \
    -d '{"status":"contacted"}'
done
```

### 4. Export leads to CSV
```bash
curl http://localhost:3000/leads | jq -r '.[] | [.company, .email, .phone, .type, .status] | @csv'
```

---

## FAQ

**Q: How do I get the lead ID?**
A: After creating a lead, the response contains the `_id` field. Use that for updates/deletes.

**Q: Can I get leads with specific status?**
A: Not directly via API. Get all leads and filter client-side, or add filtering feature.

**Q: Why aren't notifications sending?**
A: Check .env file has correct email/Telegram config. Check server logs for errors.

**Q: Can I update company or email?**
A: Currently, only `status` and `notes` can be updated. Modify the API if needed.

**Q: Is there pagination?**
A: Not implemented. All leads returned at once. Consider adding limit/offset parameters.

---

## Useful Links

- **Full Documentation:** LEAD_CAPTURE_API_DOCS.md
- **GitHub Issues:** [Report bugs here]
- **Email Support:** developer@factoryjet.com
