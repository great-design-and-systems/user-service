'use strict';
var User = require('../entity/User');

function execute(userId, callback) {
    User.findByIdAndRemove(userId, callback);
}

module.exports = execute;