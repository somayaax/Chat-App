const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        minLength: 3,
        maxLength: 15,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true
    }
}, {
    timestamps: true,
})

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;