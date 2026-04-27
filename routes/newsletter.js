const express = require('express');
const newsletterController = require('../controllers/newsletterController');

const router = express.Router();

// Public routes - no authentication required
// Accept email from: query params, URL params, or request body
router.post('/subscribe', newsletterController.subscribeNewsletter);
router.post('/subscribe/:email', newsletterController.subscribeNewsletter);
router.post('/unsubscribe', newsletterController.unsubscribeNewsletter);
router.post('/unsubscribe/:email', newsletterController.unsubscribeNewsletter);

// GET methods for email parameter (alternative method)
router.get('/subscribe/:email', newsletterController.subscribeNewsletter);
router.get('/unsubscribe/:email', newsletterController.unsubscribeNewsletter);

// Protected routes - for admin only
router.get('/', newsletterController.getNewsletterSubscribers);
router.delete('/:id', newsletterController.unsubscribeNewsletterById);

module.exports = router;
