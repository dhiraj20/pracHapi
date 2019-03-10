const mongoose = require('mongoose');

connection_uri = 'mongodb://localhost:27017/MEANStackDB';

exports.mongoConnection = function () {
mongoose.connect(connection_uri, { useNewUrlParser: true, useCreateIndex: true }, (error) => {
    if ( !error ) {
        console.log('mongodb default connection open to mongodb://27017');
    } else {
        console.log('mongoose default connection error' + JSON.stringify(error, undefined, 2));
    }
});
}
