const express = require('express');
const newsletterController = require('../controllers/newsletterController');

const router = express.Router();

// Public routes - no authentication required
router.post('/subscribe', newsletterController.subscribeNewsletter);
router.post('/unsubscribe', newsletterController.unsubscribeNewsletter);

// Protected routes - for admin only
router.get('/', newsletterController.getNewsletterSubscribers);
router.delete('/:id', newsletterController.unsubscribeNewsletterById);

module.exports = router;
