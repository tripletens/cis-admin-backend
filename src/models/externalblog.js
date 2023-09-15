const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const ExternalBlogSchema = mongoose.Schema(
  {
    link_url: {
      type: String,
      required: [true, "Please enter external link url"],
    },

    image_url: {
      type: String,
      required: false,
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
ExternalBlogSchema.index({ link_url: "text", image_url: "text"});

const ExternalBlog = mongoose.model("ExternalBlog", ExternalBlogSchema);

ExternalBlogSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = ExternalBlog;
