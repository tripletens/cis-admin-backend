const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const LandingKingsQueensSectionSchema = mongoose.Schema(
    {
        heading : {
            type : String,
            required: false
        },
        sub_title : {
            type : String,
            required: false 
        },

        chess_icon_subtitle_one : {
            type : String,
            required: false
        },

        chess_icon_subtitle_two: {
            type : String,
            required: false
        },
        button_text: {
            type : String,
            required: false
        },
    },
    {
        timestamps: true
    }
);

const LandingKingsQueensSection = mongoose.model("LandingKingsQueensSection", LandingKingsQueensSectionSchema);

LandingKingsQueensSectionSchema.plugin(uniqueValidator); // Add unique validation plugin to schema


module.exports = LandingKingsQueensSection;