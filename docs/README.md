# CXO TechBOT Backend API

Production-ready Node.js backend for the CXO TechBOT Engati chatbot.

## 📦 Setup

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the server
npm start

# Server runs on http://localhost:3000
```

## 🎯 API Endpoints

### Articles

```
GET /articles
GET /articles?category=ai
GET /articles?category=ai&subcategory=genai
GET /articles?q=chatgpt (search)
GET /articles?sort=trending
GET /articles?page=1&limit=3
GET /articles/categories
GET /articles/:id
POST /articles/:id/click
```

### Events

```
GET /events
GET /events?type=masterclass
GET /events?category=ai
GET /events?sort=registrations
GET /events?q=leadership
GET /events?page=1&limit=5
GET /events/types
GET /events/:id
POST /events/:id/register
```

### Playbooks

```
GET /playbooks
GET /playbooks?category=startup
GET /playbooks?subcategory=funding
GET /playbooks?q=series
GET /playbooks?sort=downloads
GET /playbooks?page=1&limit=10
GET /playbooks/categories
GET /playbooks/:id
POST /playbooks/:id/download
```

## 📋 Query Parameters

| Parameter | Type | Default | Example |
|-----------|------|---------|---------|
| `category` | string | - | `ai`, `startup`, `product`, `leadership` |
| `subcategory` | string | - | `genai`, `funding`, `mlops` |
| `type` | string | - | `masterclass`, `webinar`, `summit` |
| `q` | string | - | Search by title/description |
| `sort` | string | `latest` | `trending`, `registrations`, `downloads` |
| `page` | number | 1 | Pagination page number |
| `limit` | number | 10 | Items per page |

## 🔍 Example Requests

### Get AI Articles (Latest)
```bash
curl "http://localhost:3000/articles?category=ai"
```

### Search Articles
```bash
curl "http://localhost:3000/articles?q=genai&sort=trending"
```

### Paginated Results
```bash
curl "http://localhost:3000/articles?page=2&limit=5"
```

### Filter Events by Type
```bash
curl "http://localhost:3000/events?type=masterclass&sort=registrations"
```

### Get Startup Playbooks
```bash
curl "http://localhost:3000/playbooks?category=startup&sort=downloads"
```

## 📤 Response Format

All endpoints return a clean JSON array:

```json
[
  {
    "id": "art-001",
    "category": "ai",
    "title": "The Rise of Generative AI...",
    "summary": "How enterprise leaders...",
    "url": "https://cxotechbot.com/blog/...",
    "tags": ["GenAI", "Leadership"],
    "createdAt": "2026-04-15",
    "clicks": 450
  }
]
```

## 🤖 Engati Integration

The API returns arrays directly for easy integration with Engati variables:

```
$array.title$        → Get article title
$array.summary$      → Get article summary
$array.url$          → Get article URL
$array.tags$         → Get article tags
```

## 📊 Data Structure

### Article
```javascript
{
  id: string,
  category: string,      // ai, startup, product, leadership
  subcategory: string,   // genai, funding, mlops, etc.
  title: string,
  summary: string,
  url: string,
  tags: string[],
  createdAt: string,     // YYYY-MM-DD
  clicks: number
}
```

### Event
```javascript
{
  id: string,
  type: string,         // masterclass, webinar, summit, roundtable
  category: string,     // ai, startup, product, leadership
  title: string,
  description: string,
  speaker?: string,
  date: string,         // YYYY-MM-DD
  time?: string,
  duration?: string,
  location?: string,
  url: string,
  tags: string[],
  registrations: number
}
```

### Playbook
```javascript
{
  id: string,
  category: string,
  subcategory: string,
  title: string,
  description: string,
  pages: number,
  downloadUrl: string,
  tags: string[],
  createdAt: string,
  downloads: number
}
```

## 🎯 Features

✅ **Filtering** - Filter by category, subcategory, type  
✅ **Search** - Case-insensitive search on title/description  
✅ **Pagination** - Built-in pagination support  
✅ **Sorting** - Latest, trending, registrations, downloads  
✅ **Analytics** - Click/registration/download tracking  
✅ **Categories** - Dynamic category endpoints  
✅ **CORS** - Enabled for Engati integration  
✅ **Clean Response** - No unnecessary nesting  

## 📁 Project Structure

```
cxo-bot-cms-backend/
├── server.js                 # Main Express app
├── package.json              # Dependencies
├── routes/
│   ├── articles.js
│   ├── events.js
│   └── playbooks.js
├── controllers/
│   ├── articleController.js
│   ├── eventController.js
│   └── playbookController.js
├── services/
│   ├── DataService.js        # Data loading/saving
│   └── FilterService.js      # Filtering logic
└── data/
    ├── articles.json
    ├── events.json
    ├── playbooks.json
    └── analytics.json
```

## 🔄 Next Steps

### To Add a Database
Replace `DataService.js` with database queries:
```javascript
// Instead of fs.readFileSync, use:
const articles = await Article.find({ category });
```

### To Add Authentication
```javascript
const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};
app.use('/articles', authMiddleware, articleRoutes);
```

### To Add Email Notifications
```javascript
const nodemailer = require('nodemailer');
const sendWelcomeEmail = (email) => {
  // Send email after registration
};
```

## 🚀 Deployment

### Deploy to Heroku
```bash
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
git push heroku main
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## 📞 Support

For issues or feature requests, contact: hello@cxotechbot.com
