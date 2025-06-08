const Fertilizer= require("../model/FertilizerModel")
// Create a new fertilizer
 const createFertilizer = async (req, res) => {
    const { fer_name, fer_price, fer_plants, fer_weight } = req.body;
    let fer_image = null;
    if(req.file){
      fer_image = req.file.filename; // Assuming image file upload handling
    }
    // Ensure the file is received
  console.log(req.file); // should show the uploaded file info
  
    try {
      const fertilizerNameExist = await Fertilizer.findOne({fer_name});
      if(fertilizerNameExist) return res.status(400).json({ message: 'Fertilizer name already exists' });

      const newFertilizer = new Fertilizer({
        fer_name,
        fer_weight,
        fer_price,
        fer_plants: fer_plants.split(',').map(plant => plant.trim()), // Convert plants to an array
        fer_image
      });

      await newFertilizer.save();
      res.status(200).json({ message: 'Fertilizer created successfully', fertilizer: newFertilizer });
    } catch (error) {
      res.status(500).json({ message: 'Error creating fertilizer', error });
    }
  };

   const getAllFertilizers = async(req, res) => {
    try {
      const fertilizerData = await Fertilizer.find();
      if(!fertilizerData || fertilizerData === 0){
        return res.status(404).json({ message: 'No fertilizers found' });
      }
      res.status(200).json(fertilizerData);
    } catch (error) {
      res.status(500).json({ message: 'Error getting fertilizers', error });
    }
  };

   const getFertilizerById = async (req, res) => {
  try {
    const id = req.params.id;
    const fertilizerExist = await Fertilizer.findById(id);
    if (!fertilizerExist) return res.status(404).json({ message: 'Fertilizer not found' });
    res.status(200).json(fertilizerExist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 const updateFertilizer = async (req, res) => {
  try {
    const id = req.params.id;
    const fertilizerExist = await Fertilizer.findById(id);
    if (!fertilizerExist) {
      return res.status(404).json({ message: 'Fertilizer not found' });
  }
  // Update the fields with the new data
    fertilizerExist.fer_name = req.body.fer_name;
    fertilizerExist.fer_price = req.body.fer_price;
    fertilizerExist.fer_weight = req.body.fer_weight;
    fertilizerExist.fer_plants = req.body.fer_plants.split(',').map(plant => plant.trim());

    // Check if a new image was uploaded
    if (req.file) {
      fertilizerExist.fer_image = req.file.filename; // Update with new image filename
    }
    const updatedFertilizer = await fertilizerExist.save();
    // Fertilizer.findByIdAndUpdate(id, req.body,{
    //   new:true
    // });
    res.status(200).json(updatedFertilizer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 const deleteFertilizer = async (req, res) => {
  try {
    const id = req.params.id;
    const fertilizerExist = await Fertilizer.findById(id);
    if (!fertilizerExist) {
      return res.status(404).json({ message: 'Fertilizer not found' });
  }
    await Fertilizer.findByIdAndDelete(id);
    res.status(200).json({ message: 'Fertilizer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports={
  createFertilizer, getAllFertilizers, getFertilizerById, updateFertilizer, deleteFertilizer
}