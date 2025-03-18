const router = require('express').Router()
const Category = require('../models/category')

// create category
router.post("/", async (req, res) => {
    try {
        const newCat = new Category(req.body);
        const saveCat = await newCat.save();
        return res.status(200).json(saveCat);  // Use return to prevent further execution
    } catch (err) {
        return res.status(500).json(err);
    }
});


// get all category
router.get("/", async (req, res) => {
    try {
        const cat = await Category.find();
        return res.status(200).json(cat);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;