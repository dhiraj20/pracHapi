const userMailer = require('../controller/userMailer.controller');

module.exports = [
    { method: 'POST', path: '/r2/user', options: userMailer.createUserMailer},
    { method: 'POST', path: '/r2/login', options: userMailer.getUserMailerWithEmailAndPwd},
    { method: 'POST', path: '/r2/verifyEmail', options: userMailer.verifyUserEmail},
    // { method: 'POST', path: '/r2/forgotPassword', options: userMailer.forgotPassword},
    // { method: 'POST', path: '/r2/resendVerificationEmail', options: User.resendVerificationEmail}
];
