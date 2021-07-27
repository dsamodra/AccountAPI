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
        console.log("Success : Retrive All Data User");
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
        console.log("Failed : Retrive All Data User");
    }
});

// GET SPECIFIC USER
router.get('/:iduser', async (req, res) => {
    try {
        const user = await User.findById(req.params.iduser);
        if (user != null) {
            res.status(200)
                .json(user);
            console.log("Success : Get Data User id " + user.name);
        } else {
            res.status(404)
                .json(error("Data Not Found", res.statusCode));
            console.log("Failed : Retrive User with id " + req.params.iduser + " Was Not Found")
        }
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
        console.log("Server Error");
    }
});

// SELECT USER BY NAME
router.get('/u/:name', async (req, res) => {
    try {
        await User.find({ name: req.params.name }, function (err, data) {
            if (data != 0) {
                res.status(200)
                    .json(data)
                console.log("Success : Get Data User " + req.params.name);
            } else {
                res.status(404)
                    .json(error("Data Not Found", res.statusCode));
                console.log("Failed : Retrive User with name " + req.params.name + " Was Not Found")
            }
        });
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
        console.log("Server Error");
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
            console.log("Success : Delete User " + user.name);
        } else {
            res.status(404)
                .json(error("Data Not Found", res.statusCode));
            console.log("Failed : Delete User with id " + req.params.iduser + " Was not found");
        }
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
        console.log("Server Error");
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
            console.log("Success : Update User " + user.name);

        } else {
            res.status(404)
                .json(error("Data Not Found", res.statusCode));
            console.log("Failed : Update User " + req.params.iduser + " Not Found")
        }
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
        console.log("Server Error");
    }

});

// INSERT USER
router.post('/', async (req, res) => {
    const user = new User({
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
        console.log('Success Add User ' + req.body.name);
    } catch (err) {
        res.status(500)
            .json(error("Something went wrong", res.statusCode));
        console.log('Failed Add User ' + req.body.name);
    }
});

module.exports = router;