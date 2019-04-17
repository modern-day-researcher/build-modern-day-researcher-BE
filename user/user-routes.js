const router = require('express').Router();
const User = require('./user-model');



//get list of users

router.get('/users', (req, res) => {
    User
    .getUsers()
    .then(allUsers => {
        res.status(200).json(allUsers)
    })
    .catch(error => {
        res.status(500).json({ error: "Could not retrieve list of users" })
    })
})




//get list of articles saved to a single user

router.get('/:id', (req, res) => {
    User
    .getFullUserData(req.params.id)
    .then(userData => {
        res.status(200).json(userData)
    })
    .catch(error => {
        res.status(500).json({ error: "Could not retrieve user data." })
    })
})


//router.patch('/:id/read', async (req, res) => {
    //const { is_read } = req.body;
    //const { id } = req.params;
//})


//add an article to a users list

router.post(':id/articles', (req, res) => {
    const { title, url } = req.body;
    const { id } = req.params;

    if (!title && !url) {
        res.status(400).json({ message: "Please enter an article title and url." })
    } else {
        req.body.user_id = id;
        User
        .addArticle(req.body)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(error => {
            res.status(500).json({ message: "Could not add article" })
        })
    }
})


//delete a users article from list

router.delete('/:id/articles/:artId', (req, res) => {
    let userId = req.params.id;
    let artId = req.params.id;

    User
    .getArticleById(artId)
    .then(article => {
        if (userId === `${article.user_id}`) {
            User
            .removeArticle(artId)
            .then(removed => {
                if (removed > 0) {
                    releaseEvents.status(200).json({ message: 'Article removed from user' })
                } else {
                    res.status(404).json({ message: 'The article selected does not exist' })
                }
            })
            .catch(error => {
                res.status(500).json({ message: "Error removing article" })
            })
        } else {
            res.status(403).json({ message: "Selected article is not shared with this user" })
        }
    })
})


module.exports = router;