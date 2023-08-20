const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/member/index');

// Define routes

// GET /Members - Fetch all members
router.get('/members', MemberController.getAllMembers);

// GET /Members/active - Fetch all active Members
router.get('/members/active', MemberController.getAllActiveMembers);

// GET /Members - search Member
router.get('/members/search', MemberController.searchMembers);

// GET /Members/:id - Fetch a Members by ID
router.get('/members/:id', MemberController.getMemberById);

// POST /Member - Create a new Member
router.post('/members', MemberController.createMember);

// PUT /Members/:id - Edit a Member
router.put('/members/:id', MemberController.editMember);

// DELETE /Members/:id - Delete a Member
router.delete('/members/:id', MemberController.deleteMember);


module.exports = router;
