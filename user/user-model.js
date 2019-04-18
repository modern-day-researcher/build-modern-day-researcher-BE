const db = require("../data/dbConfig.js");

module.exports = {
  getUsers,
  updateUser,
  getFullUserData,
  updateReadStatus,
  addArticle,
  getArticleById,
  removeArticle,
};

async function getUsers() {
  return db("users").select(
    "id",
    "username",
    "password",
    "first_name",
    "last_name"
  );
}

function updateUser(id, user) {
  return db("users")
    .where("id", id)
    .update(user, "id");
}

async function getFullUserData(userId) {
  return db("articles").where({ user_id: userId });
}

function updateReadStatus(id, status) {
  status = !status;
  return db("articles")
    .where("id", "=", id)
    .update({ is_read: status });
}

async function addArticle(article) {
  const [id] = await db("articles").insert(article);

  const newArticle = await getArticleById(id);

  return newArticle;
}

function getArticleById(id) {
  const article = db("articles")
    .select("id")
    .where("id", id)
    .first();

  return article;
}

function removeArticle(id) {
  return db("articles")
    .where("id", id)
    .del();
}
