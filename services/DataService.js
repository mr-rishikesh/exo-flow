const fs = require('fs');
const path = require('path');

class DataService {
  constructor() {
    this.articlesPath = path.join(__dirname, '../data/articles.json');
    this.eventsPath = path.join(__dirname, '../data/events.json');
    this.playbooksPath = path.join(__dirname, '../data/playbooks.json');
    this.magazinesPath = path.join(__dirname, '../data/magazines.json');
    this.masterclassesPath = path.join(__dirname, '../data/masterclasses.json');
    this.analyticsPath = path.join(__dirname, '../data/analytics.json');
    this.loadData();
  }

  loadData() {
    this.articles = this.readJsonFile(this.articlesPath);
    this.events = this.readJsonFile(this.eventsPath);
    this.playbooks = this.readJsonFile(this.playbooksPath);
    this.magazines = this.readJsonFile(this.magazinesPath);
    this.masterclasses = this.readJsonFile(this.masterclassesPath);
    this.analytics = this.readJsonFile(this.analyticsPath) || {};
  }

  readJsonFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error.message);
      return [];
    }
  }

  saveAnalytics() {
    try {
      fs.writeFileSync(this.analyticsPath, JSON.stringify(this.analytics, null, 2));
    } catch (error) {
      console.error('Error saving analytics:', error.message);
    }
  }

  getArticles() {
    return this.articles;
  }

  getEvents() {
    return this.events;
  }

  getPlaybooks() {
    return this.playbooks;
  }

  getMagazines() {
    return this.magazines;
  }

  getMasterclasses() {
    return this.masterclasses;
  }

  recordClick(type, id) {
    if (!this.analytics[type]) {
      this.analytics[type] = {};
    }
    if (!this.analytics[type][id]) {
      this.analytics[type][id] = 0;
    }
    this.analytics[type][id]++;
    this.saveAnalytics();
  }

  getAnalytics(type, id) {
    if (id) {
      return this.analytics[type]?.[id] || 0;
    }
    return this.analytics[type] || {};
  }
}

module.exports = new DataService();
