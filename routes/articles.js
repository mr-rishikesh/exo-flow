const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.getArticles);
router.get('/categories', articleController.getCategories);
router.get('/:id', articleController.getArticleById);
router.post('/:id/click', articleController.recordClick);

module.exports = router;
