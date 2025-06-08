const express = require("express");
const router = express.Router();
const History = require("../models/plantHistory");
const { authenticationToken } = require("../utils/authMiddleware");

// Apply authentication middleware to the routes
router.use(authenticationToken);

router.get("/", async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from authenticated user
    const plantHistory = await History.find({ userId }) // Fetch histories for the authenticated user
      .populate("userId", "name email");
    res.json(plantHistory);
  } catch (err) {
    console.log("Error fetching history:", err);
    res.status(500).json({ message: "Error fetching history" });
  }
});

// Add a new history record
router.post("/add", async (req, res) => {
  const history = new History({
    userId: req.user.id,
    plantName: req.body.plantName,
    width: req.body.width,
    length: req.body.length,
    area: req.body.area,
    plantCount: req.body.plantCount,
  });

  try {
    const newHistory = await history.save();
    res.status(201).json(newHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
