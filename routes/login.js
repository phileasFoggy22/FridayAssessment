const express = require("express");
const mongoose = require("mongoose");
const validate = require("../validation/validation.js");

const router = express.Router();
var User = require('../models/users.js');
router.get("/getUsers", (req, res) => {
    User.find({}).then(function (values) {
            res.send(values)
        },
        (err) => {
            res.send("There are no users");
        });
});
router.post("/login", (req, res) => {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        console.log(req.body.password);
        console.log(user);
        // test a matching password
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) throw err;
            res.send('login result' + isMatch.toString());
        });
    });
});
module.exports = router;