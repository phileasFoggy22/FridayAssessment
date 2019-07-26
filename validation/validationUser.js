var User = require('../models/users.js');


module.exports = function loginUser(data) {
    let errors = {};
    let match = false;
    User.findOne({
        username: data.username
    }, function (err, user) {
        if (err) throw err;
        console.log(data.password);
        console.log(user);
        // test a matching password
        user.comparePassword(data.password, function (err, isMatch) {
            if (err) throw err;
            let match = isMatch;
            console.log("here: " + match);
            return (match);
        });
        console.log("herenow: " + match);

    });
};