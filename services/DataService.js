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
      let article = null;

      // First try by custom id field (for seeded data)
      article = await Article.findOne({ id });

      // If not found, try by MongoDB _id
      if (!article) {
        try {
          article = await Article.findById(id);
        } catch (err) {
          // Not a valid MongoDB ID format, that's OK
        }
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
      // First try by custom id field (for seeded data)
      let article = await Article.findOneAndUpdate({ id }, updateData, { new: true });

      // If not found, try by MongoDB _id
      if (!article) {
        try {
          article = await Article.findByIdAndUpdate(id, updateData, { new: true });
        } catch (err) {
          // Not a valid MongoDB ID format
        }
      }

      return article ? article.toObject() : null;
    } catch (error) {
      console.error('Error updating article:', error.message);
      throw error;
    }
  }

  async deleteArticle(id) {
    try {
      // First try by custom id field (for seeded data)
      let result = await Article.findOneAndDelete({ id });

      // If not found, try by MongoDB _id
      if (!result) {
        try {
          result = await Article.findByIdAndDelete(id);
        } catch (err) {
          // Not a valid MongoDB ID format
        }
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
      let event = null;

      // First try by custom id field (for seeded data)
      event = await Event.findOne({ id });

      // If not found, try by MongoDB _id
      if (!event) {
        try {
          event = await Event.findById(id);
        } catch (err) {
          // Not a valid MongoDB ID format, that's OK
        }
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
      // First try by custom id field (for seeded data)
      let event = await Event.findOneAndUpdate({ id }, updateData, { new: true });

      // If not found, try by MongoDB _id
      if (!event) {
        try {
          event = await Event.findByIdAndUpdate(id, updateData, { new: true });
        } catch (err) {
          // Not a valid MongoDB ID format
        }
      }

      return event ? event.toObject() : null;
    } catch (error) {
      console.error('Error updating event:', error.message);
      throw error;
    }
  }

  async deleteEvent(id) {
    try {
      // First try by custom id field (for seeded data)
      let result = await Event.findOneAndDelete({ id });

      // If not found, try by MongoDB _id
      if (!result) {
        try {
          result = await Event.findByIdAndDelete(id);
        } catch (err) {
          // Not a valid MongoDB ID format
        }
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
      let playbook = null;

      // First try by custom id field (for seeded data)
      playbook = await Playbook.findOne({ id });

      // If not found, try by MongoDB _id
      if (!playbook) {
        try {
          playbook = await Playbook.findById(id);
        } catch (err) {
          // Not a valid MongoDB ID format, that's OK
        }
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
      // First try by custom id field (for seeded data)
      let playbook = await Playbook.findOneAndUpdate({ id }, updateData, { new: true });

      // If not found, try by MongoDB _id
      if (!playbook) {
        try {
          playbook = await Playbook.findByIdAndUpdate(id, updateData, { new: true });
        } catch (err) {
          // Not a valid MongoDB ID format
        }
      }

      return playbook ? playbook.toObject() : null;
    } catch (error) {
      console.error('Error updating playbook:', error.message);
      throw error;
    }
  }

  async deletePlaybook(id) {
    try {
      // First try by custom id field (for seeded data)
      let result = await Playbook.findOneAndDelete({ id });

      // If not found, try by MongoDB _id
      if (!result) {
        try {
          result = await Playbook.findByIdAndDelete(id);
        } catch (err) {
          // Not a valid MongoDB ID format
        }
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
      let magazine = null;

      // First try by custom id field (for seeded data)
      magazine = await Magazine.findOne({ id });

      // If not found, try by MongoDB _id
      if (!magazine) {
        try {
          magazine = await Magazine.findById(id);
        } catch (err) {
          // Not a valid MongoDB ID format, that's OK
        }
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
      // First try by custom id field (for seeded data)
      let magazine = await Magazine.findOneAndUpdate({ id }, updateData, { new: true });

      // If not found, try by MongoDB _id
      if (!magazine) {
        try {
          magazine = await Magazine.findByIdAndUpdate(id, updateData, { new: true });
        } catch (err) {
          // Not a valid MongoDB ID format
        }
      }

      return magazine ? magazine.toObject() : null;
    } catch (error) {
      console.error('Error updating magazine:', error.message);
      throw error;
    }
  }

  async deleteMagazine(id) {
    try {
      // First try by custom id field (for seeded data)
      let result = await Magazine.findOneAndDelete({ id });

      // If not found, try by MongoDB _id
      if (!result) {
        try {
          result = await Magazine.findByIdAndDelete(id);
        } catch (err) {
          // Not a valid MongoDB ID format
        }
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
      let masterclass = null;

      // First try by custom id field (for seeded data)
      masterclass = await Masterclass.findOne({ id });

      // If not found, try by MongoDB _id
      if (!masterclass) {
        try {
          masterclass = await Masterclass.findById(id);
        } catch (err) {
          // Not a valid MongoDB ID format, that's OK
        }
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
      // First try by custom id field (for seeded data)
      let masterclass = await Masterclass.findOneAndUpdate({ id }, updateData, { new: true });

      // If not found, try by MongoDB _id
      if (!masterclass) {
        try {
          masterclass = await Masterclass.findByIdAndUpdate(id, updateData, { new: true });
        } catch (err) {
          // Not a valid MongoDB ID format
        }
      }

      return masterclass ? masterclass.toObject() : null;
    } catch (error) {
      console.error('Error updating masterclass:', error.message);
      throw error;
    }
  }

  async deleteMasterclass(id) {
    try {
      // First try by custom id field (for seeded data)
      let result = await Masterclass.findOneAndDelete({ id });

      // If not found, try by MongoDB _id
      if (!result) {
        try {
          result = await Masterclass.findByIdAndDelete(id);
        } catch (err) {
          // Not a valid MongoDB ID format
        }
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
