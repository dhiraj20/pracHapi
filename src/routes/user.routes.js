const userController = require('../controller/user.controller');

module.exports = [
    {  method: 'GET', path: '/user', options: userController.getUser },
    {  method: 'POST', path: '/user', options: userController.createUser },
    {  method: 'GET', path: '/user/{id}', options: userController.getUserById },
    {  method: 'POST', path: '/login', options: userController.loginUser },
]
