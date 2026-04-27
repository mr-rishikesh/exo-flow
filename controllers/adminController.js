const bcryptjs = require('bcryptjs');
const Lead = require('../models/Lead');
const DataService = require('../services/DataService');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@cxotechbot.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';

exports.login = (req, res) => {
  res.render('admin/login', { error: null });
};

exports.handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('admin/login', { error: 'Email and password required' });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      req.session.adminId = 'admin';
      return res.redirect('/admin/leads');
    }

    res.render('admin/login', { error: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    res.render('admin/login', { error: 'Login failed' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};

exports.leadsPage = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.render('admin/leads', { leads });
  } catch (error) {
    console.error('Error loading leads:', error);
    res.status(500).render('admin/leads', { leads: [], error: error.message });
  }
};

exports.editLeadPage = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).send('Lead not found');
    }
    res.render('admin/edit-lead', { lead });
  } catch (error) {
    console.error('Error loading lead:', error);
    res.status(500).send('Failed to load lead');
  }
};

exports.updateLeadStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    res.redirect('/admin/leads');
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).send('Failed to update lead');
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.redirect('/admin/leads');
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).send('Failed to delete lead');
  }
};

exports.articlesPage = async (req, res) => {
  try {
    const articles = await DataService.getArticles();
    res.render('admin/articles', { articles });
  } catch (error) {
    console.error('Error loading articles:', error);
    res.status(500).render('admin/articles', { articles: [], error: error.message });
  }
};

exports.newArticlePage = (req, res) => {
  res.render('admin/new-article');
};

exports.createArticle = async (req, res) => {
  try {
    const { title, category, summary, url, tags } = req.body;
    const articles = await DataService.getArticles();

    const newArticle = {
      id: `art-${String(articles.length + 1).padStart(3, '0')}`,
      category,
      subcategory: 'general',
      title,
      summary,
      url,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      createdAt: new Date().toISOString().split('T')[0],
      clicks: 0,
    };

    articles.push(newArticle);
    await DataService.saveArticles(articles);
    res.redirect('/admin/articles');
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).send('Failed to create article');
  }
};

exports.editArticlePage = async (req, res) => {
  try {
    const articles = await DataService.getArticles();
    const article = articles.find(a => a.id === req.params.id);

    if (!article) {
      return res.status(404).send('Article not found');
    }

    res.render('admin/edit-article', { article });
  } catch (error) {
    console.error('Error loading article:', error);
    res.status(500).send('Failed to load article');
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { title, category, summary, url, tags } = req.body;
    const articles = await DataService.getArticles();

    const articleIndex = articles.findIndex(a => a.id === req.params.id);
    if (articleIndex === -1) {
      return res.status(404).send('Article not found');
    }

    articles[articleIndex] = {
      ...articles[articleIndex],
      title,
      category,
      summary,
      url,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
    };

    await DataService.saveArticles(articles);
    res.redirect('/admin/articles');
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).send('Failed to update article');
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const articles = await DataService.getArticles();
    const filtered = articles.filter(a => a.id !== req.params.id);
    await DataService.saveArticles(filtered);
    res.redirect('/admin/articles');
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).send('Failed to delete article');
  }
};

// EVENTS MANAGEMENT
exports.eventsPage = async (req, res) => {
  try {
    const events = await DataService.getEvents();
    res.render('admin/events', { events });
  } catch (error) {
    console.error('Error loading events:', error);
    res.status(500).render('admin/events', { events: [], error: error.message });
  }
};

exports.newEventPage = (req, res) => {
  res.render('admin/new-event');
};

exports.createEvent = async (req, res) => {
  try {
    const { title, category, type, description, speaker, date, time, duration, url } = req.body;
    const events = await DataService.getEvents();

    const newEvent = {
      id: `evt-${String(events.length + 1).padStart(3, '0')}`,
      title,
      category,
      type,
      description,
      speaker,
      date,
      time,
      duration,
      url,
      createdAt: new Date().toISOString().split('T')[0],
    };

    events.push(newEvent);
    await DataService.saveEvents(events);
    res.redirect('/admin/events');
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send('Failed to create event');
  }
};

