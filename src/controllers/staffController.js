const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StaffUser = require("../models/staff");
require("dotenv").config();

// result 

let result = {
    status : null,
    message : null,
    data : null,
    token : null
  };

// add new staff

exports.add = async (req, res) => {
  try {
    const { firstname, lastname, image, email, role } = req.body;

    // Check if the staff already exists
    const staffUser = await StaffUser.findOne({ email });
    if (staffUser) {
      result.message = "Staff with email already exists";
      result.status = false;
      return res.status(400).json(result);
    }
    
    // Create new user
    const newStaff = new staffUser({
      firstname,
      lastname,
      role,
      image,
    });

    // Save the admin to the database
    const savedStaff = await newStaff.save();

    // Remove the password property from the response
    // const { password: pw, ...admin } = savedStaff.toObject();

    result.message = "Staff Account created successfully";
    result.data = savedStaff;

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
