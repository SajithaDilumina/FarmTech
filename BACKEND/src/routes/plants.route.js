const router = require("express").Router();
const Plant= require("../models/plant")


router.route("/").get((req,res)=>{
    Plant.find().then((plant)=>{
        res.json(plant)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/add").post((req,res)=>{
    const plantName = req.body.plantName;
    const requiredDimension = req.body.requiredDimension;
    const fertilizers=req.body.fertilizers
    
    
    const newPlant= new Plant({
        plantName,
        requiredDimension,
        fertilizers
    })

    newPlant.save().then(()=>{
        res.json("Plant added")
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;