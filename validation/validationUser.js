var User = require('../models/users.js');
module.exports = function doesUserExist(username) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) throw err;

        return user;
    });
}