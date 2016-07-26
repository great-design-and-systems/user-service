'use strict';
var mongoose = require('mongoose');
var lodash = require('lodash');

module.exports = function (done) {
    var PORT = process.env.DB_PORT_TEST || 27017;
    var HOST = process.env.DB_HOST_TEST || 'localhost';
    var TEST_DB = process.env.DB_TEST || 'user';
    var USER = process.env.DB_USER;
    var PASSWORD = process.env.DB_PASSWORD;
    var RETRY_COUNT = process.env.RETRY_COUNT || 10;
    return {
        connect: connect,
        disconnect: disconnect
    };

    function connect(done, tries) {
        if (!tries) tries = 0;
        if (tries < RETRY_COUNT) {
            mongoose.connect(getDBUrl(), function (err) {
                if (err) {
                    console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
                    tries++;
                    setTimeout(connect(done, tries), 5000);
                } else {
                    return clearDB(done);
                }
            });
        } else {
            throw 'Failed to connect to database';
        }
    }

    function getDBUrl() {
        var url = 'mongodb://';
        if (USER && PASSWORD) {
            url += USER;
            url += ':' + PASSWORD;
            url += '@';
        }
        url += HOST;
        url += ':';
        url += PORT;
        url += '/';
        url += TEST_DB;
        console.log('mongo:' + url);
        return url;
    }

    function clearDB(done) {
        var colName;
        for (var i in mongoose.connection.collections) {
            colName = i; break;
        }
        if (colName) {
            if (mongoose.connection.collections[colName] && mongoose.connection.collections[colName].drop) {
                mongoose.connection.collections[colName].drop(function (err) {
                    clearDB(done);
                    lodash.unset(mongoose.connection.collections, colName);
                });
            }
        } else {
            done();
        }
    }

    function disconnect(done) {
        mongoose.disconnect();
        return done();
    }
};
