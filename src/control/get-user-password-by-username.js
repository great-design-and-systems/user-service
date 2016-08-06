'use strict';
var User = require('../entity/User');

function execute(username, callback) {
    User.findOne({ username: username }, function (err, result) {
        try {
            if (err) {
                callback({
                    message: 'Password not found.'
                });
            } else {
                callback(undefined, { password: result.password });
            }
        } catch (error) {
            console.error(error);
            callback({
                message: 'Password not found'
            });
        }
    });
}

module.exports = execute;