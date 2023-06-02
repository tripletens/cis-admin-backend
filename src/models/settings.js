const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const settingsSchema = mongoose.Schema(
    {
        home_video_url : {
            type : String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Settings = mongoose.model("Settings", settingsSchema);

settingsSchema.plugin(uniqueValidator); // Add unique validation plugin to schema


module.exports = Settings;