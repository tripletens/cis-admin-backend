const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const landingMetricsSchema = mongoose.Schema(
  {
    metric_one: {
      type: String,
      required: false,
    },
    subtitle_one: {
      type: String,
      required: false,
    },

    metric_two: {
      type: String,
      required: false,
    },

    subtitle_two: {
      type: String,
      required: false,
    },
    metric_three: {
      type: String,
      required: false,
    },

    subtitle_three: {
      type: String,
      required: false,
    },
    metric_four: {
      type: String,
      required: false,
    },
    subtitle_four: {
      type: String,
      required: false,
    },
    metric_five: {
      type: String,
      required: false,
    },
    subtitle_five: {
      type: String,
      required: false,
    },
    metric_six: {
      type: String,
      required: false,
    },
    subtitle_six: {
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

const LandingMetrics = mongoose.model(
  "LandingMetrics",
  landingMetricsSchema
);

landingMetricsSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

module.exports = LandingMetrics;
