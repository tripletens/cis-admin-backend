require("dotenv").config();

const LandingMetrics = require("../../models/landingmetrics");

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
    const activeDocument = await LandingMetrics.find({
      active: true,
    }).lean();

    if (!activeDocument) {
      result.status = false;
      result.data = error.message;
      res.status(500).json(result);
    }

    result.status = true;
    result.message = "Landing Metrics section fetched successfully";
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
      metrics_one,
      subtitle_one,
      metrics_two,
      subtitle_two,
      metrics_three,
      subtitle_three,
      metrics_four,
      subtitle_four,
      metrics_five,
      subtitle_five,
      metrics_six,
      subtitle_six,
    } = req.body;

    let update_data;

    // Deactivate all other documents
    await LandingMetrics.updateMany({}, { $set: { active: false } });

    // Find the active document based on a specific condition
    const activeDocument = await LandingMetrics.findOne({
      active: true,
    }).lean();

    if (activeDocument) {
      // Update the record if an ID is provided
      update_data = await LandingMetrics.updateOne(
        { _id: activeDocument._id },
        {
          $set: {
            metrics_one,
            subtitle_one,
            metrics_two,
            subtitle_two,
            metrics_three,
            subtitle_three,
            metrics_four,
            subtitle_four,
            metrics_five,
            subtitle_five,
            metrics_six,
            subtitle_six,
          },
        }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await LandingMetrics.collection.insertOne({
        metrics_one,
        subtitle_one,
        metrics_two,
        subtitle_two,
        metrics_three,
        subtitle_three,
        metrics_four,
        subtitle_four,
        metrics_five,
        subtitle_five,
        metrics_six,
        subtitle_six,
        active: true,
      });
    }

    result.status = true;
    result.message = "Landing Metrics section updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};
