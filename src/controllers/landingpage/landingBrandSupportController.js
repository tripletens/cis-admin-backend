const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LandingBrandSupport = require("../../models/landingbrandsupport");

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
    const activeDocument = await LandingBrandSupport.find({
      active: true,
    }).lean();

    if (!activeDocument) {
      result.status = false;
      result.data = error.message;
      res.status(500).json(result);
    }

    result.status = true;
    result.message = "Landing Brand Support section fetched successfully";
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
    const { title } = req.body;

    let update_data;

    // Deactivate all other documents
    await LandingBrandSupport.updateMany({}, { $set: { active: false } });

    // Find the active document based on a specific condition
    const activeDocument = await LandingBrandSupport.findOne({
      active: true,
    }).lean();

    if (activeDocument) {
      // Update the record if an ID is provided
      update_data = await LandingBrandSupport.updateOne(
        { _id: activeDocument._id },
        { $set: { title_one } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await LandingBrandSupport.collection.insertOne({
        title,
        active: true,
      });
    }

    result.status = true;
    result.message = "Landing Brand Support section updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};
