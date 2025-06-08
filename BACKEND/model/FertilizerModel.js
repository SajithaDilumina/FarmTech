const mongoose = require("mongoose");

const fertilizerSchema = new mongoose.Schema({
  fer_name: { type: String, required: true },
  fer_price: { type: Number, required: true },
  fer_image: { type: String },
  fer_plants: { type: [String], required: true },
  fer_weight: { type: Number, required: true },
});

const FertilizerModel = mongoose.model("Fertilizer", fertilizerSchema);
module.exports = FertilizerModel;
