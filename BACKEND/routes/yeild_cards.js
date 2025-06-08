const router = require("express").Router();
const Yeild = require("../models/yeild_card"); // Consistent spelling with the model
const Yeild_farmer = require("../models/yeild_card_farmer"); // Consistent spelling with the model

// Buyer part
// Add a new yield card
router.route("/add").post((req, res) => {
    const { buyer_card_ID, image, b_title, b_description, buyer_id, buyer_name, buying_rate, buying_quantity } = req.body;

    const newYeildCard = new Yeild({
        buyer_card_ID,
        image,
        b_title,
        b_description,
        buyer_id,
        buyer_name,
        buying_rate,
        buying_quantity
    });

    newYeildCard.save()
        .then(() => res.json("Yield Card Added...!!"))
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error adding yield card", error: err.message });
        });
});

// View all yield cards
router.route("/").get((req, res) => {
    Yeild.find()
        .then((yeilds) => res.json(yeilds))
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error fetching yield cards", error: err.message });
        });
});

// Update a yield card
router.route("/update/:id").put(async (req, res) => {
    let yeildId = req.params.id;
    const { image, b_title, b_description, buyer_id, buyer_name, buying_rate, buying_quantity } = req.body;

    const updateYeildCard = {
        image,
        b_title,
        b_description,
        buyer_id,
        buyer_name,
        buying_rate,
        buying_quantity
    };

    try {
        const updatedYeild = await Yeild.findByIdAndUpdate(yeildId, updateYeildCard, { new: true });
        res.status(200).send({ status: "Yield card updated", updatedYeild });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

// Delete a yield card
router.route("/delete/:id").delete(async (req, res) => {
    let yeildId = req.params.id;

    try {
        await Yeild.findByIdAndDelete(yeildId);
        res.status(200).send({ status: "Yield card deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting yield card", error: err.message });
    }
});

// Get one yield card by ID
router.route("/get/:id").get(async (req, res) => {
    let yeildId = req.params.id;

    try {
        const yeild = await Yeild.findById(yeildId);
        if (!yeild) {
            res.status(404).send({ status: "Yield card not found" });
        } else {
            res.status(200).send({ status: "Yield card fetched", yeild });
        }
    } catch (err) {
        res.status(500).send({ status: "Error with getting yield card", error: err.message });
    }
});



// buyer buying details of farmer
 // View all 
// router.route("/crop_selling/").get((req, res) => {
//     Yeild_farmer.find()
//         .then((yeilds) => res.json(yeilds))
//         .catch((err) => {
//             console.log(err);
//             res.status(500).send({ status: "Error fetching crop details", error: err.message });
//         });
// });
router.route("/crop_selling").get(async (req, res) => {
    const buyerId = req.query.buyer_id;

    try {
        let query = {};
        if (buyerId) {
            query = { buyer_id: buyerId };
        }

        const yeilds = await Yeild_farmer.find(query);
        res.status(200).send(yeilds);
    } catch (err) {
        res.status(500).send({ status: "Error with getting yield cards", error: err.message });
    }
});

router.route("/crop_selling/get/:id").get(async (req, res) => {
    let yeildId = req.params.id;

    try {
        const yeild = await Yeild_farmer.findById(yeildId);
        if (!yeild) {
            res.status(404).send({ status: "Yield card not found" });
        } else {
            res.status(200).send({ status: "Yield card fetched", yeild });
        }
    } catch (err) {
        res.status(500).send({ status: "Error with getting yield card", error: err.message });
    }
});



// Get all selling details for one buyer
router.route("/crop_selling/get/:id").get(async (req, res) => {
    let yeildId = req.params.id;

    try {
        const yeild = await Yeild_farmer.findById(yeildId);
        if (!yeild) {
            res.status(404).send({ status: "not found" });
        } else {
            res.status(200).send({ status: "Yield card fetched", yeild });
        }
    } catch (err) {
        res.status(500).send({ status: "Error with getting yield card", error: err.message });
    }
});




// Farmer route
router.route("/farmer/update/:id").put(async (req, res) => {
    const yieldId = req.params.id;
    const { selling_quantity } = req.body; // Adjusted to selling_quantity

    try {
        const yieldCard = await Yeild.findById(yieldId);

        if (!yieldCard) {
            return res.status(404).send({ status: "Yield card not found" });
        }

        // Ensure selling_quantity is valid
        if (isNaN(selling_quantity) || selling_quantity < 0) {
            return res.status(400).send({ status: "Invalid selling quantity" });
        }

        // Calculate the new buying quantity
        const newBuyingQuantity = yieldCard.buying_quantity - selling_quantity;

        // Validate that the new quantity is not negative
        if (newBuyingQuantity < 0) {
            return res.status(400).send({ status: "Buying quantity cannot be negative" });
        }

        // Update the buying quantity in the database
        yieldCard.buying_quantity = newBuyingQuantity;

        // Save the updated yield card
        const updatedYieldCard = await yieldCard.save();

        res.status(200).send({ status: "Yield card quantity updated", yield: updatedYieldCard });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating quantity", error: err.message });
    }
});


// add card with farmer details
router.route("/farmer/add").post((req, res) => {
    const { buyer_card_ID, b_title, b_description, buyer_id, buyer_name, buying_rate, selling_quantity,farmer_id,farmer_name } = req.body;

    const newYeildCardFarmer = new Yeild_farmer({
        buyer_card_ID,
        b_title,
        b_description,
        buyer_id,
        buyer_name,
        buying_rate,
        selling_quantity,
        farmer_id,
        farmer_name,
    });

    newYeildCardFarmer.save()
        .then(() => res.json("Yield Added with farmer...!!"))
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error adding yield card with farmer", error: err.message });
        });
});
module.exports = router;
