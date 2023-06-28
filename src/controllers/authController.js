const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/admins");
require("dotenv").config();

// Register new user
exports.register = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Check if the user already exists
    const adminUser = await AdminUser.findOne({ email }).lean();
    if (adminUser) {
      return res.status(400).json({
        status: false,
        message: "Admin with email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

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

    return res.status(201).json({
      status: true,
      message: "Admin account created successfully",
      data: admin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "An error occurred during registration",
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const adminUser = await AdminUser.findOne({ email }).lean();
    if (!adminUser) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, adminUser.password);
    if (!validPassword) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    // Create and sign a token
    const token = jwt.sign({ _id: adminUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Remove the password property from the response
    delete adminUser.password;

    return res.status(200).json({
      status: true,
      message: "Admin logged in successfully",
      data: adminUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "An error occurred during login",
    });
  }
};
