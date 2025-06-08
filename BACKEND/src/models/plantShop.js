const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantShopSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true // Assuming plant shop names are unique
    },
    address: {
        type: String,
        required: true
    },
    plants: [{
        type: String, // Store plant names
        required: true
    }],
    contactNumber: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String, // URL to the image
        required: false
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const PlantShop = mongoose.model("PlantShop", plantShopSchema);
module.exports = PlantShop;
