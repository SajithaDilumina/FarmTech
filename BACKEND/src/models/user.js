const mongoose= require('mongoose');
const Schema =mongoose.Schema;
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    phoneNumber:{
        type: Number

    },
    address:{
        type: String
    },
    role:{
        type:String,
        enum:["admin", "customer"], default: "customer"
    }

})
const User= mongoose.model("User",userSchema);
module.exports=User;