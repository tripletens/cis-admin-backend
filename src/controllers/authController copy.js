const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/admins");
require("dotenv").config();

// result const Nonny4real2023

let result = {
    status : null,
    message : null,
    data : null,
    token : null
  };

// Register new user

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Check if the user already exists
    const adminUser = await AdminUser.findOne({ email });
    if (adminUser) {
      result.message = "Admin with email already exists";
      result.status = false;
      return res.status(400).json(result);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newAdminUser = new AdminUser({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    // Save the admin to the database
    const savedAdmin = await newAdminUser.save();

    // Remove the password property from the response
    const { password: pw, ...admin } = savedAdmin.toObject();

    result.message = "Admin Account created successfully";
    result.data = admin;

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const adminUser = await AdminUser.findOne({ email });
    if (!adminUser) {
        result.message = "Invalid credentials";
        result.status = false;
      return res.status(400).json(result);
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, adminUser.password);
    if (!validPassword) {
        result.message = "Invalid credentials";
        result.status = false;
      return res.status(400).json(result);
    }

    // Create and sign a token
    const token = jwt.sign({ _id: adminUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Remove the password property from the response
    const { password: pw, ...data } = adminUser.toObject();

    result.message = "Admin Logged in successfully";
    result.data = data;
    result.token = token;
    result.status = true;

    res.status(200).json(result);
  } catch (error) {
    result.message = error.message + " hello error here ";
    result.status = false;
    res.status(500).json(result);
  }
};
