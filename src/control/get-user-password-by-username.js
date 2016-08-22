'use strict';
var User = require('../entity/User');
var logger = require('./get-logger');

function execute(username, callback) {
    User.findOne({ username: username }, function (err, result) {
        try {
            if (err) {
            	logger.error('get-user-password-by-username', err);
                callback({
                    message: 'Password not found.'
                });
            } else {
                callback(undefined, { password: result.password });
            }
        } catch (error) {
            logger.error('get-user-password-by-username', error);
            callback({
                message: 'Password not found'
            });
        }
    });
}

module.exports = execute;