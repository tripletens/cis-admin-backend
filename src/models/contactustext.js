const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const ContactUsTextSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    sub_title: {
      type: String,
      required: false,
    },

    body: {
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

const ContactUsText = mongoose.model(
  "ContactUsText",
  ContactUsTextSchema
);

ContactUsTextSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = ContactUsText;
