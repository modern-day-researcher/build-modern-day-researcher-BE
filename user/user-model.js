const db = require("../data/dbConfig.js");

module.exports = {
  getFullUserData
};

async function getFullUserData(userId) {
  // const user = await db("users")
  //     .select("users.first_name", "users.last_name")
  //     .where("id", userId)
  //     .first();

  // const articles = await db("users")
  //     .join("articles", "users.id", "articles.user_id")
  //     .select("articles.category", "articles.title", "articles.url", "articles.description")
  //     .where("users.id", userId)

  return db("articles").where({ user_id: userId });

  //   return { ...user, articels };
}
