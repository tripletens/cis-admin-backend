const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');

const LandingKingsQueensSection = require("../../models/landingkingsqueens");

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
    const { heading, sub_title, chess_icon_subtitle_one, chess_icon_subtitle_two, button_text } = req.body;

    let update_data; 

    // Deactivate all other documents
    await LandingKingsQueensSection.updateMany({}, { $set: { active: false } });

    // Find the active document based on a specific condition
    const activeDocument = await LandingKingsQueensSection.findOne({ active: true }).lean();

    if (activeDocument) {
      // Update the record if an ID is provided
      update_data = await LandingKingsQueensSection.updateOne(
        { _id: activeDocument._id },
        { $set: { heading, sub_title, chess_icon_subtitle_one, chess_icon_subtitle_two, button_text } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await LandingKingsQueensSection.collection.insertOne({ heading, sub_title, chess_icon_subtitle_one, chess_icon_subtitle_two, button_text, active: true });
    }

    result.status = true;
    result.message = "Landing Kings and Queens section updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};
