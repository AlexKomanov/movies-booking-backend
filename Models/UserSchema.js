const momgoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new momgoose.Schema({}, {
    timestamps: true
})

const User = momgoose.model('User', userSchema);
module.exports = User;