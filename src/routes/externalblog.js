const express = require('express');
const router = express.Router();
const externalBlogController = require('../controllers/externalblog/index');

// Define routes

// GET /ExternalBlogs - Fetch all Blogs
router.get('/externalblogs', externalBlogController.getallExternalBlog);

// GET /ExternalBlog/:id - Fetch a Blog by ID
router.get('/externalblogs/:id', externalBlogController.getExternalBlogById);

// POST /Blogs - Create a new Blog
router.post('/externalblogs',externalBlogController.createExternalBlog);

// PUT /Blogs/:id - Edit a Blog
router.put('/externalblogs/:id', externalBlogController.editExternalBlog);

// DELETE /Blogs/:id - Delete a Blog
router.delete('/externalblogs/:id', externalBlogController.deleteExternalBlog);

// GET /Blogs - search a Blog
router.get('/externalblogs/search', externalBlogController.searchExternalBlog);

module.exports = router;
