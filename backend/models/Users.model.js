const mongoose = require('mongoose');

const usersSchema = ({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true }
});

const UsersModel = mongoose.model('users', usersSchema);

module.exports = { UsersModel };