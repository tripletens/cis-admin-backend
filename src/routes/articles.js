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

// // GET /Articles/unpublished - Fetch all the unpublished Articles 
router.get('/articles/unpublished', ArticlesController.getAllUnpublishedArticles);

// // GET /Articles/published - Fetch all the published Articles 
router.get('/articles/published', ArticlesController.getAllpublishedArticles);



// // PUT /Blogs/publish - Publish a Blog
// router.put('/blog/publish/:id', BlogController.publishBlog);

// // PUT /Blogs/unpublish - Unpublish a Blog
// router.put('/blog/unpublish/:id', BlogController.unpublishBlog);

// // GET /Blog/:id - Fetch a Blog by ID
// router.get('/blog/:id', BlogController.getBlogById);

// POST /Articles - Create a new Articles
router.post('/articles', ArticlesController.createArticle);

// PUT /Blogs/:id - Edit a Blog
router.put('/articles/:id', ArticlesController.editArticle);

// // DELETE /Blogs/:id - Delete a Blog
// router.delete('/blog/:id', BlogController.deleteBlog);

// // GET /Blogs - search a Blog
// router.get('/blogs/search', BlogController.searchBlog);

module.exports = router;
