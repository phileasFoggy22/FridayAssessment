const express = require("express");
const app = express();
const Router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    price: String,
    location: [{
        aisle: Number,
        shelf: Number
    }],
    dateAdded: {
        type:Date, 
        default: Date.now
    },
    onSale: Boolean
});

var Product = mongoose.model('Product', productSchema);

module.exports = Router;