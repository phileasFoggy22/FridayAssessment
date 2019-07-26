const express = require("express");
const mongoose = require("mongoose");
const validate = require("../validation/validationUser.js");

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
    var sucess = loginUser({
        "username": req.body.username,
        "password": req.body.password
    })
    console.log("result: " + sucess);
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) throw err;
            res.send('login result: ' + isMatch.toString());
        });
    });
});
// Failed to make the following into a callable function
/* function loginUser(data) {
    let errors = {};
    let match = false;
    User.findOne({
        username: data.username
    }, function (err, user) {
        if (err) throw err;
        console.log(data.password);
        console.log(user);
        user.comparePassword(data.password, function (err, isMatch) {
            if (err) throw err;
            let match = isMatch;
            console.log("here: " + match);
            return (match);
        });
        console.log("herenow: " + match);

    });
}; */
module.exports = router;