const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const LandingUpdateImageSectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    image_one:{
      type: String,
      required: false,
    },
    image_two:{
      type: String,
      required: false,
    },
    image_three:{
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

const LandingUpdateImageSection = mongoose.model(
  "LandingUpdateImageSection",
  LandingUpdateImageSectionSchema
);

LandingUpdateImageSectionSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = LandingUpdateImageSection;
