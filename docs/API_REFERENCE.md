# API Reference

Complete reference for all CXO TechBOT API endpoints.

## Base URL
```
http://localhost:3000
```

---

## Articles Endpoints

### List Articles
```
GET /articles
```

**Query Parameters:**
| Parameter | Type | Default | Example |
|-----------|------|---------|---------|
| `category` | string | - | `ai`, `startup`, `product`, `leadership` |
| `subcategory` | string | - | `genai`, `funding`, `mlops` |
| `q` | string | - | Search term |
| `sort` | string | `latest` | `trending`, `latest` |
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |

**Examples:**
```bash
GET /articles
GET /articles?category=ai
GET /articles?category=ai&subcategory=genai
GET /articles?q=genai
GET /articles?sort=trending&limit=5
GET /articles?page=2&limit=10
```

**Response:**
```json
[
  {
    "id": "art-001",
    "category": "ai",
    "subcategory": "genai",
    "title": "The Rise of Generative AI...",
    "summary": "How enterprise leaders...",
    "url": "https://cxotechbot.com/blog/...",
    "tags": ["GenAI", "Leadership"],
    "createdAt": "2026-04-15",
    "clicks": 450
  }
]
```

---

### Get Article by ID
```
GET /articles/:id
```

**Example:**
```bash
GET /articles/art-001
```

**Response:**
```json
{
  "id": "art-001",
  "category": "ai",
  "subcategory": "genai",
  "title": "...",
  "summary": "...",
  "url": "...",
  "tags": [...],
  "createdAt": "2026-04-15",
  "clicks": 450
}
```

---

### Get Article Categories
```
GET /articles/categories
```

**Response:**
```json
[
  {
    "name": "ai",
    "count": 3,
    "subcategories": ["genai", "mlops"]
  },
  {
    "name": "startup",
    "count": 3,
    "subcategories": ["funding", "growth"]
  },
  {
    "name": "product",
    "count": 2,
    "subcategories": ["design", "engineering"]
  },
  {
    "name": "leadership",
    "count": 2,
    "subcategories": ["cto", "culture"]
  }
]
```

---

### Record Article Click
```
POST /articles/:id/click
```

**Example:**
```bash
POST /articles/art-001/click
```

**Response:**
```json
{
  "message": "Click recorded",
  "articleId": "art-001",
  "clicks": 451
}
```

---

## Events Endpoints

### List Events
```
GET /events
```

**Query Parameters:**
| Parameter | Type | Default | Example |
|-----------|------|---------|---------|
| `type` | string | - | `masterclass`, `webinar`, `summit`, `roundtable` |
| `category` | string | - | `ai`, `startup`, `product`, `leadership` |
| `q` | string | - | Search term |
| `sort` | string | `latest` | `registrations`, `latest` |
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |

**Examples:**
```bash
GET /events
GET /events?type=masterclass
GET /events?category=ai
GET /events?sort=registrations
GET /events?type=masterclass&sort=registrations&limit=3
```

**Response:**
```json
[
  {
    "id": "evt-001",
    "type": "masterclass",
    "category": "ai",
    "title": "GenAI for Business Leaders",
    "description": "Learn how to leverage...",
    "speaker": "Dr. Sarah Chen",
    "date": "2026-03-28",
    "time": "3:00 PM IST",
    "duration": "90 minutes",
    "url": "https://cxotechbot.com/events/...",
    "tags": ["GenAI", "Leadership"],
    "registrations": 450
  }
]
```

---

### Get Event by ID
```
GET /events/:id
```

**Example:**
```bash
GET /events/evt-001
```

---

### Get Event Types & Categories
```
GET /events/types
```

**Response:**
```json
{
  "types": ["masterclass", "webinar", "summit", "roundtable"],
  "categories": ["ai", "startup", "product", "leadership", "general"]
}
```

---

### Record Event Registration
```
POST /events/:id/register
```

**Example:**
```bash
POST /events/evt-001/register
```

**Response:**
```json
{
  "message": "Registration recorded",
  "eventId": "evt-001",
  "registrations": 451
}
```

---

## Playbooks Endpoints

### List Playbooks
```
GET /playbooks
```

**Query Parameters:**
| Parameter | Type | Default | Example |
|-----------|------|---------|---------|
| `category` | string | - | `ai`, `startup`, `product`, `leadership` |
| `subcategory` | string | - | `genai`, `funding`, `growth` |
| `q` | string | - | Search term |
| `sort` | string | `latest` | `downloads`, `latest` |
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |

**Examples:**
```bash
GET /playbooks
GET /playbooks?category=startup
GET /playbooks?q=funding&sort=downloads
GET /playbooks?category=ai&limit=3
```

