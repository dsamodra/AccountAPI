const express = require('express');
const router = express.Router();
const urlModel = require('../models/DB_URL');

// RESPONSE FORMAT
const { success, error } = require("./response");

// GET FEEDBACK
router.get('/', async (req, res) => {
    try {
        const Url = await urlModel.find();
        res.status(200)
            .json(Url);
        console.log("Success : Retrive All Data Url");
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));S
        console.log("Failed : Retrive All Data Url");
    }
});

// INSERT URL
router.post('/', async (req, res) => {
    const Url = new urlModel({
        name: req.body.name,
        url: req.body.url
    });
    try {
        const saveURL = await Url.save();
        res.status(200)
            .json(success("OK", res.statusCode));
        console.log('Success Add URL' + req.body.url);
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
        console.log('Failed Add Url ' + req.body.url);
    }
});

// SELECT by url
router.get('/:url', async (req, res) => {
    try {
        await urlModel.find({ url: req.params.url }, function (err, data) {
            if (data != 0) {
                res.status(200)
                    .json(data)
                console.log("Success : Get Data url " + req.params.url);
            } else {
                res.status(404)
                    .json(error("Data Not Found", res.statusCode));
                console.log("Failed : Retrive url " + req.params.url + " Was Not Found")
            }
        });
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
        console.log("Server Error");
    }
});

module.exports = router;