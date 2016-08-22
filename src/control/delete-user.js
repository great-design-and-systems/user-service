'use strict';
var User = require('../entity/User');
var logger = require('./get-logger');

function execute(userId, callback) {
    User.findByIdAndRemove(userId, function (err, result) {
        if (err) {
            logger.error('delete-user', err);
            callback({
                message: 'Failed to delete userId ' + userId
            });
        } else {
            callback(null, result);
        }
    });
}

module.exports = execute;