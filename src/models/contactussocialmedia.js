const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

// instagram, youtube, tiktok, linkedin, facebook, twitter
const ContactUsSocialMediaSchema = mongoose.Schema(
  {
    instagram: {
      type: String,
      required: false,
    },
    youtube: {
      type: String,
      required: false,
    },

    tiktok: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    facebook: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
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

const ContactUsSocialMedia = mongoose.model(
  "ContactUsSocialMedia",
  ContactUsSocialMediaSchema
);

ContactUsSocialMediaSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = ContactUsSocialMedia;
