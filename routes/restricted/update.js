const express = require("express");
const mongoose = require("mongoose");
const validate = require("../../validation/validateName.js");

const router = express.Router();
var Author = require('../../models/author');
var Book = require('../../models/book');
//var Book = require('../validation/hash');


router.post("/addAuthor", (req, res) => {
    var errors = validate(req.body.firstname);
    console.log(errors);
    if (errors.isValid) {
        var newAuthor = new Author({

            _id: new mongoose.Types.ObjectId(),
            name: {
                firstName: !validate(req.body.firstname) ? req.body.firstname : "unknown",
                lastName: req.body.lastname,
            },
            biography: req.body.biography,
            twitter: req.body.twitter,
            facebook: req.body.facebook,
            email: req.body.email
        });
        newAuthor.save(function (err) {
            if (err) throw err;
            res.send("Object Added");

        });
    };
});

router.post("/addBook", (req, res) => {
    var errors = validate(req.body.author);
    console.log(errors);

    if (errors.isValid) {
        Author.findById(req.body.author, function (err, author) {
            if (err) throw err;
            var newAuthor = req.body.author;
            console.log(newAuthor);

            console.log('Author successfully saved.');

            var newBook = new Book({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                author: newAuthor._id,
                ratings: [{
                    summary: req.body.summary
                }]
            });

            newBook.save(function (err) {
                if (err) throw err;

                console.log('Book successfully saved.');
            });
            res.send("Book Added");
        });
    };
});

module.exports = router;