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
      // First try by MongoDB _id, then by custom id field
      let article = await Article.findById(id);
      if (!article) {
        article = await Article.findOne({ id });
      }
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
      // First try by MongoDB _id, then by custom id field
      let article = await Article.findByIdAndUpdate(id, updateData, { new: true });
      if (!article) {
        article = await Article.findOneAndUpdate({ id }, updateData, { new: true });
      }
      return article ? article.toObject() : null;
    } catch (error) {
      console.error('Error updating article:', error.message);
      throw error;
    }
  }

  async deleteArticle(id) {
    try {
      // First try by MongoDB _id, then by custom id field
      let result = await Article.findByIdAndDelete(id);
      if (!result) {
        result = await Article.findOneAndDelete({ id });
      }
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
      let event = await Event.findById(id);
      if (!event) {
        event = await Event.findOne({ id });
      }
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
      let event = await Event.findByIdAndUpdate(id, updateData, { new: true });
      if (!event) {
        event = await Event.findOneAndUpdate({ id }, updateData, { new: true });
      }
      return event ? event.toObject() : null;
    } catch (error) {
      console.error('Error updating event:', error.message);
      throw error;
    }
  }

  async deleteEvent(id) {
    try {
      let result = await Event.findByIdAndDelete(id);
      if (!result) {
        result = await Event.findOneAndDelete({ id });
      }
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
      let playbook = await Playbook.findById(id);
      if (!playbook) {
        playbook = await Playbook.findOne({ id });
      }
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
      let playbook = await Playbook.findByIdAndUpdate(id, updateData, { new: true });
      if (!playbook) {
        playbook = await Playbook.findOneAndUpdate({ id }, updateData, { new: true });
      }
      return playbook ? playbook.toObject() : null;
    } catch (error) {
      console.error('Error updating playbook:', error.message);
      throw error;
    }
  }

  async deletePlaybook(id) {
    try {
      let result = await Playbook.findByIdAndDelete(id);
      if (!result) {
        result = await Playbook.findOneAndDelete({ id });
      }
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
      let magazine = await Magazine.findById(id);
      if (!magazine) {
        magazine = await Magazine.findOne({ id });
      }
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
      let magazine = await Magazine.findByIdAndUpdate(id, updateData, { new: true });
      if (!magazine) {
        magazine = await Magazine.findOneAndUpdate({ id }, updateData, { new: true });
      }
      return magazine ? magazine.toObject() : null;
    } catch (error) {
      console.error('Error updating magazine:', error.message);
      throw error;
    }
  }

  async deleteMagazine(id) {
    try {
      let result = await Magazine.findByIdAndDelete(id);
      if (!result) {
        result = await Magazine.findOneAndDelete({ id });
      }
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
      let masterclass = await Masterclass.findById(id);
      if (!masterclass) {
        masterclass = await Masterclass.findOne({ id });
      }
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
      let masterclass = await Masterclass.findByIdAndUpdate(id, updateData, { new: true });
      if (!masterclass) {
        masterclass = await Masterclass.findOneAndUpdate({ id }, updateData, { new: true });
      }
      return masterclass ? masterclass.toObject() : null;
    } catch (error) {
      console.error('Error updating masterclass:', error.message);
      throw error;
    }
  }

  async deleteMasterclass(id) {
    try {
      let result = await Masterclass.findByIdAndDelete(id);
      if (!result) {
        result = await Masterclass.findOneAndDelete({ id });
      }
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
