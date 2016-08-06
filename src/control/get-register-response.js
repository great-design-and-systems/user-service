'use strict';
var API = process.env.API_NAME || '/api/users/';

function execute(req, res, err, result) {
    if (err) {
        res.status(500).send({
            message: 'Registration failed.',
            error: err
        });
    } else {
        res.status(200).send({
            message: 'Registration completed.',
            userId: result.userId,
            username: result.username,
            links: {
                profile: 'http://' + req.headers.host + API + 'user-profile/' + result.username
            }
        });
    }
}

module.exports = execute;