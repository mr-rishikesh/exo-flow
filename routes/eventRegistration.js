const express = require('express');
const eventRegistrationController = require('../controllers/eventRegistrationController');

const router = express.Router();

// Public routes - no authentication required
router.post('/register', eventRegistrationController.registerEvent);
router.post('/cancel', eventRegistrationController.cancelEventRegistration);
router.post('/cancel/:user_email', eventRegistrationController.cancelEventRegistration);

// Admin routes
router.get('/', eventRegistrationController.getEventRegistrations);
router.delete('/:id', eventRegistrationController.deleteEventRegistration);

module.exports = router;
