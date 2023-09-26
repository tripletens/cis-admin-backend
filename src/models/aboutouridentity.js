const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const AboutOurIdentitySectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    subtitle: {
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

const AboutOurIdentitySection = mongoose.model(
  "AboutOurIdentitySection",
  AboutOurIdentitySectionSchema
);

AboutOurIdentitySectionSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = AboutOurIdentitySection;
