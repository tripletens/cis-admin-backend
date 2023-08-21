const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const BlogSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "Please enter a blog author name"],
    },

    title: {
      type: String,
      required: [true, "Please enter a blog title"],
    },

    description: {
      type: String,
      required: false,
    },

    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Please enter a blog department"],
    },


    views: {
      type: Number,
      required: true,
      default: 0,
    },

    article_date: {
      type: Date,
      required: true,
      default: null,
    },

    is_published: {
      type: Boolean,
      required: true,
      default: false,
    },

    status: {
      type: Boolean,
      required: true,
      default: true,
    },

    image: {
      type: String,
      required: false,
      default: null,
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

// Create a text index on the 'title' and 'content' fields
BlogSchema.index({ title: "text", content: "text", author: "text", description: "text" });

const Blog = mongoose.model("Blog", BlogSchema);

BlogSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = Blog;
