const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blog/index');

// Define routes

// GET /Blogs - Fetch all Blogs
router.get('/blogs', BlogController.getAllBlogs);

// GET /Blogs/active - Fetch all active Blogs
router.get('/blogs/active', BlogController.getAllActiveBlogs);

// GET /Blogs/publish - Publish a Blog
router.get('/blog/publish/:id', BlogController.publishBlog);

// GET /Blogs/unpublish - Unpublish a Blog
router.get('/blog/unpublish/:id', BlogController.unpublishBlog);

// GET /Blog/:id - Fetch a Blog by ID
router.get('/blog/:id', BlogController.getBlogById);

// POST /Blogs - Create a new Blog
router.post('/blogs', BlogController.createBlog);

// PUT /Blogs/:id - Edit a Blog
router.put('/blog/:id', BlogController.editBlog);

// DELETE /Blogs/:id - Delete a Blog
router.delete('/blog/:id', BlogController.deleteBlog);

module.exports = router;
