const express = require('express');
const getFeatureController = require('../controllers/getFeatureController');

const router = express.Router();

// Public routes - no authentication required
router.post('/share-founder-story', getFeatureController.submitFounderStory);

// Admin routes
router.get('/', getFeatureController.getFeatureSubmissions);
router.delete('/:id', getFeatureController.deleteFeatureSubmission);

module.exports = router;
