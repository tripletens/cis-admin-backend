const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const LandingOurApproachSectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },

    sub_title: {
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

const LandingOurApproachSection = mongoose.model(
  "LandingOurApproachSection",
  LandingOurApproachSectionSchema
);

LandingOurApproachSectionSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = LandingOurApproachSection;
