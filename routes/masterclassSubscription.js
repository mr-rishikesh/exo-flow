const express = require('express');
const masterclassSubscriptionController = require('../controllers/masterclassSubscriptionController');

const router = express.Router();

// Public routes - no authentication required
router.post('/subscribe', masterclassSubscriptionController.subscribeMasterclass);
router.post('/unsubscribe', masterclassSubscriptionController.unsubscribeMasterclass);
router.post('/unsubscribe/:user_email', masterclassSubscriptionController.unsubscribeMasterclass);

// Admin routes
router.get('/', masterclassSubscriptionController.getMasterclassSubscribers);
router.delete('/:id', masterclassSubscriptionController.deleteMasterclassSubscriber);

module.exports = router;
