const User = require("../models/users");
const bcrypt = require('bcrypt');


exports.createUserServices = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new User({
        name: data.name,
        username: data.username,
        password: hashedPassword
    })
    const result = await User.create(newUser);
    return result;
}

exports.userLoginServices = async (name) => {
    const user = await User.find({ username: name });
    return user;
}