const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adminUserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter your first name"],
    },

    lastname: {
      type: String,
      required: [true, "Please enter your last name"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email address"],
      unique: true, // Ensure email is unique
      index: true, // Index the email field for faster queries
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // Validate email format
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    image: {
      type: String,
      required: false,
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

adminUserSchema.plugin(uniqueValidator); // Add unique validation plugin to schema

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

module.exports = AdminUser;
