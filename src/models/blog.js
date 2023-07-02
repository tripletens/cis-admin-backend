const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const BlogSchema = mongoose.Schema(
    {
        author : {
            type : String,
            required: [true, "Please enter a blog author name"]
        }, 
        title : {
            type : String,
            required: [true, "Please enter a blog title"]
        },

        department_id : {
            type : Number,
            required: [true, "Please enter a blog department"]
        },

        views : {
            type: Number,
            required: true,
            default: 0
        },

        is_published: {
           type: Boolean,
           required: true ,
           default: false
        },

        status: {
            type: Boolean,
            required: true ,
            default: true
         },

        image : {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model("Blog", BlogSchema);

BlogSchema.plugin(uniqueValidator); // Add unique validation plugin to schema


module.exports = Blog;