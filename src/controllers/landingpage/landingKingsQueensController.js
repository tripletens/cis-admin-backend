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
    const { id, heading, sub_title, chess_icon_subtitle_one, chess_icon_subtitle_two, button_text } = req.body;

    let update_data; 

    if (id) {
      // Update the record if an ID is provided
      update_data = await LandingKingsQueensSection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { heading, sub_title, chess_icon_subtitle_one, chess_icon_subtitle_two, button_text } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await LandingKingsQueensSection.collection.insertOne({ heading, sub_title, chess_icon_subtitle_one, chess_icon_subtitle_two, button_text });
    }

    result.message = "Landing Kings and Queens section updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
