const router = require('express').Router();
const User = require('./user-model');


router.get('/:id', (req, res) => {
    User
    .getFullUserData(req.params.id)
    .then(userData => {
        res.status(200).json(userData)
    })
    .catch(err => {
        res.status(500).json({ message: "Could not retrieve user data." })
    })
})


module.exports = router;