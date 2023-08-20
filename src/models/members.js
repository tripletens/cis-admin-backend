const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department', // Reference to the Department model
      required: true,
    },
    office: {
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
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
    deleted_at: {
      type: Date,
      required: false,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;