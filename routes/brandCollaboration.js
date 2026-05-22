const express = require('express');
const brandCollaborationController = require('../controllers/brandCollaborationController');

const router = express.Router();

// Public routes - no authentication required
router.post('/submit', brandCollaborationController.submitBrandCollaboration);
router.post('/cancel', brandCollaborationController.cancelBrandCollaboration);
router.post('/cancel/:user_email', brandCollaborationController.cancelBrandCollaboration);

// Admin routes
router.get('/', brandCollaborationController.getBrandCollaborations);
router.delete('/:id', brandCollaborationController.deleteBrandCollaboration);

module.exports = router;
