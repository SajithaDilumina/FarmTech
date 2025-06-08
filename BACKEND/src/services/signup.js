const User= require("../models/user");
const bcrypt = require ("bcrypt");

async function createUser(userData) {
    const {name,email,password,phoneNumber,address}= userData;
    const hashedPassword= await bcrypt.hash(password,10);
    const createUser = new User({
        name,
        email,
        password :hashedPassword,
        phoneNumber,
        address,
        role: "customer",
    });

    const savedUser = await createUser.save();
    return savedUser
}
module.exports= {createUser}