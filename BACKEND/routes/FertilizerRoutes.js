const express = require("express");
const {createFertilizer, deleteFertilizer,updateFertilizer,getFertilizerById,getAllFertilizers}= require("../controllers/fertilizersController.js");
const Fertilizer= require("../model/FertilizerModel.js")
const multer = require("multer");
const path = require("path");

const route = express.Router();
// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname( file.originalname));
  }
});

const upload = multer({ storage:storage });

// CREATE a new fertilizer with image upload

route.post('/createFertilizer', upload.single('fer_image'), createFertilizer);

// READ all fertilizers
route.get('/fertilizers', getAllFertilizers);

// READ a single fertilizer by ID
route.get('/fertilizer/:id', getFertilizerById);

// UPDATE a fertilizer
route.put('/update/fertilizer/:id', upload.single('fer_image'), updateFertilizer);

// DELETE a fertilizer
route.delete('/delete/fertilizer/:id', deleteFertilizer);

route.get('/search', async (req, res) => {
  const searchTerm = req.query.searchTerm;

  try {
      const results = await Fertilizer.find({
          $or: [
              { name: { $regex: searchTerm, $options: 'i' } },
              { vehicle: { $regex: searchTerm, $options: 'i' } } 
          ]
      });

      res.json(results);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = route;
