const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Article = require('../models/Article');
const Event = require('../models/Event');
const Masterclass = require('../models/Masterclass');
const Playbook = require('../models/Playbook');
const Magazine = require('../models/Magazine');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cxo-techbot', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing collections
    await Article.deleteMany({});
    await Event.deleteMany({});
    await Masterclass.deleteMany({});
    await Playbook.deleteMany({});
    await Magazine.deleteMany({});
    console.log('✅ Cleared existing collections');

    // Read JSON files
    const articlesPath = path.join(__dirname, '../data/articles.json');
    const eventsPath = path.join(__dirname, '../data/events.json');
    const masterclassesPath = path.join(__dirname, '../data/masterclasses.json');
    const playbooksPath = path.join(__dirname, '../data/playbooks.json');
    const magazinesPath = path.join(__dirname, '../data/magazines.json');

    // Seed Articles
    if (fs.existsSync(articlesPath)) {
      const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
      await Article.insertMany(articlesData);
      console.log(`✅ Seeded ${articlesData.length} articles`);
    }

    // Seed Events
    if (fs.existsSync(eventsPath)) {
      const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));
      await Event.insertMany(eventsData);
      console.log(`✅ Seeded ${eventsData.length} events`);
    }

    // Seed Masterclasses
    if (fs.existsSync(masterclassesPath)) {
      const masterclassesData = JSON.parse(fs.readFileSync(masterclassesPath, 'utf-8'));
      await Masterclass.insertMany(masterclassesData);
      console.log(`✅ Seeded ${masterclassesData.length} masterclasses`);
    }

    // Seed Playbooks
    if (fs.existsSync(playbooksPath)) {
      const playbooksData = JSON.parse(fs.readFileSync(playbooksPath, 'utf-8'));
      await Playbook.insertMany(playbooksData);
      console.log(`✅ Seeded ${playbooksData.length} playbooks`);
    }

    // Seed Magazines
    if (fs.existsSync(magazinesPath)) {
      const magazinesData = JSON.parse(fs.readFileSync(magazinesPath, 'utf-8'));
      await Magazine.insertMany(magazinesData);
      console.log(`✅ Seeded ${magazinesData.length} magazines`);
    }

    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
