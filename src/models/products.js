const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const productSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required: [true, "Please enter a product name"]
        },
        quantity : {
            type: Number,
            required: true,
            default: 0
        },
        price: {
           type: Number,
           required: true 
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

const Product = mongoose.model("Product", productSchema);

adminUserSchema.plugin(uniqueValidator); // Add unique validation plugin to schema


module.exports = Product;