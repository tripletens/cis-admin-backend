const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');

const LandingOurApproachSection = require("../../models/landingourapproach");

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
    const { id, title, sub_title } = req.body;

    let update_data; 

    if (id) {
      // Update the record if an ID is provided
      update_data = await LandingOurApproachSection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, sub_title } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await LandingOurApproachSection.collection.insertOne({ title, sub_title });
    }

    result.status = true;
    result.message = "Landing Our Approach section updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};
