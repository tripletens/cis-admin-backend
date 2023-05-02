const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/admins");

// Register new user

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Check if the user already exists
    const adminUser = await AdminUser.findOne({ email });
    if (adminUser) {
      return res.status(400).json({ error: "Admin already exists" });
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
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create and sign a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
