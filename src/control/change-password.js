'use strict';
var User = require('../entity/User');
var HashPassword = require('./hash-password');
var logger = require('./get-logger');

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
                logger.error('change-password', err);
                callback(err);
            }
        });
    });
}

module.exports = execute;