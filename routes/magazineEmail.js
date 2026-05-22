const express = require('express');
const magazineEmailController = require('../controllers/magazineEmailController');

const router = express.Router();

// Public routes - no authentication required
router.post('/subscribe', magazineEmailController.subscribeMagazineEmail);
router.post('/subscribe/:user_email', magazineEmailController.subscribeMagazineEmail);
router.get('/subscribe/:user_email', magazineEmailController.subscribeMagazineEmail);
router.post('/unsubscribe', magazineEmailController.unsubscribeMagazine);
router.post('/unsubscribe/:user_email', magazineEmailController.unsubscribeMagazine);

// Admin routes
router.get('/', magazineEmailController.getMagazineSubscribers);
router.delete('/:id', magazineEmailController.deleteMagazineSubscriber);

module.exports = router;
