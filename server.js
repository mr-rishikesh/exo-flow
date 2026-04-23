const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/articles', require('./routes/articles'));
app.use('/events', require('./routes/events'));
app.use('/playbooks', require('./routes/playbooks'));
app.use('/magazines', require('./routes/magazines'));
app.use('/masterclasses', require('./routes/masterclasses'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    name: 'CXO TechBOT Backend',
    version: '1.0.0',
    endpoints: {
      articles: '/articles',
      events: '/events',
      playbooks: '/playbooks',
      magazines: '/magazines',
      masterclasses: '/masterclasses',
      health: '/health',
    },
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 CXO TechBOT Backend running on http://localhost:${PORT}`);
  console.log(`📡 API Documentation:`);
  console.log(`\n📚 CONTENT ENDPOINTS:`);
  console.log(`   GET  /articles?category=ai&page=1&limit=4`);
  console.log(`   GET  /events?type=masterclass`);
  console.log(`   GET  /playbooks?q=startup`);
  console.log(`   GET  /magazines?category=flagship`);
  console.log(`   GET  /masterclasses?category=ai`);
  console.log(`\n💾 DATA STORED IN: JSON Files`);
});
