const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Settings = require("../models/settings");
const { ObjectId } = require('mongodb');
require("dotenv").config();

// result 

let result = {
    status : null,
    message : null,
    data : null,
    token : null
  };

// add new settings 
exports.update = async (req, res) => {
  try {
    const { id, home_video_url } = req.body;

    let update_data; 

     // Deactivate all other documents
     await Settings.updateMany({}, { $set: { active: false } });

     // Find the active document based on a specific condition
     const activeDocument = await Settings.findOne({ active: true });

    if (activeDocument) {
      // Update the record if an ID is provided
      update_data = await Settings.updateOne(
        { _id: activeDocument._id},
        { $set: { home_video_url } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await Settings.collection.insertOne({ home_video_url, active:true });
    }

    result.message = "Settings updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
