const express = require('express');
const router = express.Router();
const ArticlesController = require('../controllers/articles/index');

// Define routes

// GET /Articles - Fetch all articles
router.get('/articles', ArticlesController.getAllArticles);

// GET /Articles/active - Fetch all active Articles
router.get('/articles/active', ArticlesController.getAllActiveArticles);

// GET /Articles/recent - Fetch recent Articles
router.get('/articles/recent', ArticlesController.getMostRecentArticles);

// GET /Articles/unpublished - Fetch all the unpublished Articles 
router.get('/articles/unpublished', ArticlesController.getAllUnpublishedArticles);

// GET /Articles/published - Fetch all the published Articles 
router.get('/articles/published', ArticlesController.getAllpublishedArticles);

// PUT /Articles/publish - Publish an Articles
router.put('/articles/publish/:id', ArticlesController.publishArticles);

// PUT /Articles/unpublish - Unpublish a Articles
router.put('/articles/unpublish/:id', ArticlesController.unpublishArticles);

// GET /Articles/:id - Fetch an Article by ID
router.get('/articles/:id', ArticlesController.getArticlesById);

// POST /Articles - Create a new Articles
router.post('/articles', ArticlesController.createArticle);

// PUT /Articles/:id - Edit a Articles
router.put('/articles/:id', ArticlesController.editArticle);

// DELETE /Articles/:id - Delete a Articles
router.delete('/articles/:id', ArticlesController.deleteArticles);

// GET /Articles - search a Articles
router.get('/articles/search/new', ArticlesController.searchArticles);

module.exports = router;
