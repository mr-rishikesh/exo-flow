# Lead Capture API Documentation

Complete guide to capturing leads from your Engati chatbot and storing them in Google Sheets.

---

## 🔧 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Google Sheets Authentication

#### Step 1: Create Google Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable the Google Sheets API
4. Create a Service Account (Credentials → Service Account)
5. Create a JSON key file
6. Copy the entire JSON content

#### Step 2: Add Google Sheet ID & Credentials to .env
```bash
# .env
GOOGLE_SHEET_ID=1eYrGudW8S9CmP72QGkflmxkWJELjjm2e6KbETCneNGg
GOOGLE_CREDENTIALS='{"type":"service_account","project_id":"...","private_key":"...","client_email":"...","...":"..."}'
```

#### Step 3: Share Google Sheet with Service Account Email
1. Open your Google Sheet
2. Click "Share"
3. Add the service account email (from JSON key: `client_email`)
4. Grant "Editor" permissions

---

## 📡 API Endpoints

### 1. Newsletter Subscription
Simple email capture for newsletter signups.

**Endpoint:**
```
POST /leads/newsletter-subscribe
```

**Request Body:**
```json
{
  "email": "john@company.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "email": "john@company.com"
}
```

**Example with cURL:**
```bash
curl -X POST http://localhost:3000/leads/newsletter-subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"john@company.com"}'
```

---

### 2. Magazine Download
Capture leads requesting magazine downloads.

**Endpoint:**
```
POST /leads/magazine-download
```

**Request Body:**
```json
{
  "email": "john@company.com",
  "magazineTitle": "CXO TechBOT - January 2026"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Download link sent to your email",
  "email": "john@company.com"
}
```

**Engati Integration:**
```
[Captures the magazine title when user requests download]
```

---

### 3. Get Featured / Submit Startup
Capture applications from founders wanting to get featured.

**Endpoint:**
```
POST /leads/get-featured
```

**Request Body:**
```json
{
  "email": "founder@startup.com",
  "fullName": "John Doe",
  "companyName": "TechVenture Inc",
  "role": "Founder & CEO"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "email": "founder@startup.com",
    "fullName": "John Doe",
    "companyName": "TechVenture Inc",
    "role": "Founder & CEO",
    "purpose": "Get Featured"
  }
}
```

---

### 4. Masterclass Registration
Capture registrations for masterclass attendance.

**Endpoint:**
```
POST /leads/masterclass-register
```

**Request Body:**
```json
{
  "email": "executive@company.com",
  "fullName": "Sarah Johnson",
  "companyName": "Fortune 500 Corp",
  "role": "VP Engineering",
  "masterclassTitle": "Generative AI for Business Leaders",
  "masterclassDate": "2026-04-25"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Registered for masterclass successfully",
  "data": {
    "email": "executive@company.com",
    "fullName": "Sarah Johnson",
    "companyName": "Fortune 500 Corp",
    "role": "VP Engineering",
    "purpose": "Masterclass Registration: Generative AI for Business Leaders"
  }
}
```

---

### 5. Event Registration
Capture registrations for events, webinars, and summits.

**Endpoint:**
```
POST /leads/event-register
```

**Request Body:**
```json
{
  "email": "attendee@company.com",
  "fullName": "Michael Chen",
  "companyName": "Tech Corp",
  "role": "CTO",
  "eventName": "CXO Tech Summit Q2 2026",
  "eventDate": "2026-04-15"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Event registration confirmed",
  "data": {
    "email": "attendee@company.com",
    "fullName": "Michael Chen",
    "companyName": "Tech Corp",
    "role": "CTO",
    "purpose": "Event Attendance: CXO Tech Summit Q2 2026"
  }
}
```

---

### 6. Playbook Access Request
Capture leads requesting access to research playbooks.

**Endpoint:**
```
POST /leads/playbook-access
```

**Request Body:**
```json
{
  "email": "leader@company.com",
  "fullName": "Emma Williams",
  "companyName": "Global Tech",
  "role": "Chief Technology Officer",
  "playbookTitle": "Agentic AI Infrastructure Blueprints"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Playbook access granted",
  "data": {
    "email": "leader@company.com",
    "fullName": "Emma Williams",
    "companyName": "Global Tech",
    "role": "Chief Technology Officer",
    "purpose": "Playbook Access: Agentic AI Infrastructure Blueprints"
  }
}
```

---

### 7. General Lead Capture
Flexible endpoint for any custom lead capture scenario.

**Endpoint:**
```
POST /leads/general
```

**Request Body:**
```json
{
  "email": "contact@company.com",
  "fullName": "Robert Smith",
  "companyName": "Innovation Labs",
  "role": "Product Manager",
  "purpose": "Brand Collaboration Inquiry"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Lead captured successfully",
  "data": {
    "email": "contact@company.com",
    "fullName": "Robert Smith",
    "companyName": "Innovation Labs",
    "role": "Product Manager",
    "purpose": "Brand Collaboration Inquiry"
  }
}
```

---

## 🔍 Google Sheets Structure

Data is automatically appended to the Google Sheet with these columns:

