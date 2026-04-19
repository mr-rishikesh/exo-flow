# API Testing Guide

## 🧪 Test All Endpoints

Start the server first:
```bash
npm start
```

Then run these tests in your terminal or Postman.

---

## 📰 ARTICLES ENDPOINT

### Get All Articles
```bash
curl http://localhost:3000/articles
```

### Filter by Category
```bash
# AI articles
curl "http://localhost:3000/articles?category=ai"

# Startup articles
curl "http://localhost:3000/articles?category=startup"

# Product articles
curl "http://localhost:3000/articles?category=product"

# Leadership articles
curl "http://localhost:3000/articles?category=leadership"
```

### Filter by Subcategory
```bash
# GenAI articles
curl "http://localhost:3000/articles?category=ai&subcategory=genai"

# Startup funding articles
curl "http://localhost:3000/articles?category=startup&subcategory=funding"

# CTO articles
curl "http://localhost:3000/articles?category=leadership&subcategory=cto"
```

### Search (Query)
```bash
# Search for GenAI
curl "http://localhost:3000/articles?q=genai"

# Search for ChatGPT
curl "http://localhost:3000/articles?q=chatgpt"

# Search for Series A
curl "http://localhost:3000/articles?q=series"
```

### Sorting
```bash
# Latest (default)
curl "http://localhost:3000/articles?sort=latest"

# Trending (by clicks)
curl "http://localhost:3000/articles?sort=trending"

# Trending in AI category
curl "http://localhost:3000/articles?category=ai&sort=trending"
```

### Pagination
```bash
# Page 1, 10 items per page (default)
curl "http://localhost:3000/articles?page=1"

# Page 1, 3 items per page
curl "http://localhost:3000/articles?page=1&limit=3"

# Page 2, 5 items per page
curl "http://localhost:3000/articles?page=2&limit=5"
```

### Complex Queries
```bash
# AI articles, trending, page 1, 5 per page
curl "http://localhost:3000/articles?category=ai&sort=trending&page=1&limit=5"

# Search genai, startup category, latest, 3 items
curl "http://localhost:3000/articles?category=startup&q=genai&sort=latest&limit=3"

# Leadership category, search CEO, trending
curl "http://localhost:3000/articles?category=leadership&q=ceo&sort=trending"
```

### Get All Categories
```bash
curl http://localhost:3000/articles/categories
```

**Response Example:**
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
  }
]
```

### Get Single Article
```bash
curl http://localhost:3000/articles/art-001
```

### Record Click
```bash
curl -X POST http://localhost:3000/articles/art-001/click
```

---

## 📅 EVENTS ENDPOINT

### Get All Events
```bash
curl http://localhost:3000/events
```

### Filter by Type
```bash
# Masterclasses
curl "http://localhost:3000/events?type=masterclass"

# Webinars
curl "http://localhost:3000/events?type=webinar"

# Summits
curl "http://localhost:3000/events?type=summit"

# Roundtables
curl "http://localhost:3000/events?type=roundtable"
```

### Filter by Category
```bash
# AI events
curl "http://localhost:3000/events?category=ai"

# Startup events
curl "http://localhost:3000/events?category=startup"
```

### Search
```bash
# Search for "Leadership"
curl "http://localhost:3000/events?q=leadership"

# Search for "GenAI"
curl "http://localhost:3000/events?q=genai"
```

### Sorting
```bash
# Latest (default)
curl "http://localhost:3000/events?sort=latest"

# Most registrations
curl "http://localhost:3000/events?sort=registrations"

# Masterclasses sorted by registrations
curl "http://localhost:3000/events?type=masterclass&sort=registrations"
```

### Complex Queries
```bash
# Masterclasses with most registrations
curl "http://localhost:3000/events?type=masterclass&sort=registrations"

# Latest startup events, 5 per page
curl "http://localhost:3000/events?category=startup&page=1&limit=5"

