const userMailer = require('../factory/userMailer.factory');
const userMailerValidate = require('../validations/userMailer_validation')

const createUserMailer = {
    description: 'Create a user',
    auth: false,
    handler: (request, h) => userMailer.createUser(request, h),
    tags: ['api', 'USERS'],
    plugins: {
        'hapi-swagger': {
            payloadType: 'json'
        }
    },
    validate: userMailerValidate.userMailerCreate
}

const getUserMailerWithEmailAndPwd = {
    description: 'Login User',
    auth: false,
    handler: (request, h) => userMailer.getUserWithEmailAndPwd(request, h),
    tags: ['api', 'USERS'],
    plugins: {
        'hapi-swagger': {
            payloadType: 'json'
        }
    },
    validate: userMailerValidate.userMailerEmailPwd
}

const verifyUserEmail = {
    description: 'Verify Email',
    auth: false,
    handler: (request, h) => userMailer.verifyUserEmail(request, h),
    tags: ['api', 'USERS'],
    plugins: {
        'hapi-swagger': {
            payloadType: 'json'
        }
    },
    validate: userMailerValidate.verifyUserEmail
}

const forgotPassword = {
    description: 'Forgot Password',
    auth: false,
    handler: (request, h) => userMailer.forgotPassword(request, h),
    tags: ['api', 'USERS'],
    plugins: {
        'hapi-swagger': {
            payloadType: 'json'
        }
    },
    validate: userMailerValidate.forgotPassword
}

module.exports = {
    createUserMailer,
    getUserMailerWithEmailAndPwd,
    verifyUserEmail,
    forgotPassword
}