| Column | Data | Example |
|--------|------|---------|
| A | Timestamp | 2026-04-20T10:30:45.000Z |
| B | Email | john@company.com |
| C | Full Name | John Doe |
| D | Company Name | Tech Corp Inc |
| E | Role | VP Engineering |
| F | Purpose | Masterclass Registration |
| G | Source | API - Masterclass |
| H | Details | Additional info/notes |

---

## 🔗 Engati Integration Examples

### Example 1: Newsletter Signup
```
Bot: "Would you like to subscribe to our weekly tech newsletter?"
User: "Yes"
Bot: "Great! What's your email?"
User: "john@company.com"

[API Call]
POST /leads/newsletter-subscribe
Body: {"email": "john@company.com"}

Bot: "✅ You've been added to our newsletter!"
```

### Example 2: Magazine Download
```
Bot: "Which magazine would you like to download?"
User: "CXO TechBOT January 2026"

[API Call]
POST /leads/magazine-download
Body: {
  "email": "john@company.com",
  "magazineTitle": "CXO TechBOT January 2026"
}

Bot: "📥 Download link sent to your email!"
```

### Example 3: Masterclass Registration
```
Bot: "Great! Which masterclass interests you?"
User: "Generative AI for Business Leaders"

[API Call]
POST /leads/masterclass-register
Body: {
  "email": "john@company.com",
  "fullName": "John Doe",
  "companyName": "Tech Corp",
  "role": "CTO",
  "masterclassTitle": "Generative AI for Business Leaders",
  "masterclassDate": "2026-04-25"
}

Bot: "✅ Registration confirmed! Check your email for details."
```

### Example 4: Get Featured
```
Bot: "Tell us about your startup..."
User: [Provides company info]

[API Call]
POST /leads/get-featured
Body: {
  "email": "founder@startup.com",
  "fullName": "Jane Smith",
  "companyName": "AI Startup Inc",
  "role": "Founder"
}

Bot: "✅ Application submitted! We'll review and get back to you."
```

---

## ⚠️ Error Handling

### Email Validation Error
```json
{
  "success": false,
  "error": "Valid email is required"
}
```

### Missing Required Fields
```json
{
  "success": false,
  "error": "Email and full name are required"
}
```

### Google Sheets Connection Error
```json
{
  "success": false,
  "error": "Failed to save lead to Google Sheets"
}
```

---

## 🔐 Security Considerations

1. **Email Validation**: All endpoints validate email format
2. **Data Sanitization**: Input data is trimmed and lowercased
3. **Rate Limiting**: Consider adding rate limiting in production
4. **CORS**: Already enabled for Engati integration
5. **Service Account**: Keep `GOOGLE_CREDENTIALS` secure, never commit to Git

---

## 📊 Best Practices

### 1. Form Validation
Validate data on the client (Engati) before sending to API:
- Email format
- Required fields filled
- Company name not empty for formal registrations

### 2. Error Handling
Always handle error responses in Engati:
```
If response.success == false:
  Show error message
  Ask user to retry
```

### 3. Confirmation Messages
Always confirm with the user after successful capture:
- "✅ Email saved!"
- "✅ Registration complete!"
- "✅ We'll contact you soon!"

### 4. Data Privacy
- Use HTTPS in production
- Don't log sensitive data
- Comply with GDPR/CCPA
- Get consent before capturing data

---

## 🧪 Testing

### Test Newsletter Signup
```bash
curl -X POST http://localhost:3000/leads/newsletter-subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Test Get Featured
```bash
curl -X POST http://localhost:3000/leads/get-featured \
  -H "Content-Type: application/json" \
  -d '{
    "email":"founder@startup.com",
    "fullName":"John Doe",
    "companyName":"StartupXYZ",
    "role":"CEO"
  }'
```

### Test Masterclass Registration
```bash
curl -X POST http://localhost:3000/leads/masterclass-register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"exec@company.com",
    "fullName":"Sarah Johnson",
    "companyName":"TechCorp",
    "role":"VP Engineering",
    "masterclassTitle":"Generative AI for Business Leaders",
    "masterclassDate":"2026-04-25"
  }'
```

---

## 📈 Production Checklist

- [ ] Google Sheets authentication configured
- [ ] Service account email has editor access to sheet
- [ ] Environment variables set securely
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Error logging enabled
- [ ] Email validation working
- [ ] Google Sheets columns labeled properly
- [ ] Tested all endpoints
- [ ] Engati integration tested end-to-end

---

## 🆘 Troubleshooting

### "Google Sheets authentication not configured"
**Solution**: Set `GOOGLE_CREDENTIALS` environment variable with service account JSON

### "Failed to save lead"
**Solution**: Check that service account email has editor access to the Google Sheet

### "Valid email is required"
**Solution**: Ensure email format is valid (example@domain.com)

### Missing data in Google Sheets
**Solution**: Check that the sheet is named "Leads" and has the correct columns (A-H)

---

## 🚀 Next Steps

1. Set up Google Sheets credentials
2. Test all endpoints locally
3. Integrate with Engati chatbot
4. Monitor Google Sheets for incoming leads
5. Set up email notifications for new leads (via Google Sheets automation)

---

**Lead Capture API Ready!** 📝✨
