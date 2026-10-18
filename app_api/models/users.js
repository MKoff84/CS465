const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    hash: {
        type: String,
        required: true,
        select: false
    }
});

userSchema.methods.setPassword = async function (password) {
    this.hash = await bcrypt.hash(password, 12);
};

userSchema.methods.validPassword = async function (password) {
    return bcrypt.compare(password, this.hash);
};

mongoose.model('users', userSchema);