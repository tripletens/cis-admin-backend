const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  { 
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article', // Reference to the Article model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      required: true,
      default: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;