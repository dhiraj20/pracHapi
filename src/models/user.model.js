const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var UserSchema = new Schema({
    name: String,
    email: String,
    password: String
});

UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            next();
        })
    })
});

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const user = mongoose.model('UserDetail', UserSchema, 'userdetails');

const getUser = () => {
    return user.find();
}

const createUser = (payload) => {
    return user.create(payload);
}

const getUserById = (id) => {
    return user.findById(id);
}

const loginUser = (email) => {
    return user.findOne({email: email});
}

module.exports = {
    getUser,
    createUser,
    getUserById,
    loginUser
};
