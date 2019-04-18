const bcrypt = require('bcryptjs');


exports.seed = function(knex) {
  return knex('users').del()
  .then(function () {
    return knex('users').insert([
      {id: 1, username: 'TestUser1', password: bcrypt.hashSync('password', 10), first_name: 'John', last_name: 'Doe'},
      {id: 2, username: 'TestUser2', password: bcrypt.hashSync('foobar', 10), first_name: 'Jane', last_name: 'Doe'},
      {id: 3, username: 'TestUser3', password: bcrypt.hashSync('banana', 10), first_name: 'Adam', last_name: 'Smith'},
    ]);
  })
};
