const express = require('express');
const router = express.Router();
const ArticlesController = require('../controllers/articles/index');

// Define routes

// GET /Articles - Fetch all articles
router.get('/articles', ArticlesController.getAllArticles);

// GET /Articles/active - Fetch all active Articles
router.get('/articles/active', ArticlesController.getAllActiveArticles);

// // GET /Blogs/unpublished - Fetch all the unpublished Blogs 
// router.get('/blogs/unpublished', BlogController.getAllUnpublishedBlogs);

// // PUT /Blogs/publish - Publish a Blog
// router.put('/blog/publish/:id', BlogController.publishBlog);

// // PUT /Blogs/unpublish - Unpublish a Blog
// router.put('/blog/unpublish/:id', BlogController.unpublishBlog);

// // GET /Blog/:id - Fetch a Blog by ID
// router.get('/blog/:id', BlogController.getBlogById);

// // POST /Blogs - Create a new Blog
// router.post('/blogs', BlogController.createBlog);

// // PUT /Blogs/:id - Edit a Blog
// router.put('/blog/:id', BlogController.editBlog);

// // DELETE /Blogs/:id - Delete a Blog
// router.delete('/blog/:id', BlogController.deleteBlog);

// // GET /Blogs - search a Blog
// router.get('/blogs/search', BlogController.searchBlog);

module.exports = router;
