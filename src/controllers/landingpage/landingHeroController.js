const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const LandingHeroSection = require("../../models/landingherosection");

require("dotenv").config();

// result

let result = {
  status: null,
  message: null,
  data: null,
  token: null,
};

exports.fetch_all = async (req, res) => {
  const result = {}; // Initialize the result object

  try {
    // Find the active document based on a specific condition
    const activeDocument = await LandingHeroSection.findOne({
      active: true,
    }).lean();

    if (!activeDocument) {
      result.status = false;
      result.data = error.message;
      res.status(500).json(result);
    }

    result.status = true;
    result.message = "Landing Hero section fetched successfully";
    result.data = activeDocument; // Assign the object directly to result.data

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
      banner_one,
      sub_banner_one,
      image_one,
      banner_two,
      sub_banner_two,
      image_two,
      banner_three,
      sub_banner_three,
      image_three
    } = req.body;

    let update_data;

    // Deactivate all other documents
    await LandingHeroSection.updateMany({}, { $set: { active: false } });

    // Find the active document based on a specific condition
    const activeDocument = await LandingHeroSection.findOne({
      active: true,
    }).lean();

    if (activeDocument) {
      // Update the active document
      update_data = await LandingHeroSection.updateOne(
        { _id: activeDocument._id },
        {
          $set: {
            banner_one,
            sub_banner_one,
            image_one,
            banner_two,
            sub_banner_two,
            image_two,
            banner_three,
            sub_banner_three,
            image_three
          },
        }
      );
    } else {
      // If no active document found, insert a new record
      update_data = await LandingHeroSection.collection.insertOne({
        banner_one,
        sub_banner_one,
        image_one,
        banner_two,
        sub_banner_two,
        image_two,
        banner_three,
        sub_banner_three,
        image_three,
        active: true,
      });
    }

    const result = {
      message: "Landing Hero section updated successfully",
      data: update_data,
    };

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};