**Response:**
```json
[
  {
    "id": "pb-001",
    "category": "ai",
    "subcategory": "genai",
    "title": "AI & GenAI Playbook",
    "description": "Comprehensive guide to implementing...",
    "pages": 85,
    "downloadUrl": "https://cxotechbot.com/playbooks/...",
    "tags": ["GenAI", "Implementation"],
    "createdAt": "2026-02-01",
    "downloads": 1200
  }
]
```

---

### Get Playbook by ID
```
GET /playbooks/:id
```

**Example:**
```bash
GET /playbooks/pb-001
```

---

### Get Playbook Categories
```
GET /playbooks/categories
```

**Response:**
```json
[
  {
    "name": "ai",
    "count": 2,
    "subcategories": ["genai", "mlops"]
  },
  {
    "name": "startup",
    "count": 2,
    "subcategories": ["growth", "funding"]
  },
  {
    "name": "leadership",
    "count": 2,
    "subcategories": ["cto", "culture"]
  },
  {
    "name": "product",
    "count": 1,
    "subcategories": ["design"]
  }
]
```

---

### Record Playbook Download
```
POST /playbooks/:id/download
```

**Example:**
```bash
POST /playbooks/pb-001/download
```

**Response:**
```json
{
  "message": "Download recorded",
  "playbookId": "pb-001",
  "downloads": 1201
}
```

---

## Utility Endpoints

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-04-19T10:30:45.123Z"
}
```

---

### API Root
```
GET /
```

**Response:**
```json
{
  "name": "CXO TechBOT Backend",
  "version": "1.0.0",
  "endpoints": {
    "articles": "/articles",
    "events": "/events",
    "playbooks": "/playbooks",
    "health": "/health"
  }
}
```

---

## Response Codes

| Code | Meaning | Example |
|------|---------|---------|
| `200` | Success | Article returned |
| `404` | Not found | Article ID doesn't exist |
| `500` | Server error | Database connection failed |

---

## Error Responses

### 404 Not Found
```json
{
  "error": "Article not found"
}
```

### 500 Server Error
```json
{
  "error": "Failed to fetch articles"
}
```

---

## Query Parameter Combinations

### Filter + Sort + Paginate
```bash
GET /articles?category=ai&sort=trending&page=1&limit=5
```

### Search + Filter
```bash
GET /articles?q=genai&category=ai
```

### Sort + Paginate
```bash
GET /events?sort=registrations&page=2&limit=10
```

### All Parameters
```bash
GET /playbooks?category=startup&subcategory=funding&q=series&sort=downloads&page=1&limit=5
```

---

## Response Variables for Engati

In Engati messages, use:
```
$array.id                - Unique identifier
$array.title             - Main title
$array.summary           - Short description (articles only)
$array.description       - Longer description (events/playbooks)
$array.url               - Link to resource
$array.category          - Primary category
$array.subcategory       - Secondary category
$array.tags              - Array of tags
$array.createdAt         - Creation/publication date
$array.clicks            - View count (articles)
$array.registrations     - Registrations (events)
$array.downloads         - Downloads (playbooks)
$array.speaker           - Speaker name (events)
$array.date              - Event date (events)
$array.time              - Event time (events)
$array.pages             - Page count (playbooks)
```

---

## Common Request Examples

### Get Latest 3 AI Articles
```bash
curl "http://localhost:3000/articles?category=ai&limit=3"
```

### Search for "GenAI" and Sort by Trending
```bash
curl "http://localhost:3000/articles?q=genai&sort=trending"
```

### Get Masterclasses with Most Registrations
```bash
curl "http://localhost:3000/events?type=masterclass&sort=registrations"
```

### Get Startup Playbooks (First 5)
```bash
curl "http://localhost:3000/playbooks?category=startup&limit=5"
```

### Get Paginated Results (Page 2, 10 per page)
```bash
curl "http://localhost:3000/articles?page=2&limit=10"
```

### Get All Available Categories
```bash
curl "http://localhost:3000/articles/categories"
```

### Track Article Click
```bash
curl -X POST "http://localhost:3000/articles/art-001/click"
```

---

## Rate Limits

Currently: No rate limits (add as needed for production)

---

## CORS

All endpoints are CORS-enabled for cross-origin requests from Engati.

---

## Authentication

Currently: No authentication required (add API keys as needed for production)

---

## Caching

Currently: No caching (add Redis layer for high-traffic scenarios)

---

## API Versioning

Current Version: 1.0.0

Endpoints don't include version prefix. Add `/v1/` if versioning needed in future.
