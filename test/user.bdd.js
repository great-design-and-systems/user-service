(function () {
    'use strict';
    var User = require('../src/boundary/user');
    var Database = require('./config/database');
    var sinon = require('sinon');
    var chai = require('chai');
    var expect = chai.expect;
    var CONNECT_TEST_TIMEOUT = process.env.CONNECT_TEST_TIMEOUT || 50000;

    describe('User Service BDD', function () {
        var db = new Database();

        beforeEach(function (done) {
            this.timeout(CONNECT_TEST_TIMEOUT);
            return db.connect(done);
        });

        describe('GIVEN: I have firstname, lastname, username, password and email', function () {
            var firstname = 'Jerico';
            var lastname = 'de Guzman';
            var username = 'sample';
            var password = 'sample_pass';
            var email = 'sample@email.com';
            var registrationForm = {};

            beforeEach(function () {
                registrationForm.username = username;
                registrationForm.password = password;
                registrationForm.email = email;
                registrationForm.firstname = firstname;
                registrationForm.lastname = lastname;
            });

            describe('WHEN: saving user', function () {
                var savedResult;
                var userId;
                beforeEach(function (done) {
                    User.register(registrationForm, function (err, userSavedResult) {
                        savedResult = userSavedResult;
                        userId = userSavedResult.userId;
                        done();
                    });
                });

                it('THEN: response is user profile', function () {
                    expect(!!savedResult).to.equal(true);
                });
                describe('GIVEN: I have username', function () {
                    describe('WHEN: getting userProfile', function () {
                        var userProfile;

                        beforeEach(function (done) {
                            User.getUserProfileByUsername(username, function (err, userProfileResult) {
                                userProfile = userProfileResult;
                                done();
                            });
                        });

                        it('THEN: user profile is retrieved', function () {
                            expect(!!userProfile).to.equal(true);
                        });

                    });
                    describe('WHEN: getting password using username', function () {
                        var passwordResult;
                        beforeEach(function (done) {
                            User.getUserPasswordByUsername(username, function (err, result) {
                                passwordResult = result.password;
                                done();
                            })
                        });
                        it('THEN: password is retrieved', function () {
                            expect(!!passwordResult).to.equal(true);
                        });
                    })
                });
                describe('GIVEN: I have userId', function () {
                    describe('WHEN: removing user', function () {
                        var message;
                        beforeEach(function (done) {
                            User.removeUser(userId, function (err, result) {
                                message = result.message;
                                done();
                            });
                        });

                        it('THEN: user and user profile are removed', function () {
                            expect(!!message).to.equal(true);
                            expect(message).to.equal('User has been removed.');
                        });

                    });
                });
            });
        });

        afterEach(function (done) {
            db.disconnect(done);
        });
    });
})();