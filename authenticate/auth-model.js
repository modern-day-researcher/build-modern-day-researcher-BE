const db = require("../data/dbConfig.js");

module.exports = {
  regUser,
  getUser,
  userByID
};

async function regUser(user) {
  const pw = await db("users").insert({
    username: user.username,
    password: user.password
  });

  return pw;
}

function getUser(username) {
  return db("users")
    .where("username", username)
    .first();
}

function userByID(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}
