const ContactUsSocialMediaSection = require("../../models/contactussocialmedia");

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
    const activeDocument = await ContactUsSocialMediaSection.find({
      active: true,
    }).lean();

    if (!activeDocument) {
      result.status = false;
      result.data = error.message;
      res.status(500).json(result);
    }

    result.status = true;
    result.message = "Contact us social media section fetched successfully";
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
    const { instagram, youtube, tiktok, linkedin, facebook, twitter } =
      req.body;

    let update_data;

    // Deactivate all other documents
    await ContactUsSocialMediaSection.updateMany(
      {},
      { $set: { active: false } }
    );

    // Find the active document based on a specific condition
    const activeDocument = await ContactUsSocialMediaSection.findOne({
      active: true,
    }).lean();

    if (activeDocument) {
      // Update the record if an ID is provided
      update_data = await ContactUsSocialMediaSection.updateOne(
        { _id: activeDocument._id },
        { $set: { instagram, youtube, tiktok, linkedin, facebook, twitter } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await ContactUsSocialMediaSection.collection.insertOne({
        instagram,
        youtube,
        tiktok,
        linkedin,
        facebook,
        twitter,
        active: true,
      });
    }

    result.status = true;
    result.message = "Contact us social media section updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};
