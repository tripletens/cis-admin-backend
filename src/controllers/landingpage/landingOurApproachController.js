const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const LandingOurApproachSection = require("../../models/landingourapproach");

require("dotenv").config();

// result

let result = {
  status: null,
  message: null,
  data: null,
  token: null,
};

exports.fetch_all = async (req, res) => {
  try {
    // Find the active document based on a specific condition
    const activeDocument = await LandingOurApproachSection.findOne({
      active: true,
    }).lean();

    if (!activeDocument) {
      result.status = false;
      result.data = error.message;
      res.status(500).json(result);
    }

    result.status = true;
    result.message = "Landing Our Approach section fetched successfully";
    result.data = activeDocument;

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};

// add new landing hero section
exports.update = async (req, res) => {
  try {
    const { title, sub_title, image_one, image_two, image_three} = req.body;

    let update_data;

    // Deactivate all other documents
    await LandingOurApproachSection.updateMany({}, { $set: { active: false } });

    // Find the active document based on a specific condition
    const activeDocument = await LandingOurApproachSection.findOne({
      active: true,
    }).lean();

    if (activeDocument) {
      // Update the record if an ID is provided
      update_data = await LandingOurApproachSection.updateOne(
        { _id: activeDocument._id },
        { $set: { title, sub_title, image_one, image_two, image_three } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await LandingOurApproachSection.collection.insertOne({
        title,
        sub_title,
        image_one, 
        image_two, 
        image_three,
        active: true,
      });
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