exports.editEventPage = async (req, res) => {
  try {
    const events = await DataService.getEvents();
    const event = events.find(e => e.id === req.params.id);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.render('admin/edit-event', { event });
  } catch (error) {
    console.error('Error loading event:', error);
    res.status(500).send('Failed to load event');
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { title, category, type, description, speaker, date, time, duration, url } = req.body;
    const events = await DataService.getEvents();
    const eventIndex = events.findIndex(e => e.id === req.params.id);
    if (eventIndex === -1) {
      return res.status(404).send('Event not found');
    }
    events[eventIndex] = {
      ...events[eventIndex],
      title,
      category,
      type,
      description,
      speaker,
      date,
      time,
      duration,
      url,
    };
    await DataService.saveEvents(events);
    res.redirect('/admin/events');
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).send('Failed to update event');
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const events = await DataService.getEvents();
    const filtered = events.filter(e => e.id !== req.params.id);
    await DataService.saveEvents(filtered);
    res.redirect('/admin/events');
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).send('Failed to delete event');
  }
};

// PLAYBOOKS MANAGEMENT
exports.playbooksPage = async (req, res) => {
  try {
    const playbooks = await DataService.getPlaybooks();
    res.render('admin/playbooks', { playbooks });
  } catch (error) {
    console.error('Error loading playbooks:', error);
    res.status(500).render('admin/playbooks', { playbooks: [], error: error.message });
  }
};

exports.newPlaybookPage = (req, res) => {
  res.render('admin/new-playbook');
};

