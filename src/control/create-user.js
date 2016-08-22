'use strict';
var User = require('../entity/User');
var HashPassword = require('./hash-password');
var logger = require('./get-logger');

function execute(user, callback) {
    new HashPassword(user.password, function(err, password) {
        user.password = password;
        User.create(user, function (err, result) {
            if (err) {
                logger.error('create-user', err);
                callback({
                    message: 'Failed to create user.'
                });
            } else {
                callback(null, result);
            }
        });
    });
}

module.exports = execute;