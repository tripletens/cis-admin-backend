const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comments/index');

// Define routes

// GET /Comments - Fetch all Comments
router.get('/comments', CommentController.getAllComments);

// GET /Comments/:id - Fetch a Comment by ID
router.get('/comments/:id', CommentController.getCommentsById);

// POST /Comments - Create a new Comment
router.post('/comments', CommentController.createcomments);

// PUT /Comments/:id - Edit a Comment
router.put('/comments/:id', CommentController.editcomments);

// DELETE /Comments/:id - Delete a Comment
router.delete('/comments/:id', CommentController.deletecomments);

module.exports = router;