exports.createPlaybook = async (req, res) => {
  try {
    const { title, category, description, pages, downloadUrl } = req.body;
    const playbooks = await DataService.getPlaybooks();

    const newPlaybook = {
      id: `pb-${String(playbooks.length + 1).padStart(3, '0')}`,
      title,
      category,
      description,
      pages,
      downloadUrl,
      downloads: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    playbooks.push(newPlaybook);
    await DataService.savePlaybooks(playbooks);
    res.redirect('/admin/playbooks');
  } catch (error) {
    console.error('Error creating playbook:', error);
    res.status(500).send('Failed to create playbook');
  }
};

exports.editPlaybookPage = async (req, res) => {
  try {
    const playbooks = await DataService.getPlaybooks();
    const playbook = playbooks.find(p => p.id === req.params.id);
    if (!playbook) {
      return res.status(404).send('Playbook not found');
    }
    res.render('admin/edit-playbook', { playbook });
  } catch (error) {
    console.error('Error loading playbook:', error);
    res.status(500).send('Failed to load playbook');
  }
};

exports.updatePlaybook = async (req, res) => {
  try {
    const { title, category, description, pages, downloadUrl } = req.body;
    const playbooks = await DataService.getPlaybooks();
    const playbookIndex = playbooks.findIndex(p => p.id === req.params.id);
    if (playbookIndex === -1) {
      return res.status(404).send('Playbook not found');
    }
    playbooks[playbookIndex] = {
      ...playbooks[playbookIndex],
      title,
      category,
      description,
      pages,
      downloadUrl,
    };
    await DataService.savePlaybooks(playbooks);
    res.redirect('/admin/playbooks');
  } catch (error) {
    console.error('Error updating playbook:', error);
    res.status(500).send('Failed to update playbook');
  }
};

exports.deletePlaybook = async (req, res) => {
  try {
    const playbooks = await DataService.getPlaybooks();
    const filtered = playbooks.filter(p => p.id !== req.params.id);
    await DataService.savePlaybooks(filtered);
    res.redirect('/admin/playbooks');
  } catch (error) {
    console.error('Error deleting playbook:', error);
    res.status(500).send('Failed to delete playbook');
  }
};

// MASTERCLASSES MANAGEMENT
exports.masterclassesPage = async (req, res) => {
  try {
    const masterclasses = await DataService.getMasterclasses();
    res.render('admin/masterclasses', { masterclasses });
  } catch (error) {
    console.error('Error loading masterclasses:', error);
    res.status(500).render('admin/masterclasses', { masterclasses: [], error: error.message });
  }
};

exports.newMasterclassPage = (req, res) => {
  res.render('admin/new-masterclass');
};

exports.createMasterclass = async (req, res) => {
  try {
    const { title, category, description, speaker, date, time, duration, price } = req.body;
    const masterclasses = await DataService.getMasterclasses();

    const newMasterclass = {
      id: `mc-${String(masterclasses.length + 1).padStart(3, '0')}`,
      title,
      category,
      description,
      speaker,
      date,
      time,
      duration,
      price,
      createdAt: new Date().toISOString().split('T')[0],
    };

    masterclasses.push(newMasterclass);
    await DataService.saveMasterclasses(masterclasses);
    res.redirect('/admin/masterclasses');
  } catch (error) {
    console.error('Error creating masterclass:', error);
    res.status(500).send('Failed to create masterclass');
  }
};

exports.editMasterclassPage = async (req, res) => {
  try {
    const masterclasses = await DataService.getMasterclasses();
    const masterclass = masterclasses.find(m => m.id === req.params.id);
    if (!masterclass) {
      return res.status(404).send('Masterclass not found');
    }
    res.render('admin/edit-masterclass', { masterclass });
  } catch (error) {
    console.error('Error loading masterclass:', error);
    res.status(500).send('Failed to load masterclass');
  }
};

exports.updateMasterclass = async (req, res) => {
  try {
    const { title, category, description, speaker, date, time, duration, price } = req.body;
    const masterclasses = await DataService.getMasterclasses();
    const mcIndex = masterclasses.findIndex(m => m.id === req.params.id);
    if (mcIndex === -1) {
      return res.status(404).send('Masterclass not found');
    }
    masterclasses[mcIndex] = {
      ...masterclasses[mcIndex],
      title,
      category,
      description,
      speaker,
      date,
      time,
      duration,
      price,
    };
    await DataService.saveMasterclasses(masterclasses);
    res.redirect('/admin/masterclasses');
  } catch (error) {
    console.error('Error updating masterclass:', error);
    res.status(500).send('Failed to update masterclass');
  }
};

exports.deleteMasterclass = async (req, res) => {
  try {
    const masterclasses = await DataService.getMasterclasses();
    const filtered = masterclasses.filter(m => m.id !== req.params.id);
    await DataService.saveMasterclasses(filtered);
    res.redirect('/admin/masterclasses');
  } catch (error) {
    console.error('Error deleting masterclass:', error);
    res.status(500).send('Failed to delete masterclass');
  }
};

// MAGAZINES MANAGEMENT
exports.magazinesPage = async (req, res) => {
  try {
    const magazines = await DataService.getMagazines();
    res.render('admin/magazines', { magazines });
  } catch (error) {
    console.error('Error loading magazines:', error);
    res.status(500).render('admin/magazines', { magazines: [], error: error.message });
  }
};

exports.newMagazinePage = (req, res) => {
  res.render('admin/new-magazine');
};

exports.createMagazine = async (req, res) => {
  try {
    const { title, category, description, coverImage } = req.body;
    const magazines = await DataService.getMagazines();

    const newMagazine = {
      id: `mag-${String(magazines.length + 1).padStart(3, '0')}`,
      title,
      category,
      description,
      coverImage,
      createdAt: new Date().toISOString().split('T')[0],
    };

    magazines.push(newMagazine);
    await DataService.saveMagazines(magazines);
    res.redirect('/admin/magazines');
  } catch (error) {
    console.error('Error creating magazine:', error);
    res.status(500).send('Failed to create magazine');
  }
};

exports.editMagazinePage = async (req, res) => {
  try {
    const magazines = await DataService.getMagazines();
    const magazine = magazines.find(m => m.id === req.params.id);
    if (!magazine) {
      return res.status(404).send('Magazine not found');
    }
    res.render('admin/edit-magazine', { magazine });
  } catch (error) {
    console.error('Error loading magazine:', error);
    res.status(500).send('Failed to load magazine');
  }
};

exports.updateMagazine = async (req, res) => {
  try {
    const { title, category, description, coverImage } = req.body;
    const magazines = await DataService.getMagazines();
    const magIndex = magazines.findIndex(m => m.id === req.params.id);
    if (magIndex === -1) {
      return res.status(404).send('Magazine not found');
    }
    magazines[magIndex] = {
      ...magazines[magIndex],
      title,
      category,
      description,
      coverImage,
    };
    await DataService.saveMagazines(magazines);
    res.redirect('/admin/magazines');
  } catch (error) {
    console.error('Error updating magazine:', error);
    res.status(500).send('Failed to update magazine');
  }
};

exports.deleteMagazine = async (req, res) => {
  try {
    const magazines = await DataService.getMagazines();
    const filtered = magazines.filter(m => m.id !== req.params.id);
    await DataService.saveMagazines(filtered);
    res.redirect('/admin/magazines');
  } catch (error) {
    console.error('Error deleting magazine:', error);
    res.status(500).send('Failed to delete magazine');
  }
};
