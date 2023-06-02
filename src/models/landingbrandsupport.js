const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const landingBrandSupportSchema = mongoose.Schema(
  {
    title: {
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

const LandingBrandSupport = mongoose.model(
  "LandingBrandSupport",
  landingBrandSupportSchema
);

landingBrandSupportSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = LandingBrandSupport;
