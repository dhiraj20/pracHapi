const userMailer = require('../models/user.mailer.module');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const common = require('../common/common');

const privateKey = config.key.privateKey;

const createUser = (request, h) => {
    const payload = {
        email: request.payload.email,
        password: common.encrypt(request.payload.password),
        scope: request.payload.scope,
    }
    console.log(payload);
    return userMailer.saveUser(payload).then(res => {
        if (res) {
            const tokenData = {
                email: res.email,
                id: res._id,
                password: res.password
            }
            common.sentMailVerificationLink(res, jwt.sign(tokenData, privateKey));              
            return res;
        }
    }).catch(err => {
        if (11000 === err.code || 11001 === err.code) {
            return 'Email already registered. Please use another email'
        }
    });
}

// login a user
const getUserWithEmailAndPwd = (request, h) => {
    return userMailer.findUserWithEmailAndPwd(request.payload.email).then(res => {
        const tokenData = {
            email: res.email,
            id: res._id,
            password: res.password
        }
        if (!res.isVerified) {
            return {
                message: 'Email not verified. Please use token to verify Email',
                token: jwt.sign(tokenData, privateKey)
            }
        }
        if (res && common.decrypt(request.payload.password, res.password)) {
            return {
                message: 'Logged in succesfully',
                email: res.email,
                id: res._id,
                token: jwt.sign(tokenData, privateKey)
            }
        } else {
            return {
                message: 'User Not found',
            }
        }
    }).catch(err => {
        return 'User not found.'
    });
}

const verifyUserEmail = (request, h) => {
    return jwt.verify(request.headers.authorization, privateKey, function (err, decoded) {
        if (err) {
            return 'Error Occured'
        } else {
            return userMailer.findUserWithEmailAndPwd(decoded.email).then(res => {
                if (res == null) {
                    return 'Invalid Verification link.';
                }
                if (res.isVerified) {
                    return 'Email already verified.';
                }
                if (res && decoded.password === res.password) {
                    res.isVerified = true;
                    return userMailer.updateUser(res).then(res => {
                        return 'User Verified';
                    }).catch(err => {
                        return 'Error occured';
                    })
                } else {
                    return 'Invalid Verification link.';
                }
            }).catch(err => {
                return 'Invalid Verification link.';
            });
        }
    });
}

const forgotPassword = (request, h) => {
    return userMailer.findUserWithEmailAndPwd(request.payload.email).then(res => {            
    }).catch( err => {
        return 'PLease Verify Your Email.'
    });       
}

module.exports = {
    createUser,
    getUserWithEmailAndPwd,
    verifyUserEmail,
    forgotPassword
}
