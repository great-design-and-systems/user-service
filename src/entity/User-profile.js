var mongoose = require('mongoose');

var UserProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User Id is required.']
    },
    firstname: {
        type: String,
        required: [true, 'firstname is required.']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required.']
    },
    avatarId: String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('userProfile', UserProfileSchema);