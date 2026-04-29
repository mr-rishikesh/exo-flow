const express = require('express');
const playbookSubscriptionController = require('../controllers/playbookSubscriptionController');

const router = express.Router();

// Public routes - no authentication required
// Accept parameters from: URL path, query params, or request body
router.post('/subscribe', playbookSubscriptionController.subscribePlaybook);
router.post('/unsubscribe', playbookSubscriptionController.unsubscribePlaybook);
router.post('/unsubscribe/:user_email', playbookSubscriptionController.unsubscribePlaybook);

// Admin routes
router.get('/', playbookSubscriptionController.getPlaybookSubscribers);
router.delete('/:id', playbookSubscriptionController.deletePlaybookSubscriber);

module.exports = router;
