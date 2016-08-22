'use strict';
var UserProfile = require('../entity/User-profile');
var logger = require('./get-logger');

function execute(userId, callback) {
    UserProfile.remove({
        userId: userId
    }, function (err, result) {
        if (err) {
            logger.error('delete-user-profile-by-user-id', err);
            callback({
                message: 'Failed to delete user profile ' + userId
            });
        } else {
            callback(null, result);
        }
    });
}

module.exports = execute;