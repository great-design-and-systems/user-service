var Database = require('./src/config/database');
var Server = require('./src/config/server');
var UserResource = require('./src/boundary/user-resource');
var LoggerServer = require('./src/config/logger-server');
var express = require('express');
var app = express();

(function() {
    new Database();
    new Server(app);
    new UserResource(app);
    new LoggerServer(app);
})();

module.exports = app;