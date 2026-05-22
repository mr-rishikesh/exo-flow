const express = require('express');
const getFeatureController = require('../controllers/getFeatureController');

const router = express.Router();

// Public routes - no authentication required
router.post('/share-founder-story', getFeatureController.submitFounderStory);
router.post('/role-change-announcement', getFeatureController.submitRoleChangeAnnouncement);

// Admin routes
router.get('/', getFeatureController.getFeatureSubmissions);
router.get('/role-change-announcements', getFeatureController.getRoleChangeAnnouncements);
router.delete('/:id', getFeatureController.deleteFeatureSubmission);
router.delete('/role-change/:id', getFeatureController.deleteRoleChangeAnnouncement);

module.exports = router;
