'use strict';

const Hapi = require('hapi'),
    routes = require('../src/routes'),
    HapiSwagger = require('hapi-swagger'),
    Vision = require('vision'),
    Inert = require('inert'),
    HapiAuthJwt = require('hapi-auth-jwt2')


const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

for (const route in routes) {
    server.route(routes[route]);
}

const people = { // our "users database"
    1: {
        id: 1,
        name: 'Jen Jones'
    }
};

// bring your own validation function
const validate = async function (decoded, request) {

    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
        return {
            isValid: false
        };
    } else {
        return {
            isValid: true
        };
    }
};

const init = async () => {

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: '1.0',
        },
    };

    await server.register([
        Inert,
        Vision,
        HapiAuthJwt,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.auth.strategy('jwt', 'jwt', {
        key: 'NeverShareYourSecret', // Never Share your secret key
        validate: validate, // validate function defined above
        verifyOptions: {
            algorithms: ['HS256']
        } // pick a strong algorithm
    });

    server.auth.default('jwt');

    await server.start();
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init().then(server => {
        console.log('Server running at:', server.info.uri);
    })
    .catch(error => {
        console.log(error);
    });
