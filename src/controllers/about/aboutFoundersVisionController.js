const AboutFoundersVisionSection = require("../../models/aboutfoundersvision");

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
    const { title, sub_title, body } = req.body;

    let update_data; 
    
    // Deactivate all other documents
    await AboutFoundersVisionSection.updateMany({}, { $set: { active: false } });

    // Find the active document based on a specific condition
    const activeDocument = await AboutFoundersVisionSection.findOne({ active: true });

    if (activeDocument) {
      // Update the record if an ID is provided
      update_data = await AboutFoundersVisionSection.updateOne(
        { _id: activeDocument._id },
        { $set: { title, sub_title, body } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await AboutFoundersVisionSection.collection.insertOne({ title, sub_title, body, active: true });
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
