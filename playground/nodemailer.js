var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'champmajhi1993@gmail.com',
    pass: '*#bhunti'
  }
});

var mailOptions = {
  from: 'champmajhi1993@gmail.com',
  to: 'dhiraj.majhi20@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
