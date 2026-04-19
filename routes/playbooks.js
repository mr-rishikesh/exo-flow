const express = require('express');
const router = express.Router();
const playbookController = require('../controllers/playbookController');

router.get('/', playbookController.getPlaybooks);
router.get('/categories', playbookController.getCategories);
router.get('/:id', playbookController.getPlaybookById);
router.post('/:id/download', playbookController.recordDownload);

module.exports = router;
