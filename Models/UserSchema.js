const momgoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new momgoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    bookings:{
        type: Array,
        default: [],
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = momgoose.model('User', userSchema);
module.exports = User;