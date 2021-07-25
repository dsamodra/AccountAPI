const express = require('express');
const router = express.Router();
const User = require('../models/User');

// RESPONSE FORMAT
const { success, error } = require("./response");

// GET USER
router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.status(200)
            .json(user);
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
    }
    console.log("Get All Data User");
});

// GET SPECIFIC USER
router.get('/:iduser', async (req, res) => {
    try {
        const user = await User.findById(req.params.iduser);
        if (user != null) {
            res.status(200)
                .json(user);
            console.log("Get Data User " + user.name);
        } else {
            res.status(404)
                .json(error("Data Not Found", res.statusCode));
            console.log("User with id " + req.params.iduser + " Was not found");
        }
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
    }

});


// DELETE USER
router.delete('/:iduser', async (req, res) => {
    try {
        // checking data is available
        const user = await User.findById(req.params.iduser);

        if (user != null) {
            const removeUser = await User.deleteOne({ _id: req.params.iduser });
            res.status(200)
                .json(success("OK", res.statusCode));
            console.log("Delete User " + user.name);
        } else {
            res.status(404)
                .json(error("Data Not Found", res.statusCode));
            console.log("User with id " + req.params.iduser + " Was not found");
        }
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
    }

});

// UPDATE USER
router.patch('/:iduser', async (req, res) => {
    try {
        // checking data is available
        const user = await User.findById(req.params.iduser);
        if (user != null) {
            const updateUser = await User.updateOne(
                { _id: req.params.iduser },
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        profileImg: req.body.profileImg
                    }
                }
            )
            res.status(200)
                .json(success("OK", res.statusCode));
            console.log("Update User " + req.params.iduser);

        } else {
            res.status(404)
                .json(error("Data Not Found", res.statusCode));
        }
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
    }

});

// INSERT USER
router.post('/', async (req, res) => {
    const user = new User({
        iduser: req.body.iduser,
        name: req.body.name,
        email: req.body.email,
        username: req.body.name,
        password: req.body.password,
        profileImg: req.body.profileImg
    });

    try {
        const saveUser = await user.save();
        res.status(200)
            .json(success("OK", res.statusCode));
        console.log('Add User ' + req.body.name);
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
    }


});

module.exports = router;