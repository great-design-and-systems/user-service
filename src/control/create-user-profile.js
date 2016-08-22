'use strict';
var UserProfile = require('../entity/User-profile');
var logger = require('./get-logger');

function execute(userProfile, callback) {
    UserProfile.create(userProfile, function (err, result) {
        if (err) {
            logger.error('create-user-profile', err);
            callback({
                message: 'Failed to create user profile.'
            });
        } else {
            callback(null, result);
        }
    });
}

module.exports = execute;