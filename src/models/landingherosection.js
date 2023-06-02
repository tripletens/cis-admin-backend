const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const landingHeroSectionSchema = mongoose.Schema(
    {
        banner_one : {
            type : String,
            required: false
        },
        sub_banner_one : {
            type : String,
            required: false 
        },

        banner_two : {
            type : String,
            required: false
        },

        sub_banner_two: {
            type : String,
            required: false
        },
        banner_three: {
            type : String,
            required: false
        },

        sub_banner_three: {
            type : String,
            required: false
        },
    },
    {
        timestamps: true
    }
);

const LandingHeroSection = mongoose.model("LandingHeroSection", landingHeroSectionSchema);

landingHeroSectionSchema.plugin(uniqueValidator); // Add unique validation plugin to schema


module.exports = LandingHeroSection;