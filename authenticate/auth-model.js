const db = require("../data/dbConfig");

module.exports = {
  regUser,
  getUser,
  userByID
};

async function regUser(user) {
  const [id] = await db("users")
    .returning("id")
    .insert(user, "id");

  const addUser = await userByID(id);
  return addUser;
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
