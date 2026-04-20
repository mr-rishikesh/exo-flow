const express = require('express');
const router = express.Router();
const masterclassController = require('../controllers/masterclassController');

router.get('/', masterclassController.getMasterclasses);
router.get('/categories', masterclassController.getMasterclassCategories);
router.get('/:id', masterclassController.getMasterclassById);
router.post('/:id/enroll', masterclassController.recordEnrollment);

module.exports = router;
