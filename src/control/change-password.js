'use strict';
var User = require('../entity/User');
var HashPassword = require('./hash-password');

function execute(username, password, callback) {
    new HashPassword(password, function(err, hashPassword) {
        User.findOneAndUpdate({
            username: username
        }, {
            password: hashPassword
        }, function(err) {
            if (!err) {
                callback();
            } else {
                console.error('change-password', err);
                callback(err);
            }
        });
    });
}

module.exports = execute;