# AI webinars, latest
curl "http://localhost:3000/events?category=ai&type=webinar&sort=latest"
```

### Get Event Types
```bash
curl http://localhost:3000/events/types
```

**Response:**
```json
{
  "types": ["masterclass", "webinar", "summit", "roundtable"],
  "categories": ["ai", "startup", "product", "leadership", "general"]
}
```

### Get Single Event
```bash
curl http://localhost:3000/events/evt-001
```

### Record Registration
```bash
curl -X POST http://localhost:3000/events/evt-001/register
```

---

## 📊 PLAYBOOKS ENDPOINT

### Get All Playbooks
```bash
curl http://localhost:3000/playbooks
```

### Filter by Category
```bash
curl "http://localhost:3000/playbooks?category=ai"
curl "http://localhost:3000/playbooks?category=startup"
curl "http://localhost:3000/playbooks?category=leadership"
curl "http://localhost:3000/playbooks?category=product"
```

### Filter by Subcategory
```bash
# GenAI playbooks
curl "http://localhost:3000/playbooks?category=ai&subcategory=genai"

# Startup growth playbooks
curl "http://localhost:3000/playbooks?category=startup&subcategory=growth"

# CTO playbooks
curl "http://localhost:3000/playbooks?category=leadership&subcategory=cto"
```

### Search
```bash
# Search for "Series"
curl "http://localhost:3000/playbooks?q=series"

# Search for "AI"
curl "http://localhost:3000/playbooks?q=ai"

# Search for "Team"
curl "http://localhost:3000/playbooks?q=team"
```

### Sorting
```bash
# Latest (default)
curl "http://localhost:3000/playbooks?sort=latest"

# Most downloads
curl "http://localhost:3000/playbooks?sort=downloads"

# Startup playbooks, most downloads
curl "http://localhost:3000/playbooks?category=startup&sort=downloads"
```

### Pagination
```bash
# First 3 playbooks
curl "http://localhost:3000/playbooks?limit=3"

# Page 2, 5 playbooks per page
curl "http://localhost:3000/playbooks?page=2&limit=5"
```

### Complex Queries
```bash
# Series A playbooks, sorted by downloads
curl "http://localhost:3000/playbooks?category=startup&q=series&sort=downloads"

# Latest AI playbooks, 3 per page
curl "http://localhost:3000/playbooks?category=ai&page=1&limit=3"

# Search "leadership", funding category, latest
curl "http://localhost:3000/playbooks?category=leadership&q=leadership&sort=latest"
```

### Get Categories
```bash
curl http://localhost:3000/playbooks/categories
```

### Get Single Playbook
```bash
curl http://localhost:3000/playbooks/pb-001
```

### Record Download
```bash
curl -X POST http://localhost:3000/playbooks/pb-001/download
```

---

## 🌐 ENGATI INTEGRATION EXAMPLES

### Dynamic Article List
**Bot Message Template:**
```
Here are the latest AI articles:

$array.title$
$array.summary$

Read more: $array.url$

Tags: $array.tags$
```

**API Call:**
```
GET https://your-api.com/articles?category=ai&limit=3
```

### Trending in Specific Category
**Bot Message:**
```
Top trending in your interest:

1. $array.title$ (📊 $array.clicks$ reads)
2. $array.title$ (📊 $array.clicks$ reads)
```

**API Call:**
```
GET https://your-api.com/articles?category=startup&sort=trending&limit=2
```

### Search Results
**Bot Message:**
```
We found articles on "$searchQuery$":

$array.title$ - $array.summary$

Read: $array.url$
```

**API Call:**
```
GET https://your-api.com/articles?q=$searchQuery$&limit=5
```

### Event Registration Notification
**Track registration:**
```
POST https://your-api.com/events/$eventId$/register
```

**Bot Message:**
```
✅ You registered for $eventName$
📅 Date: $eventDate$
⏰ Time: $eventTime$

Check your email for confirmation!
```

---

## ✅ Success Checklist

- [ ] All article queries return 200 OK
- [ ] Filtering by category works
- [ ] Search (q parameter) returns relevant results
- [ ] Pagination returns correct pages
- [ ] Sorting by `latest` and `trending` works
- [ ] Click tracking updates clicks count
- [ ] Events endpoint returns proper data
- [ ] Playbooks sorting by downloads works
- [ ] Category endpoints return dynamic lists
- [ ] CORS headers are present in responses

---

## 🔧 Common Issues

**No results returned?**
- Check the category name (lowercase: ai, startup, product, leadership)
- Verify data exists in `data/articles.json`

**CORS error?**
- Ensure `cors()` middleware is in `server.js`
- Engati URL should be whitelisted (it's enabled for all domains by default)

**Wrong page returned?**
- Page numbering starts at 1, not 0
- Check `limit` parameter

**Clicks not updating?**
- Use POST, not GET for tracking endpoints
- Check `analytics.json` is writable
