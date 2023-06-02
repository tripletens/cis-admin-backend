const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const AboutOurImpactSectionSchema = mongoose.Schema(
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

const AboutOurImpactSection = mongoose.model(
  "AboutOurImpactSection",
  AboutOurImpactSectionSchema
);

AboutOurImpactSectionSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = AboutOurImpactSection;
