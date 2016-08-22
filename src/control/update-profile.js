'use strict';
var UserProfile = require('../entity/User-profile');
var User = require('../entity/User');
var logger = require('./get-logger');

function execute(username, data, callback) {
    User.findOne({
        username: username
    }, function(err, result) {
        if (err) {
            logger.error('update-profile', err);
            callback({
                message: 'User not found.'
            });
        } else {
            try {
                UserProfile.findOneAndUpdate({
                    userId: result._id
                }, data, function(err) {
                    if (err) {
                        logger.error('update-profile', err);
                        callback({
                            message: 'User profile update failed.'
                        });
                    } else {
                        callback();
                    }
                });
            } catch (errProfile) {
            	logger.error('update-profile', errProfile);
                callback({
                    message: 'User profile update failed.'
                });
            }
        }
    });
}

module.exports = execute;