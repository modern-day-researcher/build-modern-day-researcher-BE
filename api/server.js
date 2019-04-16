const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureMiddleware = require('./middleware.js');
const authRoute = require('../authenticate/auth-routes.js');
const userRoute = require('../user/user-routes.js');
const restricted = require('../authenticate/restrictedMiddleware.js');

const server = express();

configureMiddleware(server);


server.use('/api/auth', authRoute);
server.use('/api/user', restricted, userRoute);




server.get('/', (req, res) => {
    res.status(200).send("R.ticle: What you read is who you are.")
})


module.exports = server;