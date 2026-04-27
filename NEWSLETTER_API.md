# Newsletter Subscription API Documentation

## Overview
The Newsletter API handles email subscriptions for newsletter content. It's a simplified endpoint that only requires an email address to subscribe users to the newsletter.

**Base URL:** `http://localhost:3000/newsletter`

---

## Endpoints

### 1. Subscribe to Newsletter
**Endpoint:** `POST /newsletter/subscribe`

**Description:** Subscribe an email address to the newsletter.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "string (required, valid email format)"
}
```

**Body Parameters:**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `email` | String | Yes | Email address to subscribe | "user@example.com" |

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "subscription": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "type": "newsletter",
    "createdAt": "2026-04-27T10:30:00.000Z"
  }
}
```

**Error Response (400) - Missing Email:**
```json
{
  "success": false,
  "error": "Email is required"
}
```

**Error Response (409) - Already Subscribed:**
```json
{
  "success": false,
  "error": "Email already subscribed to newsletter"
}
```

**Error Response (500) - Server Error:**
```json
{
  "success": false,
  "error": "Failed to subscribe to newsletter"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

**JavaScript Example:**
```javascript
const response = await fetch('http://localhost:3000/newsletter/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
});
const result = await response.json();
console.log(result);
```

**Python Example:**
```python
import requests

response = requests.post('http://localhost:3000/newsletter/subscribe', json={
    'email': 'user@example.com'
})
data = response.json()
print(data)
```

---

### 2. Unsubscribe from Newsletter
**Endpoint:** `POST /newsletter/unsubscribe`

**Description:** Unsubscribe an email address from the newsletter.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "string (required)"
}
```

**Body Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | String | Yes | Email address to unsubscribe |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

**Error Response (400) - Missing Email:**
```json
{
  "success": false,
  "error": "Email is required"
}
```

**Error Response (404) - Not Found:**
```json
{
  "success": false,
  "error": "Subscription not found"
}
```

**Error Response (500) - Server Error:**
```json
{
  "success": false,
  "error": "Failed to unsubscribe from newsletter"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/newsletter/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

---

### 3. Get All Newsletter Subscribers
**Endpoint:** `GET /newsletter`

**Description:** Retrieve all newsletter subscribers. (Admin only - no auth currently required)

**Request Parameters:** None

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "subscribers": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user1@example.com",
      "createdAt": "2026-04-27T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "email": "user2@example.com",
      "createdAt": "2026-04-27T11:00:00.000Z"
    }
  ]
}
```

**Empty Response (200):**
```json
{
  "success": true,
  "count": 0,
  "subscribers": []
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to fetch newsletter subscribers"
}
```

**cURL Example:**
```bash
curl http://localhost:3000/newsletter
```

---

### 4. Unsubscribe by ID
**Endpoint:** `DELETE /newsletter/:id`

**Description:** Delete a newsletter subscriber by ID.

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | String | MongoDB ObjectId of subscription |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Newsletter subscription not found"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to unsubscribe from newsletter"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:3000/newsletter/507f1f77bcf86cd799439011
```

---

## Data Model

### Newsletter Subscription Object

```json
{
  "_id": "MongoDB ObjectId",
  "email": "String - Email address",
  "type": "newsletter",
  "company": "Newsletter Subscriber",
  "phone": "String (empty)",
  "message": "String (empty)",
  "file": null,
  "status": "new",
  "notes": "String (empty)",
  "createdAt": "ISO 8601 Date",
  "updatedAt": "ISO 8601 Date"
}
```

---

## HTTP Status Codes

| Status | Code | Scenario |
|--------|------|----------|
| 201 | Created | Subscription created successfully |
| 200 | OK | Successful GET or DELETE |
| 400 | Bad Request | Missing email field |
| 404 | Not Found | Subscription doesn't exist |
| 409 | Conflict | Email already subscribed |
| 500 | Internal Server Error | Server-side error |

---

## Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Email is required" | Missing email field | Include email in request body |
| "Email already subscribed to newsletter" | Email already exists | Use different email or unsubscribe first |
| "Subscription not found" | Email not in database | Verify email address is correct |
| "Newsletter subscription not found" | Invalid subscription ID | Verify the ID is correct |
| "Failed to subscribe to newsletter" | Database error | Check MongoDB connection |
| "Failed to unsubscribe from newsletter" | Database error | Check server logs |

---

## Usage Examples

### Example 1: Subscribe User via Frontend Form

**Scenario:** User enters email on website and clicks "Subscribe"

```bash
curl -X POST http://localhost:3000/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "subscription": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "type": "newsletter",
    "createdAt": "2026-04-27T10:30:00.000Z"
  }
}
```

---

### Example 2: User Unsubscribes

**Scenario:** User clicks unsubscribe link in email

```bash
curl -X POST http://localhost:3000/newsletter/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

