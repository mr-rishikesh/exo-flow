const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getEvents);
router.get('/types', eventController.getEventTypes);
router.get('/:id', eventController.getEventById);
router.post('/:id/register', eventController.recordRegistration);

module.exports = router;
