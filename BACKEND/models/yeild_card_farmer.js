const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yeild_card_farmerSchema = new Schema({
    buyer_card_ID :{
        type : String,
        required:true
    },
    b_title:{
        type : String,
        required:true
    },
    b_description :{
        type : String,
        required:true
    },
    buyer_id :{
        type : String,
        required:true
    },
    buyer_name:{
        type : String,
        required:true
    },
    buying_rate:{
        type : Number,
        required:true
    },
    selling_quantity :{
        type : Number,
        required:true
    },
    farmer_id :{
        type : String,
        required:true
    },
    farmer_name:{
        type : String,
        required:true
    },

})


const yeild_card_farmer = mongoose.model("yeild_card_farmer",yeild_card_farmerSchema);
module.exports=yeild_card_farmer;