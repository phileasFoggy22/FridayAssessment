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

module.exports = router;