### Example 3: Get All Subscribers (Admin)

**Scenario:** Admin dashboard needs to display all subscribers

```bash
curl http://localhost:3000/newsletter
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "subscribers": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "email": "john@example.com",
      "createdAt": "2026-04-27T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "email": "jane@example.com",
      "createdAt": "2026-04-27T11:00:00.000Z"
    }
  ]
}
```

---

### Example 4: Admin Removes Subscriber

**Scenario:** Admin manually removes a subscriber

```bash
curl -X DELETE http://localhost:3000/newsletter/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

## Frontend Integration Examples

### React Component

```jsx
import { useState } from 'react';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('✅ Successfully subscribed!');
        setEmail('');
      } else {
        setStatus(`❌ ${data.error}`);
      }
    } catch (error) {
      setStatus('❌ Error subscribing');
    }
  };

  return (
    <form onSubmit={handleSubscribe}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Subscribe</button>
      {status && <p>{status}</p>}
    </form>
  );
}

export default NewsletterForm;
```

### HTML Form

```html
<form id="newsletterForm">
  <input 
    type="email" 
    id="email" 
    placeholder="Enter your email" 
    required
  >
  <button type="submit">Subscribe to Newsletter</button>
  <p id="message"></p>
</form>

<script>
  document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const messageEl = document.getElementById('message');

    try {
      const response = await fetch('http://localhost:3000/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (data.success) {
        messageEl.textContent = '✅ Successfully subscribed!';
        document.getElementById('email').value = '';
      } else {
        messageEl.textContent = `❌ ${data.error}`;
      }
    } catch (error) {
      messageEl.textContent = '❌ Error subscribing';
    }
  });
</script>
```

---

## Best Practices

### 1. Validate Email on Client Side
```javascript
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

if (!isValidEmail(email)) {
  setStatus('Invalid email format');
  return;
}
```

### 2. Handle Duplicate Subscriptions Gracefully
```javascript
if (response.status === 409) {
  // Email already subscribed
  setStatus('✅ You are already subscribed!');
} else if (response.status === 201) {
  // New subscription
  setStatus('✅ Successfully subscribed!');
}
```

### 3. Show Success/Error Messages
```javascript
if (data.success) {
  // Show success message
  setTimeout(() => {
    setStatus(''); // Clear message after 3 seconds
  }, 3000);
} else {
  // Show error message
  setStatus(data.error);
}
```

### 4. Unsubscribe Link in Email
```html
<!-- In email template -->
<a href="http://your-domain.com/unsubscribe?email=user@example.com">
  Unsubscribe
</a>

<script>
// Frontend handler
const params = new URLSearchParams(window.location.search);
const email = params.get('email');

if (email) {
  fetch('http://localhost:3000/newsletter/unsubscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
}
</script>
```

---

## Database Schema

Newsletter subscriptions are stored in the `Lead` collection with the following fields:

```javascript
{
  _id: ObjectId,
  email: String (required, lowercase, unique per type),
  type: "newsletter" (enum),
  company: "Newsletter Subscriber" (default),
  phone: String (empty),
  message: String (empty),
  file: null,
  status: "new" (enum),
  notes: String (empty),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## Future Enhancements

As mentioned, you can later create separate routes for:

1. **Playbook Requests** - Users interested in more playbooks
   - Route: `POST /playbook-request`
   - Fields: email, category, type: "playbook_request"

2. **Feature Requests** - Users requesting specific features
   - Route: `POST /feature-request`
   - Fields: email, feature_title, description, type: "feature_request"

3. **Event Registrations** - Users registering for events
   - Route: `POST /event-registration`
   - Fields: email, event_id, full_name, type: "event_registration"

Each will follow the same pattern as the newsletter API.

---

## Testing

### With cURL

```bash
# Subscribe
curl -X POST http://localhost:3000/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Get all
curl http://localhost:3000/newsletter

# Unsubscribe
curl -X POST http://localhost:3000/newsletter/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### With Postman

1. Create new collection: "Newsletter API"
2. POST request: `http://localhost:3000/newsletter/subscribe`
   - Body: `{"email":"test@example.com"}`
3. GET request: `http://localhost:3000/newsletter`
4. POST request: `http://localhost:3000/newsletter/unsubscribe`
   - Body: `{"email":"test@example.com"}`

---

## Support

For questions or issues with the Newsletter API:

- **Email:** developer@factoryjet.com
- **Documentation:** See NEWSLETTER_API.md
- **Related:** LEAD_CAPTURE_API_DOCS.md

---

## License

This API is part of the CXO TechBOT Backend.
