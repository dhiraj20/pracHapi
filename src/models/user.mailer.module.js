const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var userMailer  = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

var userMailerDetails = mongoose.model('userMailer', userMailer);

const saveUser = (requestData) => {
    return userMailerDetails.create(requestData);
};

const updateUser = function(user) {
    return user.save();
};

const findUserWithEmailAndPwd = function(email) {
    return userMailerDetails.findOne({email: email});
};

const findUserByIdAndUserName = function(id, userName) {
    return userMailerDetails.findOne({
        userName: userName,
        _id: id
    });
};


module.exports = {
    saveUser: saveUser,
    updateUser: updateUser,
    findUserWithEmailAndPwd: findUserWithEmailAndPwd,
    findUserByIdAndUserName: findUserByIdAndUserName
}
