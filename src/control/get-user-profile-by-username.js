'use strict';
var UserProfile = require('../entity/User-profile');
var User = require('../entity/User');
var log4js = require('log4js');
var logger = log4js.getLogger();
function execute(username, callback) {
    User.findOne({
        username: username
    }, function (err, result) {
        if (err) {
            callback({
                message: 'User not found.'
            });
        } else {
            try {
                UserProfile.findOne({
                    userId: result._id
                }, function (err, userProfileResult) {
                    if (err) {
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
                callback({
                    message: 'User profile not found'
                });
            }
        }
    });

}

module.exports = execute;