'use strict';
var User = require('../entity/User');

function execute(username, callback) {
    User.findOne({
        username: username
    }, function (err, user) {
        console.log('user', user);
        if (user === null) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

module.exports = execute;