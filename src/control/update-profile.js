'use strict';
var UserProfile = require('../entity/User-profile');
var User = require('../entity/User');

function execute(username, data, callback) {
    User.findOne({
        username: username
    }, function(err, result) {
        if (err) {
            console.error('update-profile', err);
            callback({
                message: 'User not found.'
            });
        } else {
            try {
                UserProfile.findOneAndUpdate({
                    userId: result._id
                }, data, function(err) {
                    if (err) {
                        console.error('update-profile', err);
                        callback({
                            message: 'User profile update failed.'
                        });
                    } else {
                        callback();
                    }
                });
            } catch (errProfile) {
                callback({
                    message: 'User profile update failed.'
                });
            }
        }
    });
}

module.exports = execute;