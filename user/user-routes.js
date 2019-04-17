const router = require("express").Router();
const User = require("./user-model");

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

// toggle read status
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
  const { category, url } = req.body;

  if (!category && !url) {
    res
      .status(400)
      .json({ message: "Please enter an article category and url." });
  } else {
    User.addArticle(req.body, req.params)
      .then(newId => {
        res.status(201).json(newId);
      })
      .catch(error => {
        res.status(500).json({ message: "Could not add article" });
      });
  }
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

module.exports = router;
