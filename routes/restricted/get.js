const express = require("express");
const mongoose = require("mongoose");
const validate = require("../../validation/validateName.js");

const router = express.Router();
var Author = require('../../models/author');
var Book = require('../../models/book');

router.get("/getAuthors", (req, res) => {
    Author.find({}).then(function (values) {
            res.send(values)
        },
        (err) => {
            res.send("There are no authors");
        });
});
router.get("/getBooks", (req, res) => {
    Book.find({}).then(function (values) {
            res.send(values)
        },
        (err) => {
            res.send("There are no books");
        });
});

module.exports = router;