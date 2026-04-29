const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cxo-techbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err.message));

app.use('/articles', require('./routes/articles'));
app.use('/events', require('./routes/events'));
app.use('/playbooks', require('./routes/playbooks'));
app.use('/magazines', require('./routes/magazines'));
app.use('/masterclasses', require('./routes/masterclasses'));
app.use('/leads', require('./routes/leads'));
app.use('/newsletter', require('./routes/newsletter'));
app.use('/playbook-subscription', require('./routes/playbookSubscription'));
app.use('/admin', require('./routes/admin'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    name: 'CXO TechBOT Backend',
    version: '1.0.4',
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
  console.log(`\n📝 LEAD CAPTURE:`);
  console.log(`   POST /leads (from Engati chatbot)`);
  console.log(`   GET  /leads (list all leads)`);
  console.log(`\n📧 NEWSLETTER:`);
  console.log(`   POST /newsletter/subscribe (email only)`);
  console.log(`   POST /newsletter/unsubscribe (email only)`);
  console.log(`   GET  /newsletter (list subscribers - admin)`);
  console.log(`\n🔐 ADMIN PANEL:`);
  console.log(`   GET  http://localhost:${PORT}/admin/login`);
  console.log(`   GET  http://localhost:${PORT}/admin/leads`);
  console.log(`   GET  http://localhost:${PORT}/admin/articles`);
  console.log(`\n💾 DATA STORED IN: JSON Files + MongoDB`);
});
