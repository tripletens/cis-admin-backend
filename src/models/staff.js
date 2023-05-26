const mongoose = require('mongoose');

const staffSchema = mongoose.Schema(
    {
        firstname : {
            type : String,
            required: [true, "Please enter a staff first name"]
        },
        lastname : {
            type: Number,
            required: [true, "Please enter a staff last name"]
        },
        email: {
           type: String,
           required: [true, "Staff email is required"] 
        },
        image : {
            type: String,
            required: false
        },
        role : {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;