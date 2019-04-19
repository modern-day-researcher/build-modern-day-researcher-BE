const router = require("express").Router();
const User = require("./user-model");
const bcrypt = require("bcryptjs");

//get list of users

router.get("/users", (req, res) => {
  User.getUsers()
    .then(allUsers => {
      res.status(200).json(allUsers);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not retrieve list of users" });
    });
});

//update users info

router.put("/:id", (req, res) => {
  let updatedU = req.body;

  const { id } = req.params;
  updatedU.id = id;

  if (updatedU.password) {
    const hash = bcrypt.hashSync(updatedU.password, 10);
    updatedU.password = hash;
  }

  User.updateUser(id, updatedU)
    .then(updated => {
      if (updated > 0) {
        res.status(200).json({ message: "User info updated" });
      } else {
        res.status(401).json({ message: "Could not update user" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating the user info" });
    });
});

//get list of articles saved to a single user

router.get("/:id", (req, res) => {
  User.getFullUserData(req.params.id)
    .then(userData => {
      res.status(200).json(userData);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not retrieve user data." });
    });
});

// toggle read status   --- the id after user is the article's id not the users

router.post("/:id/read", async (req, res) => {
  const { is_read } = req.body;
  const { id } = req.params;

  User.updateReadStatus(id, is_read)
    .then(success => {
      res.status(200).json(success);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not retrieve user data.", error });
    });
});

//add an article to a users list

router.post("/articles", (req, res) => {
  const { category, url, is_read, username } = req.body;
  if (!category) {
    res.status(400).json({ message: "Please enter an article categor." });
  }
  if (!url) {
    res.status(400).json({ message: "Please enter an article  url." });
  }

  if (!username) {
    res.status(400).json({ message: "Please enter a username." });
  }

  User.getIDbyUser(req.body.username)
    .then(id => {
      const user_id = id.id;

      User.addArticle({ category, url, is_read, user_id })
        .then(newArticle => {
          res.status(201).json(newArticle);
        })
        .catch(error => {
          res.status(500).json({ message: "Could not add article" });
        });
    })
    .catch(error => {
      res.status(404).json({
        message: "User not found, usernames are case sensitive",
        error
      });
    });
});

//delete a users article from list

router.delete("/:id/articles", (req, res) => {
  let id = req.params.id;

  User.removeArticle(id)
    .then(removed => {
      if (removed > 0) {
        res.status(200).json({ message: "Article removed from user" });
      } else {
        res
          .status(404)
          .json({ message: "The article selected does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error removing article" });
    });
});

//get list of articles of specific category saved to a single user

router.get("/:category/:id", (req, res) => {
  User.getCategoryUserData(req.params.id, req.params.category)
    .then(userData => {
      res.status(200).json(userData);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not retrieve user data." });
    });
});

module.exports = router;
