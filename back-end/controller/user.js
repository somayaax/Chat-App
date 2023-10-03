const { BaseError } = require("../libs");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const signUp = async (data) => {
    const userExists = await User.findOne({userName: data.userName});
    if(userExists) throw new BaseError('User already exists', 400);
    const user = await User.create(data);
    if (!user) throw new BaseError('signup failed!', 500);
}
const login = async (userName, password) => {
    const user = await User.findOne({ userName }).exec();
    if (!user) throw new BaseError('email password mismatch!', 401);
    const valid = user.verifyPassword(password);
    if (!valid) throw new BaseError('email password mismatch!', 401);
    const token = jwt.sign({ id: user.id, userName: user.userName },
        process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    return token;
}

module.exports = {
    signUp,
    login
}