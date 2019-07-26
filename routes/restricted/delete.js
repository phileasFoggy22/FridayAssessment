const express = require("express");
const mongoose = require("mongoose");
const validate = require("../../validation/validateName.js");

const router = express.Router();
var Author = require('../../models/author');
var Book = require('../../models/book');


router.delete("/deleteAuthor", (req, res) => {
    var errors = validate(req.body.author);
    console.log(errors);

    if (errors.isVaild) {
        Author.remove()
        Author.findByIdAndRemove(req.body.author, function (err, author) {
            res.send("Object Removed");
        });
    };
});
router.delete("/deleteBook", (req, res) => {
    var errors = validate(req.body.title);
    console.log(errors);

    if (errors.isVaild) {
        Book.deleteMany({
            title: req.body.title
        }, function (err, book) {
            if (err) throw err;
            var bookName = req.body.title;
            console.log(bookName + " deleted");

            res.send(bookName + " deleted");
        });
    };
});

module.exports = router;