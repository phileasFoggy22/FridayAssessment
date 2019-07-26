const validator = require("validator");
const isEmpty = require("./isEmpty.js");

module.exports = function validateNewAuthorBook(data) {
    let errors = {};
    data.value = !isEmpty(data.value) ? data.value : "";
    return {
        errors,
        "isValid": isEmpty(errors)
    };
};