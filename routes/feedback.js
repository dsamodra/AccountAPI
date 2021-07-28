const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// RESPONSE FORMAT
const { success, error } = require("./response");

// GET FEEDBACK
router.get('/', async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.status(200)
            .json(feedback);
        console.log("Success : Retrive All Data Feedback");
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));S
        console.log("Failed : Retrive All Data Feedback");
    }
});

// INSERT FEEDBACK
router.post('/', async (req, res) => {
    const feedback = new Feedback({
        name: req.body.name,
        text: req.body.text
    });

    try {
        const saveFeedback = await feedback.save();
        res.status(200)
            .json(success("OK", res.statusCode));
        console.log('Success Add Feedback ' + req.body.name);
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
        console.log('Failed Add Feedback ' + req.body.name);
    }
});

module.exports = router;