const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const LandingOurPrograms = require("../../models/landingourprograms");

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
    const activeDocument = await LandingOurPrograms.find({
      active: true,
    }).lean();

    if (!activeDocument) {
      result.status = false;
      result.data = error.message;
      res.status(500).json(result);
    }

    result.status = true;
    result.message = "Landing Our Programs section fetched successfully";
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
    const {
      title_one,
      subtitle_one,
      title_two,
      subtitle_two,
      title_three,
      subtitle_three,
      title_four,
      subtitle_four,
      title_five,
      subtitle_five,
    } = req.body;

    let update_data;

    // Deactivate all other documents
    await LandingOurPrograms.updateMany({}, { $set: { active: false } });

    // Find the active document based on a specific condition
    const activeDocument = await LandingOurPrograms.findOne({
      active: true,
    }).lean();

    if (activeDocument) {
      // Update the record if an ID is provided
      update_data = await LandingOurPrograms.updateOne(
        { _id: activeDocument._id },
        {
          $set: {
            title_one,
            subtitle_one,
            title_two,
            subtitle_two,
            title_three,
            subtitle_three,
            title_four,
            subtitle_four,
            title_five,
            subtitle_five,
          },
        }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await LandingOurPrograms.collection.insertOne({
        title_one,
        subtitle_one,
        title_two,
        subtitle_two,
        title_three,
        subtitle_three,
        title_four,
        subtitle_four,
        title_five,
        subtitle_five,
        active: true,
      });
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
