const AboutOurImpactSection = require("../../models/aboutourimpact");


require("dotenv").config();

// result 

let result = {
    status : null,
    message : null,
    data : null,
    token : null
  };


  exports.fetch_all = async (req, res) => {
    try {
      // Find the active document based on a specific condition
      const activeDocument = await AboutOurImpactSection.find({
        active: true,
      }).lean();
  
      if (!activeDocument) {
        result.status = false;
        result.data = error.message;
        res.status(500).json(result);
      }
  
      result.status = true;
      result.message = "About Our Impact section fetched successfully";
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
    const { title, sub_title, body } = req.body;

    let update_data; 
    
    // Deactivate all other documents
    await AboutOurImpactSection.updateMany({}, { $set: { active: false } });

    // Find the active document based on a specific condition
    const activeDocument = await AboutOurImpactSection.findOne({ active: true }).lean();

    if (activeDocument) {
      // Update the record if an ID is provided
      update_data = await AboutOurImpactSection.updateOne(
        { _id: activeDocument._id },
        { $set: { title, sub_title, body } }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await AboutOurImpactSection.collection.insertOne({ title, sub_title, body, active: true });
    }

    result.status = true;
    result.message = "About Our Impact section updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};
