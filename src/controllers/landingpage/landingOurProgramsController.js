const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');

const LandingOurPrograms = require("../../models/landingourprograms");

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
    const { id, title_one, subtitle_one, title_two,  subtitle_two,  title_three,  subtitle_three, title_four, subtitle_four, title_five, subtitle_five } = req.body;

    let update_data; 

    if (id) {
      // Update the record if an ID is provided
      update_data = await LandingOurPrograms.updateOne(
        { _id: new ObjectId(id) },
        { $set: { title_one, subtitle_one, title_two,  subtitle_two,  title_three,  subtitle_three, title_four, subtitle_four, title_five, subtitle_five } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await LandingOurPrograms.collection.insertOne({ title_one, subtitle_one, title_two,  subtitle_two,  title_three,  subtitle_three, title_four, subtitle_four, title_five, subtitle_five });
    }

    result.status = true;
    result.message = "Landing Our Programs section updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};
