const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/member/index');

// Define routes

// GET /Members - Fetch all members
router.get('/members', MemberController.getAllMembers);

// GET /Members/active - Fetch all active Members
router.get('/members/active', MemberController.getAllActiveMembers);

// GET /Members/:id - Fetch a Members by ID
router.get('/members/:id', MemberController.getMemberById);

// POST /Member - Create a new Member
router.post('/members', MemberController.createMember);

// // PUT /Blogs/:id - Edit a Blog
// router.put('/blog/:id', MemberController.editBlog);

// // DELETE /Blogs/:id - Delete a Blog
// router.delete('/blog/:id', MemberController.deleteBlog);

// // GET /Blogs - search a Blog
// router.get('/blogs/search', MemberController.searchBlog);

module.exports = router;
