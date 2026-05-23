const Article = require('../models/Article');
const Event = require('../models/Event');
const Playbook = require('../models/Playbook');
const Magazine = require('../models/Magazine');
const Masterclass = require('../models/Masterclass');

class DataService {
  constructor() {
    this.analytics = {};
  }

  // ARTICLES
  async getArticles() {
    try {
      const articles = await Article.find();
      return articles.map(a => a.toObject());
    } catch (error) {
      console.error('Error fetching articles:', error.message);
      return [];
    }
  }

  async getArticleById(id) {
    try {
      const article = await Article.findById(id);
      return article ? article.toObject() : null;
    } catch (error) {
      console.error('Error fetching article:', error.message);
      return null;
    }
  }

  async createArticle(articleData) {
    try {
      const article = new Article(articleData);
      await article.save();
      return article.toObject();
    } catch (error) {
      console.error('Error creating article:', error.message);
      throw error;
    }
  }

  async updateArticle(id, updateData) {
    try {
      const article = await Article.findByIdAndUpdate(id, updateData, { new: true });
      return article ? article.toObject() : null;
    } catch (error) {
      console.error('Error updating article:', error.message);
      throw error;
    }
  }

  async deleteArticle(id) {
    try {
      await Article.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error('Error deleting article:', error.message);
      throw error;
    }
  }

  async saveArticles(articles) {
    try {
      await Article.deleteMany({});
      await Article.insertMany(articles);
    } catch (error) {
      console.error('Error saving articles:', error.message);
      throw error;
    }
  }

  // EVENTS
  async getEvents() {
    try {
      const events = await Event.find();
      return events.map(e => e.toObject());
    } catch (error) {
      console.error('Error fetching events:', error.message);
      return [];
    }
  }

  async getEventById(id) {
    try {
      const event = await Event.findById(id);
      return event ? event.toObject() : null;
    } catch (error) {
      console.error('Error fetching event:', error.message);
      return null;
    }
  }

  async createEvent(eventData) {
    try {
      const event = new Event(eventData);
      await event.save();
      return event.toObject();
    } catch (error) {
      console.error('Error creating event:', error.message);
      throw error;
    }
  }

  async updateEvent(id, updateData) {
    try {
      const event = await Event.findByIdAndUpdate(id, updateData, { new: true });
      return event ? event.toObject() : null;
    } catch (error) {
      console.error('Error updating event:', error.message);
      throw error;
    }
  }

  async deleteEvent(id) {
    try {
      await Event.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error('Error deleting event:', error.message);
      throw error;
    }
  }

  async saveEvents(events) {
    try {
      await Event.deleteMany({});
      await Event.insertMany(events);
    } catch (error) {
      console.error('Error saving events:', error.message);
      throw error;
    }
  }

  // PLAYBOOKS
  async getPlaybooks() {
    try {
      const playbooks = await Playbook.find();
      return playbooks.map(p => p.toObject());
    } catch (error) {
      console.error('Error fetching playbooks:', error.message);
      return [];
    }
  }

  async getPlaybookById(id) {
    try {
      const playbook = await Playbook.findById(id);
      return playbook ? playbook.toObject() : null;
    } catch (error) {
      console.error('Error fetching playbook:', error.message);
      return null;
    }
  }

  async createPlaybook(playbookData) {
    try {
      const playbook = new Playbook(playbookData);
      await playbook.save();
      return playbook.toObject();
    } catch (error) {
      console.error('Error creating playbook:', error.message);
      throw error;
    }
  }

  async updatePlaybook(id, updateData) {
    try {
      const playbook = await Playbook.findByIdAndUpdate(id, updateData, { new: true });
      return playbook ? playbook.toObject() : null;
    } catch (error) {
      console.error('Error updating playbook:', error.message);
      throw error;
    }
  }

  async deletePlaybook(id) {
    try {
      await Playbook.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error('Error deleting playbook:', error.message);
      throw error;
    }
  }

  async savePlaybooks(playbooks) {
    try {
      await Playbook.deleteMany({});
      await Playbook.insertMany(playbooks);
    } catch (error) {
      console.error('Error saving playbooks:', error.message);
      throw error;
    }
  }

  // MAGAZINES
  async getMagazines() {
    try {
      const magazines = await Magazine.find();
      return magazines.map(m => m.toObject());
    } catch (error) {
      console.error('Error fetching magazines:', error.message);
      return [];
    }
  }

  async getMagazineById(id) {
    try {
      const magazine = await Magazine.findById(id);
      return magazine ? magazine.toObject() : null;
    } catch (error) {
      console.error('Error fetching magazine:', error.message);
      return null;
    }
  }

  async createMagazine(magazineData) {
    try {
      const magazine = new Magazine(magazineData);
      await magazine.save();
      return magazine.toObject();
    } catch (error) {
      console.error('Error creating magazine:', error.message);
      throw error;
    }
  }

  async updateMagazine(id, updateData) {
    try {
      const magazine = await Magazine.findByIdAndUpdate(id, updateData, { new: true });
      return magazine ? magazine.toObject() : null;
    } catch (error) {
      console.error('Error updating magazine:', error.message);
      throw error;
    }
  }

  async deleteMagazine(id) {
    try {
      await Magazine.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error('Error deleting magazine:', error.message);
      throw error;
    }
  }

  async saveMagazines(magazines) {
    try {
      await Magazine.deleteMany({});
      await Magazine.insertMany(magazines);
    } catch (error) {
      console.error('Error saving magazines:', error.message);
      throw error;
    }
  }

  // MASTERCLASSES
  async getMasterclasses() {
    try {
      const masterclasses = await Masterclass.find();
      return masterclasses.map(m => m.toObject());
    } catch (error) {
      console.error('Error fetching masterclasses:', error.message);
      return [];
    }
  }

  async getMasterclassById(id) {
    try {
      const masterclass = await Masterclass.findById(id);
      return masterclass ? masterclass.toObject() : null;
    } catch (error) {
      console.error('Error fetching masterclass:', error.message);
      return null;
    }
  }

  async createMasterclass(masterclassData) {
    try {
      const masterclass = new Masterclass(masterclassData);
      await masterclass.save();
      return masterclass.toObject();
    } catch (error) {
      console.error('Error creating masterclass:', error.message);
      throw error;
    }
  }

  async updateMasterclass(id, updateData) {
    try {
      const masterclass = await Masterclass.findByIdAndUpdate(id, updateData, { new: true });
      return masterclass ? masterclass.toObject() : null;
    } catch (error) {
      console.error('Error updating masterclass:', error.message);
      throw error;
    }
  }

  async deleteMasterclass(id) {
    try {
      await Masterclass.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error('Error deleting masterclass:', error.message);
      throw error;
    }
  }

  async saveMasterclasses(masterclasses) {
    try {
      await Masterclass.deleteMany({});
      await Masterclass.insertMany(masterclasses);
    } catch (error) {
      console.error('Error saving masterclasses:', error.message);
      throw error;
    }
  }

  // ANALYTICS
  recordClick(type, id) {
    if (!this.analytics[type]) {
      this.analytics[type] = {};
    }
    if (!this.analytics[type][id]) {
      this.analytics[type][id] = 0;
    }
    this.analytics[type][id]++;
  }

  getAnalytics(type, id) {
    if (id) {
      return this.analytics[type]?.[id] || 0;
    }
    return this.analytics[type] || {};
  }
}

module.exports = new DataService();
