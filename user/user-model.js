const db = require("../data/dbConfig.js");

module.exports = {
  getUsers,
  getFullUserData,
  updateReadStatus,
  addArticle,
  getArticleById,
  removeArticle
};


async function getUsers() {
  return db('users').select('id', 'username', 'password', 'first_name', 'last_name')
}


async function getFullUserData(userId) {
   //const user = await db("users")
       //.select("users.first_name", "users.last_name")
       //.where("id", userId)
       //.first();

   //const articles = await db("users")
       //.join("articles", "users.id", "articles.user_id")
       //.select("articles.category", "articles.title", "articles.url", "articles.description")
       //.where("users.id", userId)

  return db("articles").where({ user_id: userId });

     //return { ...user, articels };
}


function updateReadStatus(userId, article) {
  return db('articles')
    .where('user_id', userId)
    .update(article, "id")
}


async function addArticle(article) {
  const [ id ] = await db('projects')
    .insert(article, "id");

    const newArticle = await getArticleById(id);

    return newArticle;
}


function getArticleById(id) {
  const article = db("articles")
    .select("id", "title")
    .where("id", id)
    .first()

    return article
}


function removeArticle(id) {
  console.log('removeArticle', id);
  return db('articles')
  .where('id', id)
  .del();
}