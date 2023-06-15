const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const ContactUsContactSchema = mongoose.Schema(
  {
    telephone: {
      type: String,
      required: false,
    },
    whatsapp: {
      type: String,
      required: false,
    },

    email_one: {
      type: String,
      required: false,
    },
    email_two: {
      type: String,
      required: false,
    },
    email_three: {
      type: String,
      required: false,
    },
    email_four: {
      type: String,
      required: false,
    },
    address: {
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

const ContactUsContact = mongoose.model(
  "ContactUsContact",
  ContactUsContactSchema
);

ContactUsContactSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = ContactUsContact;
