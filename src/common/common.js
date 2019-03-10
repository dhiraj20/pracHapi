var nodemailer = require("nodemailer"),
    Config = require('../../config/config'),
    crypto = require('crypto'),
    algorithm = 'aes-256-ctr';
    bcrypt = require('bcrypt');

var privateKey = Config.key.privateKey;

// create reusable transport method (opens pool of SMTP connections)

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'champmajhi1993@gmail.com',
      pass: '*#bhunti'
    }
  });
  

exports.decrypt = function (password, hash) {
    return decrypt(password, hash);
};

exports.encrypt = function (password) {
    return encrypt(password);
};

// exports.sentMailVerificationLink =  function (user, token) {
//     var from = Config.email.accountEmail;
//     var mailbody = "<p>Thanks for Registering on " + Config.email.username + " </p><p>Please verify your email by clicking on the verification link below.<br/><a href='http://" + Config.server.host + ":" + Config.server.port + "/" + Config.email.verifyEmailUrl + "/" + token + "'>Verification Link</a></p>"
//     mail(from, user.email, "Account Verification", mailbody);
// };

exports.sentMailVerificationLink =  function (user, token) {
    console.log(token);
    var from = Config.email.accountEmail;
    var mailbody = "<p>Thanks for Registering on " + Config.email.username + " </p><p>Please verify your email by clicking on the verification link below.<br/><a href='http://" + Config.server.host + ":" + Config.server.port + "/r2/" + Config.email.verifyEmailUrl + "/" + token + "'>Verification Link</a></p>"
    mail(from, user.email, "Account Verification", mailbody);
};

exports.sentMailForgotPassword = function (user, token) {
    var from = Config.email.accountName + " Team<" + Config.email.username + ">";
    var mailbody = "<p>Header of email</p>"
    mail(from, user.email, "Account password", mailbody);
};


// method to decrypt data(password) 
function decrypt(password, hash) {
    return bcrypt.compareSync(password, hash);    
}

// method to encrypt data(password)
function encrypt(password) {
    var hash = bcrypt.hashSync(password, 10);
    return hash;
}

function mail(from, email, subject, mailbody) {
    var mailOptions = {
        from: from, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: mailbody // html body
    };

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.error(error);
        }
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
}
