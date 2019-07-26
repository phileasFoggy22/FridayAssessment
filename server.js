const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const uri = 'mongodb://localhost/mongoose_basics';


const create = require("./routes/create.js");
const get = require("./routes/get.js");
const login = require("./routes/login.js");
const resCreate = require("./routes/restricted/create.js");
const resDelete = require("./routes/restricted/delete.js");
const resGet = require("./routes/restricted/get.js");
const resUpdate = require("./routes/restricted/update.js");


const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use("/create", create);
app.use("/get", get);
app.use("/login", login);
app.use("/resCreate", resCreate);
app.use("/resDelete", resDelete);
app.use("/resGet", resGet);
app.use("/resUpdate", resUpdate);
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