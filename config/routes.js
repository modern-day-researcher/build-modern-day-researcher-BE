const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./users-model');

const { generateToken, authenticate } = require('../authenticate/authenticate.js');

module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
}


function register(req, res) {
    let user = req.body;
    if (user.username && user.password) {
        const hash = bcrypt.hashSync(user.password, 8);
        user.password = hash;

        Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json({ message: "Error registering. Please try again." })
        })
    }
}

function login(req, res) {
    let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({
                message: `Welcome ${user.username}!, Have a token...`,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
}