const mongoose= require('mongoose');
const Schema =mongoose.Schema;
const plantSchema = new mongoose.Schema({
    plantName:{
        type: String,
        required: true
    },
    requiredDimension :{
        type: String,
        required: true
    },
    fertilizers:{
        type: [String],
        required:true
    }

})

const Plant= mongoose.model("plant",plantSchema);
module.exports=Plant;