const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blog/index');

// Define routes

// GET /Blogs - Fetch all Blogs
router.get('/blogs', BlogController.getAllBlogs);

// GET /Blogs/active - Fetch all active Blogs
router.get('/blogs/active', BlogController.getAllActiveBlogs);

// PUT /Blogs/publish - Publish a Blog
router.put('/blog/publish/:id', BlogController.publishBlog);

// PUT /Blogs/unpublish - Unpublish a Blog
router.put('/blog/unpublish/:id', BlogController.unpublishBlog);

// GET /Blog/:id - Fetch a Blog by ID
router.get('/blog/:id', BlogController.getBlogById);

// POST /Blogs - Create a new Blog
router.post('/blogs', BlogController.createBlog);

// PUT /Blogs/:id - Edit a Blog
router.put('/blog/:id', BlogController.editBlog);

// DELETE /Blogs/:id - Delete a Blog
router.delete('/blog/:id', BlogController.deleteBlog);

// GET /Blogs - search a Blog
router.get('/blogs/search', BlogController.searchBlog);

module.exports = router;
