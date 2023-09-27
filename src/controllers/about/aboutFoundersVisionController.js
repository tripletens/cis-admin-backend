const AboutFoundersVisionSection = require("../../models/aboutfoundersvision");

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
    const activeDocument = await AboutFoundersVisionSection.findOne({
      active: true,
    }).lean();

    if (!activeDocument) {
      result.status = false;
      result.data = error.message;
      res.status(500).json(result);
    }

    result.status = true;
    result.message = "About Founder's vision section fetched successfully";
    result.data = activeDocument;

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};

// add new About Founder's vision section
exports.update = async (req, res) => {
  try {
    const { title, subtitle, image_one, image_two, image_three, body } = req.body;

    let update_data;

    // Deactivate all other documents
    await AboutFoundersVisionSection.updateMany(
      {},
      { $set: { active: false } }
    );

    // Find the active document based on a specific condition
    const activeDocument = await AboutFoundersVisionSection.findOne({
      active: true,
    }).lean();

    if (activeDocument) {
      // Update the record if an ID is provided
      update_data = await AboutFoundersVisionSection.updateOne(
        { _id: activeDocument._id },
        { $set: { title, subtitle,image_one, image_two, image_three, body } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await AboutFoundersVisionSection.collection.insertOne({
        title,
        subtitle,
        image_one, image_two, image_three,
        body,
        active: true,
      });
    }

    result.status = true;
    result.message = "About Founder's vision section updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};
