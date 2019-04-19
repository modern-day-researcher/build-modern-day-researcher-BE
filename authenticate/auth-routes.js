const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("./authenticate");
const Users = require("./auth-model");

router.post("/register", (req, res) => {
  let addUser = req.body;

  const hash = bcrypt.hashSync(addUser.password, 8);
  addUser.password = hash;

  Users.regUser(addUser)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error registering. Please try again." });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (username && password) {
    Users.getUser(username)
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken.generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!, Have a token...`,
            token,
            user_id: user.id
          });
        } else {
          res.status(404).json({ message: "Invalid Credentials" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(401).json({ message: "Please log in" });
  }
});


module.exports = router;
