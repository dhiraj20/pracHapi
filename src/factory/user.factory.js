
const user = require('../models/user.model.js');
const bcrypt = require('bcrypt');

const getUser = (request, h) => {
    return user.getUser().then(res => {
        if (!res.length) {
            console.log('no users found');
        } else {
            return res;
        }
    });
}

const createUser = (request, h) => {
    const payload = {
        name: request.payload.name,
        email: request.payload.email,
        password: request.payload.password,
        isVerified: false
    };
    return user.createUser(payload).then(res => {
        if (res) {
            return 'User added succesfully';
        }
    }).catch((err) => {
        console.log(err);
    });
}

const getUserById = (request, h) => {
    const userId = request.params.id;
    return user.getUserById(userId).then(res => {
        if (res) {
            return res;
        } else {
            console.log('no name found');
        }
    });
}

const loginUser = (request, h) => {
    const email = request.payload.email;
    const password = request.payload.password;
    return user.loginUser(email).then(res => {
        if (!res) {
            console.log('No user found');
            throw new Error('Error');
        } else {
            var x = bcrypt.compare(password, res.password).then( result => {
                if (!result) {
                    console.log('Error')
                } else {
                    return result;
                }
            }); 
            console.log(x);
            if ( x )  {
                return res.email;
            } else {
                return 'Error'
            }
        }
    });
}

module.exports = {
    getUser,
    createUser,
    getUserById,
    loginUser
}
