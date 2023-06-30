const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const DepartmentSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required: [true, "Please enter a Department author name"]
        },

        description : {
            type : String,
            required: false
        },

        status: {
           type: Boolean,
           required: false,
           default: true
        },
    
    },
    {
        timestamps: true
    }
);

const Department = mongoose.model("Department", DepartmentSchema);

DepartmentSchema.plugin(uniqueValidator); // Add unique validation plugin to schema


module.exports = Department;