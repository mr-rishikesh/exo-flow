const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const fs = require('fs');
const LeadService = require('./services/LeadService');
const Article = require('./models/Article');
const Event = require('./models/Event');
const Masterclass = require('./models/Masterclass');
const Playbook = require('./models/Playbook');
const Magazine = require('./models/Magazine');
const { runStartupChecks } = require('./config/startup-checks');
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
  .then(async () => {
    console.log('✅ MongoDB connected');

    // Seed database if collections are empty
    await seedDatabaseIfEmpty();
  })
  .catch(err => console.log('❌ MongoDB connection error:', err.message));

// Initialize leads storage
LeadService.initializeLeads()
  .then(() => console.log('✅ Leads storage initialized'))
  .catch(err => console.error('❌ Failed to initialize leads:', err.message));

// Auto-seed database if empty
async function seedDatabaseIfEmpty() {
  try {
    const articleCount = await Article.countDocuments();
    const eventCount = await Event.countDocuments();
    const masterclassCount = await Masterclass.countDocuments();
    const playbookCount = await Playbook.countDocuments();
    const magazineCount = await Magazine.countDocuments();

    if (articleCount === 0 || eventCount === 0 || masterclassCount === 0 || playbookCount === 0 || magazineCount === 0) {
      console.log('📥 Seeding database from JSON files...');

      const dataDir = path.join(__dirname, 'data');

      // Seed Articles
      const articlesPath = path.join(dataDir, 'articles.json');
      if (fs.existsSync(articlesPath) && articleCount === 0) {
        const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
        await Article.insertMany(articlesData);
        console.log(`  ✅ Seeded ${articlesData.length} articles`);
      }

      // Seed Events
      const eventsPath = path.join(dataDir, 'events.json');
      if (fs.existsSync(eventsPath) && eventCount === 0) {
        const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));
        await Event.insertMany(eventsData);
        console.log(`  ✅ Seeded ${eventsData.length} events`);
      }

      // Seed Masterclasses
      const masterclassesPath = path.join(dataDir, 'masterclasses.json');
      if (fs.existsSync(masterclassesPath) && masterclassCount === 0) {
        const masterclassesData = JSON.parse(fs.readFileSync(masterclassesPath, 'utf-8'));
        await Masterclass.insertMany(masterclassesData);
        console.log(`  ✅ Seeded ${masterclassesData.length} masterclasses`);
      }

      // Seed Playbooks
      const playbooksPath = path.join(dataDir, 'playbooks.json');
      if (fs.existsSync(playbooksPath) && playbookCount === 0) {
        const playbooksData = JSON.parse(fs.readFileSync(playbooksPath, 'utf-8'));
        await Playbook.insertMany(playbooksData);
        console.log(`  ✅ Seeded ${playbooksData.length} playbooks`);
      }

      // Seed Magazines
      const magazinesPath = path.join(dataDir, 'magazines.json');
      if (fs.existsSync(magazinesPath) && magazineCount === 0) {
        const magazinesData = JSON.parse(fs.readFileSync(magazinesPath, 'utf-8'));
        await Magazine.insertMany(magazinesData);
        console.log(`  ✅ Seeded ${magazinesData.length} magazines`);
      }

      console.log('✅ Database seeding completed');
    } else {
      console.log('✅ Database already populated with data');
    }
  } catch (error) {
    console.error('⚠️  Error seeding database:', error.message);
  }
}

app.use('/articles', require('./routes/articles'));
app.use('/events', require('./routes/events'));
app.use('/playbooks', require('./routes/playbooks'));
app.use('/magazines', require('./routes/magazines'));
app.use('/masterclasses', require('./routes/masterclasses'));
app.use('/leads', require('./routes/leads'));
app.use('/newsletter', require('./routes/newsletter'));
app.use('/playbook-subscription', require('./routes/playbookSubscription'));
app.use('/masterclass-subscription', require('./routes/masterclassSubscription'));
app.use('/event-registration', require('./routes/eventRegistration'));
app.use('/brand-collaboration', require('./routes/brandCollaboration'));
app.use('/get-featured', require('./routes/getFeature'));
app.use('/magazine-email', require('./routes/magazineEmail'));
app.use('/admin', require('./routes/admin'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    name: 'CXO TechBOT Backend',
    version: '1.0.6',
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

app.listen(PORT, async () => {
  console.log(`🚀 CXO TechBOT Backend running on http://localhost:${PORT}`);

  // Run startup checks
  try {
    await runStartupChecks();
  } catch (error) {
    console.error('⚠️  Startup checks error:', error.message);
  }

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
  console.log(`\n💾 DATA STORED IN: MongoDB`);
  console.log(`✅ All systems operational!`);
});
