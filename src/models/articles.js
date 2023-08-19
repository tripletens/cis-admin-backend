const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const ArticlesSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "Please enter a article author name"],
    },

    title: {
      type: String,
      required: [true, "Please enter article title"],
    },

    description: {
      type: String,
      required: false,
    },

    views: {
      type: Number,
      required: true,
      default: 0,
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
ArticlesSchema.index({ title: "text", content: "text", author: "text", description: "text" });

const Articles = mongoose.model("Articles", ArticlesSchema);

ArticlesSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = Articles;
