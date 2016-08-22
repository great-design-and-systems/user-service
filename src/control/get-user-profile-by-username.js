'use strict';
var UserProfile = require('../entity/User-profile');
var User = require('../entity/User');
var logger = require('./get-logger');

function execute(username, callback) {
    User.findOne({
        username: username
    }, function (err, result) {
        if (err) {
        	logger.error('get-user-profile-by-username', err);
            callback({
                message: 'User not found.'
            });
        } else {
            try {
                UserProfile.findOne({
                    userId: result._id
                }, function (err, userProfileResult) {
                    if (err) {
                    	logger.error('get-user-profile-by-username', err);
                        callback({
                            message: 'User profile not found'
                        });
                    } else {
                        userProfileResult._id = undefined;
                        userProfileResult.userId = undefined;
                        callback(undefined, userProfileResult);
                    }
                });
            } catch (errProfile) {
            	logger.error('get-user-profile-by-username', errProfile);
                callback({
                    message: 'User profile not found'
                });
            }
        }
    });

}

module.exports = execute;