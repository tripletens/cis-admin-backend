const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');
const LandingHeroSection = require("../../models/landingHeroSection");

require("dotenv").config();

// result 

let result = {
    status : null,
    message : null,
    data : null,
    token : null
  };

// add new landing hero section  
exports.update = async (req, res) => {
  try {
    const { id, banner_one, sub_banner_one, banner_two, sub_banner_two, banner_three, sub_banner_three  } = req.body;

    let update_data; 

    if (id) {
      // Update the record if an ID is provided
      update_data = await LandingHeroSection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { banner_one, sub_banner_one, banner_two, sub_banner_two, banner_three, sub_banner_three } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await LandingHeroSection.collection.insertOne({ banner_one, sub_banner_one, banner_two, sub_banner_two, banner_three, sub_banner_three });
    }

    result.message = "Landing Hero section updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
