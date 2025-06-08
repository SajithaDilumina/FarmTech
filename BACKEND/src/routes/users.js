const express = require("express");
const cors = require("cors");
const userController= require("../controllers/user");
const authMiddleWare= require("../utils/authMiddleware");

const router= express.Router();

router.use(cors());
router.get("/users", authMiddleWare.authenticationToken, userController.getUsers);

module.exports= router;
