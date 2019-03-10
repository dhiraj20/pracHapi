const Joi = require('joi');

const userValidation = {
    payload: Joi.object({
        name: Joi.string().required().default('Dhiraj'),
        email: Joi.string().required().default('Dhiraj@gmail.com'),
        password: Joi.string().required().default('password')
    }),
    headers: Joi
        .object({
            'authorization': Joi.string()
        }).options({
            allowUnknown: true
        })
};

const userValidationByid = {
    params: {
        id: Joi.string()
    }
}

const userValidationByEmailAndPwd = {
    payload: Joi.object({
        email: Joi.string().required().default('Dhiraj@gmail.com'),
        password: Joi.string().required().default('password')
    })
}

module.exports = {
    userValidation,
    userValidationByid,
    userValidationByEmailAndPwd
}
