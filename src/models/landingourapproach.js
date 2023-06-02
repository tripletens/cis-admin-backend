const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const LandingOurApproachSectionSchema = mongoose.Schema(
    {
        title : {
            type : String,
            required: false
        },
        sub_title : {
            type : String,
            required: false 
        },
    },
    {
        timestamps: true
    }
);

const LandingOurApproachSection = mongoose.model("LandingOurApproachSection", LandingOurApproachSectionSchema);

LandingOurApproachSectionSchema.plugin(uniqueValidator); // Add unique validation plugin to schema


module.exports = LandingOurApproachSection;