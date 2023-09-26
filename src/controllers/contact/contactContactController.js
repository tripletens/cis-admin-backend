const ContactUsContactSection = require("../../models/contactuscontact");

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
    const activeDocument = await ContactUsContactSection.findOne({
      active: true,
    }).lean();

    if (!activeDocument) {
      result.status = false;
      result.data = error.message;
      res.status(500).json(result);
    }

    result.status = true;
    result.message = "Contact us contact section fetched successfully";
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
      telephone,
      whatsapp,
      email_one,
      email_two,
      email_three,
      email_four,
      address,
    } = req.body;

    let update_data;

    // Deactivate all other documents
    await ContactUsContactSection.updateMany({}, { $set: { active: false } });

    // Find the active document based on a specific condition
    const activeDocument = await ContactUsContactSection.findOne({
      active: true,
    }).lean();

    if (activeDocument) {
      // Update the record if an ID is provided
      update_data = await ContactUsContactSection.updateOne(
        { _id: activeDocument._id },
        {
          $set: {
            telephone,
            whatsapp,
            email_one,
            email_two,
            email_three,
            email_four,
            address,
          },
        }
      );
    } else {
      // Insert a new record if no ID is provided
      update_data = await ContactUsContactSection.collection.insertOne({
        telephone,
        whatsapp,
        email_one,
        email_two,
        email_three,
        email_four,
        address,
        active: true,
      });
    }

    result.status = true;
    result.message = "Contact us contact section updated successfully";
    result.data = update_data;

    res.status(201).json(result);
  } catch (error) {
    result.status = false;
    result.data = error.message;
    res.status(500).json(result);
  }
};
