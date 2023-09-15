const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blog/index');
const { validateMultipleDateFields } = require('../middleware/validateDate'); // Import the validation middleware

// Define routes

// GET /Blogs - Fetch all Blogs
router.get('/blogs', BlogController.getAllBlogs);

// GET /Blogs/active - Fetch all active Blogs
router.get('/blogs/active', BlogController.getAllActiveBlogs);

// GET /Blogs/unpublished - Fetch all the unpublished Blogs 
router.get('/blogs/unpublished', BlogController.getAllUnpublishedBlogs);

// PUT /Blogs/publish - Publish a Blog
router.put('/blog/publish/:id', BlogController.publishBlog);

// PUT /Blogs/unpublish - Unpublish a Blog
router.put('/blog/unpublish/:id', BlogController.unpublishBlog);

// GET /Blog/:id - Fetch a Blog by ID
router.get('/blog/:id', BlogController.getBlogById);

// GET /Blog/recent - fetch 6 most recent blog posts 

router.get('/blog/recent', BlogController.fetchRecentBlogs);

// POST /Blogs - Create a new Blog
router.post('/blogs',validateMultipleDateFields(['article_date']),BlogController.createBlog);

// PUT /Blogs/:id - Edit a Blog
router.put('/blog/:id', validateMultipleDateFields(['article_date']), BlogController.editBlog);

// DELETE /Blogs/:id - Delete a Blog
router.delete('/blog/:id', BlogController.deleteBlog);

// GET /Blogs - search a Blog
router.get('/blogs/search', BlogController.searchBlog);

module.exports = router;
