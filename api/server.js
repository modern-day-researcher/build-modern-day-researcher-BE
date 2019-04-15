const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const authRoute = require('../config/routes.js');

server.use(helmet());
server.use(express.json());
server.use(cors());


authRoute(server);


server.get('/', (req, res) => {
    res.status(200).send("R.ticle: What you read is who you are.")
})


module.exports = server;