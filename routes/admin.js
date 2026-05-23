const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/login', authMiddleware.requireGuest, adminController.login);
router.post('/login', authMiddleware.requireGuest, adminController.handleLogin);
router.get('/logout', adminController.logout);
router.get('/dashboard', authMiddleware.requireAuth, adminController.dashboard);

router.get('/leads', authMiddleware.requireAuth, adminController.leadsPage);
router.get('/leads/edit/:id', authMiddleware.requireAuth, adminController.editLeadPage);
router.post('/leads/update/:id', authMiddleware.requireAuth, adminController.updateLeadStatus);
router.post('/leads/delete/:id', authMiddleware.requireAuth, adminController.deleteLead);
router.post('/leads/toggle-review/:id', authMiddleware.requireAuth, adminController.toggleLeadReview);

router.get('/articles', authMiddleware.requireAuth, adminController.articlesPage);
router.get('/articles/new', authMiddleware.requireAuth, adminController.newArticlePage);
router.post('/articles/create', authMiddleware.requireAuth, adminController.createArticle);
router.get('/articles/edit/:id', authMiddleware.requireAuth, adminController.editArticlePage);
router.post('/articles/update/:id', authMiddleware.requireAuth, adminController.updateArticle);
router.post('/articles/delete/:id', authMiddleware.requireAuth, adminController.deleteArticle);

// Events routes
router.get('/events', authMiddleware.requireAuth, adminController.eventsPage);
router.get('/events/new', authMiddleware.requireAuth, adminController.newEventPage);
router.post('/events/create', authMiddleware.requireAuth, adminController.createEvent);
router.get('/events/edit/:id', authMiddleware.requireAuth, adminController.editEventPage);
router.post('/events/update/:id', authMiddleware.requireAuth, adminController.updateEvent);
router.post('/events/delete/:id', authMiddleware.requireAuth, adminController.deleteEvent);

// Playbooks routes
router.get('/playbooks', authMiddleware.requireAuth, adminController.playbooksPage);
router.get('/playbooks/new', authMiddleware.requireAuth, adminController.newPlaybookPage);
router.post('/playbooks/create', authMiddleware.requireAuth, adminController.createPlaybook);
router.get('/playbooks/edit/:id', authMiddleware.requireAuth, adminController.editPlaybookPage);
router.post('/playbooks/update/:id', authMiddleware.requireAuth, adminController.updatePlaybook);
router.post('/playbooks/delete/:id', authMiddleware.requireAuth, adminController.deletePlaybook);

// Masterclasses routes
router.get('/masterclasses', authMiddleware.requireAuth, adminController.masterclassesPage);
router.get('/masterclasses/new', authMiddleware.requireAuth, adminController.newMasterclassPage);
router.post('/masterclasses/create', authMiddleware.requireAuth, adminController.createMasterclass);
router.get('/masterclasses/edit/:id', authMiddleware.requireAuth, adminController.editMasterclassPage);
router.post('/masterclasses/update/:id', authMiddleware.requireAuth, adminController.updateMasterclass);
router.post('/masterclasses/delete/:id', authMiddleware.requireAuth, adminController.deleteMasterclass);

// Magazines routes
router.get('/magazines', authMiddleware.requireAuth, adminController.magazinesPage);
router.get('/magazines/new', authMiddleware.requireAuth, adminController.newMagazinePage);
router.post('/magazines/create', authMiddleware.requireAuth, adminController.createMagazine);
router.get('/magazines/edit/:id', authMiddleware.requireAuth, adminController.editMagazinePage);
router.post('/magazines/update/:id', authMiddleware.requireAuth, adminController.updateMagazine);
router.post('/magazines/delete/:id', authMiddleware.requireAuth, adminController.deleteMagazine);

module.exports = router;
