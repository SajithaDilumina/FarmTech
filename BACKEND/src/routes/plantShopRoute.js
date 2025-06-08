const express = require("express");
const router = express.Router();
const PlantShop = require("../models/plantShop");
const { authenticationToken } = require("../utils/authMiddleware");

// Apply authentication middleware to the routes
router.use(authenticationToken);

// Get all plant shops
router.get("/", async (req, res) => {
    try {
        const plantShops = await PlantShop.find();
        res.json(plantShops);
    } catch (err) {
        console.log("Error fetching plant shops:", err);
        res.status(500).json({ message: "Error fetching plant shops" });
    }
});

// Get plant shops by plant name
router.get("/plant/:plantName", async (req, res) => {
    const plantName = req.params.plantName;
    try {
        const plantShops = await PlantShop.find({ plants: plantName });
        res.json(plantShops);
    } catch (err) {
        console.log("Error fetching plant shops by plant:", err);
        res.status(500).json({ message: "Error fetching plant shops by plant" });
    }
});

// Add a new plant shop
router.post("/add", async (req, res) => {
    const { name, address, plants, contactNumber, email, image } = req.body;
    const plantShop = new PlantShop({
        name,
        address,
        plants,
        contactNumber,
        email,
        image // URL to image
    });

    try {
        const newPlantShop = await plantShop.save();
        res.status(201).json(newPlantShop);
    } catch (err) {
        console.log("Error adding plant shop:", err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
