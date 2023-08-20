const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/member/index');

// Define routes

// GET /Members - Fetch all members
router.get('/members', MemberController.getAllMembers);

// GET /Members/active - Fetch all active Members
router.get('/members/active', MemberController.getAllActiveMembers);

// // GET /Blogs/unpublished - Fetch all the unpublished Blogs 
// router.get('/blogs/unpublished', MemberController.getAllUnpublishedBlogs);

// // PUT /Blogs/publish - Publish a Blog
// router.put('/blog/publish/:id', MemberController.publishBlog);

// // PUT /Blogs/unpublish - Unpublish a Blog
// router.put('/blog/unpublish/:id', MemberController.unpublishBlog);

// // GET /Blog/:id - Fetch a Blog by ID
// router.get('/blog/:id', MemberController.getBlogById);

// // POST /Blogs - Create a new Blog
// router.post('/blogs', MemberController.createBlog);

// // PUT /Blogs/:id - Edit a Blog
// router.put('/blog/:id', MemberController.editBlog);

// // DELETE /Blogs/:id - Delete a Blog
// router.delete('/blog/:id', MemberController.deleteBlog);

// // GET /Blogs - search a Blog
// router.get('/blogs/search', MemberController.searchBlog);

module.exports = router;
