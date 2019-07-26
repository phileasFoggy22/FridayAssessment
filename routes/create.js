const express = require("express");
const mongoose = require("mongoose");
const validation = require("../validation/validation.js");

const router = express.Router();
var User = require('../models/users.js');

router.post("/addUser", (req, res) => {

    if (req.body.password === req.body.passwordConfirm) {
        if (validation(req.body.email)) {
            var newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            newUser.save(function (err) {
                if (err) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send(err.message);
                    }
                } else {
                    res.send("User Added");
                };
            });
        } else {
            res.send("Email Invalid");
        }
    } else {
        res.send("Passwords do not match");
    };
});


module.exports = router;