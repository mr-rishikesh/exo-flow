# Quick Start Guide

## 🚀 Get Started in 2 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Server
```bash
npm start
```

You should see:
```
🚀 CXO TechBOT Backend running on http://localhost:3000
```

### Step 3: Test the API

**Get all articles:**
```bash
curl http://localhost:3000/articles
```

**Get AI articles:**
```bash
curl "http://localhost:3000/articles?category=ai"
```

**Get 5 trending startup articles:**
```bash
curl "http://localhost:3000/articles?category=startup&sort=trending&limit=5"
```

**Search for GenAI:**
```bash
curl "http://localhost:3000/articles?q=genai"
```

**Get events by type:**
```bash
curl "http://localhost:3000/events?type=masterclass"
```

**Get playbooks (paginated):**
```bash
curl "http://localhost:3000/playbooks?page=1&limit=3"
```

**Get article categories:**
```bash
curl http://localhost:3000/articles/categories
```

## 🎯 Key Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /articles` | List all articles with filters |
| `GET /events` | List all events |
| `GET /playbooks` | List all playbooks |
| `POST /articles/:id/click` | Track article clicks |
| `POST /events/:id/register` | Track event registrations |
| `POST /playbooks/:id/download` | Track playbook downloads |

## 📝 Testing with Engati

Your Engati bot can now call:

```
https://your-domain.com/articles?category=ai&limit=3
```

And use response variables:
```
$array.title$
$array.summary$
$array.url$
```

## ⚙️ Configuration

Edit `data/articles.json`, `data/events.json`, `data/playbooks.json` to add/update content.

## 📊 Response Example

```json
[
  {
    "id": "art-001",
    "category": "ai",
    "subcategory": "genai",
    "title": "The Rise of Generative AI in Business: A CEO's Guide",
    "summary": "How enterprise leaders are leveraging GenAI...",
    "url": "https://cxotechbot.com/blog/genai-ceo-guide",
    "tags": ["GenAI", "Leadership", "Enterprise"],
    "createdAt": "2026-04-15",
    "clicks": 450
  }
]
```

## 🔗 Connect to Engati

1. In Engati bot builder, create a custom action
2. Set URL to: `http://your-server:3000/articles?category=ai`
3. Use response in messages: `$array.title$`

## 🐛 Troubleshooting

**Port already in use?**
```bash
PORT=4000 npm start
```

**CORS error in Engati?**
Check that `cors()` is enabled in `server.js` (it is by default)

**Data not loading?**
Check `data/` folder files exist and are valid JSON

## 📚 Learn More

See `README.md` for full documentation
