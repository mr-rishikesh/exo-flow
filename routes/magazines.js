const express = require('express');
const router = express.Router();
const magazineController = require('../controllers/magazineController');

router.get('/', magazineController.getMagazines);
router.get('/categories', magazineController.getMagazineCategories);
router.get('/:id', magazineController.getMagazineById);
router.post('/:id/download', magazineController.recordDownload);

module.exports = router;
