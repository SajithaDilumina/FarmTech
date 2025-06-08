// models/PlantHistory.js
const mongoose = require('mongoose');

const PlantHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plantName: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  plantCount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const PlantHistory = mongoose.model('PlantHistory', PlantHistorySchema);
module.exports = PlantHistory;
