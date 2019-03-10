
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function encrypt(password) {
    var hash = bcrypt.hashSync(password, 10);
    return hash;
}

function dencrypt(password, hash) {
    return (bcrypt.compareSync(password, hash));
}

function createToken() {
    const token = {
        id: 1,
        name: 'Dhiraj'
    }
    return  jwt.sign(token, 'key');
}

console.log(createToken());
var decoded = jwt.verify(createToken(), 'kkey', function(err, decode) {
    if ( err ) {
        console.log('Error occured')
    } else {
        console.log(decode);
    }
});
