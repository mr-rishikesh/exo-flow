# CXO TechBOT Backend - Complete API Documentation

## Overview
This document provides comprehensive documentation for all API endpoints in the CXO TechBOT backend system. The backend is built with Express.js and MongoDB, designed to manage content and lead capture for a technology-focused B2B platform.

**Base URL:** `http://localhost:3000`

---

## Table of Contents
1. [Content APIs](#content-apis)
2. [Lead Capture APIs](#lead-capture-apis)
3. [Newsletter API](#newsletter-api)
4. [Subscription APIs](#subscription-apis)
5. [Featured & Announcements APIs](#featured--announcements-apis)
6. [Event Management APIs](#event-management-apis)
7. [Brand Collaboration API](#brand-collaboration-api)
8. [Health Check API](#health-check-api)

---

## Content APIs

### Articles Endpoints

#### Get All Articles
**Endpoint:** `GET /articles`

**Purpose:** Retrieve all articles with optional filtering and pagination

**Parameters:**
- `category` (query, optional): Filter by category (e.g., 'ai', 'startup')
- `page` (query, optional): Page number for pagination (default: 1)
- `limit` (query, optional): Number of articles per page (default: 4)
- `q` (query, optional): Search query for article title/content

**Response (200 OK):**
```json
{
  "articles": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "AI Revolution in Business",
      "category": "ai",
      "summary": "How AI is transforming business operations",
      "url": "https://example.com/ai-revolution",
      "tags": ["AI", "Business", "Technology"],
      "createdAt": "2026-05-23T10:30:00.000Z"
    }
  ],
  "total": 25,
  "page": 1,
  "pages": 7
}
```

---

### Events Endpoints

#### Get All Events
**Endpoint:** `GET /events`

**Purpose:** Retrieve all upcoming events with optional filtering

**Parameters:**
- `type` (query, optional): Filter by event type (e.g., 'masterclass', 'webinar', 'conference')
- `category` (query, optional): Filter by category
- `page` (query, optional): Page number for pagination (default: 1)
- `limit` (query, optional): Number of events per page (default: 4)

**Response (200 OK):**
```json
{
  "events": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "AI Summit 2026",
      "type": "conference",
      "date": "2026-06-15T09:00:00.000Z",
      "location": "San Francisco, CA",
      "description": "Leading conference on AI innovations",
      "registrationUrl": "https://summit.example.com",
      "createdAt": "2026-05-23T10:30:00.000Z"
    }
  ],
  "total": 12,
  "page": 1,
  "pages": 3
}
```

---

### Playbooks Endpoints

#### Get All Playbooks
**Endpoint:** `GET /playbooks`

**Purpose:** Retrieve playbooks with search functionality

**Parameters:**
- `q` (query, optional): Search query for playbook title
- `category` (query, optional): Filter by category
- `page` (query, optional): Page number (default: 1)
- `limit` (query, optional): Items per page (default: 4)

**Response (200 OK):**
```json
{
  "playbooks": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Startup Growth Playbook",
      "category": "startup",
      "description": "Complete guide for scaling startups",
      "downloadUrl": "https://cdn.example.com/startup-playbook.pdf",
      "createdAt": "2026-05-23T10:30:00.000Z"
    }
  ],
  "total": 8,
  "page": 1,
  "pages": 2
}
```

---

### Masterclasses Endpoints

#### Get All Masterclasses
**Endpoint:** `GET /masterclasses`

**Purpose:** Retrieve masterclass courses

**Parameters:**
- `category` (query, optional): Filter by category (e.g., 'ai', 'leadership', 'sales')
- `page` (query, optional): Page number (default: 1)
- `limit` (query, optional): Items per page (default: 4)

**Response (200 OK):**
```json
{
  "masterclasses": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "title": "AI Leadership Masterclass",
      "category": "ai",
      "instructor": "John Doe",
      "description": "Learn how to lead AI transformation",
      "videoUrl": "https://videos.example.com/ai-leadership",
      "duration": "6 hours",
      "createdAt": "2026-05-23T10:30:00.000Z"
    }
  ],
  "total": 5,
  "page": 1,
  "pages": 1
}
```

---

### Magazines Endpoints

#### Get All Magazines
**Endpoint:** `GET /magazines`

**Purpose:** Retrieve digital magazines/publications

**Parameters:**
- `category` (query, optional): Filter by category (e.g., 'flagship', 'health', 'techbot')
- `page` (query, optional): Page number (default: 1)
- `limit` (query, optional): Items per page (default: 4)

**Response (200 OK):**
```json
{
  "magazines": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "title": "Tech Innovations 2026",
      "category": "flagship",
      "description": "Latest innovations in technology",
      "coverImage": "https://cdn.example.com/mag-cover.jpg",
      "issueNumber": "April 2026",
      "createdAt": "2026-05-23T10:30:00.000Z"
    }
  ],
  "total": 15,
  "page": 1,
  "pages": 4
}
```

---

## Lead Capture APIs

### General Leads

#### Submit a Lead
**Endpoint:** `POST /leads`

**Purpose:** Capture general inquiry leads from chatbot or web forms

**Parameters (Request Body or Query):**
- `company` (required): Company name
- `email` (required): Email address
- `phone` (optional): Phone number
- `message` (optional): Message content
- `type` (optional): Type of inquiry (default: 'general_inquiry')

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Lead captured successfully",
  "lead": {
    "_id": "507f1f77bcf86cd799439016",
    "company": "Acme Corp",
    "email": "contact@acmecorp.com",
    "phone": "+1-555-1234",
    "type": "general_inquiry",
    "status": "new",
    "createdAt": "2026-05-23T10:30:00.000Z"
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

---

## Newsletter API

### Subscribe to Newsletter

#### Method 1: Request Body
**Endpoint:** `POST /newsletter/subscribe`

**Parameters (JSON Body):**
```json
{
  "email": "user@example.com"
}
```

#### Method 2: Query Parameter
**Endpoint:** `POST /newsletter/subscribe?email=user@example.com`

#### Method 3: URL Path (Recommended)
**Endpoint:** `POST /newsletter/subscribe/:email`

**Purpose:** Subscribe email to newsletter

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "subscription": {
    "_id": "507f1f77bcf86cd799439017",
    "email": "user@example.com",
    "type": "newsletter",
    "createdAt": "2026-05-23T10:30:00.000Z"
  }
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "error": "Email already subscribed to newsletter"
}
```

---

### Unsubscribe from Newsletter

#### Method 1: Request Body
**Endpoint:** `POST /newsletter/unsubscribe`

**Parameters:**
```json
{
  "email": "user@example.com"
}
```

#### Method 2: URL Path
**Endpoint:** `POST /newsletter/unsubscribe/:email`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

### Get Newsletter Subscribers (Admin)
**Endpoint:** `GET /newsletter`

**Purpose:** List all newsletter subscribers

**Parameters:** None

**Response (200 OK):**
```json
{
  "success": true,
  "count": 152,
  "subscribers": [
    {
      "_id": "507f1f77bcf86cd799439017",
      "email": "user@example.com",
      "createdAt": "2026-05-23T10:30:00.000Z"
    }
  ]
}
```

---

### Delete Newsletter Subscriber (Admin)
**Endpoint:** `DELETE /newsletter/:id`

**Purpose:** Remove a subscriber by ID

**Parameters:** 
- `id` (path, required): Subscriber MongoDB ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

## Subscription APIs

### Playbook Subscription

#### Subscribe for Playbook
**Endpoint:** `POST /playbook-subscription/subscribe`

**Purpose:** Capture interest for playbook subscriptions

**Parameters (Request Body, Query, or URL Path):**
- `user_fullName` (required): Full name
- `user_email` (required): Email address
- `user_companey_name` (required): Company name (note: typo in field name)
- `user_role` (required): Job role

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Successfully subscribed for playbook",
  "subscription": {
    "_id": "507f1f77bcf86cd799439018",
    "user_fullName": "John Doe",
    "user_email": "john@example.com",
    "user_companey_name": "Tech Corp",
    "user_role": "CTO",
    "createdAt": "2026-05-23T10:30:00.000Z"
  }
}
```

#### Get All Playbook Subscribers (Admin)
**Endpoint:** `GET /playbook-subscription`

**Response (200 OK):**
```json
{
  "success": true,
  "count": 45,
  "subscribers": [
    {
      "_id": "507f1f77bcf86cd799439018",
      "user_fullName": "John Doe",
      "user_email": "john@example.com",
      "user_companey_name": "Tech Corp",
      "user_role": "CTO",
      "createdAt": "2026-05-23T10:30:00.000Z"
    }
  ]
}
```

#### Unsubscribe from Playbook
**Endpoint:** `POST /playbook-subscription/unsubscribe/:user_email`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from playbook"
}
```

---

### Masterclass Subscription

#### Subscribe for Masterclass
**Endpoint:** `POST /masterclass-subscription/subscribe`

**Purpose:** Register for masterclass courses

**Parameters:**
- `user_fullName` (required): Full name
- `user_email` (required): Email address
- `user_companey_name` (required): Company name
- `user_role` (required): Job role

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Successfully subscribed for masterclass",
  "subscription": {
    "_id": "507f1f77bcf86cd799439019",
    "user_fullName": "Alice Johnson",
    "user_email": "alice@example.com",
    "user_companey_name": "Innovation Labs",
    "user_role": "Product Manager",
    "createdAt": "2026-05-23T10:30:00.000Z"
  }
}
```

#### Get All Masterclass Subscribers (Admin)
**Endpoint:** `GET /masterclass-subscription`

**Response (200 OK):**
```json
{
  "success": true,
  "count": 78,
  "subscribers": [...]
}
```

---

### Magazine Subscription (Email Only)

#### Subscribe for Magazine
**Endpoint:** `POST /magazine-email/subscribe` or `POST /magazine-email/subscribe/:user_email`

**Purpose:** Simple email subscription for magazine updates

**Parameters:**
- `user_email` (required): Email address only

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Successfully subscribed to magazine",
  "subscription": {
    "_id": "507f1f77bcf86cd799439020",
    "user_email": "subscriber@example.com",
    "createdAt": "2026-05-23T10:30:00.000Z"
  }
}
```

#### Get All Magazine Subscribers (Admin)
**Endpoint:** `GET /magazine-email`

**Response (200 OK):**
```json
{
  "success": true,
  "count": 342,
  "subscribers": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "user_email": "subscriber@example.com",
      "createdAt": "2026-05-23T10:30:00.000Z"
    }
  ]
}
```

---

## Featured & Announcements APIs

### Share Founder Story (Get Featured)

#### Submit Founder Story
**Endpoint:** `POST /get-featured/share-founder-story`

**Purpose:** Capture founder stories for featured content

**Parameters:**
- `fullname` (required): Founder's full name
- `email` (required): Email address
- `phone` (required): Phone number
- `startup_name` (required): Startup name
- `startup_website` (required): Website URL
- `founder_story_url` (required): URL to founder's story
- `founders_profile_photo` (required): URL to profile photo

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Successfully submitted founder story for featured",
  "submission": {
    "_id": "507f1f77bcf86cd799439021",
    "fullname": "Sarah Tech",
    "email": "sarah@startup.com",
    "phone": "+1-555-9876",
    "startup_name": "TechVenture",
    "startup_website": "https://techventure.com",
    "founder_story_url": "https://medium.com/@sarah/my-story",
    "founders_profile_photo": "https://cdn.example.com/photo.jpg",
    "createdAt": "2026-05-23T10:30:00.000Z"
  }
}
```

#### Get All Founder Stories (Admin)
**Endpoint:** `GET /get-featured`

**Response (200 OK):**
```json
{
  "success": true,
  "count": 12,
  "submissions": [...]
}
```

---

### Role Change Announcement

#### Submit Role Change
**Endpoint:** `POST /get-featured/role-change-announcement`

**Purpose:** Announce career/role changes

**Parameters:**
- `fullname` (required): Person's full name
- `user_email` (required): Email address
- `phone` (required): Phone number
- `current_organization` (required): Current company
- `new_organization` (required): New company
- `new_designation` (required): New job title
- `comment` (optional): Optional comment about the move

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Successfully submitted role change announcement",
  "submission": {
    "_id": "507f1f77bcf86cd799439022",
    "fullname": "John Smith",
    "user_email": "john@example.com",
    "phone": "+1-555-1234",
    "current_organization": "TechCorp",
    "new_organization": "InnovateLabs",
    "new_designation": "VP Engineering",
    "comment": "Excited for new opportunities!",
    "createdAt": "2026-05-23T10:30:00.000Z"
  }
}
```

#### Get All Role Changes (Admin)
**Endpoint:** `GET /get-featured/role-change-announcements`

**Response (200 OK):**
```json
{
  "success": true,
  "count": 34,
  "announcements": [...]
}
```

---

## Event Management APIs

### Event Registration

#### Register for Event
**Endpoint:** `POST /event-registration/register`

**Purpose:** Capture event registration

**Parameters:**
- `user_fullName` (required): Full name
- `user_email` (required): Email address
- `user_companey_name` (required): Company name
- `user_role` (required): Job role

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Successfully registered for event",
  "registration": {
    "_id": "507f1f77bcf86cd799439023",
    "user_fullName": "Emma Davis",
    "user_email": "emma@example.com",
    "user_companey_name": "FutureWorks",
    "user_role": "Director of Operations",
    "createdAt": "2026-05-23T10:30:00.000Z"
  }
}
```

#### Get All Event Registrations (Admin)
**Endpoint:** `GET /event-registration`

**Response (200 OK):**
```json
{
  "success": true,
  "count": 156,
  "registrations": [...]
}
```

#### Cancel Event Registration
**Endpoint:** `POST /event-registration/cancel/:user_email`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully cancelled event registration"
}
```

---

## Brand Collaboration API

### Submit Brand Collaboration Request

**Endpoint:** `POST /brand-collaboration/submit`

**Purpose:** Capture brand partnership and collaboration requests

**Parameters:**
- `user_fullName` (required): Full name
- `user_email` (required): Email address
- `user_companey_name` (required): Company name
- `user_role` (required): Job role
- `user_phone_number` (required): Phone number

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Successfully submitted brand collaboration request",
  "submission": {
    "_id": "507f1f77bcf86cd799439024",
    "user_fullName": "Sarah Thompson",
    "user_email": "sarah@brandcorp.com",
    "user_companey_name": "BrandCorp",
    "user_role": "Marketing Director",
    "user_phone_number": "+1-555-0100",
    "createdAt": "2026-05-23T10:30:00.000Z"
  }
}
```

#### Get All Brand Collaborations (Admin)
**Endpoint:** `GET /brand-collaboration`

**Response (200 OK):**
```json
{
  "success": true,
  "count": 28,
  "collaborations": [...]
}
```

#### Cancel Brand Collaboration
**Endpoint:** `POST /brand-collaboration/cancel/:user_email`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully cancelled brand collaboration request"
}
```

---

## Health Check API

### Health Status
**Endpoint:** `GET /health`

**Purpose:** Check API health and status

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-05-23T10:30:00.000Z"
}
```

---

## Common Response Patterns

### Success Response Format
```json
{
  "success": true,
  "message": "Action completed successfully",
  "data": { /* relevant data */ }
}
```

### Error Response Format
```json
{
  "success": false,
  "error": "Description of what went wrong"
}
```

### Status Codes
- `200 OK` - Successful GET request
- `201 Created` - Successful POST request (resource created)
- `400 Bad Request` - Missing or invalid parameters
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate entry (e.g., already subscribed)
- `500 Server Error` - Internal server error

---

## Authentication

### Admin APIs
Admin endpoints are protected by session-based authentication:
- Endpoint: `POST /admin/login`
- Credentials required (configured in .env):
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
- Session stored in HTTP-only cookies

### Lead Capture APIs
All lead capture endpoints are public (no authentication required).

---

## Database Models

### Lead Model
```javascript
{
  company: String (required),
  email: String (required, lowercase),
  phone: String,
  message: String,
  file: String,
  type: String (enum: 'event_collaboration', 'partnership', 'media_inquiry', 'general_inquiry', 'newsletter', 'playbook_subscription', 'get_featured', 'role_change_announcement', 'magazine_subscription', 'masterclass_subscription', 'event_registration', 'brand_collaboration', 'other'),
  status: String (enum: 'new', 'contacted', 'replied', 'closed'),
  notes: String,
  isReviewed: Boolean (default: false),
  timestamps: true
}
```

---

## Testing Examples

### Using cURL

**Subscribe to Newsletter:**
```bash
curl -X POST http://localhost:3000/newsletter/subscribe/user@example.com
```

**Submit Playbook Subscription:**
```bash
curl -X POST http://localhost:3000/playbook-subscription/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "user_fullName": "John Doe",
    "user_email": "john@example.com",
    "user_companey_name": "Tech Corp",
    "user_role": "CTO"
  }'
```

**Get Articles:**
```bash
curl http://localhost:3000/articles?category=ai&limit=4&page=1
```

---

## Implementation Notes

1. **Email Handling**: All emails are automatically converted to lowercase and trimmed
2. **Duplicate Prevention**: Most subscription endpoints check for duplicate emails (409 Conflict)
3. **Parameter Flexibility**: Lead capture endpoints accept parameters from:
   - Request body (JSON)
   - Query parameters
   - URL path parameters
4. **Timestamps**: All records include `createdAt` and `updatedAt` timestamps
5. **Data Storage**: All data stored in MongoDB with Mongoose ODM

---

## Support

For issues or questions about the API:
- Email: developer@factoryjet.com
- Documentation maintained by: CXO TechBOT Team
- Last Updated: 2026-05-23
