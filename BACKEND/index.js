const express=require("express");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const dotenv=require("dotenv");
const cors = require('cors');
const { json } = require ('express');
require("dotenv").config();
const plantRoutes = require("./src/routes/plants.route");
const plantHistoryRoute = require("./src/routes/plantHistory.route");
const signupRoute = require("./src/routes/signup");
const createAdminAccount= require("./src/scripts/admin")
const loginRouter= require("./src/routes/login")
const userRoute = require("./src/routes/users");
const plantShopRoute = require("./src/routes/plantShopRoute");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8070;

 const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI;
        if (!connectionString) {
            throw new Error("Please add the connection string.")
        }
        await mongoose.connect(connectionString);
        console.log("DB connection successful!!");
    } catch (error) {
        console.log("DB connection failed!!")
        console.log(error)
    
    }
}

createAdminAccount();

connectDB();
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// siluni
app.use("/plant", plantRoutes)
app.use("/planthistory", plantHistoryRoute)
app.use("/user", signupRoute)
app.use("/auth", loginRouter)
//app.use("/api", userRoute)
app.use("/plantShop", plantShopRoute)

// Use the routes sajitha
const toolsRoutes = require("./routes/tools");
app.use(toolsRoutes);

//vihara
const route= require("./routes/FertilizerRoutes.js")
app.use('/api', route);
app.use(json());
app.use('/uploads', express.static('uploads')); // to serve uploaded images

// daham

const yeildCardRouter = require("./routes/yeild_cards.js");
app.use("/yeildCard", yeildCardRouter);
