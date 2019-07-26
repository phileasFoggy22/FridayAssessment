const express = require("express");
const mongoose = require("mongoose");
const validate = require("validator");
const validateEmpty = require("../validation/validation.js");

const router = express.Router();
var User = require('../models/users.js');

router.post("/addUser", (req, res) => {



    if (passwordMatcher(req.body.password, req.body.passwordConfirm)) {
        if (validateEmail(req.body.email)) {
            console.log(doesUserExist(req.body.username));
            if (doesUserExist(req.body.username)) {
                var newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });
                newUser.save(function (err) {
                    if (err) {
                        if (err.errmsg.includes("email_1 dup key:")) {
                            res.send("Email address already in use");
                        } else {
                            res.send(err);
                        }
                    } else {
                        res.send("User Added");
                    };

                });
            } else {
                res.send("Username already exists");
            }
        } else {
            res.send("Email Invalid");
        }
    } else {
        res.send("Passwords do not match");
    };
});

function doesUserExist(username) {
    var result = true;
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            throw err;
        }
        if (user) {
            console.log(user);
            var result = false;
            return result;
        }
    });
    return result;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function passwordMatcher(pass1, pass2) {
    return (pass1 === pass2);
}

module.exports = router;