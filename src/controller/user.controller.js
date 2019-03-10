const user = require('../factory/user.factory');
const userValidate = require('../validations/user_validation');

const getUser = {
    description: 'Get a user details',
    auth: false,    
    handler: (request, h) => user.getUser(request, h),
    tags: ['api', 'USERS']
}

const createUser = {
    description: 'Create a user',
    auth: false, 
    handler: (request, h) => user.createUser(request, h),
    tags: ['api', 'USERS'],
    plugins: {
        'hapi-swagger': {
            payloadType: 'json'
        }
    },
    validate: userValidate.userValidation
}


const getUserById = {
    description: 'Get a user detail by user id',
    auth: false,    
    handler: (request, h) => user.getUserById(request, h),
    tags: ['api', 'USERS'],
    plugins: {
        'hapi-swagger': {
            payloadType: 'form'
        }
    },
    validate: userValidate.userValidationByid
}

const loginUser = {
    description: 'Login user',
    auth: false,    
    handler: (request, h) => user.loginUser(request, h),
    tags: ['api', 'USERS'],
    plugins: {
        'hapi-swagger': {
            payloadType: 'json'
        }
    },
    validate: userValidate.userValidationByEmailAndPwd
}


module.exports = {
    getUser: getUser,
    createUser: createUser,
    getUserById: getUserById,
    loginUser: loginUser
}
