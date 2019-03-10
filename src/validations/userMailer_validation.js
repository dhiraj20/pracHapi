const Joi = require('joi');

const userMailerCreate = {
    payload: Joi.object({
        email: Joi.string().required().default('Dhiraj.majhi20@gmail.com'),
        password: Joi.string().required().default('password'),
        scope: Joi.string().required().default('Customer'),
    })
};

const userMailerEmailPwd = {
    payload: Joi.object({
        email: Joi.string().required().default('Dhiraj.majhi20@gmail.com'),
        password: Joi.string().required().default('password'),
    })
};

const verifyUserEmail = { 
    headers: Joi
    .object({
        'authorization': Joi.string()
    }).options({
        allowUnknown: true
    })  
}

const forgotPassword = {
    payload: {
        userName: Joi.string().email().required()
    }
}

module.exports = {
    userMailerCreate,
    userMailerEmailPwd,
    verifyUserEmail,
    forgotPassword
}
