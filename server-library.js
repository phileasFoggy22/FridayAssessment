const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const uri = 'mongodb://localhost/mongoose_basics';


const schema = require("./models/mongo-schema.js");
const crud = require("./roots/crud.js");
const create = require("./roots/create.js");

mongoose.connect(uri, {
    useNewUrlParser: true
});
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use("/crud", crud);
app.use("/create", create);
mongoose.connect(uri, {
    useNewUrlParser: true
}).then(
    () => {
        console.log("connected to mongo database")
    },
    (err) => {
        /* handle errors */
    }
);




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));