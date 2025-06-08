const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yeild_cardSchema = new Schema({
    buyer_card_ID :{
        type : String,
        required:true
    },
    image:String,
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
    buying_quantity :{
        type : Number,
        required:true
    }
})


const yeild_card = mongoose.model("yeild_card",yeild_cardSchema);
module.exports=yeild_card;