# Newsletter API - Updated with Email Parameter Support

## Overview
The Newsletter API now supports email subscription through **THREE different methods**:
1. **URL Path Parameters** (Recommended) - Cleanest & most RESTful
2. **Query Parameters** - Flexible for web forms
3. **Request Body** - Traditional JSON POST

---

## API Endpoints

### Subscribe Methods

#### 1. Subscribe via URL Path (RECOMMENDED)
```
POST   /newsletter/subscribe/:email
GET    /newsletter/subscribe/:email
```

**Examples:**
```bash
# Simple POST
curl -X POST http://localhost:3000/newsletter/subscribe/user@example.com

# GET request (works in email links)
curl http://localhost:3000/newsletter/subscribe/user@example.com
```

**Response (201 Created):**
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

---

#### 2. Subscribe via Query Parameter
```
POST   /newsletter/subscribe?email=user@example.com
```

**Examples:**
```bash
curl -X POST "http://localhost:3000/newsletter/subscribe?email=user@example.com"
```

**Response (201 Created):**
Same as above

---

#### 3. Subscribe via Request Body
```
POST   /newsletter/subscribe
Content-Type: application/json

{"email":"user@example.com"}
```

**Examples:**
```bash
curl -X POST http://localhost:3000/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

**Response (201 Created):**
Same as above

---

### Unsubscribe Methods

#### 1. Unsubscribe via URL Path (RECOMMENDED)
```
POST   /newsletter/unsubscribe/:email
```

**Examples:**
```bash
curl -X POST http://localhost:3000/newsletter/unsubscribe/user@example.com
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

#### 2. Unsubscribe via Query Parameter
```
POST   /newsletter/unsubscribe?email=user@example.com
```

**Examples:**
```bash
curl -X POST "http://localhost:3000/newsletter/unsubscribe?email=user@example.com"
```

**Response (200 OK):**
Same as above

---

#### 3. Unsubscribe via Request Body
```
POST   /newsletter/unsubscribe
Content-Type: application/json

{"email":"user@example.com"}
```

**Examples:**
```bash
curl -X POST http://localhost:3000/newsletter/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

**Response (200 OK):**
Same as above

---

### Admin Endpoints

#### Get All Subscribers
```
GET    /newsletter
```

**Response (200 OK):**
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

---

#### Delete Subscriber by ID
```
DELETE /newsletter/:id
```

**Examples:**
```bash
curl -X DELETE http://localhost:3000/newsletter/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

## Error Responses

### 400 Bad Request - Missing Email
```json
{
  "success": false,
  "error": "Email is required. Provide as: /subscribe/:email or /subscribe?email=user@example.com or in request body"
}
```

### 409 Conflict - Already Subscribed
```json
{
  "success": false,
  "error": "Email already subscribed to newsletter"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Subscription not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Failed to subscribe to newsletter"
}
```

---

## Usage Examples

### JavaScript

**Subscribe via URL path:**
```javascript
const email = "user@example.com";
const response = await fetch(`http://localhost:3000/newsletter/subscribe/${email}`, {
  method: 'POST'
});
const data = await response.json();
console.log(data.success ? '✅ Subscribed' : '❌ ' + data.error);
```

**Subscribe via query param:**
```javascript
const email = "user@example.com";
const response = await fetch(`http://localhost:3000/newsletter/subscribe?email=${email}`, {
  method: 'POST'
});
const data = await response.json();
console.log(data);
```

**Subscribe via body:**
```javascript
const response = await fetch('http://localhost:3000/newsletter/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
});
const data = await response.json();
console.log(data);
```

---

### React Component

```jsx
import { useState } from 'react';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    try {
      // Using URL path method (recommended)
      const response = await fetch(
        `http://localhost:3000/newsletter/subscribe/${email}`,
        { method: 'POST' }
      );
      
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

---

### Python

```python
import requests

# Using URL path method
email = "user@example.com"
response = requests.post(f'http://localhost:3000/newsletter/subscribe/{email}')
data = response.json()
print(f"Success: {data['success']}")
```

---

## Recommended Usage Pattern

### For Chatbot Integration:
```
POST /newsletter/subscribe/:email
```
Simple, no JSON parsing needed

### For Web Forms:
```
POST /newsletter/subscribe?email=user@example.com
```
Easy to construct from form data

### For Mobile/API:
```
POST /newsletter/subscribe
Body: {"email":"user@example.com"}
```
Standard JSON approach

### For Email Unsubscribe Links:
```
GET /newsletter/subscribe/:email
OR
GET /newsletter/unsubscribe/:email
```
Works directly in email clients

---

## Email Parameter Validation

- **Required:** Email must be provided in one of three ways
- **Format:** Valid email format required (user@example.com)
- **Case Handling:** Automatically converted to lowercase
- **Duplicates:** Returns 409 Conflict if already subscribed
- **Trimming:** Whitespace automatically trimmed

---

## Response Status Codes

| Code | Meaning | Scenario |
|------|---------|----------|
| 200 | OK | Successful GET, DELETE, unsubscribe |
| 201 | Created | Successful subscription |
| 400 | Bad Request | Missing email field |
| 404 | Not Found | Email/ID not found |
| 409 | Conflict | Email already subscribed |
| 500 | Server Error | Database/server error |

---

## Database Storage

Newsletter subscriptions are stored with:
```javascript
{
  _id: ObjectId,
  email: String (lowercase),
  type: "newsletter",
  company: "Newsletter Subscriber",
  createdAt: Date,
  updatedAt: Date
}
```

---

## Testing All Methods

```bash
# Method 1: URL path
curl -X POST http://localhost:3000/newsletter/subscribe/test1@example.com

# Method 2: Query parameter
curl -X POST "http://localhost:3000/newsletter/subscribe?email=test2@example.com"

# Method 3: Request body
curl -X POST http://localhost:3000/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test3@example.com"}'

# List all
curl http://localhost:3000/newsletter

# Unsubscribe (all 3 methods work)
curl -X POST http://localhost:3000/newsletter/unsubscribe/test1@example.com
```

---

## Best Practices

1. **For Chatbots:** Use URL path method for simplicity
2. **For Forms:** Use query parameters for easy JavaScript
3. **For APIs:** Use request body for security
4. **For Email Links:** Use GET with URL path (works in all email clients)
5. **Error Handling:** Always check `success` field in response

---

## Troubleshooting

### "Email is required" error
- Check email is provided in one of these ways:
  - URL path: `/subscribe/email@example.com`
  - Query: `?email=email@example.com`
  - Body: `{"email":"email@example.com"}`

### "Already subscribed" error
- Email already in database
- Use unsubscribe first or try different email
- Status code 409 (Conflict) is normal

### Server errors
- Check MongoDB connection
- Verify .env has correct database URL
- Check server logs: `tail -f /tmp/server.log`

---

## Related Documentation

- **NEWSLETTER_API.md** - Original comprehensive documentation
- **SEPARATE_ROUTES_ARCHITECTURE.md** - Architecture for other request types
- **Lead Capture API** - For other types of lead capture

---

## Support

Email: developer@factoryjet.com

For issues or questions about the Newsletter API.
